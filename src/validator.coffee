### 
	FLOADGATE CORE FILE
	

###


class Validator

	constructor: () ->

		@validators = {}

	registerType: (name,validationFunction) ->

		if not @validators[name]? 

			@validators[name] = validationFunction

		else

			throw new Exception("A validator with the name #{name} is already defined.")


	validate: (item,options,callback) =>

		@validateItem(item,options,"root",callback)
		
	validateItem: (item,options,path,callback) => 

		##console.log item, options, path

		if @validators[options.type]? 

			@validators[options.type]({ item, options, path, callback, validate: @validateItem })

		else 

			callback(
				error: "unknownType"
				path: path
				type: options.type
			,null)






validator = new Validator()


validator.registerType("and",require("./types/and"))
validator.registerType("array",require("./types/array"))
validator.registerType("boolean",require("./types/boolean"))
validator.registerType("number",require("./types/number"))
validator.registerType("is",require("./types/is"))
validator.registerType("object",require("./types/object"))
validator.registerType("or",require("./types/or"))
validator.registerType("string",require("./types/string"))
validator.registerType("utils",require("./types/utils"))


module.exports = validator  # Export as singleton.
