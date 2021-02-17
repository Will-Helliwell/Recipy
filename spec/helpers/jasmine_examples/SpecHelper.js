require("dotenv").config();


console.log("TEST IS WORKING", process.env.NODE_ENV);

beforeEach(function () {
  jasmine.addMatchers({
    toBePlaying: function () {
      return {
        compare: function (actual, expected) {
          var player = actual;

          return {
            pass: player.currentlyPlayingSong === expected && player.isPlaying,
          };
        },
      };
    },
  });
});
