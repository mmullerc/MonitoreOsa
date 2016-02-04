angular.module('MonitoreOsa.IniciarSesion', [])

.controller('iniciar-sesionCtrl', function($rootScope,$http,$scope, $ionicModal, $state,$ionicPopup,md5) {

  $scope.ingresar = function(){
    var contrasenaHash = md5.createHash($scope.contrasena);
    $http.get("https://monitoreosa.cloudant.com/usuarios_movil/"+$scope.correo+"")
    .success(function(response) {
      if(response.status = 200){
          if(response.contrasena == contrasenaHash){
            localStorage.setItem("id", response._id);
            localStorage.setItem("nombre", response.nombre);
            localStorage.setItem("apellido",response.apellido);
            localStorage.setItem("cedula",response.cedula);
            localStorage.setItem("telefono",response.telefono);
            localStorage.setItem("correo",response.correo);
            localStorage.setItem("fecha",response.fecha_nacimiento);
            localStorage.setItem("contrasena",response.contrasena);
            $state.go('dash');
          }else{
             $scope.showConfirm();
          }
      }
    })
    .error(function(err){
      if(err.error == "not_found"){
        $scope.showConfirm();
      }
    });
  }
  //
  $scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.alert({
       title: '¡Correo o contraseña incorrectos!',
       okType: 'button-assertive',
       okText: 'Aceptar',
     });

     confirmPopup.then(function(res) {
       if(res) {
         $state.go('iniciar-sesion');
       } else {
       }
     });
   };
  //
  $scope.registrarse = function() {
    $state.go('signup');
  }
});
