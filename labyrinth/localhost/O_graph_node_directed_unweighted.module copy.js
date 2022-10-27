
class O_graph_node_directed_unweighted{
    constructor(
        a_o_graph_node_directed_unweighted
    ){
        this.a_o_graph_node_directed_unweighted 
            = a_o_graph_node_directed_unweighted // array with object references
    }
}

var o_graph_node_directed_unweighted__A = O_graph_node_directed_unweighted([]);
var o_graph_node_directed_unweighted__B = O_graph_node_directed_unweighted([]);
var o_graph_node_directed_unweighted__C = O_graph_node_directed_unweighted([]);
var o_graph_node_directed_unweighted__D = O_graph_node_directed_unweighted([]);

o_graph_node_directed_unweighted__A.a_o_graph_node_directed_unweighted.push(
    o_graph_node_directed_unweighted__B,
    o_graph_node_directed_unweighted__C,
);
o_graph_node_directed_unweighted__B.a_o_graph_node_directed_unweighted.push(
    o_graph_node_directed_unweighted__C,
);
o_graph_node_directed_unweighted__C.a_o_graph_node_directed_unweighted.push(
    o_graph_node_directed_unweighted__B,
    o_graph_node_directed_unweighted__D,
);