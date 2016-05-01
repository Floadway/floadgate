module.exports = {
  processArray: function(array, process, callback) {
    var checkDone, done, finalArray, i, index, item, len, needed, results;
    needed = array.length;
    done = 0;
    finalArray = [];
    checkDone = function() {
      if (done === needed) {
        return callback(finalArray);
      }
    };
    if (needed !== 0) {
      results = [];
      for (index = i = 0, len = array.length; i < len; index = ++i) {
        item = array[index];
        results.push(process(item, index, function(finalItem) {
          finalArray.push(finalItem);
          done += 1;
          return checkDone();
        }));
      }
      return results;
    } else {
      return checkDone();
    }
  },
  processObject: function(object, process, callback) {
    var checkDone, done, finalObject, key, needed, results, value;
    needed = Object.keys(object).length;
    done = 0;
    finalObject = {};
    checkDone = function() {
      if (done === needed) {
        return callback(finalObject);
      }
    };
    if (needed !== 0) {
      results = [];
      for (key in object) {
        value = object[key];
        results.push(process(key, value, function(finalItem) {
          finalObject[key] = finalItem;
          done += 1;
          return checkDone();
        }));
      }
      return results;
    } else {
      return checkDone();
    }
  }
};
