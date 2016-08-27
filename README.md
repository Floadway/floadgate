# Floodgate validator

Floodgate validator is a Typescript validaton library based on decorators.

## Features
* Does not change class/object behaviour
* Extensible (docs on how to add validators coming soon)
* Plays nice with Typescript 

## Installations


```bash
    npm install floodgate --save
```

## Run tests

1. Clone this repo
2. Go to root of project
3. run
    ```bash
        npm install -g mocha && mocha
    ``` 

## Usage 

```typescript
    
    import { Schema, Str, Nr, SchemaStore, Arr, Child , SchemaMode, Email, Child } from "floodgate";
    
    @Schema({ mode: SchemaMode.STRICT })
    class Person{
        
        @Str({ minLength: 3, maxLength: 4 })
        name: string;
        
        @Nr({ min: 1 , allowDecimals: false})
        age: number;
        
        @Email()
        email: string;
        
        @Child({ type: Pet })
        favoritePet: Pet;
        
        
        @Arr({ child: Pet })
        otherPets: Pet[];
        
        
        @Arr({ child: Str({ minLength: 3, trim: true }) })
        tags: string[];
        
    }
    
    @Schema({ mode: SchemaMode.STRICT })
    class Pet{
        
        @Str({ minLength: 3, maxLength: 4 })
        name: string;
        
        @Nr({ min: 1 , allowDecimals: false})
        age: number;
        
    }
    
    // Behaves like a normal class
    let person = new Person();
    
    // Modify....
    
    // Validate
    
    SchemaStore.validate(person,(err,person) => {
       // Err contains a ValidationError or is null
       // Person is the validated schema, which may have been modified depending on your configuration
    });
    
``` 

## Schema modes
* `SchemaMode.STRICT` only allows specified properties on an object. Not more not less.
* `SchemaMode.LOOSE` only checks specified properties. Leaves other properties as they are.
* `SchemaMode.SHORTEN` only checks specified properties. Removes all unknown properties silently.




## Validators

* `@Nr(options)` ensures a value is a number 
* `@Bool(options)` ensures a value is a boolean 
* `@Str(options)` ensures a value is a string 
* `@Email(options)` ensures a value is an email address 
* `@Arr({ child: Type ... })` ensures a value is an array of given type 
* `@Child({ type: Type ... })` ensures a value is an object based on another schema
* More to come soon