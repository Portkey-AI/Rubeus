import { ProviderConfigs } from "../types";
import CohereAPIConfig from "./api";
import {CohereCompleteConfig, CohereCompleteResponseTransform} from "./complete";
import CohereEmbedConfig from "./embed";

const CohereConfig: ProviderConfigs = {
  complete: CohereCompleteConfig,
  embed: CohereEmbedConfig,
  api: CohereAPIConfig,
  completeResponseTransform: CohereCompleteResponseTransform
};

export default CohereConfig;
