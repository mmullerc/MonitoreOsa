angular.module('MonitoreOsa.PouchService', [])

.service('pouchService', function($rootScope,$q){

  var db;
  var docs;

  return{

    getDataBase: function(){

      db = new PouchDB("mamiferos");
      var remoteDB = new PouchDB("http://127.0.0.1:5984/mamiferos/_all_docs?limit=20&include_docs=true");
      db.replicate.from(remoteDB).on('complete', function () {

        console.log(db);

        $rootScope.$apply();

      }).on('error', function (err) {
        console.log("Error al instaciar la BD")
      });

      return db;
    },
    getAllDocs: function(){

      var deferred = $q.defer();

      db.allDocs({
        include_docs: true
      }).then(function (result) {

        console.log(result);

        console.log("primero en el servicio");

        docs = result.rows.map(function (row) { return row.doc; });

      }).catch(function (err) {
        console.log(err);
      });

      return docs;

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
