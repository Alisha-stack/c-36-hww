  
  

  var  happyDogImg;
  var database;
var dataRef;
var foodTan;
var fedTime, lastFed;
var foodObj;
var feed, addFood;
var gameState ;

var currenttime;
  function preload(){
    
    happyDogImg = loadImage("happy dog.png");
  }

function setup(){
  var canvas = createCanvas(500,500);
 
  database = firebase.database();
 
  dog = createSprite(200,200,20,20);
  dog.addImage("doggy",happyDogImg);
 
 
  foodObj = new Foodb();
  foodObj.getFoodStock();

  var fedRefTime = database.ref('FeedTime');
  fedRefTime.on("value",(data)=>{
         lastFed = data.val();
  })
var refGameState = database.ref('gameState');
refGameState.on("value", function(data){
gameState =data.val();
})
  
  feed = createButton("FEED THE DOG");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton( "ADD FOOD !");
  addFood.position(800,95);
  addFood.mousePressed(addFoodS);
}

function draw(){
background(46,139,187);
var canvas = createCanvas(800,800)

console.log(gameState);
text("FOOD LEFT :"+ foodTan, 200, 200); 
fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("LAST FEED :" + lastFed%12 + "PM",350,30)
}else if (lastFed==0){
  text("LAST FEED : 12 AM",350,30);
}else{
  text("LAST FEED :" + lastFed + "AM",350,30);

}
if(gameState !== "hungry"){
feed.hide();
addFood.hide();
dog.remove();
}else{
  feed.show();
  addFood.show();

}
foodObj.foodStock= foodTan;

foodObj.display();
currenttime = minute();
console.log(currenttime);
if(currenttime == (lastFed+1)){ 
  update("sleeping");
  foodObj.bedroom();
}else if(currenttime>(lastFed+2)&& currenttime<=(lastFed+4)){
update("bathing");
foodObj.washroom();
}else if(currenttime==(lastFed+1)){
  update("playing");
  foodObj.garden();
}else{
update("hungry");
foodObj.display();
}

  drawSprites();
}





function feedDog(){
  update("eating");
  foodObj.eating();
 
 foodTan--;
 foodObj.updateFoodStock(foodTan);
 database.ref('/').update({
   
   FeedTime:hour()
 })
 
}

function addFoodS(){
  foodTan++;
  database.ref('/').update({
    food:foodTan
  })
}


function update(state){
database.ref('/').update({
  gameState:state
})
}



























