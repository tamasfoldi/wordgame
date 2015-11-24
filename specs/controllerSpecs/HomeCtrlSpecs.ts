/// <reference path="../../scripts/references.ts" />

describe("Home Controller Specs", () => {
  var homeCtrl: Controllers.HomeCtrl;
  var onlyUniqueLetters = "asdf";
  var notOnlyUniqueLetters = "zászló";
  var validateSrv: Services.IValidateService;
  var highScoreSrv: Services.IHighScoreService;
  var q: angular.IQService;

  beforeEach(angular.mock.module("szojatek"));

  beforeEach(() => {
    jasmine.addCustomEqualityTester((first, second) => {
      return angular.equals(first, second);
    });
  });

  beforeEach(() => inject((HighScoreService: Services.HighScoreService, ValidateService: Services.ValidateService, $q: angular.IQService) => {
    highScoreSrv = HighScoreService;
    validateSrv = ValidateService;
    q = $q;
    homeCtrl = new Controllers.HomeCtrl(HighScoreService, ValidateService);
  }));

  it("should count every unique letter as one point", () => {
    spyOn(homeCtrl, "countPoints").and.callThrough();

    expect(homeCtrl.countPoints(onlyUniqueLetters)).toEqual(onlyUniqueLetters.length);
    expect(homeCtrl.countPoints(notOnlyUniqueLetters)).toEqual(5);
  });
});
