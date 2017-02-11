(function () {
  'use strict';

  angular.module('app.projects').factory('projectService', projectService);

  function projectService($resource) {

    var resourceForUser = function (user) {
      return $resource('/api/users/:user_id/projects/:id.json', { id: '@id', user_id: user.user_id }, {
        update: {
          method: 'PATCH'
        }});
    };

    return {
      resourceForUser: resourceForUser
    }
  }

})();
