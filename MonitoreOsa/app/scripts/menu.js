angular.module('MonitoreOsa.Menu', [])

.controller('AppCtrl', function($scope, $ionicPopover, $state) {

  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.goAvistamientos = function(){

    $state.go('avistamientos');

  }

  $scope.goInicio = function(){

    $state.go('dash');

  }

  $scope.goPerfil = function(){

    $state.go('mi-perfil');

  }
});
