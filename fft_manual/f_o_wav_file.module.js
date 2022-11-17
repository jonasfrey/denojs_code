import { O_wav_file } from "./O_wav_file.module.js";

var f_o_wav_file = async function( s_path_file ){

    var o_wav_file = new O_wav_file();
    await o_wav_file.f_read_file(s_path_file); 

    console.log(o_wav_file.a_n__data)
    let n_i = 44;
    var n_amp = Math.pow(2, 16);
    while(n_i < o_wav_file.a_n__data.length){
        // o_wav_file.a_n__data[n_i].setUint16(n_i, o_wav_file.a_n__data[n_i].getUint16()*0.1, true)
        // n_i+=2;
        // o_wav_file.a_n__data[n_i] = o_wav_file.a_n__data[n_i] *Math.sin(n_i*0.001)*0.5+0.5
        o_wav_file.a_n__data[n_i] = Math.sin(n_i*0.005)*(n_amp/2.0);
        n_i+=1;
    }
    o_wav_file.f_write_file("./out_test.wav");

    return o_wav_file

}
export {f_o_wav_file}