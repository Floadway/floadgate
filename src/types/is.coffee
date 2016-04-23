{ processArray } = require("./utils")


module.exports = (params) ->
	{ options, callback, item, path, validate } = params


	if item == options.value 
		callback(null,item)
	else
		callback(
			error: "valueMismatch"
			path: path
		,null)