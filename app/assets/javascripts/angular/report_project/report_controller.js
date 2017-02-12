(function () {
  'use strict';

  angular.module('app.report_project').controller('ProjectReportController', ProjectReportController);

  function ProjectReportController($scope, logService, $http) {
    var vm = this;

    var logResource = logService.resourceForUser($scope.currentUserService.getCurrentUser());
    var user = $scope.currentUserService.getCurrentUser();

    // We can retrieve a collection from the server
    logResource.query(function (logs) {

      // TODO: move this out of the controller

      var loggingProject = _.groupBy(logs, function (log) {
        return log.project_id;
      });

      var Promise = $http.get("api/users/" + user.user_id + "/projects.json").success(function(data) {
        vm.projects = data;
      });


      Promise.then(function() {
        var loggingProjects = _.map(loggingProject, function (logsArray, key) {

          var project = {};


          var project_name = vm.projects.find(function(project) {
            return project.id == logsArray[0].project_id;
          });

          project.name = project_name.project_name;

          project.time_spent_working = _.reduce(logsArray, function (memo, num) {
            return memo + parseFloat(num.time_in_hours);
          }, 0);

          project.total_earned = _.reduce(logsArray, function (memo, num) {
            return memo + parseFloat(num.earning_in_rs);
          }, 0);

          project.average_earning = project.total_earned / project.time_spent_working;

          return project;
        });

        vm.projects_rep = loggingProjects;
      });

    });
  }

})();
