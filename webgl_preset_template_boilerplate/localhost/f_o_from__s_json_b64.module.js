var f_o_from__s_json_b64 = function (s_json_b64) {
    var s_json = atob(s_json_b64);
    var o = JSON.parse(s_json);
    return o
}
export {f_o_from__s_json_b64}
