export {
    getPostFromUUID,
    getCommentFromPost,
    sendComment
}
const sendComment = (commentText) => {
    let formData = new FormData();
    formData.append('userId',sessionStorage.userId);
    formData.append('commentText',commentText);
    formData.append('type','SendComment')
    fetch('/Zentizen/post?uuid=' + new URLSearchParams(window.location.search).get('uuid'), {
        method: 'POST',
        body: formData
    }).then(response => {
        if(response.ok) console.log('sent');
        else console.error(response.error);
    })
}
const getCommentFromPost = async () => {
    let formData = new FormData();
    formData.append('type','GetComments');
    let response = await fetch('/Zentizen/post?uuid='+ new URLSearchParams(window.location.search).get("uuid"), {
        method: 'POST',
        body: formData
    });

    if(response) {
        let data = await response.json();
        return data;
    }
    console.error(response.error);
    return null
}
const getPostFromUUID = async () => {
    let formData = new FormData();
    formData.append('accessToken',localStorage.authToken);
    formData.append('uuid',new URLSearchParams(window.location.search).get("uuid"));
    formData.append('type','getPostByUUID');
    let response = await fetch('/api/post', {
        method: 'POST',
        body: formData
    })

    if(response) {
        if(response.status != 200) {
            return null;
        }

        let post = response.json();
        return post;
    }
    return null;
}