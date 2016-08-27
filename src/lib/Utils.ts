
import {SchemaMode} from "./SchemaMode";
export function makeDefault<T>(value: T, defaults): T{
    for(let key of Object.keys(defaults)){
        if(!value.hasOwnProperty(key)){
            value[key] = defaults[key];
        }
    }
    return value;
}

export function schemaModeToString(mode: SchemaMode){

    switch(mode){
        case SchemaMode.STRICT:
            return "STRICT";
        case SchemaMode.SHORTEN:
            return "SHORTEN";
        case SchemaMode.LOOSE:
            return "LOOSE";
    }

}