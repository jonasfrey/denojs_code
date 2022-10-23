import { f_o_command__generate_audio } from "../f_o_command__generate_audio.module.js";

import {a_s_voice } from "./../a_s_voice.module.js"

var s_text = `Also kaufte ich zwei Eurostar-Tickets für etwa 240 Pfund, überredetet das Kindermädchen, zwei Tage rund um die Uhr aufzupassen - 150 Pfund - reservierte ein Zimmer in einem kleinen aber schicken Hotel in der Nähe des Boulevard St. Germain - etwa 250 Pfund- und dann sprangen wir einfach in die U-Bahn nach Waterloo und waren kurz daraf nach Paris unterwegs. Got wir waren auf einmal so jung.`

for(var s_voice of a_s_voice){

    await f_o_command__generate_audio(
        s_text, 
        `./${s_voice.replace(':', "__")}.wav`,
        s_voice
    )
}

