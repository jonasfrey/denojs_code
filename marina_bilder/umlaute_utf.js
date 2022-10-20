var s_1 = "ä"
var s_2 = "ä"
let o_text_encoder_utf8 = new TextEncoder();


var s_file_name = "5Märit.jpg"
var s_file_name_new = "5Märit.jpg"
console.log(o_text_encoder_utf8.encode(s_file_name));
console.log(o_text_encoder_utf8.encode(s_file_name_new));
var o_stat = await Deno.stat(`o_story_marina2/${s_file_name}`)
console.log(o_stat)
var o_stat = await Deno.stat(`o_story_marina2/${s_file_name_new.normalize("NFD")}`)
console.log(o_stat)

Deno.exit(1)

// theese two texts seem the same , but the encoding is different
console.log(o_text_encoder_utf8.encode(s_1));
//Uint8Array(12) [
//     53,  77,  97, 204, 136,
//     114, 105, 116,  46, 106,
//     112, 103
//   ]
console.log(o_text_encoder_utf8.encode(s_2));
//Uint8Array(11) [
//     53,  77, 195, 164,
//     114, 105, 116,  46,
//     106, 112, 103
//   ]



// "NFC"
// Canonical Decomposition, followed by Canonical Composition.
console.log(`normalize("NFC")`)
console.log(o_text_encoder_utf8.encode(s_1.normalize("NFC")));
console.log(o_text_encoder_utf8.encode(s_2.normalize("NFC")));

// "NFD"
// Canonical Decomposition.
console.log(`normalize("NFD")`)
console.log(o_text_encoder_utf8.encode(s_1.normalize("NFD")));
console.log(o_text_encoder_utf8.encode(s_2.normalize("NFD")));

// "NFKC"
// Compatibility Decomposition, followed by Canonical Composition.
console.log(`normalize("NFKC")`)
console.log(o_text_encoder_utf8.encode(s_1.normalize("NFKC")));
console.log(o_text_encoder_utf8.encode(s_2.normalize("NFKC")));

// "NFKD"
// Compatibility Decomposition.
console.log(`normalize("NFKD")`)
console.log(o_text_encoder_utf8.encode(s_1.normalize("NFKD")));
console.log(o_text_encoder_utf8.encode(s_2.normalize("NFKD")));
