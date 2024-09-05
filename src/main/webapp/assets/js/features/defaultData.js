/**
 * DefaultData contains constaint and value of default user 
 * (guest) and this will be changed when user login to their account
 */

export {
    BackgoundConfiguration,
    SoundConfiguration,
    WELCOME_PANEL,
    userData,
    load,
    backgroundConfigurationLoad,
    soundConfigurationLoad,
    CounterData
}

class Time {
    constructor(hour, minute, second, breakTime, repeatNumber){
      this.hour = hour;
      this.minute = minute;
      this.second = second;
      this.breakTime = breakTime;
      this.repeatNumber = repeatNumber;
    }
  };

/**
 * This constaint contains data of background configuration
 */
const BackgoundConfiguration = {
    name: [],
    url: [],
    setBackground: '',
    currentBackground: '',
    isVideoSelecting: false,
    defaultURL: '?autoplay=1&mute=1&controls=0&start=26&origin=https%3A%2F%2Flifeat.io&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=3&fs=0&amp'
}

const SoundConfiguration = {
    name: [],
    icon: [],
    sound: [],
    audioList: new Array()
}

const WELCOME_PANEL = {
    NOTIFICATION_TEXT:
      '<br><strong>A. MỘT SỐ TRÁCH NHIỆM VÀ ĐIỀU KHOẢN</strong><br><br><br>'
      +'<strong>&nbsp;Chào mọi người đang tham gia sử dụng Zengaku Early Access 0.2!</strong><br><br>'
      + '&nbsp;Hiện tại Zengaku đang trong quá trình cập nhật phân đoạn nên một vài chức năng sẽ không chạy đúng. Chức năng Hội thảo có thể sẽ không xuất hiện vì lý do chứng chỉ và cổng giao thức.<br><br>'
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

let userData;
class CounterData {
    static position = class {
        static x = 0;
        static y = 0;
    }
    static pomodoro = class {
        static hour = 0;
        static minute = 25;
        static second = 0;
        static breakTime = 5;
        static repeat = 5;
    }
    static shortBreak = class {
        static hour = 0;
        static minute = 25;
        static second = 0;
        static breakTime = 10;
        static repeat = 5;
    }
    static longBreak = class {
        static hour = 0;
        static minute = 30;
        static second = 0;
        static breakTime = 0;
        static repeat = 3;
    }
    static isMuted = false;
    static alarmVolume = 100;
    
    //method
    static setPomodoro(hour,minute,second,breakTime,repeat) {CounterData.pomodoro.hour = hour;CounterData.pomodoro.minute = minute;CounterData.pomodoro.second = second;CounterData.pomodoro.breakTime = breakTime;CounterData.pomodoro.repeat = repeat;}
    static setShortBreak(hour,minute,second,breakTime,repeat) {CounterData.shortBreak.hour = hour;CounterData.shortBreak.minute = minute;CounterData.shortBreak.second = second;CounterData.shortBreak.breakTime = breakTime;CounterData.shortBreak.repeat = repeat;}
    static setLongBreak(hour,minute,second,breakTime,repeat) {CounterData.longBreak.hour = hour;CounterData.longBreak.minute = minute;CounterData.longBreak.second = second;CounterData.longBreak.breakTime = breakTime;CounterData.longBreak.repeat = repeat;}
    static setPosition(x,y) {CounterData.position.x = x; CounterData.position.y = y;}
    static getTime(typeOfTime) {
        return new Time(typeOfTime.hour,typeOfTime.minute,typeOfTime.second,typeOfTime.breakTime,typeOfTime.repeat);
    }
}

/**
 * 
 * @param {JSON} userData 
 */
const load = (userData) => {
    //set current background
    // BackgoundConfiguration.currentBackground = userData.backgroundUrl;

    //couuter load
    CounterData.setPosition(
        userData.counter.position.x,
        userData.counter.position.y
    );
    CounterData.setPomodoro(
        userData.counter.setting.countingTime.pomodoro.hour,
        userData.counter.setting.countingTime.pomodoro.minute,
        userData.counter.setting.countingTime.pomodoro.second,
        userData.counter.setting.countingTime.pomodoro.breakTime,
        userData.counter.setting.countingTime.pomodoro.repeat
    )
    CounterData.setShortBreak(
        userData.counter.setting.countingTime.shortBreak.hour,
        userData.counter.setting.countingTime.shortBreak.minute,
        userData.counter.setting.countingTime.shortBreak.second,
        userData.counter.setting.countingTime.shortBreak.breakTime,
        userData.counter.setting.countingTime.shortBreak.repeat
    )
    CounterData.setLongBreak(
        userData.counter.setting.countingTime.longBreak.hour,
        userData.counter.setting.countingTime.longBreak.minute,
        userData.counter.setting.countingTime.longBreak.second,
        userData.counter.setting.countingTime.longBreak.breakTime,
        userData.counter.setting.countingTime.longBreak.repeat
    )
    CounterData.isMuted = userData.counter.setting.isMuted;
    CounterData.alarmVolume = userData.counter.setting.alarmVolume;

    //background configuration load
    backgroundConfigurationLoad(userData);
    //sound configuration load
    soundConfigurationLoad(userData);

    console.log("[defaultData - load]: data is loaded")


}

const backgroundConfigurationLoad = (userData) => {
    BackgoundConfiguration.name = userData.backgroundConfiguration.data.name;
    BackgoundConfiguration.url = userData.backgroundConfiguration.data.url;
    BackgoundConfiguration.setBackground = userData.backgroundConfiguration.data.currentBackground;
}
const soundConfigurationLoad = (userData) => {
    SoundConfiguration.name = userData.soundConfiguration.data.name;
    SoundConfiguration.icon = userData.soundConfiguration.data.iconUrl;
    SoundConfiguration.sound = userData.soundConfiguration.data.soundUrl;
}
