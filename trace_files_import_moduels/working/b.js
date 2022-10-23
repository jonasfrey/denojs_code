var f = async function(){
    console.log("b.js")
    var {f} = await import("./a.js")
    Promise.resolve(f())
}
export {f}