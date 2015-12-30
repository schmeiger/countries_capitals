angular.module('countriesCapitalsApp')
.controller('countryDetailsCtrl', ['$scope', '$routeParams', 'getCapitalsSrvc', 'ngXml2json', function($scope, $routeParams, getCapitalsSrvc, ngXml2json){


	var idParam = $routeParams.id.substr(1); // Remove ":" character infront


	getCapitalsSrvc.getCountry(idParam).then(function(response) {
        $scope.cntr = ngXml2json.parser(response.data);

         $scope.capital = $scope.cntr.geonames.country.capital;
     	 $scope.countryCode = $scope.cntr.geonames.country.countrycode;

         getCapitalsSrvc.getCapital($scope.capital).then(function(response) {
	        $scope.places = ngXml2json.parser(response.data);

	        for(var i = 0; i < $scope.places.geonames.geoname.length; i++){

	    		if($scope.places.geonames.geoname[i].countrycode == $scope.countryCode && $scope.places.geonames.geoname[i].asciiname == $scope.capital && $scope.places.geonames.geoname[i].fcode == 'PPLC'){
	    			$scope.capitalPopulation = $scope.places.geonames.geoname[i].population;
	    		}
	    	}
	    });

    });

    
    getCapitalsSrvc.getNeighbours(idParam).then(function(response) {
        $scope.neighbours = ngXml2json.parser(response.data);
    });

}]);
