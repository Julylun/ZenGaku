<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
    <head>
        <link rel = "stylesheet" href="assets/css/laicos.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="UTF-8">
        <script type = "module" src="assets/css/laicos.css"></script>
    </head>
    <body>
        <!-- Navigation bar -->
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
        </div>


        <!-- Newsfeed -->
        <div class = "newsfeed">
            <!-- <div class = "post">
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
            </div> -->

            </div>

            
           <!-- Controller -->
        </div>
        <nav id = "bottom-nav-bar">
            <div class = "nav-item">
                <a href="/">
                    <img class = "nav-item-image" src = "assets/resources/img/back-button-laicos-white.svg">
                </a>
            </div>
            <div class = "nav-item">
                <a href="/Zentizen/messages">
                <img class = "nav-item-image" src = "assets/resources/img/message-button-laicos-white.svg">
                </a>
            </div>
            <div class = "nav-item" id = 'nav-add-post'>
                <img class = "nav-item-image" src = "assets/resources/img/add-post-laicos-white.svg">
            </div>
            <div class = "nav-item">
                <img class = "nav-item-image" src = "assets/resources/img/search-laicos-white.svg">
            </div>
            <div class = "nav-item">
                <img class = "nav-item-image" src = "assets/resources/img/setting-laicos-white.svg">
            </div>
        </nav>


        <!-- Default configuration -->
        <input type="hidden" id = "lg-vl" name = "loginValue" value="${sessionScope.loginStatus}"/>

        <script type="module" src = "assets/js/laicos.js"></script>
        
        
    </body>
</html>

<%--<filter>--%>
<%--    <filter-name>CorsFilter</filter-name>--%>
<%--    <filter-class>org.apache.catalina.filters.CorsFilter</filter-class>--%>
<%--  </filter>--%>
<%--  <filter-mapping>--%>
<%--    <filter-name>CorsFilter</filter-name>--%>
<%--    <url-pattern>/*</url-pattern>--%>
<%--  </filter-mapping>--%>