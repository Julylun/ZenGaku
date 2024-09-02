export {
    autoSetLoginStatus,
    checkAuth
}
let loginStatus;
//  /\      /\                FIVIL - LAZY CATS
// {  `---'   }
// {  O'  0'  }
// ~~>  V   <~~
//  \  \|/   /
//   `------'__
// /     \  `^\_
//{       }\ |\_\_   W
//|  \_/  |/ /  \_\_( )
// \__/  /(_E     \__/
//   (__/
//  _- - _ - -_
//  _         _
//   -_     _-
//      -_-


//Declare -- Define variable and constant------------------------------
//Session Value
const autoSetLoginStatus = () => {
    loginStatus = sessionStorage.getItem('loginStatus');
    if (loginStatus == null) {
        loginStatus = false;
    }
}

const checkAuth = () => {
    if(loginStatus === false) {
        window.location.href = "/ErrorPages/Error401.jsp";
    }
}






