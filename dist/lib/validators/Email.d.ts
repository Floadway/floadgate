import { ConstraintOptions } from "../ConstraintOptions";
export interface EmailOptions extends ConstraintOptions {
}
export declare function Email(options?: EmailOptions): (c: any, name: string) => void;
