
import { o_http_request_handler_file_explorer } from "https://deno.land/x/o_webserver@6.6/a_o_http_request_handler.module.js"

import {f_o_command, O_command} from "./../O_command.module.js"

var f_o_request_data__parse_request_body_as_json = async function(
    o_request_event
){
    if(o_request_event.request.method == "POST"){
        var o_reader = await o_request_event.request.body.getReader();
        // var o_json = await o_reader.json();
        // console.log(o_json)
        var s = ''; 
        var o_resp = await o_reader.read();
        while(o_resp.done == false){
            s+= new TextDecoder('utf-8').decode(o_resp.value);
            o_resp = await o_reader.read();
            // console.log(o_resp)
        }
        return JSON.parse(s)
    }
    console.log("cannot parse request body, since this was no POST request, hence no body present")
    return null;
}
var f_http_request_handler = async function(
    o_http_connection, 
    o_request_event,
    o_webserver
){
    // if(o_request_event.)
    var o_request_data = await f_o_request_data__parse_request_body_as_json(o_request_event);
    // console.log(o_request_data);
    if(o_request_data?.a_s_argument){
        var o_response = {b_error:false, s_msg:"succes", data:null};
        var a_s_argument_allowed = [
            "sensors -j", 
            // 'sensors | grep '
        ];
        if(!a_s_argument_allowed.includes(o_request_data.a_s_argument.join(" "))){
            o_response.b_error = true;
            o_response.s_msg = "command is not allowed, allowed commands are: "+a_s_argument_allowed.join(','); 
        }else{
            try{
                var o_command = await f_o_command(o_request_data.a_s_argument);
                o_response.data = o_command;
            }catch(o_e){
                o_response.b_error = true;
                o_response.s_msg = o_e.message
            }
        }
        return o_request_event.respondWith(
            new Response(
                JSON.stringify(o_response),
                { status: 200 }
            )
        )
    }
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
