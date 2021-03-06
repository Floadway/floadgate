import { ValidationCallback} from "./ValidationCallback";
import { Constraint } from "./Constraint"; 
import { SchemaOptions } from "./SchemaOptions";
import { SchemaItem } from "./SchemaItem";
import { SchemaMode} from "./SchemaMode";
import _ = require("lodash");

export class SchemaStore{

	private schemas: SchemaItem[];

	constructor(){
		console.log("Creating schema store!");
		this.schemas = [];
	}

	validate<T>(item,callback: ValidationCallback,group=null,path=item.constructor["name"]){


		if(item == null || this.getSchema(item.constructor) == null){
			callback({
				errorCode: "unknownSchema",
				description: "Can not validate this item it does not have an associated schema.",
				path
			},null);
		}else{
			this.getSchema(item.constructor).validate(item,callback,group,path);
		}
	}

	getRepresentation(constructor,group){
		return this.getSchema(constructor).getSchema(group);
	}

	getSchemas(){
		return this.schemas;
	}

	isPrimitive(item: any){
		return item == Number || item == String || item == Boolean;
	}

	populateSchema<T>(constructorT: any,data,group): T{

		if(data == null){
			data = {};
		}

		console.log(constructorT);

		let schema = this.getSchema(constructorT);

		let result = new constructorT();

		if(schema == null){
			throw new Error("Can not apply schema. Unknown schema");
		}

		let constraints = schema.getConstraintsForGroup(group);

		Object.keys(constraints).map((key) => {

			let items: Constraint[] = constraints[key];

			items.map((item) => {


				if(this.isPrimitive(item.type)){

					result[key] = data[key];

				}else if(item.type == Array){

					if(!this.isPrimitive(item.options["child"]["type"])){


						if(_.isArray(data[key])){
							result[key] = data[key].map((value) => {
								return this.populateSchema(item.options["child"],value,item.options["group"]);
							})
						}
					}else{

						// Primitive array
						result[key] = data[key];

					}

				}else{

					result[key] = this.populateSchema(item.type,data[key],group);

				}

			})

		});

		return result;

	}



	getSchema(constructor): SchemaItem{

		return this.schemas.filter((i) => {
			return i.getConstructor() == constructor
		})[0];
	}


	// Called by Validation annotations
	addConstraint(fn: Function,name: string,constraint: Constraint){
		let constructor: any = fn.constructor;

		if(this.getSchema(constructor) == null){
			this.schemas.push(new SchemaItem({ mode: SchemaMode.SHORTEN },constructor));
		}

		this.getSchema(constructor).addConstraint(name,constraint);

	}

	// This is called when the @Schema annotation is fired.
	registerSchema(constructor: any,options: SchemaOptions){
		if(this.getSchema(constructor) == null){
			this.schemas.push(new SchemaItem(options,constructor));
		}else{
			this.getSchema(constructor).setOptions(options);
		}
	}



}


// It's a singleton!
export default new SchemaStore();