  var jetpackperson,jetpackimage;
  var backgrounds,backgroundimage,bg1_img,bg2_img,bg3_img;
  var coin,coinsimage;
  var rocket,rocketimage,rsign,rsignimage;
  var zapper1image,zapper2image,zapper3image;
  var grnd,gameState="play";
  var score = 0;
  var z1Grp,z2Grp,z3Grp;
  var reset, rImage;
  var topB,sp;

function preload()
{
  backgroundimage= loadImage("background.png");
  jetpackimage = loadImage("person.png");
  zapper1image= loadImage("zapper1.png");
  zapper2image = loadImage("zapper2.png");
  zapper3image = loadImage("zapper3.png")
  coinsimage = loadImage("coin.png");
  rImage=loadAnimation("restart.gif");
  bg1_img = loadAnimation("bg1.jpg");
  bg2_img = loadAnimation("bg2.jpg");
  bg3_img = loadAnimation("bg3.jpg");
}

function setup()
{
  createCanvas(windowWidth,windowHeight);
  
  backgrounds =createSprite(windowWidth/2,windowHeight/2);
  backgrounds.addAnimation("bg",backgroundimage);
  backgrounds.addAnimation("bg1",bg1_img);
  backgrounds.addAnimation("bg2",bg2_img);
  backgrounds.addAnimation("bg3",bg3_img);

  
  jetpackperson =createSprite(windowWidth/2-420,windowHeight/2);
  jetpackperson.addImage(jetpackimage);
  jetpackperson.scale=0.4;
  //jetpackperson.debug=true;
  
  jetpackperson.setCollider('circle',0,0,70);
  grnd = createSprite(windowWidth/2,windowHeight/2+250,windowWidth,5);
  grnd.visible = false;
 
  
  coin=createSprite(Math.round(random(windowWidth/2+100,windowWidth/2+250)),Math.round(random(windowHeight/2,windowHeight/2+100)));
  coin.addImage(coinsimage);
  coin.scale=0.3;
  
  coin.visible=false;
  z1Grp = new Group();
  z2Grp = new Group();
  z3Grp = new Group();
  topB = createSprite(windowWidth/2,2,windowWidth,5);
  topB.visible = false;
  sp = createSprite(650,350);
  sp.addAnimation("bharat",rImage)
  sp.visible = false;
  
 }

function draw() {
  
  if(gameState==="play")
    {
      
    if(keyDown("space"))
     {
      flag = true;
      jetpackperson.velocityY = -13;
             
     }
      
    jetpackperson.velocityY = jetpackperson.velocityY+1;
  
    if(frameCount%2===0)
       score = score+1;
      
      if(score>500 && score<600)
        {
        coin.velocityX=-11;
        coin.visible=true;
        }
      if(jetpackperson.isTouching(coin))
        {
       score=score+10;
        }
    if(score===300)
    backgrounds.changeAnimation("bg1",bg1_img);
  
    if(score===580)
    backgrounds.changeAnimation("bg2",bg2_img);
  
    if(score===740)
    backgrounds.changeAnimation("bg3",bg3_img);
  
    if(score===880)
    backgrounds.changeAnimation("bg1",bg1_img);
  
    if(score===1000)
    backgrounds.changeAnimation("bg2",bg2_img);
  
    if(score===1190)
    backgrounds.changeAnimation("bg3",bg3_img);
    backgrounds.velocityX = -4;
  
    if(backgrounds.x < 100)
      backgrounds.x =  backgrounds.width/2; 
  
    zapper1();
    zapper2();
    zapper3();
      
    if(z1Grp.isTouching(jetpackperson))
      gameState = "end";
      
      if(z2Grp.isTouching(jetpackperson))
      gameState = "end";
      
      if(z3Grp.isTouching(jetpackperson))
      gameState = "end";
      
     
      
     jetpackperson.bounceOff(topB); 
      
   }
  
   else if(gameState === "end")
    {
      
      backgrounds.velocityX = 0;
      z1Grp.setVelocityXEach(0);
      z1Grp.setLifetimeEach(-1);
      z2Grp.setVelocityXEach(0);
      z2Grp.setLifetimeEach(-1);
      z3Grp.setVelocityXEach(0);
      z3Grp.setLifetimeEach(-1);
      jetpackperson.velocityY = 0;
      
      
      sp.scale=0.3;
      sp.visible=true;
      
      if(mousePressedOver(sp))
        {
          gameState = "play";
          z1Grp.destroyEach();
          z2Grp.destroyEach();
          z3Grp.destroyEach();
          z1Grp.setLifetimeEach(-1);
          z2Grp.setLifetimeEach(-1);
          z3Grp.setLifetimeEach(-1);
         sp.visible=false;
         score = 0;
        }
     
    }
  
  jetpackperson.collide(grnd);
  drawSprites();
  textSize(60);
  stroke("red");
  if(score<30)
  text("collect a coin for a 100 m boost",windowWidth/2-150,windowHeight/2)
 
  stroke("red");
  textFont('inconsolata');
  textSize(30);
  text(score,windowWidth-100,windowHeight-450);
}

function zapper1()
{
  if(frameCount%100 === 0)
    {
      var zapper1 = createSprite(windowWidth,Math.round(random(windowHeight-300,windowHeight-150)));
      zapper1.addImage(zapper1image);
      //zapper1.debug = true;
      zapper1.setCollider("rectangle",-20,20,20,190); 
      zapper1.scale=0.9;
      zapper1.velocityX = -20;
      zapper1.lifetime = windowWidth/20;
      z1Grp.add(zapper1);
      zapper1.depth=sp.depth;
      sp.depth=sp.depth+1;
    }  
}

function zapper2()
{
  if(frameCount%150 === 0)
    {
      var zapper2 = createSprite(windowWidth,Math.round(random(windowHeight-400,windowHeight-100)));
      zapper2.addImage(zapper2image);
      zapper2.setCollider("rectangle",-1,-20,170,10);
     //zapper2.debug = true;
      zapper2.scale=0.9;
      zapper2.velocityX = -25;
      zapper2.lifetime = windowWidth/25;
      z2Grp.add(zapper2);
       zapper2.depth=sp.depth;
      sp.depth=sp.depth+1;
    }  
}
function zapper3()
{
  if(frameCount%200 === 0)
    {
      var zapper3 = createSprite(windowWidth,Math.round(random(windowHeight-550,windowHeight-300)));
      zapper3.addImage(zapper3image);
      zapper3.setCollider("rectangle",-1,-20,170,10);
      //zapper2.debug = true;
      zapper3.scale=0.3;
      zapper3.velocityX = -25;
      zapper3.lifetime = windowWidth/25;
      z3Grp.add(zapper3);
       zapper3.depth=sp.depth;
      sp.depth=sp.depth+1;
    }  
}

