


const o_process = Deno.run({
    cmd: "gphoto2".split(" "), 
    // cmd : "/snap/bin/gphoto2 --version".split(" "),
    stdout: "piped",
    stderr: "piped"
});

const output = await o_process.output()
const err = await o_process.stderrOutput()

const s_out = new TextDecoder().decode(output);
const s_err = new TextDecoder().decode(err);
console.log(s_out, s_err)