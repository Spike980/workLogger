(function () {
  'use strict';

  angular.module('app.logs').factory('logService', logService);

  function logService($resource) {

    var resourceForUser = function (user) {
      return $resource('/api/users/:user_id/logs/:id.json', { id: '@id', user_id: user.user_id }, {
        update: {
          method: 'PATCH'
        }});
    };

    return {
      resourceForUser: resourceForUser
    }
  }

})();
