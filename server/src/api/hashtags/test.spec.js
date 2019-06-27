const request = require('supertest');

const app = require('../../app');
const cache = require('../../lib/cache');
const config = require('../../config');
const helpers = require('../../lib/check-obj-prop');

jest.mock('request-promise', () => ({
  get: () => {
    const config = require('../../config');
    return Promise.resolve(config.MOCKED_RESPONSE);
  },
}));

jest.mock('../../lib/check-obj-prop', () => ({
  mapObjToProps: jest.fn((obj = {}, mappings = {}, mapper) => {
    return Object.keys(mappings).reduce(
      (acc, value) => ({
        ...acc,
        [value]: mapper(obj, mappings[value]),
      }),
      {},
    );
  }),
  checkObjProps: jest.fn((obj = {}, props = []) => {
    let target = obj;

    for (let i = 0; i < props.length; i++) {
      if (!target.hasOwnProperty(props[i])) {
        return false;
      }
      target = target[props[i]];
    }

    return target;
  }),
}));

describe('ENDPOINTS TESTING', () => {
  const mockedData = JSON.parse(config.MOCKED_PARSED_DATA);

  let mapObjToPropsCalled = 0;
  let checkObjPropsCalled = 0;

  it('retrieves hashtags that are used together', (done) => {
    request(app)
      .get('/api/hashtags/toronto')
      .expect(200)
      .end((err, res) => {
        const { data, isConsecutive, totalSize } = res.body;

        expect(helpers.mapObjToProps).toHaveBeenCalled();
        expect(helpers.checkObjProps).toHaveBeenCalled();

        mapObjToPropsCalled = helpers.mapObjToProps.mock.calls.length;
        checkObjPropsCalled = helpers.checkObjProps.mock.calls.length;

        expect(data).toEqual(mockedData.TOP);
        expect(isConsecutive).toBeFalsy();
        expect(totalSize).toEqual(mockedData.SIZE);

        return cache.get('toronto').then((cached) => {
          expect(cached).toEqual(config.MOCKED_PARSED_DATA);
          // eslint-disable-next-line promise/no-callback-in-promise
          return done();
        });
      });
  });

  it('retrieves hashtags from cache server', (done) => {
    request(app)
      .get('/api/hashtags/toronto')
      .expect(200)
      .end((err, res) => {
        const { data, isConsecutive, totalSize } = res.body;

        expect(helpers.mapObjToProps.mock.calls).toHaveLength(
          mapObjToPropsCalled,
        );
        expect(helpers.checkObjProps.mock.calls).toHaveLength(
          checkObjPropsCalled,
        );

        expect(totalSize).toEqual(mockedData.SIZE);
        expect(isConsecutive).toBeFalsy();
        expect(data).toEqual(mockedData.TOP);

        done();
      });
  });
});
