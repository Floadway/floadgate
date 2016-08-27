import {Schema} from "../lib/Schema";
import {SchemaMode} from "../lib/SchemaMode";
import * as chai from "chai";
import SchemaStore from "../lib/SchemaStore";
import {Str} from "../lib/validators/Str";
import {Child} from "../lib/validators/Child";
import {Arr} from "../lib/validators/Arr";
let expect  = chai.expect;
let should = chai.should();
describe("Representation API",() => {


    describe("getSchema",() => {

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

            @Child({ type: ChildSchema })
            singleChild: ChildSchema

        }


    })



});
