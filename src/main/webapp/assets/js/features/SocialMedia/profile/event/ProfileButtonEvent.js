import * as Server from '../Server.js'
import * as Interface from '../../../../components/socialMedia/profile/interface.js'
import * as UserButtonList from '../../../../components/socialMedia/profile/userButtonList.js'
import * as NotificationServer from '../../../NotificationServer.js'

export {
    ADD_FRIEND_BUTTON,
    FRIEND_BUTTON,
    BESTIE_BUTTON,
    EDIT_PROFILE_BUTTON,
    CANCEL_BUTTON,
    RESPONSE_BUTTON,
    setEventToButton
}
const ADD_FRIEND_BUTTON = 0;
const FRIEND_BUTTON = 1;
const BESTIE_BUTTON = 2;
const EDIT_PROFILE_BUTTON = 3; 
const CANCEL_BUTTON = 4;
const RESPONSE_BUTTON = 5;
const ACCEPT_BUTTON = 6;
const DENY_BUTTON = 7;
const BLOCK_BUTTON = 8;





const createAddfriendEvent = (buttonElement) => {
    buttonElement.addEventListener('click', async () => {
        let response = await Server.sendFrendRequest(localStorage.authToken);
        console.log(response);

        switch(response.status) {
            case 200: {
                let _message = sessionStorage.userFirstName + ' ' + sessionStorage.userLastName+' sent you a friend request.';
                let content = '{\"message\":\"'+_message+'\",\"senderId\":\"'+ sessionStorage.userId +'\"}';
                NotificationServer.sendNotification(new URLSearchParams(window.location.search).get("id"), 'Friend request',content,NotificationServer.TYPE_ADD_FRIEND_REQUEST);
                console.log(response.json());
                console.log("Send add frend request successfully!");
                break;
            }
            case 401: {
                console.log("Error: " + response.status)
                break;
            }
            case 500: {
                console.log("Error: " + response.status)
                break;
            }
            default: {
                break;
            }
        }
        Interface.changeProfileButton();
    })
}

const createCancelFriendEvent = async (cancelButtonElement) => {
    cancelButtonElement.addEventListener('click', async () => {
        let response = await Server.cancelFriendRequest(localStorage.authToken);
        switch(response.status) {
            case 200: {
                console.log(response.json());
                console.log("cancel request friend successfully");
                break;
            }
            case 400: {
                 console.log("Error: " + response.status);
               break;
            }
            case 401: {
                  console.log("Error: " + response.status);
              break;
            }
            case 500: {
                   console.log("Error: " + response.status);
             break;
            }
            default: {
                console.log("Error: " + response.status);
                break;
            }
        }
        Interface.changeProfileButton();
    });
}

const createResponseFriendEvent = async (responseButtonElement) => {
    responseButtonElement.addEventListener('click', async () => {
        if(UserButtonList.removeButtonListMenuIfExisting()) return;
        let userMenuList = UserButtonList.createButtonListMenu();
        let acceptButton = UserButtonList.createButtonListElement('Accept','profile-rsp-accept-btn',UserButtonList.NONE,userMenuList);
        UserButtonList.createSplitLine(userMenuList);
        let denyButton = UserButtonList.createButtonListElement('Deny','profile-rsp-deny-btn',UserButtonList.RED,userMenuList);
        setEventToButton(acceptButton,ACCEPT_BUTTON);
        setEventToButton(denyButton,DENY_BUTTON);
    })

}

const createAcceptFriendEvent = async (acceptButtonElement) => {
    acceptButtonElement.addEventListener('click', async () => {
        let response = await Server.acceptFriendRequest(localStorage.authToken);
        
        if(response.status == 200) {
            console.log("Accept successfully!");
        } else {
            console.log("Occur error -> " + response.status);
        }
        UserButtonList.removeButtonListMenu();
        Interface.changeProfileButton();
    })
}

const createDenyFriendEvent = async (denyButtonElement) => {
    denyButtonElement.addEventListener('click', async () => {
        let response = await Server.cancelFriendRequest(localStorage.authToken);
        
        if(response.status == 200) {
            console.log('Deny successfully');
        } else {
            console.log("Occur error -> " + response.status);
        }
        UserButtonList.removeButtonListMenu();
        Interface.changeProfileButton();
    })
    }

const createFriendEvent = async (friendButton) => {
    friendButton.addEventListener('click', async () => {
        if(UserButtonList.removeButtonListMenuIfExisting()) return;
        let userMenuList = UserButtonList.createButtonListMenu();
        let bestieButton = UserButtonList.createButtonListElement('Bestie','profile-rsp-bestie-btn',UserButtonList.NONE,userMenuList);
        let inboxButton = UserButtonList.createButtonListElement('Inbox','profile-rsp-inbox-btn',UserButtonList.NONE,userMenuList);
        UserButtonList.createSplitLine(userMenuList);
        let unfriendButton = UserButtonList.createButtonListElement('Unfriend','profile-rsp-unfriend-btn',UserButtonList.NONE,userMenuList);
        UserButtonList.createSplitLine(userMenuList);
        let blockButton = UserButtonList.createButtonListElement('Block','profile-rsp-block-btn',UserButtonList.RED,userMenuList);
        let newHref = window.location.origin + "/Zentizen/messages/direct?id=" + new URLSearchParams(window.location.search).get('id');
        inboxButton.addEventListener('click', () => {window.location.href = newHref });
        setEventToButton(bestieButton,BESTIE_BUTTON);
        setEventToButton(unfriendButton,DENY_BUTTON);
        setEventToButton(blockButton,BLOCK_BUTTON);
    })
}

const createEditProfileEvent = async (editButton) => {
    editButton.addEventListener('click', () => {
        let editProfileElement = document.getElementsByClassName('all_editProfile').item(0);
        editProfileElement.style.display = "flex";
    })
}

/**
 * Put a button to this function and select its type by use public constant in ProfileButtonEvent to set event button
 * @param {HTMLElement} buttonElement 
 * @param {number} buttonType 
 */
const setEventToButton = (buttonElement, buttonType) => {
    switch (buttonType) {
        case ADD_FRIEND_BUTTON: {
            createAddfriendEvent(buttonElement);
            break;
        }
        case FRIEND_BUTTON: {
            createFriendEvent(buttonElement);
            break;
        }
        case BESTIE_BUTTON: {
            break;
        }
        case EDIT_PROFILE_BUTTON: {
            createEditProfileEvent(buttonElement);
            break;
        }
        case CANCEL_BUTTON : {
            createCancelFriendEvent(buttonElement);
            break;
        }
        case RESPONSE_BUTTON: {
            createResponseFriendEvent(buttonElement); 
            break;
        }

        case ACCEPT_BUTTON: {
            createAcceptFriendEvent(buttonElement);
            break;
        }

        case DENY_BUTTON: {
            createDenyFriendEvent(buttonElement);
            break;
        }
        
        case BLOCK_BUTTON: {
            console.log("CHƯA LÀM")
        }
    } 
}