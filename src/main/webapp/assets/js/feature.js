let contentContainer = document.getElementsByClassName('content').item(0);
let contentManager = new Array();

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

document.getElementById('background-config-feature').addEventListener('click',function(){
        let backgroundConfigFeatureTag = document.createElement("div");
        backgroundConfigFeatureTag.classList.add("content-item");
        let tempId = "content-id-" + makeid(32);
        console.log(tempId);
        backgroundConfigFeatureTag.id = tempId;
        backgroundConfigFeatureTag.innerHTML
            = "";
        contentContainer.appendChild();
})