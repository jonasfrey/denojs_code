// run me like this : 
// $ deno run --allow-all marina_bilder.js
var o_current_run_info = {
    a_s_argument : Deno.args,
    s_current_path_name_file_name : import.meta.url.split('//')
}
console.log(o_current_run_info)


import { a_o_image } from "./a_o_image.module.js"

import { f_o_command__generate_audio } from "./f_o_command__generate_audio.module.js"

var s_path_output = "./output"
import { f_o_command__generate_video } from "./f_o_command__generate_video.module.js";

import { f_o_command } from "./O_command.module.js";

import * as fs from "https://deno.land/std@0.159.0/fs/mod.ts";
import { O_json_db } from "http://deno.land/x/o_json_db@4.0/O_json_db.module.js"
import { f_o_command__generate_video_merged } from "./f_o_command__generate_video_merged.module.js";

var o_json_db = new O_json_db();


class O_files_info{
    constructor(
        n_o_story_n_id, 
        s_text, 
        n_seed, 
        s_path_file_image,
        s_path_file_image_with_text,
        s_path_file_audio,
        s_path_file_video,
    ){
        this.n_id = null
        this.n_o_story_n_id = n_o_story_n_id
        this.s_text = s_text
        this.n_seed = n_seed
        this.s_path_file_image = s_path_file_image
        this.s_path_file_image_with_text = s_path_file_image_with_text
        this.s_path_file_audio = s_path_file_audio
        this.s_path_file_video = s_path_file_video
    }
}

class O_story{
    constructor(
        s_story,
        s_title, 
        s_path_folder, 
        s_path_file_video
    ){
        this.n_id = null
        this.s_story = s_story
        this.s_title = s_title
        this.s_path_folder = s_path_folder, 
        this.s_path_file_video = s_path_file_video
    }
}


var s_title_story = "marina";

var b_overwrite_file_image_with_text = prompt("re-generate overwrite existing files(image_with_text) ? [(y)es/(n)o]").toLowerCase() == "y"
var b_overwrite_file_audio = prompt("re-generate overwrite existing files(audio) ? [(y)es/(n)o]").toLowerCase() == "y"
var b_overwrite_file_video = prompt("re-generate overwrite existing files(video) ? [(y)es/(n)o]").toLowerCase() == "y"

var a_o_story_from_db = await o_json_db.f_a_o_read(
    O_story, 
    function(o){
        return o.s_title == s_title_story
    }
);

var o_story = a_o_story_from_db[0];


if(o_story == undefined){
    var o_story = new O_story(
        a_o_image.map(o=>o.s_text).join("\n"),
        s_title_story,
        `${import.meta.url.split("//").pop().split("/").slice(0,-1).join("/")}/o_story_${s_title_story}`, 
        ''
    )
    var o_story = (await o_json_db.f_a_o_create(O_story, o_story))[0]
}

await fs.ensureDir(
    o_story.s_path_folder
)

// console.log(a_s_sentence)
// await Deno.writeTextFile("./a_s_sentence.json", JSON.stringify(a_s_sentence));
// console.log(a_s_sentence)
// Deno.exit(1)

var a_o_files_info = [];


for(var o_image of a_o_image){
    
    var n_seed = 0;
    var s_sentence = o_image.s_text
    
    // console.log("s_sentence------------------")
    // console.log(s_sentence)
    var a_o_files_info_from_db = await o_json_db.f_a_o_read(
        O_files_info, 
        function(o){
            return o.s_text == s_sentence
        }
    );
    var o_files_info = a_o_files_info_from_db[0];
    if(o_files_info == undefined){
        var o_files_info = new O_files_info(
            o_story.n_id,
            s_sentence, 
            n_seed,
            "",
            "", 
            "",
            ""
        )
        var o_files_info = (await o_json_db.f_a_o_create(O_files_info, o_files_info))[0]
    }


    o_files_info.s_path_file_image = `${o_story.s_path_folder}/${(o_image.s_image_name)}`
    o_files_info.s_path_file_image_with_text = `${o_story.s_path_folder}/${(o_image.s_image_name)}`

    o_files_info.s_path_file_image = o_image.s_image_name


    o_files_info.s_path_file_audio = `${o_story.s_path_folder}/n_o_files_info_n_id_${o_files_info.n_id}.wav`
    
    try{
        var o_stat = await Deno.stat(o_files_info.s_path_file_audio)
        // var b_overwrite = prompt("file already existing, overwrite ? [(y)es/(n)o]").toLowerCase == "y"
        // overwrite 
        if(b_overwrite_file_audio){
            
            var o_command = await f_o_command__generate_audio(
                s_sentence,
                o_files_info.s_path_file_audio
            );
        }
    }catch(e){
        console.log(`${o_files_info.s_path_file_audio}: file not existing yet`)

        
        var o_command = await f_o_command__generate_audio(
            s_sentence,
            o_files_info.s_path_file_audio
        );
    }
    
    o_files_info.s_path_file_video = `${o_story.s_path_folder}/n_o_files_info_n_id_${o_files_info.n_id}.mp4`
    
    try{
        var o_stat = await Deno.stat(o_files_info.s_path_file_video)
        // var b_overwrite = prompt("file already existing, overwrite ? [(y)es/(n)o]").toLowerCase == "y"
        // overwrite 
        if(b_overwrite_file_video){
            var o_command = await f_o_command__generate_video(
                (o_files_info.s_path_file_image_with_text), 
                o_files_info.s_path_file_audio, 
                o_files_info.s_path_file_video
            );
        }
    }catch(e){
        console.log(`${o_files_info.s_path_file_video}: file not existing yet`)

        var o_command = await f_o_command__generate_video(
            (o_files_info.s_path_file_image_with_text), 
            o_files_info.s_path_file_audio, 
            o_files_info.s_path_file_video
        );
    }

    await o_json_db.f_a_o_update(
        O_files_info, 
        function(o){// filter function
            return o.n_id == o_story.n_id
        }, 
        function(o){// update function
            o = o_story
        }
    )

    a_o_files_info.push(o_files_info);

}

var a_s_path_video = a_o_files_info.map(o=>o.s_path_file_video);

o_story.s_path_file_video = `${o_story.s_path_folder}/n_o_story_n_id_${o_story.n_id}.mp4`
// o_story.s_path_file_video = `${o_story.s_path_folder}/n_o_story_n_id_${o_story.n_id}.mov`

try{
    var o_stat = await Deno.stat(o_story.s_path_file_video)
    // var b_overwrite = prompt("file already existing, overwrite ? [(y)es/(n)o]").toLowerCase == "y"
    // overwrite 
    if(b_overwrite){
        var o_command = await f_o_command__generate_video_merged(
            a_s_path_video, 
            o_story.s_path_file_video
        );
    }
}catch(e){
    console.log(`${o_story.s_path_file_video}: file not existing yet`)

    var o_command = await f_o_command__generate_video_merged(
        a_s_path_video, 
        o_story.s_path_file_video
    );
}

console.log("done !")
console.log(o_story.s_path_file_video);
Deno.exit()


