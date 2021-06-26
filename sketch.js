//Create variables here
var dog,happydog,foodS,foodStock,database,dogImg,happydogimg;
var fedTime,feed,addFood,foodObj,lastFed;
function preload()
{
	//load images here
  dogImg = loadImage("images/Dog.png");
  happydogimg=loadImage("images/happydog.png");
}

function setup() {
	createCanvas(1000,400);
  database=firebase.database();
  dog=createSprite(800,200,20,20);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('food');
  foodStock.on('value',readStock);
  foodObj=new Food();

  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)

}


function draw() {  
  background(46, 139, 87)
  foodObj.display();
  fedTime=database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  
  

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }

  //add styles here
  drawSprites();
}

function addFoods(){
foodS++;
database.ref('/').update({
  food:foodS
})
}

function feedDog(){
  dog.addImage(happydogimg);
  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}



function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}



