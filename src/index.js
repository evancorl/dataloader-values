const alignDataloaderValues = ({
  keys,
  values,
  getKey,
  hasMany = false,
}) => {
  // Build indexed object that maps keys to values
  const indexedValues = values.reduce((prevValues, nextValue) => {
    const key = getKey(nextValue);

    // For "hasMany" relationships, return an array of values instead of a single value
    const value = hasMany
      ? [
        // Flattened values are grouped into an array by key
        ...prevValues[key] || {},
        nextValue,
      ]
      : nextValue;

    return {
      ...prevValues,
      [key]: value,
    };
  }, {});

  // "We must return an Array of values the same length as the Array of keys,
  // and re-order them to ensure each index aligns with the original keys"
  const alignedValues = keys.map((key) => {
    const value = indexedValues[key];

    if (value === undefined) {
      return hasMany ? [] : null; // Fill in missing values
    }

    return value;
  });

  return alignedValues;
};

export default alignDataloaderValues;
