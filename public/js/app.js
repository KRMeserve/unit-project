// -------- REQUIRED CONSTANTS FOR CIRCUIT ENTIRE APP --------
const app = angular.module("CircuitApp", []);

// -------- MAIN CONTROLLER --------
app.controller("MainController", [
  "$http",
  function($http) {
    // -------- Test route --------
    this.hello = "Howdy";

    const controller = this;

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

    // ------- Sets Session -------
    this.goApp = () => {
      $http({
        method: "GET",
        url: "/app"
      }).then(
        response => {
          this.currentUser = response.data.username;
          console.log(this.currentUser);
        },
        error => {
          console.log(error);
        }
      );
    };

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
          this.currentUser = response.data.username;
          this.changePagePath("dashboard");
          console.log(response);
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
        console.log('Entering Create User');
      if (this.newPassword1 === this.newPassword2) {
          console.log(this.newPassword1, 'password 1');
          console.log(this.newPassword2, 'password 2');
        $http({
          method: "POST",
          url: "/users",
          data: {
            username: controller.newUsername,
            password: controller.newPassword1
          }
        }).then(
          function(response){
              console.log('getting response');
            controller.newUsername = "";
            controller.newPassword1 = "";
            controller.newPassword2 = "";
            controller.getUsers();
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
