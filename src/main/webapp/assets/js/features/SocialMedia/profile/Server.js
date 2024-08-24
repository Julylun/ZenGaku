export {
    getPostByJwt
}

const getPostByJwt = async (jwtString) => {
    let formData = new FormData();
    formData.append('accessToken',jwtString);
    let response; 
    response = await fetch (window.location.href, {
        method: 'POST',
        body: formData
    });

    return response;
}