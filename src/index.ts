export type DataLoaderKey = string | number;

export interface AlignValuesArgs<TValue = any> {
  keys: DataLoaderKey[];
  values: TValue[];
  getKey: (value : TValue) => DataLoaderKey;
}

export function alignSingleValues<TValue = any>(args: AlignValuesArgs<TValue>) {
  const { keys, values, getKey } = args;

  // Build indexed object that maps keys to values
  const indexedValues = values.reduce((acc: object, nextValue: TValue) => {
    const key = getKey(nextValue);

    return {
      ...acc,
      [key]: nextValue,
    };
  }, {});

  // "We must return an Array of values the same length as the Array of keys,
  // and re-order them to ensure each index aligns with the original keys"
  const alignedValues = keys.map((key): TValue => {
    const value = indexedValues[key];

    if (value === undefined) {
      return null; // Fill in missing values
    }

    return value;
  });

  return alignedValues;
}

export function alignManyValues<TValue = any>(args: AlignValuesArgs<TValue>) {
  const { keys, values, getKey } = args;

  // Build indexed object that maps keys to values
  const indexedValues = values.reduce((acc: object, nextValue: TValue) => {
    const groupKey = getKey(nextValue);

    // Return an array of values instead of a single value
    const nextGroupedValues = [
      // Flattened values are grouped into an array by key
      ...(acc[groupKey] || []),
      nextValue,
    ];

    return {
      ...acc,
      [groupKey]: nextGroupedValues,
    };
  }, {});

  // "We must return an Array of values the same length as the Array of keys,
  // and re-order them to ensure each index aligns with the original keys"
  const alignedValues = keys.map((key): TValue[] => {
    const value = indexedValues[key];

    if (value === undefined) {
      return []; // Fill in missing values
    }

    return value;
  });

  return alignedValues;
}
