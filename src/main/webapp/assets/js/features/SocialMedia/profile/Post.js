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

    let data = await response.json();
    console.log(await data);
}