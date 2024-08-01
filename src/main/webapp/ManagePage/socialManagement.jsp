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
        #content tr td input {
            width: 13vw;
            transition: all ease .3s;
        }
        #content tr td input:enabled:hover {
            width: 15vw;
        }
        #content tr td input:enabled:focus {
            width: 30vw;
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
            HTMLDom.createElement('input',[],
                HTMLDom.createElement('td',['disable'],row,{})
            ,{value: id})
            HTMLDom.createElement('input',[],
                HTMLDom.createElement('td',[],row,{})
            ,{value: uuid});
            HTMLDom.createElement('input',[],
                HTMLDom.createElement('td',[],row,{})
            ,{value: caption});
            HTMLDom.createElement('input',[],
                HTMLDom.createElement('td',[],row,{})
            ,{value: imgLink});
            HTMLDom.createElement('input',['disable'],
                HTMLDom.createElement('td',[],row,{})
            ,{value: authorId});
            HTMLDom.createElement('input',[],
                HTMLDom.createElement('td',[],row,{})
            ,{type: 'datetime-local', value: '' + uploadDate[0] + '-' + (uploadDate[1] < 10 ? '0'+uploadDate[1] : uploadDate[1]) + '-' + uploadDate[2] + 'T' + (uploadDate[3] < 10 ? '0'+uploadDate[3] : uploadDate[3]) + ':' + (uploadDate[4] < 10 ? '0'+uploadDate[4] : uploadDate[4])});
            console.log('' + uploadDate[0] + '-' + (uploadDate[1] < 10 ? '0'+uploadDate[1] : uploadDate[1]) + '-' + uploadDate[2] + 'T' + uploadDate[3] + ':' + uploadDate[4]);
            HTMLDom.createElement('input',[],
                HTMLDom.createElement('td',[],row,{})
            ,{value: treeHeart});
            HTMLDom.createElement('input',['disable'],
                HTMLDom.createElement('td',[],row,{})
            ,{value: firstName});
            HTMLDom.createElement('input',['disable'],
                HTMLDom.createElement('td',[],row,{})
                ,{value: lastName});
            HTMLDom.createElement('input',['disable'],
                HTMLDom.createElement('td',[],row,{})
            ,{value: avtLink});
            for(let _item of row.getElementsByTagName('input')) {
                _item.disabled = true;
            }

            let button = HTMLDom.createElement('button',[],
                HTMLDom.createElement('td',[],row,{})
            ,{innerText: 'Edit', value: 'tr-'+id});

            button.addEventListener('click',function editFunction() {
                let attList = document.getElementById(button.value).getElementsByTagName('td');
                let row = document.getElementById(button.value);

                let inputList = row.getElementsByTagName('input');
                for(let _item of inputList) {
                    if(!_item.classList.contains('disable'))
                        _item.disabled = false;
                }

                row.getElementsByTagName('button').item(0).removeEventListener('click',editFunction);
                row.getElementsByTagName('button').item(0).innerHTML = "Save"
                row.getElementsByTagName('button').item(0).addEventListener('click',function saveFunction(){
                    console.log('save');
                    for(let _item of inputList) {
                        console.log(_item.value);
                        _item.disabled = true;
                    }
                    let formData = new FormData();
                    // function createRow(content, id, uuid, caption, imgLink, authorId, uploadDate, treeHeart, firstName, lastName, avtLink) {
                        formData.append('type','editPost');
                    formData.append('id',inputList[0].value);
                    formData.append('uuid',inputList[1].value);
                    formData.append('postText',inputList[2].value);
                    formData.append('imageLink',inputList[3].value);
                    // formData.append('uploadDate',inputList[0].value);
                    formData.append('treeHeartNumber',inputList[6].value);
                    fetch('/api/post',{
                        method: 'POST',
                        body: formData
                    }).then(response => {
                        console.log(response);
                    }).catch(Error => {
                        console.log(Error);
                    })

                    // formData.append('authorId',inputList[0].value);
                    

                    row.getElementsByTagName('button').item(0).removeEventListener('click',saveFunction);
                    row.getElementsByTagName('button').item(0).innerHTML = "Edit"
                    row.getElementsByTagName('button').item(0).addEventListener('click',editFunction);
                });
                console.log('Button is clicked')
            })
        }




        {   
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
        }
    </script>

</body>
</html>
