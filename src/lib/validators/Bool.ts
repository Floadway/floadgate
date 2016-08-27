// Email validation
import schemaStore from "../SchemaStore";
import * as _ from "lodash";
import *  as Utils from "../utils";
import { ConstraintOptions } from "../ConstraintOptions";


export interface BooleanOptions extends ConstraintOptions{

}

export function Bool(options?: BooleanOptions){


    if(options == null){
        options = {}
    }


    options = Utils.makeDefault(options,{

    });

    let validate = (item,callback,path) => {


        if(!_.isBoolean(item)){
            return callback({
                errorCode: "notBoolean",
                description: `Variable is not a boolean!`,
                path: path
            });
        }

        callback(null,item);

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