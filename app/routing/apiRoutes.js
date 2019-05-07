var friendsData = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", (req, res) => {
    res.json(friendsData);
  });

  app.post("/api/friends", (req, res) => {
    var newUserScore = req.body.scores;
    var friendDiff = [];

    function scoreSum(arr) {
      var newArr = [];
      var score = 0;
      for (var i = 0; i < arr.length; i++) {
        newArr.push(parseInt(arr[i]));
        score += newArr[i];
      }
      return score;
    }

    for (var i = 0; i < friendsData.length; i++) {
      friendDiff.push(
        Math.abs(scoreSum(friendsData[i].scores) - scoreSum(newUserScore))
      );
    }

    var bffIndex = friendDiff.indexOf(Math.min(...friendDiff));
    var bff = friendsData[bffIndex];
    res.json(bff);
    friendsData.push(req.body); //move to end
  });
};
