/// <reference path="../references.ts" />

namespace Controllers {
  "use strict";

  export class HomeCtrl {
    static $inject: Array<string> = ["HighScoreService", "ValidateService"];
    private highScores: Array<Models.IHighScore> = new Array<Models.IHighScore>();
    private username = "";
    private word = "";
    constructor(private HighScoreService: Services.IHighScoreService, private ValidateService: Services.IValidateService) { }

    countPoints(word: string): number {
      var numberOfUniqueLetters = 0;
      for (var i = 0; i < word.length; i++) {
        var tempChar = word.charAt(i);
        if (word.indexOf(tempChar) === i) { // it counts as point if it is the first occurance
          numberOfUniqueLetters++;
        }
      }
      return numberOfUniqueLetters;
    }

    wordEntered() {
      this.ValidateService.validate(this.word.toLowerCase()).then(() => {
        var points = this.countPoints(this.word);
        this.word = "";
        this.highScores = this.HighScoreService.add({ name: this.username, score: points });
      });
    }
  }

  angular
    .module("szojatek")
    .controller("HomeCtrl", Controllers.HomeCtrl);
}
