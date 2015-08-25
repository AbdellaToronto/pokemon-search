'use strict';

angular.module('pokemon-search.home', ['pokemon-search.xy-search'])
  .controller('HomeController', ['xyPokemon', function (xyPokemon) {

    (function(vm){

      xyPokemon.getMappedPokemon().then(function(x){
        var byPokemon = R.groupBy(function(encounterByPokemon){
           return encounterByPokemon.pokemon_id;
        }, x);
        vm.nearlyRaw = byPokemon;
      });

    })(this);
  }]);
