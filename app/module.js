angular.module('countriesCapitalsApp', [
    'ngRoute', 
    'ngAnimate', 
    'angularXml2json',
    'countriesCapitalsApp-factories'
])
.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){

	$httpProvider.defaults.useXDomain = true;
  	delete $httpProvider.defaults.headers.common['X-Requested-With'];

	$routeProvider
	.when('/', {
		templateUrl: 'components/home/home.html',
		controller: 'homeCtrl'
	})
	.when('/countries', {
		templateUrl: 'components/countries/countries_list.html',
		controller: 'countryCtrl'
	})
	.when('/countries/:id', {
		templateUrl: 'components/countries/country_detail.html',
		controller: 'countryDetailsCtrl'
	});

}])
.run(['$rootScope','$location','$timeout',function($rootScope, $location, $timeout) {
    $rootScope.$on('$routeChangeError', function() {
        $location.path("/error");
    });
    $rootScope.$on('$routeChangeStart', function() {
        $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function() {
      $timeout(function() {
        $rootScope.isLoading = false;
      }, 1000);
    });
}])
.factory('getCapitalsSrvc', ['$http', function($http){
	return {
		getAllCountries : function(){
			return $http.get('http://api.geonames.org/countryInfo?username=schmeiger');
		},
		getCountry : function(cntr){
			return $http.get('http://api.geonames.org/countryInfo?username=schmeiger&country=' + cntr);
		},
		getNeighbours : function(cntr){
			return $http.get('http://api.geonames.org/neighbours?username=schmeiger&country=' + cntr);
		},
		getCapital : function(capital){
			return $http.get(' http://api.geonames.org/search?username=schmeiger&name=' + encodeURIComponent(capital) + '&style=full');
		}
	}
}]);