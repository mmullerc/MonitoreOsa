angular.module('MonitoreOsa.DBService', [])
.service("$pouchDB", ["$rootScope", "$q","TodosAnimales","$log","$ionicLoading","$http",
  function($rootScope, $q,TodosAnimales, $log, $ionicLoading, $http) {

    var database;
    var changeListener;
    var listaEspecies = {};
    var remote;

    this.setDatabase = function(databaseName) {

    //PouchDB.debug.enable('*');
    database = new PouchDB('animales', {adapter:'websql'}),
    remote = new PouchDB('https://mmullerc.cloudant.com/mamiferos/'),
    opts = {
      live: true,
      retry: true
    };

    $ionicLoading.show({
      template: '<p>Cargando datos</p><ion-spinner></ion-spinner>',
      animation: 'fade-in',
      showBackdrop: true,
      showDelay: 0
    });

    database.replicate.from(remote).then(function (result) {

      console.log(result);

      $ionicLoading.hide();

    }).catch(function (err) {
      console.log(err);
    });

    var options ={

      revs_info : true
    }

    database.get('ardilla_coliroja',[options]).then(function (doc) {

      console.log(doc);

    }).catch(function (err) {
      console.log(err);
    });

    testhttp();

    function testhttp(){
      $http.get("https://mmullerc.cloudant.com/especies/ardilla_coliroja?revs_info=true").then(function(response) {

        console.log(response);

      });
    }

    database.changes({
      since: "now"
    }).on("change", function (change) {
      alert("changes");
      // A document has been created, updated, or deleted
    }).on("error", function (err) {
      alert("error");
    });
  }

/*
  var rep = database.replicate.from(remote, {
  }).on('change', function (info) {
// handle change
  }).on('paused', function () {
// replication paused (e.g. user went offline)
  $ionicLoading.hide();
  alert("paused");
  alert(database._docCount);
  alert(remote._docCount);
  }).on('active', function () {
// replicate resumed (e.g. user went back online)
  }).on('denied', function (info) {
// a document failed to replicate, e.g. due to permissions
  alert("denied");
  }).on('complete', function (info) {
// handle complete
  }).on('error', function (err) {
// handle error
  alert("error");
  });
}
*/
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
