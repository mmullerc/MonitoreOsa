angular.module('MonitoreOsa.Perfil', [])
.controller('PerfilCtrl', function($scope, $ionicModal, $state) {

  var init = function () {
  if(localStorage.getItem("nombre") == null){
      $state.go("iniciar-sesion");
    }
  };
  init();

    $scope.nombre = localStorage.getItem('nombre');
    $scope.apellido = localStorage.getItem('apellido');
    $scope.cedula = localStorage.getItem('cedula');
    $scope.correo = localStorage.getItem('correo');
    $scope.telefono = localStorage.getItem('telefono');
    $scope.fecha = localStorage.getItem('fecha');

    $scope.salir = function(){
      $state.go('iniciar-sesion');
      localStorage.setItem('id', null);
      localStorage.setItem('nombre', null);
    }
});
