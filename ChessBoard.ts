describe('params?.data?.[params?.colDef?.field]', () => {
  it('should return undefined if params is null or undefined', () => {
    expect(undefined?.data?.[undefined?.colDef?.field]).toBeUndefined();
    expect(null?.data?.[null?.colDef?.field]).toBeUndefined();
  });

  it('should return undefined if params.data is null or undefined', () => {
    expect({}?.data?.[{}?.colDef?.field]).toBeUndefined();
    expect({ data: null }?.data?.[{ colDef: { field: 'test' } }?.colDef?.field]).toBeUndefined();
    expect({ data: undefined }?.data?.[{ colDef: { field: 'test' } }?.colDef?.field]).toBeUndefined();
  });

  it('should return undefined if params.colDef is null or undefined', () => {
    expect({ data: {} }?.data?.[null?.colDef?.field]).toBeUndefined();
    expect({ data: {} }?.data?.[undefined?.colDef?.field]).toBeUndefined();
  });

  it('should return undefined if params.colDef.field is null or undefined', () => {
    expect({ data: {} }?.data?.[{ colDef: { field: null } }?.colDef?.field]).toBeUndefined();
    expect({ data: {} }?.data?.[{ colDef: { field: undefined } }?.colDef?.field]).toBeUndefined();
  });

  it('should return the value if it exists', () => {
    expect({ data: { test: 'hello' } }?.data?.[{ colDef: { field: 'test' } }?.colDef?.field]).toBe('hello');
    expect({ data: { test: 123 } }?.data?.[{ colDef: { field: 'test' } }?.colDef?.field]).toBe(123);
  });

  it('should return undefined if the field does not exist in the data', () => {
    expect({ data: { test: 'hello' } }?.data?.[{ colDef: { field: 'non-existent' } }?.colDef?.field]).toBeUndefined();
  });
});
