import config from '../../../app/config';

const MODULE_PATH = '../../../app/lib/http';

describe('Http library', () => {
  let httpLib;

  beforeEach(() => {
    httpLib = require(MODULE_PATH);
  });

  it('should exist', () => {
    expect(httpLib).toBeDefined();
  });

  describe('checkHttpStatus', () => {
    let response;

    beforeEach(() => {
      response = {
        a: 1,
      };
    });

    describe('with a response status 200', () => {
      beforeEach(() => {
        response.status = 200;
      });

      it('should return the response', () => {
        expect(httpLib.checkHttpStatus(response)).toEqual(response);
      });
    });

    describe('with a response status 400', () => {
      beforeEach(() => {
        response.status = 400;
      });

      it('should throw an error', () => {
        expect(() => httpLib.checkHttpStatus(response)).toThrow();
      });
    });
  });

  describe('localRequest', () => {
    let url;
    let options;

    beforeEach(() => {
      jest.resetModules();
      jest.setMock('isomorphic-fetch', (_url, _options) => {
        url = _url;
        options = _options;
      });
      httpLib = require(MODULE_PATH);
    });

    describe('when the window does not exist (server)', () => {
      it('should work', () => {
        httpLib.localRequest('/a/b', { a: 1 });
        expect(url).toBe(`http://localhost:${config.port}/a/b`);
        expect(options).toEqual({ a: 1 });
      });
    });

    describe('when the window does exist (client)', () => {
      let disableJSDomHook;

      beforeEach(() => {
        // this creates a 'window' which mocks being in the client
        disableJSDomHook = require('jsdom-global')();
      });

      afterEach(() => {
        disableJSDomHook();
      });

      it('should work', () => {
        httpLib.localRequest('/a/b', { a: 1 });
        expect(url).toBe('/a/b');
        expect(options).toEqual({ a: 1 });
      });
    });
  });
});
