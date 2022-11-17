import {f_o_wav_file} from "./f_o_wav_file.module.js"
import { encode } from "https://deno.land/x/pngs/mod.ts";
import { O_wav_file } from "./O_wav_file.module.js";
var f_o_png_encode  = encode;

// var o_wav_file = await f_o_wav_file("./ImperialMarch60.wav");


// var f_create_png = async function(
//     n_scale_x, 
//     n_scale_y, 
//     a_n__data, 
//     s_path_file
// ){
//     var n_max_val = Math.pow(2,a_n__data.BYTES_PER_ELEMENT*8)-1;
//     var n_max_val_signed = n_max_val / 2;
    
//     var n_min_val_signed = -(n_max_val / 2);
//     var n_samples = a_n__data.length;

//     var n_channels = 4;
//     // An array containing a RGBA sequence where the first pixel is red and second is black
//     const a_n_u8 = new Uint8Array(n_scale_x*n_scale_y*n_channels);
//     var n_i_channel = 0;
//     var n_x = 0;
//     var n_y = 0;
//     var n_samples_per_y = n_samples / n_scale_y;
//     var n_samples_per_x = n_samples / n_scale_x;
//     var n_scale_x_per_sample_val = n_scale_x / n_max_val_signed;

//     while(n_i_channel < a_n_u8.length){
//         n_x = (n_i_channel / n_channels) % n_scale_x;
//         n_y = parseInt((n_i_channel / n_channels) / n_scale_x );
//         var n_sample_val = a_n__data[parseInt(n_samples_per_x*n_x)];
//         var n_y_normalized = (n_y / n_scale_y);
//         var n_sample_normalized = (n_sample_val / n_max_val);
//         var n_amp = 2.0;
//         var n_sample_normalized_mod = n_sample_normalized*n_amp;
//         var n_y_normalized_mod = (n_y_normalized - 0.5);
//         // console.log(n_y_normalized)
//         if(
//             n_sample_normalized_mod >= n_y_normalized_mod
//         ){
//             a_n_u8[n_i_channel+0] = 255;
//             a_n_u8[n_i_channel+1] = 255;
//             a_n_u8[n_i_channel+2] = 255;
//             a_n_u8[n_i_channel+3] = 255;
//         }
//         if(n_y_normalized_mod == 0.0){
//             a_n_u8[n_i_channel+0] = 255;
//             a_n_u8[n_i_channel+1] = 0;
//             a_n_u8[n_i_channel+2] = 0;
//             a_n_u8[n_i_channel+3] = 255;
//         }

//         a_n_u8[n_i_channel+3] = 255;

//         n_i_channel+=n_channels;
//     }
//     // Encode the image to have width 2 and height 1 pixel
//     const o_png = f_o_png_encode(a_n_u8, n_scale_x, n_scale_y);
//     await Deno.writeFile(s_path_file, o_png);

// }


// var o_png = await  f_create_png(
//     1080, 
//     512, 
//     o_wav_file.a_n__data, 
//     './test.png'
// );

var o_wav_file = new O_wav_file();

var n_length_bytes = 100000;
var a_n_u16_whitenoise = new Int16Array(n_length_bytes);
var n_i = 0;
var n_max_amp = Math.pow(2,16)/2;

while(n_i< n_length_bytes){
    var n_amp = Math.sin(6.2831*(n_i/n_length_bytes)*n_i)*n_max_amp;
    a_n_u16_whitenoise[n_i] = (Math.random()-0.5)*n_amp;
    n_i+=1;
}
o_wav_file.f_create_from_array(
    1, 
    22050,
    a_n_u16_whitenoise
);

o_wav_file.f_write_file("test_white_noise.wav");