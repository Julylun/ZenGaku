import * as HTMLDom from '../../HTMLDom.js'
import * as Gemini from '../../../features/ZenGakuWidget/GeminiAI.js'
import * as WebCrawler from './WebCrawler.js'
export {
    displayRelaxMusicMenu
}

function extractBracketsContent(input) {
    const regex = /\[[^\]]*\]/g;
    const matches = input.match(regex);
    return matches;
}

const displayRelaxMusicMenu = async () => {
    let emotionString = prompt('Nhập tâm trạng của bạn: ');
    console.log(emotionString);
    const findingText = "Hãy tìm tên mười bài hát " + emotionString + " ngẫu nhiên rồi gửi tôi dưới dạng JSON mà không có bất kì từ khóa nào dư thừa";
    let songNameList = JSON.parse(extractBracketsContent(await Gemini.reply(findingText)));
    for(let index = 0; index < songNameList.length; index+= 1) {
        console.log(songNameList[index]);   
    }
    WebCrawler.crawl('https://cors-anywhere.herokuapp.com/' + 'https://www.youtube.com/');
}