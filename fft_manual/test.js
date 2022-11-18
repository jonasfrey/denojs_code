/*md
# O_wav_file
## import 
md*/
//```javascript
import {f_o_wav_file} from "./f_o_wav_file.module.js"
//```
import { encode } from "https://deno.land/x/pngs/mod.ts";
import { O_wav_file } from "./O_wav_file.module.js";

var f_o_png_encode  = encode;

//```javascript
var o_wav_file = await f_o_wav_file("./ImperialMarch60.wav");
console.log(o_wav_file.o_file_header) // { ...  _s_riff_mark: "RIFF",  _n_file_size_in_bytes_minus_8_bytes: 2646036,  _s_wave_mark: "WAVE",  _s_fmt_mark: "fmt ",  _n_fmt_chunk_size: 16,  _n_compression_code: 1,  _n_number_of_channels: 1,  _n_samples_per_second_per_channel: 22050,  _n_samples_per_second_per_channel_times_bits_per_sample_times_channel__dividedby8: 44100,  _n_bits_per_sample_times_channels: 2,  _n_bits_per_sample: 16,  _s_data_mark: "data",_n_data_size_in_bytes: 2646000 }
//```

//md ## generate png from wav file
//md additionally a png file can be generated 
//md from a wave file !


// var o_png = await  f_create_png(
//     1080, 
//     512, 
//     o_wav_file.a_n__data, 
//     './test.png'
// );

// var o_wav_file = new O_wav_file();

// var n_length_bytes = 100000;
// var a_n_u16_whitenoise = new Int16Array(n_length_bytes);
// var n_i = 0;
// var n_max_amp = Math.pow(2,16)/2;

// while(n_i< n_length_bytes){
//     var n_amp = Math.sin(6.2831*(n_i/n_length_bytes)*n_i)*n_max_amp;
//     a_n_u16_whitenoise[n_i] = (Math.random()-0.5)*n_amp;
//     n_i+=1;
// }
// o_wav_file.f_create_from_array(
//     1, 
//     22050,
//     a_n_u16_whitenoise
// );


// // 2 seconds silence 
// var s_path_file = "./out_2_seconds_silence.wav"
// var o_wav_file = new O_wav_file();
// var n_samples_per_second_per_channel = 44100;
// var n_channels = 1;
// var n_bits_per_sample = 16;
// var n_bytes_per_second = (n_bits_per_sample/8) * n_samples_per_second_per_channel * n_channels;
// var n_milliseconds = 2 * 1000;
// var n_bytes = n_bytes_per_second * (n_milliseconds/1000);
// var a_n_u16_whitenoise = new Int16Array(n_bytes);
// var n_i = 0;
// var n_amp = 0;
// while(n_i < n_bytes){
//     a_n_u16_whitenoise[n_i] = n_amp;
//     n_i+=1;
// }
// o_wav_file.f_create_from_array(
//     n_channels,
//     n_bits_per_sample, 
//     n_samples_per_second_per_channel,
//     a_n_u16_whitenoise
// );
// o_wav_file.f_write_file(s_path_file);


// // 2 seconds sine wave 333 hz 
// var s_path_file = "./out_2_seconds_333hz_sine.wav"
// var o_wav_file = new O_wav_file();
// var n_samples_per_second_per_channel = 44100;
// var n_channels = 1;
// var n_bits_per_sample = 16;
// var n_milliseconds = 2000;
// var n_samples_total = n_samples_per_second_per_channel * n_channels * (n_milliseconds/1000);
// var a_n_i16_data = new Int16Array(n_samples_total);
// var n_amp_max = (Math.pow(2, n_bits_per_sample)-1);
// var n_tau = Math.PI*2;
// var n_hz = 333;
// var n_tau_per_second = n_hz*n_tau;
// var n_tau_per_sample = n_tau_per_second / n_samples_per_second_per_channel;
// var n_ms_per_sample = 1000/n_samples_per_second_per_channel;
// var n_i_sample = 0;
// var n_ms_current = 0;
// while(n_i_sample < a_n_i16_data.length/n_channels){
//     var n_i_channel = 0;
//     n_ms_current+=n_ms_per_sample;
//     while(n_i_channel < n_channels){
//         a_n_i16_data[n_i_sample+n_i_channel] = (Math.sin(n_tau_per_sample*n_i_sample) * (n_amp_max/2.0));
//         n_i_channel+=1;
//     }
//     n_i_sample+=n_channels;
// }
// o_wav_file.f_create_from_array(
//     n_channels,
//     n_bits_per_sample, 
//     n_samples_per_second_per_channel,
//     a_n_i16_data
// );
// // console.log(o_wav_file.o_file_header)
// o_wav_file.f_write_file(s_path_file);




// // 2 seconds saw tooth
// var s_path_file = "./out_2secs_333hz_sawtooth.wav"
// var o_wav_file = new O_wav_file();
// var n_samples_per_second_per_channel = 44100;
// var n_channels = 1;
// var n_bits_per_sample = 16;
// var n_milliseconds = 2000;
// var n_samples_total = n_samples_per_second_per_channel * n_channels * (n_milliseconds/1000);
// var a_n_i16_data = new Int16Array(n_samples_total);
// var n_amp_max = (Math.pow(2, n_bits_per_sample)-1);
// var n_tau = Math.PI*2;
// var n_hz = 333;
// var n_sample_modulo = n_samples_per_second_per_channel/n_hz;
// var n_tau_per_sample = n_tau_per_second / n_samples_per_second_per_channel;
// var n_ms_per_sample = 1000/n_samples_per_second_per_channel;
// var n_i_sample = 0;
// var n_ms_current = 0;
// while(n_i_sample < a_n_i16_data.length/n_channels){
//     var n_i_channel = 0;
//     n_ms_current+=n_ms_per_sample;
//     while(n_i_channel < n_channels){
//         var n_sample_normalized = (n_i_sample%n_sample_modulo) / n_sample_modulo;
//         a_n_i16_data[n_i_sample+n_i_channel] = n_sample_normalized * (n_amp_max/2.0) - (n_amp_max/2.0);
//         n_i_channel+=1;
//     }
//     n_i_sample+=n_channels;
// }
// o_wav_file.f_create_from_array(
//     n_channels,
//     n_bits_per_sample, 
//     n_samples_per_second_per_channel,
//     a_n_i16_data
// );
// // console.log(o_wav_file.o_file_header)
// o_wav_file.f_write_file(s_path_file);




// // 2 seconds 333hz left sine, right sawtooth
// var s_path_file = "./out_2secs_333hz_lsine_rsawtooth.wav"
// var o_wav_file = new O_wav_file();
// var n_samples_per_second_per_channel = 44100;
// var n_channels = 2;
// var n_bits_per_sample = 16;
// var n_milliseconds = 2000;
// var n_samples_total = n_samples_per_second_per_channel * n_channels * (n_milliseconds/1000);
// var a_n_i16_data = new Int16Array(n_samples_total);
// var n_amp_max = (Math.pow(2, n_bits_per_sample)-1);
// var n_tau = Math.PI*2;
// var n_hz = 333;
// var n_sample_modulo = n_samples_per_second_per_channel/n_hz;
// var n_tau_per_sample = n_tau_per_second / n_samples_per_second_per_channel;
// var n_ms_per_sample = 1000/n_samples_per_second_per_channel;
// var n_i_sample = 0;
// var n_ms_current = 0;
// var n_tau_per_second = n_hz*n_tau;
// var n_tau_per_sample = n_tau_per_second / n_samples_per_second_per_channel;
// while(n_i_sample < a_n_i16_data.length){
//     var n_i_channel = 0;
//     n_ms_current+=n_ms_per_sample;
//     var n_sample = n_i_sample/n_channels;
//     while(n_i_channel < n_channels){
//         if(n_i_channel == 0){
//             a_n_i16_data[n_i_sample+n_i_channel] = (Math.sin(n_tau_per_sample*(n_sample)) * (n_amp_max/2.0));
//         }else{
//             var n_sample_normalized = ((n_sample)%n_sample_modulo) / n_sample_modulo;
//             a_n_i16_data[n_i_sample+n_i_channel] = n_sample_normalized * (n_amp_max/2.0) - (n_amp_max/2.0);
//         }
//         n_i_channel+=1;
//     }
//     n_i_sample+=n_channels;
// }
// o_wav_file.f_create_from_array(
//     n_channels,
//     n_bits_per_sample, 
//     n_samples_per_second_per_channel,
//     a_n_i16_data
// );

// o_wav_file.f_write_file(s_path_file);
