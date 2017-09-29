var rows = 10;
var cols = 10;
var grid1d = [];
var beers;
var w;
var h;
var count = 0;
var lost = false;
var toOpen;
var img;

function preload() {
  img = loadImage("beer.jpg");
}

function setup() {
  createCanvas(401, 401);
  background(0);
  w = 40;
  h = 40;
  grid = m2DA();
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      grid[i][j] = new Cell(i*w, j*h, w, h);
      grid1d[count] = grid[i][j];
      count++
    }
  }

  beers = getRandom(grid1d, 20);
  for (var i = 0; i < beers.length; i++) {
    beers[i].beer = true;
  }
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      if (!grid[i][j].beer) {
        grid[i][j].number = getBeers(grid, i, j);
        if (grid[i][j].number == 0) {
          grid[i][j].empty = true;
        }
      }
    }
  }
}

function draw() {

  stroke(100);
  for (var i = 0; i < rows; i++) {
    line(i*w, 0, i*w, height);
  }

  for (var i = 0; i < cols; i++) {
    line(0, i*h, width, i*h);
  }

  if (lost) {
    for (var i = 0; i < beers.length; i++) {
      beers[i].showBeers();
    }
  }
}

function m2DA() {
  var a = new Array(cols);
  for (var i = 0; i < cols; i++) {
    a[i] = new Array(rows);
  }
  return a;
}

function mousePressed() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      if(!lost) {
        if (grid[i][j].clicked()) {
          if (grid[i][j].empty) {
            openNeig(findEmpty(grid[i][j]));
          }
        }
      }
    }
  }
}
