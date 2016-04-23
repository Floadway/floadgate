module.exports = (params) ->
	{ options, callback, item, path } = params

	
	#	@validator boolean

	item = item == "true" or item == true

	
	#	@operator inverase

	if options.inverse? and options.inverse

		item = !item 

	callback(null,item)

