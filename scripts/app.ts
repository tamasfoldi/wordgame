/// <reference path="references.ts" />

module App {
  angular.module("szojatek", ["angular-storage", "ui.router", "LocalStorageModule", "ngMaterial", "focus-if"])
    .config(($urlRouterProvider: angular.ui.IUrlRouterProvider, $httpProvider: angular.IHttpProvider, $stateProvider: angular.ui.IStateProvider) => {
      $stateProvider
        .state("home", {
          controller: Controllers.HomeCtrl,
          controllerAs: "HomeCtrl",
          templateUrl: "partials/home.html",
          url: "/",
        });
      $urlRouterProvider.otherwise("/");
    })
    .run(($window: angular.IWindowService, store: angular.a0.storage.IStoreService) => {
      $window.onbeforeunload = function () {
        store.remove("highScore");
      };
    });
}
