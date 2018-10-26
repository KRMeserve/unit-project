// -------- REQUIRED CONSTANTS FOR CIRCUIT ENTIRE APP --------
const app = angular.module('CircuitApp', []);

// -------- MAIN CONTROLLER --------
app.controller('MainController', ['$http', function($http){
    // -------- Test route --------
    this.hello = 'Howdy';


    // ------- Update user route -------
    this.editUser = (user)=>{
        $http({
            method: 'PUT',
            url: '/users/' + user._id,
            data: {
                username: this.updatedUsername,
                password: this.updatedPassword
            }
        }).then(response=>{
            console.log(response);
            this.getUsers(); 
        }, error=>{
            console.log(error);
        })
    };

    // ------- Delete user route -------
    this.deleteUser = (user)=>{
        $http({
            method: 'DELETE',
            url: '/users/' + user._id
        }).then(response=>{
            this.getUsers();
        }, error=>{
            console.log(error);
        })
    };

    // -------- Get users route --------
    this.getUsers = ()=>{
        $http({
            method: 'GET',
            url: '/users'
        }).then(response=>{
            this.allUsers = response;
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
