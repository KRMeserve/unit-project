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
        this.hideLogOut = false;
        const controller = this;
        this.skills = [];
        this.interests = [];
        this.currentTabId = 1;

        // ------- Partials Logic -------
        this.includePath = "partials/signup.html";

        this.pagePath = "partials/getStarted.html";

        this.tabPath = "partials/profile.html";

        this.changeIncludePath = path => {
            this.includePath = "partials/" + path + ".html";
        };

        //===========================================
        // FUNCTION FOR MOVING BETWEEN PAGES ON APP
        //===========================================
        this.changePagePath = path => {
            this.pagePath = `partials/${path}.html`;
        };

        // ------- Clearing Input Field Logic -------
        this.clearFields = () => {
            console.log(`Entering clear fields function`);
            this.newUsername = "";
            this.newPassword1 = "";
            this.newPassword2 = "";
            this.username = "";
            this.password = "";
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
    this.removeHiddenBox = ()=>{
        console.log('running');
        $('#hiddenLogOutBox').addClass('hiddenBox');
    }

    // ------- Function to hide/show logout button on profile screen ------
    this.logOutHidden = ()=>{
        this.hideLogOut = !this.hideLogOut;
        if (this.hideLogOut) {
            $('#show-options-image').addClass('flipped');
            $('#show-options-image').removeClass('flippedReset');
            $('#hiddenLogOutBox').removeClass('hiddenBox');
            $('#hiddenLogOutBox').addClass('hiddenBoxAnimationAppear')
            $('#hiddenLogOutBox').removeClass('hiddenBoxAnimationDisappear')
        } else {

            $('#hiddenLogOutBox').removeClass('hiddenBoxAnimationAppear')
            $('#hiddenLogOutBox').addClass('hiddenBoxAnimationDisappear')
            $('#show-options-image').removeClass('flipped')
            $('#show-options-image').addClass('flippedReset')
            setTimeout(this.removeHiddenBox, 150)
        }
    }
        //===========================================
        // FUNCTION TO GET PROFILE DETAILS ON LOGIN
        //===========================================
        this.profileDetails = (dataField, addText) => {
            console.log(`entering profile details function`);
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
            console.log(`entering login function`);
            $http({
                method: "POST",
                url: "/sessions",
                data: {
                    username: this.username,
                    password: this.password
                }
            }).then(
                response => {
                    this.password = "";
                    this.username = "";
                    this.currentUser = response.data;
                    this.name = this.profileDetails(response.data.name, "NAME");
                    this.brandStatement = this.profileDetails(
                        response.data.brandStatement,
                        "BRAND STATEMENT"
                    );
                    this.proficiency = this.profileDetails(
                        response.data.proficiency,
                        "PROFICIENCY"
                    );
                    this.github = this.profileDetails(
                        response.data.github,
                        "GITHUB LINK"
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
            console.log(`entering log out function`);
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
            console.log(`entering edit user function`);
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
        // WHERE IS THIS BEING CALLED FROM?

        // ------- Delete user route -------
        this.deleteUser = user => {
            console.log(`entering delete user function`);
            console.log(user);
            $http({
                method: "DELETE",
                url: "/users/" + user._id
            }).then(
                response => {
                    this.changePagePath("getStarted");
                },
                error => {
                    console.log(error);
                }
            );
        };

        // -------- Create User Route --------
        this.createUser = () => {
            console.log("Entering Create User");
            if (this.newPassword1 === this.newPassword2) {
                console.log(`passwords match: ${this.newPassword1}`);
                $http({
                    method: "POST",
                    url: "/users",
                    data: {
                        username: this.newUsername,
                        password: this.newPassword1
                    }
                }).then(
                    res => {
                        console.log("user has been created");
                        this.newUsername = "";
                        this.newPassword1 = "";
                        this.newPassword2 = "";
                        // Why are we getting users?
                        // this.getUsers();
                    },
                    error => {
                        console.log(error);
                    }
                );
            } else {
                console.log("passwords do not match");
            }
        };

        // this.getUsers();

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
        // FUNCTION TO SWITCH TABS BETWEEN PROFILE
        // PORTFOLIO AND CIRCUIT
        //===========================================
        this.switchTab = tabId => {
            console.log(`entering switch tab function`);
            //===========================================
            // CHECK IF TAB IS ALREADY IN THE RIGHT ONE
            // ONLY IF ITS NOT, DO WE HAVE TO SWITCH
            //===========================================
            if (tabId !== this.currentTabId) {
                // THEN SWITCH TABS
                //===========================================
                // SET CURRENT TAB ID TO CLICKED TAB ID
                //===========================================
                this.currentTabId = tabId;
                console.log(`Tab Id is ${tabId}`);
                if (tabId === 1) {
                    this.tabPath = "partials/profile.html";
                    $(".tab")
                        .removeClass("bgGreen fSize2")
                        .addClass("hoverGreen cPointer fSize12");
                    $("#tab1")
                        .addClass("bgGreen fSize2")
                        .removeClass("hoverGreen cPointer fSize12");
                    $(".tabName")
                        .removeClass("fSize3")
                        .addClass("fSize2");
                    $("#tabProfile")
                        .addClass("fSize3")
                        .removeClass("fSize2");
                } else if (tabId === 2) {
                    this.tabPath = "partials/portfolio.html";
                    $(".tab")
                        .removeClass("bgGreen fSize2")
                        .addClass("hoverGreen cPointer fSize12");
                    $("#tab2")
                        .addClass("bgGreen fSize2")
                        .removeClass("hoverGreen cPointer fSize12");
                    $(".tabName")
                        .removeClass("fSize3")
                        .addClass("fSize2");
                    $("#tabPortfolio")
                        .addClass("fSize3")
                        .removeClass("fSize2");
                } else if (tabId === 3) {
                    this.tabPath = "partials/circuit.html";
                    $(".tab")
                        .removeClass("bgGreen fSize2")
                        .addClass("hoverGreen cPointer fSize12");
                    $("#tab3")
                        .addClass("bgGreen fSize2")
                        .removeClass("hoverGreen cPointer fSize12");
                    $(".tabName")
                        .removeClass("fSize3")
                        .addClass("fSize2");
                    $("#tabCircuit")
                        .addClass("fSize3")
                        .removeClass("fSize2");
                }
            }
        };

        //===========================================
        // Keep track of profile field edit states
        //===========================================
        this.nameEdit = false;
        this.brandEdit = false;
        this.proficiencyEdit = false;
        this.githubEdit = false;
        this.addSkillField = false;
        this.addInterestField = false;

        //===========================================
        // TOGGLES NAME EDIT ON CLICK
        //===========================================
        this.toggleNameEdit = () => {
            this.nameEdit = !this.nameEdit;
            if (this.nameEdit) {
                if (this.name === "CLICK HERE TO ADD NAME") {
                    this.name = "";
                }
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
        // TOGGLES BRAND STATEMENT ON CLICK
        //===========================================
        this.toggleBrandEdit = () => {
            this.brandEdit = !this.brandEdit;
            if (this.brandEdit) {
                if (
                    this.brandStatement === "CLICK HERE TO ADD BRAND STATEMENT"
                ) {
                    this.brandStatement = "";
                }
                $(() => {
                    $("#brandEditField").focus();
                });
            } else {
                console.log(`post request for brand statement`);
                $http({
                    method: "PUT",
                    url: `/users/${this.currentUser._id}`,
                    data: {
                        brandStatement: this.brandStatement
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
                if (this.proficiency === "CLICK HERE TO ADD PROFICIENCY") {
                    this.proficiency = "";
                }
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
        // TOGGLES GITHUB LINK EDIT ON CLICK
        //===========================================
        this.toggleGithubEdit = () => {
            this.githubEdit = !this.githubEdit;
            if (this.githubEdit) {
                if (this.github === "CLICK HERE TO ADD GITHUB LINK") {
                    this.github = "";
                }
                $(() => {
                    $("#githubEditField").focus();
                });
            } else {
                console.log(`need to post github`);
                $http({
                    method: "PUT",
                    url: `/users/${this.currentUser._id}`,
                    data: {
                        github: this.github
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

        //===========================================
        // GET DATA FROM GITHUB API
        //===========================================
        this.getGithubData = () => {
            $http({
                method: "GET",
                url: `/github/${this.currentUser._id}`
            }).then(
                response => {
                    console.log(response);
                },
                err => {
                    console.log(err);
                }
            );
        };
    }
]);

//===========================================
// CODE GRAVEYARD
//===========================================

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

// -------- Get users route --------
// this.getUsers = () => {
//     $http({
//         method: "GET",
//         url: "/users"
//     }).then(
//         response => {
//             this.allUsers = response;
//         },
//         error => {
//             console.log(error);
//         }
//     );
// };
