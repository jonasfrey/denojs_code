
import * as mod from "https://deno.land/std@0.159.0/http/server.ts";

// Start listening on port 8080 of localhost.
const server = Deno.listen({ port: 8080 });
const serverTls = Deno.listenTls(
    {
        certFile: "./example.com+5.pem",
        keyFile: "./example.com+5-key.pem",
        port: 8443,
        hostname: "::", // ipv4 and also ipv6
    }
);
console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);



// for await (const o_request of mod.serveTls(
//   {
//     cert: "./example.com+5.pem",
//     key: "./example.com+5-key.pem",
//     port: 8443,
//     hostname: "::", // ipv4 and also ipv6
// }

// )) {
//   o_request.respond({ body });
// }

(async function(){

  // Connections to the server will be yielded up as an async iterable.
  for await (const conn of server) {
    // In order to not be blocking, we need to handle each connection individually
    // without awaiting the function
    serveHttp(conn);
  }
})();
(async function(){

  // Connections to the server will be yielded up as an async iterable.
  for await (const conn of serverTls) {
      // In order to not be blocking, we need to handle each connection individually
      // without awaiting the function
      serveHttp(conn);
    }
})();
  
async function serveHttp(conn) {
  // This "upgrades" a network connection into an HTTP connection.
  const httpConn = Deno.serveHttp(conn);
  // Each request sent over the HTTP connection will be yielded as an async
  // iterator from the HTTP connection.
  try{
    for await (const requestEvent of httpConn) {
      // The native HTTP server uses the web standard `Request` and `Response`
      // objects.
      try{
  
        const body = `${requestEvent.request.url}\nYour user-agent is:\n\n${
          requestEvent.request.headers.get("user-agent") ?? "Unknown"
        }`;
        // The requestEvent's `.respondWith()` method is how we send the response
        // back to the client.
        requestEvent.respondWith(
          new Response(body, {
            status: 200,
          }),
        );
      }catch(o_e){
        console.log("error")
        console.log(o_e)
      }
    }

  }catch(o_e){
    console.log("error with `for await (const requestEvent of httpConn) {`")
    console.log(o_e)
  }
}