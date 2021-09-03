import { VAEDocument } from "../vae-document";

/**
 * An abstract class for fetching data and generating
 * a list of {@link VAEDocument}.
 * 
 * VAERS HHS splits their data into multiple CSV files
 * as seen at https://vaers.hhs.gov/data/datasets.html.
 * 
 * These are data, symptons, and vaccines. Multiple classes
 * may extend this in the future as VAERS data becomes
 * obtainable from different means (i.e. local or fetched remotely). 
 * 
 */
 export abstract class VAERSHHSFetcher {
   /**
    * Reads the 3 datasets and joins them by the VAERS ID.
    * 
    * @returns {@link VAEDocument[]}
    */
    async fetch(): Promise<VAEDocument[]> {
      const indexedData: { [key: string]: VAEDocument } = {};
      const data = await this.fetchData();
      data.forEach(d => {indexedData[d.id] = d});

      const indexedSymptoms: { [key: string]: VAEDocument } = {};
      const symptoms = await this.fetchSymptoms();
      symptoms.forEach(d => {indexedSymptoms[d.id] = d});

      const indexedVax: { [key: string]: VAEDocument } = {};
      const vax = await this.fetchVax();
      vax.forEach(d => {indexedVax[d.id] = d});

      const vaersIds = new Set([...Object.keys(indexedData), ...Object.keys(indexedSymptoms), ...Object.keys(indexedVax)]);
      const vaerDocuments: VAEDocument[] = [];
      for (const vaerId of vaersIds) {
        vaerDocuments.push(
          {
            ...indexedData[vaerId],
            ...indexedSymptoms[vaerId],
            ...indexedVax[vaerId]
          }
        )
      }
      return vaerDocuments;
    }

    abstract fetchData(): Promise<VAEDocument[]>;

    abstract fetchSymptoms(): Promise<VAEDocument[]>;

    abstract fetchVax(): Promise<VAEDocument[]>;
  }