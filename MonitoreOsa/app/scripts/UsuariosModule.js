angular.module('MonitoreOsa.Usuarios', [])

.controller('SignUpCtrl', function($http, $scope, $state) {
    $scope.registrar = function(){
      var id = $scope.correo;
      var cedula = $scope.cedula;
      var nombre = $scope.nombre;
      var apellido = $scope.apellido;
      var correo = $scope.correo;
      var telefono = $scope.telefono;
      var fecha = $scope.fecha;
      var rol = "General";
      var contrasena = $scope.contrasena;

      var objUsuario = {
      "_id":id,
      "nombre":nombre,
      "apellido":apellido,
      "cedula":cedula,
      "telefono":telefono,
      "correo":correo,
      "rol":rol,
      "fecha_nacimiento":fecha,
      "contrasena":contrasena
    }
      $http.post("https://mmullerc.cloudant.com/usuarios_movil/", objUsuario).then(function(response) {
       $state.go('iniciar-sesion');
      });



    }
});
