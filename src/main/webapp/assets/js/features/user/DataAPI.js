
export {
    uploadSavedData
}

/**
 * @param {JSON String} authToken
 * @param {JSON String} data 
 */
const uploadSavedData = async (authToken,data) => {
    let formData = new FormData();
    formData.append('type','savedData');
    formData.append('accessToken',authToken);
    formData.append('data',data);
    let response = await fetch('/api/user/data',{
        method: 'POST',
        body: formData
    });
    return response;
}