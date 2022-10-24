// import O_json_to_html from "https://unpkg.com/o_json_to_html@1.0.6/o_json_to_html.module.js"

// // import { O_image } from "./O_image.module.js"
// // import { O_image_mask }  from "./O_image_mask.module.js"

//  //development mode vue
//  // import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js'
//  //production mode vue 
//  import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.min.js'
import {f_a_o_object_2d__wall} from  "./f_a_o_object_2d__wall.module.js";

import {o_n_keycode} from "./o_n_keycode.module.js"

document.body.style.margin = "0";
document.body.style.padding = "0";
document.body.style.overflow = "hidden";

var o_canvas = document.createElement("canvas");
document.body.appendChild(o_canvas);

class O_object_2d{
    constructor(
        n_x, 
        n_y,
        s_color_rgba,
        f_render_function,
        s_name, 
    ){
        this.n_x = n_x; 
        this.n_x_initial = n_x; 
        this.n_y = n_y;
        this.n_y_initial = n_y;
        this.s_color_rgba = s_color_rgba
        this.f_render_function = (f_render_function) ? f_render_function : null;
        this.s_name = (s_name) ? s_name : ""

    }
}
var f_render_function__random_color = function(){
    this.s_color_rgba = 
        `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, ${Math.random()})`
}
var a_o_object_2d = [];

var n_scale_x = 32;
var n_scale_y = 20;

o_canvas.width = n_scale_x;
o_canvas.height = n_scale_y;

o_canvas.style.width = "100%";
o_canvas.style.height = "100%";
o_canvas.style.imageRendering = "pixelated";

var o_ctx = o_canvas.getContext("2d");

var n_keycode_max = 255;
// the below would save some bits... but is unconvinient as hell
// var a_n_keycode_keydown = Uint8Array(n_keycode_max/8);
// window.onkeydown = function(){
//     var n_index_byte = parseInt(window.event.keyCode / 8);
//     var n_index_bit = window.event.keycode % 8;
//     a_n_keycode_keydown[n_index_byte] = a_n_keycode_keydown[n_index_byte] | Math.pow(2, n_index_bit);
// }
// window.onkeyup = function(){
//     var n_index_byte = parseInt(window.event.keyCode / 8);
//     var n_index_bit = window.event.keycode % 8;
//     var n_mask = 0 | Math.pow(2, n_index_bit);
//     a_n_keycode_keydown[n_index_byte] = a_n_keycode_keydown[n_index_byte] & n_mask;
// }

var a_n_keycode_keydown = new Uint8Array(n_keycode_max);
window.onkeydown = function(){
    a_n_keycode_keydown[window.event.keyCode] = 1;

}
window.onkeyup = function(){
    a_n_keycode_keydown[window.event.keyCode] = 0;
}

var f_noise_demo = function(){
    
    var n = 0; 
    while(n < n_scale_x * n_scale_y){
        a_o_object_2d.push(
            new O_object_2d(
                n%n_scale_x, 
                parseInt(n/n_scale_x), 
                "rgba(122, 122, 0, 0.9)",
                f_render_function__random_color,
                "test"
            )
        )
        n+=1;
    }
}
var f_player_demo = function(){
    var o_object_2d__player = new O_object_2d(
        parseInt(Math.random() * n_scale_x), 
        parseInt(Math.random() * n_scale_y),
        "rgba(0,255,0,1)",
        function(){
            var n_x = this.n_x;
            var n_y = this.n_y;
            if(
                a_n_keycode_keydown_game[o_n_keycode.arrow_left] == 1
                &&
                a_n_keycode_keydown_game_lastframe[o_n_keycode.arrow_left] == 0
            ){
                console.log('asdf')
                var n_x = parseInt(this.n_x - 1)
                var n_y = parseInt(this.n_y - 0)
            }
            if(
                a_n_keycode_keydown_game[o_n_keycode.arrow_right] == 1
                &&
                a_n_keycode_keydown_game_lastframe[o_n_keycode.arrow_right] == 0
            ){
                var n_x = parseInt(this.n_x + 1)
                var n_y = parseInt(this.n_y + 0)
            }
            if(
                a_n_keycode_keydown_game[o_n_keycode.arrow_up] == 1
                &&
                a_n_keycode_keydown_game_lastframe[o_n_keycode.arrow_up] == 0
            ){
                var n_x = parseInt(this.n_x - 0)
                var n_y = parseInt(this.n_y - 1)
            }
            if(
                a_n_keycode_keydown_game[o_n_keycode.arrow_down] == 1
                &&
                a_n_keycode_keydown_game_lastframe[o_n_keycode.arrow_down] == 0
            ){
                var n_x = parseInt(this.n_x + 0)
                var n_y = parseInt(this.n_y + 1)
            }
            if(
                n_x != this.n_x
                ||
                n_y != this.n_y
            ){

                if(
                    a_o_object_2d.filter(
                        o=>
                            parseInt(o.n_x) == n_x
                            &&
                            parseInt(o.n_y) == n_y                
                        ).length == 0
                ){
                    this.n_x = n_x
                    this.n_y = n_y
                }
                console.log(this.n_x_initial)

            }

            
        }, 
        "player"
    )

    while(
        a_o_object_2d.filter(
            o=>
                parseInt(o.n_x) == parseInt(o_object_2d__player.n_x)
                &&
                parseInt(o.n_y) == parseInt(o_object_2d__player.n_y)                
            ).length > 0
        ){
            o_object_2d__player.n_x = parseInt(Math.random() * n_scale_x)   
            o_object_2d__player.n_y = parseInt(Math.random() * n_scale_y)   
    }

    a_o_object_2d.push(o_object_2d__player);
}
var n_ts_ms_now = window.performance.now();
var n_ts_ms_last = window.performance.now();
var n_ts_ms_delta = window.performance.now();
var n_fps = 0;
var s_color_rgba__clear = "rgba(0,0,0,1)";

function f_a_uint8_array_clone(
    a_n_u8_src
)  {
    var a_n_u8_dst = new ArrayBuffer(a_n_u8_src.byteLength);
    a_n_u8_dst = new Uint8Array(a_n_u8_dst);
    a_n_u8_dst.set(new Uint8Array(a_n_u8_src));
    return a_n_u8_dst;
}

var a_n_keycode_keydown_game = f_a_uint8_array_clone(a_n_keycode_keydown)
var a_n_keycode_keydown_game_lastframe = f_a_uint8_array_clone(a_n_keycode_keydown)

var f_render = function(){
    
    //copy/clone the array
    a_n_keycode_keydown_game = f_a_uint8_array_clone(a_n_keycode_keydown);

    n_ts_ms_now = window.performance.now();
    n_ts_ms_delta = n_ts_ms_now - n_ts_ms_last;

    

    o_ctx.fillStyle = s_color_rgba__clear
    o_ctx.fillRect(0,0,n_scale_x,n_scale_y);

    let n_index_a_o_object_2d = 0;
    while(n_index_a_o_object_2d < a_o_object_2d.length){
        let o_object_2d = a_o_object_2d[n_index_a_o_object_2d];
        if(o_object_2d.f_render_function){
            o_object_2d.f_render_function();
        }
        o_ctx.fillStyle = o_object_2d.s_color_rgba
        o_ctx.fillRect(
            o_object_2d.n_x,
            o_object_2d.n_y,
            1, 
            1,
        )
        // console.log(o_object_2d);
        n_index_a_o_object_2d+=1;
    }



    n_fps = 1000.0 / n_ts_ms_delta;
    // o_ctx.font = '10px sans';
    // o_ctx.fillText(`FPS:${n_fps}`, 1, 1);
    console.log(`FPS:${n_fps}`)
    
    n_ts_ms_last = n_ts_ms_now;
    a_n_keycode_keydown_game_lastframe = a_n_keycode_keydown_game
}
var f_render_recursive = function(){
    n_id_animation = window.requestAnimationFrame(f_render_recursive);
    f_render();// if we render after requestAnimationFrame it should be slightly faster according to some post in internet
}



var a_o_object_2d__wall = await f_a_o_object_2d__wall()
let n_index = 0
for(var o_object_2d of a_o_object_2d__wall){
    n_index+=1//that wont work
    o_object_2d.f_render_function = function(){
        // this.s_color_rgba = `rgba(${Math.random()*255},0,0,1)` // random
        // this.s_color_rgba = `rgba(${Math.sin(n_id_animation*0.01+this.n_x+this.n_y*0.1)*(255/2)+(255/2)},0,0,1)` // psychedelic
        var o_object_2d__player = a_o_object_2d.filter(o=>o.s_name == "player")[0];
        if(o_object_2d__player){

            var n_delta_x = this.n_x - o_object_2d__player.n_x;
            var n_delta_y = this.n_y - o_object_2d__player.n_y;
            var n_distance_to_player = Math.sqrt(n_delta_x**2 + n_delta_y**2);
            var n_distance_to_player_normalized = n_distance_to_player / 3;
            var n_u8_color_value = (255-n_distance_to_player_normalized*255) + Math.random()*40*n_distance_to_player_normalized
            this.s_color_rgba = `rgba(${n_u8_color_value},${Math.random()*n_u8_color_value*0.5},0,1)` // psychedelic
        }

    }
}
a_o_object_2d = a_o_object_2d.concat(a_o_object_2d__wall);
f_render()
// console.log(a_o_object_2d)
var n_id_animation = window.requestAnimationFrame(f_render_recursive);

// f_noise_demo();
f_player_demo();

export {O_object_2d}