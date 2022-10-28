

class O_object {
    constructor(
        n_profit, 
        n_weight
    ){
        this.n_profit = n_profit
        this.n_weight = n_weight
        this.n_profitability_index = this.n_profit / this.n_weight
    }
}

class O_backpack{
    constructor(
        a_o_object,
        n_capacity
    ){
        this.a_o_object = a_o_object
        this.n_capacity = n_capacity
    }
}
var a_o_object = [
    new O_object(6, 2),
    new O_object(3, 3),
    new O_object(5, 7),
    new O_object(4, 4),
    new O_object(5, 4),
    new O_object(2, 2),
]

//calculate the n_profitability_index
var a_o_object__sorted_descending_by_n_profitability_index = a_o_object.sort(
    function(o1,o2){
        return o1.n_profitability_index < o2.n_profitability_index
    }
)
console.log(a_o_object__sorted_descending_by_n_profitability_index)


var o_backpack = new O_backpack(
    []
    , 16
)

var n_weight_sum = 0;
var b_done = false;
while(!b_done){
    var n_weight_backpack = o_backpack.a_o_object.reduce(((n,o)=>n+o.n_weight),0);
    var n_weight_available = o_backpack.n_capacity - n_weight_backpack;
    for(var o_object of a_o_object__sorted_descending_by_n_profitability_index){

        while(o_object.n_weight < n_weight_available){
            o_backpack.a_o_object.push(
                o_object
            )
            var n_weight_backpack = o_backpack.a_o_object.reduce(((n,o)=>n+o.n_weight),0);
            var n_weight_available = o_backpack.n_capacity - n_weight_backpack;

        }
    }
    b_done = true;
}


console.log(o_backpack)