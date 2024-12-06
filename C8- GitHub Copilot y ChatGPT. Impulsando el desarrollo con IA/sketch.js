/* let x = 400;
let y = 200;

let vx = 5;
let vy = 5;

const diameter = 50;

function setup() {
    createCanvas(800, 400);
}

function draw() {
    background(0);
    circle(x, y, diameter);

    x = x + vx;
    y = y + vy;


    if (x > width - diameter / 2 || x < diameter / 2) {
        x = 400;
        y = 200;
    } 
    if (y > height - diameter / 2 || y < diameter / 2) {
        vy = vy * -1;
    }
} */

let imagenPelota;
let imagenRaqueta;
let imagenComputadora;
let imagenFondo;
let sonidoColision;
let sonidoPunto;

let puntoJugador = 0;
let puntoComputadora = 0;
    

class Pelota {
    constructor(x, y, v, diameter) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.v = v;
        this.vx = this.v * (Math.random() < 0.5 ? -1 : 1); 
        this.vy = this.v * (Math.random() < 0.5 ? -1 : 1); 
        this.reset();
        this.rotation = 0;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Calcular la velocidad angular en función de la velocidad lineal
        let velocidadAngular = this.vx / this.diameter; // ajusta el divisor para controlar la velocidad de rotación

        // Actualizar la rotación en cada fotorama
        this.rotation += velocidadAngular;

        if (this.x > width - this.diameter / 2 || this.x < this.diameter / 2) {
            sonidoPunto.play(); //para que se reproduzca el sonido correspondiente al marcarse un punto

            if (this.x < width / 2) {
                puntoComputadora++;
            } else {
                puntoJugador++;
            }

            narrarPuntos();
            this.reset();
        }
        if (this.y > height - this.diameter / 2 || this.y < this.diameter / 2) {
            this.vy *= -1;
            this.rotation += this.vx + this.vy;
        }
        if (colision(this.x, this.y, this.diameter, raqueta.x, raqueta.y, raqueta.width, raqueta.height) || 
            colision(this.x, this.y, this.diameter, computadora.x, computadora.y, computadora.width, computadora.height)){
            sonidoColision.play() // para que se reproduzca el sonido correspondiente cuando haya una colisión con las raquetas
            this.vx *= -1;
            this.vx *= 1.1;
            this.vy *= 1.1;
            this.rotation += this.vx + this.vy; // actualiza la rotación en el rebote después de la colisión con las raquetas.
        }
    }
    

/*
        // si colisiona con la raqueta del jugador 
        if (this.x - this.diameter / 2 < raqueta.x + raqueta.width && this.y > raqueta.y && this.y < raqueta.y + raqueta.height){
            this.vx *= -1 
            // aumenta la velocidad de la pelota en un 10% con cada colisión
            this.v *= 1.1; 
        }

        // si colisiona con la raqueta de la computadora
        if (this.x + this.diameter / 2 > computadora.x && this.y > computadora.y && this.y < computadora.y + computadora.height){
            this.vx *= -1
            this.v *= 1.1;
        }
*/          
        // si colisiona con la raquta del jugador o la computadora, invierte el sentido de la pelota y aumenta su velocidad en 10%
        

    reset() {
        this.x = 400;
        this.y = 200;
        this.vx = 5 * (Math.random() < 0.5 ? -1 : 1); // Si Math.random nos devuelve un valor entre 0 y 1, es menor que 0.5, que sea -1, de lo contrario que sea 1 
        this.vy = 5 * (Math.random() < 0.5 ? -1 : 1); //y lo multiplicará por la "vx", así, el sentido de la pelota será aleatorio en función del valor que nos retorne la función  */

        //Aumentar la rotación de la pelota con la velocidad en el eje x y la vlocidad en el eje y
        // this.rotation += this.vx + this.vy; Esta línea no es necesaria ya que actualicé la rotación en "update()"
    }

    draw() {
        //circle (this.x, this.y, this.diameter);
        //rotaciona la pelota antes de dibujarla
        push();
        translate(this.x, this.y);
        rotate(this.rotation);
        image(imagenPelota, -this.diameter / 2, -this.diameter / 2, this.diameter, this.diameter);
        pop();
    
        //image(imagenPelota, this.x - this.diameter / 2, this.y - this.diameter / 2, this.diameter, this.diameter); // esta función muestra la pelota como imagen y no como dibujo
    
    }
}

class raquetaIzq {
    constructor(x, y, width, height, speed){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    update(){
        //para mover la raqueta con el mouse hacia arriba y hacia abajo -> "this.y = mouseY - this.height / 2; "
        // para que solo se mueva con el mouse la raqueta izquierda y que la de la computadora se mueva en función al movimiento de la pelota
        if(this.x < width / 2){
            this.y = mouseY;
        } else { //raqueta de la computadora se mueva siguiendo la pelota
            if(pelota.y > this.y){
                this.y += this.speed;
            } else {
                this.y -= this.speed;
            }
        }
        if (colision(this.x, this.y, this.diameter, raqueta.x, raqueta.y, raqueta.width, raqueta.height) || colision(this.x, this.y, this.diameter, computadora.x, computadora.y, computadora.width, computadora.height)) {
            this.vx *= -1;
            this.vx *= 1.1;
            this.vy *= 1.1;
            this.rotation += this.vx + this.vy; // Actualizar la rotación aquí
        }
      

        //limita el movimiento de la raqueta para que no se salga de la pantalla ->
        this.y = constrain(this.y, 0, height - this.height); 
    }

    draw(){
        //rect(this.x, this.y, this.width, this.height);
        if (this.x < width / 2) {
            image(imagenRaqueta, this.x, this.y, this.width, this.height);
        } else {
            image(imagenComputadora, this.x, this.y, this.width, this.height);
        }
    }
}

let pelota;
let raqueta;
let computadora; 

//verificar la colisión entre la circunferencia y el rectángulo
//circunferencia cx, cy, diámetro
//rectángulo rx, ry, width, height
function colision(cx, cy, diameter, rx, ry, rw, rh){
    if (cx + diameter / 2 < rx || cx - diameter / 2 > rx + rw){ //la pelota está a la izquierda || derecha del rectángulo
        return false;
    }

    if (cy + diameter / 2 < ry || cy - diameter / 2 > ry + rh){ //La pelota está abajo || arriba del rectángulo
        return false;
    }
    return true;
}

function preload(){
    imagenPelota = loadImage('assets/pelota.png');
    imagenRaqueta = loadImage('assets/raqueta1.png');
    imagenComputadora = loadImage('assets/raqueta2.png');
    imagenFondo = loadImage('assets/fondo2.png');
    sonidoColision = loadSound('sounds/colisionRaqueta.wav');
    sonidoPunto = loadSound('sounds/marcadoPunto.wav');
}


function setup() {
    createCanvas(800, 400);
    pelota = new Pelota(400, 200, 50, 30);
    raqueta = new raquetaIzq(20, 150, 20, 100, 5);
    computadora = new raquetaIzq(760, 150, 20, 100, 5);
}

function narrarPuntos() {
    // narra los puntos utilizando la API spechapi, narra utilizando español latino 
    let puntos = "Humano" + puntoJugador + "Computadora" + puntoComputadora; // Se crea una variable "puntos" que trae los puntos del jugador y los de la computadora. Están como variables globales
    let mensaje = new SpeechSynthesisUtterance(puntos); //Se crea un objeto utilizando el SpeechSynthesis que es la API
    mensaje.lang = 'es-LA'; // Español latino
    speechSynthesis.speak(mensaje); //Es lo que va a narrar

}

function draw() {
    //background(0); para un fondo negro
    image(imagenFondo, 0, 0, width, height);
    pelota.update();
    pelota.draw();
    raqueta.update();
    raqueta.draw();
    computadora.update();
    computadora.draw();

    
}