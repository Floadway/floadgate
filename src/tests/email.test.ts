import {Schema} from "../lib/Schema";
import {SchemaMode} from "../lib/SchemaMode";

import { should } from "chai";
import SchemaStore from "../lib/SchemaStore";
import {Email} from "../lib/validators/Email";

describe("E-Mail",() => {

    describe("validate",() => {

        it("should recognize an invalid E-Mail address",() => {

            @Schema({ mode: SchemaMode.STRICT })
            class Test{
                @Email()
                email: string;
            }

            let test = new Test();

            test.email = "iewjoievejwoib";

            SchemaStore.validate(test,(err,item) => {

                should().not.exist(item);
                should().equal(err.errorCode,"notEmail")

            });

            test.email = "foo.bar.com";


            SchemaStore.validate(test,(err,item) => {

                should().not.exist(item);
                should().equal(err.errorCode,"notEmail")

            });


            test["e"+"mail"] = 0;


            SchemaStore.validate(test,(err,item) => {

                should().not.exist(item);
                should().equal(err.errorCode,"notString")

            });





        });

        it("should allow a valid email ",() => {


            @Schema({ mode: SchemaMode.STRICT })
            class Test{
                @Email()
                email: string;
            }

            let test = new Test();

            test.email = "john.doe@fopbar.com";

            SchemaStore.validate(test,(err,item) => {

                should().equal(item.email,test.email);
                should().not.exist(err)

            });


        });

    });




});