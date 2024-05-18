<!-- <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> -->

<!DOCTYPE html>
<html>

<head>
    <title>ZenGaku</title>
    <link rel="stylesheet" href="assets/css/index.css">
    <link rel="stylesheet" href="assets/css/indexFeature.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" type="image/x-icon" href="#" />
</head>

<body>
<header>

</header>
<div class = "loading-layer">
    <img src="assets/resources/img/loading.gif">
    <span>ZENGAKU</span>
</div>


<div class = "auth-menu" id = "forget-menu" style = "display: none;">
    <div class="close-button">
        <div class="close-line-container">
            <div class="close-line close-left-line"></div>
            <div class="close-line close-right-line"></div>
        </div>
    </div>
    <div id="forget-password-name" class="auth-logo-name">
        <p>Forget Password</p>
    </div>
    <!-- Quên mật khẩu: Nhập Mail-->
    <form method = "post" action="recover" class = "auth-input" id = "recovery-email-auth"
          style="display: flex;">
        <input class="auth-text-field" id="recovery-email-input" name="userRecoveryEmail" type="email"
               placeholder="Type your recovery email address">
        <button class="auth-button" id="Confirm">Confirm</button>
    </form>
    <div class="register-paragraph" id = "recovery-notify-text" style="display: none;">
        <p>We sent a reset password link to ${sessionScope.userRecoveryEmail}</p>
        <br>
    </div>
    <div class="register-paragraph" id = "changed-password-notify-text" style="display: none;">
        <p>You changed your password successfully!</p>
        <br>
    </div>
</div>

<div class="auth-menu" id="register-menu" style="display: none;">
    <div class="close-button">
        <div class="close-line-container">
            <div class="close-line close-left-line"></div>
            <div class="close-line close-right-line"></div>
        </div>
    </div>
    <div id="step">
        <div class = "step-box step-box-processing" id="step_1">
            <div class="step-circle "></div>
            <p>Account</p>
        </div>
        <div  class = "step-box" id="step_2">
            <div class="step-circle "></div>
            <p>Verification</p>
        </div>
        <div  class = "step-box" id="step_3">
            <div class="step-circle "></div>
            <p>Information</p>
        </div>
    </div>
    <div id="register-login-name" class="auth-logo-name">
        <p>Register</p>
    </div>
    <form method="post" action="register_account" class="auth-input" id="register-input"  style="display: flex;">
        <input class="auth-text-field" id="register-username-input" name="userName" type="text"
               placeholder="Username">
        <input class="auth-text-field" id="register-password-input" name="userPassword" type="password"
               placeholder="Type your strong password">
        <input class="auth-text-field" id="repeat-register-password-input" name="repeatUserPassword" type="password"
               placeholder="Repeat your strong password">
        <input class="auth-text-field" id="register-email-input" name="userEmail" type="email"
               placeholder="Type your email address">
        <button class="auth-button" id="_register-button">Register</button>
        <div class="other-button">
            <p id="have-account-button">Hey, I have an account.</p>
        </div>
    </form>

    <form method="post" action="register_verification" class="auth-input" id="register-verification"
          style="display: none;">
        <div class="register-paragraph">
            <p>We sent an email containing code to ${sessionScope.userEmail}</p>
            <br>
        </div>
        <input class="auth-text-field" id="verification-code" name="verificationCode"
               onKeyPress="if(this.value.length==6) return false;" placeholder="Code - 6 digits" required>
        <button class="auth-button" id="_verify-button">Verify</button>
    </form>

     <form method="post" action="information_creation" class="auth-input" id="information-creation"
          style="display: none;">
        <input class="auth-text-field" id="last-name-input" name="userLastName" type="text"
               placeholder="Type your last name">
        <input class="auth-text-field" id="first-name-input" name="userFirstName" type="text"
               placeholder="Type your first name">
        <input class="auth-text-field" id="birthday-input" name="userBirthday" type="date"
               placeholder="Repeat your strong password">
        <button class="auth-button" id="create-account">Create</button>
    </form>

    <form method="post" action="return-normal-page" class="auth-input" id="created-successfully-form"
          style="display: none;">
        <div class="register-paragraph" id = "created-notify-text">
            <p>You created ZenGaku account successfully! Please return login page to login.</p>
            <br>
        </div>
        <button class="auth-button" id="return-normal-page-button">Return</button>
    </form>

</div>


<div id="login-menu" class="auth-menu" style="display: none;">
    <div class="close-button">
        <div class="close-line-container">
            <div class="close-line close-left-line"></div>
            <div class="close-line close-right-line"></div>
        </div>
    </div>
<!-- <%--    <div id = "login-image">--%>
<%--        <img src="#">--%>
<%--    </div>--%> -->
    <div id="login-logo-name" class="auth-logo-name">
        <p>Login</p>
    </div>
    <form method="post" action="login" id="login-input" class="auth-input">
        <div class = "failed-notify-element" style="display: none">
            <p>Login failed. Check your username or password again.</p>
        </div>
        <input class="auth-text-field" id="login-username-input" name="userName" type="text" placeholder="Username">
        <input class="auth-text-field" id="login-password-input" name="userPassword" type="password"
               placeholder="Password">
        <div id="login-button-container">
            <button class="auth-button" id="_login-button">Login</button>
            <div class="other-button">
                <p id="register-button">I don't have account.</p>
                <p id="forget-button">I forgot my password.</p>
            </div>
        </div>
    </form>
</div>


<div id="opened-bg-content" style="display: none;">
    <div id = "menu">
        <a href="laicos.jsp">
            <div class = "menu-item">
                <img class = "item-image" title="Social media" src="assets/resources/img/social-icon-black.svg">
                <p class = "item-text">Social</p>
            </div>
        </a>
        <div class = "menu-item">
            <img class = "item-image" title = "Timer" src="assets/resources/img/timer-icon-black.svg">
            <p class = "item-text">item</p>
        </div>
        <div class = "menu-item" id = "background-config-feature">
            <img class = "item-image" title="Background Configuration" alt = "Background Configuration" src="assets/resources/img/background-configuration-icon-black.svg">
            <p class = "item-text">Background</p>
        </div>
        <div class = "menu-item">
            <img class = "item-image" src="assets/resources/img/timer-icon-black.svg">
            <p class = "item-text">item</p>
        </div>
        <div class = "menu-item">
            <img class = "item-image" src="assets/resources/img/timer-icon-black.svg">
            <p class = "item-text">item</p>
        </div>
        <div class = "menu-item">
            <img class = "item-image" src="assets/resources/img/timer-icon-black.svg">
            <p class = "item-text">item</p>
        </div>
        <div class = "menu-item">
            <img class = "item-image" src="assets/resources/img/timer-icon-black.svg">
            <p class = "item-text">item</p>
        </div>
        <div class = "menu-item">
            <img class = "item-image" src="assets/resources/img/timer-icon-black.svg">
            <p class = "item-text">item</p>
        </div>
        <div class = "menu-item">
            <img class = "item-image" src="assets/resources/img/timer-icon-black.svg">
            <p class = "item-text">item</p>
        </div>
        <div class = "menu-item">
            <img class = "item-image" src="assets/resources/img/timer-icon-black.svg">
            <p class = "item-text">item</p>
        </div>
        <div class = "menu-item">
            <img class = "item-image" src="assets/resources/img/timer-icon-black.svg">
            <p class = "item-text">item</p>
        </div>
        <div class = "menu-item">
            <img class = "item-image" src="assets/resources/img/timer-icon-black.svg">
            <p class = "item-text">item</p>
        </div>
        <div class = "menu-item">
            <img class = "item-image" src="assets/resources/img/timer-icon-black.svg">
            <p class = "item-text">item</p>
        </div>
        <div class = "menu-item">
            <img class = "item-image" src="#">
            <p class = "item-text">item</p>
        </div>
        <div class = "menu-item">
            <img class = "item-image" src="#">
            <p class = "item-text">item</p>
        </div>
    </div>
</div>



<nav id="nav-bar">
    <div id="menu-button">
        <div class="row">
            <div class="border-dot"></div>
            <div class="border-dot"></div>
            <div class="border-dot"></div>
        </div>
        <div class="row">
            <div class="border-dot"></div>
            <div class="border-dot"></div>
            <div class="border-dot"></div>
        </div>
        <div class="row">
            <div class="border-dot"></div>
            <div class="border-dot"></div>
            <div class="border-dot"></div>
        </div>
    </div>
    <div id="logo-name">
        <p>ZENGAKU</p>
    </div>
    <div id="login-button">
        <p>Login</p>
    </div>
    <div id="tree-button" style="display: none;">
        <img src="assets/resources/img/tree-icon.png" alt="">
    </div>
</nav>

<div class = "content">
    <div class = "content-item" id = "sound-config">
        <div class = "background-config-title">
            <div>
                <span>Sound Configuration</span>
            </div>
        </div>
        <div class = "background-config-line"></div>
        <div class = "background-config-content">
            <div class = "background-config-add">
                <img class = "background-config-add-button" src = "assets/resources/img/more-button-white.svg">
            </div>
            <div class = "background-config-line"></div>
        </div>
    </div>


    <div class = "content-item" id = "background-config">
        <div class = "background-config-title">
            <div>
                <span>Background Configuration</span>
            </div>
        </div>
        <div class = "background-config-line"></div>
        
        <div class = "background-config-content">
            <div class = "background-config-add">
                <img class = "background-config-add-button" src = "assets/resources/img/more-button-white.svg">
            </div>
            <div class = "background-config-line"></div>
            <div class = "background-config-add-content" style="display: none;">
                <div class = "background-config-type-box">
                    <input class = "auth-text-field background-config-field background-config-name-field" placeholder="Type background name">
                    <input class = "auth-text-field background-config-field background-config-text-field" placeholder="Paste your image/youtube's video link here">
                    <button class = "auth-button background-config-add-link-button">Add</button>
                </div>
            </div>
            <div class = "background-config-choice">
                <ul>
                    <li class = "background-config-item" value="https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?cs=srgb&dl=pexels-francesco-ungaro-1525041.jpg&fm=jpg">
                        <p>Moutaint and lake</p>
                    </li>
                    <li class = "background-config-item" value="https://asset.gecdesigns.com/img/wallpapers/beautiful-fantasy-wallpaper-ultra-hd-wallpaper-4k-sr10012418-1706506236698-cover.webp">
                        <p>Moon and Sun</p>
                    </li>
                    <li class = "background-config-item" value="https://pbs.twimg.com/media/Fxto7UTXgAEtKVC.jpg:large">
                        <p>The sky night</p>
                    </li>
                    <li class = "background-config-item" value="https://images.pexels.com/photos/3791466/pexels-photo-3791466.jpeg">
                        <p>Danger person</p>
                    </li>
                    <li class = "background-config-item" value="https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
                        <p>Old car</p>
                    </li>
                    <li class = "background-config-item" value="https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
                        <p>The bridge</p>
                    </li>
                    <li class = "background-config-item" value="https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
                        <p>Leaves</p>
                    </li>
                    <li class = "background-config-item video" value="https://www.youtube.com/embed/UZ9uyQI3pF0">
                        <p>Flowers</p>
                    </li>
                    <li class = "background-config-item video" value="https://www.youtube.com/embed/SVDooWT60Ho">
                        <p>Study with BTS</p>
                    </li>
                    <li class = "background-config-item video" value="https://www.youtube.com/embed/2XK0zoPWdi4">
                        <p>Study in coffee shop</p>
                    </li>
                    <li class = "background-config-item video" value="https://www.youtube.com/embed/0nTO4zSEpOs">
                        <p>Night Walk in Tokyo Shibuya</p>
                    </li>
                    <li class = "background-config-item video" value="https://www.youtube.com/embed/F8MN0o6RS9o">
                        <p>Snowfall in Times Square, NYC</p>
                    </li>
                    <li class = "background-config-item video" value="https://www.youtube.com/embed/AY5qcIq5u2g">
                        <p>FLYING OVER JAPAN</p>
                    </li>
                    <li class = "background-config-item video" value="https://www.youtube.com/embed/M9cJMXmQ_ZU">
                        <p>DOWNTOWN LOS ANGELES City View day </p>
                    </li>

                </ul>
            </div>
            <div class = "background-config-line"></div>
            <div class = "background-config-button-container">
                <div class = "background-config-button-item" id = "background-config-apply-button">
                    <span>Apply</span>
                </div>
                <div class = "background-config-button-item" id = "background-config-cancel-button">
                    <span>Cancel</span> 
                </div>
            </div>
        </div>
    </div>
</div>

<!-- <div id="menu" style="display: none;">
</div> -->

<input type="hidden" id = "vf-lv" name = "verificationLevel" value="${sessionScope.registerVerification}"/>
<input type="hidden" id = "lg-vl" name = "loginValue" value="${sessionScope.loginStatus}"/>
<script src="assets/js/index.js"></script>
<script src="assets/js/feature.js"></script>

<div class = "video-container">
    <iframe id = "background-video" frameborder="0"
            allowfullscreen=""
            allow="accelerometer; autoplay;
            clipboard-write; encrypted-media;
            gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            title="Cherry Blossom Café 🌸 Café Ambience + 1 Hour Magical Solo Piano No Ads 🎹 Studying Music | Work Aid 🎧"

            src=""></iframe>

    <video autoplay muted loop style="display: none">
        <source src = "" type = "video/mp4">
    </video>
</div>


<background-configter>
</background-configter>
</body>

</html>