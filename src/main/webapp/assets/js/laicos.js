import * as laicosFunction from './laicosFuntion.js'

document.getElementById('tree-button').addEventListener('mousedown',function(){
    document.getElementById('notify-panel').style.display = 'block';
    document.addEventListener('click',function(event){
        let tmp = document.getElementById('notify-panel');
        if(tmp.offsetLeft < event.clientX && event.clientX <tmp.offsetLeft+tmp.offsetWidth
            && tmp.offsetTop < event.clientY && event.clientY < tmp.offsetHeight+tmp.offsetTop
        ){
        }
        else {
            document.getElementById('notify-panel').style.display = 'none';
        }
    })
})


document.getElementById('nav-add-post').addEventListener('click',function(){
    console.log(':D')
    laicosFunction.setUploadPostPaneEnable();
})







// laicosFunction.addPostDebugging();
// alias.setUploadPostPaneEnable();