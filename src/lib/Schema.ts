// Annotation used to register a new Schema
import {SchemaOptions} from "./SchemaOptions";
import schemaStore from "./SchemaStore";
export function Schema(options: SchemaOptions){

    return function(constructor: Function){
        schemaStore.registerSchema(constructor,options);
    }
}