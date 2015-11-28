angular.module('MonitoreOsa.DBAvistamientos', [])
.service("DBAvistamientos", ["$rootScope", function($rootScope) {

    var database;
    var listaEspecies = {};
    var remote = "https://couchdb-1623e1.smileupps.com/avistamientos/";

    this.setDatabase = function() {

      database = new PouchDB("avistamientos");

  }

  this.save = function(avistamiento){

    database.post({
      avistamiento
    }).then(function (response) {

      console.log(response);

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

}])
