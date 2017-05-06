export default  function routeConfig($locationProvider, $routeProvider) {
  $routeProvider
    .when('/game', {template: '<game></game>'})
    .when('/leaders', {template: '<leaders></leaders>'})
    .when('/settings', {template: '<settings></settings>'})
    .otherwise('/game');
  $locationProvider.hashPrefix('');
}

routeConfig.$inject = ['$locationProvider', '$routeProvider'];