$('#game-stuff').hide();

$(window).on('load', function () {
    $('#loading').delay(1000).fadeOut(1000);
    $('#game-stuff').delay(1000).fadeIn(1000);
  }) 

//#region WORKERS
var current_money = 0;
var click_money = 1;
var buy_one_time = 1000;
var current_workers = 0;
var identity;
var worker_price = 10;
var worker_multiplier = 1.1;
var worker_timer;
var worker_element;

function buy_one_timed(){
    
    worker_element = document.getElementById("worker_progress_bar");
    var width = 0.5;
    var buy_one_interval = setInterval(worker_scene, buy_one_time/200);
    function worker_scene() {
    if (width >= 100) {
        clearInterval(buy_one_interval);
        current_money += current_workers;
        update_money();
    } else {
        width += 0.5; 
        if (buy_one_time >= 1000){
            worker_element.style.width = width + '%';
        }else {
            worker_element.style.width = '100%';
            worker_element.innerHTML = `<font size="5">${1000/buy_one_time}/s</font>`;
            
        }
        
    }    
    } 
    
}

function Buy_speed(){
    if (current_workers >= 1 & current_money >= 1000){
        current_money -= 1000;
        update_money();
        clearInterval(worker_timer);
        buy_one_time /= 2;
        worker_element.style.width = 0.5; 
        //buy_one_timed();       
        worker_timer = setInterval(buy_one_timed, buy_one_time);
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
        clearInterval(worker_click_timer)
        worker_timer = setInterval(buy_one_timed, buy_one_time);
        document.getElementById("worker_progress_bar").style.backgroundColor = "#7CFC00"
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
    worker_element = document.getElementById("worker_progress_bar");
    var width = 0.5;
    worker_click_timer = setInterval(click_scene, buy_one_time/200);
    function click_scene() {
    if (width >= 100) {
        clearInterval(worker_click_timer);
        document.querySelector('#click_button').disabled = false;
        if (current_workers < 1){
            document.getElementById("worker_progress_bar").style.backgroundColor = "#DC143C"
        }
        

        // document.getElementById('click_button').style.backgroundColor = "#1899D6"

        current_money += click_money;   
        update_money(click_money);
    } else {
        width += 0.5; 
        worker_element.style.width = width + '%';
        // document.getElementById('click_button').style.backgroundColor = "#DC143C"

        document.getElementById("worker_progress_bar").style.backgroundColor = "#7CFC00"
        document.querySelector('#click_button').disabled = true;              
    }    
  }
    
}
//#endregion
//#region CAMPS

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
var camp_timer;

function update_camp_number(){
    document.getElementById("current_camps_id").innerHTML = `Current camps: ${camp_current}`
}

function update_camp_buy_button(){
    document.getElementById("camp_buy_button").innerHTML = `Buy 1 for ${Math.ceil(camp_price)}$`
}

function Buy_camp_speed(){
    if (camp_current >= 1 & current_money >= 10001){
        current_money -= 10000;
        update_money();
        clearInterval(camp_timer);
        camp_speed /= 2;
        //buy_one_timed_camp();
        camp_timer = setInterval(buy_one_timed_camp, camp_speed);
        document.querySelector('#camp_speed_button').disabled = true;
        document.getElementById("camp_speed_button").innerHTML = `DOUBLE SPEED BOUGHT!`
    }
}


function click_camp() {
    var element = document.getElementById("Camp_progress_bar");
    var width = 0.5;
    camp_identity = setInterval(camp_scene, camp_speed/200);
    function camp_scene() {
    if (width >= 100) {
        clearInterval(camp_identity);
        document.querySelector('#camp_click_button').disabled = false;
        document.getElementById("Camp_progress_bar").style.backgroundColor = "#DC143C"

        // document.getElementById('click_button').style.backgroundColor = "#1899D6"
        current_workers += camp_click;   
        update_workers();
    } else {
        width += 0.5; 
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
    var buy_one_camp_interval = setInterval(camp_scene, camp_speed/200);
    function camp_scene() {
    if (width >= 100) {
        clearInterval(buy_one_camp_interval);
        current_workers += camp_current;
        update_workers();
    } else {
        width += 0.5; 
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
        document.querySelector('#resource_click_button').disabled = false;
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
//#endregion
//#region RESOURCES

function update_item_number(item_name, current_number){
    document.getElementById(`current_${item_name}_id`).innerHTML = `Current resources: ${current_number}`
}

function update_item_buy_button(item_name, item_price){
    document.getElementById(`${item_name}_buy_button`).innerHTML = `Buy 1 for ${Math.ceil(item_price)}$`
}

// function Buy_item_speed(item_current, item_name, speed_price, timer, item_speed){
//     if (item_current >= 1 & current_money >= speed_price){
//         current_money -= speed_price;
//         update_money();
//         clearInterval(timer);
//         item_speed /= 2;
//         `${item_name}_interval` = setInterval(buy_one_timed_resource, item_speed);
//         document.querySelector(`#${item_name}_speed_button`).disabled = true;
//         document.getElementById(`${item_name}_speed_button`).innerHTML = `DOUBLE SPEED BOUGHT!`
//     }
// }

function InitClickDisable(item_name){
    document.querySelector(`#${item_name}_click_button`).disabled = true;
}




InitClickDisable('resource')

var resource_click = 1;
var resource_speed = 4000;
var resource_identity;
var resource_current = 0;
var resource_price = 10000;
var resource_multiplier = 1.2;
var buy_one_resource_interval;

function update_resource_number(){
    document.getElementById("current_resource_id").innerHTML = `Current resources: ${resource_current}`
}

function update_resource_buy_button(){
    document.getElementById("resource_buy_button").innerHTML = `Buy 1 for ${Math.ceil(resource_price)}$`
}

function Buy_resource_speed(){
    if (resource_current >= 1 & current_money >= 100000){
        current_money -= 100000;
        update_money()
        clearInterval(resource_timer);
        resource_speed /= 2;
        //buy_one_timed_resource();
        resource_timer = setInterval(buy_one_timed_resource, resource_speed);
        document.querySelector('#resource_speed_button').disabled = true;
        document.getElementById("resource_speed_button").innerHTML = `DOUBLE SPEED BOUGHT!`
    }
}


function click_resource() {
    var element = document.getElementById("resource_progress_bar");
    var width = 0.5;
    resource_identity = setInterval(resource_scene, resource_speed/200);
    function resource_scene() {
    if (width >= 100) {
        clearInterval(resource_identity);
        document.querySelector('#resource_click_button').disabled = false;
        document.getElementById("resource_progress_bar").style.backgroundColor = "#DC143C"

        // document.getElementById('click_button').style.backgroundColor = "#1899D6"
        camp_current += resource_click;   
        update_camp_number();
    } else {
        width += 0.5; 
        element.style.width = width + '%';
        // document.getElementById('click_button').style.backgroundColor = "#DC143C"

        document.getElementById("resource_progress_bar").style.backgroundColor = "#7CFC00"
        document.querySelector('#resource_click_button').disabled = true;              
    }    
  }
    
}

function buy_one_timed_resource(){
    
    var element = document.getElementById("resource_progress_bar");
    var width = 0.5;
    var buy_one_resource_interval = setInterval(resource_scene, resource_speed/200);
    function resource_scene() {
    if (width >= 100) {
        clearInterval(buy_one_resource_interval);
        camp_current += resource_current;
        update_camp_number();
    } else {
        width += 0.5; 
        element.style.width = width + '%';
    }    
    } 
    
}

function Buy_one_resource(){
    //First time buying
    if (resource_current < 1 & current_money >= Math.ceil(resource_price)){
        buy_one_timed_resource();
        current_money -= Math.ceil(resource_price);  
        resource_price *= resource_multiplier;      
        resource_current += 1;
        update_resource_number();
        clearInterval(resource_identity);
        resource_timer = setInterval(buy_one_timed_resource, resource_speed);
        document.getElementById("resource_progress_bar").style.backgroundColor = "#7CFC00";
        document.querySelector('#resource_click_button').disabled = true;
        document.getElementById("resource_click_button").innerHTML = `AUTO`;
        update_resource_buy_button();
    }
    //After first buying
    else if (current_money >= Math.ceil(resource_price)) {
        current_money -= Math.ceil(resource_price);  
        resource_price *= resource_multiplier;      
        resource_current += 1;
        update_resource_number();
        update_resource_buy_button();          
    }
}

//#endregion