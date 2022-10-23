// run me like this : 
// $ deno run --allow-all access_raw_socket.js
var o_current_run_info = {
    a_s_argument : Deno.args,
    s_current_path_name_file_name : import.meta.url.split('//')
}
console.log(o_current_run_info)

const o_listener = Deno.listen({ port: 80 })

console.log(o_listener)

const o_connection = await o_listener.accept(); 

console.log(o_connection.readable)

const o_readable_stream_reader = o_connection.readable.getReader();

let n_i = 1; 
while(n_i>0){
    const a_n = new Uint8Array(1);
    n_i = await o_readable_stream_reader.read(a_n) || 0;
    console.log(a_n)
}


