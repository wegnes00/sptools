import { createHub } from "hub-flow";
import defaultState, { ApplicationState } from "./defaultState";

export interface FreezerObject {
    toJS?(): any,
    set?(newState: any): { now:() => void},
    reset?(object:any): { now:() => void},
}

declare global {
    interface Array<T> extends FreezerObject {}
    interface Object extends FreezerObject {}
}

export interface Hub {
    trigger(key: string, ...params: any[]) : void,
    on(key: string, handler: (...params: any[]) => any)
    cacheState(): void,
    state: ApplicationState
}

export default createHub(defaultState, { cacheKey: "sptools-sitethemegenerator"}) as Hub;