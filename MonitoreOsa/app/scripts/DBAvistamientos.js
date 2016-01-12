angular.module('MonitoreOsa.DBAvistamientos', [])
.service("DBAvistamientos", ["$rootScope", function($rootScope, $state, $timeout) {

    var database;
    var listaEspecies = {};
    var remote = "https://mmullerc.cloudant.com/avistamientos/"

    this.setDatabase = function() {

      database = new PouchDB("avistamientos", {adapter:'websql'});

  }

  this.save = function(id,avistamiento){

    database.put({
      "_id": id,
      "avistamiento" : avistamiento
    }).then(function (response) {

      console.log(response);

    }).catch(function (err) {
      console.log(err);
    });

  }

  this.saveAttachment = function(id, imagen){

    database.get(id).then(function (doc) {

      database.putAttachment(doc._id, 'imagen.jpg',doc._rev, imagen, 'image/jpg').then(function (result) {

        alert("Se guardó correctamente");

      }).catch(function (err) {
        alert(err);
      });


    }).catch(function (err) {
      console.log(err);
    });
  }

  this.upload = function(){

    database.replicate.to(remote).then(function (result) {

      console.log(result);

    }).catch(function (err) {
      console.log(err);
    });

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
