// -------- REQUIRED CONSTANTS FOR CIRCUIT ENTIRE APP --------
const app = angular.module("CircuitApp", []);

// ------- DASHBOARD CONTROLLER -------
app.controller("DashboardController", ["$http", function($http) {}]);
// TO USE THIS WE HAVE TO PASS DATA BETWEEN TWO CONTROLLERS
// WHICH INVOLVES A COMPLICATED METHOD WHICH INVOLVES CREATING A SERVICE
// AND INJECTING IT IN THE CONTROLLER
// SO I'VE MOVED ALL THE STUFF IN THE CONTROLLER BACK INTO APP CONTROLLER

// -------- MAIN CONTROLLER --------
app.controller("MainController", [
  "$http",
  function($http) {
    // -------- Test route --------
    this.hello = "Howdy";

    const controller = this;
    this.skills = [];
    this.interests = [];


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

    //===========================================
    // FUNCTION TO GET PROFILE DETAILS ON LOGIN
    //===========================================
    this.profileDetails = (dataField, addText) => {
      let fieldVariable;
      if (dataField) {
        fieldVariable = dataField;
      } else {
        fieldVariable = `CLICK HERE TO ADD ${addText}`;
      }
      return fieldVariable;
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
          this.currentUser = response.data;
          this.name = this.profileDetails(response.data.name, "NAME");
          this.proficiency = this.profileDetails(
            response.data.proficiency,
            "PROFICIENCY"
          );
          if (response.data.skills) {
            this.skills = response.data.skills;
          }
          if (response.data.interests) {
            this.interests = response.data.interests;
          }
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
    this.logOut = () => {
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

    //===========================================
    // MOVED STUFF FROM DASHBOARD CONTROLLER BACK INTO APP
    //===========================================
    //===========================================
    // JQUERY CHECK
    //===========================================
    $(() => {
      console.log($);
    });

    //===========================================
    // Keep track of profile field edit states
    //===========================================
    this.nameEdit = false;
    this.proficiencyEdit = false;
    this.addSkillField = false;
    this.addInterestField = false;

    //===========================================
    // TOGGLES NAME EDIT ON CLICK
    //===========================================
    this.toggleNameEdit = () => {
      this.nameEdit = !this.nameEdit;
      if (this.nameEdit) {
        $(() => {
          $("#nameEditField").focus();
        });
      } else {
        console.log(`need to post name`);
        $http({
          method: "PUT",
          url: "/users/" + this.currentUser._id,
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
      }
    };

    //===========================================
    // TOGGLES PROFICIENCY EDIT ON CLICK
    //===========================================
    this.toggleProficiencyEdit = () => {
      this.proficiencyEdit = !this.proficiencyEdit;
      if (this.proficiencyEdit) {
        $(() => {
          $("#proficiencyEditField").focus();
        });
      } else {
        console.log(`need to post proficiency`);
        $http({
          method: "PUT",
          url: "/users/" + this.currentUser._id,
          data: {
            proficiency: this.proficiency
          }
        }).then(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );
      }
    };

    //===========================================
    // TOGGLE ADD SKILL FIELD ON CLICK
    //===========================================
    this.toggleAddSkillField = () => {
      this.addSkillField = !this.addSkillField;
    };

    //===========================================
    // ADD SKILL FROM FIELD
    //===========================================
    this.addSkill = () => {
      this.skills.push(this.skill);
      $http({
        method: "PUT",
        url: "/users/" + this.currentUser._id,
        data: {
          skills: this.skills
        }
      }).then(
        response => {
          console.log(response);
          this.skill = "";
          this.addSkillField = false;
        },
        error => {
          console.log(error);
        }
      );
    };

    //===========================================
    // TOGGLE ADD INTEREST FIELD ON CLICK
    //===========================================
    this.toggleAddInterestField = () => {
      this.addInterestField = !this.addInterestField;
    };

    //===========================================
    // ADD INTEREST FROM FIELD
    //===========================================
    this.addInterest = () => {
      this.interests.push(this.interest);
      $http({
        method: "PUT",
        url: "/users/" + this.currentUser._id,
        data: {
          interests: this.interests
        }
      }).then(
        response => {
          console.log(response);
          this.interest = "";
          this.addInterestField = false;
        },
        error => {
          console.log(error);
        }
      );
    };
  }
]);
