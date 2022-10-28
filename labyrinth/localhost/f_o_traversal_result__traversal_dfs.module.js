var f_a_o_graph_node__path = function(
    o_graph_node__target,
    o_backtracking,
){
    debugger
    var o_graph_node = o_graph_node__target
    var a_o_graph_node__path = []
    while(o_graph_node != undefined){
        a_o_graph_node__path.push(o_graph_node)
        o_graph_node = o_backtracking[
            `${o_graph_node.o_object_2d.n_x}|${o_graph_node.o_object_2d.n_y}`
        ]
    }
    return a_o_graph_node__path;
}

var f_traversal_dfs_recursive = function(
    a_o_graph_node__stack_frontier,
    a_o_graph_node__set_explored,
    o_graph_node__target, 
    o_backtracking,
    a_s_side
){
    if(a_o_graph_node__stack_frontier.length == 0){
        console.log("stack is empty, goal could not be reached or no start node was in the stack array :(")
        return true
    }
    var o_graph_node = a_o_graph_node__stack_frontier.pop();
    if(o_graph_node == o_graph_node__target){
        console.log("target graph node has been found!")
        return true
    }

    for(var s_side of a_s_side){
        var o_graph_node__connected = o_graph_node[`o_graph_node__${s_side}`];
        if(o_graph_node__connected != null){
            if(a_o_graph_node__set_explored.indexOf(o_graph_node__connected) == -1){
                a_o_graph_node__stack_frontier.push(o_graph_node__connected)
                a_o_graph_node__set_explored.push(o_graph_node__connected)
                o_backtracking[
                    `${o_graph_node__connected.o_object_2d.n_x}|${o_graph_node__connected.o_object_2d.n_y}`
                ] = o_graph_node
            }
        }
    }
    f_traversal_dfs_recursive(
        a_o_graph_node__stack_frontier,
        a_o_graph_node__set_explored,
        o_graph_node__target,
        o_backtracking,
        a_s_side
    )
}

var f_o_traversal_result__traversal_dfs = function(
    o_graph_node__start,
    o_graph_node__target, 
    a_s_side = [
        "down", 
        "up", 
        "left", 
        "right"
    ]
){
    var a_o_graph_node__stack_frontier =[ o_graph_node__start ];
    var a_o_graph_node__set_explored = [ o_graph_node__start ];
    var o_backtracking = {}
    f_traversal_dfs_recursive(
        a_o_graph_node__stack_frontier,
        a_o_graph_node__set_explored,
        o_graph_node__target,
        o_backtracking,
        a_s_side
    );

    return new O_traversal_result(
        o_graph_node__start,
        o_graph_node__target,
        a_o_graph_node__stack_frontier,
        a_o_graph_node__set_explored,
        o_backtracking,
    );
}
class O_traversal_result{
    constructor(
        o_graph_node__start,
        o_graph_node__target,
        a_o_graph_node__stack_frontier,
        a_o_graph_node__set_explored,
        o_backtracking
    ){
        this.o_graph_node__start = o_graph_node__start
        this.o_graph_node__target = o_graph_node__target
        this.a_o_graph_node__stack_frontier = a_o_graph_node__stack_frontier
        this.a_o_graph_node__set_explored = a_o_graph_node__set_explored
        this.o_backtracking = o_backtracking
    }
}

export {
    f_o_traversal_result__traversal_dfs,
    O_traversal_result, 
    f_a_o_graph_node__path
}
