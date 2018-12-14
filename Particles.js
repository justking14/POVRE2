
function Particle76(){
    this.sizeX = Math.random()*(Stage.h/10);
    this.sizeY = Math.random()*(Stage.h/10);

    this.velocity = {x:0, y:0};
    this.position = {x:0, y:0};

    this.toExplode = true;
    this.exploded = false;
    this.fade = false;
    this.alpha = 1.0;
    this.explodeHeight = 0.5//0.4 + Math.random()*0.5;
    this.prevPos = []
    this.updateCount = 0
this.color = getRandomColor()


this.setPosition = function(pos){
    this.position = pos;
}
this.setVelocity = function(vel){
    this.velocity = vel;
}
this.update = function(){
    this.updateCount++
    if(this.updateCount === 10){
        this.prevPos.push({x:this.position.x, y: this.position.y})
        this.updateCount = 0
    }
    this.position.x+=this.velocity.x;
    this.position.y+=this.velocity.y;

    if(this.toExplode === false){
    this.velocity.y += gravity;
    }

    if(this.fade){
        this.alpha-=0.01;
        if(this.alpha < 0){
            this.alpha = 0
        }
        this.sizeX*=0.99;
    }
}
this.draw = function(ctx){
    ctx.globalAlpha = this.alpha
    ctx.fillStyle = "white"
    ctx.fillRect(this.position.x, this.position.y, this.sizeX, this.sizeX)


    for(var i = 0; i < this.prevPos.length; i++){
        ctx.fillStyle =  this.color
        ctx.fillRect(this.prevPos[i].x, this.prevPos[i].y, this.sizeX, this.sizeX)
    }
}
}

function explode(part){
    console.log("boom")
    const steps = 8 + Math.round(Math.random()*6);;
    const radius = 2 + Math.random()*4;;
    for (var i = 0; i < steps; i++) {
        // get velocity
        var x = radius * Math.cos(2 * Math.PI * i / steps);
        var y = radius * Math.sin(2 * Math.PI * i / steps);
        // add particle
        var particle = new Particle76();
        particle.fade = true;
        particle.toExplode = false;
        particle.color = part.color
        particle.fade = true

        particle.position.x = part.position.x;
        particle.position.y = part.position.y;

        particle.sizeX = part.sizeX

        particle.setVelocity({x: x, y: y});
        particles.push(particle);
    }
}


function launchParticle(){
    var particle = new Particle76()

    particle.setPosition({x: (Math.random()*(Stage.w * 0.5)) + Stage.w/4, y: Stage.h});
    particle.setVelocity({x: -1.5 + Math.random()*3, y: -1.9 + Math.random()*-1});

    //particle.setVelocity({x: 0.0, y: -0.16})
    particles.push(particle)

    //setTimeout(launchParticle, 2000+Math.random()*6000);
}

function updateParticles(){
    var arCount = 0;
    for (var i = 0; i < particles.length - arCount; i++) {
        particles[i].update();
        if(particles[i].toExplode === true && particles[i].exploded === false){
            if(particles[i].position.y < particles[i].explodeHeight * Stage.h){
                particles[i].alpha = 0.0
                particles[i].exploded = true;
                explode(particles[i])
            }
        }
        particles[i].draw(ctx);
        if(particles[i].y > Stage.h + particles[i].sizeX){
        particles[i].prevPos = []
          particles.splice(i, 1)
          arCount++;
        }
    }

}