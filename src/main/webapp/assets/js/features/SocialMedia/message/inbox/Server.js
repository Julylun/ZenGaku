export {
    getChatStory
}
const getChatStory = async (receiverId) => {
    let formData = new FormData();
    formData.append('receiverId',receiverId);
    formData.append('accessToken',localStorage.authToken);
    formData.append('type','GET_CHAT_STORY');
    let response = await fetch('/Zentizen/messages/direct', {
        method: 'POST',
        body: formData
    })

    if(response) return await response.json();
    else {
        console.log("Error occured when fetch get chat story.",await response.error);
        return null;
    }
}