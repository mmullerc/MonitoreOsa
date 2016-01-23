angular.module('MonitoreOsa.Historial', [])
.controller('HistorialCtrl', function($scope, $ionicModal, $state, DBAvistamientos, TempHistorial) {

  $scope.historial = {};

    $scope.verInfoHistorial = function(){
      $state.go('info-historial');
    }

  $scope.historial = DBAvistamientos.getListaHistorial();
  $scope.historialTemp = TempHistorial.getHistoTemp();

})
.controller('info-historialCtrl', function($scope, $ionicModal, $state) {

});
