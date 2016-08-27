import { ConstraintOptions } from "../ConstraintOptions";
export interface BooleanOptions extends ConstraintOptions {
}
export declare function Bool(options?: BooleanOptions): (c: any, name: string) => void;
