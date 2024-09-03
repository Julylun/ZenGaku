export {
    getMessages
}
const getMessages = async (accessToken) => {
    let formData = new FormData();
    formData.append('type','GET_MESSAGES');
    formData.append('accessToken',localStorage.authToken);
    let response = await fetch('/Zentizen/messages/direct',{method: 'POST', body: formData});
    return response;
}