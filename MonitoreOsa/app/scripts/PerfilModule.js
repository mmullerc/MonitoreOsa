angular.module('MonitoreOsa.Perfil', [])
.controller('PerfilCtrl', function($scope, $ionicModal, $state) {

  if(localStorage.getItem("id") === null){
      $state.go("iniciar-sesion");
  }

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
      localStorage.setItem('apellido',null);
      localStorage.setItem('cedula',null);
      localStorage.setItem('correo',null);
      localStorage.setItem('telefono',null);
      localStorage.setItem('fecha',null);
    }
});
