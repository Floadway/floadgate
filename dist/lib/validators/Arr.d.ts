import { ConstraintOptions } from "../ConstraintOptions";
export interface ArrayOptions extends ConstraintOptions {
    child: Function;
    maxLength?: number;
    minLength?: number;
    length?: number;
    group?: string;
}
export declare function Arr(options: ArrayOptions): (c: any, name: string) => void;
