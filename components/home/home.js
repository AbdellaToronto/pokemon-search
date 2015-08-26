'use strict';

angular.module('pokemon-search.home', ['pokemon-search.xy-search'])
  .controller('HomeController', ['xyPokemon', function (xyPokemon) {

    (function (vm) {

      vm.filterByLocation = function(pokemon){
        return R.containsWith(function(encounter){
          return vm.locationFilter ? encounter.locationName === vm.locationFilter : true;
        }, pokemon.encounters);
      };


      //Callback hell, will do better eventually, this is just quick
      //Also, these variable names are the worst
      xyPokemon.getMappedPokemon().then(function (encounterData) {

        xyPokemon.getLocationAreaInfo()
          .then(function (locationAreaInfo) {

            //No reason locationIDs shouldn't be on every encounter
            var encountersWithLocation = R.map(function (encounterInfo) {
              encounterInfo.locationID = R.find(function (areaInfo) {
                return areaInfo.id === encounterInfo.location_area_id;
              }, locationAreaInfo.data).location_id;
              return encounterInfo;
            }, encounterData);

            xyPokemon.getLocationNames()
              .then(function (locationNames) {

                encountersWithLocation = R.map(function (encounter) {
                  encounter.locationName = R.find(function (locationInfo) {
                    return locationInfo.location_id === encounter.locationID;
                  }, locationNames).name;
                  return encounter;
                }, encountersWithLocation);

                encountersWithLocation = R.groupBy(function (encounterByPokemon) {
                  return encounterByPokemon.pokemon_id;
                }, encountersWithLocation);


                xyPokemon.getAllPokemonInfo()
                  .then(function (pokemons) {

                    vm.allPokemon = R.map(function (pokemon) {
                      pokemon.encounters = encountersWithLocation[pokemon.id];
                      return pokemon;
                    }, pokemons.data);
                  });
              });

          });

      })
    })(this);

  }]);
