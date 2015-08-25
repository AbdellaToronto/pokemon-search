'use strict';

angular.module('pokemon-search.xy-search', [])
  .factory('xyPokemon', ['$http', function ($http) {


    function getMappedPokemon() {
      return $http.get('raw_data/encounters.json').then(function(allResults){
        return R.filter(R.propEq('version_id', 15), allResults.data);
      });
    }

    return {
      getMappedPokemon: getMappedPokemon
    }
  }]);
