class O_program{
    constructor(
        s_name, 
        a_o_source_code, 
        o_source_code = null
    ){
        this.s_name = s_name
        this.a_o_source_code = a_o_source_code
        if(o_source_code == null){
            this.o_source_code = this.a_o_source_code[0]
        }
    }
}
export {O_program}