(function () {
  'use strict';

  angular.module('app.projects').directive('projectForm', projectForm);

  function projectForm() {
    return {
      restrict: 'E',
      scope: {
        project: '=project'
      },
      templateUrl: 'angular/projects/_form.html'
    }
  }

})();
