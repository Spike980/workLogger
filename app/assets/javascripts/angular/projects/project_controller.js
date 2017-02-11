(function () {
  'use strict';

  angular.module('app.projects').controller('ProjectsController', ProjectsController);

  function ProjectsController($scope, projectService) {
    var vm = this;

    var projectResource = projectService.resourceForUser($scope.currentUserService.getCurrentUser());

    vm.projects = projectResource.query();


    vm.new = function () {
      vm.newProject = {
        'project_name': ''
      }
    };

    vm.newCancel = function () {
      vm.newProject = null;
    };

    vm.create = function () {
      var project = projectResource.save(vm.newProject);
      vm.projects.push(project);
      vm.newProject = null;
    };

    vm.edit = function (project) {
      vm.editedProjectMarker = project;
      vm.clonedProject = angular.extend({}, project);
    };

    vm.editCancel = function () {
      vm.editedProjectMarker = null;
      vm.clonedProject = null;
    };

    vm.update = function () {
      projectResource.update(vm.clonedProject);
      vm.projects.splice(vm.projects.indexOf(vm.editedProjectMarker), 1, vm.clonedProject);
      vm.editedProjectMarker = null;
      vm.clonedProject = null;
    };

    vm.destroy = function (project) {
      projectResource.delete(project);
      vm.projects.splice(vm.projects.indexOf(project), 1);
    }
  }

})();
