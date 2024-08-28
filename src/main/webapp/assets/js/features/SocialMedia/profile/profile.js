import * as Server from './Server.js'
import * as Post from '../../../components/socialMedia/post.js'
import * as Interface from '../../../components/socialMedia/profile/interface.js'
import * as ProfileButtonEvent from './event/ProfileButtonEvent.js'

let testVal;
/**
 * Used to get fetch POST to profile through authToken in localStorage.
 */


const fillDataToProfile = async () => {
    let profileId = -1;
    let profileDataJsonObject = await Server.getPostByJwt(localStorage.authToken);
    
    if(profileDataJsonObject.status != 200) {
        console.log("error! -> " + profileDataJsonObject.status);
        return;
    } else {
        profileDataJsonObject = await profileDataJsonObject.json();
    }
    console.log(profileDataJsonObject)
    
    document.getElementById('profile-image').src = profileDataJsonObject.profileInformation.userAvatar;
    document.getElementsByClassName('profile-name').item(0).innerHTML = "<p>" + profileDataJsonObject.profileInformation.firstname + " " + profileDataJsonObject.profileInformation.lastname + "</p>";
    document.getElementsByClassName('profile-username').item(0).innerHTML = "<p>@" + profileDataJsonObject.profileInformation.username + "</p>";

    await Interface.changeProfileButton();

    ProfileButtonEvent.setEventToButton(document.getElementById('profile-add-btn'),ProfileButtonEvent.ADD_FRIEND_BUTTON);
    ProfileButtonEvent.setEventToButton(document.getElementById('profile-cancel-btn'),ProfileButtonEvent.CANCEL_BUTTON);
    ProfileButtonEvent.setEventToButton(document.getElementById('profile-response-btn'),ProfileButtonEvent.RESPONSE_BUTTON);
    ProfileButtonEvent.setEventToButton(document.getElementById('profile-friend-btn'),ProfileButtonEvent.FRIEND_BUTTON);

    
    console.log("profileId = " + profileId);
    
    Post.addPosts(JSON.parse(profileDataJsonObject.posts));
}

 fillDataToProfile();