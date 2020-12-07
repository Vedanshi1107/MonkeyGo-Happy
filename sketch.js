var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup,ground,groundImg
var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
}


function setup() {
  createCanvas(600, 200);

  
  
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running);

  

  monkey.scale = 0.5;
  
  ground = createSprite(400,350,900,10);
  ground.addImage("ground",groundImg);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();
  
  score = 0;
  
}

function draw() {
  
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){
    
    ground.velocityX = -3
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the clouds
    spawnFood();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
        
      
    }
  }
   else if (gameState === END){
     
      monkey.velocityX = 0;
      ground.velocityX = 0;
      monkey.velocityY = 0;
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);    
   }
  
 
  //stop trex from falling down
  monkey.collide(invisibleGround);
  


  drawSprites();
}

function reset(){
  

}


function spawnFood() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var Food = createSprite(600,120,40,10);
    Food.y = Math.round(random(120,200));
    Food.addImage(BananaImage);
    Food.scale = 0.5;
    Food.velocityX = -3;
    
     //assign lifetime to the variable
    Banana.lifetime = 200;
    
    //add each cloud to the group
    FoodGroup.add(Banana);
  }
}

function spawnObstacles() {
  //write code here to spawn the clouds
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600,120,40,10);
    obstacle.y = Math.round(random(50,180));
    obstacle.addImage(BananaImage);
    obstacle.scale = 0.5;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle .lifetime = 200;
    
    //add each cloud to the group
    obstaclesGroup.add(obstacle);
  }
}







