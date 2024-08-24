import * as Server from './Server.js'
import * as Post from '../../../components/socialMedia/post.js'
let testVal;
/**
 * Used to get fetch POST to profile through authToken in localStorage.
 */
const fillDataToProfile = async () => {
    let profileDataJsonObject = await Server.getPostByJwt(localStorage.authToken);
    
    if(await profileDataJsonObject.status != 200) {
        console.log("error! -> " + profileDataJsonObject.status);
        return;
    } else {
        profileDataJsonObject = await profileDataJsonObject.json();
    }
    console.log(await profileDataJsonObject)
    
    document.getElementById('profile-image').src = profileDataJsonObject.profileInformation.userAvatar;
    document.getElementsByClassName('profile-name').item(0).innerHTML = "<p>" + profileDataJsonObject.profileInformation.firstname + " " + profileDataJsonObject.profileInformation.lastname + "</p>";
    document.getElementsByClassName('profile-username').item(0).innerHTML = "<p>@" + profileDataJsonObject.profileInformation.username + "</p>";
    
    testVal = await profileDataJsonObject;
    Post.addPosts(JSON.parse(profileDataJsonObject.posts));
}

 fillDataToProfile();