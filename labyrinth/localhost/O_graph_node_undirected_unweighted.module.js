
class O_graph_node_undirected_unweighted{
    constructor(
        a_o_graph_node_undirected_unweighted
    ){
        this.a_o_graph_node_undirected_unweighted 
            = a_o_graph_node_undirected_unweighted // array with object references
    }
}

var o_graph_node_undirected_unweighted__A = O_graph_node_undirected_unweighted([]);
var o_graph_node_undirected_unweighted__B = O_graph_node_undirected_unweighted([]);
var o_graph_node_undirected_unweighted__C = O_graph_node_undirected_unweighted([]);
var o_graph_node_undirected_unweighted__D = O_graph_node_undirected_unweighted([]);

o_graph_node_undirected_unweighted__A.a_o_graph_node_undirected_unweighted.push(
    o_graph_node_undirected_unweighted__B,
    o_graph_node_undirected_unweighted__C,
);
o_graph_node_undirected_unweighted__B.a_o_graph_node_undirected_unweighted.push(
    o_graph_node_undirected_unweighted__A,
    o_graph_node_undirected_unweighted__C,
);
o_graph_node_undirected_unweighted__C.a_o_graph_node_undirected_unweighted.push(
    o_graph_node_undirected_unweighted__A,
    o_graph_node_undirected_unweighted__B,
    o_graph_node_undirected_unweighted__D,
);
o_graph_node_undirected_unweighted__D.a_o_graph_node_undirected_unweighted.push(
    o_graph_node_undirected_unweighted__C,
);

// export { O_graph_node_undirected_unweighted }