// import O_json_to_html from "https://unpkg.com/o_json_to_html@1.0.6/o_json_to_html.module.js"

// // import { O_image } from "./O_image.module.js"
// // import { O_image_mask }  from "./O_image_mask.module.js"

//  //development mode vue
//  // import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js'
//  //production mode vue 
//  import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.min.js'
import {f_a_o_object_2d__wall_and_path} from  "./f_a_o_object_2d__wall_and_path.module.js";

import { O_object_2d } from "./O_object_2d.module.js";

// import { f_find_path_demo } from "./f_find_path_demo.module.js";
import {o_n_keycode} from "./o_n_keycode.module.js"

document.body.style.margin = "0";
document.body.style.padding = "0";
document.body.style.overflow = "hidden";

var o_canvas = document.createElement("canvas");
var n_x_normalized_mouse = 0;
var n_y_normalized_mouse = 0;

o_canvas.onmousemove = function(){
    var o_bounding_client_rect = document.querySelector("canvas").getBoundingClientRect();
    
    n_x_normalized_mouse = (window.event.clientX  - o_bounding_client_rect.left) / o_bounding_client_rect.width;
    n_y_normalized_mouse = (window.event.clientY  - o_bounding_client_rect.top) / o_bounding_client_rect.height;

    // console.log(n_x_normalized_mouse)
    // const x = e.pageX - e.currentTarget.offsetLeft; 
    // const y = e.pageY - e.currentTarget.offsetTop; 
}
document.body.appendChild(o_canvas);

// class O_game{
//     constructor(
//         n_scale_x, 
//         n_scale_y, 
//         a_o_object_2d,
//     ){

//     }
// }

class O_graph_node{
    constructor(
        o_object_2d, 
        o_graph_node__left,
        o_graph_node__right,
        o_graph_node__up,
        o_graph_node__down,
    ){
        this.o_object_2d = o_object_2d
        this.o_graph_node__left = o_graph_node__left
        this.o_graph_node__right = o_graph_node__right
        this.o_graph_node__up = o_graph_node__up
        this.o_graph_node__down = o_graph_node__down
    }
}
var n_scale_x = 32;
var n_scale_y = 20;
var n_scale_x_canvas = 1920;
var n_scale_y_canvas = 1080;
var n_scale_x_object = n_scale_x_canvas / n_scale_x;
var n_scale_y_object = n_scale_y_canvas / n_scale_y;

var f_render_function__random_color = function(){
    this.s_color_rgba = 
        `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, ${Math.random()})`
}
var a_o_object_2d = [];



o_canvas.width = n_scale_x_canvas;
o_canvas.height = n_scale_y_canvas;

o_canvas.style.width = "100%";
o_canvas.style.height = "100%";
o_canvas.style.imageRendering = "pixelated";

var o_ctx = o_canvas.getContext("2d");

var n_keycode_max = 255;


var a_n_keycode_keydown = new Uint8Array(n_keycode_max);
window.onkeydown = function(){
    a_n_keycode_keydown[window.event.keyCode] = 1;

}
window.onkeyup = function(){
    a_n_keycode_keydown[window.event.keyCode] = 0;
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

    var n_x_mouse_scale = parseInt(n_x_normalized_mouse * n_scale_x_canvas);
    var n_y_mouse_scale = parseInt(n_y_normalized_mouse * n_scale_y_canvas);

    o_ctx.fillStyle = s_color_rgba__clear

    o_ctx.fillRect(
        0,
        0,
        n_scale_x_canvas,
        n_scale_y_canvas
    );

    var n_index_a_o_object_2d = 0;
    
    while(n_index_a_o_object_2d < a_o_object_2d.length){
        let o_object_2d = a_o_object_2d[n_index_a_o_object_2d];

        var n_x_scaled__o_object_2d = o_object_2d.n_x * n_scale_x_object;
        var n_y_scaled__o_object_2d = o_object_2d.n_y * n_scale_y_object;
        var n_scale_x__o_object_2d = n_scale_x_object;
        var n_scale_y__o_object_2d = n_scale_y_object;

        if(
            n_x_mouse_scale == parseInt(n_x_scaled__o_object_2d)
            &&
            n_y_mouse_scale == parseInt(n_y_scaled__o_object_2d)
            ){
                o_object_2d.b_hover_mouse = true
        }else{
            o_object_2d.b_hover_mouse = false
        }

        if(o_object_2d.f_render_function){
            o_object_2d.f_render_function();
        }
        o_ctx.fillStyle = o_object_2d.s_color_rgba
        o_ctx.shadowColor = "black";
        o_ctx.shadowBlur = 2;
        o_ctx.fillRect(
            n_x_scaled__o_object_2d,
            n_y_scaled__o_object_2d,
            n_scale_x__o_object_2d,
            n_scale_y__o_object_2d,
        );
        

        n_index_a_o_object_2d+=1;
    }

    var n_index_a_o_object_2d = 0;
    while(n_index_a_o_object_2d < a_o_object_2d.length){
        let o_object_2d = a_o_object_2d[n_index_a_o_object_2d];
        var n_x_scaled__o_object_2d = o_object_2d.n_x * n_scale_x_object;
        var n_y_scaled__o_object_2d = o_object_2d.n_y * n_scale_y_object;
        o_ctx.shadowColor = "black";
        o_ctx.shadowBlur = 0;
        // var o_object_2d = a_o_object_2d[n_index_a_o_object_2d]
        for(var o_object_2d__line_to of o_object_2d.a_o_object_2d__line_to){
            var n_x_scaled__o_object_2d__line_to = o_object_2d__line_to.n_x * n_scale_x_object;
            var n_y_scaled__o_object_2d__line_to = o_object_2d__line_to.n_y * n_scale_y_object;

            o_ctx.beginPath();
            o_ctx.moveTo(
                n_x_scaled__o_object_2d + (n_scale_x_object /2)+ 20,
                n_y_scaled__o_object_2d + (n_scale_y_object /2)+ 20
            );
            o_ctx.lineTo(
                n_x_scaled__o_object_2d__line_to + (n_scale_x_object /2) ,
                n_y_scaled__o_object_2d__line_to + (n_scale_y_object /2) ,
            );
            o_ctx.closePath()
            o_ctx.strokeStyle = "rgba(33,33,33,0.7)"
            o_ctx.lineWidth = Math.random()*5;
            o_ctx.stroke();
        }

        n_index_a_o_object_2d+=1;

    }

    // n_index_a_o_object_2d = 0;
    // o_ctx.shadowColor = "black";
    // o_ctx.shadowBlur = 0;
    // while(n_index_a_o_object_2d < a_o_object_2d.length){

    
    //     // console.log(o_object_2d);
    //     n_index_a_o_object_2d+=1;
    // }


    n_fps = 1000.0 / n_ts_ms_delta;
    // o_ctx.font = '10px sans';
    // o_ctx.fillText(`FPS:${n_fps}`, 1, 1);
    console.log(`FPS:${n_fps}`)
    
    n_ts_ms_last = n_ts_ms_now;
    a_n_keycode_keydown_game_lastframe = a_n_keycode_keydown_game
}
var f_render_recursive = function(){
    n_id_frame = window.requestAnimationFrame(f_render_recursive);
    f_render();// if we render after requestAnimationFrame it should be slightly faster according to some post in internet
}



var a_o_object_2d__wall_and_path = await f_a_o_object_2d__wall_and_path()
a_o_object_2d = a_o_object_2d.concat(a_o_object_2d__wall_and_path);

var a_o_graph_node = []
for(var o_object_2d of a_o_object_2d__wall_and_path){
    if(o_object_2d.s_name == "path"){
        var o_graph_node = new O_graph_node(
            o_object_2d, 
            null,
            null,
            null,
            null,
        )
        a_o_graph_node.push(o_graph_node)
    }
}


var a_s_side = [
    "left", 
    "right", 
    "up", 
    "down"
]

var a_o_graph_node__with_connection = []
for(var o_graph_node of a_o_graph_node){ 


    for(var s_side of a_s_side){
        if(s_side == "left"){
            var n_x = o_graph_node.o_object_2d.n_x + -1;
            var n_y = o_graph_node.o_object_2d.n_y +  0;
        }
        if(s_side == "right"){
            var n_x = o_graph_node.o_object_2d.n_x + +1;
            var n_y = o_graph_node.o_object_2d.n_y +  0;
        }
        if(s_side == "up"){
            var n_x = o_graph_node.o_object_2d.n_x +  0;
            var n_y = o_graph_node.o_object_2d.n_y + -1;
        }
        if(s_side == "down"){
            var n_x = o_graph_node.o_object_2d.n_x +  0;
            var n_y = o_graph_node.o_object_2d.n_y + +1;
        }
        var o_graph_node__connected = a_o_graph_node.filter(
            o => 
                parseInt(o.o_object_2d.n_x) == parseInt(n_x)
                &&
                parseInt(o.o_object_2d.n_y) == parseInt(n_y)
        )[0]
        if(o_graph_node__connected){
            o_graph_node[`o_graph_node__${s_side}`] = o_graph_node__connected
            o_graph_node.o_object_2d.a_o_object_2d__line_to.push(o_graph_node__connected.o_object_2d)
        }
    }

}

var n_frames_animation = 100;
for(var o_object_2d of a_o_object_2d){
    if(o_object_2d.s_name == "wall"){
        o_object_2d.s_color_rgba = "rgba(0,0,0,0)";
        // o_object_2d.s_color_rgba = "rgba(132,33,0,1)";
        // o_object_2d.f_render_function = function(){

        //     var n_animation_finished_normalized = (n_id_frame*0.1% n_frames_animation)/n_frames_animation;
        //     this.s_color_rgba = `rgba(${123-(n_animation_finished_normalized*123)},${33-(n_animation_finished_normalized*33)},0,${1-n_animation_finished_normalized})`
        // }
    }
}
for(var o_graph_node of a_o_graph_node){
    while(true){
        var a_o_graph_node__same_pos = a_o_graph_node.filter(
            o=> 
            parseInt(o_graph_node.o_object_2d.n_x_random_unique) == parseInt(o.o_object_2d.n_x_random_unique)
            &&
            parseInt(o_graph_node.o_object_2d.n_y_random_unique) == parseInt(o.o_object_2d.n_y_random_unique)
        );
        if(a_o_graph_node__same_pos.length == 1){
            break;
        }
        // console.log(1)
        o_graph_node.o_object_2d.n_x_random_unique = parseInt(Math.random() * n_scale_x);
        o_graph_node.o_object_2d.n_y_random_unique = parseInt(Math.random() * n_scale_y);
    }

    var n_distance_to_random_unique = o_graph_node.o_object_2d.n_x
    // o_graph_node.o_object_2d.f_render_function = function(){

    //     var n_animation_finished_normalized = 1-((n_id_frame*0.1% n_frames_animation)/n_frames_animation);
    //     console.log(n_animation_finished_normalized)
    //     var n_animation_finished_normalized_sine =  1 - Math.cos((n_animation_finished_normalized * Math.PI) / 2);
    //     var n = n_animation_finished_normalized;
    //     var n_animation_finished_ease_in_out_cubic = 
    //         n < 0.5 ? 4 * n * n * n : 1 - Math.pow(-2 * n + 2, 3) / 2;

    //     var n_delta_x = this.n_x_random_unique - this.n_x_initial;
    //     var n_delta_y = this.n_y_random_unique - this.n_y_initial;
    //     this.n_x = this.n_x_initial + n_animation_finished_ease_in_out_cubic * n_delta_x;
    //     this.n_y = this.n_y_initial + n_animation_finished_ease_in_out_cubic * n_delta_y;
    //     // this.n_x = this.n_x_initial + 
    //     // (n_delta_x/n_frames_animation) * Math.sin(
    //     //     Math.PI*2*n_animation_finished_normalized
    //     // )* n_frame_animation + n_delta_x;
    //     // this.n_y = this.n_y_initial +
    //     // (n_delta_y/n_frames_animation) * Math.sin(
    //     //     Math.PI*2*n_animation_finished_normalized
    //     // )* n_frame_animation + n_delta_y;
    // }

}



// console.log(a_o_graph_node)


f_render()

// console.log(a_o_object_2d)
// var n_id_frame = window.requestAnimationFrame(f_render_recursive);

// f_find_path_demo();
// f_noise_demo();
// f_player_demo();

