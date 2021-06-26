//Create variables here
var dog,happydog,foodS,foodStock,database,dogImg,happydogimg,fedTime,feedTime,lastFed;
function preload()
{
	//load images here
  dogImg = loadImage("images/Dog.png");
  happydogimg=loadImage("images/happydog.png");
}

function setup() {
	createCanvas(500,500);
  database=firebase.database();
  dog=createSprite(250,300,20,20);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('food');
  foodStock.on('value',readStock);
}


function draw() {  
  background(46, 139, 87)
  
  fedTime=database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  
    display();
  

  drawSprites();
  //add styles here
  fill('white');
  textSize(20);
  text('FOOD REMAING: '+foodS,150,200);
  textSize(15);
  text('NOTE:PRESS UP_ARROW Key to feed Drago milk',130,20);
}




function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    food:x
  })
}


