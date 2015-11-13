angular.module('MonitoreOsa.PouchService', [])

.service('pouchService', function($rootScope){
  return{
    getDatabase: function(){
      var db = new PouchDB("mamiferos", {size: 50});
      var remoteDB = new PouchDB("https://mmullerc:MonitoreOsa123@mmullerc.cloudant.com/mamiferos");
      db.replicate.from(remoteDB,{live:true, retry:true})
      return db;
    }
  }
})
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
.service('Aves', function() {

  var service = {};

         return{

             getAves: function(){

                 return service;
             },

             setAves: function(value){

                 service = value;

             }

         }


})
.service('MamiferosTerrestres', function() {

  var service = {};

         return{

             getMamiferosTerrestres: function(){

                 return service;
             },

             setMamiferosTerrestres: function(value){

                 service = value;

             }

         }


})
.service('MamiferosAcuaticos', function() {

  var service = {};

         return{

             getMamiferosAcuaticos: function(){

                 return service;
             },

             setMamiferosAcuaticos: function(value){

                 service = value;

             }

         }


})
.service('ReptilesAnfibiosTerrestres', function() {

  var service = {};

         return{

             getTerrestres: function(){

                 return service;
             },

             setTerrestres: function(value){

                 service = value;

             }

         }


})
.service('ReptilesAnfibiosAcuaticos', function() {

  var service = {};

         return{

             getAcuaticos: function(){

                 return service;
             },

             setAcuaticos: function(value){

                 service = value;

             }

         }


})
.service('Plantas', function() {

  var service = {};

         return{

             getPlantas: function(){

                 return service;
             },

             setPlantas: function(value){

                 service = value;

             }

         }


});
