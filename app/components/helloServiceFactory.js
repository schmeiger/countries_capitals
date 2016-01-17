angular.module('countriesCapitalsApp', [])

.factory('helloService', [function() {
    return function() {
        return 'hello';
    }
}]);