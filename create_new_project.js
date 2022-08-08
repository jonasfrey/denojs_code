import * as mod from "https://deno.land/std@0.150.0/fs/mod.ts";


var s_dir_separator = "/";

var s_current_file_name = import.meta.url.split(s_dir_separator).pop()
// console.log(s_current_file_name)
var a_s_argument = Deno.args;

if(a_s_argument.length < 1){
    console.error("please call script like this:")
    console.error(`deno run --allow-all ${s_current_file_name} my_test_project_name`)
    Deno.exit(1); 
}

var s_project_name = a_s_argument[0]

var s_path_name = "."+s_dir_separator+s_project_name;
var s_file_name = s_project_name + ".js"
var s_path_name_file_name = s_path_name + s_dir_separator + s_file_name


var s_file_content = 
`// run me like this : 
// $ deno run --allow-all ${s_file_name}
var o_current_run_info = {
    a_s_argument : Deno.args,
    s_current_path_name_file_name : import.meta.url.split('//')
}
console.log(o_current_run_info)`

try{
    const o_fileInfo = await Deno.lstat(s_path_name);
    console.log(o_fileInfo)
    if(!o_fileInfo.isDirectory){
        try {
            Deno.mkdirSync(s_path_name, { recursive: true });
        } catch (error) {
            console.log(error)
        }
    }
}catch(err){

    try {
        Deno.mkdirSync(s_path_name, { recursive: true });
    } catch (error) {
        console.log(error)
    }
}


try{
    const o_stat = await Deno.lstatSync(s_path_name_file_name);
    console.log(o_stat)
    // if(!o_fileInfo.isFile){
    //     try {
    //         Deno.writeTextFileSync(s_path_name_file_name, "Hello World!");
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
}catch(err){
    Deno.writeTextFileSync(s_path_name_file_name, s_file_content);

    console.log(err)
}


// mod.ensureDir().finally(function(a,b){
//     mod.ensureFile(

//     )
//     console.log(a,b);
// })