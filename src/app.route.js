export default  function routeConfig($locationProvider, $routeProvider) {
  $routeProvider
    .when('/game', {template: '<game></game>'})
    .when('/leaders', {template: '<leaders></leaders>'})
    .when('/settings', {template: '<settings></settings>'})
    .when('/help', {template: '<help></help>'})
    .otherwise('/game');
  $locationProvider.hashPrefix('');
}

routeConfig.$inject = ['$locationProvider', '$routeProvider'];