/// <reference path="../references.ts" />
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
//# sourceMappingURL=HighScoreService.js.map