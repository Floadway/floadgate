# Floadgate

Floadgate is the JSON-Tree validator used by floadway. It validates JSON trees recursively, allows for data preparation tasks and is declaritively configured.


**Installation**
```bash
  npm install --save floadgate
```
**Usage** 
```coffeescript
  validator = require("floadgate")
  
  schema = 
  	type: "object"
  	mode: "shorten"
  	keys: true
  	children: 
  		name: 
  			type: "string"
  			minLength: 3
  		age: 
  			type: "number"
  			min: 1
  		shoppingCart:
  			type: "array"
  			mode: "uniform"
  			children:
  				type: "string"
  				minLength: 4
  		
  		status:
  			type: "or"
  			children: [
  				{ type: "is" , value: "active"}
  				{ type: "is" , value: "inactive"}
  				{ type: "is" , value: "disabled"}
  			]
  		
  
  exampleObject1 = 
  	name: "John"
  	age: 3
  	shoppingCart: ["food","baking soda","ikea table"]
  	status: "active"
  
  
  validator.validate(exampleObject1,schema, (err,res) ->
  	console.log(err, res)
  	console.log("\n\n\n")
  )
```

## Types

### String

```coffeescript
  {
    type: "string"
    
    minLength: int #Optional
    maxLength: int  #Optional
    exactLength: int #Optional
    
    trim: boolean #Optional
    toUpperCase: boolean #Optional
    toLowerCase: boolean #Optional
    replace: #Optional
      pattern: regex/string
      value: replacementValue
    
  }
```

### Number

```coffeescript
  {
    type: "number"
    min: Number #Optional: Is not lower than value
    max: Number #Optional: Is not higher than value
    value: Number #Optional: Match exact value
    
    round: Number #Optional: Round to Number decimal places
    floor: Number #Optional: Floor to Number decimal places
    ceil: Number #Optional: Ceil to Number decimal places
    minOp: Number #Optional: Choose the smallest number between the number processed or defined
    maxOp: Number #Optional: Choose the highest number between the number processed or defined
  }
```


### Object

```coffeeescript
  
  {
    type: "object"
    mode: "loose" or "shorten"  
    children: { key: ...config } or { type: ... } 
  }
```
Using loose uses the same validation config for all children, shorten strips keys not defined in the schema and uses a config specified for each entry.

Example for loose: 

```coffeescript
  schema = 
    type: "object"
    mode: "loose"
    # All items share the same validation rule
    children: {
      type: "string"
      minLength: 3
    }
    
  #------------------------------------
  
  wouldPass = 
    123: "foobar"
    example: "fowp123"
    somethingElse: "123"
    
  wouldNotPass = 
    
    123: 123
    124: true
    example: "foo"
  
```

**Example for shorten** 

```coffeescript
  
  schema = 
    type: "object"
    mode: "shorten"
    children:
      name: 
        type: "string"
      age: 
        type: "number"
  #------------------------------------
  wouldPass = 
    name: "John"
    age: 32
    willBeRemovedWithoutError: true
  
  wouldNotPass = 
    name: "John"
    # This item is missing the age prop
  
  wouldNotPassEither = 
    name: "John"
    age: true
    # Items are validated too and have to pass
```

### Array
```coffeescript
  {
    type: "array"
    mode: "unique" , "uniform" # Unique has a validation config for each index, uniform validates a single config
    children: [... validationConfig ] or ...validaionConfig
  }

```


### Boolean

```coffeescript
  {
    type: "boolean"
    inverse: boolean # Optional: Reverse the output 
  }
```

### Or
Allows to validate a value against multiple rules requiring only one to pass
```coffeescript
  {
    type: "or"
    children: [...validation types]
  }
```

### And 
Allows to validate a value against multiple rules

```coffeescript
  {
    type: "and"
    children: [...validation types]
  }
```




