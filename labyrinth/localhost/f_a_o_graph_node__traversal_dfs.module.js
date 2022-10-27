var f_traversal_dfs_recursive = function(
    a_o_graph_node__stack_frontier,
    a_o_graph_node__set_explored,
    o_graph_node__target, 
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
            }
        }
    }
    f_traversal_dfs_recursive(
        a_o_graph_node__stack_frontier,
        a_o_graph_node__set_explored,
        o_graph_node__target,
        a_s_side
    )
}

var f_a_o_graph_node__traversal_dfs = function(
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
    f_traversal_dfs_recursive(
        a_o_graph_node__stack_frontier,
        a_o_graph_node__set_explored,
        o_graph_node__target, 
        a_s_side
    );

    return a_o_graph_node__set_explored;
}

export {f_a_o_graph_node__traversal_dfs}
