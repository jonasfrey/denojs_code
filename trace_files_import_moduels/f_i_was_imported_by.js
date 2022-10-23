var f_i_was_imported_by =  function(){
    var s_path_file = new Error().stack 
    console.log(new Error())
    var a_s_part  = new Error().stack.split('\n')
    var a_s_file = []
    
    for(var s_part of a_s_part){
        var n_index = s_part.indexOf('file://')
        if(n_index ==-1){continue}
        a_s_file.push(s_part.substring(n_index))
    }

    console.log(a_s_file)
    console.log('i was imported by '+a_s_file.slice(-1))

}
export {f_i_was_imported_by}