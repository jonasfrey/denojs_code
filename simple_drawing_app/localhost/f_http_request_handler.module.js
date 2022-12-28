import { O_url } from "https://deno.land/x/o_url/O_url.module.js";
import { O_json_db } from "https://deno.land/x/o_json_db@4.0/O_json_db.module.js";


import { o_http_request_handler_file_explorer } from "https://deno.land/x/o_webserver@6.6/a_o_http_request_handler.module.js"


var a_o_socket = [];
var f_http_request_handler = async function(
    o_http_connection, 
    o_request_event,
    o_webserver,
){
    // const e = await o_http_connection.nextRequest();
    var e = o_request_event;
    // var b_websocket_request = false;
    if (o_request_event.request.headers.get("upgrade") == "websocket") {
        try{
            // b_websocket_request = true;
            if (e) {
            const { socket, response } = Deno.upgradeWebSocket(e.request);
            if(!a_o_socket.includes(socket)){
                a_o_socket.push(socket);
            }
            socket.onopen = () => {
                // socket.send('{"s":"Hello World!"}');
                // setInterval(function(){
                //     socket.send("hello")
                // }, 100)
            };
            socket.onmessage = (e) => {
                console.log(e.data);
                for(var o_socket of a_o_socket){
                    if(o_socket != socket){
                        o_socket.send(e.data);
                    }
                }
                // socket.close();
            };
            socket.onclose = () => console.log("WebSocket has been closed.");
            socket.onerror = (e) => console.error("WebSocket error:", e);
            e.respondWith(response);
            }
        }catch(o_e){
            // b_websocket_request = false;
            console.log(o_e.message)
        }
    }else{
        // if(!b_websocket_request){
    
            var o_request = o_request_event.request;
            
            var o_json_db = new O_json_db();
            let o_request_url = new O_url(o_request.url);
            
            
            // the default behaviour
            return o_http_request_handler_file_explorer.f_http_request_handler(
                o_http_connection, 
                o_request_event,
                o_webserver,
                )
        // }
    }



}

export {f_http_request_handler}
