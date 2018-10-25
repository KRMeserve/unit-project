const app = angular.module('CircuitApp', []);

app.controller('MainController', ['$http', function($http){
    this.hello = 'Howdy';
}])
