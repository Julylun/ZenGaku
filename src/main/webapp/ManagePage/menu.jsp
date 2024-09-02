
<!-- <%@ page contentType="text/html;charset=UTF-8" language="java" %> -->
<html>
<head>
    <title>MENU</title>
    <script id = "rm-tg">function foo(e){return e||null}{let e=null;try{e=foo(${sessionScope.adminAuth})}catch(t){console.log(t)}console.log(e),!0==e?document.getElementById("rm-tg").remove():(document.getElementById("rm-tg").remove(),window.location.href="/401")}</script>
</head>
<body>
    <div style="display: flex; flex-direction: column; justify-self: center; align-items: center;">
        <h1 id = 'menu-tag'>-x-x-x-x- Menu -x-x-x-x-</h1>
        <br>
        <p>-------------------</p>
        <div>
            <button id = "social">social media</button>
            <button id = "user">user</button>
        </div>
        <p>-------------------</p>
    </div>

    <script>
        let b = ['social','user']
        let h = ['../admin/socialManagement','../admin/userManagement']

        for(let index = 0; index < b.length; index += 1){
            document.getElementById(b[index]).addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = h[index];
            })
        }
        let colorCodeList = ['#000000',
                            '#FFFFFF',
                            '#FF0000',
                            '#00FF00',
                            '#0000FF',
                            '#FFFF00',
                            '#00FFFF',
                            '#FF00FF',
                            ];
        let element = document.getElementById('menu-tag');
        let index = 0;
        function changeColor(){element.style.color = colorCodeList[index]; index++;   if(index >= 7) index = 0;}
        setInterval(changeColor,500);
    </script>
</body>
</html>
