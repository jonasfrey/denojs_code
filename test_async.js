import { assertEquals } from "https://deno.land/std@0.154.0/testing/asserts.ts";



var f_s_test_sync = function(){
    return "f_test_sync has returned this string"
}


var f_s_test_async = async function(){
    return new Promise(function(f_resolve){
        
        window.setTimeout(function(){
            // f_resolve() // the first param of resolve will be treated as the return value when using 'await fun()'       
            return f_resolve("f_s_test_async has returned this string")       
        },333)

    }).then(
        function(){
            return "f_s_test_async has returned this string"
        }
    )
}



Deno.test(
    "f_test_sync", 
    function(){

        var s = f_s_test_sync()
        assertEquals(s, "f_test_sync has returned this string")
    }
)

Deno.test(
    "f_test_async sync mode (await)", 
    async function(){
        var s = await f_s_test_async()
        assertEquals(s, "f_s_test_async has returned this string")
    }
)
Deno.test(
    "f_test_async async mode (.then())", 
    async function(){
        return f_s_test_async().then(
            function(s){ // 'f_resolve'
                var s = s; 
                assertEquals(s, "f_s_test_async has returned this string")
        
            }
        )
    }
)