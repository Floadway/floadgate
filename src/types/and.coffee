###
	@validator "and"
###


module.exports = (params) ->
	{ options, callback, item, path, validate } = params

	currIndex = 0


	validateStep = (currItem) ->

		validate(currItem,options.children[currIndex],path+"[cond:#{currIndex}]",(err,validatedItem) ->

			console.log err, validatedItem

			if err? 
				callback(err,null)
			else 

				currIndex += 1

				if currIndex == options.children.length 

					callback(null,validatedItem)

				else

					validateStep(validatedItem)
		)

	validateStep(item)

