import {Schema} from "../lib/Schema";
import {SchemaMode} from "../lib/SchemaMode";
import * as chai from "chai";
import SchemaStore from "../lib/SchemaStore";
import {Str} from "../lib/validators/Str";
import {Child} from "../lib/validators/Child";
let expect  = chai.expect;
let should = chai.should();

describe("Children",() => {

    describe("validate",() => {

        @Schema({ mode: SchemaMode.STRICT })
        class ChildSchema{
            @Str()
            title: string;
        }

        @Schema({ mode: SchemaMode.STRICT })
        class ChildTest{
            @Child({ type: ChildSchema })
            child: ChildSchema;
        }

        it("should report missing nested schema",() => {
            let test = new ChildTest();
            SchemaStore.validate(test,(err,res) => {


                err.errorCode.should.equal("missingKey");

                expect(res).to.equal(null);
            })
        });

        it("should report invalid nested schema",() => {
            let test = new ChildTest();
            test["child"+""] = "fooo";
            SchemaStore.validate(test,(err,res) => {

                err.errorCode.should.equal("invalidChild");
                expect(res).to.equal(null);
            })
        });

        it("should should report errors in the child schema",() => {
            let test = new ChildTest();
            test.child = new ChildSchema();
            test.child["title"+""] = 0;

            SchemaStore.validate(test,(err,res) => {

                err.errorCode.should.equal("notString");
                expect(res).to.equal(null);
            })
        });


    });





});