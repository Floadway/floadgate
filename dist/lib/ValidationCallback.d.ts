import { ValidationError } from "./validationError";
export interface ValidationCallback {
    (err: ValidationError, result: any): any;
}
