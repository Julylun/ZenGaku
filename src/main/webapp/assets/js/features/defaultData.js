export {
    BackgoundConfiguration,
    SoundConfiguration,
    WELCOME_PANEL
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
    ],

    audioList: new Array()
}

const WELCOME_PANEL = {
    NOTIFICATION_TEXT:
      '<br><strong>A. MỘT SỐ TRÁCH NHIỆM VÀ ĐIỀU KHOẢN</strong><br><br><br>'
      +'<strong>&nbsp;Chào mọi người đang tham gia sử dụng Zengaku Early Access 0.1!</strong><br>'
      +'<strong>&nbsp;Trước khi sử dụng Zengaku, vui lòng đọc kĩ và đồng ý những điều sau: </strong><br><br><br>'
      +'&nbsp;&nbsp;&nbsp;&nbsp;<i>1. Một khi sử dụng các dịch vụ của Zengaku đồng nghĩa với việc bạn đã đọc hiểu các điều dưới và sẵn sàng chịu trách nhiệm với các hoạt động của mình trên Zengaku.</i><br><br>'
      +'&nbsp;&nbsp;&nbsp;&nbsp;<i>2. Zengaku là một trang mạng cung cấp các tiện ích học tập nhằm giúp mọi người học tập và làm việc một cách thuận tiện hơn. Đây là một dự án sử dụng tham gia cuộc thi Best Web Design 2024 của Trường Đại Học Công Nghệ Thông Tin Và Truyền Thông Việt Hàn. Do đó, dự án được sinh ra với mục đích giáo dục và không mang lại bất kì lợi ích kinh tế trực tiếp nào dành cho nhóm sáng lập.</i><br><br>'
      +'&nbsp;&nbsp;&nbsp;&nbsp;<i>3. Không sử dụng các phương pháp tấn công vào trang mạng, máy chủ (DDOS) nhằm gây tắc nghẽn, sập trang. Các trường hợp tấn công nhắm vào Zengaku sẽ bị chặn IP vĩnh viễn.</i><br><br>'
      +'&nbsp;&nbsp;&nbsp;&nbsp;<i>4. Không đăng các nội dung nhạy cảm, xuyên tạc, chống phá nhà nước và trái pháp luật lên Zengaku. Mọi hành động của bạn bao gồm thông tin thiết bị, địa chỉ IP... đều được lưu lại ở máy chủ của Zengaku và có thể truy xuất nhằm mục đích truy cứu trách nhiệm bất cứ lúc nào.</i><br><br>'
      +'&nbsp;&nbsp;&nbsp;&nbsp;<i>5. Để đảm bảo bảo mật thông tin cá nhân vui lòng không đặt mật khẩu trùng với mật khẩu các tài khoản cá nhân bạn đang có; Không đăng tải thông tin cá nhân nhạy cảm lên Zengaku; Không truy cập vào các đường dẫn liên kết lạ mà người dùng khác đăng tải; Không thực hiện các giao dịch mua bán với người dùng ở trên Zengaku.</i><br><br>'
      +'&nbsp;&nbsp;&nbsp;&nbsp;<i>6. Đội ngũ Fivil có thể sử dụng thông tin phía người dùng truy cập sớm sử dụng để cải tiến, nâng cấp Zengaku.</i><br><br>'
      +'&nbsp;&nbsp;&nbsp;&nbsp;<i>7. Mọi dữ liệu lưu trên Zengaku trong bản truy cập sớm chỉ là tạm thời và có thể bị xóa khi bản cập nhật tiếp theo ra mắt, vui lòng cân nhắc.</i><br><br>'
      +'<br><strong>&nbsp;Mọi thắc mắc xin gửi về địa chỉ: zengaku.app@gmail.com</strong><br><br><br>'
      +'<br><strong>B. THÔNG BÁO CẬP NHẬT</strong><br><br><br>'
      +'<br><strong>&nbsp;[Cập nhật sắp tới]: Zengaku Early Access 0.2 với các tính năng mới:</strong><br><br><br>'
      +'&nbsp;&nbsp;&nbsp;&nbsp;<i>1. Tùy chỉnh thời gian cho Đồng hồ đếm ngược</i><br>'
      +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>Cá nhân hóa thời gian học tập bằng cách tùy chỉnh tùy ý thời gian học tập và nghỉ ngơi của đồng hồ đếm ngược.</i><br><br>'
      +'&nbsp;&nbsp;&nbsp;&nbsp;<i>2. Trò chuyện</i><br>'
      +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>Sử dụng tài khoản mạng xã hội Zengaku của bạn để trò chuyện với bạn bè, còn gì thích hơn nhỉ?</i><br><br>'
      +'&nbsp;&nbsp;&nbsp;&nbsp;<i>3. Hội thảo</i><br>'
      +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>Gặp gỡ và nhìn mặt bạn bè sau những tháng ngày xa cách, ý tớ là nghỉ hè.</i><br><br>'
      +'&nbsp;&nbsp;&nbsp;&nbsp;<i>4. Xếp hạng học tập</i><br>'
      +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>Xếp thứ hạng dựa trên thời gian học tập của bạn. Nhận huy hiệu và sẵn sàng flex với mọi người!</i><br><br>'
      +'&nbsp;&nbsp;&nbsp;&nbsp;<i>4. Tích điểm trồng cây</i><br>'
      +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>Doanh thu đến từ quảng cáo sẽ được sử dụng để kêu gọi trồng cây. Nhưng trước hết, bạn phải tích điểm mới có thể kêu gọi được nhé!</i><br><br>'

      
}