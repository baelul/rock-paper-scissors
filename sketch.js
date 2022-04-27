// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;

//rps img
let rock;
let paper;
let scissors;
let frock;
let fpaper;
let fscissors;
// Model URL ****************
let imageModelURL = "https://teachablemachine.withgoogle.com/models/CunE1LcGs/";

// Video
let video;
let flippedVideo;
// Variable store the classification category name
let label = "";
let confidence = "";
let x;
let y;
let wins = 0;
let loses = 0;
let draws = 0;
let turns = 0;
let turn = false;
let t = "";
let t1 = ["-", "", "", ""]; // w/l/d, comp, you, clr
let t2 = ["-", "", "", ""];
let t3 = ["-", "", "", ""];
let outcome = "";

//1. Call ML5 function: Load the model before sketch runs
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
  rock = loadImage("rock.png");
  paper = loadImage("paper.png");
  scissors = loadImage("scissors.png");

  frock = loadImage("frock.png");
  fpaper = loadImage("fpaper.png");
  fscissors = loadImage("fscissors.png");
}

function setup() {
  createCanvas(640, 640);
  // Create the video
  video = createCapture(VIDEO);
  video.size(640, 480);

  //hide html video element so we dont get double video
  video.hide();

  flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
  x = width / 2;
  y = height / 2;

  //add intructions in a paragraph tag to the dom of the page*************
  let p = createP("Rock Paper Scissors");
  p = createP("Make sure to click the preview before pressing ENTER.");
}

function draw() {
  background(255);

  // Draw the video
  //image(flippedVideo, 0, 0);

  fill(0);
  rect(0, 500, 640, 160);

  // Draw the label
  textSize(16);
  textAlign(CENTER);
  //text(label, width / 2, height - 4 - 160);

  fill(255);
  text("Play Rock Paper Scissors with your computer!", width / 2, height - 100);
  text("Press ENTER when you have your hand ready.", width / 2, height - 80);
  text("(Don't worry, the computer's hand is completely random)", width / 2, height - 60
  );
  text("Make sure to click the preview before pressing ENTER.", width / 2, height - 30);
  fill(0);

  //Update your class names and write some code *********************
  //for what should happen when your different categories are detected

  let plays = ["rock", "paper", "scissors"];
  let randHand = random(plays);

  if (turns < 3) {
    if (randHand == "rock") {
      image(frock, width / 2 - 215, height / 2 - 75, 140, 100);
    } else if (randHand == "scissors") {
      image(fscissors, width / 2 - 200, height / 2 - 75, 120, 100);
    } else if (randHand == "paper") {
      image(fpaper, width / 2 - 200, height / 2 - 75, 120, 100);
    }
  } else if (turns == 3) {
    // w/l/d, comp, you, clr
    if (t3[1] == "rock") {
      image(frock, width / 2 - 215, height / 2 - 75, 140, 100);
    } else if (t3[1] == "scissors") {
      image(fscissors, width / 2 - 200, height / 2 - 75, 120, 100);
    } else if (t3[1] == "paper") {
      image(fpaper, width / 2 - 200, height / 2 - 75, 120, 100);
    }
  }

  if (turns < 3) {
    if (label == "rock") {
      image(rock, width / 2 + 70, height / 2 - 75, 140, 100);
    } else if (label == "scissors") {
      image(scissors, width / 2 + 75, height / 2 - 75, 120, 100);
    } else if (label == "paper") {
      image(paper, width / 2 + 75, height / 2 - 75, 120, 100);
    }
  } else if (turns == 3) {
    // w/l/d, comp, you, clr
    if (t3[2] == "rock") {
      image(rock, width / 2 + 70, height / 2 - 75, 140, 100);
    } else if (t3[2] == "scissors") {
      image(scissors, width / 2 + 75, height / 2 - 75, 120, 100);
    } else if (t3[2] == "paper") {
      image(paper, width / 2 + 75, height / 2 - 75, 120, 100);
    }
  }

  // label = you
  // randHand = computer
  let c = label == "rock" || label == "scissors" || label == "paper";

  if (c && turn == true) {
    if (randHand == label) {
      draws += 1;
      t = "=";
    } else if (randHand == "rock") {
      if (label == "scissors") {
        loses += 1;
        t = "X";
      } else if (label == "paper") {
        wins += 1;
        t = "O";
      }
    } else if (randHand == "paper") {
      if (label == "rock") {
        loses += 1;
        t = "X";
      } else if (label == "scissors") {
        wins += 1;
        t = "O";
      }
    } else if (randHand == "scissors") {
      if (label == "rock") {
        wins += 1;
        t = "O";
      } else if (label == "paper") {
        loses += 1;
        t = "X";
      }
    }
    turns += 1;
    turn = false;

    let clr;

    if (t == "X") {
      clr = "red";
    } else if (t == "O") {
      clr = "green";
    } else if (t == "=") {
      clr = "blue";
    }

    if (turns == 1) {
      t1[0] = t;
      t1[1] = randHand;
      t1[2] = label;
      t1[3] = clr;
    } else if (turns == 2) {
      t2[0] = t;
      t2[1] = randHand;
      t2[2] = label;
      t2[3] = clr;
    } else if (turns == 3) {
      t3[0] = t;
      t3[1] = randHand;
      t3[2] = label;
      t3[3] = clr;
    }
  }

  print(t, t1, t2, t3);

  // display win / draw / lose
  // display computer hand vs ur hand
  // display the start of each turn

  // best out of 3
  if (turns == 3) {
    if (draws == 3) {
      outcome = "DRAW";
    } else if (draws == 2) {
      if (wins == 1) {
        outcome = "YOU WIN";
      } else if (loses == 1) {
        outcome = "YOU LOSE";
      }
    } else if (draws == 1) {
      if (wins == 1 && loses == 1) {
        outcome = "DRAW";
      } else if (wins == 2) {
        outcome = "YOU WIN";
      } else if (loses == 2) {
        outcome = "YOU LOSE";
      }
    } else if (draws == 0) {
      if (wins >= 2) {
        outcome = "YOU WIN";
      } else if (loses >= 2) {
        outcome = "YOU LOSE";
      }
    }
  }

  //Draw the confidence score
  // text("// OUTCOME: " + outcome, width / 2 - 95, height - 4);
  // text(
  //   "w/l/d: " + wins + "/" + loses + "/" + draws + ": " + randHand,
  //   width / 2 - 95,
  //   height - 4
  // );
  textAlign(CENTER);
  text("TURN 1", 75, 50);
  text("TURN 2", width / 2, 50);
  text("TURN 3", width - 75, 50);

  text("comp: " + t1[1], 75, 110);
  text("comp: " + t2[1], width / 2, 110);
  text("comp: " + t3[1], width - 75, 110);

  text("you: " + t1[2], 75, 130);
  text("you: " + t2[2], width / 2, 130);
  text("you: " + t3[2], width - 75, 130);

  textSize(30);
  fill(t1[3]);
  text(t1[0], 75, 85);
  fill(t2[3]);
  text(t2[0], width / 2, 85);
  fill(t3[3]);
  text(t3[0], width - 75, 85);

  fill(0);
  textSize(60);
  text(outcome, width / 2, height / 2 + 120);
}

// keyPressed():  checks if ENTER is pressed, if so, go to next turn!
function keyPressed() {
  turn = true;
}

// 2. Classify the current video frame
function classifyVideo() {
  //load the video into the ml5.flipImage function to flip it!
  flippedVideo = ml5.flipImage(video);

  //then classify the frame in flippedVideo. Once its done run the function gotResult.
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result, pass data from the classifier in as arguments to this function
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // results are in an array of labels and confidence scores ordered by confidence.
  print(results[0]);
  label = results[0].label; //put results in globals label & confidence.
  confidence = results[0].confidence; //these are then used in draw()
  // Call classifiy again!
  classifyVideo();
}
