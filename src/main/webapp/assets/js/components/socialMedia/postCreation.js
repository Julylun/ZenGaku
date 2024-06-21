import * as HTMLDom from '../HTMLDom.js'
import * as Post from './post.js'
export {
    createUploadPost,
    setUploadPostPaneEnable,
    uploadPostAction
}

function createUploadPost(){
    let uploadPost = document.getElementById('upload-post');
    if(!uploadPost)
        uploadPost = HTMLDom.createElement('div',[],document.body,{},'upload-post');

    let uploadPane = HTMLDom.createElement('div',[],uploadPost,{},'upload-pane');

    let uploadPaneHead = HTMLDom.createElement('div',[],uploadPane,{},'upload-pane-head');

    HTMLDom.createElement('p',[],
        HTMLDom.createElement('div',[],uploadPaneHead,{},'upload-pane-head-label'),
    {innerText: 'Create post'});

    let uploadButtonContainer = HTMLDom.createElement('form',[],uploadPaneHead,{},'upload-button-container');
    HTMLDom.createElement('input',[],uploadButtonContainer,{type: 'file', name: 'img', accept: 'image/*', hidden: 'true'},'upload-button-input');
    let label = HTMLDom.createElement('label',[],uploadButtonContainer,{htmlFor: 'upload-button-input',    innerText: 'Add image'},'upload-label');
    // label.htmmlFor = 'upload-button-input';
    
    
    HTMLDom.createElement('p',[], uploadButtonContainer,
    {innerText: 'Cancel'},'upload-pane-cancel-button');
    
    HTMLDom.createElement('div',['upload-post-line'],
        HTMLDom.createElement('div',['upload-line-container'],uploadPane,{},'upload-line-top'),
    {})

    
    HTMLDom.createElement('textarea',[],
        HTMLDom.createElement('div',[],uploadPane,{},'upload-pane-content-container')
    ,{placeholder: 'What are you thinking about?'}, 'upload-caption-input');

    HTMLDom.createElement('div',['upload-post-line'],
        HTMLDom.createElement('div',['upload-line-container'],uploadPane,{},'upload-line-bottom'),
    {});

    
    HTMLDom.createElement('button',[],
        HTMLDom.createElement('div',[],uploadPane,{},'upload-pane-bottom'),
    {innerText: 'Post', type: 'button'},'upload-post-button');

    //Remove upload pane when use click on cancel
    document.getElementById('upload-pane-cancel-button').addEventListener('mouseup',function(){
        setUploadPostPaneEnable();
    });
    document.getElementById('upload-pane-cancel-button').addEventListener('touchend',function(){
        setUploadPostPaneEnable();
    });

    //replace text when user upload image
    document.getElementById('upload-button-input').addEventListener('change',function(){
        document.getElementById('upload-label').innerText = 'Replace image'
    })

    document.getElementById('upload-post-button').addEventListener('click',function(){
        uploadPostAction();
    })
}


function setUploadPostPaneEnable(){
        let tmp = document.getElementById('upload-post');
        if(tmp){
            document.getElementById('upload-pane-cancel-button').remove('click',null)
            tmp.remove();
        } 
        else {
            createUploadPost();
        }
}

function uploadPostAction(){
    let formData = new FormData();
    formData.append('type', 'upPost');
    formData.append('caption', document.getElementById('upload-caption-input').value);
    formData.append('image', document.getElementById('upload-button-input').files[0]);
    formData.append('accessToken',localStorage.getItem("authToken"));

    fetch('/ZenGaku_Full_war/api/post',{
        method: 'POST',
        // headers: {'Content-Type': 'multipart/form-data'},
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.isSuccessful == 'true'){
            let newsfeed = document.getElementsByClassName('newsfeed').item(0);
            Post.createPost(
                data.uuid,
                data.authorAvatarLink,
                data.authorFirstName + " " + data.authorLastName,
                2023,
                data.imageLink,
                data.treeNumber,
                data.caption,
                newsfeed,
                false,
                true
            )
            setUploadPostPaneEnable();
        }
    })
    .catch((error) => {
        console.error('Error while post...',error);
    })
}