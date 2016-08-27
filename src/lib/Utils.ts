
export function makeDefault<T>(value: T,defaults): T{
    for(let key of Object.keys(defaults)){
        if(!value.hasOwnProperty(key)){
            value[key] = defaults[key];
        }
    }
    return value;
}