import { ProviderConfigs } from "../types";
import CohereAPIConfig from "./api";
import { CohereChatCompleteConfig, CohereChatCompleteResponseTransform } from "./chatComplete";
import {CohereCompleteConfig, CohereCompleteResponseTransform} from "./complete";
import CohereEmbedConfig from "./embed";

const CohereConfig: ProviderConfigs = {
  complete: CohereCompleteConfig,
  chatComplete: CohereChatCompleteConfig,
  embed: CohereEmbedConfig,
  api: CohereAPIConfig,
  responseTransforms: {
    complete: CohereCompleteResponseTransform,
    chatComplete: CohereChatCompleteResponseTransform
  }
};

export default CohereConfig;
