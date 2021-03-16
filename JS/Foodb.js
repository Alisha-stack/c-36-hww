class Foodb{
constructor(){
   

this.foodStock = 0;

this.image = loadImage("Milk.png");
}
display(){
    
    var x =80, y = 100;
    imageMode(CENTER);
    
    
    if(this.foodStock!=0){
for(var i = 0; i< this.foodStock; i++){
  if(i%10===0){
      x=80;
      y=y+50;
  }
  image(this.image,x,y,50,50);
  x = x+ 30;
}
    }
}

   
    getFoodStock(){
        var foodRef = database.ref('food');
foodRef.on("value", function(data){
foodTan = data.val();
});
    }
    updateFoodStock(food){
        database.ref('/').update({
            food : food
        });
    }
    eating(){
        dog.changeImage("delta", happyDogImg);
    }
    bedroom(){
        image(bedRoomImg,400,400,800,800);
        
    }
    garden(){
        image(gardenImg,400,400,800,800);
    }
    washroom(){
        image(washRoomImg,400,400,800,800);
    }
}