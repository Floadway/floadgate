import {Schema} from "../lib/Schema";
import {SchemaMode} from "../lib/SchemaMode";
import * as chai from "chai";
import SchemaStore from "../lib/SchemaStore";
import {Nr} from "../lib/validators/Nr";
let should = chai.should();


describe("Number",() => {

    describe("validate",() => {

        it("make sure the value passed is a number",() => {

            @Schema({ mode: SchemaMode.STRICT })
            class Test{
                @Nr()
                value: number;
            }

            let test = new Test();


            test.value = 13;

            SchemaStore.validate(test,(err,item) => {
                should.not.exist(err);
                item.value.should.equal(13);
            });


            test["va"+"lue"] = "foobar";

            SchemaStore.validate(test,(err,item) => {

                err.errorCode.should.equal("notNumber");
                should.not.exist(item);

            });

        });

    });




});