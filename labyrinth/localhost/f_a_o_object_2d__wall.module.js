import {O_object_2d} from "./client.module.js";

var f_a_o_object_2d__wall = async function(){

    return new Promise(f_resolve => {

        var a_o_object_2d = []
        var o_canvas = document.createElement("canvas");
        // document.body.appendChild(o_canvas);
        var o_ctx = o_canvas.getContext("2d");
        var o_img = document.createElement("img");
        o_img.onload = async function(){ 
    
            o_canvas.width = o_img.width;
            o_canvas.height = o_img.height;
            o_canvas.getContext('2d').drawImage(o_img, 0, 0, o_img.width, o_img.height);
    
            var o_image_data = o_canvas.getContext('2d').getImageData(0, 0, o_img.width, o_img.height);
            // console.log(o_image_data)
            
            var n_scale_x_max = 32;
            var n_scale_y_max = 20;
            var n_scale_x = 0;
            var n_scale_y = 0;
            var n_scale_x_wall = o_img.width / n_scale_x_max;
            var n_scale_y_wall = o_img.height / n_scale_y_max;
            while(n_scale_x < n_scale_x_max){
                n_scale_y = 0;
                while(n_scale_y < n_scale_y_max){
                    var o_image_data = o_canvas
                        .getContext('2d')
                        .getImageData(
                            n_scale_x * n_scale_x_wall,
                            n_scale_y * n_scale_y_wall, 
                            10,
                            10
                        );
                    o_ctx.fillStyle = "red"
                    o_ctx.fillRect(
                        n_scale_x * n_scale_x_wall,
                        n_scale_y * n_scale_y_wall, 
                        10,
                        10
                    )
                    // console.log(o_image_data)
                    var n = 0; 
                    var n_sum = 0;
                    while(n < o_image_data.data.length){
                        n_sum += o_image_data.data[n];
                        n+=1;
                    }
                    var n_avg = n_sum / o_image_data.data.length;
                    // console.log(n_avg)
                    if(n_avg < 122){
                        a_o_object_2d.push(
                            new O_object_2d(
                                n_scale_x, 
                                n_scale_y, 
                                'rgba(222,22,22,1)',
                                function(){
                                    // this.n_x = this.n_x_initial + Math.random()
                                },
                                "wall"
                            )
                        )
                    }
                    n_scale_y+=1;
                }
                n_scale_x+=1;

            }
            // console.log(a_o_object_2d)
            f_resolve(a_o_object_2d)
    
        }
        o_img.src = "./labyrinth_contrast.png";
    });


}


export {f_a_o_object_2d__wall}
