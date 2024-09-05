import * as HTMLDom from '../HTMLDom.js'
export {
    fillComment
}
const getCommentSection = (commentSectionElement) => {
    return (commentSectionElement) ? commentSectionElement : document.getElementsByClassName('comment-section').item(0);
}
const createComment = (name, avatarPath, commentText) => {
    // <div class="comment">
    //                 <img src="/assets/resources/img/HoangLuan_Avt_demo.png" alt="Hoang Luan" class="avatar">
    //                 <div class="comment-content">
    //                     <div class="name-row">
    //                         <h4>Hoang Luan</h4>
    //                     </div>
    //                     <div class="block_parag">
    //                         <p>Bạn và tôi nhưu đôi bạn thân Bạn và tôi nhưu đôi bạn thân Bạn và tôi nhưu đôi bạn thân
    //                             Bạn và tôi nhưu đôi bạn thân Bạn và tôi nhưu đôi bạn thân</p>
    //                     </div>
    //                 </div>
    //             </div>
    let _commentSection = document.getElementsByClassName('thanhngang').item(0);
    let commentSeciton = getCommentSection(_commentSection);
    let commentItem = HTMLDom.createElement('div',['comment'],commentSeciton,{});
    let avatarImage = HTMLDom.createElement(`img`,['avatar'],commentItem,{});
    avatarImage.src = avatarPath;
    let commentContent = HTMLDom.createElement('div',['comment-content'],commentItem,{});
    HTMLDom.createElement('h4',[],
        HTMLDom.createElement('div',['name-row'],commentContent,{})
    ,{innerHTML: name});

    HTMLDom.createElement('p',[],
       HTMLDom.createElement('div',['block-parag'],commentContent,{})
    ,{innerHTML: commentText});
}

const fillComment = (commentList) => {
    for(let comment of commentList) {
        createComment(comment.authorName,comment.authorAvatarHref,comment.commentText);
    }
}