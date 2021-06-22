const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var line;
var particles;

var count = 0;
var score = 0;

var gameState = "start";

var plinkos = [];
var divisions = [];

var divisionHeight=300;

var particle;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }    
}

function draw() {
  background("black");
 
  Engine.update(engine);

  if(gameState === "end")
   {
     background("black");
     fill("red");
     stroke(2);
     textSize(100);
     text("GAME OVER!", 100, 400);
   }
  
   textSize(20)
  text("Score : " + score, 20, 30);

  fill("white");
  textSize(15);
  text("You have 5 chances to increase your score!",260,20);
  text("Click on the screen to Start.", 300, 40);

  textSize(30);
  stroke(2);
  fill("white");
  text("500", 15, 540);
  text("500", 95, 540);
  text("500", 175, 540);
  text("500", 255, 540);
  text("100", 335, 540);
  text("100", 415, 540);
  text("100", 495, 540);
  text("200", 575, 540);
  text("200", 655, 540);
  text("200", 735, 540);
 
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }

   for (var k = 0; k < divisions.length; k++) {
     
    divisions[k].display();
  }

   if(particle != null)
   {
     particle.display();

     if(particle.body.position.y > 700)
     {
       if(particle.body.position.x < 300)
       {
         score = score + 500;
         particle = null;
         if(count >= 5)
         {
           gameState = "end";
         }
       }

       else if(particle.body.position.x < 600 && particle.body.position.x > 301)
       {
         score = score + 100;
         particle = null;
         if(count >= 5)
         {
           gameState = "end";
         } 
       }

       else if(particle.body.position.x < 900 && particle.body.position.x > 601)
       {
         score = score + 200;
         particle = null;
         if(count >= 5)
         {
           gameState = "end";
         } 
       }
     }
   }
}

function mousePressed()
{
  if(gameState !== "end")
  {
    count++;
    particle = new Particle(mouseX, 10, 10, 10);
  }
}
