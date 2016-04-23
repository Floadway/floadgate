module.exports = 

	processArray: (array,process,callback) ->

		needed = array.length
		done = 0
		finalArray = []

		checkDone = ->

			if done == needed

				callback finalArray


		if needed != 0

			for item,index in array

				process(item,index,(finalItem) ->

					finalArray.push(finalItem)
					done += 1

					checkDone()
				)
		
		else

			checkDone()

	processObject: (object,process,callback) ->


		needed = Object.keys(object).length 

		done = 0

		finalObject = {}

		checkDone = ->

			if done == needed

				callback finalObject


		if needed != 0

			for key,value of object

				process(key,value,(finalItem) ->

					finalObject[key] = finalItem
					done += 1

					checkDone()
				)
