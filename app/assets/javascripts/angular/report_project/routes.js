(function () {
  'use strict';

  angular.module('app.report_project').config(config);

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('report_project', {
        url: '/report_project',
        templateUrl: 'angular/report_project/_report.html',
        resolve: {
          // TODO: this is an exact copy of what's in logs/routes.js
          auth: ["$q", "currentUserService", function ($q, currentUserService) {

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
