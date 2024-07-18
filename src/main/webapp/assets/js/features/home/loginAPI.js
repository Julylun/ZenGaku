import * as Browser from '../system/browser.js'
import * as LoginComponent from '../../components/home/login.js'

export {
    fetchLogin
}

const fetchLogin = () => {
    let tmpUsername = document.getElementById("login-username-input");
            const formData = new FormData();
            formData.append('userName',document.getElementById('login-username-input').value);
            formData.append('userPassword',document.getElementById('login-password-input').value);
         
            const data = {
                userName: formData.get('userName'),
                userPassword: formData.get('userPassword')
            };

            fetch('/login',{
                method: 'POST',
                body: formData
             })
                .then(response => response.json())
                .then(data =>{
                     console.log(data);
                     if(data.accessJWT){
                         localStorage.setItem('authToken', data.accessJWT);
                         console.log("AT: " + data.accessJWT)
                         localStorage.setItem("refreshToken", data.refreshJWT)
                         console.log("RT: " + data.refreshJWT)
                         
                         sessionStorage.setItem('loginStatus',true);
                         sessionStorage.setItem('loginStatus',true);
                         sessionStorage.setItem('userId',data.userId);
                         sessionStorage.setItem('userFirstName',data.firstName);
                         sessionStorage.setItem('userLastName',data.lastName);
                         sessionStorage.setItem('userAvtHref',data.avtHref);
                         
                         Browser.safeReload();
                     }else {
                         sessionStorage.setItem('loginStatus',false);
                         Browser.safeReload();
                    }
                })
                .catch(error => {
                    console.log('Error occurs when login: ', error);
                    LoginComponent.displayError(LoginComponent.NETWORK_ERROR_MESSAGE);
                });
}