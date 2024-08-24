<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title></title>
    <link rel = "stylesheet" href = "/assets/css/laicos.css">
    <link rel = "stylesheet" href = "/assets/css/laicos/profile/profile.css">

</head>
<body>
    <nav id="nav-bar">
        <div id="space">
        </div>
        <div id="logo-name">
            <p>ZENGAKU</p>
        </div>
        <div id="tree-button" style="display: block;">
            <img src="/assets/resources/img/tree-icon-dark.png">
        </div>
    </nav>
    
    <div class = "split-line"></div>
    <div id = "notify-panel" style="display: none;"> </div>

        
    <div class = "newsfeed">
        <div class = "profile-information">
            <div class = "profile-information__user">
                <div class = "profile-information__user--avatar-block">
                    <div id = "profile-image-container">
                        <img src = "/assets/resources/img/demoImage/ly.jpg"id = "profile-image">
                    </div>
                </div>
                <div class = "profile-information__user--information-block">
                    <div id = "name-block">
                        <div class = 'profile-name'>
                            <p>Hoang Luan</p>                       
                        </div>
                        <div class = 'profile-username'>
                            <p>@Hoangluan</p>                      
                        </div>
                    </div>
                    <div id = "badge-block">
						<div id = "badge-hiding-layer">
						    <div class = 'badge-item visible-badge-item'></div>
						    <div class = 'badge-item visible-badge-item'></div>
						    <div class = 'badge-item visible-badge-item'></div>
                            <div class = 'badge-item visible-badge-item'></div>
						</div>
                    </div>
                </div>
                <div class = "profile-information__user--button-block">
                    <div class = "profile-information__user--button-arrange">
                        
                        <button class = "profile-information__user--show-button profile-add-button">Add</button>                        
                        <button class = "profile-information__user--hiding-button profile-friend-button">Friend</button> 
                        <button class = "profile-information__user--hiding-button profile-bestie-button">Bestie</button> 
                        <button class = "profile-information__user--hiding-button profile-edit-button">Edit profile</button> 
                    </div>
                </div>
            </div>
            <div class="line-container"><div class="end-post-line"></div></div>
            <div class = "profile-information__bio">
                <p>Tôi không làm gì và bạn cũng chả làm mọe gì</p>
            </div>
            <div class="line-container"><div class="end-post-line"></div></div>

    </div>

















 <div class = "post">
                <div class = "post-user-information">
                    <div class = "post-avatar">
                        <img class = "avatar-image" src = "/assets/resources/img/HoangLuan_Avt_demo.png">
                    </div>
                    <div class = "time-user-information">
                        <a class = "user-hyperlink" href = "#">
                            <p class = "user-name">Hoàng Luân</p>
                        </a>
                        <div class = "time-privacy">
                            <p class = "post-time">2d</p>
                            <img class = "privacy-icon" src = "/assets/resources/img/public-icon-black.svg">
                        </div>
                    </div>
                </div>
                <div class = "post-content">
                    <div class = "post-image">
                        <img class = "_post-image" src = "/assets/resources/img/demoImage/lun.jpg">
                    </div>
                    <div class = "post-control-pane">
                        <div class = "post-control-pane-button">
                            <label class = "tree-heart-button">
                                <input type="checkbox" id="#" class = "tree-heart-checkbox" name="like-button" value="">
                                <img class = "tree-heart-image-unchecked" src="/assets/resources/img/tree-heart-icon-unchecked-2.svg">
                                <img class = "tree-heart-image-checked" src="/assets/resources/img/tree-heart-icon-checked-2.svg">
                            </label>
                            <div class = "comment-button">
                                <img class = "comment-image" src = "/assets/resources/img/comment-icon-white.svg">
                            </div>
                            <div class = "share-button">
                                <img class = "share-image" src  = "/assets/resources/img/share-icon-white.svg">
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



        
    </div>


    <nav id = "bottom-nav-bar">
            <div class = "nav-item">
                <a href="index.jsp">
                    <img class = "nav-item-image" src = "/assets/resources/img/back-button-laicos-white.svg">
                </a>
            </div>
            <div class = "nav-item">
                <img class = "nav-item-image" src = "/assets/resources/img/message-button-laicos-white.svg">
            </div>
            <div class = "nav-item" id = 'nav-add-post'>
                <img class = "nav-item-image" src = "/assets/resources/img/add-post-laicos-white.svg">
            </div>
            <div class = "nav-item">
                <img class = "nav-item-image" src = "/assets/resources/img/search-laicos-white.svg">
            </div>
            <div class = "nav-item">
                <img class = "nav-item-image" src = "/assets/resources/img/setting-laicos-white.svg">
            </div>
    </nav>


</body>
    <script type = "module" src="/assets/js/features/SocialMedia/profile/profile.js"></script>
</html>
