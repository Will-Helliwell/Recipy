require("dotenv").config();

// process.env.NODE_ENV = "test";
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

// afterAll(function () {
//   process.env.NODE_ENV = "";
// });
