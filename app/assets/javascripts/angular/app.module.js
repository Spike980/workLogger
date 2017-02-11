angular.module('app',
  [
    'ui.bootstrap',
    'ui.router',
    'templates',
    'ngMessages',

    'app.logs',
    'app.login',
    'app.report',
    'app.users'
  ]);

angular.module('app.logs', [
  'ui.bootstrap.datetimepicker',
  'ngResource'
]);

angular.module('app.login', []);
angular.module('app.report', []);
angular.module('app.users', []);
