(function () {
  'use strict';

  angular.module('app.logs').controller('LogsController', LogsController);

  function LogsController($scope, logService) {
    var vm = this;

    var logResource = logService.resourceForUser($scope.currentUserService.getCurrentUser());

    vm.logs = logResource.query();

    vm.rangeDescriptor = 'all';

    vm.new = function () {
      var now = new Date();
      vm.newLog = {
        'start_time': now
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
