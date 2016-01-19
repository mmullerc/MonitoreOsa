angular.module('MonitoreOsa.DBAvistamientos', [])
.service("DBAvistamientos", ["$rootScope","$ionicPopup", function($rootScope,$ionicPopup, $state, $timeout) {

    var database;
    var esp = {};
    var listaHistorial = {};
    var listaEspecies = {};
    var remote = "https://mmullerc.cloudant.com/avistamientos/"

    this.setDatabase = function() {

      database = new PouchDB("avistamientos", {adapter:'websql'});

      var online = navigator.onLine;

      if(online == true){
        this.upload();
      }

  }

  this.save = function(id,avistamiento){

    if(localStorage.getItem("nombre") == ''){
        $state.go("iniciar-sesion");
      }

    var objUsuario = {
      id:localStorage.getItem("id"),
    }

    database.put({
      "_id": id,
      "avistamiento" : avistamiento,
      "usuario":objUsuario
    }).then(function (response) {

      var confirmPopup = $ionicPopup.alert({
        title: 'Se registró correctamente',
        okType: 'button-balanced',
        okText: 'Aceptar',
      });

    }).catch(function (err) {

      var confirmPopup = $ionicPopup.alert({
        title: 'Lo siento, hubo un error',
        okType: 'button-assertive',
        okText: 'Aceptar',
      });

      console.log(err);
    });

  }

  this.saveAttachment = function(id, imagen){

    database.get(id).then(function (doc) {

      database.putAttachment(doc._id, 'imagen.jpg',doc._rev, imagen, 'image/jpg').then(function (result) {

        var confirmPopup = $ionicPopup.alert({
          title: 'La imagen se guardó correctamente',
          okType: 'button-balanced',
          okText: 'Aceptar',
        });

      }).catch(function (err) {

        var confirmPopup = $ionicPopup.alert({
          title: 'Error al ingresar imagen',
          okType: 'button-assertive',
          okText: 'Aceptar',
        });

      });
    }).catch(function (err) {

      var confirmPopup = $ionicPopup.alert({
        title: 'Error al ingresar imagen',
        okType: 'button-assertive',
        okText: 'Aceptar',
      });

    });
  }

  this.upload = function(){

    database.replicate.to(remote).then(function (result) {

      console.log(result);

    }).catch(function (err) {
      console.log(err);
    });

  }

  this.getAll = function() {

    database.allDocs({
      include_docs: true
    }).then(function (result) {

      for(var i = 0; i < result.rows.length; i++){

          esp = result.rows[i].doc;

          listaHistorial[i] = esp;
        }

    }).catch(function (err) {
      console.log(err);
    });

}

  this.getListaHistorial = function(){
    return listaHistorial;
  }

  this.delete = function(id, $timeout){

    database.get(id).then(function(doc) {
      return database.remove(doc._id, doc._rev);
    }).then(function (result) {

    }).catch(function (err) {
    //  setTimeout(function () {
    //   delete(id);
  // }, 3000);
    });
  }

}])
.factory('Camera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}]);
