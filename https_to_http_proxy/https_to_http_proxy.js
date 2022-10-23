// const server = Deno.listenTls({
const server = Deno.listen({
    port: 3333,
    // certFile:"/etc/letsencrypt/live/dev.golog.ch/fullchain.pem" ,
    // keyFile: "/etc/letsencrypt/live/dev.golog.ch/privkey.pem",
  //  alpnProtocols: ["h2", "http/1.1"],
  });
  
const o_server_to_request = {
    n_port : 443, 
    s_hostname_or_ip: "doc.deno.land", 
}

  for await (const conn of server) {
    handle(conn);
  }
  
  async function handle(conn) {
    const httpConn = Deno.serveHttp(conn);
    
    for await (const requestEvent of httpConn) {
      try {

        var a_s_path = requestEvent.request.url.split("://");
        // console.log(a_s_path)
        a_s_path.shift()
        var s_path = a_s_path.join("://") 
        var a_s_path = s_path.split("/");
        a_s_path.shift()
        var s_path = a_s_path.join("/");
        // console.log("s_path")
        // console.log(s_path)
        console.log(requestEvent.request);
        var new_url = `https://${o_server_to_request.s_hostname_or_ip}:${o_server_to_request.n_port}/${s_path}`
        // requestEvent.request.url = new_url
        var o_req_init = {
            headers: requestEvent.request.headers, 
        }
        if(requestEvent.request.bodyUsed){
            o_req_init.body = requestEvent.request.body
        }
        var o_new_req = new Request(new_url, 
            o_req_init
        )
        console.log(new_url)
        var o_response = await fetch(
            new_url, 
            // o_new_req,
            requestEvent.request
        )
        await requestEvent.respondWith(o_response);
        // await requestEvent.respondWith(new Response("asdf"))
      } 
      catch (error) {
        console.error(error);
      }
    }
  }