//------------------------------ POST -------------------------------------------------------------------
//Create a post html element which is used to display on newsfeed HTML element
import * as HTMLDom from '../HTMLDom.js'
import * as FetchAPI from '../../features/SocialMedia/fetchAPI.js'
export {
    createPost,
    removeWrap,
    addPosts,
    loadPost
}
const createPost = (uuid, avatarHref, userName, postTime, postImageHref, treeNumber, caption, parent, isLiked, isBefore) => {
    let post; 
    if(isBefore) {
        post = HTMLDom.createElement('div',['post'],null,{},uuid);
        parent.insertBefore(post,parent.firstChild);
    } else {
        post = HTMLDom.createElement('div',['post'],parent,{},uuid);
    }

    let postUserInformation = HTMLDom.createElement('div',['post-user-information'],post,{});
    //Create avatar
    if(avatarHref == 'dEfAuLt') avatarHref = 'assets/resources/img/default_avatar.png';
    HTMLDom.createElement('img',['avatar-image'],
        HTMLDom.createElement('div',['post-avatar'],postUserInformation,{}),
    {src: avatarHref}
    )
    
    let timeUserInformation = HTMLDom.createElement('div',['time-user-information'],postUserInformation,{});
    //--Create avatar and user name 
    HTMLDom.createElement('p',['user-name'],
        HTMLDom.createElement('a',['user-hyperlink'],
            timeUserInformation
        ,{href: '#'})
    ,{innerText: userName});

    let timePrivacy = HTMLDom.createElement('div',['time-privacy'],timeUserInformation,{});
    HTMLDom.createElement('p',['post-time'],timePrivacy,{innerText: postTime});
    HTMLDom.createElement('img',['privacy-icon'],timePrivacy,{src: 'assets/resources/img/public-icon-black.svg'});

    let postContent = HTMLDom.createElement('div',['post-content'],post,{});

    
    HTMLDom.createElement('img',['_post-image'],
        HTMLDom.createElement('div',['post-image'],postContent,{}),
    {src: postImageHref});

    
    let postControlPane = HTMLDom.createElement('div',['post-control-pane'],postContent,{});

    
    let postControlPaneButton = HTMLDom.createElement('div',['post-control-pane-button'],postControlPane,{});

    let treeHeartButton = HTMLDom.createElement('label',['tree-heart-button'],postControlPaneButton,{});
    let checkbox = HTMLDom.createElement('input',['tree-heart-checkbox'],treeHeartButton,{type: 'checkbox', name: 'like-button', value: (isLiked) ? "-1" : "1"});
    if(isLiked){
        checkbox.checked = true;
    }
    let unChecked = HTMLDom.createElement('img',['tree-heart-image-unchecked'],treeHeartButton,{src: 'assets/resources/img/tree-heart-icon-unchecked-2.svg'});
    let checked = HTMLDom.createElement('img',['tree-heart-image-checked'],treeHeartButton,{src: 'assets/resources/img/tree-heart-icon-checked-2.svg'});
    
    console.log(isLiked);
    

    //Click on image

    //Like
    ['mousedown','ontouchcancel'].forEach((_event) => {
        treeHeartButton.addEventListener(_event,() => {
            FetchAPI.likePost(uuid,sessionStorage.userId);
            treeNumber = ((typeof(treeNumber) == "string") ? parseInt(treeNumber) : treeNumber);
            treeNum.innerText = (treeNumber += parseInt(checkbox.value)) + " trees";
            checkbox.value = -parseInt(checkbox.value);

        });
    })
    

    HTMLDom.createElement('img',['comment-image'],
        HTMLDom.createElement('div',['comment-button'],postControlPaneButton,{}),
    {src: 'assets/resources/img/comment-icon-white.svg'}
    );

    HTMLDom.createElement('img',['share-image'],
        HTMLDom.createElement('div',['share-button'],postControlPaneButton,{}),
    {src: 'assets/resources/img/share-icon-white.svg'}
    );

    let treeNum = HTMLDom.createElement('p',['post-number-of-view'],
        HTMLDom.createElement('div',['view-container'],postControlPane,{}),
    {innerText: treeNumber + " trees"}
    );

    let postCaption = HTMLDom.createElement('div',['post-caption'],postContent,{});
    HTMLDom.createElement('p',['user-name-caption'],postCaption,{innerText: userName});
    HTMLDom.createElement('p',['user-caption'],postCaption,{innerText: caption});

    HTMLDom.createElement('div',['end-post-line'],
        HTMLDom.createElement('div',['line-container'],post,{}),
    {});


    return post;
}

const removeWrap = (text) => {
    text = text.replace(/(\r\n|\n|\r)/gm, " ");
    if(text.length > 35){
        text = text.substring(0,25) + "... more";
    }
    return text;
}

const addPosts = (postList) => {
    let newsfeed = document.getElementsByClassName('newsfeed').item(0);
    for(let post of postList){
        createPost(post.uuid,
            post.authorAvatarLink,
            post.authorFirstName + " " + post.authorLastName,
            post.uploadDate[0],
            post.imageLink,
            post.treeHeartNumber,
            removeWrap(post.postText),
            newsfeed,
            post.isLiked
        )
    }
}

const loadPost = () => {
    let formData = new FormData();
    formData.append('type','getPost');
    formData.append('userId',sessionStorage.userId);
    fetch('/ZenGaku_Full_war/api/post',{
        method: 'POST',
        body: formData
    }).then((response) => response.json()
    ).then((postList) => {
        addPosts(postList)
    })
    .catch((error) => {
            console.log(error);
    }); 
}