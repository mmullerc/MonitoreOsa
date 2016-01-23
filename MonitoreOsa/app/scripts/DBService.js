angular.module('MonitoreOsa.DBService', [])
.service("$pouchDB", ["$rootScope", "$q","TodosAnimales","$log","$ionicLoading","$http","ServerEspecies",
  function($rootScope, $q,TodosAnimales, $log, $ionicLoading, $http, ServerEspecies) {

    var database;
    var changeListener;
    var listaEspecies = {};
    var remote;
    var localDocs = 0;
    var localEspecie = {}
    var exists = false;
    var attachment;
    var especiesLocales = {};
    var base64;
    var especiesServer;
    var listaEspeciesNuevas;
  //var serverSize;
  //  var serverDocCount;
    var dbResults;
    var docs;

    $ionicLoading.show({
    template: '<ion-spinner icon="spiral"></ion-spinner>',
    content: 'Cargando datos',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  //var database_changes = new PouchDB('changes', {adapter:'websql'});

/**
 * Setea la base de datos de las especies;
 */
  this.setDatabase = function() {

  var online = navigator.onLine;

  //PouchDB.debug.enable('*');
  database = new PouchDB('animales', {adapter:'websql'});

    database.allDocs({
      }).then(function (result) {
        localDocs = result.total_rows;
        if(online == true){
          checkRemote();
        }
      }).catch(function (err) {
        console.log(err);
      });
  }

/**
 * Por algun motivo POUCHDB no estaba replicando bien, se intento hacer
 * de manera manual, pero los resultados no fueron adecuados, ahora cada
 * vez que se inicia la aplicacion se obtienen las especies del servidor
 * y se validan si ya estan en la aplicacion o no.
 */

  // function checkForChanges(){
  //
  //   database.allDocs({
  //   }).then(function (result) {
  //     console.log(result.total_rows);
  //       localDocs = result.total_rows;
  //       docs = result.rows;
  //   }).catch(function (err) {
  //     console.log(err);
  //   });
  //
  //   $http.get("https://mmullerc.cloudant.com/especies/").then(function(response) {
  //
  //     serverSize = response.data.disk_size;
  //     serverDocCount = response.data.doc_count;
  //
  //     if(serverDocCount < localDocs){
  //
  //       $http.get("https://mmullerc.cloudant.com/especies/_changes").then(function(response) {
  //
  //         for(var i = 0; i < response.data.results.length; i++){
  //           if(response.data.results[i].deleted == true){
  //             database.get(response.data.results[i].id).then(function (doc) {
  //               return database.remove(doc);
  //             });
  //           }
  //         }
  //       })
  //
  //     }else{
  //
  //     database_changes.get('data_size').then(function(doc) {
  //
  //         console.log(doc.data_size);
  //         console.log(serverSize);
  //         console.log("+++++++++++++++");
  //         console.log(localDocs);
  //         console.log(serverDocCount);
  //
  //       if(doc.data_size == serverSize && localDocs == serverDocCount){
  //
  //       }else{
  //         console.log("Changing!");
  //         database_changes.put({
  //           _id: doc._id,
  //           _rev: doc._rev,
  //           data_size: serverSize,
  //           doc_count: database_changes._docCount
  //         }).then(function (response) {
  //           checkRemote();
  //         }).catch(function (err) {
  //           console.log(err);
  //         });
  //       }
  //     }).catch(function (err) {
  //       console.log(err);
  //       if(err.status == 404){
  //         database_changes.put({
  //           _id: 'data_size',
  //           data_size: serverSize,
  //           doc_count: database_changes._docCount
  //         }).then(function (response) {
  //            checkRemote();
  //         }).catch(function (err) {
  //           console.log(err);
  //         });
  //       }
  //     });
  //   }
  //   });
  //   $rootScope.$apply();
  // }


  /**
   * Busca los cambios en el servidor
   */
  function checkRemote(){

    $http.get("https://mmullerc.cloudant.com/especies/_all_docs?&include_docs=true").then(function(response) {

      if(localDocs == 0){
        var listaServer = {};

        for(var i = 0; i<response.data.rows.length; i++){
          var especie = response.data.rows[i].doc;
          especie.imagen = 'https://mmullerc.cloudant.com/especies/'+especie._id+'/imagen';
          listaServer[i] = especie;
        }
        ServerEspecies.setEspeciesServidor(listaServer);
      }
      //
      // especiesServer = response.data.rows;
      //
      // for(var i = 0; i<especiesServer.length; i++){
      //   for(var j =0; j<especiesLocales.length;j++){
      //     if(especiesServer[i]._id == especiesLocales[i]._id){
      //
      //     }else{
      //       listaEspeciesNuevas[i] = response.data.rows[i].doc;
      //     }
      //   }
      // }

      angular.forEach(response.data.rows,function(especie){

      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://mmullerc.cloudant.com/especies/'+especie.id+'/imagen', true);
      xhr.responseType = 'arraybuffer';

      xhr.onload = function(e) {
        if (this.status == 200) {
          var uInt8Array = new Uint8Array(this.response);
          var i = uInt8Array.length;
          var binaryString = new Array(i);
          while (i--)
          {
            binaryString[i] = String.fromCharCode(uInt8Array[i]);
          }
          var data = binaryString.join('');

          base64 = window.btoa(data);

              database.put({
                "_id":especie.id,
                "nombre": especie.doc.nombre,
                "nombre_cientifico": especie.doc.nombre_cientifico,
                "habitat":especie.doc.habitat,
                "descripcion": especie.doc.descripcion,
                "tipo": especie.doc.tipo,
                "_attachments": {
                  "imagen": {
                    "content_type": "image/png",
                    "data": base64
                  }
                }
              }).then(function (response) {

            }).catch(function (err) {
              if(err.status == 409){

              }
            });
        }
      };
      xhr.send();
    });
      }, function (err) {
        console.err(err);
      });
  }


    this.get = function(documentId) {
      return database.get(documentId);
    }

    /**
     *Trae todos los datos de la BD local
     */
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

  /**
   * Setea las especies en servicios.
   */
    function getAnimales(result){

        for(var i = 0; i < result.rows.length; i++){

            especie = result.rows[i].doc;

            especie = getAttachment(especie);

            listaEspecies[i] = especie;

          }

          TodosAnimales.setAnimales(listaEspecies);

          $ionicLoading.hide();
          console.log("Ready!");

          return listaEspecies;
        }

    /**
     * Busca la imagen de la especie
     */
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
