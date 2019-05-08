var friendsData = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", (req, res) => {
    res.json(friendsData);
  });

  app.post("/api/friends", (req, res) => {
    var newUserScore = req.body.scores;
    var friendDiff = [];

    //returns score of a new user or previous member
    function scoreSum(arr) {
      var newArr = [];
      var score = 0;
      for (var i = 0; i < arr.length; i++) {
        newArr.push(parseInt(arr[i]));
        score += newArr[i];
      }
      return score;
    }

    //calculates the difference of scores between new user and all previous member
    //pushes results into an array
    for (var i = 0; i < friendsData.length; i++) {
      friendDiff.push(
        Math.abs(scoreSum(friendsData[i].scores) - scoreSum(newUserScore))
      );
    }

    //get index of lowest difference
    var bffIndex = friendDiff.indexOf(Math.min(...friendDiff));

    //finds friend at that index
    var bff = friendsData[bffIndex];

    //sends friend as object
    res.json(bff);

    //pushes new member into previous members array
    friendsData.push(req.body);
  });
};
