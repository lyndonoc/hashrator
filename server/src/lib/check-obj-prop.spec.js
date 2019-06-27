const { checkObjProps, mapObjToProps } = require('./check-obj-prop');

describe('UTILITY FUNCTIONS TESTING', () => {
  it('traverses down to a nested object without breaking', () => {
    const obj = {
      a: {
        b: {
          c: {
            d: 1,
          },
        },
      },
    };
    expect(checkObjProps(obj, ['a', 'b', 'c'])).toEqual(obj.a.b.c);
    expect(checkObjProps(obj, ['a', 'b', 'c', 'd'])).toEqual(obj.a.b.c.d);
  });

  it('returns false if an object does not have a certain property instead of breaking', () => {
    const obj = {
      a: {
        b: {
          c: {
            d: 1,
          },
        },
      },
    };
    expect(checkObjProps(obj, ['a', 'b', 'c', 'd', 'e'])).toBeFalsy();
  });

  it('maps an object to a given shape', () => {
    const obj = {
      a: {
        b: {
          c: {
            d: 1,
          },
        },
      },
    };

    const result = mapObjToProps(obj, {
      resultOne: ['a', 'b', 'c'],
      resultTwo: ['a', 'b', 'c', 'd'],
      resultThree: ['a', 'b', 'c', 'd', 'e'],
    });

    expect(result).toEqual({
      resultOne: {
        d: 1,
      },
      resultTwo: 1,
      resultThree: false,
    });
  });

  it('uses a given function when mapping an object to a given shape', () => {
    const mock = jest.fn();
    const obj = {
      a: {
        b: {
          c: {
            d: 1,
          },
        },
      },
    };

    mapObjToProps(
      obj,
      {
        resultOne: ['a', 'b', 'c'],
        resultTwo: ['a', 'b', 'c', 'd'],
        resultThree: ['a', 'b', 'c', 'd', 'e'],
      },
      mock,
    );

    expect(mock).toBeCalledWith(obj, ['a', 'b', 'c']);
    expect(mock).toBeCalledWith(obj, ['a', 'b', 'c', 'd']);
    expect(mock).toBeCalledWith(obj, ['a', 'b', 'c', 'd', 'e']);
  });
});
