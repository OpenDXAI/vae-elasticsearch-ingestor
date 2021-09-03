import csv from 'csvtojson';
import { VAEDocument } from '../vae-document';

import { VAERSHHSFetcher } from './vaers-hhs-fetcher';

/**
 * Reads the VAERS dataset from the path specified.
 * 
 * Ideally, this scrapes directly from the VAERS API. However, they 
 * do a CAPTCHA and Session ID verification. In order to get around that,
 * we'd need to emulate a lot which seems like overkill for now.
 * 
 * Reference: https://vaers.hhs.gov/data/datasets.html
 */
export class VAERSHHSLocalFetcher extends VAERSHHSFetcher {
    dataPath: string;
    symptomsPath: string;
    vaxPath: string;

    constructor(dataPath: string, symptomsPath: string, vaxPath: string) {
        super();
        this.dataPath = dataPath;
        this.symptomsPath = symptomsPath;
        this.vaxPath = vaxPath;
    }

    async fetchData(): Promise<VAEDocument[]> {
        console.info(`Reading file ${this.dataPath} for getting data csv file.`);
        const unformattedRecords: any[] = await csv().fromFile(this.dataPath);
        const documents: VAEDocument[] = [];
        for (const unformattedRecord of unformattedRecords) {
            documents.push({
                id: unformattedRecord.VAERS_ID,
                reportedDate: new Date(unformattedRecord.RECVDATE),
                state: unformattedRecord.STATE,
                ageInYears: Number(unformattedRecord.AGE_YRS),
                sex: unformattedRecord.SEX || undefined,
                description: unformattedRecord.SYMPTOM_TEXT,
                hasDied: this.formatYAndN(unformattedRecord.DIED),
                dateOfDeath: unformattedRecord.DATEDIED && new Date(unformattedRecord.DATEDIED) || undefined,
                wasLifeThreatening: this.formatYAndN(unformattedRecord.L_THREAT),
                requiredEmergencyRoom: this.formatYAndN(unformattedRecord.ER_VISIT),
                hospital: unformattedRecord.HOSPITAL  || undefined,
                numDaysInHospital: Number(unformattedRecord.HOSPDAYS) || undefined,
                requiredProlongedHospitalization: this.formatYAndN(unformattedRecord.X_STAY),
                becameDisabled: this.formatYAndN(unformattedRecord.DISABLE),
                hasRecovered: this.formatYAndN(unformattedRecord.RECOVD),
                vaccinationDate: new Date(unformattedRecord.VAX_DATE),
                onsetDate: new Date(unformattedRecord.ONSET_DATE),
                numDatesFromVaxDateToOnsetDate: Number(unformattedRecord.NUMDAYS) || undefined,
                labData: unformattedRecord.LAB_DATA || undefined,
                otherMedications: unformattedRecord.OTHER_MEDS || undefined,
                currentIllness: unformattedRecord.CUR_ILL || undefined,
                preExistingConditions: unformattedRecord.HISTORY || undefined,
                allergies: unformattedRecord.ALLERGIES || undefined,
                manufacturerNumber: unformattedRecord.SPLTTYPE  || undefined,
                causedBirthDefect: this.formatYAndN(unformattedRecord.BIRTH_DEFECT),
                priorVaccinationInformation: unformattedRecord.PRIOR_VAX || undefined

            })
        }
        return documents
    }
    async fetchSymptoms(): Promise<VAEDocument[]> {
        console.info(`Reading file ${this.symptomsPath} for getting symptoms csv file.`);
        const unformattedRecords: any[] = await csv().fromFile(this.symptomsPath);
        const vaersIdToSymptons: { [key: string]: string[] } = {};
        for (const unformattedRecord of unformattedRecords) {
            const symptoms: string[] = [unformattedRecord.SYMPTOM1, unformattedRecord.SYMPTOM2, unformattedRecord.SYMPTOM3, unformattedRecord.SYMPTOM4, unformattedRecord.SYMPTOM5]
            if (!vaersIdToSymptons[unformattedRecord.VAERS_ID]) {
                vaersIdToSymptons[unformattedRecord.VAERS_ID] = this.filterEmptyWords(symptoms)
            } else {
                vaersIdToSymptons[unformattedRecord.VAERS_ID].push(...this.filterEmptyWords(symptoms))
            }
        }
        const documents: VAEDocument[] = [];
        for (const [vaersId, symptoms] of Object.entries(vaersIdToSymptons)) {
            documents.push({
                id: vaersId,
                symptoms: symptoms
            })
          }
        return documents
    }
    async fetchVax(): Promise<VAEDocument[]> {
        console.info(`Reading file ${this.vaxPath} for getting vax csv file.`);
        const unformattedRecords: any[] = await csv().fromFile(this.vaxPath);
        const documents: VAEDocument[] = [];
        for (const unformattedRecord of unformattedRecords) {
            documents.push({
                id: unformattedRecord.VAERS_ID,
                vaxType: unformattedRecord.VAX_TYPE,
                vaxManu: unformattedRecord.VAX_MANU,
                vaxLot: unformattedRecord.VAX_LOT,
                vaxSeries: unformattedRecord.VAERS_DOSE_SERIES,
                vaxRoute: unformattedRecord.VAX_ROUTE,
                vaxSite: unformattedRecord.VAX_SITE,
                vaxName: unformattedRecord.VAX_NAME,
            })
        }
        return documents
    }

    private formatYAndN(yesOrNo: string | undefined): boolean | undefined {
        if (yesOrNo === "Y") {
            return true;
        } else if (yesOrNo === "N") {
            return false
        }
        return undefined;

    }

    private filterEmptyWords(words: string[]): string[] {
        const nonEmptyWords: string [] = [];
        for (const word of words) {
            if (word) {
                nonEmptyWords.push(word);
            }
        }
        return nonEmptyWords;
    }
  }