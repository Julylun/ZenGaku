import * as Server from '../../../features/SocialMedia/profile/Server.js'

export {
    changeProfileButton,
    ADD_BUTTON,
    FRIEND_BUTTON,
    BESTIE_BUTTON,
    CANCEL_BUTTON,
    EDIT_BUTTON,
    RESPONSE_BUTTON
}

const ADD_BUTTON = 'profile-add-btn';
const FRIEND_BUTTON = 'profile-friend-btn';
const BESTIE_BUTTON = 'profile-besite-btn';
const CANCEL_BUTTON = 'profile-cancel-btn';
const EDIT_BUTTON = 'profile-edit-btn';
const RESPONSE_BUTTON = 'profile-response-btn'

/**
 * Set parameter from Interface.js to this function to display button which u want and hide others.
 * @param {String} button 
 */
const displayProfileButton = (button) => {
    for(let buttonElement of document.getElementsByClassName('profile-information__user--show-button')) {
        buttonElement.classList.remove('profile-information__user--show-button');
        buttonElement.classList.add('profile-information__user--hiding-button');
    }
    document.getElementById(button).classList.add('profile-information__user--show-button');
    document.getElementById(button).classList.remove('profile-information__user--hiding-button');
}

/**
 * Auto check friend status and replace button in that profile.
 */
const changeProfileButton = async () => {
    let urlSearch = new URLSearchParams(window.location.search);
    let profileId = urlSearch.get("id");
   
    //Case profile is belong to user
    if(profileId == sessionStorage.userId) {
        console.log('[Interface]: case user\'s profile')
        displayProfileButton(EDIT_BUTTON);
    } else {
        console.log('[Interface]: case another people')
    
        let friendStatus = await Server.getFriendStatus(localStorage.authToken);
        if(friendStatus != null) {
            switch(friendStatus) {
                case 'PendingFriend': {
                    displayProfileButton(CANCEL_BUTTON);
                    console.log('PENDING');
                    break;
                }
                case 'Friend': {
                    displayProfileButton(FRIEND_BUTTON);
                    console.log('FRIEND');
                    break;
                }
                case 'Bestie': {
                    displayProfileButton(BESTIE_BUTTON);
                    console.log('BESTIE');
                    break;
                }
                case 'Responding': {
                    displayProfileButton(RESPONSE_BUTTON);
                    console.log('RESPONSING');
                }
            }
        } else {
            displayProfileButton(ADD_BUTTON);
            console.log('ADD');
        }
    }
}