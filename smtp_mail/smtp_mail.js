// run me like this : 
// $ deno run --allow-all smtp_mail.js
var o_current_run_info = {
    a_s_argument : Deno.args,
    s_current_path_name_file_name : import.meta.url.split('//')
}
console.log(o_current_run_info)


// import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";

// const client = new SmtpClient();

// await client.connect({
//   hostname: "notworking",
//   port: 587,
//   username: "notworking",
//   password: "notworking",
// });

// await client.send({
//   from: "notworking",
//   to: "notworking",
//   subject: "sent with deno",
//   content: "sent with deno",
//   html: "<a href='https://github.com'>Github</a>",
// });

// await client.close();


// sudo apt install ssmtp

// sudo apt install mutt
// mkdir -p ~/.mutt/cache/headers
// mkdir ~/.mutt/cache/bodies
// touch ~/.mutt/muttrc
// mutt -s "Test Email" jonas.immanuel.frey@gmail.com

var s_message = `
This is a test mail sent with deno and mutt
`
var s_subject = "test sent with deno and mutt"

var s_path_name_file_name = "./mailbody.txt"
var s_email_receiver = "jonas.immanuel.frey@gmail.com"

await Deno.writeTextFile(s_path_name_file_name, s_message);

var a_s_arg = [
    "mutt",
    "-s",
    s_subject,
    s_email_receiver,
    "<",
    s_path_name_file_name
]

const p=Deno.run({ cmd: a_s_arg });
//{ rid: 3, pid: 30393 }
var status = await p.status();
//{ success: true, code: 0 }
//Output: abcd

console.log(status)

