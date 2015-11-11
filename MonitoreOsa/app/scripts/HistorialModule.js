angular.module('MonitoreOsa.Historial', [])
.controller('HistorialCtrl', function($scope, $ionicModal, $state) {

    $scope.verInfoHistorial = function(){
      $state.go('info-historial');
    }

})
.controller('info-historialCtrl', function($scope, $ionicModal, $state) {

});
