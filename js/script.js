const $ = (tag) => document.querySelector(tag);

const cnv = $('canvas');
cnv.width = innerWidth;
cnv.height = innerHeight;

const ctx = cnv.getContext('2d');

const player = new Player(cnv.width/2, cnv.height/2, 30, '#48FCFF');

let projectiles = [];
const shootingSpeed = 4;

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


    checkProjectiles();
    player.update();
}


/* Projeteis */
function checkProjectiles(){
    for(let i = projectiles.length - 1; i >= 0; i--){
        const p = projectiles[i];
        p.update();
        checkOffScreen(p, i);
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

loop();




























