###
	@validator: "Number"
	@supportedOptions:
		min: int
		max: int
		value: int 


		
	@supportedOperators:
		round:  precision
		floor:  precision
		ceil:  precision
		minOp: int
		maxOp: int

###
module.exports = (params) ->
	{ options, callback, item, path } = params

	if !isNaN(item)

		# Operators run first
		
		#	@operator round
		if options.round? 
			precisionFactor = Math.pow(10,options.round)
			item = Math.round(item*precisionFactor)/precisionFactor
		
		#	@operator floor
		if options.floor?
			precisionFactor = Math.pow(10,options.round)
			item = Math.floor(item*precisionFactor)/precisionFactor
		
		#	@operator ceil
		if options.ceil?
			precisionFactor = Math.pow(10,options.round)
			item = Math.ceil(item*precisionFactor)/precisionFactor
		
		#	@operator minOp
		if options.minOp? then item = Math.min(item,options.minOp)
		
		#	@operator maxOp
		if options.maxOp? then item = Math.min(item,options.maxOp)

		# Now validate


		#	@validator options.min
		if options.min?

			if item < options.min 

				callback(
					error: "tooSmall"
					path: path 
					min: options.min 
				,null)
				return 
		
		#	@validator options.max
		if options.max?

			if item > options.max

				callback(
					error: "tooBig"
					path: path
					max: options.max
				,null)
				return 


		#	@validator options.value
		if options.value?

			if item != options.value 

				callback(
					error: "valueMismatch"
					path: path 
					value: options.value
				)
				return 

		# All done!

		callback(null,item)
	else 

		callback(
			error: "notNumber"
			path: path
		,null)
