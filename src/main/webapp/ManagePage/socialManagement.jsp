<%--
  Created by IntelliJ IDEA.
  User: JulyLun
  Date: 7/31/2024
  Time: 8:16 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script id =  "rm-tg">function foo(e){return e||null}{let e=null;try{e=foo(${sessionScope.adminAuth})}catch(t){}!0==e?document.getElementById("rm-tg").remove():(document.getElementById("rm-tg").remove(),window.location.href="/401")}</script>
    <style>
        #content {
            border: black solid 3px;
        }
        #content tr th {
            align-items: center;
            border: black solid 3px;
            text-align: center;
        }
        #content tr td {
            align-items: center;
            border: black dashed 1.5px;
            text-align: center;
        }
    </style>
</head>
<body>
    <table id = 'content' style="width: 100%">
        <tr>
            <th>Id</th>
            <th>uuid</th>
            <th>Caption</th>
            <th>Image Link</th>
            <th>Author Id</th>
            <th>Upload Date</th>
            <th>Tree Heart Numbers</th>
            <th>Author First Name</th>
            <th>Author Last Name</th>
            <th>Author Avatar Link</th>
            <th>-..-</th>
        </tr>
    </table>
    <div>
        <button>Return</button>
    </div>
    <script type = 'module'>
        import * as HTMLDom from '../assets/js/components/HTMLDom.js'
        let content = document.getElementById('content');
        function createRow(content, id, uuid, caption, imgLink, authorId, uploadDate, treeHeart, firstName, lastName, avtLink) {
            let row = HTMLDom.createElement('tr',[],content,{},'tr-'+id);
            HTMLDom.createElement('td',[],row,{innerText: id});
            HTMLDom.createElement('td',[],row,{innerText: uuid});
            HTMLDom.createElement('td',[],row,{innerText: caption});
            HTMLDom.createElement('td',[],row,{innerText: imgLink});
            HTMLDom.createElement('td',[],row,{innerText: authorId});
            HTMLDom.createElement('td',[],row,{innerText: uploadDate});
            HTMLDom.createElement('td',[],row,{innerText: treeHeart});
            HTMLDom.createElement('td',[],row,{innerText: firstName});
            HTMLDom.createElement('td',[],row,{innerText: lastName});
            HTMLDom.createElement('td',[],row,{innerText: avtLink});
            let button = HTMLDom.createElement('button',[],
                HTMLDom.createElement('td',[],row,{})
            ,{innerText: 'Edit', value: 'tr-'+id});

            button.addEventListener('click',() => {
                let attList = document.getElementById(button.value).getElementsByTagName('td');
                let row = document.getElementById(button.value);
                for(let index = 0; index < attList.length - 1; index += 1){
                    HTMLDom.createElement('td',[],row,{innerHTML: "<input value = '" + attList[index].innerText + "'>"});
                    attList[index].remove()
                }


            })
        }
        let formData = new FormData();
        formData.append('type','getPost')
        fetch('/api/post',{
            method: 'POST',
            body: formData
        }).then(response => response.json())
            .then(data => {
                for(let _item of data){
                    createRow(content,
                        _item.id,
                        _item.uuid,
                        _item.postText,
                        _item.imageLink,
                        _item.authorId,
                        _item.uploadDate,
                        _item.treeHeartNumber,
                        _item.authorFirstName,
                        _item.authorLastName,
                        _item.authorAvatarLink,
                    )
                }
            })
    </script>

</body>
</html>
