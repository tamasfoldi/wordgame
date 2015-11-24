/// <reference path="../references.ts" />
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