export enum SchemaMode{
    LOOSE, // Leaves values not defined in the schema as they are.
    STRICT, // Requires all keys to be equal
    SHORTEN, // Remove all unknown keys
}