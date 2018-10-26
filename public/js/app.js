// -------- REQUIRED CONSTANTS FOR CIRCUIT ENTIRE APP --------
const app = angular.module('CircuitApp', []);

// -------- MAIN CONTROLLER --------
app.controller('MainController', ['$http', function($http){
    // -------- Test route --------
    this.hello = 'Howdy';

    // -------- Get users route --------
    this.getUsers = ()=>{
        $http({
            method: 'GET',
            url: '/users'
        }).then(response=>{
            console.log(response);
        }, error =>{
            console.log(error);
        })
    };
    this.getUsers();
}]);
