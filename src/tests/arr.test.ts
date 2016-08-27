import {Schema} from "../lib/Schema";
import {SchemaMode} from "../lib/SchemaMode";
import * as chai from "chai";
import SchemaStore from "../lib/SchemaStore";
import {Str} from "../lib/validators/Str";
import {Child} from "../lib/validators/Child";
import {Arr} from "../lib/validators/Arr";
let expect  = chai.expect;
let should = chai.should();

describe("Array",() => {

    describe("validate",() => {

        @Schema({ mode: SchemaMode.STRICT })
        class ChildSchema{
            @Str()
            title: string;
        }

        @Schema({ mode: SchemaMode.STRICT })
        class ChildTest{
            @Arr({ child: ChildSchema })
            child: ChildSchema[];

            @Arr({ child: Str({ maxLength: 3 }) })
            primitiveArray: string[];

        }



        it("should report invalid nested items",() => {
            let test = new ChildTest();

            test["chi"+"ld"] = [""];

            test.primitiveArray = [];

            SchemaStore.validate(test,(err,res) => {

                err.errorCode.should.equal("invalidChild");
                expect(res).to.equal(null);
            })
        });

        it("should report errors in child arrays",() => {
            let test = new ChildTest();

            test.primitiveArray = ["verylongstring"];
            test.child = [];


            SchemaStore.validate(test,(err,res) => {

                err.errorCode.should.equal("tooLong");
                expect(res).to.equal(null);
            })
        });


    });





});