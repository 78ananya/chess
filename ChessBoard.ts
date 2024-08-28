describe('valueGetterfunc', () => {
  it('should return - if params is null or undefined', () => {
    expect(valueGetterfunc(null)).toBe('-');
    expect(valueGetterfunc(undefined)).toBe('-');
  });

  it('should return - if params.data is null or undefined', () => {
    expect(valueGetterfunc({})).toBe('-');
    expect(valueGetterfunc({ data: null })).toBe('-');
    expect(valueGetterfunc({ data: undefined })).toBe('-');
  });

  it('should return - if params.colDef is null or undefined', () => {
    expect(valueGetterfunc({ data: {} })).toBe('-');
    expect(valueGetterfunc({ data: {}, colDef: null })).toBe('-');
    expect(valueGetterfunc({ data: {}, colDef: undefined })).toBe('-');
  });

  it('should return - if params.colDef.field is null or undefined', () => {
    expect(valueGetterfunc({ data: {}, colDef: {} })).toBe('-');
    expect(valueGetterfunc({ data: {}, colDef: { field: null } })).toBe('-');
    expect(valueGetterfunc({ data: {}, colDef: { field: undefined } })).toBe('-');
  });

  it('should return - if value is null or undefined', () => {
    expect(valueGetterfunc({ data: { test: null }, colDef: { field: 'test' } })).toBe('-');
    expect(valueGetterfunc({ data: { test: undefined }, colDef: { field: 'test' } })).toBe('-');
  });

  it('should return - if value is string "null"', () => {
    expect(valueGetterfunc({ data: { test: 'null' }, colDef: { field: 'test' } })).toBe('-');
  });

  it('should return the value if it exists', () => {
    expect(valueGetterfunc({ data: { test: 'hello' }, colDef: { field: 'test' } })).toBe('hello');
    expect(valueGetterfunc({ data: { test: 123 }, colDef: { field: 'test' } })).toBe(123);
  });

  it('should return - if any part of the chain is null or undefined', () => {
    expect(valueGetterfunc({ data: null, colDef: { field: 'test' } })).toBe('-');
    expect(valueGetterfunc({ data: {}, colDef: null })).toBe('-');
    expect(valueGetterfunc({ data: {}, colDef: { field: null } })).toBe('-');
  });
});
