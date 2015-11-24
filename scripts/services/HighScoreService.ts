/// <reference path="../references.ts" />

namespace Services {
  "use strict";

  export interface IHighScoreService {
    add(highScore: Models.IHighScore): Array<Models.IHighScore>;
  }
  export class HighScoreService implements IHighScoreService {
    static $inject: Array<string> = ["store"];
    private highScores: Array<Models.IHighScore> = new Array<Models.IHighScore>();

    constructor(private store: angular.a0.storage.IStoreService) {
      this.store.remove("highScore");
    }

    add(highScore: Models.IHighScore): Array<Models.IHighScore> {
      var tempscore = this.highScores.filter((element) => {
        return element.name === highScore.name;
      })[0];
      if (tempscore) {
        highScore = (tempscore.score > highScore.score) ? tempscore : highScore; // if the older is greater, keep it
      }

      this.highScores = this.highScores.filter((element) => { // find other user's scores
        return element.name !== highScore.name;
      });
      this.highScores.push(highScore); // add the new one to the top
      this.highScores.sort((a: Models.IHighScore, b: Models.IHighScore) => { // sort it 
        return b.score - a.score;
      });
      this.store.set("highScore", this.highScores);
      return this.highScores;
    }
  }

  angular
    .module("szojatek")
    .service("HighScoreService", Services.HighScoreService);
}
