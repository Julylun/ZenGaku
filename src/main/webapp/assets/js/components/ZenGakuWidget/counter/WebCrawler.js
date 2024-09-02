export {
    crawl
}

const crawl = (url) => {
    fetch(url)
    .then(response => {
        if(!response.ok ) throw new Error("Occur errors " + response.status);
        return response.text();
    })
    .then (html => {
        let htmlDocument = new DOMParser().parseFromString(html, 'text/html');
        console.log(htmlDocument);
    })
    .catch(Error => {
        console.log(Error);
    })
}