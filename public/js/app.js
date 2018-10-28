// -------- REQUIRED CONSTANTS FOR CIRCUIT ENTIRE APP --------
const app = angular.module("CircuitApp", []);

// ------- DASHBOARD CONTROLLER -------
app.controller("DashboardController", ["$http", function($http){
    this.hi = 'working';

    this.addName = (currentUser)=>{
        $http({
            method: "PUT",
            url: "/users/" + currentUser._id,
            data: {
              name: this.name
            }
          }).then(
            response => {
              console.log(response);
            },
            error => {
              console.log(error);
            }
          );
        };
}]);

// -------- MAIN CONTROLLER --------
app.controller("MainController", [
  "$http",
  function($http) {
    // -------- Test route --------
    this.hello = "Howdy";

    // ------- Partials Logic -------
    this.includePath = "partials/signup.html";

    this.pagePath = "partials/getStarted.html";

    this.changeIncludePath = path => {
      this.includePath = "partials/" + path + ".html";
    };

    this.changePagePath = path => {
      this.pagePath = `partials/${path}.html`;
    };

    // ------- Clearing Input Field Logic -------
    this.clearFields = () => {
      this.newUsername = "";
      this.newPassword1 = "";
      this.newPassword2 = "";
    };

    // ------- Sets Session ------- OBSOLETE CODE
    // this.goApp = () => {
    //   $http({
    //     method: "GET",
    //     url: "/app"
    //   }).then(
    //     response => {
    //       this.currentUser = response.data.username;
    //       console.log(this.currentUser);
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   );
    // };

    // ------- Sessions Log In Route -------
    this.logIn = () => {
      $http({
        method: "POST",
        url: "/sessions",
        data: {
          username: this.username,
          password: this.password
        }
      }).then(
        response => {
          this.currentUser = response.data;
          this.changePagePath("dashboard");
          console.log(this.currentUser);
          // console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    };

    // ------- Session Log Out Route -------
    this.logOut = ()=>{
        $http({
          method: "GET",
          url: "/sessions/destroy"
        }).then(
          response => {
            this.changePagePath("getStarted");
          },
          error => {
            console.log(error);
          }
        );
      };

    // ------- Update user route -------
    this.editUser = user => {
      $http({
        method: "PUT",
        url: "/users/" + user._id,
        data: {
          username: this.updatedUsername,
          password: this.updatedPassword
        }
      }).then(
        response => {
          console.log(response);
          this.getUsers();
        },
        error => {
          console.log(error);
        }
      );
    };

    // ------- Delete user route -------
    this.deleteUser = user => {
      $http({
        method: "DELETE",
        url: "/users/" + user._id
      }).then(
        response => {
          this.getUsers();
        },
        error => {
          console.log(error);
        }
      );
    };

    // -------- Get users route --------
    this.getUsers = () => {
      $http({
        method: "GET",
        url: "/users"
      }).then(
        response => {
          this.allUsers = response;
        },
        error => {
          console.log(error);
        }
      );
    };

    // -------- Create User Route --------
    this.createUser = () => {
      if (this.newPassword1 === this.newPassword2) {
        $http({
          method: "POST",
          url: "/users",
          data: {
            username: this.newUsername,
            password: this.newPassword1
          }
        }).then(
          response => {
            this.newUsername = "";
            this.newPassword1 = "";
            this.newPassword2 = "";
            this.getUsers();
          },
          error => {
            console.log(error);
          }
        );
      } else {
        console.log("did not work");
      }
    };

    this.getUsers();
  }
]);
