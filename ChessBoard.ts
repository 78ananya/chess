describe('valueGetterfunc', () => {
  it('should return undefined if params is null or undefined', () => {
    const valueGetterfunc = (params: any) => {
      const value = params?.data?.[params?.colDef?.field];
      return value;
    };
    expect(valueGetterfunc(null)).toBeUndefined();
    expect(valueGetterfunc(undefined)).toBeUndefined();
  });

  it('should return undefined if params.data is null or undefined', () => {
    const valueGetterfunc = (params: any) => {
      const value = params?.data?.[params?.colDef?.field];
      return value;
    };
    expect(valueGetterfunc({})).toBeUndefined();
    expect(valueGetterfunc({ data: null })).toBeUndefined();
    expect(valueGetterfunc({ data: undefined })).toBeUndefined();
  });

  it('should return undefined if params.colDef is null or undefined', () => {
    const valueGetterfunc = (params: any) => {
      const value = params?.data?.[params?.colDef?.field];
      return value;
    };
    expect(valueGetterfunc({ data: {} })).toBeUndefined();
    expect(valueGetterfunc({ data: {}, colDef: null })).toBeUndefined();
    expect(valueGetterfunc({ data: {}, colDef: undefined })).toBeUndefined();
  });

  it('should return undefined if params.colDef.field is null or undefined', () => {
    const valueGetterfunc = (params: any) => {
      const value = params?.data?.[params?.colDef?.field];
      return value;
    };
    expect(valueGetterfunc({ data: {}, colDef: {} })).toBeUndefined();
    expect(valueGetterfunc({ data: {}, colDef: { field: null } })).toBeUndefined();
    expect(valueGetterfunc({ data: {}, colDef: { field: undefined } })).toBeUndefined();
  });

  it('should return the value if it exists', () => {
    const valueGetterfunc = (params: any) => {
      const value = params?.data?.[params?.colDef?.field];
      return value;
    };
    expect(valueGetterfunc({ data: { test: 'hello' }, colDef: { field: 'test' } })).toBe('hello');
    expect(valueGetterfunc({ data: { test: 123 }, colDef: { field: 'test' } })).toBe(123);
  });

  it('should return undefined if the field does not exist in the data', () => {
    const valueGetterfunc = (params: any) => {
      const value = params?.data?.[params?.colDef?.field];
      return value;
    };
    expect(valueGetterfunc({ data: { test: 'hello' }, colDef: { field: 'non-existent' } })).toBeUndefined();
  });
});
