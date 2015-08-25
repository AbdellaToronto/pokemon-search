'use strict';

angular.module('pokemon-search', ['ngNewRouter', 'pokemon-search.home'])

.controller('AppController', ['$router', appController]);


function appController($router) {

  $router.config([
    {path: '/', component: 'home' }
  ]);

}
