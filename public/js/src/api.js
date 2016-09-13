/**
 * Mock authentication API
 */

let instance = null;
let httpRequest = new XMLHttpRequest();

class API {
  /**
   * API is a singleton
   */
  constructor (store) {
    if (!instance) {
      instance = this;
    }

    return instance;
  }

  /**
   * Authenticate supplied credentials with known user.
   * @param {String} username The supplied username.
   * @param {String} password The supplied password.
   * @return {Promise} a promise that resolves with login status.
   */
  authenticate (username, password) {
    return new Promise((resolve, reject) => {
      // mock some lag time..
      setTimeout(() => {
        this.request('GET', '/credentials.json').then((data) => {
          var credentials = JSON.parse(data).users.find((entry) => {
            return entry.username === username;
          }) || {};

          var resp = {
            username: {
              isValid: credentials.username === username,
              msgWarning: 'Username not found.'
            },
            password: {
              isValid: credentials.password === password,
              msgWarning: 'Password did not match username.'
            }
          };

          if (!resp.username.isValid || !resp.password.isValid) {
            resp.msg = 'Please correct the errors above';
            reject(resp);
          } else {
            resolve(credentials);
          }
        });
      }, 1000);
    });
  }

  /**
   * Async request.
   * @param {String} method HTTP request method.
   * @param {String} url URL of resource to request.
   */
  request (method, url) {
    return new Promise((resolve, reject) => {
      httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          return (httpRequest.status === 200) ?
              resolve(httpRequest.responseText) : reject('Error');
        }
      }

      httpRequest.open(method, url);
      httpRequest.send();
    });
  }
}

export default API;
