(function () {
  'use strict';

  angular.module('app.report').controller('ReportController', ReportController);

  function ReportController($scope, logService) {
    var vm = this;

    var logResource = logService.resourceForUser($scope.currentUserService.getCurrentUser());

    // We can retrieve a collection from the server
    logResource.query(function (logs) {

      // TODO: move this out of the controller
      logs = _.map(logs, function (log) {
        log.start_week_millisecond = moment(log.start_time).startOf('week').format('X');
        return log;
      });

      var loggingWeeks = _.groupBy(logs, function (log) {
        return log.start_week_millisecond;
      });

      loggingWeeks = _.map(loggingWeeks, function (logsArray, key) {

        var week = {};

        week.start_week_millisecond = key;
        week.start_week_human = moment.unix(key).format('YYYY-M-D');

        week.time_spent_working = _.reduce(logsArray, function (memo, num) {
          return memo + parseFloat(num.time_in_hours);
        }, 0);

        week.total_earned = _.reduce(logsArray, function (memo, num) {
          return memo + parseFloat(num.earning_in_rs);
        }, 0);

        week.average_earning = week.total_earned / week.time_spent_working;

        return week;
      });

      vm.weeks = loggingWeeks;
    });
  }

})();
