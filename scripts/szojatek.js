/// <reference path="references.ts" />
var App;
(function (App) {
    angular.module("szojatek", ["angular-storage", "ui.router", "LocalStorageModule", "ngMaterial", "focus-if"])
        .config(function ($urlRouterProvider, $httpProvider, $stateProvider) {
        $stateProvider
            .state("home", {
            controller: Controllers.HomeCtrl,
            controllerAs: "HomeCtrl",
            templateUrl: "partials/home.html",
            url: "/",
        });
        $urlRouterProvider.otherwise("/");
    })
        .run(function ($window, store) {
        $window.onbeforeunload = function () {
            store.remove("highScore");
        };
    });
})(App || (App = {}));
//# sourceMappingURL=app.js.map;/// <reference path="../references.ts" />
var Models;
(function (Models) {
    "use strict";
})(Models || (Models = {}));
//# sourceMappingURL=IHighScore.js.map;/// <reference path="../references.ts" />
var Services;
(function (Services) {
    "use strict";
    var HighScoreService = (function () {
        function HighScoreService(store) {
            this.store = store;
            this.highScores = new Array();
            this.store.remove("highScore");
        }
        HighScoreService.prototype.add = function (highScore) {
            var tempscore = this.highScores.filter(function (element) {
                return element.name === highScore.name;
            })[0];
            if (tempscore) {
                highScore = (tempscore.score > highScore.score) ? tempscore : highScore;
            }
            this.highScores = this.highScores.filter(function (element) {
                return element.name !== highScore.name;
            });
            this.highScores.push(highScore);
            this.highScores.sort(function (a, b) {
                return b.score - a.score;
            });
            this.store.set("highScore", this.highScores);
            return this.highScores;
        };
        HighScoreService.$inject = ["store"];
        return HighScoreService;
    })();
    Services.HighScoreService = HighScoreService;
    angular
        .module("szojatek")
        .service("HighScoreService", Services.HighScoreService);
})(Services || (Services = {}));
//# sourceMappingURL=HighScoreService.js.map;/// <reference path="../references.ts" />
var Services;
(function (Services) {
    "use strict";
    var ValidateService = (function () {
        function ValidateService($http) {
            this.$http = $http;
        }
        ValidateService.prototype.validate = function (word) {
            var url = "/";
            for (var i = 0; i < word.length; i++) {
                if (i < word.length - 1) {
                    url += word.charAt(i) + "/";
                }
                else {
                    url += word.charAt(i);
                }
            }
            return this.$http.get("/data/" + url);
        };
        ValidateService.$inject = ["$http"];
        return ValidateService;
    })();
    Services.ValidateService = ValidateService;
    angular
        .module("szojatek")
        .service("ValidateService", Services.ValidateService);
})(Services || (Services = {}));
//# sourceMappingURL=ValidateService.js.map;/// <reference path="../references.ts" />
var Controllers;
(function (Controllers) {
    "use strict";
    var HomeCtrl = (function () {
        function HomeCtrl(HighScoreService, ValidateService) {
            this.HighScoreService = HighScoreService;
            this.ValidateService = ValidateService;
            this.highScores = new Array();
            this.username = "";
            this.word = "";
        }
        HomeCtrl.prototype.countPoints = function (word) {
            var numberOfUniqueLetters = 0;
            for (var i = 0; i < word.length; i++) {
                var tempChar = word.charAt(i);
                if (word.indexOf(tempChar) === i) {
                    numberOfUniqueLetters++;
                }
            }
            return numberOfUniqueLetters;
        };
        HomeCtrl.prototype.wordEntered = function () {
            var _this = this;
            this.ValidateService.validate(this.word.toLowerCase()).then(function () {
                var points = _this.countPoints(_this.word);
                _this.word = "";
                _this.highScores = _this.HighScoreService.add({ name: _this.username, score: points });
            });
        };
        HomeCtrl.$inject = ["HighScoreService", "ValidateService"];
        return HomeCtrl;
    })();
    Controllers.HomeCtrl = HomeCtrl;
    angular
        .module("szojatek")
        .controller("HomeCtrl", Controllers.HomeCtrl);
})(Controllers || (Controllers = {}));
//# sourceMappingURL=HomeController.js.map