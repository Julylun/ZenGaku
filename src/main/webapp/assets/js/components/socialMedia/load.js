import * as HTMLDom from '../HTMLDom.js'
export {
    displayUploadingAnimation,
    hideUploadingAnimation
}

const displayUploadingAnimation = () => {
    HTMLDom.createElement("img",[],HTMLDom.createElement("div",[],document.body,{},"uploading"),{src: 'assets/resources/img/socialMedia/function/UploadPost.gif'})
}

const hideUploadingAnimation = () => {
    document.getElementById("uploading").remove();
}