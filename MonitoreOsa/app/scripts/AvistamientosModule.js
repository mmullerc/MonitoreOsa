angular.module('MonitoreOsa.Avistamientos', [])

.controller('NuevoCtrl', function($scope, $ionicPopover, $state) {

  $scope.nuevoAvistamiento = function(){

    $state.go('seleccionClases');

  }

})
.controller('ClasesCtrl', function($scope, $ionicPopover, $state, AnimalService,
  $timeout, AnimalTipoService, pouchService,$rootScope) {

     $scope.verMamiferosTerrestres = function(){

       var tipoAnimal = "mamifero-terrestre";

       AnimalTipoService.setAnimal(tipoAnimal);

       $state.go('seleccionEspecies');

     }

     $scope.verMamiferosAcuaticos = function(){

       var tipoAnimal = "mamifero-acuatico";

       AnimalTipoService.setAnimal(tipoAnimal);

       $state.go('seleccionEspecies');

     }

     $scope.verAves = function(){

       var tipoAnimal = "Ave";

       AnimalTipoService.setAnimal(tipoAnimal);

       $state.go('seleccionEspecies');

     }

     $scope.verReptiles = function(){

       var tipoAnimal = "Reptil";

       AnimalTipoService.setAnimal(tipoAnimal);

       $state.go('seleccionEspecies');

     }

     $scope.verAnfibios = function(){

       var tipoAnimal = "Reptil-acuatico";

       AnimalTipoService.setAnimal(tipoAnimal);

       $state.go('seleccionEspecies');

     }

     $scope.verPlantas = function(){

       var tipoAnimal = "Planta";

       AnimalTipoService.setAnimal(tipoAnimal);
       $state.go('seleccionEspecies');

     }

})
.controller('EspeciesCtrl', function($scope, $rootScope, $state, $ionicPopup,
  pouchService, AnimalService, $timeout, AnimalTipoService,TodosAnimales, $pouchDB) {

    var listaMamiferosTerrestres;
    var listaMamiferosAcuaticos;
    var listaAnfibiosTerrestres;
    var listaAnfibiosAcuaticos;
    var listaAves;
    var listaPlantas;

    var listaEspecies;
    $scope.listaEspecies = {};

    var animales = TodosAnimales.getAnimales();

    listaEspecies = animales;

    for(var key in listaEspecies){

    if(AnimalTipoService.getAnimal() == listaEspecies[key].tipo){
      $scope.listaEspecies[key] = listaEspecies[key];
      $scope.especies = "Animales";
    }
  }
  $scope.infoEspecie = function(animalSeleccionado){

    AnimalService.setAnimal(animalSeleccionado);
     $state.go('info-especie');
  }

  $scope.registrarEspecie = function(animalSeleccionado) {

    AnimalService.setAnimal(animalSeleccionado);
    $state.go('registroEspecie');
  };
})
.controller('InfoEspecieCtrl', function($scope, $ionicPopover, $state, pouchService, AnimalService) {

      $scope.especie = AnimalService.getAnimal();

      $scope.registrarEspecie = function() {

        $state.go('registroEspecie');

      };

      $scope.regresarReload = function(){
        $state.go('seleccionEspecies');
      }

        $scope.regresar = function(){
          $state.go('seleccionEspecies');
        }
})
.controller('RegistroEspecieCtrl', function($scope, $ionicPopover, $state, $filter, AnimalService,
  $rootScope, DBAvistamientos) {

      var avistamiento = {};
      $scope.especie = {};
      $scope.especie = AnimalService.getAnimal();

        var app = {};

        var appDate = $filter('date')(app.date, "dd/MM/yyyy");

        var _date = $filter('date')(new Date(), 'MMM dd yyyy');

        var _time = $filter('date')(new Date(), 'HH:mm:ss');

        $scope.fecha = _date;
        $scope.hora = _time;

        navigator.geolocation.getCurrentPosition(function(position) {

           $scope.latitud = position.coords.latitude;
           $scope.longitud = position.coords.longitude;

           avistamiento = {

             "idRegistro":"20 y prueba",
             "fecha":$scope.fecha,
             "hora":$scope.hora,
             "avistamiento":$scope.especie.nombre,
             "latitud":$scope.latitud,
             "longitud":$scope.longitud
           }

           DBAvistamientos.save(avistamiento);
           DBAvistamientos.upload();

         });

         $scope.cancelarRegistro = function(){
           $state.go('seleccionClases');
         }

         $scope.regresar = function(){
           $state.go('seleccionClases');
         }

         console.log($scope.latitud);

});
