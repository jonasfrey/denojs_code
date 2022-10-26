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
var n_scale_x_canvas = 400;
var n_scale_y_canvas = 400;
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

    var n_x_mouse_scale = parseInt(n_x_normalized_mouse * n_scale_x_canvas);
    var n_y_mouse_scale = parseInt(n_y_normalized_mouse * n_scale_y_canvas);

    o_ctx.fillStyle = s_color_rgba__clear

    o_ctx.fillRect(
        0,
        0,
        n_scale_x_canvas,
        n_scale_y_canvas
    );

    let n_index_a_o_object_2d = 0;
    
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
        o_ctx.fillRect(
            n_x_scaled__o_object_2d,
            n_y_scaled__o_object_2d,
            n_scale_x__o_object_2d,
            n_scale_y__o_object_2d,
        );
        
        for(var o_object_2d__line_to of o_object_2d.a_o_object_2d__line_to){
            var n_x_scaled__o_object_2d__line_to = o_object_2d__line_to.n_x * n_scale_x_object;
            var n_y_scaled__o_object_2d__line_to = o_object_2d__line_to.n_y * n_scale_y_object;
            o_ctx.beginPath();
            o_ctx.moveTo(
                n_x_scaled__o_object_2d + (n_scale_x_object /2),
                n_y_scaled__o_object_2d + (n_scale_y_object /2)
            );
            o_ctx.lineTo(
                n_x_scaled__o_object_2d__line_to + (n_scale_x_object /2),
                n_y_scaled__o_object_2d__line_to + (n_scale_y_object /2),
            );
            o_ctx.closePath()
        }
        o_ctx.strokeStyle = "white"
        o_ctx.stroke();
    
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
            o_graph_node.o_object_2d.a_o_object_2d__line_to.push(o_graph_node__connected.o_object_2d)
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



var f_a_o_graph_node__traversal_dfs_recursive = function(
    a_o_graph_node__stack_frontier,
    a_o_graph_node__set_explored,
    o_graph_node__target, 
    a_s_side
){
    if(a_o_graph_node__stack_frontier.length == 0){
        console.log("stack is empty, goal could not be reached or no start node was in the stack array :(")
        return true
    }
    var o_graph_node = a_o_graph_node__stack_frontier.pop();
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
                a_o_graph_node__stack_frontier.push(o_graph_node__connected)
                a_o_graph_node__set_explored.push(o_graph_node__connected)
            }
        }
    }
    f_a_o_graph_node__traversal_dfs_recursive(
        a_o_graph_node__stack_frontier,
        a_o_graph_node__set_explored,
        o_graph_node__target,
        a_s_side
    )
}

var f_a_o_graph_node__traversal_dfs = function(
    o_graph_node__start,
    o_graph_node__target, 
    a_s_side = [
        "down", 
        "up", 
        "left", 
        "right"
    ]
){
    var a_o_graph_node__stack_frontier =[ o_graph_node__start ];
    var a_o_graph_node__set_explored = [ o_graph_node__start ];
    f_a_o_graph_node__traversal_dfs_recursive(
        a_o_graph_node__stack_frontier,
        a_o_graph_node__set_explored,
        o_graph_node__target, 
        a_s_side
    );

    return a_o_graph_node__set_explored;
}

var o_graph_node__start = a_o_graph_node[0]
var o_graph_node__target = a_o_graph_node[0]

for(var o_graph_node of a_o_graph_node){
    var n_x = parseInt(o_graph_node.o_object_2d.n_x)
    var n_y = parseInt(o_graph_node.o_object_2d.n_y)
    if(
        n_x == 0
        && 
        n_y == 14
        ){
            o_graph_node__start = o_graph_node
    }
    if(
        n_x == 31
        && 
        n_y == 7
        ){
            o_graph_node__target = o_graph_node
    }
}
o_graph_node__start.o_object_2d.s_color_rgba = "rgba(33,255,0,1)"
o_graph_node__target.o_object_2d.s_color_rgba = "rgba(255,33,0,1)"
var a_s_side = [ // very efficient in this particular maze
    "down", 
    "up", 
    "left", 
    "right"
]
a_s_side = [ //very ineficient in this particular maze!
    "right", 
    "up", 
    "left", 
    "down"
]
a_s_side = [ //medium efficient in this particular maze!
    "left", 
    "right", 
    "down", 
    "up"
]
var a_o_graph_node__path = f_a_o_graph_node__traversal_bfs(
    o_graph_node__start, 
    o_graph_node__target, 
    a_s_side
);

// console.log(a_o_graph_node__path)
// let n_index = 0;
for(var o_graph_node of a_o_graph_node__path){
    let n_index = a_o_graph_node__path.indexOf(o_graph_node)

    o_graph_node.o_object_2d.n_x = parseInt(Math.random() * n_scale_x);
    o_graph_node.o_object_2d.n_y = parseInt(Math.random() * n_scale_y);
    while(true){
        var a_o_graph_node__same_pos = a_o_graph_node.filter(
            o=> 
            parseInt(o_graph_node.o_object_2d.n_x) == parseInt(o.n_x)
            &&
            parseInt(o_graph_node.o_object_2d.n_y) == parseInt(o.n_y)
        );
        if(a_o_graph_node__same_pos.length < 2){
            break;
        }
        o_graph_node.o_object_2d.n_x = parseInt(Math.random() * n_scale_x);
        o_graph_node.o_object_2d.n_y = parseInt(Math.random() * n_scale_y);
    }
    o_graph_node.o_object_2d.f_render_function  = function(){
        var n_max = 255;
        // this.s_color_rgba = `rgba(0,0,${(n_id_frame*0.2-(n_index*n_max/a_o_graph_node__path.length)) % 255}, 1)`
        this.s_color_rgba = `hsla(${(306/a_o_graph_node__path.length)*n_index-n_id_frame},50%,50%,1)`
        // this.s_color_rgba = f_s_color_rgba_random()
    }
}
var n_index = 0;
for(var o_object_2d of a_o_object_2d){
    n_index +=1;
    if(
        o_object_2d.s_name == "wall"
        // ||
        // o_object_2d.s_name == "path"
    ){
        // console.log(a_o_object_2d.length)
        o_object_2d.s_color_rgba = "rgba(0,0,0,0)";
        a_o_object_2d.splice(n_index, 1)
        // o_object_2d.b_render = false;
        // console.log(a_o_object_2d.length)
    }
}

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

