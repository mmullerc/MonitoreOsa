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


})
.service('ServerEspecies', function() {

  var service = {};

         return{

             getEspeciesServidor: function(){

                 return service;
             },

             setEspeciesServidor: function(value){

                 service = value;

             }

         }


})
.service('TempHistorial', function() {

  var service = [];

         return{

             getHistoTemp: function(){

                 return service;
             },

             setHistoTemp: function(value){

                 service.push(value);

             }

         }


});
