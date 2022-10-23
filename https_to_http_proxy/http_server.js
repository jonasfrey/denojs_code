// fetch('https://example.com/profile', {
//   method: 'POST', // or 'PUT'
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(data),
// })

import { serve } from "https://deno.land/std@0.154.0/http/server.ts";

const port = 8080;

const handler = (request) => {
    console.log(request);
  const body = JSON.stringify(request, 4);

  return new Response(body, { status: 200 });
};

console.log(`HTTP webserver running. Access it at: http://localhost:8080/`);
await serve(handler, { port });