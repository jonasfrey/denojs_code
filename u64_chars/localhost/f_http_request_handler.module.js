
import { o_http_request_handler_file_explorer } from "https://deno.land/x/o_webserver@6.6/a_o_http_request_handler.module.js"


var f_http_request_handler = async function(
    o_http_connection, 
    o_request_event,
    o_webserver
){

    // var o_json_db = new O_json_db();
    // let o_request_url = new O_url(o_request.url);

    // we can add our api now here 
    // console.log(o_request)

    // the default behaviour
    return o_http_request_handler_file_explorer.f_http_request_handler(
        o_http_connection, 
        o_request_event,
        o_webserver
    )

}

export {f_http_request_handler}
