import * as laicosFunction from './laicosFuntion.js'
import * as NotificationComponents from './components/notificationPanel.js'

function getInfo(accessToken){
    let data = new FormData();
    data.append("accessToken",accessToken)
    fetch('/api/getInfo',{
        method: 'POST',
        body: data
    })
    .then(response => response.json())
    .then(data => {
        if(data.status == 1){
            //Save info
        }
        else if(data.status == 0){
            //Refresh token
        }
    })
}


document.getElementById('tree-button').addEventListener('mousedown',function(){
    document.getElementById('notify-panel').style.display = 'block';
    NotificationComponents.addNotificationPanel();
    document.addEventListener('click',function(event){
        let tmp = document.getElementById('notify-panel');
        if(tmp.offsetLeft < event.clientX && event.clientX <tmp.offsetLeft+tmp.offsetWidth
            && tmp.offsetTop < event.clientY && event.clientY < tmp.offsetHeight+tmp.offsetTop
        ){
        }
        else {
            document.getElementById('notify-panel').style.display = 'none';
            document.getElementById('notify-panel').innerHTML = "";
        }
    })
})


document.getElementById('nav-add-post').addEventListener('click',function(){
    console.log(':D')
    laicosFunction.setUploadPostPaneEnable();
})







// laicosFunction.addPostDebugging();
// alias.setUploadPostPaneEnable();