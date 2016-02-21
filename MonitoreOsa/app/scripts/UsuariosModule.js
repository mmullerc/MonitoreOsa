angular.module('MonitoreOsa.Usuarios', [])

.controller('SignUpCtrl', function($http, $scope, $state,md5,$ionicPopup, $timeout, $rootScope) {

  var contrasenasDif;
  var correoValido;
  var contrasenaValidar;
  var contrasenaConfirmarValidar;

  $scope.registrar = function(){
    var entro = false;
    var cedulaValidar = document.getElementById("cedula").value;
    var nombreValidar = document.getElementById("nombre").value;
    var apellidoValidar = document.getElementById("apellido").value;
    var correoValidar = document.getElementById("correo").value;
    var telefonoValidar = document.getElementById("telefono").value;
    var contrasenasDif = false;
    var correoValido = false;
    contrasenaValidar = document.getElementById("contrasena").value;
    contrasenaConfirmarValidar = document.getElementById("contrasena-confirmar").value;

    function validateEmail(correo) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(correo);
    }

    correoValido = validateEmail(correoValidar);

    if(correoValido){

      if(checkPassowrds()){

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
        if(entro == true){
          $scope.showError('Por favor llene todos los campos');
        }
        if(entro == false && contrasenasDif == false && correoValido == true){
          addUsuario();
        }else{

        }
      }
    }else{
      checkEmail();
    }
  }

  $scope.showError= function(err) {

      var popup = $ionicPopup.show({
        title: err,
        buttons: [{
          text: 'OK',
          type: 'button-balanced',
          onTap: function(e) {
            popup.then(function(res){
              popup.close();
            });
          }
        }]
      });
  }

  function checkEmail(){
      $scope.showError('Por favor ingrese un correo válido');
    }

  function checkPassowrds(){
    if(contrasenaValidar != contrasenaConfirmarValidar ){
      contrasenasDif = true;
      $scope.showError('¡Las contraseñas no son iguales!');
      return false;
    }else{
      return true;
    }
  }

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

          var popup = $ionicPopup.alert({
              title: 'Registro exitoso',
              buttons: [{
                text: 'Aceptar',
                type: 'button-balanced',
                onTap: function(e) {
                  popup.then(function(res){
                    popup.close();
                  });
                }
              }]
            })

        $state.go('iniciar-sesion');

      }).catch(function (err) {
        if(err.status == 409){
          $scope.showError('Ese correo ya existe en el sistema');
        }
      });
    }
});
