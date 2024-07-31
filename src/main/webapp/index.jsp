<!-- <%--<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>--%> -->

<!DOCTYPE html>
<html>

<head>
    <title>ZenGaku</title>
    
    <!-- Import by developer-->
    <link rel="stylesheet" href="assets/css/home/font.css">
    <link rel="stylesheet" href="assets/css/home/page.css">
    <link rel="stylesheet" href="assets/css/home/loading.css">
    <link rel="stylesheet" href="assets/css/home/authMenu.css">
    <link rel="stylesheet" href="assets/css/home/menu.css">
    <link rel="stylesheet" href="assets/css/home/navigationBar.css">
    <link rel="stylesheet" href="assets/css/home/notificationPanel.css">

    <link rel="stylesheet" href="assets/css/home/module/backgroundConfiguration.css">
    <link rel="stylesheet" href="assets/css/home/module/calculator.css">
    <link rel="stylesheet" href="assets/css/home/module/module.css">
    <link rel="stylesheet" href="assets/css/home/module/quotes.css">
    <link rel="stylesheet" href="assets/css/home/module/soundConfiguration.css">
    <link rel="stylesheet" href="assets/css/home/module/timer.css">
    <link rel="stylesheet" href="assets/css/home/module/videoBackground.css">
    <link rel="stylesheet" href="assets/css/home/module/zengakuAssistant.css">
    <link rel="stylesheet" href="assets/css/home/module/todoList.css">
    <link rel="stylesheet" href="assets/css/home/welcomePanel.css">
    <!-- End Import by developer -->

    <!-- Disable by developer -->
    <!-- <link rel="stylesheet" href="assets/css/index.css"> --> 
    <!-- <link rel="stylesheet" href="assets/css/indexFeature.css"> -->
    <!-- End Disable by developer -->

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Zengaku is a website used to study and relax.">
    <meta name="keywords" content="study, tree, plant, student, zengaku, relax, study room, meeting">

    <meta property="og:title" content="Zengaku">
    <meta property="og:description" content="Studying with Zengaku!">
    <meta property="og:image" content="assets\resources\img\previewImage.png">
    <!-- <meta property="og:url" content="https://www.example.com/trang"> -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Zengaku">
    <meta name="twitter:description" content="Studying with Zengaku!">
    <meta name="twitter:image" content="assets\resources\img\previewImage.png">
    
    <link rel="icon" type="image/svg" href="assets/resources/img/zengaku_logo.svg">
</head>

<body>
<header>

</header>
<div class = "loading-layer">
    <img src="assets/resources/img/loading.gif">
    <span>ZENGAKU</span>
</div>

<div id = "notify-panel" style="display: none;"></div>



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
  

    <div class="all-quote-box auto-moving" style="display: none;">
        <div class="quote-box">
            <button class="close-btn">&times;</button>
            <h2>Quote of the Day</h2>
            <blockquote id="quote">Bảo trì</blockquote>
            <span id="author">Loading...</span>
            <div class="buttons">
                <button onclick="getQuote(api_url)" id="new-quote">New Quote</button>
                <button id="share-quote">Share</button>
            </div>
        </div>
    </div>

</div>

<!-- <div id="menu" style="display: none;">
</div> -->

<div class = "video-container">
    <iframe id = "background-video" frameborder="0"
            allowfullscreen=""
            allow="accelerometer; autoplay;
            clipboard-write; encrypted-media;
            gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            title="🌸🎹🎧"

            src=""></iframe>

    <video autoplay muted loop style="display: none">
        <source src = "" type = "video/mp4">
    </video>
</div>

<input type="hidden" id = "vf-lv" name = "verificationLevel" value="${sessionScope.registerVerification}"/>
<input type="hidden" id = "lg-vl" name = "loginValue" value="${sessionScope.loginStatus}"/>
<script src="https://www.youtube.com/iframe_api"></script>

<script type = "module" src="assets/js/index.js"></script>
 <script type="module" src="assets/js/components/home/welcomePanel.js"></script>




<background-configter>
</background-configter>
</body>

</html>