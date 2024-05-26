<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
    <head>
        <link rel = "stylesheet" href="assets/css/laicos.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="UTF-8">
        <script src="assets/js/auth.js"></script>

    </head>
    <body>
        <nav id="nav-bar">
            <div id="space">
            </div>
            <div id="logo-name">
                <p>ZENGAKU</p>
            </div>
            <div id="tree-button" style="display: block;">
                <img src="assets/resources/img/tree-icon-dark.png">
            </div>
        </nav>
        <div class = "split-line"></div>

        <div id = "notify-panel" style="display: none;">
            <div class = "notify-account-display">
                <div class = "notify-avatar-container">
                    <img src = "assets/resources/img/meomeo.jpg">
                </div>
                <div class = "notify-text-container">
                    <div class = "notify-text-on-top">
                        <p>Hello</p>
                    </div>
                    <div class = "notify-text-day-xa-hoi">
                        <p class = "notify-account-name">Hoang Luan</p>
                        <p class = "notify-account-point">169 tree points</p>
                    </div>
                </div>
            </div>
            <div class = "notify-line-container">
                <div class = "notify-bold-line"></div>
            </div>
            <div class = "notify-content-display">
                <div class = "notify-content-item">
                    <div class = "notify-content-item-icon-layer">
                        <img src = "assets/resources/img/notify-notification-icon.svg">
                    </div>
                    <div class = "notify-content-item-text-container">
                        <p class = "notify-title">Mèo con đang buồn đấy!</p>
                        <p class = "notify-message">Mùa nuôi mèo đến rồi, cậu chủ thì vẫn ngồi lì ở ra đó.</p>
                    </div>
                    <div class = "notify-line-container">
                        <div class = "notify-light-line"></div>
                    </div>
                </div>
                <div class = "notify-content-item">
                    <div class = "notify-content-item-icon-layer">
                        <img src = "assets/resources/img/notify-notification-icon.svg">
                    </div>
                    <div class = "notify-content-item-text-container">
                        <p class = "notify-title">Đã Lâu lắm rồi cậu chủ không trở lại.</p>
                        <p class = "notify-message"> Có nằm mơ cũng không tin được mình bị cậu chủ đối xử như vậy.</p>
                    </div>
                    <div class = "notify-line-container">
                        <div class = "notify-light-line"></div>
                    </div>
                </div>
                <div class = "notify-content-item">
                    <div class = "notify-content-item-icon-layer">
                        <img src = "assets/resources/img/notify-notification-icon.svg">
                    </div>
                    <div class = "notify-content-item-text-container">
                        <p class = "notify-title">Cậu chủ, lại chơi với mèo đi.</p>
                        <p class = "notify-message">Cậu chủ thật là không có lương tâm gì cả, đã bao ngày xa cách như vậy.</p>
                    </div>
                    <div class = "notify-line-container">
                        <div class = "notify-light-line"></div>
                    </div>
                </div>
            </div>
            <div class = "notify-bottom-panel">
                <div class = "notify-button-container">
                    <img class = "notify-exit-button" src = "assets/resources/img/notify-logout.svg">
                </div>
            </div>
        </div>


        <div class = "newsfeed">
            <div class = "post">
                <div class = "post-user-information">
                    <div class = "post-avatar">
                        <img class = "avatar-image" src = "assets/resources/img/HoangLuan_Avt_demo.png">
                    </div>
                    <div class = "time-user-information">
                        <a class = "user-hyperlink" href = "#">
                            <p class = "user-name">Hoàng Luân</p>
                        </a>
                        <div class = "time-privacy">
                            <p class = "post-time">2d</p>
                            <img class = "privacy-icon" src = "assets/resources/img/public-icon-black.svg">
                        </div>
                    </div>
                </div>
                <div class = "post-content">
                    <div class = "post-image">
                        <img class = "_post-image" src = "assets/resources/img/demoImage/lun.jpg">
                    </div>
                    <div class = "post-control-pane">
                        <div class = "post-control-pane-button">
                            <label class = "tree-heart-button">
                                <input type="checkbox" id="#" class = "tree-heart-checkbox" name="like-button" value="">
                                <img class = "tree-heart-image-unchecked" src="assets/resources/img/tree-heart-icon-unchecked-2.svg">
                                <img class = "tree-heart-image-checked" src="assets/resources/img/tree-heart-icon-checked-2.svg">
                            </label>
                            <div class = "comment-button">
                                <img class = "comment-image" src = "assets/resources/img/comment-icon-white.svg">
                            </div>
                            <div class = "share-button">
                                <img class = "share-image" src  = "assets/resources/img/share-icon-white.svg">
                            </div>
                        </div>
                        <div class = "view-container">
                            <p class = "post-number-of-view">1234 trees</p>
                        </div>
                    </div>
                    <div class = "post-caption">
                        <p class = "user-name-caption">Hoàng Luân</p>
                        <p class = "user-caption" >PR cho trường đồ</p>
                    </div>
                </div>
                <div class = "line-container">
                    <div class = "end-post-line"></div>
                </div>
            </div>
            <div class = "post">
                <div class = "post-user-information">
                    <div class = "post-avatar">
                        <img class = "avatar-image" src = "assets/resources/img/demoImage/HaiAvt.jpg">
                    </div>
                    <div class = "time-user-information">
                        <a class = "user-hyperlink" href = "#">
                            <p class = "user-name">Nguyễn Hồng Hải</p>
                        </a>
                        <div class = "time-privacy">
                            <p class = "post-time">2h</p>
                            <img class = "privacy-icon" src = "assets/resources/img/public-icon-black.svg">
                        </div>
                    </div>
                </div>
                <div class = "post-content">
                    <div class = "post-image">
                        <img class = "_post-image" src = "assets/resources/img/demoImage/haipost.jpg">
                    </div>
                    <div class = "post-control-pane">
                        <div class = "post-control-pane-button">
                            <label class = "tree-heart-button">
                                <input type="checkbox" id="#" class = "tree-heart-checkbox" name="like-button" value="">
                                <img class = "tree-heart-image-unchecked" src="assets/resources/img/tree-heart-icon-unchecked-2.svg">
                                <img class = "tree-heart-image-checked" src="assets/resources/img/tree-heart-icon-checked-2.svg">
                            </label>
                            <div class = "comment-button">
                                <img class = "comment-image" src = "assets/resources/img/comment-icon-white.svg">
                            </div>
                            <div class = "share-button">
                                <img class = "share-image" src  = "assets/resources/img/share-icon-white.svg">
                            </div>
                        </div>
                        <div class = "view-container">
                            <p class = "post-number-of-view">63 trees</p>
                        </div>
                    </div>
                    <div class = "post-caption">
                        <p class = "user-name-caption">Nguyễn Hồng Hải</p>
                        <p class = "user-caption" >Phù. Cuối cùng cũng được 10 điểm java</p>
                    </div>
                </div>
                <div class = "line-container">
                    <div class = "end-post-line"></div>
                </div>
            </div>
            <div class = "post">
                <div class = "post-user-information">
                    <div class = "post-avatar">
                        <img class = "avatar-image" src = "assets/resources/img/demoImage/vyavt.jpg">
                    </div>
                    <div class = "time-user-information">
                        <a class = "user-hyperlink" href = "#">
                            <p class = "user-name">Nguyễn Vy</p>
                        </a>
                        <div class = "time-privacy">
                            <p class = "post-time">2h</p>
                            <img class = "privacy-icon" src = "assets/resources/img/public-icon-black.svg">
                        </div>
                    </div>
                </div>
                <div class = "post-content">
                    <div class = "post-image">
                        <img class = "_post-image" src = "assets/resources/img/demoImage/vyImg.jpg">
                    </div>
                    <div class = "post-control-pane">
                        <div class = "post-control-pane-button">
                            <label class = "tree-heart-button">
                                <input type="checkbox" id="#" class = "tree-heart-checkbox" name="like-button" value="">
                                <img class = "tree-heart-image-unchecked" src="assets/resources/img/tree-heart-icon-unchecked-2.svg">
                                <img class = "tree-heart-image-checked" src="assets/resources/img/tree-heart-icon-checked-2.svg">
                            </label>
                            <div class = "comment-button">
                                <img class = "comment-image" src = "assets/resources/img/comment-icon-white.svg">
                            </div>
                            <div class = "share-button">
                                <img class = "share-image" src  = "assets/resources/img/share-icon-white.svg">
                            </div>
                        </div>
                        <div class = "view-container">
                            <p class = "post-number-of-view">53 trees</p>
                        </div>
                    </div>
                    <div class = "post-caption">
                        <p class = "user-name-caption">Nguyễn Vy</p>
                        <p class = "user-caption" >Cháu ai xinh xinhhh</p>
                    </div>
                </div>
                <div class = "line-container">
                    <div class = "end-post-line"></div>
                </div>
            </div>
            <div class = "post">
                <div class = "post-user-information">
                    <div class = "post-avatar">
                        <img class = "avatar-image" src = "assets/resources/img/defaultBackground/default-background4.jpg">
                    </div>
                    <div class = "time-user-information">
                        <a class = "user-hyperlink" href = "#">
                            <p class = "user-name">The Lofi Chill Team</p>
                        </a>
                        <div class = "time-privacy">
                            <p class = "post-time">2h</p>
                            <img class = "privacy-icon" src = "assets/resources/img/public-icon-black.svg">
                        </div>
                    </div>
                </div>
                <div class = "post-content">
                    <div class = "post-image">
                        <img class = "_post-image" src = "assets/resources/img/demoImage/lofi.jpg">
                    </div>
                    <div class = "post-control-pane">
                        <div class = "post-control-pane-button">
                            <label class = "tree-heart-button">
                                <input type="checkbox" id="#" class = "tree-heart-checkbox" name="like-button" value="">
                                <img class = "tree-heart-image-unchecked" src="assets/resources/img/tree-heart-icon-unchecked-2.svg">
                                <img class = "tree-heart-image-checked" src="assets/resources/img/tree-heart-icon-checked-2.svg">
                            </label>
                            <div class = "comment-button">
                                <img class = "comment-image" src = "assets/resources/img/comment-icon-white.svg">
                            </div>
                            <div class = "share-button">
                                <img class = "share-image" src  = "assets/resources/img/share-icon-white.svg">
                            </div>
                        </div>
                        <div class = "view-container">
                            <p class = "post-number-of-view">1234 trees</p>
                        </div>
                    </div>
                    <div class = "post-caption">
                        <p class = "user-name-caption">The Lofi Chill Team</p>
                        <p class = "user-caption" >Có muốn nghe nhạc không, đối thủ?</p>
                    </div>
                </div>
                <div class = "line-container">
                    <div class = "end-post-line"></div>
                </div>
            </div>
            <div class = "post">
                <div class = "post-user-information">
                    <div class = "post-avatar">
                        <img class = "avatar-image" src = "assets/resources/img/default-avt.png">
                    </div>
                    <div class = "time-user-information">
                        <a class = "user-hyperlink" href = "#">
                            <p class = "user-name">Lê Mẩn</p>
                        </a>
                        <div class = "time-privacy">
                            <p class = "post-time">6h</p>
                            <img class = "privacy-icon" src = "assets/resources/img/public-icon-black.svg">
                        </div>
                    </div>
                </div>
                <div class = "post-content">
                    <div class = "post-image">
                        <img class = "_post-image" src = "assets/resources/img/demoImage/man.webp">
                    </div>
                    <div class = "post-control-pane">
                        <div class = "post-control-pane-button">
                            <label class = "tree-heart-button">
                                <input type="checkbox" id="#" class = "tree-heart-checkbox" name="like-button" value="">
                                <img class = "tree-heart-image-unchecked" src="assets/resources/img/tree-heart-icon-unchecked-2.svg">
                                <img class = "tree-heart-image-checked" src="assets/resources/img/tree-heart-icon-checked-2.svg">
                            </label>
                            <div class = "comment-button">
                                <img class = "comment-image" src = "assets/resources/img/comment-icon-white.svg">
                            </div>
                            <div class = "share-button">
                                <img class = "share-image" src  = "assets/resources/img/share-icon-white.svg">
                            </div>
                        </div>
                        <div class = "view-container">
                            <p class = "post-number-of-view">2 trees</p>
                        </div>
                    </div>
                    <div class = "post-caption">
                        <p class = "user-name-caption">Lê Mẩn</p>
                        <p class = "user-caption" >@Nguyễn Hồng Hải nấu ăn không bây?</p>
                    </div>
                </div>
                <div class = "line-container">
                    <div class = "end-post-line"></div>
                </div>
            </div>
            <div class = "post">
                <div class = "post-user-information">
                    <div class = "post-avatar">
                        <img class = "avatar-image" src = "assets/resources/img/HoangLuan_Avt_demo.png">
                    </div>
                    <div class = "time-user-information">
                        <a class = "user-hyperlink" href = "#">
                            <p class = "user-name">Nguyễn Ly</p>
                        </a>
                        <div class = "time-privacy">
                            <p class = "post-time">2h</p>
                            <img class = "privacy-icon" src = "assets/resources/img/public-icon-black.svg">
                        </div>
                    </div>
                </div>
                <div class = "post-content">
                    <div class = "post-image">
                        <img class = "_post-image" src = "assets/resources/img/demoImage/ly.jpg">
                    </div>
                    <div class = "post-control-pane">
                        <div class = "post-control-pane-button">
                            <label class = "tree-heart-button">
                                <input type="checkbox" id="#" class = "tree-heart-checkbox" name="like-button" value="">
                                <img class = "tree-heart-image-unchecked" src="assets/resources/img/tree-heart-icon-unchecked-2.svg">
                                <img class = "tree-heart-image-checked" src="assets/resources/img/tree-heart-icon-checked-2.svg">
                            </label>
                            <div class = "comment-button">
                                <img class = "comment-image" src = "assets/resources/img/comment-icon-white.svg">
                            </div>
                            <div class = "share-button">
                                <img class = "share-image" src  = "assets/resources/img/share-icon-white.svg">
                            </div>
                        </div>
                        <div class = "view-container">
                            <p class = "post-number-of-view">64 trees</p>
                        </div>
                    </div>
                    <div class = "post-caption">
                        <p class = "user-name-caption">Nguyễn Ly</p>
                        <p class = "user-caption" >Mình sinh ra để chụp những thứ linhh tinh này đây 👀</p>
                    </div>
                </div>
                <div class = "line-container">
                    <div class = "end-post-line"></div>
                </div>
            </div>

            <div class = "post">
                <div class = "post-user-information">
                    <div class = "post-avatar">
                        <img class = "avatar-image" src = "assets/resources/img//demoImage/tragavt.JPG">
                    </div>
                    <div class = "time-user-information">
                        <a class = "user-hyperlink" href = "#">
                            <p class = "user-name">Kiểu Trang</p>
                        </a>
                        <div class = "time-privacy">
                            <p class = "post-time">1h</p>
                            <img class = "privacy-icon" src = "assets/resources/img/public-icon-black.svg">
                        </div>
                    </div>
                </div>
                <div class = "post-content">
                    <div class = "post-image">
                        <img class = "_post-image" src = "assets/resources/img/demoImage/trang.jpg">
                    </div>
                    <div class = "post-control-pane">
                        <div class = "post-control-pane-button">
                            <label class = "tree-heart-button">
                                <input type="checkbox" id="#" class = "tree-heart-checkbox" name="like-button" value="">
                                <img class = "tree-heart-image-unchecked" src="assets/resources/img/tree-heart-icon-unchecked-2.svg">
                                <img class = "tree-heart-image-checked" src="assets/resources/img/tree-heart-icon-checked-2.svg">
                            </label>
                            <div class = "comment-button">
                                <img class = "comment-image" src = "assets/resources/img/comment-icon-white.svg">
                            </div>
                            <div class = "share-button">
                                <img class = "share-image" src  = "assets/resources/img/share-icon-white.svg">
                            </div>
                        </div>
                        <div class = "view-container">
                            <p class = "post-number-of-view">2 trees</p>
                        </div>
                    </div>
                    <div class = "post-caption">
                        <p class = "user-name-caption">Kiều Trang</p>
                        <p class = "user-caption" >Cho kao cafeinnnnnnnnnnnnnn</p>
                    </div>
                </div>
                <div class = "line-container">
                    <div class = "end-post-line"></div>
                </div>
            </div>
            <div class = "post">
                <div class = "post-user-information">
                    <div class = "post-avatar">
                        <img class = "avatar-image" src = "assets/resources/img/HoangLuan_Avt_demo.png">
                    </div>
                    <div class = "time-user-information">
                        <a class = "user-hyperlink" href = "#">
                            <p class = "user-name">Lê Mẩn</p>
                        </a>
                        <div class = "time-privacy">
                            <p class = "post-time">6h</p>
                            <img class = "privacy-icon" src = "assets/resources/img/public-icon-black.svg">
                        </div>
                    </div>
                </div>
                <div class = "post-content">
                    <div class = "post-image">
                        <img class = "_post-image" src = "assets/resources/img/default-background2.jpg">
                    </div>
                    <div class = "post-control-pane">
                        <div class = "post-control-pane-button">
                            <label class = "tree-heart-button">
                                <input type="checkbox" id="#" class = "tree-heart-checkbox" name="like-button" value="">
                                <img class = "tree-heart-image-unchecked" src="assets/resources/img/tree-heart-icon-unchecked-2.svg">
                                <img class = "tree-heart-image-checked" src="assets/resources/img/tree-heart-icon-checked-2.svg">
                            </label>
                            <div class = "comment-button">
                                <img class = "comment-image" src = "assets/resources/img/comment-icon-white.svg">
                            </div>
                            <div class = "share-button">
                                <img class = "share-image" src  = "assets/resources/img/share-icon-white.svg">
                            </div>
                        </div>
                        <div class = "view-container">
                            <p class = "post-number-of-view">2 trees</p>
                        </div>
                    </div>
                    <div class = "post-caption">
                        <p class = "user-name-caption">Lê Mẩn</p>
                        <p class = "user-caption" >@Nguyễn Hồng Hải nấu ăn không bây?</p>
                    </div>
                </div>
                <div class = "line-container">
                    <div class = "end-post-line"></div>
                </div>
            </div>

            
           
        </div>
        <nav id = "bottom-nav-bar">
            <div class = "nav-item">
                <a href="index.jsp">
                    <img class = "nav-item-image" src = "assets/resources/img/back-button-laicos-white.svg">
                </a>
            </div>
            <div class = "nav-item">
                <img class = "nav-item-image" src = "assets/resources/img/message-button-laicos-white.svg">
            </div>
            <div class = "nav-item">
                <img class = "nav-item-image" src = "assets/resources/img/add-post-laicos-white.svg">
            </div>
            <div class = "nav-item">
                <img class = "nav-item-image" src = "assets/resources/img/search-laicos-white.svg">
            </div>
            <div class = "nav-item">
                <img class = "nav-item-image" src = "assets/resources/img/setting-laicos-white.svg">
            </div>
        </nav>


        <input type="hidden" id = "lg-vl" name = "loginValue" value="${sessionScope.loginStatus}"/>



        <script src = "assets/js/laicos.js"></script>
    </body>
</html>