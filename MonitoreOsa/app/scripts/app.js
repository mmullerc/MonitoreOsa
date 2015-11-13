// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('MonitoreOsa', ['ionic','MonitoreOsa.inicio','MonitoreOsa.Menu','MonitoreOsa.Avistamientos',
'MonitoreOsa.Modal','MonitoreOsa.Perfil','MonitoreOsa.Historial','MonitoreOsa.PouchService'])

.run(function($ionicPlatform, $rootScope,pouchService,AnimalService, $timeout,MamiferosTerrestres,
  MamiferosAcuaticos,Aves,ReptilesAnfibiosTerrestres,ReptilesAnfibiosAcuaticos,Plantas) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  var especie = {};
  especie.imagen ={};
  var listaEspecies = {};
  var mamiferosTerrestres = {};
  var mamiferosAcuaticos = {};
  var aves = {};
  var plantas = {};
  var anfibiosReptilesTerrestres = {};
  var anfibiosReptilesAcuaticos = {}

  var db = pouchService.getDatabase();

    db.allDocs({
      include_docs: true,
      attachments: true
    }).then(function (result) {

  for(var i = 0; i < result.rows.length; i++){

  if(result.rows[i].doc.tipo == "mamifero-terrestre"){

      especie = result.rows[i].doc;

      especie = getAttachment(especie);

      mamiferosTerrestres[i] = especie;

    }

    if(result.rows[i].doc.tipo == "mamifero-acuatico"){

        especie = result.rows[i].doc;

        especie = getAttachment(especie);

        mamiferosAcuaticos[i] = especie;

      }

      if(result.rows[i].doc.tipo == "Ave"){

          especie = result.rows[i].doc;

          especie = getAttachment(especie);

          aves[i] = especie;
        }

        if(result.rows[i].doc.tipo == "Reptil"){

            especie = result.rows[i].doc;

            especie = getAttachment(especie);

            anfibiosReptilesTerrestres[i] = especie;

          }

          if(result.rows[i].doc.tipo == "Reptil-acuatico"){

              especie = result.rows[i].doc;

              especie = getAttachment(especie);

              anfibiosReptilesAcuaticos[i] = especie;

            }

            if(result.rows[i].doc.tipo == "Planta"){

                especie = result.rows[i].doc;

                especie = getAttachment(especie);

                plantas[i] = especie;

              }

          }
          MamiferosTerrestres.setMamiferosTerrestres(mamiferosTerrestres);
          MamiferosAcuaticos.setMamiferosAcuaticos(mamiferosAcuaticos);
          Aves.setAves(aves);
          ReptilesAnfibiosTerrestres.setTerrestres(anfibiosReptilesTerrestres);
          ReptilesAnfibiosAcuaticos.setAcuaticos(anfibiosReptilesAcuaticos);
          Plantas.setPlantas(plantas);

    }).catch(function (err) {
      console.log(err);
    });

  function getAttachment(pespecie){

    for(var key in pespecie._attachments){
      db.getAttachment(pespecie._id,key).then(function (blob){
        var url = URL.createObjectURL(blob);
        pespecie.imagen = url;
      });
    }
    return pespecie;
  }

})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

$urlRouterProvider.otherwise('/');

$stateProvider
  .state('dash', {
    cache: false,
    url: '/dash',
    templateUrl: 'templates/dash.html',
    controller: 'InicioCtrl'
  })
  .state('avistamientos', {
    cache: false,
    url: '/',
    templateUrl: 'templates/avistamientos.html',
    controller: 'NuevoCtrl'
  })
  .state('seleccionClases', {
    cache: false,
    url: '/clases',
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
    url: '/info-historial',
    templateUrl: 'templates/info-historial.html',
    controller: 'info-historialCtrl'
  })
  .state('mi-historial', {
    cache: false,
    url: '/mi-historial',
    templateUrl: 'templates/mi-historial.html',
    controller: 'HistorialCtrl'
  });


})
