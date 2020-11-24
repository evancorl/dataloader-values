# dataloader-values

[dataloader](https://www.npmjs.com/package/dataloader) is an awesome package used for batching/caching and plays really well with GraphQL.

The only purpose of this package is to format the array of values returned from a batch function to uphold [dataloader constraints](https://www.npmjs.com/package/dataloader#batch-function):
>* The Array of values must be the same length as the Array of keys.
>* Each index in the Array of values must correspond to the same index in the Array of keys.

That means this package will be useful if it is difficult or impossible for you to accomplish any of the following with your batch function:

* Fill in missing values
* Sort values by key
* Group flattened values by key

Note that missing values are filled in with `null` for keys with single values and `[]` for keys with many values.

## Installation

```shell
yarn add dataloader-values
```
or
```shell
npm install dataloader-values
```

## Usage

Consider the [example](https://www.npmjs.com/package/dataloader#batch-function) from `dataloader`. Your implementation might look like this:
```js
import DataLoader from 'dataloader';
import { alignSingleValues } from 'dataloader-values';
import batchFetchLocations from './batchFetchLocations'; // Your batch function

const locationLoader = new DataLoader(async keys => {
  const values = await batchFetchLocations(keys);

  const alignedValues = alignSingleValues({
    keys,
    values,
    getKey: ({ id }) => id,
  });

  return alignedValues;
});
```

You can also return values grouped into arrays by key (e.g., in a one-to-many relationship). For instance:
```js
import DataLoader from 'dataloader';
import { alignManyValues } from 'dataloader-values';
import batchFetchComments from './batchFetchComments'; // Your batch function

const commentsLoader = new DataLoader(async keys => {
  // Returns flattened, ungrouped values
  const values = await batchFetchComments(keys);

  // Returns values grouped into arrays by key
  const alignedValues = alignManyValues({
    keys,
    values,
    getKey: ({ postId }) => postId,
  });

  return alignedValues;
});
```

See [tests](https://github.com/evancorl/dataloader-values/blob/master/src/index.test.ts) for a better breakdown of the data transformation.

## API

```typescript
export declare function alignSingleValues<TValue = any>(args: AlignValuesArgs<TValue>): TValue[];
export declare function alignManyValues<TValue = any>(args: AlignValuesArgs<TValue>): TValue[][];
```

Both exported functions expect an object with the following arguments:

Field|Description
---|---
keys|Array of `DataLoader` keys
values|Array of values returned from batch function
getKey|Callback function that returns the key from a single value (e.g., `({ id }) => id`)
