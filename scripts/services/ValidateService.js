/// <reference path="../references.ts" />
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
//# sourceMappingURL=ValidateService.js.map