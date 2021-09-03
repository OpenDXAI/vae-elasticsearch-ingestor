/**
 * Vaccine Adverse Event Report Document. These documents
 * will be ingested into the elasticsearch cluster.
 */
 export interface VAEDocument {
    id: string;
    reportedDate?: Date;
    state?: string;
    ageInYears?: number;
    sex?: 'M'| 'F';
    description?: string,
    hasDied?: boolean;
    dateOfDeath?: Date;
    wasLifeThreatening?: boolean;
    requiredEmergencyRoom?: boolean;
    requiredProlongedHospitalization?: boolean;
    becameDisabled?: boolean;
    hasRecovered?: boolean;
    vaccinationDate?: Date;
    onsetDate?: Date;
    numDatesFromVaxDateToOnsetDate?: number;
    labData?: string;
    otherMedications?: string;
    currentIllness?: string;
    preExistingConditions?: string;
    allergies?: string;
    manufacturerNumber?: string;
    causedBirthDefect?: boolean;
    deathDate?: Date;
    hospital?: string;
    numDaysInHospital?: number;
    priorVaccinationInformation?: string;
    symptoms?: string[];
    vaxType?: string;
    vaxManu?: string;
    vaxLot?: string;
    vaxSeries?: string;
    vaxRoute?: string;
    vaxSite?: string;
    vaxName?: string;
  }