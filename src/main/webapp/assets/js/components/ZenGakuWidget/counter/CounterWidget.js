import * as HTMLDom from '../../HTMLDom.js'
import * as Gemini from '../../../features/ZenGakuWidget/GeminiAI.js'
import * as WebCrawler from './WebCrawler.js'
import * as YoutubeCore from '../../../features/ZenGakuWidget/counter/YoutubeCore.js'
export {
    displayRelaxMusicMenu
}

function extractBracketsContent(input) {
    const regex = /\[[^\]]*\]/g;
    const matches = input.match(regex);
    return matches;
}

const displayRelaxMusicMenu = async () => {
    YoutubeCore.setup();
    let emotionString = prompt('Nhập tâm trạng của bạn: ');
    console.log(emotionString);
    const findingText = "Hãy tìm tên ba mươi bài hát với các thuộc tính sau: {" + emotionString + "} ngẫu nhiên bằng cách random chữ đầu của bài hát từ Z đến A và sử dụng giây của thời gian hiện tại làm seed và cho ra tên chính xác xuất hiện trên youtube, sắp xếp thứ tự bài ngẫu nhiên theo số giây của thời gian hiện tại rồi gửi lại tôi 10 bài dưới dạng JSON mà không có bất kì từ khóa nào dư thừa.";
    let songNameList = JSON.parse(extractBracketsContent(await Gemini.reply(findingText)));
    console.log(songNameList);
    for(let index = 0; index < songNameList.length; index+= 1) {
        console.log(songNameList[index]);   
    }
    YoutubeCore.playMusic(
        await YoutubeCore.getSongIdFromName(songNameList[0])
    )
    // WebCrawler.crawl('https://cors-anywhere.herokuapp.com/' + 'https://www.youtube.com/');
}