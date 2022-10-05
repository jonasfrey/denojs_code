
// $ deno run --allow-all --unstable which_gphoto2.js

import {existsSync} from "https://deno.land/std/fs/mod.ts";

// var pathFound = existsSync("/usr/bin/gphoto2")
// var pathFound = existsSync("/snap/bin/gphoto2")
var pathFound = existsSync("./gphoto2.sh")
console.log(pathFound)

const o_process = Deno.run({
    // cmd: "which python3".split(" "), // this works
    // cmd: "which gphoto2".split(" "),  //this doesnt work
    // cmd: "whoami".split(" "),  //this doesnt work
    // cmd: "ls -la /home/ubuntuuser/miniconda3/bin/python3".split(" "),  //this works
    // cmd: "which gphoto2".split(" "),  //this doesnt work
    cmd: "./gphoto2.sh --version".split(" "),  //this doesnt work
    // cmd : "/snap/bin/gphoto2 --version".split(" "),
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