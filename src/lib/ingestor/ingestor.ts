import { VAEDocument } from "../vae-document";

/**
 * An abstract class for ingesting data into
 * an Elasticsearch cluster. Often times, different
 * clients are needed (i.e. local instance and AWS).
 * 
 * Likely more useful to go by a composition over
 * inheritance design though in the future.
 */
export abstract class Ingestor {
    /**
     * Performs the necessary setup for an Elasticsearch cluster
     * such as creating indices.
     */
    abstract initialize(): void;

    /**
     * Ingests data into an index.
     */
    abstract ingest(vaersDocuments: VAEDocument[]): void;
}