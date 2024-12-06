let x = 400; // posición inicial eje x
let y = 200; // posición inicial eje y

// Crea variables de velocidad de la pelota
const vx = 5; // velocidad constante en el eje x
const vy = 5; // velocidad constante en el eje y

const diameter = 50; // diámetro de la pelota es constante

//función setup del p5.js 
function setup() {
    createCanvas(800, 400);
}

//función draw del p5.js
function draw() {
    background(0); // para que cada que se llame a la función "draw" se reinicie el background.
    //dibujar la peloa del juego usando la función circle de p5.js
    circle(x, y, 50);
    //mueve la pelota en la dirección de las velocidades
    x = x + vx;
    y = y + vy;  // Estas funciones se suman cada q se llama a la función "draw"

    const radius = diameter / 2; // radio de la pelota es constante dentro del contexto de la función "draw()"

    //Si la pelota llega a los bordes de la pantalla, cambia la dirección
    if (x > width - radius || x < radius) {
        x = constrain(x, radius, width - radius); // evitará que salga de los bordes horizontales
        vx = vx * -1; // cambia la dirección de la velocidad en x (es decir horizontalmente)
        }
    if (y > height - radius || y < radius) {
        y = constrain(y, radius, height - radius); // evitará que salga de los bordes verticales 
        vy = vy * -1; // cambia la dirección de la velocidad en y (es decir, verticalmente)
    }
}