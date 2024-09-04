import * as Server from './Server.js'
import * as Post from '../../../components/socialMedia/post.js'
import * as Interface from '../../../components/socialMedia/profile/interface.js'
import * as ProfileButtonEvent from './event/ProfileButtonEvent.js'


let testVal;

const editProfileSetup = async (profileDataJsonObject) => {
    //sub-function
    const setDefaultInformation = (profileDataJsonObject) => {
        document.getElementById('profileImage').src = profileDataJsonObject.profileInformation.userAvatar;
        document.getElementById('first-name').value =  profileDataJsonObject.profileInformation.firstname;
        document.getElementById('last-name').value = profileDataJsonObject.profileInformation.lastname;
        document.getElementById('bio').value = (profileDataJsonObject.profileInformation.userBio) ? profileDataJsonObject.profileInformation.userBio : '';
    }

    //set default information
    setDefaultInformation(profileDataJsonObject);

    //set event button
    document.getElementsByClassName('save-button').item(0).addEventListener('click', async () => {await Server.editProfile(
        localStorage.authToken,
        document.getElementById('first-name').value,
        document.getElementById('last-name').value,
        document.getElementById('bio').value,
        profileDataJsonObject.profileInformation.userAvatar    
    ); document.getElementsByClassName('all_editProfile').item(0).style.display = "none"; window.location.reload()});
    document.getElementsByClassName('discard-button').item(0).addEventListener('click', () => {
        document.getElementsByClassName('all_editProfile').item(0).style.display = "none";
        setDefaultInformation();
    });
}

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
    
    //Set user data
    document.getElementById('profile-image').src = profileDataJsonObject.profileInformation.userAvatar;
    document.getElementsByClassName('profile-name').item(0).innerHTML = "<p>" + profileDataJsonObject.profileInformation.firstname + " " + profileDataJsonObject.profileInformation.lastname + "</p>";
    document.getElementsByClassName('profile-username').item(0).innerHTML = "<p>@" + profileDataJsonObject.profileInformation.username + "</p>";
    document.getElementsByClassName('profile-information__bio').item(0).getElementsByTagName('p').item(0).innerHTML = (profileDataJsonObject.profileInformation.userBio) ? profileDataJsonObject.profileInformation.userBio : " ";

    //Change profile button basing on status attribute on database from back-end
    await Interface.changeProfileButton();

    //Add button event to profile button (I would like to change this becomes a switch case condition which makes this code be better)
    ProfileButtonEvent.setEventToButton(document.getElementById('profile-add-btn'),ProfileButtonEvent.ADD_FRIEND_BUTTON);
    ProfileButtonEvent.setEventToButton(document.getElementById('profile-cancel-btn'),ProfileButtonEvent.CANCEL_BUTTON);
    ProfileButtonEvent.setEventToButton(document.getElementById('profile-response-btn'),ProfileButtonEvent.RESPONSE_BUTTON);
    ProfileButtonEvent.setEventToButton(document.getElementById('profile-friend-btn'),ProfileButtonEvent.FRIEND_BUTTON);
    ProfileButtonEvent.setEventToButton(document.getElementById('profile-edit-btn'),ProfileButtonEvent.EDIT_PROFILE_BUTTON)

    //Set default setting to Edit Profile form
    await editProfileSetup(profileDataJsonObject);

    //Add post to the profile
    Post.addPosts(JSON.parse(profileDataJsonObject.posts));
}

 fillDataToProfile();