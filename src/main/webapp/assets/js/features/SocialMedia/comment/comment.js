import * as CommentCreator from '../../../components/socialMedia/comment.js'
import * as CommentServer from './server.js'
import * as PostCreator from '../../../components/socialMedia/post.js'

const init = async () => {
    let postData = await CommentServer.getPostFromUUID();
    let newsfeed = document.getElementsByClassName('newsfeed').item(0);

    if(postData == null) {
        //error
        console.log('error 404')
    }
    let postTime = postData.uploadDate[2] + '/' + postData.uploadDate[1] + '/' + postData.uploadDate[0];
    PostCreator.createPost(
        postData.uuid,
        postData.authorId,
        postData.authorAvatarLink,
        postData.authorFirstName + ' ' + postData.authorLastName,
        postTime,
        postData.imageLink,
        postData.treeHeartNumber,
        postData.postText,
        newsfeed,
        postData.isLiked,
        true
    );

    newsfeed.appendChild(document.getElementsByClassName('comment-section').item(0));
    
    CommentCreator.fillComment(
        await CommentServer.getCommentFromPost()
    );

    let input = document.getElementsByClassName('comment-input').item(0);
    input.addEventListener('keyup', async (e) => {
        if(e.keyCode == 13) {
            CommentServer.sendComment(input.value);
            input.value = '';
            for(let commentItem of document.getElementsByClassName('comment')) {
                commentItem.remove();
            }
            CommentCreator.fillComment(
                await CommentServer.getCommentFromPost()
            );
        }
    })
}

init();