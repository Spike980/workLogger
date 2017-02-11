(function () {
  'use strict';

  angular.module('app.logs').controller('LogFormController', LogFormController);

  function LogFormController($scope) {
    $scope.closeDropdown = function () {
      $scope.dropdownOpen = false;
    }
  }

})();
