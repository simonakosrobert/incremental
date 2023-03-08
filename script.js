$(window).on('load', function () {
    $('#loading').hide();
  }) 

// WORKERS
var current_money = 0;
var click_money = 1;
var buy_one_time = 1000;
var current_workers = 0;
var identity;
var worker_price = 10;
var worker_multiplier = 1.1;
var timer;

function buy_one_timed(){
    
    var element = document.getElementById("myprogressBar");
    var width = 1;
    var buy_one_interval = setInterval(worker_scene, buy_one_time/100);
    function worker_scene() {
    if (width >= 100) {
        clearInterval(buy_one_interval);
        current_money += current_workers;
        update_money();
    } else {
        width++; 
        element.style.width = width + '%';
    }    
    } 
    
}

function Buy_speed(){
    if (current_workers >= 1 & current_money >= 1000){
        current_money -= 1000;
        update_money()
        clearInterval(timer);
        buy_one_time /= 2;
        timer = setInterval(buy_one_timed, buy_one_time);
        document.querySelector('#worker_speed_button').disabled = true;
        document.getElementById("worker_speed_button").innerHTML = `DOUBLE SPEED BOUGHT!`
    }
}

function Buy_one(){
    //First time buying
    if (current_workers < 1 & current_money >= Math.ceil(worker_price)){
        buy_one_timed();
        current_money -= Math.ceil(worker_price);  
        worker_price *= worker_multiplier;      
        current_workers += 1;
        update_money();
        update_workers(); 
        update_worker_buy_button()
        clearInterval(identity)
        timer = setInterval(buy_one_timed, buy_one_time);
        document.getElementById("myprogressBar").style.backgroundColor = "#7CFC00"
        document.querySelector('#click_button').disabled = true;
        document.getElementById("click_button").innerHTML = `AUTO`
        document.querySelector('#camp_click_button').disabled = false;
    }
    //After first buying
    else if (current_money >= Math.ceil(worker_price)) {
        current_money -= Math.ceil(worker_price);  
        worker_price *= worker_multiplier;      
        current_workers += 1;
        update_money();
        update_workers();     
        update_worker_buy_button()           
    }


}

function update_worker_buy_button(){
    document.getElementById("worker_buy_button").innerHTML = `Buy 1 for ${Math.ceil(worker_price)}$`
}

function update_money(){
    document.getElementById("current_money_id").innerHTML = `Current money: ${current_money}$`
}

function update_workers(){
    document.getElementById("current_workers_id").innerHTML = `Current workers: ${current_workers}`
}

function update() {

    //CLICK WORKER
    var element = document.getElementById("myprogressBar");
    var width = 1;
    identity = setInterval(click_scene, buy_one_time/100);
    function click_scene() {
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


//CAMPS

if (current_workers < 1){
    document.querySelector('#camp_click_button').disabled = true;
}

var camp_click = 1;
var camp_speed = 2000;
var camp_identity;
var camp_current = 0;
var camp_price = 1000;
var camp_multiplier = 1.15;
var buy_one_camp_interval;

function update_camp_number(){
    document.getElementById("current_camps_id").innerHTML = `Current camps: ${camp_current}`
}

function update_camp_buy_button(){
    document.getElementById("camp_buy_button").innerHTML = `Buy 1 for ${Math.ceil(camp_price)}$`
}

function Buy_camp_speed(){
    if (camp_current >= 1 & current_money >= 10001){
        current_money -= 10000;
        update_money()
        clearInterval(camp_timer);
        camp_speed /= 2;
        buy_one_camp_interval = setInterval(buy_one_timed_camp, camp_speed);
        document.querySelector('#camp_speed_button').disabled = true;
        document.getElementById("camp_speed_button").innerHTML = `DOUBLE SPEED BOUGHT!`
    }
}


function click_camp() {
    var element = document.getElementById("Camp_progress_bar");
    var width = 1;
    camp_identity = setInterval(camp_scene, camp_speed/100);
    function camp_scene() {
    if (width >= 100) {
        clearInterval(camp_identity);
        document.querySelector('#camp_click_button').disabled = false;
        document.getElementById("Camp_progress_bar").style.backgroundColor = "#DC143C"

        // document.getElementById('click_button').style.backgroundColor = "#1899D6"
        current_workers += camp_click;   
        update_workers();
    } else {
        width++; 
        element.style.width = width + '%';
        // document.getElementById('click_button').style.backgroundColor = "#DC143C"

        document.getElementById("Camp_progress_bar").style.backgroundColor = "#7CFC00"
        document.querySelector('#camp_click_button').disabled = true;              
    }    
  }
    
}

function buy_one_timed_camp(){
    
    var element = document.getElementById("Camp_progress_bar");
    var width = 1;
    var buy_one_camp_interval = setInterval(camp_scene, camp_speed/100);
    function camp_scene() {
    if (width >= 100) {
        clearInterval(buy_one_camp_interval);
        current_workers += camp_current;
        update_workers();
    } else {
        width++; 
        element.style.width = width + '%';
    }    
    } 
    
}

function Buy_one_camp(){
    //First time buying
    if (camp_current < 1 & current_money >= Math.ceil(camp_price)){
        buy_one_timed_camp();
        current_money -= Math.ceil(camp_price);  
        camp_price *= camp_multiplier;      
        camp_current += 1;
        update_camp_number() 
        clearInterval(camp_identity)
        camp_timer = setInterval(buy_one_timed_camp, camp_speed);
        document.getElementById("Camp_progress_bar").style.backgroundColor = "#7CFC00";
        document.querySelector('#camp_click_button').disabled = true;
        document.getElementById("camp_click_button").innerHTML = `AUTO`;
        update_camp_buy_button();
    }
    //After first buying
    else if (current_money >= Math.ceil(camp_price)) {
        current_money -= Math.ceil(camp_price);  
        camp_price *= camp_multiplier;      
        camp_current += 1;
        update_camp_number();
        update_camp_buy_button();          
    }
}