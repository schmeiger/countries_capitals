angular.module('countriesCapitalsApp')
.controller('countryCtrl', ['$scope', 'getCapitalsSrvc', 'ngXml2json', function($scope, getCapitalsSrvc, ngXml2json){

	getCapitalsSrvc.getAllCountries().then(function(response) {
        $scope.countries = ngXml2json.parser(response.data);
    });

}]);
