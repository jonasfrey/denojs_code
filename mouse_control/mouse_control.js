// run me like this : 
// $ deno run --allow-all mouse_control.js
//sudo apt-get install libxtst-dev cmake libc-dev libx11-dev libxcb1-dev
// import AutoPilot from 'https://raw.githubusercontent.com/divy-work/autopilot-deno/master/mod.ts';
// var o_current_run_info = {
//     a_s_argument : Deno.args,
//     s_current_path_name_file_name : import.meta.url.split('//')
// }
// console.log(o_current_run_info)


// const pilot = new AutoPilot();

// // pilot.moveMouse(300, 500);

// console.log(pilot.mousePosition());


// import * as keycode from "https://deno.land/x/keycode@v3.1.0/mod.ts";

// import * as denoInput from "https://deno.land/x/deno_input@1.2/mod.ts";

// denoInput.beginListeningToKeyboard(function(e){
//     console.log(e)
// })
// // var input = await denoInput.keyboardInput();

// // console.log(input);

// import { keyboardInput, beginListeningToKeyboard, stopListeningToKeyboard } from "https://deno.land/x/deno_input/mod.ts";

// beginListeningToKeyboard();
// for await ( const hit of keyboardInput() ) {
// 	console.log( hit );
// 	if ( hit.type == 'text' && hit.controlPressed && hit.text == 'c' )
// 		break;
// }

// stopListeningToKeyboard();