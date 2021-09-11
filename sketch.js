var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600, 200);

  var message = "This is a message";
 console.log(message)
  
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  

  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  
  trex.setCollider("rectangle",0,0,trex.width,trex.height);
  trex.debug = true
  
  score = 0;
  
}

function draw() {
background(180)
text ("score: " + score, 500,50);

if (gameState ===PLAY)
score = score + Math.round(getFrameRate()/60);
ground.velcoityX = -(6 + 3*score/100);
trex.changeAnimation ("running", trex_running)
if(keyDown("space")&& trex.y >=159){
  trex.velcoityY = -12;

  drawSprites();
}

trex.velcoityY = trex.velcoityY + 0.8
if (ground.x < 0){
  ground.x = ground.width/2;
}
trex.collide(invisibleGround);
spawnClouds();
spawnObstacles();
if (obstaclesGroup.isTouching(trex)){
  gameState = END;

}
else if(gameState === END){
  gameOver.visible = true;
  restart.visible = true;;
ground.velcoityX = 0;
trex.velcoityY = 0;
obstaclesGroup.setLifetimeEach(-1);
cloudsGroup.setLifetimeEach(-1);
trex.changeAnimation("collided", trex_collided)

if(mousePressedOver(restart)){
resizeTo();

}

}

}








function spawnObstacles(){
if(frameCount % 60 === 0){
  var obstacle = createSprite(600,165,10,40);
  obstacle.velcoityX = -(6 + 3*score/100);
  var rand = Math.round(random(1,6));
switch(rand){
  case 1: obstacle.addImage(obstacle1);
  break;
  case 2: obstacle.addImage(obstacle2);
  break;
  
  case 3: obstacle.addImage(obstacle3);
  break;
  
  case 4: obstacle.addImage(obstacle4);
  break;
  
  case 5: obstacle.addImage(obstacle5);
  break;
  
  case 6: obstacle.addImage(obstacle6);
  break;
  default: break;
  

}
obstacle.scale = 0.5;
obstacle.lifetime = 300
obstaclesGroup.add(obstacle);

  } 

}
function spawnClouds(){
if (frameCount & 60 === 0){
  var cloud = createSprite(600,120,40,10);
  cloud.y = Math.round(random(80,120));
  cloud.addImage(cloudImage);
  cloud.scale = 0.5;
  cloud.velcoityX = -3;
  cloud.lifetime = 200;
  cloud.depth = trex.depth
  trex.depth = trex.depth +1;
  cloudsGroup.add(cloud);
}
}