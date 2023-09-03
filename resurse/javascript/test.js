function f_test(function_var) {
    let test_number = 343;
    let test_number_let = 434;

    switch (function_var) {
        case null:
            console.log("Given variable is null");
            return null;
            break;
        case test_number:
            console.log("Given variable is equal to test_number ", test_number);
            return test_number;
            break;
        case test_number_let:
            console.log("Given variable is equal to test_number ", test_number_let);
            return test_number_let;
            break;
        default:
            console.log("Given variable is not equal to any known values!");
            return null;
            break;
    }
}

function main_execution(){
    console.log("Initializing function...");
    console.log("--------------------------------");
    console.log("Running function for number ", test_number_1);
    let var_result = f_test(test_number_1);
    console.log("Result: ", var_result)
    console.log("--------------------------------");
    console.log("Running function for number ", test_number_2);
    var_result = f_test(test_number_2);
    console.log("Result: ", var_result)
    console.log("--------------------------------");
    console.log("Execution ended!\n");
    return var_result;
}

// variables initialized
let test_number_1 = 343;
let test_number_2 = 434;
var result;

// execution
result = main_execution()
console.log("Final result: ", result, "\n");