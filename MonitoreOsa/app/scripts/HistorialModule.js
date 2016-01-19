angular.module('MonitoreOsa.Historial', [])
.controller('HistorialCtrl', function($scope, $ionicModal, $state, DBAvistamientos) {

  var init = function () {
  if(localStorage.getItem("nombre") == null){
      $state.go("iniciar-sesion");
    }
  };
  init();

  $scope.listaEspecies = {};

    $scope.verInfoHistorial = function(){
      $state.go('info-historial');
    }

  $scope.listaEspecies = DBAvistamientos.getListaHistorial();
  console.log($scope.listaEspecies);

})
.controller('info-historialCtrl', function($scope, $ionicModal, $state) {

});
