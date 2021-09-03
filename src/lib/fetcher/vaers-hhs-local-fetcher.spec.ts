import test from 'ava';

import { VAERSHHSLocalFetcher } from './vaers-hhs-local-fetcher';

test('Reads and parses a VAERS CSV file into a list of VAEDocuments.', async (t) => {
  const fetcher: VAERSHHSLocalFetcher = new VAERSHHSLocalFetcher("src/data/TESTVAERSDATA.csv", "src/data/TESTVAERSSYMPTONS.csv", "src/data/TESTVAERSVAX.csv");
  const response = await fetcher.fetch();
  t.deepEqual(response[0], {
    ageInYears: 33.0,
    allergies: 'Pcn and bee venom',
    becameDisabled: undefined,
    causedBirthDefect: undefined,
    currentIllness: 'None',
    dateOfDeath: undefined,
    description: 'Right side of epiglottis swelled up and hinder swallowing pictures taken Benadryl Tylenol taken',
    hasDied: undefined,
    hasRecovered: true,
    hospital: undefined,
    id: '0000000',
    labData: 'None',
    manufacturerNumber: undefined,
    numDatesFromVaxDateToOnsetDate: 2,
    numDaysInHospital: undefined,
    onsetDate: new Date("2020-12-30 08:00:00 UTC"),
    otherMedications: 'None',
    preExistingConditions: 'None',
    priorVaccinationInformation: undefined,
    reportedDate: new Date("2021-01-01 08:00:00 UTC"),
    requiredEmergencyRoom: undefined,
    requiredProlongedHospitalization: undefined,
    sex: 'F',
    state: 'TX',
       symptoms: [
           'Dysphagia',
           'Epiglottitis',
           'Pineapple',
           'Terrible',
         ],
    vaccinationDate: new Date("2020-12-28 08:00:00 UTC"),
       vaxLot: '037K20A',
       vaxManu: 'MODERNA',
       vaxName: 'COVID19 (COVID19 (MODERNA))',
       vaxRoute: 'IM',
       vaxSeries: undefined,
       vaxSite: 'LA',
       vaxType: 'COVID19',
    wasLifeThreatening: undefined,
    });
});
