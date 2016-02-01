angular.module('MonitoreOsa.Avistamientos', [])

.controller('NuevoCtrl', function($scope, $ionicPopover, $state, $pouchDB, $timeout, TodosAnimales) {

  //  alert("adios!");

  if(localStorage.getItem("nombre") == null){
      $state.go("iniciar-sesion");
    }

  // $pouchDB.getAll();

  $scope.nuevoAvistamiento = function(){

    $state.go('seleccionClases');
}
})
.controller('ClasesCtrl', function($scope, $ionicPopover, $state, AnimalService,
  $timeout, AnimalTipoService,$rootScope) {

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
   AnimalService, $timeout, AnimalTipoService,TodosAnimales, ServerEspecies) {

    var listaEspecies = {};

    listaEspecies = TodosAnimales.getAnimales();

    var size = 0, key;
    for (key in listaEspecies) {
        if (listaEspecies.hasOwnProperty(key)) size++;
    }

    if(size == 0){
      listaEspecies = ServerEspecies.getEspeciesServidor();
    }

    $scope.listaEspecies = {};

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
.controller('InfoEspecieCtrl', function($scope, $ionicPopover, $state, AnimalService) {

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
.controller('RegistroEspecieCtrl', function($scope, $state, $filter, AnimalService,
  $rootScope, DBAvistamientos, Camera, $ionicPopup, TempHistorial) {

      var avistamiento = {};
      $scope.especie = {};
      $scope.especie = AnimalService.getAnimal();
      $scope.latitud = {};
      $scope.longitud = {};
      var _id;
      var registroCorrecto = {};
      var imagenRegistroCorrecto = {};

        var app = {};

        var appDate = $filter('date')(app.date, "dd/MM/yyyy");

        var _date = $filter('date')(new Date(), 'MMM dd yyyy');

        var _time = $filter('date')(new Date(), 'HH:mm:ss');

        $scope.fecha = _date;
        $scope.hora = _time;

        var options = {
          enableHighAccuracy: true,
          maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(function(position) {

           $scope.latitud = position.coords.latitude;
           $scope.longitud = position.coords.longitude;

           avistamiento = {
             "fecha":$scope.fecha,
             "hora":$scope.hora,
             "avistamiento":$scope.especie.nombre,
             "latitud":$scope.latitud,
             "longitud":$scope.longitud
           }
           _id = new Date().toISOString();
           DBAvistamientos.save(_id,avistamiento);

           TempHistorial.setHistoTemp(avistamiento);

         }, function(err) {
           var confirmPopup = $ionicPopup.alert({
             title: 'Active el GPS del celular',
             okType: 'button-assertive',
             okText: 'Aceptar',
           });
           console.log(err.text);
           console.log("no se registro");
         }),options;

    $scope.getPhoto = function() {

       var options = {
                     quality: 100,
                     allowEdit: true,
                     saveToPhotoAlbum: true,
                     destinationType : navigator.camera.DestinationType.DATA_URL
                 };

           navigator.camera.getPicture(function(imageURI) {

             $scope.url = imageURI;

               DBAvistamientos.saveAttachment(_id,imageURI);
               DBAvistamientos.upload();

          }, function(err) {

            alert(err);

          },options);
        }

    $scope.getPhotoFromLibrary = function() {

              var options = {
                     quality: 100,
                     allowEdit: true,
                     sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                     destinationType : navigator.camera.DestinationType.DATA_URL,
                     saveToPhotoAlbum: false
              };

           navigator.camera.getPicture(function(imageURI) {

             $scope.url = imageURI;

               DBAvistamientos.saveAttachment(_id,imageURI);
               DBAvistamientos.upload();

          }, function(err) {

            alert(err);

          },options);
        }

         $scope.cancelarRegistro = function(){

           DBAvistamientos.delete(_id);
           DBAvistamientos.upload();
           $scope.showConfirm();
         }

         $scope.showConfirm = function() {
            var confirmPopup = $ionicPopup.alert({
              title: 'Registro cancelado',
              okType: 'button-balanced',
              okText: 'Aceptar',
            });

            confirmPopup.then(function(res) {
              if(res) {
                $state.go('seleccionClases');
              } else {
                console.log('You are not sure');
              }
            });
          };

          $scope.regresar = function(){
            $state.go('seleccionClases');
          }
});
