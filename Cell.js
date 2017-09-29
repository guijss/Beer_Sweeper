function Cell(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.beer = false;
  this.number = 0;
  this.empty = false;
  this.revealed = false;
  this.open = false;

  this.clicked = function() {
    if (mouseX > this.x && mouseX < this.x+this.w && mouseY > this.y && mouseY < this.y+this.h) {
      //this.revealed = true;
      fill(255);
      noStroke();
      rect(this.x, this.y, this.w, this.h);
      if (this.beer) {
        lost = true;
      }
      if (this.number > 0 && !this.beer) {
        noStroke();
        textSize(22);
        textAlign(CENTER);
        fill(0,0,255);
        text(str(this.number), this.x+1+this.w/2, this.y+7+this.w/2);
      }
      return true;
    } else{
      return false;
    }
  }

  this.reveal = function() {
    fill(255);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
    if (this.number > 0 && !this.beer) {
      noStroke();
      textSize(22);
      textAlign(CENTER);
      fill(0,0,255);
      text(str(this.number), this.x+1+this.w/2, this.y+7+this.w/2);
    }
  }

  this.showBeers = function() {
    noStroke();
    fill(255);
    rect(this.x+1, this.y+1, this.w-1, this.h-1);
    image(img, this.x+5, this.y+5);
  }
}

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len;
    }
    return result;
}

function openNeig(arr) {
  for (var k = 0; k < arr.length; k++) {
    for (var i = -1; i <= 1; i++) {
      for (var j = -1; j <= 1; j++) {
        if (arr[k].x/40+i >= 0 && arr[k].x/40+i < 10 && arr[k].y/40+j >= 0 && arr[k].y/40+j < 10) {
          grid[arr[k].x/40+i][arr[k].y/40+j].reveal();
        }
      }
    }
  }
}

function findEmpty(obj) {
  toOpen = [obj];
  for (var k = 0; k < toOpen.length; k++) {
    var x = toOpen[k].x/40;
    var y = toOpen[k].y/40;
    for (var i = -1; i <= 1; i++) {
      for (var j = -1; j <= 1; j++) {
        if (x+i >= 0 && x+i < 10 && y+j >= 0 && y+j < 10) {
          if (grid[x+i][y+j].empty && !grid[x+i][y+j].open) {
            toOpen.push(grid[x+i][y+j]);
            grid[x+i][y+j].open = true;
          }
        }
      }
    }
  }
  return toOpen;
}


function getBeers(arr, x, y) {
  var counter = 0;
  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      if (x+i >= 0 && x+i < 10 && y+j >= 0 && y+j < 10) {
        if (arr[x+i][y+j].beer) {
          counter++;
        }
      }
    }
  }
  return counter;
}
