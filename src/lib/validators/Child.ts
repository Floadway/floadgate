// Email validation
import schemaStore from "../SchemaStore";
import * as _ from "lodash";
import *  as Utils from "../utils";
import { ConstraintOptions } from "../ConstraintOptions";
import * as validator from "validator";
import SchemaStore from "../SchemaStore";


export interface ChildOptions extends ConstraintOptions{
    type: Function;
    group?: string;
}

export function Child(options: ChildOptions){


    let validate = (item,callback,path) => {


        if(item instanceof options.type){


            SchemaStore.validate(item,callback,options.group,path)


        }else{

            callback({
                errorCode: "invalidChild",
                description: "The child passed was not of the correct type!",
                path: path
            })

        }


    };


    let decorator = (c,name: string) => {



        options = Utils.makeDefault(options,{

        });


        schemaStore.addConstraint(c,name, {

            validate: (item,callback,path) => {
                validate(item,callback,path+"."+c.constructor.name+"."+name)
            },
            type: options.type
            ,
            options
        });
    };
    decorator["validate"] = validate;
    decorator["type"] = options.type;
    return decorator;
}