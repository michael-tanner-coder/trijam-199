// game loop
var fps = 60;
var start_time = Date.now();
var frame_duration = 1000 / 62;
var lag = 0;
var dt = 0;
var current_time = Date.now();
var game_timer = 0;

// game vars
var start_timer = 4;
var p1_bricks = 0;
var p2_bricks = 0;
var winner = "";
var screenshakesRemaining = 0;
var spawn_rate = 50;
var spawn_timer = 0;
var spawn_limit = 1;
var score = 0;
var i_frames = 0;
var invincibility_duration = 10;


