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
    osc.type = type;
    gain.gain.value = vol;

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + (ms/1000));
}


game.keyss = {};
game.keyss.img = new Image();

function newframe(ms){

    game.timeDelta = ms-game.ms;

    game.ms = ms;
    game.fpsarray.push(ms)

    if(game.framesrun == 0){
        console.log("Started in "+ms+" milliseconds.");
        console.log("Initial fluctuation log:")
    }else if(game.framesrun < 10){
        console.log("Frame "+(game.framesrun+1)+": "+ms+" milliseconds. "+Math.round( 1000/(game.timeDelta) *100)/100+" fps.");
    }else if(game.framesrun == 60){
        console.log("60 frames run in "+ms+" milliseconds, about "+ Math.round( 1000/(ms/60) *100)/100 +" fps.")
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

    /*
    if(mouse.down){
        game.c.requestFullscreen();
    }
    */
    
    

    //drawImage(img, <s>, <d>)
    //s:source, d: destination
    //<s/d>x <s/d>y <s/d>Width <s/d>Height

    game.ctx.drawScale(game.keyss.img,0,((3000-ms*1)%6000)+3000);

    
    for(let i = 0; i < game.objects.length; i++){
        switch(game.objects[i].kind){
            case 0:
                if(game.objects[i].extant){
                    game.ctx.drawKeyScale(game.objects[i].keyName,game.objects[i].x,game.objects[i].y)
                    if(!game.objects[i].active || game.objects[i].wasInactive){
                        game.objects[i].inactivityAge++;
                        game.objects[i].y += 0.2 * game.timeDelta
                        game.objects[i].x += Math.random()*2 - 1;
                        game.objects[i].wasInactive = true;
                    }
                }
                break;

            default:
                game.ctx.drawImage(game.sample.img,game.objects[i].x,game.objects[i].y);
                break;
        }
    }



    //remove later
    



    game.ctx.drawScale(game.cursor.img,mouse.x,mouse.y);
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
let gamepads = navigator.getGamepads();

function inputsetup(){

    window.addEventListener('keydown', (e) => {keys[e.code] = true;} );
    window.addEventListener('keyup', (e) => {keys[e.code] = false;} );

    window.addEventListener('gamepadconnected', (e) => {
        console.log("Gamepad "+e.gamepad.index+": "+e.gamepad.id+" connected. It has "+e.gamepad.buttons.length+" buttons and "+e.gamepad.axes.length+" axes.")
        gamepads = navigator.getGamepads();
    });
    window.addEventListener('gamepaddisconnected', (e) => {
        console.log("Gamepad "+e.gamepad.index+": "+e.gamepad.id+" disconnected. It had "+e.gamepad.buttons.length+" buttons and "+e.gamepad.axes.length+" axes.")
        gamepads = navigator.getGamepads();
    });

    game.c.addEventListener('mousedown', () => {mouse.down = true;} );
    game.c.addEventListener('mouseup', () => {mouse.down = false;} );
    game.c.addEventListener('mousemove', (e) => {mouse.x = e.clientX; mouse.y = e.clientY;} );
}