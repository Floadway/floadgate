{ processArray } = require("./utils")


module.exports = (params) ->
	{ options, callback, item, path, validate } = params

	error  = null 


	onFinish = (validatedArray) ->

		# Check if there was any error during the validation process.
		if error? 
			callback(error,null)
		else 
			callback(null,validatedArray)


	switch options.mode 


		# All children have their own validaion scheme
		when "unique"

			# Check if we have a validation scheme for all items

			if item.length <= options.children.length


				processArray(item,(item,index,done) ->

					newPath = path+"["+index+"]" # Generate a new path
					validate(item,options.children[index],newPath,(err,validatedItem) ->
						# An error occured. This ship will sink...
						if err? then error = err 
						# Call done anyways to ensure the loop finishes
						done(validatedItem)
					) 

				,onFinish)

			else

				callback(
					error: "tooManyChildren"
					path: path 
				,null)

		# All children follow the same validation scheme.
		when "uniform"

			processArray(item,(item,index,done) ->

				newPath = path+"["+index+"]" # Generate a new path
				validate(item,options.children,newPath,(err,validatedItem) ->
					# An error occured. This ship will sink...
					if err? then error = err 
					# Call done anyways to ensure the loop finishes
					done(validatedItem)
				) 

			,onFinish)


		else 

			# Unknown mode.

			callback(
				error: "unknownMode"
				path: path
			,null)


