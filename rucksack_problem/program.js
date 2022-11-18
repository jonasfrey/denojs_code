

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

// 𝑢1 = 6,
// 𝑢2 = 3,
// 𝑢3 = 5,
// 𝑢4 = 4,
// 𝑢5 = 5,
// 𝑢6 = 2

var a_o_object = [
    new O_object(6, 2),
    new O_object(3, 3),
    new O_object(5, 7),
    new O_object(4, 4),
    new O_object(5, 4),
    new O_object(2, 2),
]


var f_o_backpack_with_most_profit = function(
    a_o_object, 
    n_capacity
){

    var a_o_object__sorted_descending_by_n_profitability_index = a_o_object.sort(
        function(o1,o2){
            return o1.n_profitability_index < o2.n_profitability_index
        }
    )
    console.log(a_o_object__sorted_descending_by_n_profitability_index)


    var o_backpack = new O_backpack(
        [],
        n_capacity
    )
    
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
    return o_backpack
    
}

var o_backpack = f_o_backpack_with_most_profit(a_o_object, 20);
var n_sum_profit = o_backpack.a_o_object.reduce(((n,o)=>n+o.n_profit),0);

console.log("o_backpack")
console.log(o_backpack)

console.log("n_sum_profit")
console.log(n_sum_profit)


var o_backpack = f_o_backpack_with_most_profit(a_o_object, 33);
var n_sum_profit = o_backpack.a_o_object.reduce(((n,o)=>n+o.n_profit),0);

console.log("o_backpack")
console.log(o_backpack)

console.log("n_sum_profit")
console.log(n_sum_profit)