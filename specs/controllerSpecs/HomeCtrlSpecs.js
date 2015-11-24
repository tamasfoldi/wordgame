/// <reference path="../../scripts/references.ts" />
describe("Home Controller Specs", function () {
    var homeCtrl;
    var onlyUniqueLetters = "asdf";
    var notOnlyUniqueLetters = "zászló";
    var validateSrv;
    var highScoreSrv;
    var q;
    beforeEach(angular.mock.module("szojatek"));
    beforeEach(function () {
        jasmine.addCustomEqualityTester(function (first, second) {
            return angular.equals(first, second);
        });
    });
    beforeEach(function () { return inject(function (HighScoreService, ValidateService, $q) {
        highScoreSrv = HighScoreService;
        validateSrv = ValidateService;
        q = $q;
        homeCtrl = new Controllers.HomeCtrl(HighScoreService, ValidateService);
    }); });
    it("should count every unique letter as one point", function () {
        spyOn(homeCtrl, "countPoints").and.callThrough();
        expect(homeCtrl.countPoints(onlyUniqueLetters)).toEqual(onlyUniqueLetters.length);
        expect(homeCtrl.countPoints(notOnlyUniqueLetters)).toEqual(5);
    });
});
//# sourceMappingURL=HomeCtrlSpecs.js.map