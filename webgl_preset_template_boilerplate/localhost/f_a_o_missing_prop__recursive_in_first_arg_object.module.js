class O_missing_prop{
    constructor(
        o__missing_prop,
        o__owning_prop,
        s_prop_name
        ){
        this.o__missing_prop = o__missing_prop, 
        this.o__owning_prop = o__owning_prop, 
        this.s_prop_name = s_prop_name
    }
}
var f_a_o_missing_prop_in_first_arg_object = function(
    o_1, 
    o_2, 
    s_prop_name_prefix = ''
){
    var a_o_props__o_2 = Object.keys(o_2);
    var a_o_missing_prop = []
    for(var s of a_o_props__o_2){
        if(!o_1.hasOwnProperty(s)){
            a_o_missing_prop.push(new O_missing_prop(o_1, o_2, s_prop_name_prefix+s));
        }
    }
    return a_o_missing_prop;

}
var f_a_o_missing_prop = function (
    o_1,
    o_2, 
    s_prop_name_prefix = ''
) {

    var a_o_missing_prop_in_first_arg_object__o_1 = f_a_o_missing_prop_in_first_arg_object(o_1, o_2, '');
    var a_o_missing_prop_in_first_arg_object__o_2 = f_a_o_missing_prop_in_first_arg_object(o_2, o_1, '');
    a_o_missing_prop = a_o_missing_prop_in_first_arg_object__o_1.concat(a_o_missing_prop_in_first_arg_object__o_2);

    return a_o_missing_prop;
}

var f_a_o_missing_prop__recursive_in_first_arg_object = function (
    o_1,
    o_2,
    o_1__root, 
    o_2__root, 
    s_prop_name_dot_joined = ''
) {
    if(!o_1__root){o_1__root = o_1};
    if(!o_2__root){o_2__root = o_2};
    var a_o_props__o_2 = Object.keys(o_2);
    var a_o_missing_prop = f_a_o_missing_prop_in_first_arg_object(o_1, o_2, s_prop_name_dot_joined);
    for(var s of a_o_props__o_2){
        if(o_1.hasOwnProperty(s)){
            if(typeof o_2.hasOwnProperty(s) == "object"){
                // console.log(s)
                var a_o_missing_prop__child = f_a_o_missing_prop__recursive_in_first_arg_object(
                    o_1[s],
                    o_2[s],
                    o_1__root,
                    o_2__root,
                    s+"."//s_prop_name prefix
                )
                console.log(a_o_missing_prop__child)
                a_o_missing_prop.concat(
                    a_o_missing_prop__child
                )
            }
        }
    }
    var a_o_missing_prop__recursive_in_first_arg_object = []
    for(var o_missing_prop of a_o_missing_prop){
        a_o_missing_prop__recursive_in_first_arg_object.push(new O_missing_prop(o_1__root, o_2__root, o_missing_prop.s_prop_name))
    }
    return a_o_missing_prop__recursive_in_first_arg_object;
}
var f_a_o_missing_prop__recursive = function (
    o_1,
    o_2,
    s_prop_name_dot_joined = ''
) {
    var a_o_missing_prop__recursive_in_first_arg_object_o_1 = f_a_o_missing_prop__recursive_in_first_arg_object(o_1, o_2);
    var a_o_missing_prop__recursive_in_first_arg_object_o_2 = f_a_o_missing_prop__recursive_in_first_arg_object(o_2, o_1);
    var a_o_missing_prop__recursive = a_o_missing_prop__recursive_in_first_arg_object_o_1.concat(a_o_missing_prop__recursive_in_first_arg_object_o_2);
    return a_o_missing_prop__recursive
}

if(window.Deno){
    if(Deno.args[0]=='test'){
        // console.log("asdf")
        console.log("test both objects same")
        var o_1 = {n_a:2, n_b:3, o_c: {}, a_d: [0,2], s_x:"D"};
        var o_2 = {n_a:2, n_b:3, o_c: {}, a_d: [0,2], s_x:"D"};
        var a_o_missing_prop = f_a_o_missing_prop(o_1, o_2);
        console.log(a_o_missing_prop)
    
        console.log("test object 2 is missing some props")
        var o_1 = {n_a:2, n_b:3, o_c: {}, a_d: [0,2], s_x:"D"};
        var o_2 = {n_a:2,                 a_d: [0,2], s_x:"D"};
        var a_o_missing_prop = f_a_o_missing_prop(o_1, o_2);
        console.log(a_o_missing_prop)
    
        console.log("test object 1 is missing some props")
        var o_1 = {       n_b:3, o_c: {},             s_x:"D"};
        var o_2 = {n_a:2, n_b:3, o_c: {}, a_d: [0,2], s_x:"D"};
        var a_o_missing_prop = f_a_o_missing_prop(o_1, o_2);
        console.log(a_o_missing_prop)
    
        console.log("test recursive, both objects same")
        var o_1  = {
            o_sub: {n_a:1, n_b:255, n_c:1}
        }
        var o_2  = {
            o_sub: {n_a:2, n_b:3, n_c:44}
        }
        var a_o_missing_prop = f_a_o_missing_prop__recursive_in_first_arg_object(o_1, o_2);
        console.log(a_o_missing_prop)

        console.log("test recursive, o_1.o_sub.n_b is existing, o_2.o_sub.n_b is missing")
        var o_1  = {
            o_sub: {n_a:2, n_b:3}
        }
        var o_2  = {
            o_sub: {n_a:2, n_b:3, n_c:44}
        }
        var a_o_missing_prop = f_a_o_missing_prop__recursive_in_first_arg_object(o_1, o_2);
        console.log(a_o_missing_prop)
    }
}

export {
    f_a_o_missing_prop, 
    f_a_o_missing_prop_in_first_arg_object, 
    f_a_o_missing_prop__recursive_in_first_arg_object
}