// run me like this : 
// $ deno run --allow-all deno_dot_run_not_working.js
var o_current_run_info = {
    a_s_argument : Deno.args,
    s_current_path_name_file_name : import.meta.url.split('//')
}
console.log(o_current_run_info)


import {existsSync} from "https://deno.land/std/fs/mod.ts";

var pathFound = existsSync("/usr/bin/gphoto2")
console.log(pathFound)


const o_process = Deno.run({

    cmd: "gphoto2 --version".split(" "),  //on my other pc this works
    
    stdout: "piped",
    stderr: "piped"
});

const output = await o_process.output()
const err = await o_process.stderrOutput()
// console.log(err)
// console.log(output)
const s_out = new TextDecoder().decode(output);
const s_err = new TextDecoder().decode(err);
console.log(s_out, s_err)
