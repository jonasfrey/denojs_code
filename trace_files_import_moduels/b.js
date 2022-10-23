f_i_was_imported_by = null
var f_import = async function(){
    var f_i_was_imported_by = await import("./a.js")
    console.log('b.js')
    return f_i_was_imported_by.f_i_was_imported_by
}
var f_i_was_imported_by = await f_import()

f_i_was_imported_by()
export {f_i_was_imported_by}