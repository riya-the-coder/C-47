var player;
var obstacle;
var gameState="PLAY";

var mind,happy,cry,angry,excited;
var mind, happy_img, cry_img, angry_img, excited_img;
var life=3;
var score;




function preload(){
  bgimg= loadImage("images/bg.jpg");
    happy_img = loadImage("images/happy.png");
    cry_img = loadImage("images/cry2.png");
       angry_img = loadImage("images/angry.png");
       excited_img = loadImage("images/excited.png");
       player_img=loadImage("images/hunterhappy.png");
       gameOver_img=loadImage("images/go.png")
       Restart_img=loadImage("images/restart.png")
}
function setup(){
 canvas=createCanvas(displayWidth-20,displayHeight-30);
 player=createSprite(200,displayHeight-80,50,50);
 player.addImage(player_img);
 player.scale=0.8;
 player.debug=true;
 score=0;
gameOver=createSprite(displayWidth/2,displayHeight/2);
Restart=createSprite(displayWidth/2,displayHeight-200);
gameOver.addImage(gameOver_img);
Restart.addImage(Restart_img);
gameOver.visible=false;
Restart.visible=false;
gameOver.debug=true;
 Restart.debug=true;
ObstaclesGroup=createGroup();
HappyGroup=createGroup();
CryGroup=createGroup();
AngryGroup=createGroup();
ExcitedGroup=createGroup();
}
function draw(){
    background(bgimg);
  
    if(gameState==="PLAY"){
    player.x=World.mouseX;
    
    spawnEmotionsHappy();
    spawnEmotionsCry();
       spawnEmotionsAngry();
    spawnEmotionsExcited();
    spawnObstacles();
   
    if(ObstaclesGroup.isTouching(player)){
        life--;
       
    }
    if(life<1 || score<0){
        gameState="END";
    }
  if(HappyGroup.isTouching(player)|| ExcitedGroup.isTouching(player)){
      score+=10;
    }
    if(CryGroup.isTouching(player)|| AngryGroup.isTouching(player)){
     score-=10;
    }
}
 else if(gameState==="END"){
     ObstaclesGroup.setLifetimeEach(-1);
     ObstaclesGroup.setVelocityYEach(0);
    HappyGroup.setLifetimeEach(-1);
     HappyGroup.setVelocityYEach(0);
     CryGroup.setLifetimeEach(-1);
     CryGroup.setVelocityYEach(0);
     ExcitedGroup.setLifetimeEach(-1);
     ExcitedGroup.setVelocityYEach(0);
    AngryGroup.setLifetimeEach(-1);
     AngryGroup.setVelocityYEach(0);

     gameOver.visible=true;
     Restart.visible=true;
     if(mousePressedOver(Restart)){
      reset();

     }
 }

    drawSprites();
    showscore();
}
function reset(){
    gameState="PLAY";
    ObstaclesGroup.destroyEach();
    HappyGroup.destroyEach();
    CryGroup.destroyEach();
    AngryGroup.destroyEach();
    ExcitedGroup.destroyEach();
    score=0;
    life=3;
    gameOver.visible=false;
Restart.visible=false;
}
function showscore(){
    textSize(30);
    fill(0);
    text("score:",score,displayWidth-400,50); 
    text("lives:",score,displayWidth-400,100); 
}
function spawnEmotionsHappy(){
    if(World.frameCount%180===0){
        happy=createSprite(0,-20,50,50);
       HappyGroup.add(happy);
       happy.debug=true;
        var r=Math.round(random(50,width));
        console.log(r);
        happy.x=r;
        happy.addImage(happy_img);
        happy.scale=0.3;
        happy.velocityY=3;
    }
}
function spawnEmotionsCry(){
    if(World.frameCount%320===0){
      
        cry=createSprite(0,0,50,50);
        CryGroup.add(cry);
        cry.debug=true;
        var r=Math.round(random(20,width));
        console.log(r);
        cry.x=r;
        cry.addImage(cry_img);
        cry.scale=0.5;
        cry.velocityY=3;
    }
}

function spawnEmotionsAngry(){
    if(World.frameCount%220===0){
        angry=createSprite(0,0,50,50);
        AngryGroup.add(angry);
        angry.debug=true;
        var r=Math.round(random(30,width));
        console.log(r);
        angry.x=r;
        angry.addImage(angry_img);
        angry.scale=0.3;
        angry.velocityY=3;
    }
}
function spawnEmotionsExcited(){
    if(World.frameCount%160===0){
        excited=createSprite(0,0,50,50);
      ExcitedGroup.add(excited);
      excited.debug=true;
        var r=Math.round(random(30,width));
        console.log(r);
        excited.x=r;
        excited.addImage(excited_img);
        excited.scale=0.3;
        excited.velocityY=3;
    }
}

function spawnObstacles(){
    if(World.frameCount%140===0){
   
 obstacle=createSprite(0,-50,100,20);
 obstacle.debug=true;

 obstacle.x=Math.round(random(50,width-50));
 ObstaclesGroup.add(obstacle);
 obstacle.width=Math.round(random(600,1200));
 //obstacle.height=Math.round(random(20,200));
 var p=Math.round(random(0,255));
 var q=Math.round(random(0,255));
 var r=Math.round(random(0,255));

 obstacle.shapeColor=rgb(p,q,r);
 obstacle.velocityY=4;
 obstacle.lifetime=300;
    }
}
