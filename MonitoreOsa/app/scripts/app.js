// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'MonitoreOsa' is the name of this angular module example (also set in a <body> attribute in index.html)

angular.module('MonitoreOsa', ['ionic','MonitoreOsa.services','MonitoreOsa.AvistamientosService',
'MonitoreOsa.InicioCtrl','MonitoreOsa.HistorialCtrl','MonitoreOsa.PerfilCtrl','MonitoreOsa.Avistamientos',
'MonitoreOsa.InfoEspecie'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'InicioCtrl'
      }
    }
  })

  .state('tab.mi-perfil', {
      url: '/mi-perfil',
      views: {
        'mi-perfil': {
          templateUrl: 'templates/mi-perfil.html',
          controller: 'PerfilCtrl'
        }
      }
    })
    .state('tab.historial', {
      url: '/historial',
      views: {
        'historial': {
          templateUrl: 'templates/historial.html',
          controller: 'HistorialCtrl'
        }
      }
    })
  .state('tab.avistamientos', {
    url: '/avistamientos',
    views: {
      'avistamientos': {
        templateUrl: 'templates/avistamientos.html',
        controller: 'AvistamientoCtrl'
      }
    }
  })
  .state('tab.mamiferos', {
    url: '/mamiferos',
    views: {
      'avistamientos': {
        templateUrl: 'templates/mamiferos.html',
        controller: 'MamiferosCtrl'
      }
    }
  })
  .state('tab.reptiles', {
    url: '/reptiles',
    views: {
      'avistamientos': {
        templateUrl: 'templates/reptiles.html',
        controller: 'ReptilesCtrl'
      }
    }
  })
  .state('tab.aves', {
    url: '/aves',
    views: {
      'avistamientos': {
        templateUrl: 'templates/aves.html',
        controller: 'AvesCtrl'
      }
    }
  })
  .state('tab.peces', {
    url: '/peces',
    views: {
      'avistamientos': {
        templateUrl: 'templates/peces.html',
        controller: 'PecesCtrl'
      }
    }
  })
  .state('tab.anfibios', {
    url: '/anfibios',
    views: {
      'avistamientos': {
        templateUrl: 'templates/anfibios.html',
        controller: 'AnfibiosCtrl'
      }
    }
  })
  .state('tab.plantas', {
    url: '/plantas',
    views: {
      'avistamientos': {
        templateUrl: 'templates/plantas.html',
        controller: 'PlantasCtrl'
      }
    }
  })
  .state('tab.info-especie', {
    url: '/info-especie',
    views: {
      'avistamientos': {
        templateUrl: 'templates/info-especie.html',
        controller: 'InfoEspecieCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
