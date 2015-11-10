angular.module('MonitoreOsa.Historial', [])
.controller('HistorialCtrl', function($scope, $ionicModal, $state) {

$scope.verInfo = function(){
  $state.go('info-especie')
  //TODO PerfilCtrl
}
});
