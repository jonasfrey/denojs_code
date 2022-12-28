

var f_resize_canvas = function (o_canvas) {
    o_canvas.width = window.innerHeight;// done on purpose, so the ratio is 1:1
    o_canvas.height = window.innerHeight;
}
var f_add_resize_listener = function (o_canvas) {
    window.onresize = function () {
        f_resize_canvas(o_canvas);
    }
}
window.o_examples = {
    s_example_name : '',
    s_function_name: '',
    f_clear_color: function (o_canvas) {
        // console.log(this.name)

        const o_gl = o_canvas.getContext("webgl2");

        // Set clear color to black, fully opaque
        o_gl.clearColor(.5, .2, .8, 1.0);
        // Clear the color buffer with specified clear color
        o_gl.clear(o_gl.COLOR_BUFFER_BIT);

    },

    f_simple_animation: function (o_canvas) {
        // console.log(this.name)

        const o_gl = o_canvas.getContext("webgl2");

        // Set clear color to black, fully opaque
        o_gl.clearColor(.2, .9, .2, 0.2);
        // Clear the color buffer with specified clear color
        o_gl.clear(o_gl.COLOR_BUFFER_BIT);

        var f = function () {

            // Set clear color to black, fully opaque
            o_gl.clearColor((window.performance.now() * 0.002 % 1.), .9, .2, 0.2);
            // Clear the color buffer with specified clear color
            o_gl.clear(o_gl.COLOR_BUFFER_BIT);

            requestAnimationFrame(f);
        }
        f();

    },
    f_random_color_by_clicking : function (o_canvas) {
        // console.log(this.name)

        const o_gl = o_canvas.getContext("webgl2");

        // Set clear color to black, fully opaque
        o_gl.clearColor(.5, .2, .8, 1.0);
        // Clear the color buffer with specified clear color
        o_gl.clear(o_gl.COLOR_BUFFER_BIT);
        window.onclick = function(){
            const o_gl = o_canvas.getContext("webgl2");

            // Set clear color to black, fully opaque
            o_gl.clearColor(Math.random(), Math.random(),Math.random(),1.0);
            // Clear the color buffer with specified clear color
            o_gl.clear(o_gl.COLOR_BUFFER_BIT);
            
        }
    },
    f_read_pixels : function (o_canvas) {
        // console.log(this.name)

        const o_gl = o_canvas.getContext("webgl2");

        window.onclick = function(){
            const o_gl = o_canvas.getContext("webgl2");

            // Set clear color to black, fully opaque
            o_gl.clearColor(Math.random(), Math.random(),Math.random(),1.0);
            // Clear the color buffer with specified clear color
            o_gl.clear(o_gl.COLOR_BUFFER_BIT);
            var n_channels = 4; // [..., r, g, b, a, ...]
            const a_nu8 = new Uint8Array(
                o_gl.drawingBufferWidth
                 * o_gl.drawingBufferHeight
                 * n_channels
            );
            o_gl.readPixels(
                0,//x
                0,//y
                o_gl.drawingBufferWidth,
                o_gl.drawingBufferHeight,
                o_gl.RGBA,//format
                o_gl.UNSIGNED_BYTE,//type
                a_nu8
            );

            console.log(a_nu8); //  [r, g, b, a, r, g, b, a, ...]       

        }
    },
    f_simple_triangle : function(o_canvas){
        function init() {
            // Init WebGL context
            const o_gl = o_canvas.getContext("webgl2");
            // Init shaders
            var s_vertex_shader = `
            attribute vec4 o_position;
            void main() {
            gl_Position = o_position;
            }
            `;
            var s_fragment_shader = `
            void main() {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
            }
            `;

            // Compile shaders
            var o_shader_compiled__vertex = f_o_shader_compiled(o_gl, s_vertex_shader, o_gl.VERTEX_SHADER);
            var o_shader_compiled__fragment = f_o_shader_compiled(o_gl, s_fragment_shader, o_gl.FRAGMENT_SHADER);
    
            // Create program
            var o_gl_program = o_gl.createProgram();
    
            // Attach and link shaders to the program
            o_gl.attachShader(o_gl_program, o_shader_compiled__vertex);
            o_gl.attachShader(o_gl_program, o_shader_compiled__fragment);
            o_gl.linkProgram(o_gl_program);
            if (!o_gl.getProgramParameter(o_gl_program, o_gl.LINK_STATUS)) {
                alert("Unable to initialize the shader program");
                return false;
            }
    
            // Use program
            o_gl.useProgram(o_gl_program);
            o_gl.program = o_gl_program;
    
            // Vertices
            var n_dimensions = 3;
            var a_n_vertex_axisvalue = new Float32Array([// [ x, y, z, x, y, z, ...]
                //x    y     z 
                +0.0, +0.5, +0.0,
                -0.5, -0.5, +0.0,
                +0.5, -0.5, +0.0
            ]);
    
            // Create a buffer object
            var o_buffer__vertex = o_gl.createBuffer();
            if (!o_buffer__vertex) {
                console.log('Failed to create the buffer object');
                return -1;
            }
            o_gl.bindBuffer(o_gl.ARRAY_BUFFER, o_buffer__vertex);
            o_gl.bufferData(o_gl.ARRAY_BUFFER, a_n_vertex_axisvalue, o_gl.STATIC_DRAW);
    
            // Assign the a_n_vertex_axisvalue in buffer object to o_position variable
            var o_attrloc__o_position = o_gl.getAttribLocation(o_gl.program, 'o_position');
            if (o_attrloc__o_position < 0) {
                console.log('Failed to get the storage location of o_position');
                return -1;
            }
            o_gl.vertexAttribPointer(o_attrloc__o_position, n_dimensions, o_gl.FLOAT, false, 0, 0);
            o_gl.enableVertexAttribArray(o_attrloc__o_position);
    
            // Return number of a_n_vertex_axisvalue
            var n = a_n_vertex_axisvalue.length / n_dimensions;

            if (n < 0) {
                console.log('Failed to set the positions of the vertices');
                return;
            }
    
            // Clear canvas
            o_gl.clearColor(0.0, 0.0, 0.0, 1.0);
            o_gl.clear(o_gl.COLOR_BUFFER_BIT);
    
            // Draw
            o_gl.drawArrays(o_gl.TRIANGLES, 0, n);
        }
    
    

        function f_o_shader_compiled(o_gl, s_shader_sourcecode, n_gl_shader_type) {
            var o_shader_compiled = o_gl.createShader(n_gl_shader_type);
            o_gl.shaderSource(o_shader_compiled, s_shader_sourcecode);
            o_gl.compileShader(o_shader_compiled);
            if (!o_gl.getShaderParameter(o_shader_compiled, o_gl.COMPILE_STATUS)) {
                alert("Error compiling shader: " + o_gl.getShaderInfoLog(o_shader_compiled));
                return;
            }
            return o_shader_compiled;
        }
        init();
    },
    f_simple_triangle_pass_position_from_vertex_to_fragment : function(o_canvas) {
        function init() {
            // Init WebGL context
            const o_gl = o_canvas.getContext("webgl2");
            // Init shaders
            var s_vertex_shader = `
                varying vec3 vPos;
                attribute vec4 o_position;
                void main() {
                    vec4 o_pos = o_position;
                    vPos = o_pos.xyz;
    
                    o_pos.x = o_pos.x+0.5;
                    gl_Position = o_pos;
                }
                `;
            var s_fragment_shader = `
                precision highp float;
                varying vec3 vPos;
                void main() {
    
                gl_FragColor = vec4(1.0, sin(vPos.x*6.2831*20.), 0.0, 1.0);
                }
                `;
    
            // Compile shaders
            var o_shader_compiled__vertex = f_o_shader_compiled(o_gl, s_vertex_shader, o_gl.VERTEX_SHADER);
            var o_shader_compiled__fragment = f_o_shader_compiled(o_gl, s_fragment_shader, o_gl.FRAGMENT_SHADER);
    
            // Create program
            var o_gl_program = o_gl.createProgram();
    
            // Attach and link shaders to the program
            o_gl.attachShader(o_gl_program, o_shader_compiled__vertex);
            o_gl.attachShader(o_gl_program, o_shader_compiled__fragment);
            o_gl.linkProgram(o_gl_program);
            if (!o_gl.getProgramParameter(o_gl_program, o_gl.LINK_STATUS)) {
                alert("Unable to initialize the shader program");
                return false;
            }
    
            // Use program
            o_gl.useProgram(o_gl_program);
            o_gl.program = o_gl_program;
    
            // Vertices
            var n_dimensions = 3;
            var a_n_vertex_axisvalue = new Float32Array([// [ x, y, z, x, y, z, ...]
                //x    y     z 
                +0.1, +0.5, +0.0,
                -0.5, -0.5, +0.0,
                +0.5, -0.5, +0.0
            ]);
    
            // Create a buffer object
            var o_buffer__vertex = o_gl.createBuffer();
            if (!o_buffer__vertex) {
                console.log('Failed to create the buffer object');
                return -1;
            }
            o_gl.bindBuffer(o_gl.ARRAY_BUFFER, o_buffer__vertex);
            o_gl.bufferData(o_gl.ARRAY_BUFFER, a_n_vertex_axisvalue, o_gl.STATIC_DRAW);
    
            // Assign the a_n_vertex_axisvalue in buffer object to o_position variable
            var o_attrloc__o_position = o_gl.getAttribLocation(o_gl.program, 'o_position');
            if (o_attrloc__o_position < 0) {
                console.log('Failed to get the storage location of o_position');
                return -1;
            }
            o_gl.vertexAttribPointer(o_attrloc__o_position, n_dimensions, o_gl.FLOAT, false, 0, 0);
            o_gl.enableVertexAttribArray(o_attrloc__o_position);
    
            // Return number of a_n_vertex_axisvalue
            var n = a_n_vertex_axisvalue.length / n_dimensions;
    
            if (n < 0) {
                console.log('Failed to set the positions of the vertices');
                return;
            }
    
            // Clear canvas
            o_gl.clearColor(0.0, 0.0, 0.0, 1.0);
            o_gl.clear(o_gl.COLOR_BUFFER_BIT);
    
            // Draw
            o_gl.drawArrays(o_gl.TRIANGLES, 0, n);
        }
    
    
    
        function f_o_shader_compiled(o_gl, s_shader_sourcecode, n_gl_shader_type) {
            var o_shader_compiled = o_gl.createShader(n_gl_shader_type);
            o_gl.shaderSource(o_shader_compiled, s_shader_sourcecode);
            o_gl.compileShader(o_shader_compiled);
            if (!o_gl.getShaderParameter(o_shader_compiled, o_gl.COMPILE_STATUS)) {
                alert("Error compiling shader: " + o_gl.getShaderInfoLog(o_shader_compiled));
                return;
            }
            return o_shader_compiled;
        }
        init();
    }


}


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


var o_select = document.createElement("select");
document.body.appendChild(o_select);



for (let s_prop_name in o_examples) {

    let s_function_name = s_prop_name;

    if (s_prop_name.indexOf("f_") != 0) {
        continue;
    }

    console.log(s_prop_name)
    
    let f = o_examples[s_function_name];
    console.log(s_function_name)
    var o_div = document.createElement("div")
    o_div.className = s_function_name + " o_div";

    var o_canvas = document.createElement("canvas");
    o_canvas.className = s_function_name + " o_canvas";
    o_div.appendChild(o_canvas);
    document.body.appendChild(o_div);


    let o_editor = document.createElement("div");
    o_editor.className = "o_editor ";

    o_div.appendChild(o_editor)
    require(['vs/editor/editor.main'], function () {
        let o_monaco_editor = monaco.editor.create(o_editor, {
            value: f.toString(),
            language: 'javascript',
            theme: "vs-dark",
        })
        o_examples[`o_monaco_editor_${s_function_name}`] = o_monaco_editor;
        // o_monaco_editor.onDidChangeModelContent(function (e) {
        //   console.log(e)
        //   var s_function_body = o_monaco_editor.getValue();
        //   console.log(o_monaco_editor.getValue())
        // });
        // o_monaco_editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => console.log("hello world"))
    })


    o_examples[`o_canvas_${s_function_name}`] = o_canvas;

    f_add_resize_listener(o_canvas);
    f_resize_canvas(o_canvas);
    f(o_canvas);

    var o_option = document.createElement("option");
    o_option.value = s_function_name;
    o_option.innerHTML = s_function_name;
    o_select.appendChild(o_option);
}


var f_run_example = function(){
            // alert('captured');
            let o_monaco_editor = o_examples[`o_monaco_editor_${o_examples.s_function_name}`];
            console.log(o_monaco_editor)
            var s_function_body = o_monaco_editor.getValue();
            try {
                var s_function_body = `(${s_function_body})(o_canvas)`;
                if(!o_monaco_editor.a_n_view_zone_id){
                    o_monaco_editor.a_n_view_zone_id = [];
                }
                o_monaco_editor.changeViewZones(function (o_change_accessor) {
                    for(let n_view_zone_id of o_monaco_editor.a_n_view_zone_id){
                        o_change_accessor.removeZone(n_view_zone_id)
                    }
                });
                o_examples[o_examples.s_function_name] = new Function('o_canvas', s_function_body)
                o_examples[o_examples.s_function_name](o_examples[`o_canvas_${o_examples.s_function_name}`])
            } catch (o_e) {
                // alert(o_e.message)
                // console.log(o_e);
                // console.log(s_function_body)
                // window.o_e = o_e;
                var a_s_num_charindex_and_s_num_lineindex = o_e.stack.split('\n')[1].split(',')[1].split(':').slice(1);
                var n_lineindex = parseInt(a_s_num_charindex_and_s_num_lineindex[0]) - 2;
                var n_charindex = parseInt(a_s_num_charindex_and_s_num_lineindex[1]);
    
                // Add a zone to make hit testing more interesting
    
                o_monaco_editor.changeViewZones(function (o_change_accessor) {
                    var o_div_error = document.createElement('div');
                    o_div_error.innerText = ' '.repeat(n_charindex-1)+'^ '+o_e.message;
                    // o_div_error.innerText = '^ ' + o_e.message;
                    // o_div_error.style.whiteSpace = document.querySelector(".monaco-mouse-cursor-text").style;
                    var o_editor_element = document.querySelector(".monaco-mouse-cursor-text");
                    o_div_error.style.background = '#6a0404';
                    o_div_error.style.color = "#eee";
                    o_div_error.style.zIndex = 1;
                    o_div_error.style.whiteSpace = "pre";
                    o_div_error.style.fontFamily = o_editor_element.style.fontFamily;
                    o_div_error.style.fontSize = o_editor_element.style.fontSize;
                    o_monaco_editor.a_n_view_zone_id.push(
                        o_change_accessor.addZone({
                            afterLineNumber: n_lineindex,
                            heightInLines: 3,
                            domNode: o_div_error
                        })
                    );
                });
            }
}
var o_button_run = document.createElement("button");
o_button_run.className = "o_button_run";
o_button_run.innerHTML = "RUN (ctrl+s)"
o_button_run.onclick = function(){
    f_run_example();
}
document.body.appendChild(o_button_run);
document.addEventListener("keydown", function (e) {
    if (e.key === 's' && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
        f_run_example();
    }
}, false);

var o_window_location_hash = {};
o_select.onchange = function () {
    // console.log(this.value)
    o_window_location_hash.s_function_name = this.value;
    f_update_window_location_hash(o_window_location_hash)
    f_update_s_function_name(this.value)
}
var f_update_s_function_name = function (s_function_name) {
    o_select.value = s_function_name;
    o_examples.s_function_name = s_function_name;
    window.o_monaco_editor = o_examples['o_monaco_editor_' + s_function_name];
    var a_o_div = Array.prototype.slice.call(document.querySelectorAll(".o_div"));
    for (var o_div of a_o_div) {
        o_div.style.display = "none";
    }
    document.querySelector(`.o_div.${o_examples.s_function_name}`).style.display = 'flex'
}

if (!document.createElement("canvas").getContext("webgl2")) {
    alert("your browser does not support webgl2")
}

var f_s_json_b64__from_o = function (o) {
    var s_json = JSON.stringify(o);
    var s_json_b64 = btoa(s_json);
    return s_json_b64
}

var f_o_from__s_json_b64 = function (s_json_b64) {
    var s_json = atob(s_json_b64);
    var o = JSON.parse(s_json);
    return o
}
// if (window.location.hash != '') {
//     var s_json_b64 = window.location.hash.substring(1,);
//     o_window_location_hash = f_o_from__s_json_b64(s_json_b64);
//     // console.log(o)
//     if (o_window_location_hash.s_function_name) {
//         f_update_s_function_name(o_window_location_hash.s_function_name)
//     }
// }

var f_update_window_location_hash = function (o) {
    // window.location.hash = f_s_json_b64__from_o(o);
}
