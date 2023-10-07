'use strict';

/*
keytester

To the extent possible under law, the person who associated CC0 with
keytester has waived all copyright and related or neighboring rights
to keytester.

You should have received a copy of the CC0 legalcode along with this
work.  If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
*/

window.onload = function () {

    console.log("window loaded.");
    document.querySelector("#canvascontainer").innerHTML = "<canvas id = 'htmlcanvas' class = 'maincanvas'>";

    game.c = document.getElementById("htmlcanvas");
    game.ctx = game.c.getContext("2d");

    game.c.width = window.innerWidth;
    game.c.height = window.innerHeight;

    game.scalefactor = Math.min((game.c.width) / 2500, (game.c.height) / 2500);


    let ftl = 3; //files to load
    let lf = 0; //loaded files

    let loaded = function () {
        lf++;
        console.log("file loaded!");
        if (lf == ftl) {
            inputsetup();
            requestAnimationFrame(newframe);
        }
    };

    game.sample = {};
    game.sample.img = new Image();
    game.sample.img.src = "assets/etc/img.png";
    game.sample.img.onload = loaded;

    game.cursor = {};
    game.cursor.img = new Image();
    game.cursor.img.src = "assets/cursors/cursorsmall.png";
    game.cursor.img.onload = loaded;

    game.keyss.img.src = "assets/keysNEW/spritesheets/keys-v2.png";
    game.keyss.img.onload = loaded;

    //pasting spritesheet here:

    game.keyss.json = {
        "frames": [
            { "filename": "Tab", "frame": { "x": 0, "y": 0, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "split", "frame": { "x": 401, "y": 0, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Space", "frame": { "x": 802, "y": 0, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Shift", "frame": { "x": 1203, "y": 0, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Semicolon", "frame": { "x": 1604, "y": 0, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Select", "frame": { "x": 2005, "y": 0, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "PrintScreen", "frame": { "x": 2406, "y": 0, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Print", "frame": { "x": 0, "y": 401, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Period", "frame": { "x": 401, "y": 401, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Pause", "frame": { "x": 802, "y": 401, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "PageUp", "frame": { "x": 1203, "y": 401, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "PageDown", "frame": { "x": 1604, "y": 401, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "muhenkan", "frame": { "x": 2005, "y": 401, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Lang2", "frame": { "x": 2406, "y": 401, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Lang1", "frame": { "x": 0, "y": 802, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Insert", "frame": { "x": 401, "y": 802, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Home", "frame": { "x": 802, "y": 802, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "henkan", "frame": { "x": 1203, "y": 802, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Help", "frame": { "x": 1604, "y": 802, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Execute", "frame": { "x": 2005, "y": 802, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Escape", "frame": { "x": 2406, "y": 802, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Enter", "frame": { "x": 0, "y": 1203, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "End", "frame": { "x": 401, "y": 1203, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Digit9", "frame": { "x": 802, "y": 1203, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Digit8", "frame": { "x": 1203, "y": 1203, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Digit7_ALT", "frame": { "x": 1604, "y": 1203, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Digit7", "frame": { "x": 2005, "y": 1203, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Digit6", "frame": { "x": 2406, "y": 1203, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Digit5", "frame": { "x": 0, "y": 1604, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Digit4_ALT", "frame": { "x": 401, "y": 1604, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Digit4", "frame": { "x": 802, "y": 1604, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Digit3", "frame": { "x": 1203, "y": 1604, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Digit2", "frame": { "x": 1604, "y": 1604, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Digit1", "frame": { "x": 2005, "y": 1604, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Digit0", "frame": { "x": 2406, "y": 1604, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Delete", "frame": { "x": 0, "y": 2005, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Dead", "frame": { "x": 401, "y": 2005, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Control", "frame": { "x": 802, "y": 2005, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Clear", "frame": { "x": 1203, "y": 2005, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "CapsLock", "frame": { "x": 1604, "y": 2005, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Cancel", "frame": { "x": 2005, "y": 2005, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "blank", "frame": { "x": 2406, "y": 2005, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Backspace", "frame": { "x": 0, "y": 2406, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Backquote", "frame": { "x": 401, "y": 2406, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "ArrowUp", "frame": { "x": 802, "y": 2406, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "ArrowRight", "frame": { "x": 1203, "y": 2406, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "ArrowLeft", "frame": { "x": 1604, "y": 2406, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "ArrowDown", "frame": { "x": 2005, "y": 2406, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Alt", "frame": { "x": 2406, "y": 2406, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } },
            { "filename": "Background", "frame": { "x": 0, "y": 2807, "w": 400, "h": 400 }, "rotated": "false", "trimmed": "false", "spriteSourceSize": { "x": 0, "y": 0, "w": 400, "h": 400 }, "sourceSize": { "w": 400, "h": 400 } }
        ],
        "meta": {
            "app": "https://github.com/BdR76/GimpSpriteAtlas/",
            "version": "GIMP SpriteAtlas plug-in v0.1",
            "image": "keys-v2.png",
            "size": { "w": 2806, "h": 3207 },
            "scale": 1
        }
    };


    //drawImage(img, <s>, <d>)
    //s:source, d: destination
    //<s/d>x <s/d>y <s/d>Width <s/d>Height
    game.ctx.drawScale = function (image, dx, dy, dwidth, dheight) {
        if (arguments.length == 5) {
            game.ctx.drawImage(image, dx, dy, dwidth * game.scalefactor, dheight * game.scalefactor);
        } else if (arguments.length == 3) {
            game.ctx.drawImage(image, dx, dy, image.width * game.scalefactor, image.height * game.scalefactor);
        }
        return;
    };

    game.ctx.drawKeyScale = function(key,x,y){

        //begin to search the object!
        
    
        var index = 36 // dead key location, change later!!!
        // i know it's not best practice, but this isn't a moon landing sorta thing or anything.
    
    
        //                |    this part's ridiculous   |   (if you don't see it correctly, who reads code in proportional fonts??)
        //                v                             v
        for(let i = 0; i < game.keyss.json.frames.length; i++){
            if(game.keyss.json.frames[i].filename == key){
                index = i;
                break;
            }
        }
    
        game.ctx.drawImage(
    
            game.keyss.img, //the source image
            game.keyss.json.frames[index].frame.x, //getting source x
            game.keyss.json.frames[index].frame.y, //getting source y
            game.keyss.json.frames[index].frame.w, //getting source width
            game.keyss.json.frames[index].frame.h, //getting source height
            x, //the provided x value
            y, //the provided y value
            game.keyss.json.frames[index].frame.w*game.scalefactor, //scaling up the width 
            game.keyss.json.frames[index].frame.h*game.scalefactor //scaling up the height 
        )
    
    }



    setInterval(function(){
        let tempkeyname = ["Tab","split","Space","Shift","Semicolon","Select","PrintScreen","Print","Period","Pause","PageUp","PageDown","muhenkan","Lang2","Lang1","Insert","Home","henkan","Help","Execute","Escape","Enter","End","Digit9","Digit8","Digit7_ALT","Digit7","Digit6","Digit5","Digit4_ALT","Digit4","Digit3","Digit2","Digit1","Digit0","Delete","Dead","Control","Clear","CapsLock","Cancel","blank","Backspace","Backquote","ArrowUp","ArrowRight","ArrowLeft","ArrowDown","Alt","Background"][Math.round(Math.random()*50)]
        game.objects.push(
            {kind:0,extant:true,active:true,wasInactive:true,inactivityAge:0,x:mouse.x-20-Math.random()*20,y:mouse.y-25,keyName:tempkeyname}
        )
    },50)

};
