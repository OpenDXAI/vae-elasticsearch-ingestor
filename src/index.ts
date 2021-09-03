import { Client } from "@elastic/elasticsearch";

import { VAERSHHSLocalFetcher } from "./lib/fetcher/vaers-hhs-local-fetcher";
import { LocalElasticsearchIngestor } from "./lib/ingestor/local-elasticsearch-ingestor";

const fetcher: VAERSHHSLocalFetcher = new VAERSHHSLocalFetcher("src/data/2021VAERSDATA.csv", "src/data/2021VAERSSYMPTOMS.csv", "src/data/2021VAERSVAX.csv");
const ingestor: LocalElasticsearchIngestor = new LocalElasticsearchIngestor(new Client({node: "http://127.0.0.1:9200"}));

console.info("Starting ingestion");
(async function() {
    await ingestor.initialize()
    const data = await fetcher.fetch();
    await ingestor.ingest(data);
    console.info("Data ingestion competed.");
}());

