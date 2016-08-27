import { ConstraintOptions } from "../ConstraintOptions";
export interface NrOptions extends ConstraintOptions {
    min?: number;
    max?: number;
    floor?: number;
    ceil?: number;
    round?: number;
    allowDecimals?: boolean;
}
export declare function Nr(options?: NrOptions): (c: any, name: string) => void;
