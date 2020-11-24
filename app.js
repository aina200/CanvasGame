"use strict"

const canvas = document.getElementById('myCanvas');//recuperer l'id 
let XCanvas = canvas.width; //largeur
let YCanvas = canvas.height;//hauteur
const context = canvas.getContext('2d')//donner le contexte

let timeOutId;
// let img2 = new Image();//ajouter img
// img2.src = "./img/fond.png";//ajouter img


function backgroundImg()//ajouter img de fond
{
	context.beginPath();//commencer le dessin
	context.fillStyle = "black";//definir la couleur du container
	context.fillRect(0,0,XCanvas,YCanvas);//definir les dimensions de fond 
	//0=positionX 0=positionY
	context.closePath();//finir le dessin

    // img2.onload = context.drawImage(img2, 0, 0, 480, 380);//ajouter img
}
//***************************BALL*****************************************

let ballPositionX = 500;//position horizontale du carré
let ballPositionY = 500;//position verticale du carré 
let width = 50;
let height = 50;
let moveX = 3;
let moveY = 3;

//***************************RAQUETTE*****************************************
let rackPositionX = 600;//position x
let rackPositionY = 800;//position y 
let rackWidth = 200;//largeur raquette
let rackHeight = 25;//hauteur raquette
let rightPressed = false;//touche droite pressée
let leftPressed = false;//touche gauche pressée
let moveXRacket = 0;//bouger a droite
let moveXRacketLeft = 0;//bouger a  gauche


//*****************************SCORE****************************
let score = 0;

function drawScore()//dessiner la raquette
{
    context.beginPath();
    context.fillStyle = "red";//defini couleur de la raquette
    context.fillRect(20,20,100,30);
    context.closePath();
}

//*************************REBONDIR LA BALLE**************************************

function boutonAppuyer(e) { // e.keyCode corresponds aux touches convertie en nombres
    if (e.keyCode === 39 || e.keyCode === 68) {//corresponds 39=fleche de droit 68=lettre D
        rightPressed = true;
    } else if (e.keyCode === 37 || e.keyCode === 81) {
        leftPressed = true;
    }
}
document.addEventListener("keydown", boutonAppuyer, false);// bouton appuyer
function boutonRelache(e) {
    if (e.keyCode === 39 || e.keyCode === 68) {
        rightPressed = false;
    }
     if (e.keyCode === 37 || e.keyCode === 81) {
        leftPressed = false;
    }
}
document.addEventListener("keyup", boutonRelache, false); //bouton relaché

function drawSquare()//dessiner le carré
{
	context.beginPath();
	context.fillStyle = "red";//definir la couleur du container
	context.fillRect(ballPositionX ,ballPositionY,width,height);//definir les dimensions de la balle//0=positionX 0=positionY
	context.closePath();
}

function drawRacket()//dessiner la raquette
{
	context.beginPath();
	context.fillStyle = "blue";//defini couleur de la raquette
	context.fillRect(rackPositionX,rackPositionY,rackWidth,rackHeight);
	context.closePath();
}
//******************************BRIQUES****************************
let brickPositionX =[];
let brickPositionY =[];
let brickWidth = 100;
let brickHeight = 30;
let brickLenght = 11;

function drawBrick()//dessiner les briques
{
    context.beginPath();
    context.fillStyle = "blue";//defini couleur de la raquette
    for (let i = 0; i < brickLenght; i++) {

        context.fillRect(brickPositionX[i],brickPositionY[i],brickWidth,brickHeight);
    }
    context.closePath();
}

 for (let i = 0; i < brickLenght; i++) {

    brickPositionX[i] = 20 + (i * (brickWidth+20));
    brickPositionY[i] = 50;
}

function moveBall()//deplace la ball au verticale et horizontal
{
 if (ballPositionX<=0) //si la positionX est <que 0
    {
    	moveX = 3;
    }
    if (ballPositionX>=1250-width) //si la positionX est >que 1250px - la largeur
    {
       moveX = -3;//change de sens
    }
    ballPositionX = ballPositionX+moveX;//deplace le square a l'horizontal


    if (ballPositionY<=0) //si la positionY est < = a 0
     {
     	moveY = 3;//500+3//ajoute 3 px
     }
    if (ballPositionY>=900-height) //si la positionY est >que 1250px - la largeur
    {
       moveY = -3;//change de sens
    }
    ballPositionY = ballPositionY+moveY;//deplace le square au vertical
}
function moveRacket()//deplace la raquette  au verticale et horizontal
{
  if (leftPressed === true) //si la touche gauche est pressée
    {
    	moveXRacketLeft = -10; //-3px
    }
    else if (leftPressed === false)
    {
    	moveXRacketLeft = 0;
    }

    if (rightPressed === true) //si la touche droite est pressée
    {
    	moveXRacket = 10;

    }
    else if (rightPressed === false) 
    {
    	moveXRacket = 0;
    }
      if (rackPositionX === 0) //arreter la raquette coté gauche
    {
        moveXRacketLeft = 0;
    }
      if (rackPositionX === XCanvas-rackWidth) //arreter la raquette coté droit
    {
        moveXRacket = 0;
    }

    rackPositionX = rackPositionX + moveXRacket + moveXRacketLeft ;
}
function zoneVereficate(posX, posY,  taille)
{
    
}
function draw() {//dessin global de la page
    context.clearRect(0, 0, XCanvas, YCanvas);//premiere couche
    backgroundImg();//on dessine d'abord le fond
    drawSquare();//puis le carré 
    moveBall();//appelle la fonction pour bouger le carré
    drawRacket();//dessine la raquette
    moveRacket();//appelle la fonction pour bouger la raquette
    zoneVereficate(ballPositionX, ballPositionY,  width);//appelle la fonction
    drawBrick();
    for (let i = 0; i < brickLenght; i++) {

        if (ballPositionX <= brickPositionX[i] + brickWidth
        && ballPositionX + brickWidth >=brickPositionX[i]
        && ballPositionY <= brickPositionY[i] +brickHeight
        && ballPositionY + brickHeight >=brickPositionY[i])
        {
            
            brickPositionX.splice(i, 1);
            brickPositionY.splice(i, 1);
            score = score+1;

            moveY = 3;
        }
    }
    drawScore()
   
}

function updateChrono()//vitesse d'affichege
{

    timeOutId = setInterval(draw, 1000/60);//cette fonction s'execute 60 par seconde
}

function zoneVereficate(posX, posY,  taille) //verifier si la balle est ds la zone de la raquette
{
        if (rackPositionX <= posX+taille//position gauche
         && rackPositionX + rackWidth >= posX//pos droite
         && rackPositionY <= posY+taille //pos haut
         && rackPositionY+ rackHeight >= posY) //pos bas
        {
        	moveY = -3;
        }
}
updateChrono();