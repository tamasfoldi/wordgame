/// <reference path="../../scripts/references.ts" />

describe("High Score Service Specs", () => {

  beforeEach(angular.mock.module("szojatek"));

  var highScoreSrv: Services.IHighScoreService;
  var highScore: Models.IHighScore;

  beforeEach(inject((HighScoreService: Services.HighScoreService) => {
    highScoreSrv = HighScoreService;

    highScore = { name: "test", score: 1 };
  }));


  it("should increase the size of highScores", () => {
    spyOn(highScoreSrv, "add").and.callThrough();

    var highscores = highScoreSrv.add(highScore);

    expect(highscores.length).toBe(1);
  });

  it("should not increase the size if the user exists", () => {
    spyOn(highScoreSrv, "add").and.callThrough();

    var highscores = highScoreSrv.add(highScore);
    highscores = highScoreSrv.add(highScore);

    expect(highscores.length).toBe(1);
  });

  it("should update to the highest score", () => {
    spyOn(highScoreSrv, "add").and.callThrough();

    var highscores = highScoreSrv.add(highScore);
    var highScore2 = { name: "test", score: 2 };
    highscores = highScoreSrv.add(highScore2);
    expect(highscores[0].score).toBe(2);

    var highScore0 = { name: "test", score: 0 };
    highscores = highScoreSrv.add(highScore0);
    expect(highscores[0].score).toBe(2);
  });

  it("should have the highest score on the top", () => {
    spyOn(highScoreSrv, "add").and.callThrough();

    var highscores = highScoreSrv.add(highScore);
    var highScore2 = { name: "test2", score: 2 };
    highscores = highScoreSrv.add(highScore2);

    var highScore0 = { name: "test0", score: 0 };
    highscores = highScoreSrv.add(highScore0);

    expect(highscores[0].score).toBe(2);
  });

});
