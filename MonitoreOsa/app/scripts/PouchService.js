angular.module('MonitoreOsa.PouchService', [])
.service('AnimalTipoService', function() {

  var service;

         return{

             getAnimal: function(){

                 return service;
             },

             setAnimal: function(value){

                 service = value;

             }

         }


})
.service('AnimalService', function() {

  var service = {};

         return{

             getAnimal: function(){

                 return service;
             },

             setAnimal: function(value){

                 service = value;

             }

         }


})
.service('TodosAnimales', function() {

  var service = {};

         return{

             getAnimales: function(){

                 return service;
             },

             setAnimales: function(value){

                 service = value;

             }

         }


});
