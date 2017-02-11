(function () {
  'use strict';

  angular.module('app.logs').config(config);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('logs');

    $stateProvider.state('logs', {
      url: '/logs',
      templateUrl: 'angular/logs/_logs.html',
      resolve: {
        auth: ["$q", "currentUserService", function ($q, currentUserService) {

          // TODO: this is an exact copy of what's in reports/routes.js
          // Look here for ideas? http://www.sitepoint.com/implementing-authentication-angular-applications/

          var currentUser = currentUserService.getCurrentUser();

          if (currentUser) {
            return $q.when(currentUser);
          } else {
            return $q.reject({ authenticated: false });
          }
        }]
      }
    })
  }

})();
