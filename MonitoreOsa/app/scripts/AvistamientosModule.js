angular.module('MonitoreOsa.Avistamientos', [])

.controller('NuevoCtrl', function($scope, $ionicPopover, $state) {

  $scope.nuevoAvistamiento = function(){

    $state.go('seleccionClases');

  }

})
.controller('ClasesCtrl', function($scope, $ionicPopover, $state, AnimalService, $timeout, AnimalTipoService) {

     $scope.verMamiferosTerrestres = function(){

       var tipoAnimal = "mamifero-terrestre";

       AnimalTipoService.setAnimal(tipoAnimal);

       $state.reload('seleccionEspecies');
       $state.go('seleccionEspecies');

     }

     $scope.verMamiferosAcuaticos = function(){

       var tipoAnimal = "mamifero-acuatico";

       AnimalTipoService.setAnimal(tipoAnimal);

       $state.reload('seleccionEspecies');
       $state.go('seleccionEspecies');

     }

     $scope.verAves = function(){

       var tipoAnimal = "Ave";

       AnimalTipoService.setAnimal(tipoAnimal);

       $state.reload('seleccionEspecies');
       $state.go('seleccionEspecies');

     }

     $scope.verReptiles = function(){

       var tipoAnimal = "Reptil";

       AnimalTipoService.setAnimal(tipoAnimal);

       $state.reload('seleccionEspecies');
       $state.go('seleccionEspecies');

     }

     $scope.verAnfibios = function(){

       var tipoAnimal = "Anfibio";

       AnimalTipoService.setAnimal(tipoAnimal);

       $state.reload('seleccionEspecies');
       $state.go('seleccionEspecies');

     }

     $scope.verPlantas = function(){

       var tipoAnimal = "Planta";

       AnimalTipoService.setAnimal(tipoAnimal);

       $state.reload('seleccionEspecies');
       $state.go('seleccionEspecies');

     }

})
.controller('EspeciesCtrl', function($scope, $ionicPopover, $state, $ionicPopup, pouchService, AnimalService, $timeout, AnimalTipoService, MamiferosTerrestres,
  MamiferosAcuaticos,Aves,ReptilesAnfibiosTerrestres,ReptilesAnfibiosAcuaticos,Plantas) {

    var tipoAnimal;
    $scope.listaEspecies = {};

    tipoAnimal = AnimalTipoService.getAnimal();

    if(tipoAnimal == "mamifero-terrestre"){
      $scope.listaEspecies = MamiferosTerrestres.getMamiferosTerrestres();
      $scope.especies = "Mamiferos terrestres";
    }
    if(tipoAnimal == "mamifero-acuatico"){
      $scope.listaEspecies = MamiferosAcuaticos.getMamiferosAcuaticos();
      $scope.especies = "Mamiferos acuaticos";
    }
    if(tipoAnimal == "Ave"){
      $scope.listaEspecies = Aves.getAves();
      $scope.especies = "Aves";
    }
    if(tipoAnimal == "Reptil"){
      $scope.listaEspecies = ReptilesAnfibiosTerrestres.getTerrestres();
      $scope.especies = "Reptiles y anfibios";
    }
    if(tipoAnimal == "Reptil-acuatico"){
      $scope.listaEspecies = ReptilesAnfibiosAcuaticos.getAcuaticos();
      $scope.especies = "Reptiles y anfibios";
    }
    if(tipoAnimal == "Planta"){
      $scope.listaEspecies = Plantas.getPlantas();
      $scope.especies = "Plantas";
    }


  $scope.infoEspecie = function(animalSeleccionado){

    AnimalService.setAnimal(animalSeleccionado);
     $state.go('info-especie');
  }

  $scope.registrarEspecie = function() {

    $state.go('registroEspecie');
  };
})
.controller('InfoEspecieCtrl', function($scope, $ionicPopover, $state, pouchService, AnimalService) {

      $scope.especie = AnimalService.getAnimal();

      $scope.registrarEspecie = function() {

        $state.go('registroEspecie');

      };

      $scope.regresarReload = function(){
        $state.reload('seleccionEspecies');
        $state.go('seleccionEspecies');
      }

        $scope.regresar = function(){
          $state.reload('seleccionEspecies');
          $state.go('seleccionEspecies');
        }
})
.controller('RegistroEspecieCtrl', function($scope, $ionicPopover, $state, $filter, AnimalService, $rootScope) {

  $scope.especie = {};

        $scope.especie.nombre = "Ardilla coliroja";
        $scope.especie.nombreCientifico = "Sciurus granatensis";
        $scope.especie.descripcion = "La ardilla de cola roja es un miembro neotropical del género Sciurus."
        +  "Se le encuentra en Costa Rica, Panamá, Colombia, Ecuador, Trinidad y Tobago y Venezuela."
        +  "Existen más de una treintena de subespecies de esta ardilla americana.";

        $scope.especie.imagen = "images/ardilla_coliroja.png";


        var app = {};

        var appDate = $filter('date')(app.date, "dd/MM/yyyy");

        var _date = $filter('date')(new Date(), 'MMM dd yyyy');
      //  var timeNow = new Date().getDate();

        var _time = $filter('date')(new Date(), 'HH:mm:ss');

        $scope.fecha = _date;
        $scope.hora = _time;

        navigator.geolocation.getCurrentPosition(function(position) {

           $scope.latitud = position.coords.latitude;
           $scope.longitud = position.coords.longitude;

         });

         $scope.cancelarRegistro = function(){
             $state.reload('seleccionClases');
             $state.go('seleccionClases');
         }

         $scope.regresar = function(){
           $state.reload('seleccionClases');
           $state.go('seleccionClases');
         }

});
