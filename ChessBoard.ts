it('should return undefined if params.data is an empty object', () => {
  const valueGetterfunc = (params: any) => {
    const value = params?.data?.[params?.colDef?.field];
    return value;
  };
  expect(valueGetterfunc({ data: {}, colDef: { field: 'test' } })).toBeUndefined();
});

it('should return undefined if params.colDef.field is an empty string', () => {
  const valueGetterfunc = (params: any) => {
    const value = params?.data?.[params?.colDef?.field];
    return value;
  };
  expect(valueGetterfunc({ data: { test: 'hello' }, colDef: { field: '' } })).toBeUndefined();
});
