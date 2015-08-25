'use strict';

angular.module('pokemon-search.home', [])
  .controller('HomeController', [function () {

    (function(vm){
      angular.extend(vm, {
        test: 'Hello me'
      });

    })(this);
  }]);
