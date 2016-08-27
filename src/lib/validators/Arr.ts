// Email validation
import * as _ from "lodash";
import *  as Utils from "../utils";
import { ConstraintOptions } from "../ConstraintOptions";
import {AsyncGroup} from "../AsyncGroup";
import SchemaStore from "../SchemaStore";


export interface ArrayOptions extends ConstraintOptions {
    child: Function,
    maxLength?: number;
    minLength?: number;
    length?: number;
    group?: string;
}

export function Arr(options: ArrayOptions){

    let decorator = (c,name: string) => {


        options = Utils.makeDefault(options,{
            maxLength: null,
            minLength: null,
            length: null,
            group: null
        });


        SchemaStore.addConstraint(c,name, {

            validate: (item: any, callback,path) => {


                let constructor = c.constructor;

                if(!_.isArray(item)){
                    return callback({
                        errorCode: "notArray",
                        description: `Variable is not an array!`,
                        path: path+"."+constructor.name+"."+name
                    });
                }

                let group = new AsyncGroup((err,res) => {
                    callback(err,res);
                });



                for(let child of item){

                    group.add((done) => {
                        if(options.child["validate"] != null){

                            options.child["validate"](child,done,path+"."+c.constructor["name"]+"."+name)


                        }else if(child instanceof options.child){


                            SchemaStore.validate(child,done,options.group,path+"."+name)



                        }else{
                            callback({
                                errorCode: "invalidChild",
                                description: "The value passed as child was not valid!",
                                path: path+"."+name
                            },null);
                        }

                    });

                }

                group.run();


            },
            options,
            type: Array
        });
    };

    decorator["isValidator"] = true;

    return decorator;
}