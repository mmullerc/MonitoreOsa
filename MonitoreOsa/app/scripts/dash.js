angular.module('MonitoreOsa.dash', ['ionic'])

.controller('DashCtrl', function($scope, $state) {
  var init = function () {
  if(localStorage.getItem("nombre") == null){
      $state.go("iniciar-sesion");
    }
  };
  init();

});
