import O_json_to_html from "https://unpkg.com/o_json_to_html@1.0.6/o_json_to_html.module.js"

var o_themes = 
{
    o_dark: {
        o_colors: {
            "o_background": {
                r: 22, 
                g: 22, 
                b: 22, 
                alpha: 0.9,
            },
            "o_foreground": {
                r: 222, 
                g: 222, 
                b: 222, 
                alpha: 0.9,
            },
            "o_alpha": {
                r: 0, 
                g: 0, 
                b: 0, 
                alpha: 0.9,
            },
            "o_beta": {
                r: 0, 
                g: 0, 
                b: 0, 
                alpha: 0.9,
            },
            "o_gamma": {
                r: 0, 
                g: 0, 
                b: 0, 
                alpha: 0.9,
            },
            "o_red": {
                r: 0, 
                g: 0, 
                b: 0, 
                alpha: 0.9,
            },
            "o_green": {
                r: 0, 
                g: 0, 
                b: 0, 
                alpha: 0.9,
            },
            "o_blue": {
                r: 0, 
                g: 0, 
                b: 0, 
                alpha: 0.9,
            },
        }
    }
}
var o_rulesets = {
    o_box_shadow: {
        "box-shadow":"0px 3px 4px 4px rgb(0 0 0 / 50%)"
    }
};
var a_o_ruleset_spacing = [1,2,3].reduce((a,n)=>
    {
        a.push(...[
            {
            "s_selector": ` .p-${n}`, 
            o_rules:{"padding": `${n/2}rem`}
            },
            {
                "s_selector": ` .px-${n}`, 
                o_rules:{"padding": `${n/2}rem 0`}
            },
            {
                "s_selector": ` .py-${n}`, 
                o_rules:{"padding": `0 ${n/2}rem`}
            },
        ]);
        ["t","r","b","l"].forEach((s,n_i) => {
            var a_s_padding = ["0", "0", "0", "0"];
            a_s_padding[n_i] = `${n/2}rem`
            a.push(
                {
                    "s_selector": ` .p${s}-${n}`, 
                    o_rules:{
                        "padding": a_s_padding.join(" ")
                    }   
                },
            )
        });
        return a
    },
    []
)
var o = {
    o_functions: {
        f_s_color_to_rgba(o_color){
            return `rgba(${o_color.r},${o_color.g},${o_color.b},${o_color.alpha})`
        }
    },
    o_colors: o_themes.o_dark.o_colors, 
    o_css: {
        o_ruleset: 
        {
            "s_selector": " body", 
                o_rules:{
                        "font-family": "arial",
                        "margin": 0, 
                        "padding": 0,
                        "font-size": "1.2rem", 
                        "background-color": "${o_functions.f_s_color_to_rgba(o_colors.o_background)}",
                        "color": "${o_functions.f_s_color_to_rgba(o_colors.o_foreground)}",
                        "display": "flex", 
                        "align-items": "center", 
                        "justify-content": "center", 
                },
                a_o_ruleset: [
                    {
                        "s_selector": " *", 
                        o_rules:{
                            "box-sizing": "border-box",
                            "background-color": "${o_functions.f_s_color_to_rgba(o_colors.o_background)}",
                            "color": "${o_functions.f_s_color_to_rgba(o_colors.o_foreground)}",
                        }
                    },
                    ...a_o_ruleset_spacing,
                    {
                        "s_selector": " div, img", 
                        o_rules:{
                            "width": "100%"
                        }
                    },
                    {
                        "s_selector": " .d_flex", 
                        o_rules:{
                            "display":"flex"
                        }
                    },
                    {
                        s_selector: ' .a_o_topic', 
                        o_rules: {
                            "align-items": "center",
                            "display": "flex", 
                            "flex-direction": "column"
                        },
                        a_o_ruleset: [
                            {
                                s_selector: " .o_user", 
                                o_rules: {
                                    "display": "flex",
                                }
                            },
                            {
                                s_selector: " .o_topic", 
                                o_rules: {
                                    "min-height": "100vh",
                                    "border-top": "2px solid white",
                                    "display":" flex",
                                    "align-items":" center",
                                    "justify-content":" center",
                                }, 
                                a_o_ruleset: [
                                    {
                                        s_selector: " .o_content", 
                                        o_rules: {
                                            "max-width": "500px",
                                        },  
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        s_selector: " #app", 
                        o_rules:{
                            "display": "flex",
                            "width": "100vw",
                        }
                    },
                    {
                        s_selector: " .o_top_bar",
                        a_o_ruleset: [
                            {
                                s_selector:".fixed",
                                o_rules: {
                                    "position": "fixed"
                                }
                            }, 
                            {
                                s_selector:".visibility_hidden",
                                o_rules: {
                                    "visibility": "hidden"
                                }
                            }, 
                            {
                                s_selector: " .o_scroll_progress", 
                                o_rules:{
                                    "height":" 3px",
                                    "background":" red",
                                    "position":" absolute",
                                    "left":" 0",
                                    "bottom":" 0",
                                }
                            }
                        ],
                        o_rules:{
                            "color": "black", 
                            width: "100%",
                            display: "flex", 
                            padding:"1rem", 
                            "justify-content":"space-between",
                            ...o_rulesets.o_box_shadow
                        },
                    },
                ]
        }
        
    }
}
import {O_json_to_css} from "https://deno.land/x/o_json_to_css@0.1/O_json_to_css.module.js";

import { f_s_json_b64__from_o} from "./f_s_json_b64__from_o.module.js";
import { f_a_o_missing_prop__recursive_in_first_arg_object } from "./f_a_o_missing_prop__recursive_in_first_arg_object.module.js";
import { f_o_from__s_json_b64} from "./f_o_from__s_json_b64.module.js";

var o_json_to_css = new O_json_to_css(o); 

await o_json_to_css.f_render();


//development mode vue
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js'
//production mode vue 
//  import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.min.js'


var o_json_to_html = new O_json_to_html()


document.getElementById("app").append(
    o_json_to_html.f_json_to_html(
        {
            s_t:"div", 
            //'s_inner_html': "Innerhtml working!",
            a_c: [
                {
                    s_t:"button", 
                    "v-on:click": "(o_data.b_bool = !o_data.b_bool)",
                    'v-html': "(o_data.b_bool) ? 'true' : 'false'"
                },
            ]
        },
    )
);

class O_object_test{
    constructor(
        b_bool,
        n_num,
        s_string 
        ){
            this.b_bool = b_bool;
            this.n_num = n_num;
            this.s_string = s_string;
    }
}
class O_point_2d {
    constructor(n_x, n_y) {
        this.n_x = n_x,
        this.n_y = n_y
    }
}
class O_path_2d{
    constructor(
        n_id, 
        a_o_point_2d
        ){
        this.n_id = n_id, 
        this.a_o_point_2d = a_o_point_2d
    }
}
class O_cursor{
    constructor(
        s_name, 
        o_point_2d
    ){
        this.s_name = s_name
        this.o_point_2d = o_point_2d
    }
}

var o_ws = new WebSocket('ws://localhost:8080');

// console.log(document.getElementById("app").innerHTML)
window.o_vue_object = new Vue({
    el: '#app',
    o_static_data_non_watched: { // a custom object which if changed wont trigger the 'updated' function / the whole rectivity system of vue
        n_ts_ms__mousemove:0,
        n_ts_ms__mousemove_diff:0,
        n_points:0,
        o_cursor:0,
        o_cursor__last:null, 
        o_cursor__diff:null,
        n_ms_threshhold:null,
        o_canvas: null, 
        o_ctx: null,
        a_o_point_2d : [],
        a_o_path_2d : [],
        o_path_2d : new O_path_2d([]),
        b_mouse_down: false,
        n_anim_id:  0,
        n_ts_ms__render:  window.performance.now(),
        n_ts_ms__render_diff:  window.performance.now(),
        a_o_cursor: [],
        f_init: function(){
            // Create WebSocket connection.

            // Connection opened
            o_ws.addEventListener('open', (o_event) => {
                o_ws.send(JSON.stringify(o_self.o_cursor));
            });
            
            // Listen for messages
            o_ws.addEventListener('message', (o_event) => {
                var o_cursor__from_ws_server = JSON.parse(o_event.data);
                console.log("o_ws.message() was called!");
                // console.log('Message from server ', event.data);
                Object.assign(o_self.o_cursor, o_cursor);
                var b_existing = false;
                for(var o_cursor of o_self.a_o_cursor){
                    if(o_cursor.s_name == o_cursor__from_ws_server.s_name){
                        Object.assign(o_cursor, o_cursor__from_ws_server)
                        b_existing = true
                    }
                }
                if(!b_existing){
                    o_self.a_o_cursor.push(o_cursor__from_ws_server);
                }

            });
            var o_self = this;
            window.addEventListener('resize', function(){
                o_self.f_onresize_window();
            })
            o_self.o_canvas =  document.createElement("canvas");
            o_self.o_ctx = o_self.o_canvas.getContext("2d");
    
            document.body.appendChild(
                o_self.o_canvas
            );
            // o_self.o_canvas.onmousedown = o_self.f_onmousedown_o_canvas;
            window.addEventListener('mousedown', function(){
                o_self.f_onmousedown_o_canvas();
            })
            // o_self.o_canvas.onmouseup = o_self.f_onmouseup_o_canvas;
            window.addEventListener('mouseup', function(){
                o_self.f_onmouseup_o_canvas();
            })
            o_self.n_ts_ms__mousemove = window.performance.now();
            o_self.n_ts_ms__mousemove_diff = 0;
            o_self.n_points = 0;
            o_self.n_ms_threshhold = 0;
            var s_name = prompt("enter your name!: ")
            o_self.o_cursor = new O_cursor(
                s_name,
                new O_point_2d(
                    0,0
                )
            );
            o_self.a_o_cursor.push(o_self.o_cursor);

            o_self.o_cursor__last = new O_cursor(
                s_name,
                new O_point_2d(
                    0,0
                )
            );
            o_self.o_cursor__diff = new O_cursor(
                s_name,
                new O_point_2d(
                    0,0
                )
            );
            o_self.o_canvas.addEventListener('mousemove', function(){
                o_self.f_onmousemove_o_canvas();
            })
            o_self.f_render_canvas__recursive();
            
            o_self.f_resize_canvas(o_self.o_canvas);
            
        },
        f_onresize_window: function(){
            var o_self = this;
            o_self.f_resize_canvas(o_self.o_canvas);
        },
        f_resize_canvas : function(o_canvas){
            var o_self = this;
            o_canvas.width = window.innerWidth;
            o_canvas.height = window.innerHeight;
        },
        f_onmousedown_o_canvas: function(){
            var o_self = this;
            o_self.b_mouse_down = true;
            o_self.a_o_path_2d.push(o_self.o_path_2d);
        },
        f_onmouseup_o_canvas: function(){
            var o_self = this;
            o_self.b_mouse_down = false;
            o_self.o_path_2d = new O_path_2d(new Date().getTime(), []);
        },
        f_onmousemove_o_canvas: function(){
            var o_self = this;
            o_ws.send(JSON.stringify(o_self.o_cursor));
            // console.log(o_self)
            var o_sdnw = o_self;
            o_sdnw.o_cursor.o_point_2d.n_x = window.event.clientX;
            o_sdnw.o_cursor.o_point_2d.n_y = window.event.clientY;

            o_sdnw.o_cursor__diff.o_point_2d.n_x = o_sdnw.o_cursor.o_point_2d.n_x - o_sdnw.o_cursor__last.o_point_2d.n_x;
            o_sdnw.o_cursor__diff.o_point_2d.n_y = o_sdnw.o_cursor.o_point_2d.n_y - o_sdnw.o_cursor__last.o_point_2d.n_y;

            Object.assign(o_sdnw.o_cursor__last, o_sdnw.o_cursor);
            if (o_sdnw.b_mouse_down) {
                o_sdnw.n_ts_ms__mousemove_diff = window.performance.now() - o_sdnw.n_ts_ms__mousemove;
                var o_canvas = o_sdnw.o_canvas;

                if(Math.abs(o_sdnw.n_ts_ms__mousemove_diff) > o_sdnw.n_ms_threshhold){

                    var n_length = Math.sqrt(
                        o_sdnw.o_cursor__diff.o_point_2d.n_x*o_sdnw.o_cursor__diff.o_point_2d.n_x+
                        o_sdnw.o_cursor__diff.o_point_2d.n_y*o_sdnw.o_cursor__diff.o_point_2d.n_y
                    );
                    var n_max_distance_cursor_can_move = Math.sqrt(o_canvas.height*o_canvas.height+o_canvas.width*o_canvas.width);
                    n_max_distance_cursor_can_move = Math.sqrt(o_canvas.height*o_canvas.height+o_canvas.width*o_canvas.width)/2;// half the screen
                    n_max_distance_cursor_can_move = Math.sqrt(o_canvas.height*o_canvas.height+o_canvas.width*o_canvas.width)/10;// a tenth of the screen
                    n_max_distance_cursor_can_move = Math.sqrt(o_canvas.height*o_canvas.height+o_canvas.width*o_canvas.width)/100;// a hundrest of the screen
                    n_max_distance_cursor_can_move = Math.sqrt(o_canvas.height*o_canvas.height+o_canvas.width*o_canvas.width)/120;
                    var n_length_nor = n_length / n_max_distance_cursor_can_move;
                    o_sdnw.n_ms_threshhold = Math.max(0, (1.-n_length_nor)*77);
                    console.log("n_length_nor")
                    console.log(n_length_nor)
                    // console.log("n_ms_threshhold")
                    // console.log(n_ms_threshhold)
                    // console.log("n_length_nor")
                    // console.log(n_length_nor)
                    o_sdnw.n_ts_ms__mousemove = window.performance.now()
                    o_sdnw.n_points+=1;
                    o_sdnw.o_path_2d.a_o_point_2d.push(
                        new O_point_2d(
                            window.event.clientX,
                            window.event.clientY,
                        )
                    )   
                }
            }
        },
        f_render_canvas : function(){
            var o_self = this;
            o_self.f_clear_canvas();
            var o_sdnw = o_self;
            for(let o_path_2d of o_sdnw.a_o_path_2d){
                o_sdnw.o_ctx.strokeStyle = "red";
                o_self.f_draw_line_from_a_o_point_2d(o_sdnw.o_ctx, o_path_2d.a_o_point_2d);
                o_sdnw.o_ctx.strokeStyle = "green";
                o_self.f_draw_smoth_line_from_a_o_point_2d(o_sdnw.o_ctx, o_path_2d.a_o_point_2d);
            }
            for(let o_cursor of o_self.a_o_cursor){

                // draw o_cursor 
                o_sdnw.o_ctx.font = "30px Arial";
                o_sdnw.o_ctx.fillStyle = "red"
                o_sdnw.o_ctx.fillText(
                    o_cursor.s_name, 
                    o_cursor.o_point_2d.n_x, 
                    o_cursor.o_point_2d.n_y
                ); 
        
            }
        },
        f_clear_canvas: function(){
            var o_self = this;
            o_self.o_ctx.fillStyle = "black";
            o_self.o_ctx.fillRect(
                0,
                0,
                o_self.o_canvas.width,
                o_self.o_canvas.height
            );//clear
        },
        f_render_canvas__recursive: function(){
            var o_self = this;
            o_self.n_ts_ms__render_diff = window.performance.now() - o_self.n_ts_ms__render;
            o_self.n_ts_ms__render = window.performance.now();
            // console.log(`frame time (ms): ${n_ts_ms__frame_diff}`)
            // console.log(`fps: ${parseInt(1000/n_ts_ms__frame_diff)}`)
            // console.log(`n_points: ${n_points}`)
            o_self.n_anim_id = requestAnimationFrame(function(){
                o_self.f_render_canvas__recursive();
            });
            o_self.f_render_canvas();
        },
        f_draw_line_from_a_o_point_2d : function(o_ctx, a_o_point_2d){
            if(a_o_point_2d.length < 2){return}
            var o_point_2d__first = a_o_point_2d[0];
            o_ctx.beginPath();
            o_ctx.moveTo((o_point_2d__first.n_x), o_point_2d__first.n_y);
            for (let n_index = 0; n_index < a_o_point_2d.length-1; n_index += 1) {
                var o_point_2d = a_o_point_2d[n_index];
                var o_point_2d__next = a_o_point_2d[n_index + 1];
                o_ctx.lineTo(
                    o_point_2d__next.n_x,
                    o_point_2d__next.n_y,
                )
                o_ctx.moveTo(
                    o_point_2d__next.n_x,
                    o_point_2d__next.n_y,
                )
            }
            o_ctx.stroke();
        },
        f_draw_smoth_line_from_a_o_point_2d : function (o_ctx, a_o_point_2d) {
            var n_tau = 6.2831;
            if(a_o_point_2d.length < 2){return}
            var o_point_2d__first = a_o_point_2d[0];
            o_ctx.beginPath();
            o_ctx.moveTo((o_point_2d__first.n_x), o_point_2d__first.n_y);
            for (let n_index = 0; n_index < a_o_point_2d.length-1; n_index += 1) {
                var o_point_2d = a_o_point_2d[n_index];
                var o_point_2d__next = a_o_point_2d[n_index + 1];
    
                var o_point_2d__average = new O_point_2d(
                    (o_point_2d.n_x + o_point_2d__next.n_x) / 2,
                    (o_point_2d.n_y + o_point_2d__next.n_y) / 2
                );
                // o_ctx.quadraticCurveTo(
                //     o_point_2d.n_x,
                //     o_point_2d.n_y, 
                //     o_point_2d__average.n_x, 
                //     o_point_2d__average.n_y
                // );
    
            }
            for (let n_index = 0; n_index < a_o_point_2d.length-1; n_index += 1) {
                var o_point_2d = a_o_point_2d[n_index];
                var o_point_2d__next = a_o_point_2d[n_index + 1];
    
                var o_point_2d__average = new O_point_2d(
                    (o_point_2d.n_x + o_point_2d__next.n_x) / 2,
                    (o_point_2d.n_y + o_point_2d__next.n_y) / 2
                );
                var o_point_2d__diff = new O_point_2d(
                    (o_point_2d.n_x - o_point_2d__next.n_x),
                    (o_point_2d.n_y - o_point_2d__next.n_y)
                );
                var n_strength_nor = 1.;
    
                var o_point_2d__control = new O_point_2d(
                    o_point_2d__average.n_x+o_point_2d__diff.n_x*(0.5-n_strength_nor*0.5), 
                    o_point_2d__average.n_y+o_point_2d__diff.n_y*(0.5-n_strength_nor*0.5)
                );
                o_ctx.fillStyle = "red";
                o_ctx.fillRect(
                    o_point_2d__control.n_x, 
                    o_point_2d__control.n_y, 
                    20, 
                    20,
                )
    
                o_ctx.quadraticCurveTo(
                    o_point_2d.n_x,
                    o_point_2d.n_y, 
                    o_point_2d__control.n_x, 
                    o_point_2d__control.n_y, 
                );
            }
    
            o_ctx.stroke();
    
        },
    },
    data (){
        return {
            o_data: {
                b_bool: true, 
                n_num: 1, 
                s_string: "hello world", 
                o_object: new O_object_test(false, 10, 'test'), 
                o_static_data_non_watched: null, 
            }
        }
    },
    updated: async function(){
        var o_self = this;
        console.log("o_vue_object.updated() was called!")
        o_self.f_write_o_to_url_fragment(o_self.o_data);
    },
    mounted:async function () {
        var o_self = this;
        var o_data_from_url_fragment = o_self.f_o_data__from_url_fragment();
        if(o_data_from_url_fragment){
            var b_o_data_compatible = o_self.f_b_o_data_compatible(o_data_from_url_fragment, o_self.o_data);
            if(b_o_data_compatible){
                o_self.o_data = o_data_from_url_fragment;
                // Object.assign(o_self.$options.o_static_data_non_watched,o_self.o_data.o_static_data_non_watched)
            }
        }
        o_self.$options.o_static_data_non_watched.f_init();
        window.onmouseup = function(){
            o_self.o_data.o_static_data_non_watched = o_vue_object.$options.o_static_data_non_watched;
            console.log(o_self.o_data)
            o_self.o_data.b_bool = !o_self.o_data.b_bool;
        }
    },
    watch: {
    },
    methods: {
        f_b_o_data_compatible: function(
            o_data_from_url_fragment, 
            o_self_o_data
        ){
            // if you are developing and the url you are reloading does still contain old data(property names etc.)
            // it could overwrite your new developed data and 
            // lead to undefined behaviour 
            // so we have to check if the data is the same
            console.log(o_data_from_url_fragment);
            console.log(o_self_o_data);
            var a_o_missing_prop__recursive_in_first_arg_object = f_a_o_missing_prop__recursive_in_first_arg_object(
                o_data_from_url_fragment, 
                o_self_o_data
            );
            if(a_o_missing_prop__recursive_in_first_arg_object.length > 0){
                console.warn(`the object ${o_data_from_url_fragment} encoded in the url (...#${window.location.hash.substring(1,10)}...), is missing the following properties: `)
                console.warn(a_o_missing_prop__recursive_in_first_arg_object);
                return false;
            }
            return true;
        },
        f_write_o_to_url_fragment: function(o){
            var o_self = this;
            window.location.hash = o_self.f_s_json_b64__from_o(o);
        },
        f_o_data__from_url_fragment: function(){
            var o_self = this;
            if (window.location.hash != '') {
                var s_json_b64 = window.location.hash.substring(1,);
                var o_data = o_self.f_o_from__s_json_b64(s_json_b64);
            }
            return o_data;
        },


        f_s_json_b64__from_o: f_s_json_b64__from_o, 
        f_o_from__s_json_b64: f_o_from__s_json_b64
    },
    computed: {
    }
})

