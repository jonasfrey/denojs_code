import {existsSync} from "https://deno.land/std/fs/mod.ts";

// run me like this : 
// $ deno run --allow-all execute_command_lesson.js
var o_current_run_info = {
    a_s_argument : Deno.args,
    s_current_path_name_file_name : import.meta.url.split('//')
}
console.log(o_current_run_info)


var f_simple = async function(){

    // simple example 
    const o_process = Deno.run({ cmd: ["ls", "-latrh"] });
    
    console.log(o_process)
    
    // setInterval(function(){
        // console.log(o_process)
        // },1000)
        
        var o_status = await o_process.status();
        console.log("--- after await status")
        
}

var f_piped = async function(){

    // simple example 
    const o_process_piped = Deno.run({ cmd: ["ls", "-latrh"], stdout: "piped", stderr: "piped"});
    
    console.log(o_process_piped)
    
    // setInterval(function(){
        // console.log(o_process)
        // },1000)
        
        var o_status = await o_process_piped.status();
        
        const raw_stdout = await o_process_piped.output();
        const raw_stderr = await o_process_piped.stderrOutput();
        
        console.log(raw_stdout);
        console.log(raw_stderr);
        
        // var s_stdout = raw_stdout.toString();
        var s_stdout = new TextDecoder().decode(raw_stdout);
        console.log(s_stdout)
        
}


var f_with_error_code = async function(){

    const o_process = Deno.run(
        {
            cmd: "ls -la test_file_which_is_not_existing".split(" "), 

        }
    )
    var o_status = await o_process.status();
    console.log(o_status)
    if(!o_status.success){
        console.log(`command has exited with an error code, code: ${n_status_code.code}`);
    }
}


var f_gphoto2_test = async function(){

    // const o_process = Deno.run(
    //     {
    //         cmd: "gphoto2 --auto-detect".split(" "), 
    //     }
    // )
    // const o_process = Deno.run({ cmd: ["gphoto2", "--auto-detect"] });
    // const o_process = Deno.run({ cmd: ["/usr/bin/gphoto2", "--auto-detect"] });
    // const o_process = Deno.run({ cmd: ["python3 ./test.py", "--auto-detect"] });

    // var o_status = await o_process.status();
    // // console.log(o_status)
    // // if(!o_status.success){
    // //     console.log(`command has exited with an error code, code: ${n_status_code.code}`);
    // // }

    // --allow-run



    var pathFound = existsSync("/usr/bin/gphoto2")
    console.log(pathFound)


    var pathFound = existsSync("/home/ubuntuuser/gphoto2")
    console.log(pathFound)

    const o_process = Deno.run({
        // deno needs "--allow-read=/usr"
        cmd: ["/usr/bin/gphoto2", "--version"],
        // cmd: ["ls -la $(which gphoto2)".split(" ")], 
        // cmd: ["ls", "-la", "/usr/bin/gphoto2"], 
        // cmd: "which gphoto2".split(" "), 
        // cmd: "which python3".split(" "), 
        // cmd: "/home/ubuntuuser/gphoto2 --version".split(" "), 
        // cmd: "/home/ubuntuuser/gphoto2 --auto-detect".split(" "), 
        // cmd: ["python3", "--version"], 
        // cmd: ["gphoto2", "--version"], 
        stdout: "piped",
        stderr: "piped"
    });
    
    const output = await o_process.output() // "piped" must be set
    const error = await o_process.stderrOutput();
    const outStr = new TextDecoder().decode(output);
    const s_error = new TextDecoder().decode(error);
    console.log(outStr);
    console.log(s_error);

    // const errorStr = new TextDecoder().decode(error);
    
    // o_process.close(); // Don't forget to close it
    
    // console.log(outStr, errorStr);
    
}

// await f_simple();
// await f_piped();
// await f_with_error_code()
await f_gphoto2_test()