import { O_program } from "./O_program.module.js";
import { O_source_code } from "./O_source_code.module.js";

var a_o_program = [
    new O_program(
        'clear_color',
        [
            new O_source_code(
                null, 
                'javascript', 
`(${(function(o){

    const o_gl = o.o_canvas.getContext("webgl2");
    // Set clear color to black, fully opaque
    o_gl.clearColor(.5, .2, .8, 1.0);
    // Clear the color buffer with specified clear color
    o_gl.clear(o_gl.COLOR_BUFFER_BIT);  
}).toString()})(o)`
            ), 
            new O_source_code(
                null, 
                'glsl' 
            ), 
            new O_source_code(
                null, 
                'glsl' 
            ), 
        ]
    ),
    new O_program(
        'simple_animation',
        [
            new O_source_code(
                null, 
                'javascript', 
                `
(${(function(o){

    const o_gl = o.o_canvas.getContext("webgl2");
    // Set clear color to black, fully opaque
    o_gl.clearColor(.2, .9, .2, 0.2);
    // Clear the color buffer with specified clear color
    o_gl.clear(o_gl.COLOR_BUFFER_BIT);
    var f = function () {
        // Set clear color to black, fully opaque
        o_gl.clearColor(
            (window.performance.now() * 0.002 % 1.),
            1.-(window.performance.now() * 0.002 % 1.),
            1.,
            1.
        );
        // Clear the color buffer with specified clear color
        o_gl.clear(o_gl.COLOR_BUFFER_BIT);

        requestAnimationFrame(f);
    }
    f();
}).toString()})(o)`
            ), 
            new O_source_code(
                null, 
                'glsl' 
            ), 
            new O_source_code(
                null, 
                'glsl' 
            ), 
        ]
        
    ),
    new O_program(
        'color_by_mouse_coordinates',
        [
            new O_source_code(
                null, 
                'javascript', 
                `
(${(function(o){
    // move your mouse over the canvas! 
    var a_n_axisval__mouse = [0,0];
    o.o_canvas.onmousemove = function(){
        a_n_axisval__mouse[0] = window.event.clientX;
        a_n_axisval__mouse[1] = window.event.clientY;
    }
    const o_gl = o.o_canvas.getContext("webgl2");
    // Set clear color to black, fully opaque
    o_gl.clearColor(.2, .9, .2, 0.2);
    // Clear the color buffer with specified clear color
    o_gl.clear(o_gl.COLOR_BUFFER_BIT);
    var f = function () {
        var o_mouse_nor = {
            x: a_n_axisval__mouse[0]/o.o_canvas.width,
            y: a_n_axisval__mouse[1]/o.o_canvas.height
        }
        // Set clear color to black, fully opaque
        o_gl.clearColor(
            o_mouse_nor.x,
            0.,
            o_mouse_nor.y,
            1.
        );
        // Clear the color buffer with specified clear color
        o_gl.clear(o_gl.COLOR_BUFFER_BIT);

        requestAnimationFrame(f);
    }
    f();
}).toString()})(o)`
            ), 
            new O_source_code(
                null, 
                'glsl' 
            ), 
            new O_source_code(
                null, 
                'glsl' 
            ), 
        ]
        
    ),
    new O_program(
        'random_color_by_clicking', 
        [
            new O_source_code(
                null, 
                'javascript', 
`(${(function(o){

    const o_gl = o.o_canvas.getContext("webgl2");

    // Set clear color to black, fully opaque
    o_gl.clearColor(.5, .2, .8, 1.0);
    // Clear the color buffer with specified clear color
    o_gl.clear(o_gl.COLOR_BUFFER_BIT);
    o.o_canvas.onclick = function(){
        const o_gl = o.o_canvas.getContext("webgl2");

        // Set clear color to black, fully opaque
        o_gl.clearColor(Math.random(), Math.random(),Math.random(),1.0);
        // Clear the color buffer with specified clear color
        o_gl.clear(o_gl.COLOR_BUFFER_BIT);
        
    }
}).toString()})(o)`
            ), 
            new O_source_code(
                null, 
                'glsl' 
            ), 
            new O_source_code(
                null, 
                'glsl' 
            ), 
        ]
        
    ), 
    new O_program(
        'read_pixels', 
        [
            new O_source_code(
                null, 
                'javascript', 
`(${(function(o){

    const o_gl = o.o_canvas.getContext("webgl2");
    // make sure to only use event listeners on the element 'o.o_canvas' 
    o.o_canvas.onclick = function(){
            const o_gl = o.o_canvas.getContext("webgl2");

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
}).toString()})(o)`
            ), 
            new O_source_code(
                null, 
                'glsl' 
            ), 
            new O_source_code(
                null, 
                'glsl' 
            ), 
        ]
       
    ), 
    new O_program(
        'simple_triangle', 
        [
            new O_source_code(
                null, 
                'javascript', 
`(${(function(o){
    function init() {
        // Init WebGL context
        const o_gl = o.o_canvas.getContext("webgl2");

        // Compile shaders
        var a_o_source_code__glsl = o.o_program.a_o_source_code.filter(
            o=> o.s_programming_language == "glsl"
        );
        var s_source_code_glsl_vertex = a_o_source_code__glsl[0].s_text;
        var s_source_code_glsl_fragment = a_o_source_code__glsl[1].s_text;
        
        var o_shader_compiled__vertex = f_o_shader_compiled(o_gl, s_source_code_glsl_vertex, o_gl.VERTEX_SHADER);
        var o_shader_compiled__fragment = f_o_shader_compiled(o_gl, s_source_code_glsl_fragment, o_gl.FRAGMENT_SHADER);

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
}).toString()})(o)`
            ), 
            new O_source_code(
                null, 
                'glsl',
`
attribute vec4 o_position;
void main() {
gl_Position = o_position;
}
                `, 
            ), 
            new O_source_code(
                null, 
                'glsl',
`
void main() {
gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`,
            ), 
        ]
            
    ), 
    new O_program(
        'simple_uniform', 
        [
            new O_source_code(
                null, 
                'javascript', 
`(${(function(o){
    var o_uniform_location__o_trn_mouse = null;
    function init() {
        // Init WebGL context
        const o_gl = o.o_canvas.getContext("webgl2");

        // Compile shaders
        var a_o_source_code__glsl = o.o_program.a_o_source_code.filter(
            o=> o.s_programming_language == "glsl"
        );
        var s_source_code_glsl_vertex = a_o_source_code__glsl[0].s_text;
        var s_source_code_glsl_fragment = a_o_source_code__glsl[1].s_text;
        
        var o_shader_compiled__vertex = f_o_shader_compiled(o_gl, s_source_code_glsl_vertex, o_gl.VERTEX_SHADER);
        var o_shader_compiled__fragment = f_o_shader_compiled(o_gl, s_source_code_glsl_fragment, o_gl.FRAGMENT_SHADER);

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

        // add uniform at init time
        o_uniform_location__o_trn_mouse = o_gl.getUniformLocation(o_gl.program, "o_trn_mouse");

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
        f_render__recursive(o_gl);
    }

    var a_n_axisval__mouse = [0,0];
    o.o_canvas.onmousemove = function(){
        a_n_axisval__mouse[0] = window.event.clientX;
        a_n_axisval__mouse[1] = window.event.clientY;
    }

    function f_render__recursive(o_gl){
        requestAnimationFrame(function(){
            f_render__recursive(o_gl)
        });
        console.log(a_n_axisval__mouse)
        o_gl.uniform1fv(
            o_uniform_location__o_trn_mouse,
            a_n_axisval__mouse
        );
        // Clear canvas
        o_gl.clearColor(0.0, 0.0, 0.0, 1.0);
        o_gl.clear(o_gl.COLOR_BUFFER_BIT);

        // Draw
        o_gl.drawArrays(o_gl.TRIANGLES, 0, 3);
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
}).toString()})(o)`
            ), 
            new O_source_code(
                null, 
                'glsl',
`
attribute vec4 o_position;
void main() {
gl_Position = o_position;
}
                `, 
            ), 
            new O_source_code(
                null, 
                'glsl',
`
precision highp float;
uniform float o_trn_mouse[2];
void main() {
gl_FragColor = vec4(o_trn_mouse[0], 0.0, 0.0, 1.0);

}
`,
            ), 
        ]
            
    ), 
    new O_program(
        'from_yt_tutorial',
        [
        new O_source_code(
            null, 
            'javascript', 
            `(${(
                function(o){
                    // credits: https://www.youtube.com/watch?v=kB0ZVUrI4Aw
                    console.log('This is working');

                    const o_gl = o.o_canvas.getContext("webgl2");
                    const gl = o_gl;
                    // Compile shaders
                    var a_o_source_code__glsl = o.o_program.a_o_source_code.filter(
                        o=> o.s_programming_language == "glsl"
                    );
                    var s_source_code_glsl_vertex = a_o_source_code__glsl[0].s_text;
                    var s_source_code_glsl_fragment = a_o_source_code__glsl[1].s_text;
                
                    if (!gl) {
                        console.log('WebGL not supported, falling back on experimental-webgl');
                        gl = canvas.getContext('experimental-webgl');
                    }
                
                    if (!gl) {
                        alert('Your browser does not support WebGL');
                    }
                
                    gl.clearColor(0.75, 0.85, 0.8, 1.0);
                    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                
                    //
                    // Create shaders
                    // 
                    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
                    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
                
                    gl.shaderSource(vertexShader, s_source_code_glsl_vertex);
                    gl.shaderSource(fragmentShader, s_source_code_glsl_fragment);
                
                    gl.compileShader(vertexShader);
                    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
                        console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
                        return;
                    }
                
                    gl.compileShader(fragmentShader);
                    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
                        console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
                        return;
                    }
                
                    var program = gl.createProgram();
                    gl.attachShader(program, vertexShader);
                    gl.attachShader(program, fragmentShader);
                    gl.linkProgram(program);
                    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                        console.error('ERROR linking program!', gl.getProgramInfoLog(program));
                        return;
                    }
                    gl.validateProgram(program);
                    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
                        console.error('ERROR validating program!', gl.getProgramInfoLog(program));
                        return;
                    }
                
                    //
                    // Create buffer
                    //
                    var triangleVertices = 
                    [ // X, Y,       R, G, B
                        0.0, 0.5,    1.0, 1.0, 0.0,
                        -0.5, -0.5,  0.7, 0.0, 1.0,
                        0.5, -0.5,   0.1, 1.0, 0.6
                    ];
                
                    var triangleVertexBufferObject = gl.createBuffer();
                    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
                
                    var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
                    var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
                    gl.vertexAttribPointer(
                        positionAttribLocation, // Attribute location
                        2, // Number of elements per attribute
                        gl.FLOAT, // Type of elements
                        gl.FALSE,
                        5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
                        0 // Offset from the beginning of a single vertex to this attribute
                    );
                    gl.vertexAttribPointer(
                        colorAttribLocation, // Attribute location
                        3, // Number of elements per attribute
                        gl.FLOAT, // Type of elements
                        gl.FALSE,
                        5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
                        2 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
                    );
                
                    gl.enableVertexAttribArray(positionAttribLocation);
                    gl.enableVertexAttribArray(colorAttribLocation);
                
                    //
                    // Main render loop
                    //
                    gl.useProgram(program);
                    gl.drawArrays(gl.TRIANGLES, 0, 3);
                }
            ).toString()})(o)`
        ), 
        new O_source_code(
            null, 
            `glsl`, 
            `
            precision mediump float;
            
            attribute vec2 vertPosition;
            attribute vec3 vertColor;
            varying vec3 fragColor;
            
            void main()
            {
              fragColor = vertColor;
              gl_Position = vec4(vertPosition, 0.0, 1.0);
            }
            `
        ), 
        new O_source_code(
            null, 
            'glsl', 
            `
            precision mediump float;

            varying vec3 fragColor;
            void main()
            {
            gl_FragColor = vec4(fragColor, 1.0);
            //fancy shit
            //float n_len = length(vec2(0.)-fragColor.xy);
            //gl_FragColor = vec4(vec3(sin(n_len*6.28*10.)), 1.0);
            }
            `
        )
        ]
    )
];

export {a_o_program}