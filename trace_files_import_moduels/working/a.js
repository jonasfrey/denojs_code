var f = async function(){
    console.log(new Error().stack)
    Promise.resolve(f)
}

export {f}