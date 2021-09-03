# Installation

1. `brew install elasticsearch`
1. `brew install kibana`
1. `npm install`

# Setup

1. In another terminal, run `elasticsearch`. This spins up a local Elasticsearch cluster.
1. In one terminal, run `kibana`. This spins up a local Kibana endpoint that you can use to visualize data.
1. In another terminal, run `npm run watch:build`. This automatically transpiles Typescript when changes are detected.
1. In another terminal, run `npm run watch:test`. This automatically runs unit tests when changes are detected.
1. In another terminal, run `npx ts-node src/index.ts` to start the ingestion.
1. On a browser, navigate to `http://localhost:5601/app/dev_tools#/console`.
1. In the left, you can test a sample query such as 
    ```
    GET /_search?size=1000
    {
    "query": {
        "query_string": {
        "query": "moderna fatigue bruising yellowness jaundice",
        "fields": ["description", "vaxName", "symptoms", "labData", "currentIllness", "preExistingConditions", "allergies", "priorVaccinationInformation"]
        }
    }
    }
    ```
