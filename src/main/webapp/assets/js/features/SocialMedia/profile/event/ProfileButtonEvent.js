import * as Server from '../Server.js'
import * as Interface from '../../../../components/socialMedia/profile/interface.js'
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



const createAddfriendEvent = (buttonElement) => {
    buttonElement.addEventListener('click', async () => {
        let response = await Server.sendFrendRequest(localStorage.authToken);
        console.log(response);

        switch(response.status) {
            case 200: {
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
        let inputVal = prompt('[A]: Accept; [D]: Deny');
        let response = null;
        if(inputVal === "A")
            response =  await Server.acceptFriendRequest(localStorage.authToken);
        else 
            response = await Server.cancelFriendRequest(localStorage.authToken);

        switch(response.status) {
            case 200: {
                console.log(response.json());
                confirm.length("Accept friend request succcessfully");
                break;
            }
            
            default: {
                console.log("ERROR: " + response.status);
                break;
            }
        }
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
            break;
        }
        case BESTIE_BUTTON: {
            break;
        }
        case EDIT_PROFILE_BUTTON: {
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

    } 
}