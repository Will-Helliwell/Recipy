require("dotenv").config();

process.env.RACK_ENV = "test";
console.log("TEST IS WORKING", process.env.RACK_ENV);

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

afterAll(function () {
  process.env.RACK_ENV = "";
});
