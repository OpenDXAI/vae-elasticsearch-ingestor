import { VAEDocument } from "../vae-document";

/**
 * An abstract class for fetching data and generating
 * a list of VAERDocuments.
 */
export abstract class Fetcher {
  abstract fetch(): Promise<VAEDocument[]>;
}