angular.module('MonitoreOsa.SQLService', [])
.service("$sqlService", ["$rootScope", "$ionicLoading","$http","$cordovaSQLite",
  function($rootScope, $ionicLoading, $http, $cordovaSQLite) {

    var db;
    var especie;

    this.setDatabase = function(){

      db = $cordovaSQLite.openDB("db.monitoreosa");
      db.executeSql("DROP TABLE IF EXISTS especies");
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS especies (id integer primary key, nombre text, nombre_cientifico text, descripcion text, tipo text, imagen text)");

      $http.get("https://mmullerc.cloudant.com/especies/_all_docs?&include_docs=true").then(function(response) {
        for(var i = 0; i < response.data.rows.length; i++){
          especie = response.data.rows[i].doc;

          var nombre = especie.nombre;
          var nombre_cientifico = especie.nombre_cientifico;
          var descripcion = especie.descripcion;
          var tipo = especie.tipo;
          var imagen =  especie._attachments.imagen;
          var base64data;

          var reader = new window.FileReader();
          reader.readAsDataURL(imagen);
          reader.onloadend = function() {
             base64data = reader.result;
          }

          console.log(base64data);

          var query = "INSERT INTO especies (id, nombre, nombre_cientifico, descripcion, tipo, imagen) VALUES (?,?,?,?,?,?)";
            $cordovaSQLite.execute(db, query, [i, nombre, nombre_cientifico, descripcion, tipo, base64data]).then(function(res) {
          }, function (err) {
            console.log("error");
            console.log("error" + err);
          });
        }
      }, function (err) {
          console.log(err);
        });
    }

    this.getEspecies = function(){

      var listaEspecies = {};
      var esp = {};

       var query = "SELECT * FROM especies";
       $cordovaSQLite.execute(db, query).then(function(res) {

         for(var i= 0; i < res.rows.length; i++){

           esp = res.rows.item(i);

           listaEspecies[i] = esp;
         }
       }, function (err) {
           console.log(err);
       });
       return listaEspecies
    }
}])
