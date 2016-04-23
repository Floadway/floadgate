###
	@validator: "String"
	@supportedOptions:
		minLength: int
		maxLength: int
		exactLength: int
		matchRegex: regex
		
	@supportedOperators:
		trim: boolean
		toUpperCase: boolean
		toLowerCase: boolean
		replace: 
			pattern: regex/string
			value: mixed

###
module.exports = (params) ->
	{ options, callback, item, path } = params

	item = String(item)

	#  Operatators run first	

	#	@operator trim 
	if options.trim? and options.trim  then item = item.trim()

	# 	@operator toLowerCase
	if options.toLowerCase? and options.toLowerCase then item  = item.toLowerCase()

	#	@operator toUpperCase
	if options.toUpperCase? and options.toUpperCase then item = item.toUpperCase()

	#	@operator replace
	if options.replace? and options.replace.pattern? and options.replace.value?
		item = item.replace(options.replace.pattern,options.replace.value)

	# Now validate

	#	@validator minLength
	if options.minLength? and options.minLength > item.length 
		callback(
			path: path
			error: "tooShort"
			minLength: options.minLength
		,null)
		return
		
	#	@validator maxLength
	if options.maxLength? and options.maxLength < item.length 
		callback(
			path: path 
			error: "tooLong"
			maxLength: options.maxLength
		,null)
		return

	#	@validator exactLength
	if options.exactLength? and options.exactLength != item.length
		callback(
			path: path 
			error: "invalidLength"
			exactLength: options.exactLength
		,null)
		return
	
	# All done!
	callback(null,item)

