import { SchemaOptions } from "./SchemaOptions";
import { Constraint } from "./Constraint";
import { ValidationError } from "./ValidationError";
export declare class SchemaItem {
    private constraints;
    private options;
    private schemaConstructor;
    constructor(options: SchemaOptions, constructor: Function);
    getName(): string;
    getConstructor(): Function;
    addConstraint(key: string, constraint: Constraint): void;
    setOptions(options: SchemaOptions): void;
    getOptions(): SchemaOptions;
    getConstraintsForGroup(group: string): {
        [path: string]: Constraint[];
    };
    validate<T>(item: any, callback: {
        (err: ValidationError, res: T);
    }, group: any, path: any): any;
}
