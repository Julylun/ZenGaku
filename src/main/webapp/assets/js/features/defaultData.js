export {
    BackgoundConfiguration,
    SoundConfiguration
}

const BackgoundConfiguration = {
    name: [
        '🗻 Mountain and lake',
        '🌗 Moon and Sun',
        '🌃 The sky night',
        '🤵 Danger person',
        '🚓 Old car',
        '🌉 The bridge',
        '🌿 Leaves',
        '🌻 Flowers',
        '🧑‍🤝‍🧑 Study with BTS',
        '☕ Study in coffee shop',
        '🚶‍♀️ Night Walk in Tokyo Shibuya',
        '🚶‍♀️ Snowfall in Times Square, NYC',
        '🚶‍♀️ FLYING OVER JAPAN',
        '🪟 DOWNTOWN LOS ANGELES City View day '
    ],
    
    url: [
        'https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?cs=srgb&dl=pexels-francesco-ungaro-1525041.jpg&fm=jpg',
        'https://asset.gecdesigns.com/img/wallpapers/beautiful-fantasy-wallpaper-ultra-hd-wallpaper-4k-sr10012418-1706506236698-cover.webp',
        'https://pbs.twimg.com/media/Fxto7UTXgAEtKVC.jpg:large',
        'https://images.pexels.com/photos/3791466/pexels-photo-3791466.jpeg',
        'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://www.youtube.com/embed/UZ9uyQI3pF0',
        'https://www.youtube.com/embed/SVDooWT60Ho',
        'https://www.youtube.com/embed/2XK0zoPWdi4',
        'https://www.youtube.com/embed/0nTO4zSEpOs',
        'https://www.youtube.com/embed/F8MN0o6RS9o',
        'https://www.youtube.com/embed/AY5qcIq5u2g',
        'https://www.youtube.com/embed/M9cJMXmQ_ZU'
    ],

    currentBackground: '',
    isVideoSelecting: false,
    defaultURL: '?autoplay=1&mute=1&controls=0&start=26&origin=https%3A%2F%2Flifeat.io&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=3&fs=0&amp'
}

const SoundConfiguration = {
    name: [
        'Chill wind',
        'Cold wind',
        'Ocean wave',
        'Ocean wave 2',
        'Office sound',
        'Pretty Real Office sound',
        'Keyboard type',
        'Campfire',
        'Item name 2',
    ],

    icon: [
        'assets/resources/img/defaultAudioImg/wind.svg',
        'assets/resources/img/defaultAudioImg/wind.svg',
        'assets/resources/img/defaultAudioImg/oceanwave.svg',
        'assets/resources/img/defaultAudioImg/oceanwave.svg',
        'assets/resources/img/defaultAudioImg/office.svg',
        'assets/resources/img/defaultAudioImg/office.svg',
        'assets/resources/img/defaultAudioImg/keyboard.svg',
        'assets/resources/img/defaultAudioImg/campfire.svg',
        '#',
    ],

    sound: [
        'assets/resources/audio/ChillWind.mp3',
        'assets/resources/audio/ColdWind.mp3',
        'assets/resources/audio/OceanWave.mp3',
        'assets/resources/audio/OceanWave2.mp3',
        'assets/resources/audio/OfficeSound.mp3',
        'assets/resources/audio/3DOfficeSound.mp3',
        'assets/resources/audio/KeyboardType.mp3',
        'assets/resources/audio/Campfire.mp3',
        'assets/resources/audio/OfficeSound.mp3',
    ],

    audioList: new Array()
}