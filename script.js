var current_money = 0;
var click_money = 1;
var buy_one_time = 1000;
var current_workers = 0;

function Buy_one(){

    if (current_workers < 1 & current_money >= 10){
        buy_one_timed()
        timer = setInterval(buy_one_timed, buy_one_time);
        document.getElementById("myprogressBar").style.backgroundColor = "#7CFC00"
    }

    if (current_money >= 10) {
        current_money -= 10;        
        current_workers += 1;
        update_money();
        update_workers();
        document.querySelector('#click_button').disabled = true;        
    }

    function buy_one_timed(){
        
        var element = document.getElementById("myprogressBar");
        var width = 1;
        var identity = setInterval(scene, 10);
        function scene() {
        if (width >= 100) {
            clearInterval(identity);
            current_money += current_workers;
            update_money();
        } else {
            width++; 
            element.style.width = width + '%';
        }    
        } 
        
    }
}

function update_money(){
    document.getElementById("current_money_id").innerHTML = `Current money: ${current_money}$`
}

function update_workers(){
    document.getElementById("current_workers_id").innerHTML = `Current workers: ${current_workers}`
}

function update() {

    
    var element = document.getElementById("myprogressBar");
    var width = 1;
    var identity = setInterval(scene, 10);
    function scene() {
    if (width >= 100) {
        clearInterval(identity);
        document.querySelector('#click_button').disabled = false;
        document.getElementById("myprogressBar").style.backgroundColor = "#DC143C"

        // document.getElementById('click_button').style.backgroundColor = "#1899D6"

        current_money += click_money;   
        update_money(click_money);
    } else {
        width++; 
        element.style.width = width + '%';
        // document.getElementById('click_button').style.backgroundColor = "#DC143C"

        document.getElementById("myprogressBar").style.backgroundColor = "#7CFC00"
        document.querySelector('#click_button').disabled = true;              
    }    
  }
    
}