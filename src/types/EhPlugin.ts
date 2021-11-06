import {EhItem} from "../types/eh";

export interface EhPlugin {
  handler: (ehs: EhItem[]) => Promise<void>,
  onErr: (err: Error, ehs: EhItem[]) => void,
  name: string
}
