//Create variables here
var dog, happyDog;
var database;
var foodS, foodStock;
var count;

function preload()
{
dog = loadImage("images/dogImg.png")
happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();

  dogImage = createSprite(250,300)
  dogImage.addImage(dog);
  dogImage.scale=0.3;

  var foodStock = database.ref('Food');
  foodStock.on("value",readStock)
}



function draw() {  
  
  //add styles here
  background(46,139,87);

  fill("white");
  stroke("white");
  textSize(20);
  text( "Note: Press the 'W' Key to feed Harry Milk!", 40, 50)
  text("Food Remaining: " +count, 150, 150);

  if(keyDown("w")) {
    writeStock(count)
    dogImage.addImage(happyDog)
  }
  drawSprites();
}

function readStock(data){
  count = data.val();
}

function writeStock(x) {
  if(x<=0) {
    x = 0;

  }
    else{
      x = x-1;
    }
  database.ref('/').update({
    Food:x
  })
}



