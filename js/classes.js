class Sprite {
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }


    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

}

class Sphere extends Sprite {
    constructor(x, y, radius, color, angleUpdateValue, player){
        super(x, y, radius, color);
        this.angleUpdateValue = angleUpdateValue;
        this.player = player;
        this.angle = 0;
    }

    update(){
        this.draw();
        this.angle += this.angleUpdateValue;
        if(Math.abs(this.angle) >= Math.PI*2){
            this.angle = 0;
        }

        this.x = this.player.x + Math.cos(this.angle) * this.player.radius;
        this.y = this.player.y + Math.sin(this.angle) * this.player.radius;
    }
}


/* - */
class Player extends Sprite {
    constructor(x, y, radius, color){
        super(x, y, radius, color);
        this.coreRadius = radius/6;
        this.s1 = new Sphere(
            this.x + Math.cos(0) * this.radius,
            this.y + Math.sin(0) * this.radius,
            2,
            '#48FCFF',
            .08,
            this
        )

        this.s2 = new Sphere(
            this.x + Math.cos(0) * this.radius,
            this.y + Math.sin(0) * this.radius,
            2,
            '#48FCFF',
            -.08,
            this
        )
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.coreRadius, 0, Math.PI*2,false);
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }

    update(){
        this.draw();
        this.s1.update();
        this.s2.update();
    }

}