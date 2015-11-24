/// <reference path="../references.ts" />

namespace Services {
  "use strict";

  export interface IValidateService {
    validate(word: string): angular.IPromise<boolean>;
  }

  export class ValidateService implements IValidateService {
    static $inject: Array<string> = ["$http"];
    constructor(private $http: angular.IHttpService) { }

    validate(word: string): angular.IPromise<boolean> {
      var url = "/";
      for (var i = 0; i < word.length; i++) {
        if (i < word.length - 1) {
          url += word.charAt(i) + "/";
        } else {
          url += word.charAt(i);
        }
      }
      return this.$http.get("/data/" + url);
    }
  }

  angular
    .module("szojatek")
    .service("ValidateService", Services.ValidateService);
}
