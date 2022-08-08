// run me like this : 
// $ deno run --allow-all my_test_project_name.js
var o_current_run_info = {
    a_s_argument : Deno.args,
    s_current_path_name_file_name : import.meta.url.split('//')
}
console.log(o_current_run_info)