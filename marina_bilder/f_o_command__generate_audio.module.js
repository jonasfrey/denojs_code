import * as fs from "https://deno.land/std@0.156.0/fs/mod.ts";
import { O_command, f_o_command } from "./O_command.module.js";
  
var f_o_command__generate_audio = async function(
    s_text, 
    s_path_audio, 
    s_voice = "marytts:dfki-pavoque-neutral-hsmm"
){

    if(s_text.trim() == ""){
        var n_seconds = 6;
        var a_s_arg = [
            "sox",
            "-n",
            "-r",
            "16000",
            "-c",
            "1",
            s_path_audio,
            "trim",
            "0.0",
            n_seconds,
        ]
    
        var o_command = await f_o_command(a_s_arg);
        // console.log(o_command)
        return Promise.resolve(o_command)

        // create empty wav file of duration 6 seconds
        
    }
    // http://localhost:5500/api/tts?voice=coqui-tts%3Aen_ljspeech&lang=en&vocoder=high&denoiserStrength=0.005&text=this%20is%20a%20test%202&speakerId=&ssml=false&ssmlNumbers=true&ssmlDates=true&ssmlCurrency=true&cache=false
    var s_url = 
    `
    http://localhost:5500/api/tts
    ?
    &voice=${encodeURIComponent(s_voice)}
    &lang=de
    &vocoder=high
    &denoiserStrength=0.005
    &text=${s_text}
    &speakerId= 
    &ssml=false
    &ssmlNumbers=true
    &ssmlDates=true
    &ssmlCurrency=true
    &cache=false
    `
    s_url = (s_url.split("\n").map(s=>s.trim()).join(""));

    console.log(s_url)
    try{
        var o_resp = await fetch(s_url)
        fs.ensureDir(
            s_path_audio.split("/").slice(0, -1).join("/")
        )
        await Deno.writeFile(
                s_path_audio,
                await o_resp.arrayBuffer(),
                { mode: 0o644 }
            );
        console.log(`${s_path_audio}: has been written`)
            
    }catch(e){
        var s_error = `
        error: ${e}, 
        make sure the 'opentts' server is running and reachable, do: 'cd {tilde}/code/opentts/ && sudo docker run -it -p 5500:5500 synesthesiam/opentts:en
        `
        throw new Error(s_error)
    }
    
    return Promise.resolve(s_path_audio)    

}


export {f_o_command__generate_audio}