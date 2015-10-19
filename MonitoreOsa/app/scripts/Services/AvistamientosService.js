angular.module('MonitoreOsa.AvistamientosService', [])

.service('AnimalService', function() {

  var service;

         return{

             getAnimal: function(){

                 return service;
             },

             setAnimal: function(value){

                 service = value;

             }

         }


});
