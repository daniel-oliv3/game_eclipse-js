const $ = (tag) => document.querySelector(tag);

const cnv = $('canvas');
    cnv.width = innerWidth;
    cnv.height = innerHeight;
const ctx = cnv.getContext('2d');
const player = new Player(cnv.width/2, cnv.height/2, 30, '#48FCFF');
const shootingSpeed = 4;

let projectiles = [];
let enemies = [];
let particles = [];
let intervalID;


function spawnEnemies(){
    intervalID = setInterval(() => {
        const radius = Math.floor(Math.random() * 26) + 5;

        let posX, posY;
        if(Math.random() < .5){
            posX = Math.random() < .5 ? 0 - radius : cnv.width + radius;
            posY = Math.random() * cnv.height;
        }else {
            posX = Math.random() * cnv.width;
            posY = Math.random() < .5 ? 0 - radius : cnv.height + radius;
        }

        const angle = Math.atan2(player.y - posY, player.x - posX);
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

        const color = 'hsl('+ Math.random() * 360 +', 50%, 50%)'; //cores dos inimigos,

        enemies.push(new Enemy(posX, posY, radius, color, velocity));
    }, 1500);
}


cnv.addEventListener('click', (e) =>{
    e.preventDefault();
    const angle = Math.atan2(e.clientY - player.y, e.clientX - player.x);
    const velocity = {
        x: Math.cos(angle) * shootingSpeed,
        y: Math.sin(angle) * shootingSpeed
    }

    projectiles.push(new Projectile(player.x, player.y, 3, '#48FCFF', velocity));
});


/* Funções */
function loop(){
    requestAnimationFrame(loop, cnv);
    update();
}


/* Update */
function update(){
    ctx.fillStyle = 'rgba(0, 0, 0, .1)';
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    checkEnemies();
    checkProjectiles();
    checkParticles();
    player.update();
}


/* - */
function checkEnemies(){
    enemies.forEach((enemy) => {
        enemy.update();

        const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        if(distance < player.radius + enemy.radius){
            alert('Game Over');
        }
    });
}


/* Projeteis */
function checkProjectiles(){
    for(let i = projectiles.length -1; i >= 0; i--){
        const p = projectiles[i];
        p.update();
        checkOffScreen(p, i);

        for(let eIndex = enemies.length -1; eIndex >= 0; eIndex--){
            const enemy = enemies[eIndex];
            const distance = Math.hypot(p.x - enemy.x, p.y - enemy.y);

            /* Colisçao do projetil com o inimigo */
            if(distance < p.radius + enemy.radius){ 
                enemies.splice(eIndex, 1);
                projectiles.splice(i, 1);
                createParticles(enemy, p);
            }
        }
    }
}


/* Eliminando os projeteis */
function checkOffScreen(projectile, index){
    if( projectile.x + projectile.radius < 0 || 
        projectile.x - projectile.radius > cnv.width ||
        projectile.y + projectile.radius < 0 ||
        projectile.y - projectile.radius > cnv.height){
            projectiles.splice(index, 1);
        }
}


/* Função que cria as particulas */
function createParticles(enemy, projectile){
    for(let i = 0; i < enemy.radius*2; i++){
        const velocity = {
            x: (Math.random() - .5) * (Math.random() * 6),
            y: (Math.random() - .5) * (Math.random() * 6)
        }

        particles.push(new Particle(projectile.x, projectile.y, Math.random()*2, enemy.color, velocity));
    }
}

/* -  */
function checkParticles(){
    for(let i = particles.length -1; i >= 0; i--){
        const p = particles[i];
        p.update();
        if(p.alpha <= 0){
            particles.splice(i, 1);
        }
    }
}





loop();
spawnEnemies();



























