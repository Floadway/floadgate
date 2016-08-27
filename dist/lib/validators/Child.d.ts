import { ConstraintOptions } from "../ConstraintOptions";
export interface ChildOptions extends ConstraintOptions {
    type: Function;
    group?: string;
}
export declare function Child(options: ChildOptions): (c: any, name: string) => void;
