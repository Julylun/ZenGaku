
export {
    likePost
}

const likePost = (uuid, userId) => {
    return new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append("postUUID",uuid);
        formData.append("userId",userId);

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "social/api/likePost", true);

        xhr.onload = function() {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                if (data.isApprove) {
                    resolve(true);
                } else {
                    reject(false)
                }
                
            } else {
                console.error("Error while like post ", xhr.statusText);
                reject(false);
            }
        };

        xhr.onerror = function() {
            console.error("Network error while like post");
            reject(false);
        };

        xhr.send(formData);
    });
}