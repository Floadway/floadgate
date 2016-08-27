// Number validation
import schemaStore from "../SchemaStore";
import * as _ from "lodash";
import *  as Utils from "../utils";
import { ConstraintOptions } from "../ConstraintOptions";


export interface NrOptions extends ConstraintOptions{
    min?: number;
    max?: number;
    floor?: number;
    ceil?: number;
    round?: number;
    allowDecimals?: boolean;
}

export function Nr(options?: NrOptions){

    if(options == null){
        options = {};
    }

    options = Utils.makeDefault(options,{
        min: null,
        max: null,
        floor: null,
        ceil: null,
        round: null,
        allowDecimals: true
    });

    let validate = (item: any, callback,path) => {


        if(!_.isNumber(item)){
            return callback({
                errorCode: "notNumber",
                description: `Variable is not a numer!`,
                path
            },null);
        }

        if(options.ceil != null){
            let factor = Math.pow(10,options.ceil);
            item = Math.ceil(item*factor)/factor;
        }

        if(options.floor != null){
            let factor = Math.pow(10,options.floor);
            item = Math.floor(item*factor)/factor;
        }

        if(options.round != null){
            let factor = Math.pow(10,options.round);
            item = Math.round(item*factor)/factor;
        }

        if(options.min != null && item < options.min){
            return callback({
                errorCode: "tooSmall",
                description: `Number passed was too small Min: ${ options.min }`,
                path
            },null)
        }

        if(options.max != null && item > options.max){
            return callback({
                errorCode: "tooBig",
                description: `Number passed was too big Max: ${ options.max }`,
                path
            },null)
        }

        if(!options.allowDecimals && item % 1 != 0){
            return callback({
                errorCode: "decimalsNotAllowed",
                description: `The number passed has decimal  places `,
                path
            },null)
        }

        callback(null,item);


    };

    let decorator = (c,name: string) =>{

        schemaStore.addConstraint(c,name, {

            validate: (item, callback, path) => {
                validate(item,callback,path+"."+c.constructor.name+"."+name);
            },
            type: Number,
            options
        });
    };

    decorator["validate"] = validate;
    decorator["type"] = Number;

    return decorator;
}