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
    <div class="loading-layer">
        <img src="assets/resources/img/loading.gif">
        <span>ZENGAKU</span>
    </div>

    <div id="notify-panel" style="display: none;"></div>

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
    <div class = 'content'>



        
<!-- 
    <style>
        .counter-setting-container {
            max-width: 300px;
            width: 70vw;
        }
        .counter-setting-container__setting-content-container--item {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin: 0 10% 10px 10%;
        }
        .counter-setting-container__mode-content-container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
        .counter-setting-container__setting-content-container--item input{
            width: 50%;
            height: 20px;
            margin-bottom: 0px;
            text-align: center;
            font-size: min(3vw,10.77)
        }
        .counter-setting-container__button-container {
            display: flex;
            flex-direction: row;
            justify-content: center;    
        }

        .counter-setting-container__button-container button{
            margin-left: 5%;
            margin-right: 5%;
            height: 7vw;
            width: 14vw;
            border-radius: 3vw;
            font-size: min(2vw,9.1px);
            max-width: 63px;
            max-height: 31px;
        }

        .counter-setting-small-label {
            color: white;
            font-family: Inter;
            /* font-size: 3vw; */
            font-size: min(3vw,10.77px);
            text-align: center;
            margin-left: 5%;
        }

        .counter-setting-big-label {
            font-size: min(4vw,14.36px);
            margin-left: 5%;
            margin-bottom: 2%;
        }
        .counter-setting-mode-label {
            margin-left: 5%;
        }
        .counter-setting-time-setting {
            height: calc((90vw - max(min(9vw, 50px), 25px)) - 30px );
            max-height: 330px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
    </style>
    <div class="content">
        <div class="auto-moving counter-setting-container content-item" id="counter-setting">
            <div class="content-item-title">
                <div><span>Forus Setting</span></div>
            </div>
            <div class="config-line"></div>
            <div class="content-container counter-setting-content-container">
                <div class = 'counter-setting-container__mode-content-container' >
                    <label class = 'counter-setting-small-label counter-setting-mode-label'>Mode</label>
                    <select>
                        <option>Pomodoro</option>
                        <option>Short break</option>
                        <option>Long break</option>
                    </select>
                </div> 
                <div class="config-line"></div>
                <div class = 'counter-setting-time-setting'>
                    <div class = 'counter-setting-container__setting-content-container'>
                        <label class = 'counter-setting-small-label counter-setting-big-label' >Time setting</label>
                        <div>
                            <div class = 'counter-setting-container__setting-content-container--item'>
                                <label class = 'counter-setting-small-label'>Minute</label>
                                <input id = '' class = 'auth-text-field' type = 'text'>
                            </div>
                            <div class = 'counter-setting-container__setting-content-container--item'>
                                <label class = 'counter-setting-small-label'>Second</label>
                                <input class = 'auth-text-field' type = 'text'>
                            </div>
                            <div class = 'counter-setting-container__setting-content-container--item'>
                                <label class = 'counter-setting-small-label'>Break</label>
                                <input class = 'auth-text-field' type = 'text'>
                            </div>
                            <div class = 'counter-setting-container__setting-content-container--item'>
                                <label class = 'counter-setting-small-label'>Repeat</label>
                                <input class = 'auth-text-field' type = 'text'>
                            </div>
                        </div>
                    </div>
                    <div class = 'counter-setting-container__button-container'>
                        <button>Save</button>
                        <button>Discard</button>
                    </div>
                </div>
            </div>
        </div> -->
        


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

    <div id="youtubePlayer"></div>
    <div class="video-container">
        <iframe id="background-video" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay;
            clipboard-write; encrypted-media;
            gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" title="🌸🎹🎧"
            src=""></iframe>

        <video autoplay muted loop style="display: none">
            <source src="" type="video/mp4">
        </video>
    </div>

    <input type="hidden" id="vf-lv" name="verificationLevel" value="${sessionScope.registerVerification}" />
    <input type="hidden" id="lg-vl" name="loginValue" value="${sessionScope.loginStatus}" />
    <script src="https://www.youtube.com/iframe_api"></script>

    <script type="module" src="assets/js/index.js"></script>
    <script type="module" src="assets/js/components/home/welcomePanel.js"></script>




    <background-configter>
    </background-configter>
</body>

</html>