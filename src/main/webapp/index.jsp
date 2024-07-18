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


<!-- End Import by developer -->

<!-- Disable by developer -->

   <!-- <link rel="stylesheet" href="assets/css/index.css"> --> 
   <!-- <link rel="stylesheet" href="assets/css/indexFeature.css"> -->

<!-- End Disable by developer -->

  
    
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon"
          type="image/svg"
          href="assets/resources/img/zengaku_logo.svg">
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
    <!-- ------------------------ -->
    <!-- ------------------------ -->
    <!-- ------------------------ -->
    <!-- ------------------------ -->
    <!-- Background configuration -->
    <!-- ------------------------ -->
    <!-- ------------------------ -->
    <!-- ------------------------ -->
    <div class = "content-item background-config-container auto-moving" id = "background-config">
        <div class = "content-item-title background-config-title">
            <div>
                <span>Background Configuration</span>
            </div>
        </div>
        <div class = "config-line"></div>

        <div class = "content-container">
            <div class = "config-add-button-container">
                <img class = "config-add-button background-config-add-button"
                 id = "bgcf-bt" src = "assets/resources/img/more-button-white.svg">
            </div>
            <div class = "config-line"></div>
            <div class = "background-config-add-content" style="display: none;">
                <div class = "background-config-type-box">
                    <input class = "auth-text-field background-config-field background-config-name-field" placeholder="Type background name">
                    <input class = "auth-text-field background-config-field background-config-text-field" placeholder="Paste your image/youtube's video link here">
                    <button class = "auth-button background-config-add-link-button">Add</button>
                </div>
            </div>
            <div class = "choice-container background-choice">
                <ul>
                    <li class = "background-config-item" value="https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?cs=srgb&dl=pexels-francesco-ungaro-1525041.jpg&fm=jpg">
                        <p>🗻 Moutaint and lake</p>
                    </li>
                    <li class = "background-config-item" value="https://asset.gecdesigns.com/img/wallpapers/beautiful-fantasy-wallpaper-ultra-hd-wallpaper-4k-sr10012418-1706506236698-cover.webp">
                        <p>🌗 Moon and Sun</p>
                    </li>
                    <li class = "background-config-item" value="https://pbs.twimg.com/media/Fxto7UTXgAEtKVC.jpg:large">
                        <p>🌃 The sky night</p>
                    </li>
                    <li class = "background-config-item" value="https://images.pexels.com/photos/3791466/pexels-photo-3791466.jpeg">
                        <p>🤵 Danger person</p>
                    </li>
                    <li class = "background-config-item" value="https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
                        <p>🚓 Old car</p>
                    </li>
                    <li class = "background-config-item" value="https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
                        <p>🌉 The bridge</p>
                    </li>
                    <li class = "background-config-item" value="https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
                        <p>🌿 Leaves</p>
                    </li>
                    <li class = "background-config-item video" value="https://www.youtube.com/embed/UZ9uyQI3pF0">
                        <p>🌻 Flowers</p>
                    </li>
                    <li class = "background-config-item video" value="https://www.youtube.com/embed/SVDooWT60Ho">
                        <p>🧑‍🤝‍🧑 Study with BTS</p>
                    </li>
                    <li class = "background-config-item video" value="https://www.youtube.com/embed/2XK0zoPWdi4">
                        <p>☕ Study in coffee shop</p>
                    </li>
                    <li class = "background-config-item video" value="https://www.youtube.com/embed/0nTO4zSEpOs">
                        <p>🚶‍♀️ Night Walk in Tokyo Shibuya</p>
                    </li>
                    <li class = "background-config-item video" value="https://www.youtube.com/embed/F8MN0o6RS9o">
                        <p>🚶‍♀️ Snowfall in Times Square, NYC</p>
                    </li>
                    <li class = "background-config-item video" value="https://www.youtube.com/embed/AY5qcIq5u2g">
                        <p>🚶‍♀️ FLYING OVER JAPAN</p>
                    </li>
                    <li class = "background-config-item video" value="https://www.youtube.com/embed/M9cJMXmQ_ZU">
                        <p>🪟 DOWNTOWN LOS ANGELES City View day </p>
                    </li>

                </ul>
            </div>
            <div class = "config-line"></div>
            <div class = "content-button-container background-config-button-container">
                <div class = "content-button-item" id = "background-config-apply-button">
                    <span>Apply</span>
                </div>
                <div class = "content-button-item" id = "background-config-cancel-button">
                    <span>Cancel</span>
                </div>
            </div>
        </div>
    </div>

    <!-- ------------------------ -->
    <!-- ------------------------ -->
    <!-- ------------------------ -->
    <!-- ------------------------ -->
    <!-- --Sound configuration--- -->
    <!-- ------------------------ -->
    <!-- ------------------------ -->
    <!-- ------------------------ -->
    <div class = "content-item sound-config-container auto-moving" id = "sound-config">
        <!-- <div class = "content-item-title background-config-title">
            <div>
                <span>Sound Configuration</span>
            </div>
        </div>
        <div class = "config-line"></div>

        <div class = "content-container" id = "sound-content-container">
            <div class = "config-add-button-container">
                <img class = "config-add-button" id = "sound-add-button" src = "assets/resources/img/more-button-white.svg">
            </div>
            <div class = "config-line"></div>
            <div class = "sound-add-container" id = "sound-add-container" style="display: none">
                <input class = "auth-text-field sound-add-input" id = "audio-name-sound-input" placeholder="Type Audio name">
                <input class = "auth-text-field sound-add-input" id = "icon-link-sound-input" placeholder="Paste your icon link (suggest white svg icon)">
                <input class = "auth-text-field sound-add-input" id = "audio-link-sound-input" placeholder="Paste your audio link">
                <button class = "auth-button" id = "sound-add-container-button">Add</button>
            </div>
            <div class = "choice-container" id = "sound-config-item-container">
                <ul>
                    <li class = "sound-config-item" value ="assets/resources/audio/ChillWind.mp3">
                        <div class ="sound-config-item-top">
                            <img src="assets/resources/img/defaultAudioImg/wind.svg">
                            <p>Chill wind</p>
                            <label class = "custom-check-box-container">
                                <input type="checkbox" class = "sound-item-check-box">
                            </label>
                        </div>
                        <div class = "sound-config-item-bottom">
                            <input class = "sound-item-slider" disabled ="1" type="range" min="0" max="100" value="50">
                            <p>50%</p>
                        </div>
                    </li>
                    <li class = "sound-config-item" value ="assets/resources/audio/ColdWind.mp3">
                        <div class ="sound-config-item-top">
                            <img src="assets/resources/img/defaultAudioImg/wind.svg">
                            <p>Cold wind</p>
                            <label class = "custom-check-box-container">
                                <input type="checkbox" class = "sound-item-check-box">
                            </label>
                        </div>
                        <div class = "sound-config-item-bottom">
                            <input class = "sound-item-slider" disabled ="1" type="range" min="0" max="100" value="50">
                            <p>50%</p>
                        </div>
                    </li>
                    <li class = "sound-config-item" value ="assets/resources/audio/OceanWave.mp3">
                        <div class ="sound-config-item-top">
                            <img src="assets/resources/img/defaultAudioImg/oceanwave.svg">
                            <p>Ocean wave</p>
                            <label class = "custom-check-box-container">
                                <input type="checkbox" class = "sound-item-check-box">
                            </label>
                        </div>
                        <div class = "sound-config-item-bottom">
                            <input class = "sound-item-slider" disabled ="1" type="range" min="0" max="100" value="50">
                            <p>50%</p>
                        </div>
                    </li>
                    <li class = "sound-config-item" value ="assets/resources/audio/OceanWave2.mp3">
                        <div class ="sound-config-item-top">
                            <img src="assets/resources/img/defaultAudioImg/oceanwave.svg">
                            <p>Ocean wave 2</p>
                            <label class = "custom-check-box-container">
                                <input type="checkbox" class = "sound-item-check-box">
                            </label>
                        </div>
                        <div class = "sound-config-item-bottom">
                            <input class = "sound-item-slider" disabled ="1" type="range" min="0" max="100" value="50">
                            <p>50%</p>
                        </div>
                    </li>
                    <li class = "sound-config-item" value ="assets/resources/audio/OfficeSound.mp3">
                        <div class ="sound-config-item-top">
                            <img src="assets/resources/img/defaultAudioImg/office.svg">
                            <p>Office sound</p>
                            <label class = "custom-check-box-container">
                                <input type="checkbox" class = "sound-item-check-box">
                            </label>
                        </div>
                        <div class = "sound-config-item-bottom">
                            <input class = "sound-item-slider" disabled ="1" type="range" min="0" max="100" value="50">
                            <p>50%</p>
                        </div>
                    </li>
                    <li class = "sound-config-item" value ="assets/resources/audio/3DOfficeSound.mp3">
                        <div class ="sound-config-item-top">
                            <img src="assets/resources/img/defaultAudioImg/office.svg">
                            <p>Pretty Real Office sound</p>
                            <label class = "custom-check-box-container">
                                <input type="checkbox" class = "sound-item-check-box">
                            </label>
                        </div>
                        <div class = "sound-config-item-bottom">
                            <input class = "sound-item-slider" disabled ="1" type="range" min="0" max="100" value="50">
                            <p>50%</p>
                        </div>
                    </li>
                    <li class = "sound-config-item" value ="assets/resources/audio/KeyboardType.mp3">
                        <div class ="sound-config-item-top">
                            <img src="assets/resources/img/defaultAudioImg/keyboard.svg">
                            <p>Keyboard type</p>
                            <label class = "custom-check-box-container">
                                <input type="checkbox" class = "sound-item-check-box">
                            </label>
                        </div>
                        <div class = "sound-config-item-bottom">
                            <input class = "sound-item-slider" disabled ="1" type="range" min="0" max="100" value="50">
                            <p>50%</p>
                        </div>
                    </li>
                    <li class = "sound-config-item" value ="assets/resources/audio/Campfire.mp3">
                        <div class ="sound-config-item-top">
                            <img src="assets/resources/img/defaultAudioImg/campfire.svg">
                            <p>Campfire</p>
                            <label class = "custom-check-box-container">
                                <input type="checkbox" class = "sound-item-check-box">
                            </label>
                        </div>
                        <div class = "sound-config-item-bottom">
                            <input class = "sound-item-slider" disabled ="1" type="range" min="0" max="100" value="50">
                            <p>50%</p>
                        </div>
                    </li>
                    <li class = "sound-config-item" value ="assets/resources/audio/OfficeSound.mp3">
                        <div class ="sound-config-item-top">
                            <img src="#">
                            <p>Item name 2</p>
                            <label class = "custom-check-box-container">
                                <input type="checkbox" class = "sound-item-check-box">
                            </label>
                        </div>
                        <div class = "sound-config-item-bottom">
                            <input class = "sound-item-slider" disabled ="1" type="range" min="0" max="100" value="50">
                            <p>50%</p>
                        </div>
                    </li>



                </ul>
            </div>
            <div class = "config-line"></div>
            <div class = "content-button-container">
                <div class = "content-button-item" id = "sound-config-apply-button">
                    <span>Apply</span>
                </div>
                <div class = "content-button-item" id = "sound-config-cancel-button">
                    <span>Cancel</span>
                </div>
            </div>
        </div> -->
    </div>

    <div class = "auto-moving" id = "timer-container" style="display: none;">
        <div id = "timer-background"></div>
        <div id = "timer-move-area">
            <img id = "timer-move-area-img" src="assets/resources/img/moving-icon-white.svg">
        </div>
        <div id = "timer-ring"><div id = "timer-circle"></div></div>
        <img class = "timer-logo" id = "timer-logo" src="assets/resources/img/tree-icon.png">
        <div id = "timer-choice-container">
            <p id = "break-label" value = "-1" style="display: none;">BREAK</p>
            <p class = "timer-choice-item" id = "timer-choice-pomodoro" value = "0">Pomodoro</p>
            <p class = "timer-choice-item timer-choice-selected" id = "timer-choice-shortbreak" value = "1">Short break</p>
            <p class = "timer-choice-item" id = "timer-choice-longbreak" value = "2">Long break</p>
        </div>
        <div id = "timer-count-container">
            <p id = "timer-count-text">60:60:60</p>
        </div>
        <div id = "timer-end-container" style="display: none;">
            <p id = "timer-end-label" style="display: none;">END</p>
        </div>
        <div class = "timer-button" id = "timer-start-button">
            <p>Start</p>
        </div>
        <div class = "timer-button" id = "timer-pause-button" style="display: none;">
            <p>Pause</p>
        </div>
        <div class = "timer-button" id = "timer-skip-button" style="display: none;">
            <p>Skip</p>
        </div>
        <div class = "timer-button" id = "timer-stop-button" style="display: none;">
            <p>Stop</p>
        </div>
        <div class = "timer-button" id = "timer-continue-button" style="display: none;">
            <p>Continue</p>
        </div>
    </div>

    <div class="all-quote-box auto-moving" style="display: none;">
        <div class="quote-box">
            <button class="close-btn">&times;</button>
            <h2>Quote of the Day</h2>
            <blockquote id="quote">Loading</blockquote>
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

<!-- <script type="module" src="assets/js/components/HTMLDom.js"></script> -->
<!-- <script type="module" src="assets/js/components/notificationPanel.js"></script> -->
<script type="module" src="assets/js/indexInitFunction.js"></script>

<script type = "module" src="assets/js/index.js"></script>
<script type="module" src="assets/js/components/ZenGakuWidget/counter.js"></script>
<!-- <script src="assets/js/feature.js"></script> -->




<background-configter>
</background-configter>
</body>

</html>