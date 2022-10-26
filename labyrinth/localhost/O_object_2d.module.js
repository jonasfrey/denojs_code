class O_object_2d{
    constructor(
        n_x, 
        n_y,
        s_color_rgba,
        f_render_function,
        s_name,
        a_o_object_2d__line_to,
    ){
        this.n_x = n_x; 
        this.n_x_initial = n_x; 
        this.n_y = n_y;
        this.n_y_initial = n_y;
        this.s_color_rgba = s_color_rgba
        this.f_render_function = (f_render_function) ? f_render_function : null;
        this.s_name = (s_name) ? s_name : ""
        this.b_hover_mouse = false
        this.a_o_object_2d__line_to = (a_o_object_2d__line_to) ? a_o_object_2d__line_to : [];
    }
}

export {O_object_2d}