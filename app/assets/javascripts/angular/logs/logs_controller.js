(function () {
  'use strict';

  angular.module('app.logs').controller('LogsController',LogsController);

  function LogsController($scope, logService, $http) {
    var vm = this;

    var logResource = logService.resourceForUser($scope.currentUserService.getCurrentUser());

    vm.logs = logResource.query();

    vm.projects = {};

    var user_id = $scope.currentUserService.getCurrentUser().user_id
    $http.get("api/users/" + user_id + "/projects.json").success(function(data) {
     vm.projects = data;
    });

    vm.rangeDescriptor = 'all';

    vm.new = function () {
      var now = new Date();
      vm.newLog = {
        'start_time': now,
        'project_id': vm.projects[0].id
      }
    };

    vm.newCancel = function () {
      vm.newLog = null;
    };

    vm.create = function () {
      var log = logResource.save(vm.newLog);
      vm.logs.push(log);
      vm.newLog = null;
    };

    vm.edit = function (log) {
      vm.editedLogMarker = log;
      vm.clonedLog = angular.extend({}, log);
    };

    vm.editCancel = function () {
      vm.editedLogMarker = null;
      vm.clonedLog = null;
    };

    vm.update = function () {
      logResource.update(vm.clonedLog);
      var project = vm.projects.find(function(project) {
        return vm.clonedLog.project_id == project.id;
      });
      vm.clonedLog.project.project_name = project.project_name;
      vm.logs.splice(vm.logs.indexOf(vm.editedLogMarker), 1, vm.clonedLog);
      vm.editedLogMarker = null;
      vm.clonedLog = null;
    };

    vm.destroy = function (log) {
      logResource.delete(log);
      vm.logs.splice(vm.logs.indexOf(log), 1);
    }
  }

})();
