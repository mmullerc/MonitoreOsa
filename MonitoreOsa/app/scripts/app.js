// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('MonitoreOsa', ['ionic','MonitoreOsa.inicio','MonitoreOsa.IniciarSesion','MonitoreOsa.Avistamientos',
'MonitoreOsa.Modal','MonitoreOsa.Perfil','MonitoreOsa.Historial','MonitoreOsa.PouchService',
'MonitoreOsa.DBService','MonitoreOsa.DBAvistamientos','MonitoreOsa.Usuarios','MonitoreOsa.dash','ngCordova'])

.run(function($ionicPlatform, $pouchDB, $rootScope, $timeout, DBAvistamientos) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleLightContent();
    }
    $pouchDB.setDatabase();
    $pouchDB.getAll();
    DBAvistamientos.setDatabase();
      //$sqlService.setDatabase();
  });
  $rootScope.$apply();
  //$sqlService.getEspecies();
})

.config(function($stateProvider, $urlRouterProvider) {

$urlRouterProvider.otherwise('/avistamiento');

$stateProvider
  .state('dash', {
    url: '/dash',
    templateUrl: 'templates/dash.html',
    controller: 'InicioCtrl'
  })
  .state('iniciar-sesion', {
    url: '/iniciar-sesion',
    templateUrl: 'templates/iniciar-session.html',
    controller: 'iniciar-sesionCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/sign-up.html',
    controller: 'SignUpCtrl'
  })
  .state('avistamientos', {
    url: '/avistamiento',
    templateUrl: 'templates/avistamientos.html',
    controller: 'NuevoCtrl'
  })
  .state('seleccionClases', {
    url: '/clases',
    templateUrl: 'templates/seleccionClases.html',
    controller: 'ClasesCtrl'
  })
  .state('seleccionEspecies', {
    url: '/especies',
    templateUrl: 'templates/seleccionEspecies.html',
    controller: 'EspeciesCtrl'
  })
  .state('info-especie', {
    url: '/info-especie',
    templateUrl: 'templates/info-especie.html',
    controller: 'InfoEspecieCtrl'
  })
  .state('registroEspecie', {
    url: '/registro-especie',
    templateUrl: 'templates/registro-especie.html',
    controller: 'RegistroEspecieCtrl'
  })
  .state('mi-perfil', {
    url: '/mi-perfil',
    templateUrl: 'templates/mi-perfil.html',
    controller: 'PerfilCtrl'
  })
  .state('info-historial', {
    url: '/info-historial',
    templateUrl: 'templates/info-historial.html',
    controller: 'info-historialCtrl'
  })
  .state('mi-historial', {
    url: '/mi-historial',
    templateUrl: 'templates/mi-historial.html',
    controller: 'HistorialCtrl'
  });
});
