import {EhItem} from "../../types/eh";
import { EhPlugin } from "./EhPlugin";

import { saveCover } from "./eh-plu-SaveCover";

const plugins: EhPlugin[] = [
  //saveCover
]

export async function runEhPlugins(items: EhItem[]) {
  for (const plugin of plugins) {
    await plugin(items)
  }
}
