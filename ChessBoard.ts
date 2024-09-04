// valueGetterfunc.test.js
import valueGetterfunc from './valueGetterfunc';

describe('valueGetterfunc', () => {
  it('should return the value when it exists', () => {
    const params = {
      data: { foo: 'bar' },
      colDef: { field: 'foo' }
    };

    const result = valueGetterfunc(params);
    expect(result).toBe('bar');
  });

  it('should return an empty string when the value is undefined', () => {
    const params = {
      data: { foo: undefined },
      colDef: { field: 'foo' }
    };

    const result = valueGetterfunc(params);
    expect(result).toBe('');
  });

  it('should return an empty string when the value is null', () => {
    const params = {
      data: { foo: null },
      colDef: { field: 'foo' }
    };

    const result = valueGetterfunc(params);
    expect(result).toBe('');
  });

  it('should return an empty string when the value is the string "null"', () => {
    const params = {
      data: { foo: 'null' },
      colDef: { field: 'foo' }
    };

    const result = valueGetterfunc(params);
    expect(result).toBe('');
  });

  it('should return an empty string when the data property is missing', () => {
    const params = {
      colDef: { field: 'foo' }
    };

    const result = valueGetterfunc(params);
    expect(result).toBe('');
  });

  it('should return an empty string when the colDef property is missing', () => {
    const params = {
      data: { foo: 'bar' }
    };

    const result = valueGetterfunc(params);
    expect(result).toBe('');
  });

  it('should return an empty string when the field property in colDef is missing', () => {
    const params = {
      data: { foo: 'bar' },
      colDef: {}
    };

    const result = valueGetterfunc(params);
    expect(result).toBe('');
  });
});
