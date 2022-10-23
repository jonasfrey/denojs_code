// import O_json_to_html from "https://unpkg.com/o_json_to_html@1.0.6/o_json_to_html.module.js"

// // import { O_image } from "./O_image.module.js"
// // import { O_image_mask }  from "./O_image_mask.module.js"

//  //development mode vue
//  // import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js'
//  //production mode vue 
//  import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.min.js'
import {f_a_o_object_2d__wall} from  "./f_a_o_object_2d__wall.module.js";

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

var n_ts_ms_now = window.performance.now();
var n_ts_ms_last = window.performance.now();
var n_ts_ms_delta = window.performance.now();
var n_fps = 0;
var s_color_rgba__clear = "rgba(0,0,0,1)";
var f_render = function(){
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
}
var f_render_recursive = function(){
    f_render();
    n_id_animation = window.requestAnimationFrame(f_render_recursive);
}

// f_noise_demo();


var a_o_object_2d__wall = await f_a_o_object_2d__wall()
a_o_object_2d = a_o_object_2d.concat(a_o_object_2d__wall);
// f_render()
// console.log(a_o_object_2d)
var n_id_animation = window.requestAnimationFrame(f_render_recursive);

export {O_object_2d}