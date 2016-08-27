import {Schema} from "../lib/Schema";
import {SchemaMode} from "../lib/SchemaMode";

import { should } from "chai";
import SchemaStore from "../lib/SchemaStore";
import {Str} from "../lib/validators/Str";

describe("Schema",() => {

    describe("apply",() => {

        @Schema({mode: SchemaMode.STRICT})
        class Test {


        }


        it("should register a schema in the schemaStore", () => {
            should().exist(SchemaStore.getSchema(Test));
        });

    });

    describe("SchemaMode.STRICT",() => {

        @Schema({ mode: SchemaMode.STRICT })
        class Test{

            @Str()
            test: string;

            @Str()
            foo: string;

        }

        it("should require all items to be present",() => {

            let test = new Test();


            SchemaStore.validate(test,(err,newTest) => {

                should().exist(err);
                should().equal(err.errorCode,"missingKey");
                should().not.exist(newTest);
            });


            test.foo = "bar";
            test.test = "foo";

            SchemaStore.validate(test,(err,newTest) => {

                should().exist(newTest);
                should().not.exist(err)

            });


        });

    });


    describe("SchemaMode.LOOSE",() => {

        @Schema({ mode: SchemaMode.LOOSE })
        class Test{

            @Str()
            test: string;


        }

        it("should require all defined items to be present",() => {

            let test = new Test();


            SchemaStore.validate(test, (err, newTest) => {

                should().exist(err);
                should().equal(err.errorCode, "missingKey");
                should().not.exist(newTest);
            });

        });

        it("should leave undefined properties untouched",() => {

            let test = new Test();

            test["foo"] = "bar";
            test.test = "foo";

            SchemaStore.validate(test,(err,newTest) => {

                should().exist(newTest);

                should().equal(newTest["foo"],"bar");
                should().equal(newTest.test,"foo");

                should().not.exist(err)

            });


        });

    });


    describe("SchemaMode.SHORTEN",() => {

        @Schema({ mode: SchemaMode.SHORTEN })
        class Test{

            @Str()
            test: string;


        }

        it("should require all defined items to be present",() => {

            let test = new Test();


            SchemaStore.validate(test, (err, newTest) => {

                should().exist(err);
                should().equal(err.errorCode, "missingKey");
                should().not.exist(newTest);
            });

        });

        it("should remove undefined properties",() => {

            let test = new Test();

            test["foo"] = "bar";
            test.test = "foo";

            SchemaStore.validate(test,(err,newTest) => {

                should().exist(newTest);

                should().not.exist(newTest["foo"]);
                should().equal(newTest.test,"foo");

                should().not.exist(err)

            });


        });

    });




});