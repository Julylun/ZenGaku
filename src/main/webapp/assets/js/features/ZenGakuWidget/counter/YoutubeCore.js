export {
    getSongIdFromName,
    playMusic,
    setup
}

const getSongIdFromName = async (_name) => {
    const key = 'AIzaSyAsgv6ZGXMv6urElvkA4fILzhK1ZanK8KY';
    let response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=bài hát${_name}&type=video&key=${key}`)
    console.log('>>> ' + _name);
    return (!response) ? null : await (await response.json()).items[0].id.videoId;    
}

// Hàm để tải script YouTube IFrame API
function loadYouTubeIframeAPI(callback) {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    tag.onload = callback;
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Khởi tạo các biến player
let youtubePlayer;

// Hàm này sẽ được gọi khi API sẵn sàng
function onYouTubeIframeAPIReady() {
    youtubePlayer = new YT.Player('youtubePlayer', {
        height: '0',
        width: '0',
        videoId: '', // Bắt đầu không có video
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
    console.log(youtubePlayer)
}

// Hàm này sẽ được gọi khi trình phát sẵn sàng
function onPlayerReady(event) {
    // Bạn có thể bắt đầu phát video tại đây nếu cần
    event.target.playVideo();
}

// Hàm này sẽ được gọi khi trạng thái của trình phát thay đổi
function onPlayerStateChange(event) {
    // Bạn có thể xử lý các trạng thái khác nhau tại đây nếu cần
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
      }
}
function stopVideo() {
    player.stopVideo();
  }
// Hàm này sẽ được gọi khi nhấn nút "Play Music"
function playMusic(videoId) {
    
    youtubePlayer.g.src = 'https://www.youtube.com/embed/'+ videoId + '?autoplay=1&';
    //frameborder="0"&controls=0&disablekb=1&fs=0
    
    console.log(youtubePlayer)
    // youtubePlayer.loadVideoById(videoId)
    
}

// Tải YouTube IFrame API và khởi tạo các trình phát
function setup() {
    loadYouTubeIframeAPI(onYouTubeIframeAPIReady);
}
