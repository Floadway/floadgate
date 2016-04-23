###
	@validator "or"
###


module.exports = (params) ->
	{ options, callback, item, path, validate } = params

	passed = false
	lastError = null
	currIndex = 0

	if options.children.length == 0

		callback(null,item)

	validateStep = () ->

		validate(item,options.children[currIndex],path+"[cond:#{currIndex}]",(err,validatedItem) ->
			
			currIndex += 1

			if not err?
				passed = true
			else
				lastError = err
			

			if currIndex == options.children.length 

				if passed 
					callback(null,validatedItem)
				else
					callback(
						error: "allOptionsFalse"
						path: path
						lastError: lastError
					,null)
			else

				validateStep()
		)

	validateStep()

