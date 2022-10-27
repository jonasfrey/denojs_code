
class O_graph_node_undirected_weighted{
    constructor(
        a_o_edge_weighted
    ){
        this.a_o_edge_weighted 
            = a_o_edge_weighted 
    }
}

class O_edge_weighted{
    constructor(
        a_o_graph_node_undirected_weighted,
        n_weight, 
    ){
        this.a_o_graph_node_undirected_weighted = a_o_graph_node_undirected_weighted // array with object references
        this.n_weight = n_weight
    }
}

var o_graph_node_undirected_weighted__A = O_graph_node_undirected_weighted([]);
var o_graph_node_undirected_weighted__B = O_graph_node_undirected_weighted([]);
var o_graph_node_undirected_weighted__C = O_graph_node_undirected_weighted([]);
var o_graph_node_undirected_weighted__D = O_graph_node_undirected_weighted([]);

var o_edge_weighted__A_B = new O_edge_weighted(
    [ o_graph_node_undirected_weighted__A, o_graph_node_undirected_weighted__B ],
    3
)
var o_edge_weighted__B_C = new O_edge_weighted(
    [ o_graph_node_undirected_weighted__B,  o_graph_node_undirected_weighted__C ],
    9
)
var o_edge_weighted__A_C = new O_edge_weighted(
    [ o_graph_node_undirected_weighted__A, o_graph_node_undirected_weighted__C ],
    2
)
var o_edge_weighted__C_D = new O_edge_weighted(
    [ o_graph_node_undirected_weighted__C, o_graph_node_undirected_weighted__D ],
    4
)
o_graph_node_undirected_weighted__A.a_o_edge_weighted.push(
    o_edge_weighted__A_B, 
    o_edge_weighted__A_C
);
o_graph_node_undirected_weighted__B.a_o_edge_weighted.push(
    o_edge_weighted__A_B, 
    o_edge_weighted__B_C
);
o_graph_node_undirected_weighted__C.a_o_edge_weighted.push(
    o_edge_weighted__B_C,
    o_edge_weighted__A_C,
    o_edge_weighted__C_D
);
o_graph_node_undirected_weighted__D.a_o_edge_weighted.push(
    o_edge_weighted__C_D
);

// export { O_graph_node_undirected_weighted }