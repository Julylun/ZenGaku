<!-- <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> -->

<!DOCTYPE html>
<html>

<head>
    <title>ZenGaku</title>
    <link rel="stylesheet" href="assets/css/index.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" type="image/x-icon" href="#" />
</head>

<body>
<header>

</header>

<div class = "auth-menu" id = "newpass-menu" style = "display: block;">
    <div class="close-button">
        <div class="close-line-container">
            <div class="close-line close-left-line"></div>
            <div class="close-line close-right-line"></div>
        </div>
    </div>
    <div id="forget-password-name" class="auth-logo-name">
        <p>Set new password</p>
    </div>

    <form method = "post" action="new-password" class = "auth-input"
          style="display: flex;">
        <input type="hidden" name="token" value="${param.token}">
        <input class="auth-text-field"  name="newPassword" type="password"
               placeholder="Type your new password">
        <input class="auth-text-field"  name="confirmPassword" type="password"
               placeholder="Retype your new password">
        <button class="auth-button" id="Confirm">Confirm</button>
    </form>

</div>


<div id="opened-bg-content" style="display: none;">
    <div id = "menu">
        <a href="laicos.jsp">
            <div class = "menu-item">
                <img class = "item-image" src="assets/resources/img/timer-icon-black.svg">
                <p class = "item-text">Social</p>
            </div>
        </a>
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
        <img src="assets/resources/img/tree-icon.png">
    </div>
</nav>

<!-- <div id="menu" style="display: none;">
</div> -->

<input type="hidden" id = "vf-lv" name = "verificationLevel" value="${sessionScope.registerVerification}"/>
<script src="assets/js/index.js"></script>

<footer>
</footer>
</body>

</html>