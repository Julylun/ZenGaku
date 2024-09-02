//Background variable
let contentContainer = document.getElementsByClassName('content').item(0);
 

//QUOTES --------------------------------
//quote
document.getElementById('quotes-feature').addEventListener('click',function(){
  document.getElementsByClassName('all-quote-box').item(0).style.display = "block";
  document.getElementsByClassName('quote-box').item(0).style.display = "block";
})
document.addEventListener('DOMContentLoaded', function() {
  const quote = document.getElementById("quote");
  const author = document.getElementById("author");
  const closeBtn = document.querySelector('.close-btn');
  const quoteBox = document.querySelector('.quote-box');
  // const api_url = "https://api.quotable.io/random";
  async function getRandomQuote(){
    const response = await fetch("../resources/data/quotes.csv");
    const quotesString = await response.text();
    const quotes = quotesString
        .split("\n")
        .map((line) => {
          const [author, content] = line.split(/","/);
          return {
            author: author.replace(/"/g, ""),
            content: content.replace(/"/g, ""),
          };
        });

    return quotes[Math.floor(Math.random() * quotes.length)];
  }
  async function getQuote() {
     // const response = await fetch(url);
     // var data = await response.json();
      const data = await getRandomQuote();

      quote.innerHTML = data.content;
      author.innerHTML = data.author;
  }

  document.getElementById("new-quote").addEventListener("click", function() {
      getQuote();
  });

  closeBtn.addEventListener('click', function() {
      quoteBox.style.display = 'none';
  });

  getQuote();
});



//ADD MOVEMENT--------------------------------------------------------------------------------------
// addMovement(document.getElementsByClassName('background-config-title').item(0),document.getElementById('background-config'));
// addMovement(document.getElementsByClassName('background-config-title').item(1), document.getElementById('sound-config'));
// addMovement(document.getElementById('timer-move-area'),document.getElementById('timer-container'))
// addMovement(document.getElementsByClassName('quote-box').item(0),document.getElementsByClassName('all-quote-box').item(0));

//ADD LISTENER-------------------------------------------------------------------------------------- 
window.addEventListener('resize',function(){
  for(let autoMovingItem of document.getElementsByClassName('auto-moving')){
    
    if((autoMovingItem.offsetLeft + autoMovingItem.offsetWidth) > window.innerWidth){
      autoMovingItem.style.left = (window.innerWidth - autoMovingItem.offsetWidth)+ "px";
    }
    else if(autoMovingItem.offsetLeft < 0){
      autoMovingItem.style.left = (autoMovingItem.offsetLeft + autoMovingItem.offsetWidth) + "px";
    }

    if(autoMovingItem.offsetTop + autoMovingItem.offsetHeight > window.innerHeight){
      autoMovingItem.style.top = (window.innerHeight - autoMovingItem.offsetHeight) + "px";
    }
    else if (autoMovingItem.offsetTop < 0){
      autoMovingItem.style.top = (autoMovingItem.offsetTop + autoMovingItem.offsetHeight) + "px";
    }
  }
})

//END ADD MOVEMENT--------------------------------------------------------------------------------------
