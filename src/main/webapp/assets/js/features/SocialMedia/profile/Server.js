export {
    getPostByJwt,
    sendFrendRequest,
    getFriendStatus,
    cancelFriendRequest,
    acceptFriendRequest,
    editProfile 
}

const EDIT_PROFILE_TYPE = 0;


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

const editProfile = async (jwtString, firstname, lastname, bio, avatar) => {
    let formData = new FormData();
    formData.append('type',EDIT_PROFILE_TYPE);
    formData.append('firstname',firstname);
    formData.append('lastname',lastname);
    formData.append('bio',bio);
    formData.append('avatar',avatar);
    formData.append('accessToken',localStorage.authToken);
    
    let response = await fetch('/Zentizen/profile/edit', {
        method: 'POST',
        body: formData
    });

    if(response) {
        response = response.json();
        if(response.isSuccessful) console.log('Edit profile successfully!');
        else console.error('Failed when edit profile');
    }
}

const sendFrendRequest = async (jwtString) => {
    let formData = new FormData();
    formData.append('accessToken',localStorage.authToken);
    formData.append('type', 'SendFriendRequest');
    formData.append('toId',new URLSearchParams(window.location.search).get('id'));
    
    let response = null;

    response = await fetch("/api/friendship", {
        method: 'POST',
        body: formData
    });

    return response;
}

const cancelFriendRequest = async (jwtString) => {
    let formData = new FormData();
    formData.append('accessToken', localStorage.authToken);
    formData.append('toId',new URLSearchParams(window.location.search).get('id'));
    formData.append('type','CancelFriendRequest')

    let response = null;
    response = await fetch('/api/friendship', {
        method: 'POST',
        body: formData
    });
    
    return response;
}

const acceptFriendRequest = async (jwtString) => {
    let formData = new FormData();
    formData.append('accessToken', localStorage.authToken);
    formData.append('toId',new URLSearchParams(window.location.search).get('id'));
    formData.append('type','AcceptFriendRequest');

    let response = null;
    response = await fetch('/api/friendship', {
        method: 'POST',
        body: formData
    });

    return response;
}

const getFriendStatus = async (jwtString) => {
    let formData = new FormData();
    formData.append('accessToken',localStorage.authToken);
    formData.append('type','GetFriendStatus');
    formData.append('profileId', new URLSearchParams(window.location.search).get('id'));

    let response = null;

    response = await fetch("/api/friendship", {
        method: 'POST',
        body: formData
    });

    if(response.status == 200) {
        let data = await response.json();
        console.log(data);
        return data.status;

    } else {
        console.log("Error: " + response.status);
        return null;
    }

}