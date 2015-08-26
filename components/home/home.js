'use strict';

angular.module('pokemon-search.home', ['pokemon-search.xy-search'])
  .controller('HomeController', ['xyPokemon', function (xyPokemon) {

    (function(vm){


      //Callback hell, will do better eventually, this is just quick
      //Also, these variable names are the worst
      xyPokemon.getMappedPokemon().then(function(encounterData){

        xyPokemon.getLocationAreaInfo()
          .then(function(locationAreaInfo){

            //No reason locationIDs shouldn't be on every encounter
            var encountersWithLocation = R.map(function(encounterInfo){
              encounterInfo.locationID = R.find(function(areaInfo){
                return areaInfo.id === encounterInfo.location_area_id;
              }, locationAreaInfo.data).location_id;
              return encounterInfo;
            }, encounterData);

            xyPokemon.getLocationNames()
              .then(function(locationNames){

                encountersWithLocation = R.map(function(encounter){
                  encounter.locationName = R.find(function(locationInfo){
                    return locationInfo.location_id === encounter.locationID;
                  }, locationNames).name;
                  return encounter;
                }, encountersWithLocation);



                vm.nearlyRaw = R.groupBy(function(encounterByPokemon){
                  return encounterByPokemon.pokemon_id;
                }, encountersWithLocation);

              });
          });


      });

    })(this);
  }]);
