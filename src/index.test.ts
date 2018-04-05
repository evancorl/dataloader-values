import alignDataloaderValues from './index';

// https://www.npmjs.com/package/dataloader#batch-function
test('correctly aligns values from dataloader example', () => {
  const keys = [2, 9, 6, 1];

  const values = [
    { id: 9, name: 'Chicago' },
    { id: 1, name: 'New York' },
    { id: 2, name: 'San Francisco' },
  ];

  const alignedValues = alignDataloaderValues({
    keys,
    values,
    getKey: (({ id }) => id),
  });

  const expectedValues = [
    { id: 2, name: 'San Francisco' },
    { id: 9, name: 'Chicago' },
    null,
    { id: 1, name: 'New York' },
  ];

  expect(alignedValues).toMatchObject(expectedValues);
});

test('correctly aligns relational values (arrays)', () => {
  const keys = [1, 2, 3, 4, 5];

  const values = [
    { relationalId: 1, name: 'Evan Corl' },
    { relationalId: 5, name: 'Chuong Le' },
    { relationalId: 5, name: 'Kristy Miller' },
    { relationalId: 3, name: 'Mallory Siler' },
    { relationalId: 1, name: 'Jimmy Thigpen' },
  ];

  const alignedValues = alignDataloaderValues({
    keys,
    values,
    getKey: (({ relationalId }) => relationalId),
    hasMany: true,
  });

  const expectedValues = [
    [
      { relationalId: 1, name: 'Evan Corl' },
      { relationalId: 1, name: 'Jimmy Thigpen' },
    ],
    [],
    [
      { relationalId: 3, name: 'Mallory Siler' },
    ],
    [],
    [
      { relationalId: 5, name: 'Chuong Le' },
      { relationalId: 5, name: 'Kristy Miller' },
    ],
  ];

  expect(alignedValues).toMatchObject(expectedValues);
});
