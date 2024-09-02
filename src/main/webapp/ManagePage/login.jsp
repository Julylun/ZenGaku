<!-- <%--
  Created by IntelliJ IDEA.
  User: JulyLun
  Date: 7/31/2024
  Time: 4:03 PM
  To change this template use File | Settings | File Templates.
--%> -->
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Zengaku admin</title>
</head>
<body>
    <form style = "display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <h1>Login</h1>
        <div style="display: flex; flex-direction: column;">
            <label>Username</label>
            <input id = "username" type ="text" style="height: auto; width: 20vw;">
        </div>
        <div style="display: flex; flex-direction: column;">
            <label>Password:</label>
            <input id = "password" type ="password" style="height: auto; width: 20vw;">
        </div>
        <button id = "loginBtn" style="height: auto; width: 20vw;">Login</button>
    </form>
    <script>
        document.getElementById('loginBtn').addEventListener('click',(event)=> {
            event.preventDefault();
            let formData = new FormData();
            formData.append('username',document.getElementById('username').value)
            formData.append('password',document.getElementById('password').value)
            fetch('/admin/login',{
                method: 'POST',
                body: formData
            }).then(response => response.json())
                .then(data => {
                    if(data.approve == 'true'){
                        window.location.href = "./menu";
                    } else {
                        window.location.reload();
                    }
                })
        });
    </script>
</body>
</html>
