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
            this.allUsers = response;
            console.log(this.allUsers.data);
        }, error =>{
            console.log(error);
        })
    };

    // -------- Create User Route --------
    this.createUser = ()=>{
        $http({
            method: 'POST',
            url: '/users',
            data: {
                username: this.newUsername,
                password: this.newPassword
            }
        }).then(response=>{
            this.newUsername = '';
            this.newPassword = '';
            this.getUsers();
        }, error =>{
            console.log(error);
        })
    };

    this.getUsers();
}]);
