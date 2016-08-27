import { ValidationCallback } from "./ValidationCallback";
import { ConstraintOptions } from "./ConstraintOptions";
export interface Constraint {
    validate: {
        (item: any, callback: ValidationCallback, path);
    };
    options: ConstraintOptions;
    type: Function;
}
