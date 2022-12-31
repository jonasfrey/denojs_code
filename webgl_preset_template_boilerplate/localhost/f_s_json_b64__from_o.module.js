var f_s_json_b64__from_o = function (o) {
    var s_json = JSON.stringify(o);
    var s_json_b64 = btoa(s_json);
    return s_json_b64
}
export {f_s_json_b64__from_o}