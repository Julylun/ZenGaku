<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Reset Password</title>
    <style>
        .form-container {
            max-width: 400px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background: #f9f9f9;
        }

        .form-field {
            margin-bottom: 10px;
        }

        .form-field input {
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
        }

        .form-field label {
            font-weight: bold;
        }

        .form-button {
            width: 100%;
            padding: 10px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .form-button:hover {
            background-color: #45a049;
        }
    </style>

</head>
<body>
<div class="form-container">
    <h2>Reset Password</h2>
    <form action="new-password" method="post">
        <!-- Include a hidden field for the password reset token -->
        <input type="hidden" name="token" value="${param.token}">

        <div class="form-field">
            <label for="new-password">New Password:</label>
            <input type="password" id="new-password" name="newPassword" required>
        </div>


        <button type="submit" class="form-button">Reset Password</button>
    </form>
</div>
</body>
</html>
