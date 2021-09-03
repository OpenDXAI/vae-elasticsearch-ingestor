import { Client } from '@elastic/elasticsearch';

import { VAEDocument } from '../vae-document';

import { Ingestor } from "./ingestor";


export class LocalElasticsearchIngestor extends Ingestor {
    client: Client;
    indexName = 'vaers-documents';

    constructor(client: Client) {
        super();
        this.client = client;
    }
    async initialize(): Promise<void> {
      console.info("Creating Elasticsearch index...");
        await this.client.indices.create({
            index: this.indexName,
          }, { ignore: [400] })
    }
    async ingest(allVaersDocuments: VAEDocument[]): Promise<void> {
      console.info("Ingesting data into index...");
        for (const vaersDocumentChunk of this.chunk(allVaersDocuments, 250)) {
            const body = vaersDocumentChunk.flatMap(doc => [{ index: { _index: this.indexName, _id: doc.id } }, doc])
            await this.client.bulk({ refresh: true, body })
        }
    }

    private chunk(arr: VAEDocument[], size: number): VAEDocument[][] {
        return Array.from({ length: Math.ceil(arr.length / size) }, (_: VAEDocument, i: number) =>
            arr.slice(i * size, i * size + size)
        );
    }
}