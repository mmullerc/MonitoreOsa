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


});
