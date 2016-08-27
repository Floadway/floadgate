// Email validation
import schemaStore from "../SchemaStore";
import * as _ from "lodash";
import *  as Utils from "../utils";
import { ConstraintOptions } from "../ConstraintOptions";
import * as validator from "validator";


export interface EmailOptions extends ConstraintOptions{
    
}

export function Email(options?: EmailOptions){


    if(options == null){
        options = {}
    }


    options = Utils.makeDefault(options,{

    });

    let validate = (item,callback,path) => {


        if(!_.isString(item)){
            return callback({
                errorCode: "notString",
                description: `Variable is not a string!`,
                path: path
            });
        }

        if(validator.isEmail(item)){

            callback(null,item)

        }else{

            callback({
                errorCode: "notEmail",
                description: "The value provided is not a valid email address",
                path: path
            })

        }

    };


    let decorator = (c,name: string) => {

        schemaStore.addConstraint(c,name, {

            validate: (item,callback,path) => {
                validate(item,callback,path+"."+c.constructor.name+"."+name)
            },
            options
        });
    };
    decorator["validate"] = validate;

    return decorator;
}