import { SchemaOptions } from "./SchemaOptions";
import { Constraint } from "./Constraint";
import * as Utils from "./Utils";
import { ValidationError } from "./ValidationError";
import { SchemaMode } from "./SchemaMode";
import { ConstraintOptions } from "./ConstraintOptions";
import { AsyncGroup } from "./AsyncGroup";
export class SchemaItem{

	private constraints: { [path:string]:Constraint[] };
	private options: SchemaOptions;
	private schemaConstructor: Function;

	constructor(options: SchemaOptions,constructor: Function){
		this.options = options;
		this.constraints = {};
		this.schemaConstructor = constructor;
	}

	public getName(): string{
		return this.schemaConstructor["name"];
	}

	public getConstructor(): Function{
		return this.schemaConstructor;
	}

	public addConstraint(key: string,constraint: Constraint){
		constraint.options = Utils.makeDefault<ConstraintOptions>(constraint.options,{
			groups: [],
			optional: false,
			default: null
		});

		if(this.constraints[key] == null){
			this.constraints[key] = [];
		}

		this.constraints[key].push(constraint);
	}

	public setOptions(options: SchemaOptions){
		this.options = options;
	}

	public getOptions(): SchemaOptions{
		return this.options;
	}

	public getConstraintsForGroup(group: string){
		let result: { [path:string]:Constraint[] } = {};

		for(let key in this.constraints){
			let keyConstraints = [];
			let constraints = this.constraints[key];

			for(let constraint of constraints){
				if(constraint.options.groups.length == 0 || constraint.options.groups.indexOf(group) != -1){
					keyConstraints.push(constraint);
				}	
			}

			if(keyConstraints.length != 0){
				result[key] = keyConstraints;
			}
			
		}

		return result;
	}


	getSchema(group){

		let constraints = this.getConstraintsForGroup(group);
		let result = {};
		for(let key in constraints){



			result[key] = constraints[key].map((constraint) => {
				let finalOptions = {};
				Object.keys(constraint.options).map((key) => {
					if(constraint.options[key] instanceof Function){

						finalOptions[key] = constraint.options[key]["name"];

						if(constraint.options[key]["type"] != null){
							finalOptions["child"] = constraint.options[key]["type"]["name"];
						}


					}else{
						finalOptions[key] = constraint.options[key];
					}
				});
				return {
					type: constraint.type['name'],
					options: finalOptions
				}
			});
		}


		return {
			name: this.getName(),
			mode: Utils.schemaModeToString(this.getOptions().mode),
			constraints: result
		}

	}

	validate<T>(item: any,callback: { (err: ValidationError,res: T) },group,path){

		let resultItem = this.options.mode == SchemaMode.LOOSE ? item : {};

		let constraints = this.getConstraintsForGroup(group);

		if(this.options.mode == SchemaMode.STRICT){

			let match = true;

			for(let key in constraints){

				if(!item.hasOwnProperty(key)){
					return callback({
						errorCode: "missingKey",
						description: `The key ${key} was not found!`,
						path: path+"."+key
					},null);
				}

			}

			if(Object.keys(item).length > Object.keys(constraints).length){

				return callback({
					errorCode: "tooManyKeys",
					description: "The object passed has too many keys",
					path: path
				},null)

			}

		}


		let asyncGroup = new AsyncGroup((err,data) => {


			if(err != null){
				callback(err,null);
			}else{
				callback(null,resultItem);
			}

		});


		for(let key in constraints){
			let items = constraints[key];
			if(!item.hasOwnProperty(key)){

				for(let constraintItem of items){

					if(constraintItem.options.optional){

						resultItem[key] = constraintItem.options.default;


					}else{
						return callback({
							errorCode: "missingKey",
							description: `Key ${key} is missing on the schema`,
							path: path+"."+key
						},null);
					}

				}

			}

			items.map((constraintItem) => {

				resultItem[key] = item[key];

				asyncGroup.add((done) => {

					constraintItem.validate(resultItem[key],(err,value) => {
						if(err != null){
							done(err,null);
						}else{
							resultItem[key] = value;
							done(null,null);
						}
					},path);

				});

			})


		}
		asyncGroup.run();


	}

}