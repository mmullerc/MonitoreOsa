angular.module('MonitoreOsa.dash', ['ionic'])

.controller('DashCtrl', function($scope, $state) {
    $scope.colaboradores = function(){
        $state.go('colaboradores');
    }
    $scope.desarrolladores = function(){
        $state.go('desarrolladores');
    }

    $scope.developers = [
                          {"nombre":"Mathías Muller","correo":" mathias.muller27@gmail.com"},
                          {"nombre": "Mauricio Araica", "correo":"mauricioher.94@hotmail.com"}
                        ]
    $scope.colaborators = [
                            {"nombre":"AGUINADRA, asociación de guías de Drake"},
                            {"nombre":"Área de Conservación Osa"},
                            {"nombre":"ASCONA"},
                            {"nombre":"Asociación de Desarrollo Integral de Rancho Quemado"},
                            {"nombre":"Asociación de Desarrollo Integral de Drake"},
                            {"nombre":"Finca Morpho"},
                            {"nombre":"Frontier"},
                            {"nombre":"Fundación Neotropica"},
                            {"nombre":"Fundación Corcovado"},
                            {"nombre":"Museo Nacional de Costa Rica"},
                            {"nombre":"Osa Conservation"},
                            {"nombre":"Parque Nacional Corcovado"},
                            {"nombre":"Proyecto ecoturístico La Tarde"},
                            {"nombre":"Reinaldo Aguilar"},
                            {"nombre":"Reserva Forestal Golfo Dulce"},
                            {"nombre":"SINAC"},
                            {"nombre":"Universidad de Standford"},
                            {"nombre":"ASCONA"}
                            ]
})
