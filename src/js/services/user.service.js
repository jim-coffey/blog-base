class User {
  constructor (JWT, AppConstants, $http, $state, $q) {
    'ngInject';

    this._JWT = JWT;
    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$state = $state;
    this._$q = $q;

    // Objects to store our user properties
    this.current = null;
  }

  // Try to authenticate by registering or logging in
  attemptAuth (type, credentials) {
    let route = (type === 'login') ? '/login' : '';

    return this._$http({
      url: this._AppConstants.api + '/users' + route,
      method: 'POST',
      data: {
        user: credentials
      }
    }).then(
      // Success
      (res) => {
        // Store the user's info for easy lookup
        this.current = res.data.user;

        // Set the JWT token
        this._JWT.save(this.current.token);

        return res;
      }
    );
  }

  logout () {
    this.current = null;
    this._JWT.destroy();
    // Do a hard reload of current state to ensure all data is flushed
    this._$state.go(this._$state.$current, null, { reload: true });
  }

  verifyAuth () {
    let deferred = this._$q.defer();
    let token = this._JWT.get();

    // Check for JWT token first
    if (!token) {
      deferred.resolve(false);
      return deferred.promise;
    }

    // If there's a JWT token and user is set
    if (this.current) {
      deferred.resolve(true);

    // If current user isn't set, get it from the server.
    // If server doesn't 401, set current user & resolve promise.
    } else {
      this._$http({
        url: this._AppConstants.api + '/user',
        method: 'GET',
      }).then(
        res => {
          this.current = res.data.user;
          deferred.resolve(true);
        },
        // If an error happens, that means the user's token was invalid.
        err => {
          this._JWT.destroy();
          deferred.resolve(false);
        }
        // Reject automatically handled by auth interceptor
        // Will boot them to homepage
      );
    }

    return deferred.promise;
  }

  ensureAuthIs (bool) {
    let deferred = this._$q.defer();

    this.verifyAuth().then(
      authValid => {
        // if it's the opposite, redirect homepage
        if (authValid !== bool) {
          this._$state.go('app.home');
          deferred.resolve(false);
        } else {
          deferred.resolve(true);
        }
      }
    )

    return deferred.promise;
  }

  update (fields) {
    return this._$http({
      url: this._AppConstants.api + '/user',
      method: 'PUT',
      data: {
        user: fields
      }
    }).then(
      res => {
        this.current = res.data.user;
        return this.current;
      }
    )
  }
}

export default User;
