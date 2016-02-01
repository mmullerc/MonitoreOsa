angular.module('MonitoreOsa.dash', ['ionic'])

.controller('DashCtrl', function($scope, $state) {
    $scope.colaboradores = function(){
        $state.go('colaboradores');
    }
    $scope.desarrolladores = function(){
        $state.go('desarrolladores');
    }
    $scope.licencias = function(){
      $state.go('licencias');
    }

    $scope.licences = [
                          {'autor':'José R.','descripcion':'Esta fotografía fua captada en Bahía Drake, Península de Osa, Costa Rica','fecha':'2010','enlace':'https://commons.wikimedia.org/wiki/File:Bah%C3%ADa_Drake.JPG'},

                          {'autor':'Steve Ryan','descripcion':'A White-whiskered Puffbird in Corcovado National Park, Osa Peninsula, Costa Rica.','fecha':' 4 February 2010, 13:43:08',
                          'enlace':'https://commons.wikimedia.org/wiki/File:Malacoptila_panamensis_-Corcovado_National_Park,_Osa_Peninsula,_Costa_Rica-8.jpg'}
                        ]

    $scope.developers = [
                          {'nombre':'Mathías Muller','correo':' mathias.muller27@gmail.com'},
                          {'nombre': 'Mauricio Araica', 'correo':'mauricioher.94@hotmail.com'}
                        ]
    $scope.colaborators = [
                            {'nombre':'AGUINADRA, asociación de guías de Drake'},
                            {'nombre':'Área de Conservación Osa'},
                            {'nombre':'ASCONA'},
                            {'nombre':'Asociación de Desarrollo Integral de Rancho Quemado'},
                            {'nombre':'Asociación de Desarrollo Integral de Drake'},
                            {'nombre':'Finca Morpho'},
                            {'nombre':'Frontier'},
                            {'nombre':'Fundación Neotropica'},
                            {'nombre':'Fundación Corcovado'},
                            {'nombre':'Museo Nacional de Costa Rica'},
                            {'nombre':'Osa Conservation'},
                            {'nombre':'Parque Nacional Corcovado'},
                            {'nombre':'Proyecto ecoturístico La Tarde'},
                            {'nombre':'Reinaldo Aguilar'},
                            {'nombre':'Reserva Forestal Golfo Dulce'},
                            {'nombre':'SINAC'},
                            {'nombre':'Universidad de Standford'},
                            {'nombre':''}
                            ]
})
