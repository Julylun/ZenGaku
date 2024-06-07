export {
    createElement,
    createNotificationItem,
    addNotificationPanel,
    createPost,
    addPosts,
    loadPost,
    setUploadPostPaneEnable,
    createUploadPost,
    addPostDebugging,

}

function createElement(tag, classNameS, parent, attributes = {}, id) {
    let element = document.createElement(tag);
    // if (className) element.className = className;
    if(!classNameS.length == 0)
    for(let className of classNameS) {
        element.classList.add(className);
    }
    for (let key in attributes) {
        element[key] = attributes[key];
    }
    // console.log(id)
    if (id) element.id = id;
    if (parent) parent.appendChild(element);
    
    return element;
}



//------------------------------ NOTIFICATION PANE -------------------------------------------------------------------

function createNotificationItem(title, contentText) {
    let parent = createElement('div', ['notify-content-item']);

    let child = createElement('div', ['notify-content-item-icon-layer'], parent);
    createElement('img', [], child, { src: 'assets/resources/img/notify-notification-icon.svg' });

    let textContainer = createElement('div', ['notify-content-item-text-container'], parent);
    createElement('p', ['notify-title'], textContainer, { innerHTML: title });
    createElement('p', ['notify-message'], textContainer, { innerHTML: contentText });

    let lineContainer = createElement('div', ['notify-line-container'], parent);
    createElement('div', ['notify-light-line'], lineContainer);

    return parent;
}

function addNotificationPanel(imgPath) {
    let notificationDivTag = document.getElementById("notify-panel");

    let accountDisplay = createElement('div', ['notify-account-display'], notificationDivTag);
    let avatarContainer = createElement('div', ['notify-avatar-container'], accountDisplay);
    createElement('img', [], avatarContainer, { src: imgPath });

    let textContainer = createElement('div', ['notify-text-container'], accountDisplay);

    let textOnTop = createElement('div', ['notify-text-on-top'], textContainer);
    createElement('p', '', textOnTop, { innerHTML: "Hello" });

    let dayXaHoi = createElement('div', ['notify-text-day-xa-hoi'], textContainer);
    createElement('p', ['notify-account-name'], dayXaHoi, { innerText: "NAME" });
    createElement('p', ['notify-account-point'], dayXaHoi, { innerText: "1234 tree points" });

    let boldLineContainer = createElement('div', ['notify-line-container'], notificationDivTag);
    createElement('div', ['notify-bold-line'], boldLineContainer);

    let contentDisplay = createElement('div', ['notify-content-display'], notificationDivTag);
    contentDisplay.appendChild(createNotificationItem("Mèo con đang buồn đấy!", "Mùa nuôi mèo đến rồi, cậu chủ thì vẫn ngồi lì ở ra đó."));
    contentDisplay.appendChild(createNotificationItem("Đã Lâu lắm rồi cậu chủ không trở lại.", "Có nằm mơ cũng không tin được mình bị cậu chủ đối xử như vậy."));
    contentDisplay.appendChild(createNotificationItem("Cậu chủ, lại chơi với mèo đi.", "Cậu chủ thật là không có lương tâm gì cả, đã bao ngày xa cách như vậy."));

    let bottomPanel = createElement('div', ['notify-bottom-panel'], notificationDivTag);
    let buttonContainer = createElement('div', ['notify-button-container'], bottomPanel);
    createElement('img', ['notify-exit-button'], buttonContainer, { src: 'assets/resources/img/notify-logout.svg' });
}


//------------------------------ POST -------------------------------------------------------------------

function createPost(uuid, avatarHref, userName, postTime, postImageHref, treeNumber, caption, parent, isBefore){
    let post; 
    if(isBefore) {
        post = createElement('div',['post'],null,{},uuid);
        parent.insertBefore(post,parent.firstChild);
    } else {
        post = createElement('div',['post'],parent,{},uuid);
    }

    let postUserInformation = createElement('div',['post-user-information'],post,{});
    //Create avatar
    if(avatarHref == 'dEfAuLt') avatarHref = 'assets/resources/img/default_avatar.png';
    createElement('img',['avatar-image'],
        createElement('div',['post-avatar'],postUserInformation,{}),
    {src: avatarHref}
    )
    
    let timeUserInformation = createElement('div',['time-user-information'],postUserInformation,{});
    //--Create avatar and user name 
    createElement('p',['user-name'],
        createElement('a',['user-hyperlink'],
            timeUserInformation
        ,{href: '#'})
    ,{innerText: userName});

    let timePrivacy = createElement('div',['time-privacy'],timeUserInformation,{});
    createElement('p',['post-time'],timePrivacy,{innerText: postTime});
    createElement('img',['privacy-icon'],timePrivacy,{src: 'assets/resources/img/public-icon-black.svg'});


    //Post content
    let postContent = createElement('div',['post-content'],post,{});

    //--create post image
    createElement('img',['_post-image'],
        createElement('div',['post-image'],postContent,{}),
    {src: postImageHref})

    //POSTCONTROLPANE - - > space between [[PostControlPaneBtn]        [viewContainer]]
    let postControlPane = createElement('div',['post-control-pane'],postContent,{});

    //--PostControlPaneButton
    let postControlPaneButton = createElement('div',['post-control-pane-button'],postControlPane,{});

    let treeHeartButton = createElement('label',['tree-heart-button'],postControlPaneButton,{});
    createElement('input',['tree-heart-checkbox'],treeHeartButton,{type: 'checkbox', name: 'like-button', value: uuid});
    createElement('img',['tree-heart-image-unchecked'],treeHeartButton,{src: 'assets/resources/img/tree-heart-icon-unchecked-2.svg'});
    createElement('img',['tree-heart-image-checked'],treeHeartButton,{src: 'assets/resources/img/tree-heart-icon-checked-2.svg'});

    createElement('img',['comment-image'],
        createElement('div',['comment-button'],postControlPaneButton,{}),
    {src: 'assets/resources/img/comment-icon-white.svg'}
    );

    createElement('img',['share-image'],
        createElement('div',['share-button'],postControlPaneButton,{}),
    {src: 'assets/resources/img/share-icon-white.svg'}
    );

    //--viewContainer
    createElement('p',['post-number-of-view'],
        createElement('div',['view-container'],postControlPane,{}),
    {innerText: treeNumber + " trees"}
    );

    //--Post caption
    let postCaption = createElement('div',['post-caption'],postContent,{});
    createElement('p',['user-name-caption'],postCaption,{innerText: userName});
    createElement('p',['user-caption'],postCaption,{innerText: caption});

    
    createElement('div',['end-post-line'],
        createElement('div',['line-container'],post,{}),
    {});


    return post;
}


function removeWrap(text){
    text = text.replace(/(\r\n|\n|\r)/gm, " ");
    if(text.length > 35){
        text = text.substring(0,25) + "... more";
    }
    return text;
}
function addPosts(postList){
    let newsfeed = document.getElementsByClassName('newsfeed').item(0);
    for(let post of postList){
        createPost(post.uuid,
            post.authorAvatarLink,
            post.authorFirstName + " " + post.authorLastName,
            post.uploadDate[0],
            post.imageLink,
            post.treeHeartNumber,
            removeWrap(post.postText),
            newsfeed
        )
    }
}

function loadPost(){
    fetch('/ZenGaku_Full_war/api/post',{
        method: 'GET'
    }).then((response) => response.json()
    ).then((postList) => {
        addPosts(postList)
    })
    .catch((error) => {
            console.log(error);
    }); 
}

function createUploadPost(){
    let uploadPost = document.getElementById('upload-post');
    if(!uploadPost)
        uploadPost = createElement('div',[],document.body,{},'upload-post');

    let uploadPane = createElement('div',[],uploadPost,{},'upload-pane');

    let uploadPaneHead = createElement('div',[],uploadPane,{},'upload-pane-head');

    createElement('p',[],
        createElement('div',[],uploadPaneHead,{},'upload-pane-head-label'),
    {innerText: 'Create post'});

    let uploadButtonContainer = createElement('form',[],uploadPaneHead,{},'upload-button-container');
    createElement('input',[],uploadButtonContainer,{type: 'file', name: 'img', accept: 'image/*', hidden: 'true'},'upload-button-input');
    let label = createElement('label',[],uploadButtonContainer,{htmlFor: 'upload-button-input',    innerText: 'Add image'},'upload-label');
    // label.htmmlFor = 'upload-button-input';
    
    
    createElement('p',[], uploadButtonContainer,
    {innerText: 'Cancel'},'upload-pane-cancel-button');
    
    
    
    createElement('div',['upload-post-line'],
        createElement('div',['upload-line-container'],uploadPane,{},'upload-line-top'),
    {})

    
    createElement('textarea',[],
        createElement('div',[],uploadPane,{},'upload-pane-content-container')
    ,{placeholder: 'What are you thinking about?'}, 'upload-caption-input');

    createElement('div',['upload-post-line'],
        createElement('div',['upload-line-container'],uploadPane,{},'upload-line-bottom'),
    {});

    
    createElement('button',[],
        createElement('div',[],uploadPane,{},'upload-pane-bottom'),
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
        console.log(document.getElementById('upload-button-input').files[0]);
    })

    document.getElementById('upload-post-button').addEventListener('click',function(){
        uploadPostAction();
    })
}


function setUploadPostPaneEnable(){
    // console.log(':)')
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
    let caption = document.getElementById('upload-caption-input').value;
    let image = document.getElementById('upload-button-input').files[0];
    let accessToken = localStorage.getItem("authToken");
    formData.append('caption', caption);
    formData.append('image', image);
    formData.append('accessToken',accessToken);
    
    console.log(document.getElementById('upload-caption-input').value +"\n" + 'image',document.getElementById('upload-button-input').files[0] + "n"
    +"\n" + localStorage.getItem("authToken"));

    fetch('/ZenGaku_Full_war/api/post',{
        method: 'POST',
        // headers: {'Content-Type': 'multipart/form-data'},
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if(data.isSuccessful == 'true'){
            let newsfeed = document.getElementsByClassName('newsfeed').item(0);
            createPost(
                data.uuid,
                data.authorAvatarLink,
                data.authorFirstName + " " + data.authorLastName,
                2023,
                data.imageLink,
                data.treeNumber,
                data.caption,
                newsfeed,
                true
            )
            setUploadPostPaneEnable();
        }
    })
    .catch((error) => {
        console.error('Error while post...',error);
    })
}





//------------------------------ DEBUG -------------------------------------------------------------------



function addPostDebugging(){
    let newsfeed = document.getElementsByClassName('newsfeed').item(0);
    createPost('12345','aaa','aaaa',2023,'xfsfds',1234, 'Hahahaha',newsfeed);
    createPost('12345','aaa','aaaa',2023,'xfsfds',1234, 'Hahahaha',newsfeed);
    createPost('12345','aaa','aaaa',2023,'xfsfds',1234, 'Hahahaha',newsfeed);
    createPost('12345','aaa','aaaa',2023,'xfsfds',1234, 'Hahahaha',newsfeed);
    createPost('12345','aaa','aaaa',2023,'xfsfds',1234, 'Hahahaha',newsfeed);
    createPost('12345','aaa','aaaa',2023,'xfsfds',1234, 'Hahahaha',newsfeed);
    createPost('12345','aaa','aaaa',2023,'xfsfds',1234, 'Hahahaha',newsfeed);
    createPost('12345','aaa','aaaa',2023,'xfsfds',1234, 'Hahahaha',newsfeed);
}


loadPost();

// addNotificationPanel("");

// addPostDebugging();

// setUploadPostPaneEnable();




































    