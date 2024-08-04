//Task: Hien thi loi khi gap loi; Them catch vao cac case

import * as Register from '../../components/home/register.js'

export {
    registerAccount,
    verificateAccount,
    createAccount,
    SUCCESSFULLY,
    UNKNOWN_ERROR
}

const SUCCESSFULLY = 0;
const UNKNOWN_ERROR = -1;

function registerAPI(userName, userPassword, repeatUserPassword, userEmail) {
    // event.preventDefault();


    const formData = new FormData();
    formData.append('userName', userName);
    formData.append('userPassword', userPassword);
    formData.append('repeatUserPassword', repeatUserPassword);
    formData.append('userEmail', userEmail);

    fetch('/register_account', {
        method: 'POST',
        body: formData
    }).then(response => response.json())
        .then(data => {
            if (data.approve == 'true') {
                console.log('[registerAPI.js]<registerAccount>: Register successfully!')
            } else {
                console.log("[registerAPI]<registerAccount>: error -> ");
            }
        })
}

const registerAccount = (userName, userPassword, repeatUserPassword, userEmail) => {
    registerAPI(userName, userPassword, repeatUserPassword, userEmail);
    Register.displayMenu(Register.VERIFICATION_MENU);
}

async function verificationAPI(OTPCode) {
    const formData = new FormData();
    formData.append('verificationCode', OTPCode);

    const response = await fetch('/register_verification', {
        method: 'POST',
        body: formData
    });

    return await response.json();
}

const verificateAccount = (OTPCode) => {
    verificationAPI(OTPCode).then(data => {
        if (data.approve == 'true') {
            console.log("[registerAPI]<verificateAccount>: OKAY -> " + data.error);
            Register.displayMenu(Register.INFORMATION_MENU);
        } else {
            console.log("[registerAPI]<verificateAccount>: error -> " + data.error);
            // Display Error
        }
    }).catch(Error => {
        console.log("[registerAPI]<verificateAccount>: error -> " + Error);
    })
}

async function createAccountAPI(firstName, lastName, birthday) {
    let formData = new FormData();
    formData.append('userFirstName', firstName);
    formData.append('userLastName', lastName);
    formData.append('userBirthday', birthday);

    const response = await fetch('/information_creation', {
        method: 'POST',
        body: formData
    });

    return await response.json();
}

const createAccount = (firstName, lastName, birthday) => {
    createAccountAPI(firstName, lastName, birthday).then(data => {
        if (data.approve == 'true') {
            console.log("[registerAPI]<createAccount>: Okay -> " + data.error);
            Register.displayMenu(Register.RETURN_MENU);
        } else {
            console.log("[registerAPI]<createAccount>: Error -> " + data.error);
            //Display error
        }
    })
}