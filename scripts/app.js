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
//# sourceMappingURL=app.js.map