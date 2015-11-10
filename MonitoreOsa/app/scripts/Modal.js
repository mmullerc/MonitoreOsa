angular.module('MonitoreOsa.Modal', [])
.controller('MenuCtrl', function($scope, $ionicModal, $state) {

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope,
    animation: 'fade-in-scale'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  $scope.goInicio = function(){

    $scope.closeModal();
    $state.go('dash');

  }

  $scope.goAvistamientos = function(){

    $scope.closeModal();
    $state.go('avistamientos');

  }

  $scope.goHistorial = function(){

    $scope.closeModal();
    $state.go('mi-historial');

  }

  $scope.goPerfil = function(){

    $scope.closeModal();
    $state.go('mi-perfil');

  }

});
