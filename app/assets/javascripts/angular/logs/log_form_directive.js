(function () {
  'use strict';

  angular.module('app.logs').directive('logForm', logForm);

  function logForm() {
    return {
      restrict: 'E',
      controller: 'LogFormController',
      scope: {
        log: '=log',
        projects: '=projects'
      },
      templateUrl: 'angular/logs/_form.html'
    }
  }

})();
