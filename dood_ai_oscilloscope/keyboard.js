// visit https://dood.al/oscilloscope/
// paste this scritp into the console 
// press alt+[anykey] to store the current input settings
// perss [anykey] to recall the settings
// with this you can create your custom keyboard 
var o_a_o_input = {};
var b_alt_down = false; 
window.onkeyup = function(){

    if(window.event.key === 'Alt'){
        b_alt_down = false; 
    }  
}
window.onkeydown = function(){

    if(window.event.key === 'Alt'){
        b_alt_down = true; 
    }
    if(b_alt_down){
        o_a_o_input[window.event.keyCode] = f_a_o_input();
    }else{
        if(o_a_o_input[window.event.keyCode]){
            f_apply_a_o_input(o_a_o_input[window.event.keyCode])
        }
    }
}
var f_apply_a_o_input = function(a_o_input){
    
    Array.prototype.slice.apply(document.querySelectorAll("input")).forEach(function(o){
        //a_o_input.push(o.cloneNode())
        for(var o_input of a_o_input){
            if(o_input.id == o.id){
    
                o.value = o_input.value
                o.dispatchEvent(new Event('input', { 'bubbles': true }));
                o.dispatchEvent(new Event('change', { 'bubbles': true }));
                o.dispatchEvent(new Event('keyup', { 'bubbles': true }));
                o.dispatchEvent(new Event('keydown', { 'bubbles': true }));
                UI.compile()
                console.log(o.value)
            }
        
        }
    })
}

var f_a_o_input = function(){

    var a_o_input = [];
    Array.prototype.slice.apply(document.querySelectorAll("input")).forEach(function(o){
        a_o_input.push(o.cloneNode())
    })
    return a_o_input
}
