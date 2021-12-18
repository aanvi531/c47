var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;
var zombies;
var bullet;
var bullets;
var numberOfBullets = 5;
var heart1, heart2, heart3, heart1Img, heart2Img, heart3Img;
var gameState = "fight";
var life = 3;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombieImg = loadImage("assets/zombie.png");
 
  heart1Img = loadAnimation("assets/heart_1.png");
  heart2Img = loadAnimation("assets/heart_2.png");
  heart3Img = loadAnimation("assets/heart_3.png");

}

function setup() {
  
  createCanvas(windowWidth,windowHeight);
  zombies = new Group();
  bullets = new Group();
  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  
//creating the player sprite
   player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
   player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

heart1 = createSprite(displayWidth-250,40,20,20); 
heart1.addAnimation("heart1", heart1Img);  
heart1.scale = 0.4;
heart1.visible = false;

heart2 = createSprite(displayWidth-250,40,20,20); 
heart2.addAnimation("heart2", heart2Img);  
heart2.scale = 0.4;
heart2.visible = false;

heart3 = createSprite(displayWidth-270,40,20,20); 
heart3.addAnimation("heart3", heart3Img);  
heart3.scale = 0.4;
heart3.visible = true;


for(var i = 1; i <= 5; i = i + 1){
  if(frameCount%150 == 0){
  var zombie = createSprite(random(500,1100), random(100,500),40,40);
  zombie.addImage("zombie", zombieImg);
  zombie.scale = 0.15;
  zombie.velocityX = -2;
  zombies.add(zombie);
  zombie.lifetime = 1200;
  }
}


}

function draw() {
  background(0); 
if(gameState ==="fight"){
  //moving the player up and down and making the game mobile compatible using touches
 if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
 }



 if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
 }

 //release bullets and change the image of shooter to shooting position when space is pressed
 if(keyWentDown("space")){
  bullet = createSprite(displayWidth-1150,player.y - 30, 20, 10);
  bullet.velocityX = 20;
  bullets.add(bullet);
  bullet -= 1;
  player.addImage(shooter_shooting);
 }

 //player goes back to original standing image once we stop pressing the space bar
 if(keyWentUp("space")){
  player.addImage(shooterImg);
 }
 
 if(zombies.isTouching(bullets)){
  for(var i = 0; i < zombies.length; i++){
    if(zombies[i].isTouching(bullets)){
      zombies[i].destroy();
      bullets.destroyEach(); 
    }
  }
 }

 if(zombies.isTouching(player)){
  for(var i = 0; i < zombies.length; i++){
    if(zombies[i].isTouching(player)){
      zombies[i].destroy();
      life -= 1;
      if(life == 2){
        heart2.visible = true;
        heart3.visible = false;
      }
      else if(life == 1){
        heart2.visible = false;
        heart1.visible = true;
      }
      else {
        
        heart1.visible = false;
        zombies.destroyEach();
        player.destroy(); 
      }
    }
  }
 }
 drawSprites();
 }

if(gameState === "lost"){
  textSize(100);
  fill("red");
  text("You lost", 400, 400);
  zombies.destroyEach();
  player.destroy(); 
} 

else if(gameState === "won"){
  textSize(100);
  fill("green"); 
  text("You won", 400, 400);
  zombies.destroyEach();
  player.destroy();
}

else if(gameState === "bullet"){
  textSize(50);
  fill("yellow"); 
  text("You ran out of bullets", 470, 410);
  zombies.destroyEach();
  player.destroy();
  bullets.destroyEach();

}

}





