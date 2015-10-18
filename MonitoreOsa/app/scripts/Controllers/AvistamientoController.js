angular.module('MonitoreOsa.Avistamientos', [])

.controller('AvistamientoCtrl', function($scope, $state) {

  $scope.listaMamiferos = function(){
      $state.go('tab.mamiferos');
  }

  $scope.listaReptiles = function(){
    $state.go('tab.reptiles');
  }

  $scope.listaAves = function(){
    $state.go('tab.aves');
  }

  $scope.listaPeces = function(){
    $state.go('tab.peces');
  }

  $scope.listaAnfibios = function(){
    $state.go('tab.anfibios');
  }

  $scope.listaPlantas = function(){
    $state.go('tab.plantas');
  }

})

//Aqui estan los controladores de cada clase

.controller('MamiferosCtrl', function($scope, $state) {

  //TODO Mamiferos Controller

})

.controller('ReptilesCtrl', function($scope, $state) {


})

.controller('AvesCtrl', function($scope, $state) {



})

.controller('PecesCtrl', function($scope, $state) {


})

.controller('AnfibiosCtrl', function($scope, $state) {


})

.controller('PlantasCtrl', function($scope, $state) {


});
