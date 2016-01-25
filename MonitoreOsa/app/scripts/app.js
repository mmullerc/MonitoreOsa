// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('MonitoreOsa', ['ionic','MonitoreOsa.inicio','MonitoreOsa.Avistamientos',
'MonitoreOsa.Modal','MonitoreOsa.Perfil','MonitoreOsa.Historial','MonitoreOsa.PouchService',
'MonitoreOsa.DBService','MonitoreOsa.IniciarSesion','MonitoreOsa.DBAvistamientos','MonitoreOsa.colaboradores','MonitoreOsa.Usuarios','MonitoreOsa.dash','ngCordova'])

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
      //$sqlService.setDatabase();
  });

    $pouchDB.setDatabase();
    DBAvistamientos.setDatabase();

    $pouchDB.getAll();
    DBAvistamientos.getAll();

  //$sqlService.getEspecies();
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

$urlRouterProvider.otherwise('/avistamiento');

$stateProvider
  .state('dash', {
    cache: false,
    url: '/dash',
    templateUrl: 'templates/dash.html',
    controller: 'InicioCtrl'
  })
  .state('iniciar-sesion', {
    cache: false,
    url: '/iniciar-sesion',
    templateUrl: 'templates/iniciar-session.html',
    controller: 'iniciar-sesionCtrl'
  })
  .state('signup', {
    cache: false,
    url: '/signup',
    templateUrl: 'templates/sign-up.html',
    controller: 'SignUpCtrl'
  })
  .state('avistamientos', {
    url: '/avistamiento',
    cache: false,
    templateUrl: 'templates/avistamientos.html',
    controller: 'NuevoCtrl'
  })
  .state('seleccionClases', {
    url: '/clases',
    cache: false,
    templateUrl: 'templates/seleccionClases.html',
    controller: 'ClasesCtrl'
  })
  .state('seleccionEspecies', {
    cache: false,
    url: '/especies',
    templateUrl: 'templates/seleccionEspecies.html',
    controller: 'EspeciesCtrl'
  })
  .state('info-especie', {
    cache: false,
    url: '/info-especie',
    templateUrl: 'templates/info-especie.html',
    controller: 'InfoEspecieCtrl'
  })
  .state('registroEspecie', {
    cache: false,
    url: '/registro-especie',
    templateUrl: 'templates/registro-especie.html',
    controller: 'RegistroEspecieCtrl'
  })
  .state('mi-perfil', {
    cache: false,
    url: '/mi-perfil',
    templateUrl: 'templates/mi-perfil.html',
    controller: 'PerfilCtrl'
  })
  .state('info-historial', {
    cache: false,
    url: '/info-historial',
    templateUrl: 'templates/info-historial.html',
    controller: 'info-historialCtrl'
  })
  .state('colaboradores', {
    cache: false,
    url: '/colaboradores',
    templateUrl: 'templates/colaboradores.html',
    controller: 'colaboradoresCtrl'
  })
  .state('desarrolladores', {
    cache: false,
    url: '/desarrolladores',
    templateUrl: 'templates/desarrolladores.html',
    controller: 'DashCtrl'
  })
  .state('mi-historial', {
    cache: false,
    url: '/mi-historial',
    templateUrl: 'templates/mi-historial.html',
    controller: 'HistorialCtrl'
  });
});
