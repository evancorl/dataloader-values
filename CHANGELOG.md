# dataloader-values Changelog

## v2.0.0

### Breaking changes

- There is no longer a single exported function that accepts a `hasMany` argument. Instead, the package now exports two separate functions: `alignSingleValues` and `alignManyValues`. Each function accepts the [same arguments](https://github.com/evancorl/dataloader-values/tree/v2#api). This change makes it more clear what data is expected to be input and output, providing better TypeScript support.
- It is now assumed that the `DataLoader` keys provided are either a string or number.
- The exported `DataLoaderOptions` interface has been replaced by `AlignValuesArgs`.

### Non-breaking changes

- The `DataLoaderKey` type is now exported for TypeScript convenience.
