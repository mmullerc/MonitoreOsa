angular.module('MonitoreOsa.InfoEspecie', [])


.controller('InfoEspecieCtrl', function($scope, $state, $rootScope, AnimalService) {

    $scope.especie = {};
    $scope.especie.nombre = AnimalService.getAnimal();
    $scope.especie.nombreCientifico = "peoltas aguadas";
    $scope.especie.descripcion = "pelotas de viejo aguadas";
    $scope.especie.imagen = "imagenes/ardilla_coliroja.png"

    console.log("ola");
});
