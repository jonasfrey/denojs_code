
class O_graph_node_directed_weighted{
    constructor(
        a_o_edge_weighted
    ){
        this.a_o_edge_weighted 
            = a_o_edge_weighted 
    }
}

class O_edge_weighted{
    constructor(
        o_graph_node_directed_weighted__target,
        n_weight, 
    ){
        this.o_graph_node_directed_weighted__target = o_graph_node_directed_weighted__target // array with object references
        this.n_weight = n_weight
    }
}

var o_graph_node_directed_weighted__A = O_graph_node_directed_weighted([]);
var o_graph_node_directed_weighted__B = O_graph_node_directed_weighted([]);
var o_graph_node_directed_weighted__C = O_graph_node_directed_weighted([]);
var o_graph_node_directed_weighted__D = O_graph_node_directed_weighted([]);

o_graph_node_directed_weighted__A.a_o_edge_weighted.push(
    new O_edge_weighted(
        o_graph_node_directed_weighted__B, 
        5
    ),
    new O_edge_weighted(
        o_graph_node_directed_weighted__C, 
        3
    )
);

o_graph_node_directed_weighted__B.a_o_edge_weighted.push(
    new O_edge_weighted(
        o_graph_node_directed_weighted__C, 
        10
    ),
);
o_graph_node_directed_weighted__C.a_o_edge_weighted.push(
    new O_edge_weighted(
        o_graph_node_directed_weighted__B, 
        15
    ),
    new O_edge_weighted(
        o_graph_node_directed_weighted__D, 
        7
    ),
);




// export { O_graph_node_directed_weighted }