var exampleObject1, exampleObject2, exampleObject3, schema, validator;

validator = require("./validator");

schema = {
  type: "object",
  mode: "shorten",
  keys: true,
  children: {
    name: {
      type: "string",
      minLength: 3
    },
    age: {
      type: "number",
      min: 1
    },
    shoppingCart: {
      type: "array",
      mode: "uniform",
      children: {
        type: "string",
        minLength: 4
      }
    },
    status: {
      type: "or",
      children: [
        {
          type: "is",
          value: "active"
        }, {
          type: "is",
          value: "inactive"
        }, {
          type: "is",
          value: "disabled"
        }
      ]
    }
  }
};

exampleObject1 = {
  name: "John",
  age: 3,
  shoppingCart: ["food", "baking soda", "ikea table"],
  status: "active"
};

validator.validate(exampleObject1, schema, function(err, res) {
  console.log(err, res);
  return console.log("\n\n\n");
});

exampleObject2 = {
  name: "Max",
  age: 4,
  shoppingCart: ["bar"],
  status: "disabled"
};

validator.validate(exampleObject2, schema, function(err, res) {
  console.log(err, res);
  return console.log("\n\n\n");
});

exampleObject3 = {
  name: "Jane",
  age: 5,
  shoppingCart: [],
  status: "unknown"
};

validator.validate(exampleObject3, schema, function(err, res) {
  console.log(err, res);
  return console.log("\n\n\n");
});
