
import {f_a_o_object_2d__wall_and_path} from  "./f_a_o_object_2d__wall_and_path.module.js";

import { O_object_2d } from "./O_object_2d.module.js";

import {
    f_o_traversal_result__traversal_dfs,
    O_traversal_result, 
    f_a_o_graph_node__path
} from "./f_o_traversal_result__traversal_dfs.module.js";

// import { f_find_path_demo } from "./f_find_path_demo.module.js";
import {o_n_keycode} from "./o_n_keycode.module.js"

document.body.style.margin = "0";
document.body.style.padding = "0";
document.body.style.overflow = "hidden";

var o_canvas = document.querySelector("canvas")
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

class O_graph_edge_weighted{
    constructor(
        n_weight, 
        o_graph_node__target
    ){
        this.n_weight = n_weight
        this.o_graph_node__target = o_graph_node__target
    }
}
class O_graph_node_weighted{
    constructor(
        o_object_2d, 
        o_graph_edge_weighted__left,
        o_graph_edge_weighted__right,
        o_graph_edge_weighted__up,
        o_graph_edge_weighted__down,
    ){
        this.o_object_2d = o_object_2d
        this.o_graph_edge_weighted__left = o_graph_edge_weighted__left
        this.o_graph_edge_weighted__right = o_graph_edge_weighted__right
        this.o_graph_edge_weighted__up = o_graph_edge_weighted__up
        this.o_graph_edge_weighted__down = o_graph_edge_weighted__down
    }
}
var n_aspect_ratio_x_to_y = 0.5;
var f_resize = function(){

}
window.onresize = function(){
    f_resize();
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
var o_div_order = document.querySelector(".order");
var o_div_path = document.querySelector(".path .a_o");
var o_div_controls = document.querySelector(".controls");
var o_div_algorithm = document.querySelector(".algorithm");
var o_div_speed = document.querySelector(".speed");
var o_div_current = document.querySelector(".current .a_o");
var o_div_stack = document.querySelector(".stack .a_o");
var o_div_set = document.querySelector(".set .a_o");


var f_clear_dom = async function(){
    o_div_algorithm.innerHTML = ""
    o_div_order.innerHTML = ""
    o_div_current.innerHTML = ""
    o_div_stack.innerHTML = ""
    o_div_set.innerHTML = ""
}
var f_update_dom2 = function(
    s_algorithm, 
    n_speed, 
    a_s_side,
){

    if(s_algorithm == "dfs"){
        o_div_algorithm.innerHTML = `Algorithm(a):<br> Depht First Search`;
    }
    if(s_algorithm == "bfs"){
        o_div_algorithm.innerHTML = `Algorithm(a):<br> Breadth First Search`;
    }
    
    o_div_order.innerHTML = `Order(o):<br> [${a_s_side.map(s=>` ${s} `).toString()}]`;
    o_div_speed.innerHTML = `Speed(s):<br> [${n_speed}]`;
}
var b_restart = false;
var n_timeout = null;
var b_run_done = true;
var o_div = document.createElement("div");

var f_update_dom = async function(
    o_graph_node,
    a_o_graph_node__stack_frontier,
    a_o_graph_node__set_explored,
    n_sleep_ms, 
    o_graph_node__target,
    a_s_side,
){
    f_clear_dom();
    f_update_dom2(
        s_algorithm, 
        n_speed, 
        a_s_side
    );
    var o_graph_node__start = a_o_graph_node__set_explored[0]
    o_graph_node__start.o_object_2d.s_color_rgba = "rgba(33,255,0,1)"
    o_graph_node__target.o_object_2d.s_color_rgba = "rgba(255,33,0,1)"

    o_div.style.width = "5px";
    o_div.style.height = "5px";
    o_div.style.margin = "1px";
    for(var o of a_o_graph_node__set_explored){
        var s_color_rgba =  "rgba(255,0,255,1)";
        o.o_object_2d.s_color_rgba = s_color_rgba;
        o_div.style.backgroundColor = s_color_rgba;
        o_div_set.appendChild(o_div.cloneNode());
    }
    for(var o of a_o_graph_node__stack_frontier){
        var s_color_rgba =  "rgba(0,255,255,1)";
        o.o_object_2d.s_color_rgba = s_color_rgba;
        o_div.style.backgroundColor = s_color_rgba;
        o_div_stack.appendChild(o_div.cloneNode());
    }
    if(o_graph_node != null){
        var s_color_rgba =  "rgba(255,255,0,1)";
        o_graph_node.o_object_2d.s_color_rgba = s_color_rgba
        o_div.style.backgroundColor = s_color_rgba;
        o_div_current.appendChild(o_div.cloneNode());
    }


    n_timeout = await new Promise(r => setTimeout(r, n_sleep_ms));
    // await new Promise(r => setTimeout(r, 1));
    f_render();
    
}

var f_animate_backtracking = async function(
    o_backtracking,
    o_graph_node__target,
    o_graph_node__start, 
    n_sleep_ms
){

    o_graph_node = o_graph_node__target

    while(o_graph_node != undefined){
        var s_color_rgba =  "rgba(222,111,33,1)";
        o_div.style.backgroundColor = s_color_rgba;
        o_div_path.appendChild(o_div.cloneNode());
        o_graph_node.o_object_2d.s_color_rgba = s_color_rgba;
        f_render()
        await new Promise(r => setTimeout(r, n_sleep_ms));
        o_graph_node = o_backtracking[
            `${o_graph_node.o_object_2d.n_x}|${o_graph_node.o_object_2d.n_y}`
        ]
    }
}
var f_traversal_recursive_animated = async function(
    a_o_graph_node__stack_frontier,
    a_o_graph_node__set_explored,
    o_graph_node__target,
    a_s_side, 
    s_algorithm,
    o_backtracking,
    n_sleep_ms
){

    if(a_o_graph_node__stack_frontier.length == 0){
        console.log("stack is empty, goal could not be reached or no start node was in the stack array :(")
        b_run_done = true;
        return true
    }
    if(s_algorithm == "dfs"){
        var o_graph_node = a_o_graph_node__stack_frontier.pop();
    }
    if(s_algorithm == "bfs"){
        var o_graph_node = a_o_graph_node__stack_frontier.shift();
    }

    if(o_graph_node == o_graph_node__target){
        a_o_graph_node__set_explored.push(o_graph_node)
        await f_update_dom(
            o_graph_node,
            a_o_graph_node__stack_frontier,
            a_o_graph_node__set_explored,
            n_sleep_ms,
            o_graph_node__target, 
            a_s_side
        );
        console.log("target graph node has been found!");
        await f_animate_backtracking(
            o_backtracking,
            o_graph_node__target,
            a_o_graph_node__set_explored[0], 
            n_sleep_ms
        );
        b_run_done = true;
        return true
    }
    await f_update_dom(
        o_graph_node,
        a_o_graph_node__stack_frontier,
        a_o_graph_node__set_explored,
        n_sleep_ms,
        o_graph_node__target, 
        a_s_side
    );

    for(var s_side of a_s_side){
        var o_graph_node__connected = o_graph_node[`o_graph_node__${s_side}`];
        if(o_graph_node__connected != null){
            if(a_o_graph_node__set_explored.indexOf(o_graph_node__connected) == -1){
                a_o_graph_node__stack_frontier.push(o_graph_node__connected)
                a_o_graph_node__set_explored.push(o_graph_node__connected)
                o_backtracking[
                    `${o_graph_node__connected.o_object_2d.n_x}|${o_graph_node__connected.o_object_2d.n_y}`
                ] = o_graph_node
            }
        }
    }
    await f_update_dom(
        o_graph_node,
        a_o_graph_node__stack_frontier,
        a_o_graph_node__set_explored,
        n_sleep_ms,
        o_graph_node__target, 
        a_s_side
    );
    f_traversal_recursive_animated(
        a_o_graph_node__stack_frontier,
        a_o_graph_node__set_explored,
        o_graph_node__target,
        a_s_side,
        s_algorithm,
        o_backtracking, 
        n_sleep_ms
    )
}

var f_o_traversal_result__traversal_animated = async function(
    o_graph_node__start,
    o_graph_node__target, 
    a_s_side = [
        "down", 
        "up", 
        "left", 
        "right"
    ], 
    s_algorithm = "dfs", 
    n_sleep_ms
){
    for(var o_object_2d of a_o_object_2d){
        if(o_object_2d.s_name == "path"){
            o_object_2d.s_color_rgba = "rgba(222,222,222,1)"
        }
    }
    var a_o_graph_node__stack_frontier = [ o_graph_node__start ];
    var a_o_graph_node__set_explored = [ o_graph_node__start ];
    var o_backtracking = {}
    await f_traversal_recursive_animated(
        a_o_graph_node__stack_frontier,
        a_o_graph_node__set_explored,
        o_graph_node__target, 
        a_s_side, 
        s_algorithm, 
        o_backtracking,
        n_sleep_ms
    );

    return Promise.resolve(
        new O_traversal_result(
            o_graph_node__start,
            o_graph_node__target,
            a_o_graph_node__stack_frontier,
            a_o_graph_node__set_explored,
            o_backtracking,
        )
    )
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

var f_s_color_rgba_random = function(){
    return `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},${Math.random()})`
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

            if(this.b_hover_mouse){
                this.s_color_rgba = "rgba(255,255,0,1)"
            }else{
                this.s_color_rgba = "rgba(0,255,0,1)"
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

var f_player_fire_demo = function(){
    let n_index = 0
    for(var o_object_2d of a_o_object_2d){
        if(
            o_object_2d.s_name == "wall"
        ){
            n_index+=1//that wont work
            o_object_2d.f_render_function = function(){
                // this.s_color_rgba = `rgba(${Math.random()*255},0,0,1)` // random
                // this.s_color_rgba = `rgba(${Math.sin(n_id_frame*0.01+this.n_x+this.n_y*0.1)*(255/2)+(255/2)},0,0,1)` // psychedelic
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
    }

}

var f_hover_demo = function(){

    var f_a_o_graph_node__connected = function(
        o_graph_node
    ){
        var a_o_graph_node__connected = []
        for(var s_side of a_s_side){
            var o_graph_node__connected = o_graph_node[`o_graph_node__${s_side}`]
            if(o_graph_node__connected){
                a_o_graph_node__connected.push(o_graph_node__connected)
            }
        }
        return a_o_graph_node__connected
    }
    
    var f_a_o_graph_node__recursive_lt3 = function(o_graph_node, a_o_graph_node = []){
        // console.log(a_o_graph_node)
        
        if(a_o_graph_node.indexOf(o_graph_node) == -1){
            a_o_graph_node.push(o_graph_node)
            var a_o_graph_node__connected = f_a_o_graph_node__connected(o_graph_node);
            if(a_o_graph_node__connected.length < 3){
                for(var o_graph_node__connected of a_o_graph_node__connected){
                    f_a_o_graph_node__recursive_lt3(o_graph_node__connected, a_o_graph_node);
                }
            }
        }
    
    }
    
    
    for(let o_graph_node of a_o_graph_node){
        console.log(o_graph_node.o_object_2d)
        
        let a_o_graph_node__connected_recursive_lt3 = [];
        f_a_o_graph_node__recursive_lt3(
            o_graph_node,
            a_o_graph_node__connected_recursive_lt3
        )
        // console.log(a_o_graph_node__connected_recursive_lt3.length)
        // console.log(a_o_graph_node__connected_recursive_lt3)
    
        o_graph_node.a_o_graph_node__connected_recursive_lt3 = a_o_graph_node__connected_recursive_lt3
    
        // var s_color_rgba_randm = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},1)`
        // for(let o_graph_node2 of o_graph_node.a_o_graph_node__connected_recursive_lt3){
        //     o_graph_node2.o_object_2d.s_color_rgba = s_color_rgba_randm
        // }
    
        o_graph_node.o_object_2d.f_render_function = function(){
            var s_color_rgba = `rgba(0,0,0,1)`;
            for(var o_graph_node2 of o_graph_node.a_o_graph_node__connected_recursive_lt3){
                o_graph_node2.o_object_2d.s_color_rgba = s_color_rgba
                if(o_graph_node2.o_object_2d.b_hover_mouse){
                    var s_color_rgba = `rgba(0,${(n_id_frame*2+this.n_x*10)%255},0,1)`;
                }
            }
            o_graph_node.o_object_2d.s_color_rgba = s_color_rgba;
    
            // if(!this.b_hover_mouse){
            //     // this.s_color_rgba = "rgba(122,122,122,1)"
            // }else{
            //     this.s_color_rgba = "rgba(122,0,122,1)"
            //     console.log(o_graph_node.a_o_graph_node__connected_recursive_lt3)
            //     for(var o_graph_node2 of o_graph_node.a_o_graph_node__connected_recursive_lt3){
            //         o_graph_node2.o_object_2d.s_color_rgba = "rgba(0,255,0,1)"
            //     }
            // }
        }
    
    }

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

    var n_x_mouse_scale = parseInt(n_x_normalized_mouse * n_scale_x);
    var n_y_mouse_scale = parseInt(n_y_normalized_mouse * n_scale_y);

    o_ctx.fillStyle = s_color_rgba__clear
    o_ctx.fillRect(0,0,n_scale_x,n_scale_y);

    let n_index_a_o_object_2d = 0;
    
    while(n_index_a_o_object_2d < a_o_object_2d.length){
        let o_object_2d = a_o_object_2d[n_index_a_o_object_2d];
        if(
            n_x_mouse_scale == parseInt(o_object_2d.n_x)
            &&
            n_y_mouse_scale == parseInt(o_object_2d.n_y)
            ){
                o_object_2d.b_hover_mouse = true
        }else{
            o_object_2d.b_hover_mouse = false
        }

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
    // console.log(`FPS:${n_fps}`)
    
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
for(var o_object_2d of a_o_object_2d){
    if(
        o_object_2d.s_name == "wall"
    ){
        o_object_2d.s_color_rgba = "rgba(22,22,22,1)"
    }
}

var a_s_side = [
    "left", 
    "right", 
    "up", 
    "down"
]
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
        }
    }
}
// console.log(a_o_graph_node)



var f_a_o_graph_node__traversal_bfs_recursive = function(
    a_o_graph_node__queue_frontier, // in a queue an item is removed at the first index, so .shift()
    a_o_graph_node__set_explored,
    o_graph_node__target, 
    a_s_side
){
    if(a_o_graph_node__queue_frontier.length == 0){
        console.log("stack is empty, goal could not be reached or no start node was in the stack array :(")
        return true
    }
    var o_graph_node = a_o_graph_node__queue_frontier.shift();
    if(o_graph_node == o_graph_node__target){
        console.log("target graph node has been found!")
        // console.log(a_o_graph_node__set_explored)
        return true
    }
    for(var s_side of a_s_side){
        var o_graph_node__connected = o_graph_node[`o_graph_node__${s_side}`];
        if(o_graph_node__connected != null){

            // if(o_graph_node__connected == o_graph_node__target){
            //     console.log("target graph node has been found!")
            //     // console.log(a_o_graph_node__set_explored)
            //     return true
            // }

            if(a_o_graph_node__set_explored.indexOf(o_graph_node__connected) != -1){
                // do nothing 
            }else{
                o_graph_node__connected.n_ts_ms_pushed_to_explored = window.performance.now()
                a_o_graph_node__queue_frontier.push(o_graph_node__connected)
                a_o_graph_node__set_explored.push(o_graph_node__connected)
            }
        }
    }
    f_a_o_graph_node__traversal_bfs_recursive(
        a_o_graph_node__queue_frontier,
        a_o_graph_node__set_explored,
        o_graph_node__target,
        a_s_side
    )
}

var f_a_o_graph_node__traversal_bfs = function(
    o_graph_node__start,
    o_graph_node__target, 
    a_s_side
){
    var a_o_graph_node__queue_frontier =[ o_graph_node__start ];
    var a_o_graph_node__set_explored = [ o_graph_node__start ];
    f_a_o_graph_node__traversal_bfs_recursive(
        a_o_graph_node__queue_frontier,
        a_o_graph_node__set_explored, 
        o_graph_node__target,
        a_s_side
    )
    return a_o_graph_node__set_explored
}





for(var o_graph_node of a_o_graph_node){
    var n_x = parseInt(o_graph_node.o_object_2d.n_x)
    var n_y = parseInt(o_graph_node.o_object_2d.n_y)
    if(
        n_x == 0
        && 
        n_y == 14
        ){
            var o_graph_node__start = o_graph_node
    }
    if(
        n_x == 31
        && 
        n_y == 7
        ){
            var o_graph_node__target = o_graph_node
    }
}


var a_s_side = [ // very efficient in this particular maze
    "down", 
    "up", 
    "left", 
    "right"
]
const f_a_permutation = (inputArr) => {
let result = [];

const permute = (arr, m = []) => {
    if (arr.length === 0) {
    result.push(m)
    } else {
    for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next))
    }
    }
}

permute(inputArr)

return result;
}


var s_algorithm = "dfs"
var a_a_s_side = f_a_permutation(a_s_side);
var a_s_algorithm = [
    "dfs", 
    "bfs"
]
var n_index_a_s_algorithm = 0;
var n_index_a_a_s_side = 0;

var s_controls = 
`press 'a' to change algorithm
press 'o' to change order
press 's' to change speed
press 'r' to run`
console.log("----------- Welcome --------------")
console.log(s_controls)
o_div_controls.innerHTML = s_controls.split("\n").join("<br>")
var n_speed_max = 100;
var n_i = 0;
var a_n_speed = [1,10,50,100,500,1000]
var n_index_a_n_speed = 2
var n_speed = a_n_speed[n_index_a_n_speed]
var a_s_side = a_a_s_side[n_index_a_a_s_side]

window.onkeydown = async function(){
    
    if(b_run_done){
        var b_run = false;
        if(window.event.keyCode == o_n_keycode.s){
            n_index_a_n_speed=(n_index_a_n_speed+1)%a_n_speed.length;
            n_speed = a_n_speed[n_index_a_n_speed];
        }
        if(window.event.keyCode == o_n_keycode.a){
            n_index_a_s_algorithm=(n_index_a_s_algorithm+1)%a_s_algorithm.length;
            s_algorithm = a_s_algorithm[n_index_a_s_algorithm];
        }
        if(window.event.keyCode == o_n_keycode.o){
            n_index_a_a_s_side=(n_index_a_a_s_side+1)%a_a_s_side.length;
            a_s_side = a_a_s_side[n_index_a_a_s_side];
            console.log(a_s_side)
        }
        if(window.event.keyCode == o_n_keycode.r){
            b_run = true
        }
        f_update_dom2(
            s_algorithm, 
            n_speed, 
            a_s_side
        );
        var n_ms = (n_speed_max +1) - n_speed;
        if(b_run){
            b_run_done = false;
            var o_traversal_result = await f_o_traversal_result__traversal_animated(
                o_graph_node__start, 
                o_graph_node__target, 
                a_s_side, 
                s_algorithm,
                n_ms
            );
        }
    }

        
}



// var f_do_it_not_animated = function(){

//     var o_traversal_result = f_o_traversal_result__traversal_dfs(
//         o_graph_node__start, 
//         o_graph_node__target, 
//         [
//             "left",
//             "right",
//             "up", 
//             "down"
//         ]
//     );
//     console.log(o_traversal_result)
    
    
//     var a_o_graph_node__path = f_a_o_graph_node__path(
//         o_traversal_result.o_graph_node__target,
//         o_traversal_result.o_backtracking,
//     )
//     for(var o_graph_node of a_o_graph_node__path){
//         o_graph_node.o_object_2d.s_color_rgba = "rgba(255,0,0,1)";
//     }
//     f_render()
    
//     console.log(a_o_graph_node__path)
// }
// f_do_it_not_animated();


// console.log(a_o_graph_node__path)
// let n_index = 0;
// for(var o_graph_node of a_o_graph_node__path){
//     let n_index = a_o_graph_node__path.indexOf(o_graph_node)
//     o_graph_node.o_object_2d.f_render_function  = function(){
//         var n_max = 255;
//         // this.s_color_rgba = `rgba(0,0,${(n_id_frame*0.2-(n_index*n_max/a_o_graph_node__path.length)) % 255}, 1)`
//         this.s_color_rgba = `hsla(${(306/a_o_graph_node__path.length)*n_index-n_id_frame},50%,50%,1)`
//         // this.s_color_rgba = f_s_color_rgba_random()
//     }
// }

o_graph_node__start.o_object_2d.f_render_function = function(){}
o_graph_node__target.o_object_2d.f_render_function = function(){}
o_graph_node__start.o_object_2d.s_color_rgba = "rgba(33,255,0,1)"
o_graph_node__target.o_object_2d.s_color_rgba = "rgba(255,33,0,1)"
// var f_graph_node_traversal_dfs_recursive = function(
//     a_o_graph_node__stack,
//     a_o_graph_node__set,
//     o_graph_node__target
// ){
    
//     while(a_o_graph_node__stack.length != 0){
//         // pop from the stack
//         var o_graph_node = a_o_graph_node.pop();
//         // check if we have visited the node 
//         if(a_o_graph_node__set.indexOf(o_graph_node) != -1){
//             //already visited 
    
//         }
//     }

//     // check if this is our target
//     if(o_graph_node == o_graph_node__target){
//         console.log("traversal DFS (depth frist search) is done, array with nodes will be returned from the function")
//         return a_o_graph_node__set;
//     }else{
//         a_o_graph_node__set.push(o_graph_node)
//     }

//     var a_s_side = [
//         "down", 
//         "up", 
//         "left", 
//         "right"
//     ];
//     for(var s_side of a_s_side){
//         if(o_graph_node[`o_graph_node__${s_side}`] != null){
//             a_o_graph_node__stack.push(o_graph_node[`o_graph_node__${s_side}`])
//         }
//     }

//     // 'next' function
//     f_graph_node_traversal_dfs_recursive(
//         a_o_graph_node__stack,
//         a_o_graph_node__set,
//         o_graph_node__target
//     )
// }
// var f_a_o_graph_node_traversal_dfs = function(
//     o_graph_node__start, 
//     o_graph_node__target
// ){
//     var a_o_graph_node__stack = [];

//     var a_o_graph_node__set = f_graph_node_traversal_dfs_recursive(
//         [o_graph_node__start],
//         [],
//         o_graph_node__target
//     );
//     console.log("done done done !")

// }
f_render()

// console.log(a_o_object_2d)
var n_id_frame = window.requestAnimationFrame(f_render_recursive);
// f_find_path_demo();
// f_noise_demo();
// f_player_demo();

