

var f_resize_canvas = function(o_canvas){
  o_canvas.width = window.innerHeight;// done on purpose, so the ratio is 1:1
  o_canvas.height = window.innerHeight;
}
var f_add_resize_listener = function(o_canvas){
  window.onresize = function(){
    f_resize_canvas(o_canvas);
  }
}
window.o_examples = {
  s_function_name: '',
  f_clear_color : function(o_canvas){
    // console.log(this.name)
  
    const o_gl = o_canvas.getContext("webgl2");
  
    // Set clear color to black, fully opaque
    o_gl.clearColor(.5, .2, .8, 1.0);
    // Clear the color buffer with specified clear color
    o_gl.clear(o_gl.COLOR_BUFFER_BIT);
  
  },

  f_simple_animation: function(o_canvas){
    // console.log(this.name)
  
    const o_gl = o_canvas.getContext("webgl2");
  
    // Set clear color to black, fully opaque
    o_gl.clearColor(.2, .9, .2, 0.2);
    // Clear the color buffer with specified clear color
    o_gl.clear(o_gl.COLOR_BUFFER_BIT);

    var f = function(){
    
      // Set clear color to black, fully opaque
      o_gl.clearColor((window.performance.now()*0.002%1.), .9, .2, 0.2);
      // Clear the color buffer with specified clear color
      o_gl.clear(o_gl.COLOR_BUFFER_BIT);

      requestAnimationFrame(f);
    }
    f();
  
  },
  f_simple_shaders : function(o_canvas){

    // const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    // const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
  
    // // Create the shader program
  
    // const shaderProgram = gl.createProgram();
    // gl.attachShader(shaderProgram, vertexShader);
    // gl.attachShader(shaderProgram, fragmentShader);
    // gl.linkProgram(shaderProgram);
  
    // // If creating the shader program failed, alert
  
    // if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    //   alert(
    //     `Unable to initialize the shader program: ${gl.getProgramInfoLog(
    //       shaderProgram
    //     )}`
    //   );
    //   return null;
    // }
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

for(let s_prop_name in o_examples){

  let s_function_name = s_prop_name;
  if(s_prop_name.indexOf("f_") != 0){
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


document.addEventListener("keydown", function(e) {
  if (e.key === 's' && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
    e.preventDefault();
    // alert('captured');
    var o_monaco_editor =o_examples[`o_monaco_editor_${o_examples.s_function_name}`]; 
    console.log(o_monaco_editor)
    var s_function_body = o_monaco_editor.getValue();
    try {
      o_examples[o_examples.s_function_name] = new Function('o_canvas', `(${s_function_body})(o_canvas)`)
      o_examples[o_examples.s_function_name](o_examples[`o_canvas_${o_examples.s_function_name}`])
    } catch (o_e) {
      // alert(o_e.message)
      console.log(o_e);
      window.o_e = o_e;
      var a_s_num_charindex_and_s_num_lineindex = o_e.stack.split('\n')[1].split(',')[1].split(':').slice(1);
      var n_charindex = parseInt(a_s_num_charindex_and_s_num_lineindex[0]);
      var n_lineindex = parseInt(a_s_num_charindex_and_s_num_lineindex[1]);

      // Add a zone to make hit testing more interesting
      var viewZoneId = null;
      o_monaco_editor.changeViewZones(function (changeAccessor) {
        var domNode = document.createElement('div');
          domNode.innerText = o_e.message;
        domNode.style.background = 'lightgreen';
        viewZoneId = changeAccessor.addZone({
          afterLineNumber: n_lineindex,
          heightInLines: 3,
          domNode: domNode
        });
      });
    }
  }
}, false);
var o_window_location_hash = {};
o_select.onchange = function(){
  // console.log(this.value)
  o_window_location_hash.s_function_name = this.value;
  f_update_window_location_hash(o_window_location_hash)
  f_update_s_function_name(this.value)
}
var f_update_s_function_name = function(s_function_name){
  o_select.value = s_function_name;
  o_examples.s_function_name = s_function_name;
  var a_o_div = Array.prototype.slice.call(document.querySelectorAll(".o_div"));
  for(var o_div of a_o_div){
    o_div.style.display = "none";
  }
  document.querySelector(`.o_div.${o_examples.s_function_name}`).style.display = 'flex'
}

if(!document.createElement("canvas").getContext("webgl2")){
  alert("your browser does not support webgl2")
}

var f_s_json_b64__from_o = function(o){
  var s_json = JSON.stringify(o);
  var s_json_b64 = btoa(s_json);
  return s_json_b64
}

var f_o_from__s_json_b64 = function(s_json_b64){
  var s_json = atob(s_json_b64);
  var o = JSON.parse(s_json);
  return o
}
if(window.location.hash != ''){
  var s_json_b64 = window.location.hash.substring(1,);
  o_window_location_hash = f_o_from__s_json_b64(s_json_b64);
  // console.log(o)
  if(o_window_location_hash.s_function_name){
    f_update_s_function_name(o_window_location_hash.s_function_name)
  }
}

var f_update_window_location_hash = function(o){
  window.location.hash = f_s_json_b64__from_o(o);
}
