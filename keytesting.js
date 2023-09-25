'use strict';

/*
keytester

To the extent possible under law, the person who associated CC0 with
keytester has waived all copyright and related or neighboring rights
to keytester.

You should have received a copy of the CC0 legalcode along with this
work.  If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
*/

let game = {}

game.scalefactor = 1;

game.framesrun = 0;
game.fpsarray = [];

game.objects = []

function beep(hz,ms,vol,type){
    let ctx = new AudioContext();
    let osc = ctx.createOscillator();
    let gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = hz;
    osc.type.value = type;
    gain.gain.value = vol;

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + (ms/1000));
}

window.onload = function(){

    console.log("window loaded.");
    document.querySelector("#canvascontainer").innerHTML = "<canvas id = 'htmlcanvas' class = 'maincanvas'>";

    game.c = document.getElementById("htmlcanvas");
    game.ctx = game.c.getContext("2d");

    game.c.width = window.innerWidth;
    game.c.height = window.innerHeight;
    
    game.scalefactor = Math.min((game.c.width)/2500,(game.c.height)/2500);
    

    let ftl = 3; //files to load
    let lf = 0; //loaded files

    let loaded = function(){
        lf++;
        console.log("file loaded!");
        if(lf == ftl){
            inputsetup();
            requestAnimationFrame(newframe);
        }
    }

    game.sampimg = new Image();
    game.sampimg.src = "assets/etc/img.png";
    game.sampimg.onload = loaded;
    game.cursorimg = new Image();
    game.cursorimg.src = "assets/cursors/cursorsmall.png";
    game.cursorimg.onload = loaded;

    game.keyss = {};
    game.keyss.img = new Image(); //key spritesheet
    game.keyss.img.src = "assets/keysNEW/spritesheets/keys-v2.png";
    game.keyss.img.onload = loaded;

    


    //drawImage(img, <s>, <d>)
    //s:source, d: destination
    //<s/d>x <s/d>y <s/d>Width <s/d>Height
    game.ctx.drawScale = function(image,dx,dy,dwidth,dheight){
        if(arguments.length == 5){
            game.ctx.drawImage( image, dx, dy, dwidth * game.scalefactor, dheight * game.scalefactor);
        }else if(arguments.length == 3){
            game.ctx.drawImage( image, dx, dy, image.width * game.scalefactor, image.height * game.scalefactor );
        }
        return;
    }


}


function newframe(ms){
    game.ms = ms;
    game.fpsarray.push(ms)
    if(game.framesrun == 0){
        console.log("Started in "+ms+" milliseconds.");
    }else if(game.framesrun < 5){
        console.log("Frame "+(game.framesrun+1)+": "+ms+" milliseconds.");
    }

    /*
    delayedmouse.x = delayedmouse.x + ((mouse.x)-(delayedmouse.x))/(ms/480);
    delayedmouse.y = delayedmouse.y + ((mouse.y)-(delayedmouse.y))/(ms/480);
    if(Math.abs(delayedmouse.x-mouse.x) < 5 || (delayedmouse.y-mouse.y) < 5 && !delayedmouse.snap)
    {delayedmouse.x = mouse.x;delayedmouse.y = mouse.y;delayedmouse.snap = true;}
    else if(Math.abs(delayedmouse.x-mouse.x) < 20 || (delayedmouse.y-mouse.y) < 20)
    {delayedmouse.snap = false;}
    */

    game.framesrun++;

    game.ctx.fillStyle= "#242424";
    game.ctx.fillRect(0, 0, game.c.width, game.c.height);

    if(window.innerWidth != game.c.width || window.innerHeight != game.c.height){
        game.c.width = window.innerWidth;
        game.c.height = window.innerHeight;
        game.ctx = game.c.getContext("2d");
        game.scalefactor = Math.min((game.c.width)/2500,(game.c.height)/2500)
    }
    if(mouse.down){
        game.c.requestFullscreen();
    }
    
    

    //drawImage(img, <s>, <d>)
    //s:source, d: destination
    //<s/d>x <s/d>y <s/d>Width <s/d>Height

    game.ctx.drawScale(game.keyss,0,((3000-ms*1)%6000)+3000);

    
    for(let i = 0; i > game.objects.length; i++){
        switch(game.objects[i].kind){

            case 0:
                game.ctx.drawImage(game.keyss, 400,0, 400,400, game.objects[i].x,game.objects[i].y, 400*game.scalefactor, 400*game.scalefactor);
                if(!game.objects[i].active){
                    //fill in with not active code
                }
                break;

            default:
                game.ctx.drawImage(game.sampimg,game.objects[i].x,game.objects[i].y);
                break;
        }
    }


    game.ctx.drawScale(game.cursorimg,mouse.x,mouse.y);
    requestAnimationFrame(newframe);
}




let keys = {};
let mouse = {
    "down":false,
    x: 0,
    y: 0
}
let delayedmouse = {
    "down":false,
    x: 0,
    y: 0,
    "snap":false
}

function inputsetup(){

    window.addEventListener('keydown', (e) => {keys[e.code] = true;} );
    window.addEventListener('keyup', (e) => {keys[e.code] = false;} );

    game.c.addEventListener('mousedown', () => {mouse.down = true;} );
    game.c.addEventListener('mouseup', () => {mouse.down = false;} );
    game.c.addEventListener('mousemove', (e) => {mouse.x = e.clientX; mouse.y = e.clientY;} );
}