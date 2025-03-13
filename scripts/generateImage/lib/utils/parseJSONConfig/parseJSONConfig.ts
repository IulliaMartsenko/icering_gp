import { Config } from "../../types";

export function parseJSONConfig(jsonString: string): Config {
    let config: Config;
    try {
        config = JSON.parse(jsonString);
    } catch (e) {
        throw Error(`Invalid JSON config`, e);
    }

    // TODO add validation

    return config;
}