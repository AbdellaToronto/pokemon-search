'use strict';

angular.module('pokemon-search.xy-search', [])
  .factory('xyPokemon', ['$http', function ($http) {


    function getMappedPokemon() {
      return $http.get('raw_data/encounters.json').then(function(allResults){
        return R.filter(R.propEq('version_id', 15), allResults.data);
      });
    }

    function getLocationNames() {
      return $http.get('raw_data/locations.json').then(function(allResults){
        return R.filter(R.propEq('local_language_id', 9), allResults.data);
      });
    }

    function getLocationAreaInfo() {
      return $http.get('raw_data/location_areas.json');
    }

    function getAllPokemonInfo(){
      return $http.get('raw_data/pokemon.json');
    }

    return {
      getMappedPokemon: getMappedPokemon,
      getLocationNames: getLocationNames,
      getLocationAreaInfo: getLocationAreaInfo,
      getAllPokemonInfo: getAllPokemonInfo
    }
  }]);
