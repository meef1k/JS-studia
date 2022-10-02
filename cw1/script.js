document.querySelector("#calculate").addEventListener("click",calculate);
function calculate(){
    const inputs = document.querySelectorAll(".numbers");
    const numbers = [];
    for(let i = 0; i < inputs.length; ++i){
        numbers[i] = parseInt(inputs[i].value);
    }
    console.log(numbers);
    const sum = numbers.reduce((a, b) => a + b, 0);
    const avg = (sum / numbers.length) || 0;
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    document.querySelector(".sum").innerHTML = "Sum: " + sum;
    document.querySelector(".avg").innerHTML = "Avg: " + avg;
    document.querySelector(".min").innerHTML = "Min: " + min;
    document.querySelector(".max").innerHTML = "Max: " + max;
    console.log(sum);
    console.log(avg);
    console.log(min);
    console.log(max);
}
