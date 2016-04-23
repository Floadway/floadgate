{ processObject } = require("./utils")


module.exports = (params) ->
	{ options, callback, item, path, validate } = params

	doValidation =  (validateItem,children,useKeys,callback) ->

		error = null 

		processObject(validateItem,(key,value,done) ->



			childOptions = if useKeys then children[key] else children
			
			validate(value,childOptions,path+"."+key,(err,validatedItem) ->
				if err? 
					error = err 
				done(validatedItem)
			)
		,(finalObject) ->
			if error? 
				callback(error,null)
			else 
				callback(null,finalObject)
		)


	switch options.mode 


		when "loose"

			doValidation(item,options.children,options.keys == true,callback)

		when "shorten"


			shortenedObject = {}
			failed = false

			for key,value of options.children

				if item[key]? 

					shortenedObject[key] = item[key]

				else 

					if value.optional

						if value.default? 

							shortenedObject[key] = value.default

						else 

							shortenedObject[key] = null
					
					else					

						callback(
							error: "missingProp"
							path: path+"."+key
						)
						failed = true
						break
			
			if failed

				return 

			else

				doValidation(shortenedObject,options.children,options.keys == true,callback)

			break

		

		else 
			callback(
				error: "invalidMode"
				path: path
			)