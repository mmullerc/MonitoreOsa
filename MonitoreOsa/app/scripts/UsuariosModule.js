angular.module('MonitoreOsa.Usuarios', [])

.controller('SignUpCtrl', function($http, $scope, $state,md5,$ionicPopup) {

  $scope.registrar = function(){
    var entro = false;
    var cedulaValidar = document.getElementById("cedula").value;
    var nombreValidar = document.getElementById("nombre").value;
    var apellidoValidar = document.getElementById("apellido").value;
    var correoValidar = document.getElementById("correo").value;
    var telefonoValidar = document.getElementById("telefono").value;
    var contrasenaValidar = document.getElementById("contrasena").value;

    if(cedulaValidar == ''){
      entro = true;
    }
    if(nombreValidar == ''){
      entro = true;
    }
    if(apellidoValidar == ''){
      entro = true;
    }
    if(correoValidar == ''){
      entro = true;
    }
    if(telefonoValidar == ''){
      entro = true;
    }
    if(contrasenaValidar == ''){
      entro = true;
    }
    if(entro == false){
      addUsuario();
    }else{
      $scope.showConfirm();
    }
  }
  $scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.alert({
       title: '¡Porfavor llene los campos!',
       okType: 'button-assertive',
       okText: 'Aceptar',
     });

     confirmPopup.then(function(res) {
       if(res) {
       }
     });
   };
   function addUsuario(){
      var id = $scope.correo;
      var cedula = $scope.cedula;
      var nombre = $scope.nombre;
      var apellido = $scope.apellido;
      var correo = $scope.correo;
      var telefono = $scope.telefono;
      var fecha = $scope.fecha;
      var rol = "General";
      var contrasena = md5.createHash($scope.contrasena);

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
      $http.post("https://monitoreosa.cloudant.com/usuarios_movil/", objUsuario).then(function(response) {
       $state.go('iniciar-sesion');
     });
    }
});
