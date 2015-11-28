angular.module('MonitoreOsa.DBService', [])
.service("$pouchDB", ["$rootScope", "$q","TodosAnimales","pouchDB","$log", function($rootScope, $q,TodosAnimales, pouchDB, $log) {

    var database;
    var changeListener;
    var listaEspecies = {};
    var remote;

    this.setDatabase = function(databaseName) {

    //PouchDB.debug.enable('*');
    database = new pouchDB('animales'),
    remote = 'https://couchdb-1623e1.smileupps.com/animals/',
    opts = {
      live:true,
      retry: true
    };

  database.replicate.from('https://couchdb-1623e1.smileupps.com/animals/', {
      live: true,
      retry: true
  }).on('change', function (info) {

    console.log("Cambios!");

  }).on('paused', function (info) {

    console.log("paused");

  }).on('active', function () {

    console.log("active");

  }).on('denied', function (info) {

    console.log("denied");

  }).on('complete', function (info) {

    console.log("Complete!");

    console.log(database._docCount);

  }).on('error', function (err) {

    console.log(err);

  });

  $rootScope.$apply();
}

    this.setRemote = function(remoteDB) {

      database.replicate.from(remote).then(function (result) {

        alert("replicating");
        alert(database._docCount);
        console.log(result);

      }).catch(function (err) {
        console.log(err);
      });
    }

   function updateStatus(response) {
      alert(database._docCount);
   }

    this.startListening = function() {
        changeListener = database.changes({
            live: true,
            include_docs: true
        }).on("change", function(change) {
            if(!change.deleted) {
                $rootScope.$broadcast("$pouchDB:change", change);
            } else {
                $rootScope.$broadcast("$pouchDB:delete", change);
            }
        });
    }

    this.stopListening = function() {
        changeListener.cancel();
    }

    this.sync = function(remoteDatabase) {
        database.sync(remoteDatabase, {live: true, retry: true});
    }

    this.save = function(jsonDocument) {
        var deferred = $q.defer();
        if(!jsonDocument._id) {
            database.post(jsonDocument).then(function(response) {
                deferred.resolve(response);
            }).catch(function(error) {
                deferred.reject(error);
            });
        } else {
            database.put(jsonDocument).then(function(response) {
                deferred.resolve(response);
            }).catch(function(error) {
                deferred.reject(error);
            });
        }
        return deferred.promise;
    }

    this.delete = function(documentId, documentRevision) {
        return database.remove(documentId, documentRevision);
    }

    this.get = function(documentId) {
        return database.get(documentId);
    }

    this.destroy = function() {
        database.destroy();
    }

    this.getAll = function(){

    database.allDocs({
        include_docs: true,
        attachments: true
    }).then(function (result) {

      return Promise.resolve().then(function () {

        getAnimales(result);

      }).then(function (result){

      })

    }).catch(function (err) {
    console.log(err);
    });
    }

    function getAnimales(result){

        for(var i = 0; i < result.rows.length; i++){

            especie = result.rows[i].doc;

            especie = getAttachment(especie);

            listaEspecies[i] = especie;

          }
          TodosAnimales.setAnimales(listaEspecies);

          return listaEspecies;
        }

    function getAttachment(pespecie){
        for(var key in pespecie._attachments){
            database.getAttachment(pespecie._id,key).then(function (blob){
                var url = URL.createObjectURL(blob);
                  pespecie.imagen = url;
                });
            }
        return pespecie;
    }
}])
