angular.module('MonitoreOsa.DBService', [])
.service("$pouchDB", ["$rootScope", "$q","TodosAnimales","pouchDB","$log","$ionicLoading",
  function($rootScope, $q,TodosAnimales, pouchDB, $log, $ionicLoading) {

    var database;
    var changeListener;
    var listaEspecies = {};
    var remote;

    this.setDatabase = function(databaseName) {

    //PouchDB.debug.enable('*');
    database = new pouchDB('animales', {adapter: 'websql'}),
    remote = 'https://mmullerc.cloudant.com/mamiferos/',
    opts = {
      live:true,
      retry: true
    };

    $ionicLoading.show({
      template: '<p>Cargando datos</p><ion-spinner></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      showDelay: 0
    });

    database.replicate.from(remote).then(function (result) {

      $ionicLoading.hide();
      console.log(result);

    }).catch(function (err) {
      console.log(err);
    });

  $rootScope.$apply();
}

  this.setRemote = function(remoteDB) {
      database.replicate.from(remote).then(function (result) {
      }).catch(function (err) {
        console.log(err);
      });
  }

    this.get = function(documentId) {
        return database.get(documentId);
    }

    this.getAll = function(){
      database.allDocs({
        include_docs: true,
        attachments: true
    }).then(function (result) {
        getAnimales(result);

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
