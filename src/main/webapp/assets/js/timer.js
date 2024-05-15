let optionList = document.getElementsByClassName("option");
let startButton = document.getElementById('startButton');
let choice = -1;
let buttonAbility = 1;

for(let option of optionList){
    option.addEventListener('click', function(){
        for(let _option of optionList){
            _option.classList.remove('selected');
        }
        option.classList.add('selected');
        switch(option.id){
            case 'pomodoro':{
                choice = 0; 
                break;
            }
            case 'shortBreak':{
                choice = 1;
                break;
            }
            case 'longBreak':{
                choice = 2;
                break;
            }
            default:{
                choice = -1;
            }
        }
    })
}

if(buttonAbility == 1)
startButton.addEventListener('click',function(){
    let option = document.getElementsByClassName('selected').item(0);
    for(let option of optionList) {
        option.style.display = "none";
    }
    // option.style.display = "block";
    // document.getElementsByClassName('selected').item(0).style.position = 'absolute';
    let selectedOption = document.getElementsByClassName('selected-option').item(0);
    selectedOption.style.display = "block";
    selectedOption.innerHTML = option.getElementsByTagName('span').item(0).innerHTML;
    


    document.getElementsByClassName('space-option').item(0).style.display = "block";
    buttonAbility = 2;
    

})



// var options = document.querySelectorAll('.option');
// var startButton = document.getElementById('startButton');
// var skipButton = document.getElementById('skipButton');
// var pauseButton = document.getElementById('pauseButton');
// var stopButton = document.getElementById('stopButton');
// var time = document.getElementById('time');


// document.addEventListener('DOMContentLoaded', function() {
//     skipButton.style.display = 'none';
//     pauseButton.style.display = 'none';
//     stopButton.style.display = 'none';

// options.forEach(function(option) {
//     option.addEventListener('click', function() {
//         options.forEach(function(opt) {
//             opt.classList.remove('selected');
//         });
//         this.classList.add('selected');
//         this.style.fontSize = '1.2em';
//     });
// });
// // function moveTextUp(text, pixels) {
// //     var interval = setInterval(function() {
// //         var currentPos = parseInt(window.getComputedStyle(time).top);
// //         if (currentPos <= pixels) {
// //             clearInterval(interval);
// //         } else {
// //             time.style.top = (currentPos - 5) + 'px';
// //         }
// //     }, 10);
// // }
// startButton.addEventListener('click', function() {
//     var selectedOption = document.querySelector('.option.selected');
//     if (selectedOption) {
//         if (selectedOption.id === 'pomodoro') {
//             // time.style.display = 'block';
//             // moveTextUp('pomodoro', 30);
//             skipButton.style.display = 'block';
//             startButton.style.display = 'none';
//             options.forEach(function(opt) {
//                 if (opt.id !== 'pomodoro') {
//                     opt.style.display = 'none';
//                 }
//             });
//         } else if (selectedOption.id === 'shortBreak') {
//             skipButton.style.display = 'block';
//             startButton.style.display = 'none';
//             options.forEach(function(opt) {
//                 if (opt.id !== 'shortBreak') {
//                     opt.style.display = 'none';
//                 }
//             });
//         } else if (selectedOption.id === 'longBreak') {
//             stopButton.style.display = 'block';
//             startButton.style.display = 'none';
//             options.forEach(function(opt) {
//                 if (opt.id !== 'longBreak') {
//                     opt.style.display = 'none';
//                 }
//             });
//         }
//     } else {
//         alert('Chọn đi, chọn chọn');
//     }
// });
// });


