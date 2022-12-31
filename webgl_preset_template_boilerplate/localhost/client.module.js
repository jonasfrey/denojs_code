import O_json_to_html from "https://unpkg.com/o_json_to_html@1.0.6/o_json_to_html.module.js"

import {a_o_program} from "./a_o_program.module.js"

require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs' } })

window.MonacoEnvironment = {
    getWorkerUrl: function (workerId, label) {
        return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
      self.MonacoEnvironment = {
        baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/'
      };
      importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs/base/worker/workerMain.js');`
        )}`
    }
}
var f_add_glsl_language_to_monaco_editor = function(monaco){

    monaco.languages.register({ id: 'glsl' });
    
    monaco.languages.setLanguageConfiguration('glsl', {
        wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\#\$\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
        comments: {
            lineComment: '//',
            blockComment: ['/*', '*/']
        },
        brackets: [
            ['{', '}'],
            ['[', ']'],
            ['(', ')']
        ],
        autoClosingPairs: [
            { open: '[', close: ']' },
            { open: '{', close: '}' },
            { open: '(', close: ')' },
            { open: "'", close: "'", notIn: ['string', 'comment'] },
            { open: '"', close: '"', notIn: ['string'] }
        ]
    });
    
    monaco.languages.setMonarchTokensProvider('glsl', {
        defaultToken: '',
        tokenPostfix: '.glsl',
        types: [ 'bool', 'bvec2', 'bvec3', 'bvec4', 'float', 'int', 'ivec2', 'ivec3', 'ivec4', 'mat2', 'mat2x2', 'mat2x3', 'mat2x4', 'mat3', 'mat3x2', 'mat3x3', 'mat3x4', 'mat4', 'mat4x2', 'mat4x3', 'mat4x4', 'uint', 'uvec2', 'uvec3', 'uvec4', 'vec2', 'vec3', 'vec4', 'void' ],
        keywords: [ 'attribute', 'break', 'case', 'centroid', 'const', 'continue', 'default', 'discard', 'do', 'else', 'false', 'flat', 'for', 'highp', 'if', 'in', 'inout', 'invariant', 'isampler2D', 'isampler2DArray', 'isampler3D', 'isamplerCube', 'layout', 'lowp', 'mediump', 'out', 'precision', 'return', 'sampler2D', 'sampler2DArray', 'sampler2DArrayShadow', 'sampler2DShadow', 'sampler3D', 'samplerCube', 'samplerCubeShadow', 'smooth', 'struct', 'switch', 'true', 'uniform', 'usampler2D', 'usampler2DArray', 'usampler3D', 'usamplerCube', 'varying', 'while' ],
        functions: [ 'radians', 'degrees', 'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'sinh', 'cosh', 'tanh', 'asinh', 'acosh', 'atanh', 'pow', 'exp', 'log', 'exp2', 'log2', 'sqrt', 'inversesqrt', 'abs', 'sign', 'floor', 'trunc', 'round', 'roundEven', 'ceil', 'fract', 'mod', 'modf', 'min', 'max', 'clamp', 'mix', 'step', 'smoothstep', 'isnan', 'isinf', 'floatBitsToInt', 'floatBitsToUint', 'intBitsToFloat', 'uintBitsToFloat', 'packSnorm2x16', 'unpackSnorm2x16', 'packUnorm2x16', 'unpackUnorm2x16', 'packHalf2x16', 'unpackHalf2x16', 'length', 'distance', 'dot', 'cross', 'normalize', 'faceforward', 'reflect', 'refract', 'matrixCompMult', 'outerProduct', 'transpose', 'determinant', 'inverse', 'lessThan', 'lessThanEqual', 'greaterThan', 'greaterThanEqual', 'equal', 'notEqual', 'any', 'all', 'not', 'textureSize', 'texture', 'texture2D', 'textureCube', 'texture2DProj', 'texture2DLodEXT', 'texture2DProjLodEXT', 'textureCubeLodEXT', 'texture2DGradEXT', 'texture2DProjGradEXT', 'textureCubeGradEXT', 'textureProj', 'textureLod', 'textureOffset', 'texelFetch', 'texelFetchOffset', 'textureProjOffset', 'textureLodOffset', 'textureProjLod', 'textureProjLodOffset', 'textureGrad', 'textureGradOffset', 'textureProjGrad', 'textureProjGradOffset', 'dFdx', 'dFdy', 'fwidth' ],
        operators: [ '++', '--', '+', '-', '~', '!', '*', '/', '%', '<<', '>>', '<', '>', '<=', '>=', '==', '!=', '&', '^', '|', '&&', '^^', '||', '?', ':', '=', '+=', '-=', '*=', '/=', '%=', '<<=', '>>=', '&=', '^=', '|=', ',' ],
        brackets: [
            { token: 'delimiter.curly', open: '{', close: '}' },
            { token: 'delimiter.parenthesis', open: '(', close: ')' },
            { token: 'delimiter.square', open: '[', close: ']' },
            { token: 'delimiter.angle', open: '<', close: '>' }
        ],
        symbols: /[=><!~?:&|+\-*\/\^%]+/,
        integersuffix: /[uU]?/,
        floatsuffix: /[fF]?/,
        func: /[a-zA-Z_0-9]+/,
        tokenizer: {
            root: [
                [/\d*\d+[eE]([\-+]?\d+)?(@floatsuffix)/, 'number.float'],
                [/\d*\.\d+([eE][\-+]?\d+)?(@floatsuffix)/, 'number.float'],
                [/0[xX][0-9a-fA-F']*[0-9a-fA-F](@integersuffix)/, 'number.hex'],
                [/([+-]?)\d+(@integersuffix)/, 'number.integer'],
                [/#(version|define|undef|ifdef|ifndef|else|elsif|endif)/, 'keyword.directive'],
                [/\$[a-zA-Z0-9]*/, 'regexp'],
                [/\s[A-Z_][A-Z_0-9]*/, 'constant'],
                [/gl_[a-zA-Z_0-9]+/, 'keyword.gl'],
                [
                    /([a-zA-Z_][a-zA-Z_0-9]*)/,
                    {
                        cases: {
                            '@types': { token: 'keyword.$0' },
                            '@keywords': { token: 'keyword.$0' },
                            '@functions': { token: 'keyword.builtins.$0' },
                            '@default': 'identifier'
                        }
                    }
                ],
                [/(\d+(\.\d+))/, 'number.float'],
                [/\d+/, 'keyword'],
                [/\/\/.+/, 'comment'],
                [/\/\*.+?(\*\/)/, 'comment'],
                [/[{}()\[\]]/, '@brackets'],
                [
                    /@symbols/,
                    {
                        cases: {
                            '@operators': 'delimiter',
                            '@default': ''
                        }
                    }
                ],
                [/[;,.]/, 'delimiter'],
            ],
        }
    });
}


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
var f_o_ruleset__selectable_element = function(s_class_name)
{
    return {
        "s_selector": ` .${s_class_name}`, 
        o_rules:{
            "padding":"1rem",
            "background":"rgba(111,111,111,0.2)"
        }, 
        a_o_ruleset: [
            {
                "s_selector": ":hover, .active", 
                o_rules:{
                    "background":"rgba(0.8,0.8,0.8,0.8) !important"
                }, 
            },
    
        ]
    }
} 
var o_rules__bg_and_fg = {
    "background-color": "${o_functions.f_s_color_to_rgba(o_colors.o_background)}",
    "color": "${o_functions.f_s_color_to_rgba(o_colors.o_foreground)}",
}
var o_rules__full_width_box = {
    "width": "100%", 
    "padding": "0.5rem"
}
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
                        ...o_rules__bg_and_fg,
                        "display": "flex", 
                        "align-items": "center", 
                        "justify-content": "center", 
                },
                a_o_ruleset: [
                    {
                        "s_selector":" .d-flex", 
                        o_rules:{
                            "display": "flex",
                        }
                    },
                    {
                        "s_selector":" select", 
                        o_rules:{
                            "display": "flex",
                            ...o_rules__bg_and_fg,
                            ...o_rules__full_width_box
                        }
                    },
                    {
                        "s_selector":" canvas", 
                        o_rules:{
                            "width" :"100%",
                            "height" :"100%"
                        }
                    },
                    {
                        "s_selector": " .o_canvas", 
                        o_rules:{
                            "width": "100%", 
                            "height": "100%",
                            "aspect-ratio":"1", 
                            "max-height": "100vh",
                            "height": "100vh"
                        }
                    },

                    {
                        "s_selector": " #o_monaco_editor_div", 
                        o_rules:{
                            "width": "100%", 
                            "height": "100vh",
                            "aspect-ratio":"1", 

                        }
                    },
                    // ...a_o_ruleset_spacing,
                    {
                        "s_selector": " .d_flex", 
                        o_rules:{
                            "display":"flex"
                        }
                    },
                    {
                        "s_selector": " .a_o_monaco_editor_tab", 
                        o_rules:{
                            "display":"flex", 
                            ...o_rules__bg_and_fg,
                            "overflow-x":"auto", 
                            "max-width": "100%"
                        }, 
                        a_o_ruleset: [
                            f_o_ruleset__selectable_element('o_monaco_editor_tab')
                        ]
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
            "class": "d-flex",
            //'s_inner_html': "Innerhtml working!",

                    "a_c":[
                        {
                            "class": "o_canvas", 
                            "a_c":[
                                {
                                    "s_t": "canvas",
                                }
                            ]
                        },
                        {
                            "class":"o_program",
                            "a_c": [
                                {
                                    "s_t": "select",
                                    'v-model': "s_o_program_s_name",
                                    'v-on:change':'f_update_o_program_from_s_name(s_o_program_s_name)',
                                    "a_c": [
                                        {
                                            "v-for":"o_program in a_o_program", 
                                            "s_t":"option", 
                                            ":value": "o_program.s_name",
                                            "v-html": "o_program.s_name"
                                        }
                                    ]
                                },
                                {
                                    "class": "a_o_monaco_editor_tab",
                                    "a_c":[
                                        {
                                            ":class": "`o_monaco_editor_tab ${(o_program.o_source_code == o_source_code) ? 'active': ''}`",
                                            "v-for": "o_source_code in o_program.a_o_source_code", 
                                            "v-html":"o_source_code.s_programming_language",
                                            'v-on:click': "f_set_o_monaco_editor_model(o_source_code)"
                                        },               
                                    ]
                                },
                                {
                                    "id": "o_monaco_editor_div", 
                                },   
                            ]
                        },

                    ]
                }, 


    )
);

import { O_program } from "./O_program.module.js";

require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs' } })

window.MonacoEnvironment = {
    getWorkerUrl: function (workerId, label) {
        return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
    self.MonacoEnvironment = {
        baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/'
    };
    importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs/base/worker/workerMain.js');`
        )}`
    }
}


class O_source_code_o_monaco_editor_model{
    constructor(
        o_source_code,
        o_monaco_editor_model, 
        o_view_state = null
    ){
        this.o_source_code = o_source_code,
        this.o_monaco_editor_model = o_monaco_editor_model 
        this.o_view_state = o_view_state
    }
}
// var o_ws = new WebSocket('ws://localhost:8080');

// console.log(document.getElementById("app").innerHTML)
window.o_vue_object = new Vue({
    el: '#app',
    o_static_data_non_watched: { // a custom object which if changed wont trigger the 'updated' function / the whole rectivity system of vue
        a_o_monaco_editor_model: [],
        a_o_source_code_o_monaco_editor_model: [],
        o_monaco_editor_model: null,
        o_monaco_editor: null, 
        f_init: function(){

            // Create WebSocket connection.
            // // Connection opened
            // o_ws.addEventListener('open', (o_event) => {
            //     o_ws.send(JSON.stringify(o_self.o_cursor));
            // });            
            // Listen for messages
            // o_ws.addEventListener('message', (o_event) => {
            //     var o_cursor = JSON.parse(o_event.data);
            //     console.log("o_ws.message() was called!");
            //     // console.log('Message from server ', event.data);
            //     Object.assign(o_self.o_cursor, o_cursor);
            // });
        }
    },
    data: function(){
        return {
                a_o_program: a_o_program,
                o_program: {}, 
                s_o_program_s_name: '',
                a_o_source_code: [],
                o_source_code: {},
            }
    },
    updated: async function(){
        var o_self = this;
        // console.log("o_vue_object.updated() was called!")
        // console.log(o_self.$data)
        // o_self.f_write_o_to_url_fragment(o_self.$data);
    },
    mounted:async function () {
        var o_self = this;


        var o_data_from_url_fragment = o_self.f_o_data__from_url_fragment();
        if(o_data_from_url_fragment){
            var b_o_data_compatible = o_self.f_b_o_data_compatible(o_data_from_url_fragment, o_self.$data);
            if(b_o_data_compatible){
                Object.assign(o_self.$data, o_data_from_url_fragment);
                // Object.assign(o_self.$options.o_static_data_non_watched,o_self.o_static_data_non_watched)
            }
        }
        o_self.$options.o_static_data_non_watched.f_init();
        window.onmouseup = function(){
            // o_self.$data.o_static_data_non_watched = o_vue_object.$options.o_static_data_non_watched;
            console.log(o_self.$data)
            // o_self.$data.b_bool = !o_self.$data.b_bool;
        }

        var o_monaco_editor_div = document.querySelector("#o_monaco_editor_div");
        require(['vs/editor/editor.main'], function () {
            o_self.$options.o_static_data_non_watched.o_monaco_editor = monaco.editor.create(
                o_monaco_editor_div, 
                {
                    model: null,
                    theme: "vs-dark",
                }
            )
            o_self.$options.o_static_data_non_watched.o_monaco_editor.onDidChangeModelContent(function (o_event) {
                // console.log(o_event)
                // console.log(o_self.o_program.o_source_code.s_text)
                o_self.o_program.o_source_code.s_text = o_self.$options.o_static_data_non_watched.o_monaco_editor.getValue();
            });
            for(let o_program of o_self.a_o_program){
                for(let o_source_code of o_program.a_o_source_code){
                    console.log(o_source_code)
                    var o_monaco_editor_model = monaco.editor.createModel(
                        o_source_code.s_text, 
                        o_source_code.s_programming_language, 
                    )
                    var o_source_code_o_monaco_editor_model = new O_source_code_o_monaco_editor_model(
                        o_source_code, 
                        o_monaco_editor_model
                    );
                    o_self.$options.o_static_data_non_watched.a_o_source_code_o_monaco_editor_model.push(o_source_code_o_monaco_editor_model);
                    o_self.$options.o_static_data_non_watched.a_o_monaco_editor_model.push(o_monaco_editor_model);
                }
            }

            o_self.o_program = o_self.a_o_program[0];
            o_self.o_program.o_source_code = o_self.o_program.a_o_source_code[0];
            // o_monaco_editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => console.log("hello world"))
        });


        document.addEventListener("keydown", function (e) {
            if (e.key === 's' && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
                e.preventDefault();
                o_self.f_run_o_program();
            }
        }, false);
    },
    watch: {

        o_program: function(){
            var o_self = this
            console.log("asdf")
            o_self.f_set_o_monaco_editor_model(o_self.o_program.o_source_code)
            o_self.s_o_program_s_name = o_self.o_program.s_name
        }
    },
    methods: {
        f_clear_all_running_animation_frames: function(){
            var n_id = window.requestAnimationFrame(function(){});
            while(n_id--){
                window.cancelAnimationFrame(n_id);
            }
        },
        f_update_o_program_from_s_name: function(
            s_o_program_s_name
        ){
            var o_self = this;
            var o_program = o_self.a_o_program.filter(
                o => o.s_name == s_o_program_s_name
            )[0];
            o_self.o_program = o_program;
            
        },
        f_o_source_code_o_monaco_editor_model_from_o_source_code: function(
            o_source_code
        ){
            var o_self = this
            var o_source_code_o_monaco_editor_model = o_self.$options.o_static_data_non_watched.a_o_source_code_o_monaco_editor_model.filter(
                function(o){
                    return o.o_source_code == o_source_code 
                }
            )[0];
            return o_source_code_o_monaco_editor_model
        }, 
        f_o_source_code_o_monaco_editor_model_from_o_monaco_edito_model: function(
            o_monaco_editor_model
        ){
            var o_self = this
            var o_source_code_o_monaco_editor_model = o_self.$options.o_static_data_non_watched.a_o_source_code_o_monaco_editor_model.filter(
                function(o){
                    return o.o_monaco_editor_model == o_monaco_editor_model 
                }
            )[0];
            return o_source_code_o_monaco_editor_model
        }, 
        f_set_o_monaco_editor_model: function(
            o_source_code
        ){
            
            var o_self = this;
            o_self.o_program.o_source_code = o_source_code

            var o_source_code_o_monaco_editor_model__old = o_self.f_o_source_code_o_monaco_editor_model_from_o_monaco_edito_model(
                o_self.$options.o_static_data_non_watched.o_monaco_editor.getModel()
            );
            if(o_source_code_o_monaco_editor_model__old){
                o_source_code_o_monaco_editor_model__old.o_view_state = 
                    o_self.$options.o_static_data_non_watched.o_monaco_editor.saveViewState()
            }
            var o_source_code_o_monaco_editor_model = o_self.f_o_source_code_o_monaco_editor_model_from_o_source_code(
                o_source_code
            );
            if(o_source_code_o_monaco_editor_model){
                o_self.$options.o_static_data_non_watched.o_monaco_editor.setModel(
                    o_source_code_o_monaco_editor_model.o_monaco_editor_model
                );
                if(o_source_code_o_monaco_editor_model.o_view_state){
                    o_self.$options.o_static_data_non_watched.o_monaco_editor.restoreViewState(
                        o_source_code_o_monaco_editor_model.o_view_state
                    )
                }

            }
        },


        f_run_o_program: function(){
            // alert('captured');
            var o_self = this;
            o_self.f_clear_all_running_animation_frames();
            var o_monaco = o_self.$options.o_static_data_non_watched.o_monaco_editor.o_editor;
            var o_source_code__javascript = o_self.o_program.a_o_source_code.filter(
                o => o.s_programming_language == "javascript"
            )[0];
            var s_function_body = o_source_code__javascript.s_text;
            try {
                var s_function_body = `${s_function_body}`;
                // if(!o_monaco.a_n_view_zone_id){
                //     o_monaco.a_n_view_zone_id = [];
                // }
                // o_monaco.changeViewZones(function (o_change_accessor) {
                //     for(let n_view_zone_id of o_monaco.a_n_view_zone_id){
                //         o_change_accessor.removeZone(n_view_zone_id)
                //     }
                // });
                var f_function = new Function('o', s_function_body)
                var o_canvas_element = document.querySelector("canvas");
                // this removes the event listeners
                var o_canvas_element__new = document.createElement("canvas");
                o_canvas_element.replaceWith(o_canvas_element__new);
                f_function(
                    {
                        o_canvas: o_canvas_element__new,
                        o_program: o_self.o_program
                    }
                );
            } catch (o_e) {
                // alert(o_e.message)
                console.log(o_e);
                console.log(s_function_body)
                // window.o_e = o_e;
                // var a_s_num_charindex_and_s_num_lineindex = o_e.stack.split('\n')[1].split(',')[1].split(':').slice(1);
                // var n_lineindex = parseInt(a_s_num_charindex_and_s_num_lineindex[0]) - 2;
                // var n_charindex = parseInt(a_s_num_charindex_and_s_num_lineindex[1]);
    
                // // Add a zone to make hit testing more interesting
    
                // o_monaco_editor.changeViewZones(function (o_change_accessor) {
                //     var o_div_error = document.createElement('div');
                //     o_div_error.innerText = ' '.repeat(n_charindex-1)+'^ '+o_e.message;
                //     // o_div_error.innerText = '^ ' + o_e.message;
                //     // o_div_error.style.whiteSpace = document.querySelector(".monaco-mouse-cursor-text").style;
                //     var o_editor_element = document.querySelector(".monaco-mouse-cursor-text");
                //     o_div_error.style.background = '#6a0404';
                //     o_div_error.style.color = "#eee";
                //     o_div_error.style.zIndex = 1;
                //     o_div_error.style.whiteSpace = "pre";
                //     o_div_error.style.fontFamily = o_editor_element.style.fontFamily;
                //     o_div_error.style.fontSize = o_editor_element.style.fontSize;
                //     o_monaco_editor.a_n_view_zone_id.push(
                //         o_change_accessor.addZone({
                //             afterLineNumber: n_lineindex,
                //             heightInLines: 3,
                //             domNode: o_div_error
                //         })
                //     );
                // });
            }
        },

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



