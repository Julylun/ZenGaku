package com.zengaku.mvc.model.HTTP;

/**
 * ErrorCode là class chứa các mã lỗi thường gặp trong HTTP (HTTP STATUS).
 * 1xx: Mã lỗi phản hồi thông tin. 2xx: Mã lỗi phản hồi thành công. 3xx: Mã lỗi điều hướng.
 * 4xx: Lỗi từ phía máy khác. 5xx: Lỗi từ phía máy chủ
 *
 */
public class ErrorCode {

    //2xx
    /**
     * OKAY (200) là mã lỗi thông báo rằng yêu cầu của phía khách hàng đã được chấp thuận và thực hiện.
     */
    public static final int OKAY = 200;

    //4xx
    /**
     * BAD REQUEST (400) mã lỗi thông báo rằng máy chủ không hiểu được cú pháp của khách hàng (lỗi không hợp lệ)
     */
    public static final int BAD_REQUEST = 400;

    /**
     * UNAUTHORIZED (401) mã lỗi thông báo rằng khách hàng chưa được xác thực hoặc không có quyền yêu cầu
     * chức năng nhất định.
     */
    public static final int UNAUTHORIZED = 401;

    /**
     * NOT FOUND (404) mã lỗi thông báo rằng yêu cầu đến chủ thể không tồn tại.
     */
    public static final int NOT_FOUND = 404;

    /**
     * NOT ACCEPTABLE (406): Không đồng ý yêu cầu của khách.
     */
    public static final int NOT_ACCEPTABLE = 406;

    /**
     * UNSUPPORTED MEDIA TYPE (415): Khách hàng tải lên một file không hỗ trợ.
     */
    public static final int UNSUPPORTED_MEDIA_TYPE = 415;

    //5xx
    /**
     * INTERNAL SERVER ERROR (500): Máy chủ lỗi.
     */
    public static final int INTERNAL_SERVER_ERROR = 500;

    /**
     * SERVICE UNAVAILABLE (503): Dịch vụ không khả dụng.
     */
    public static final int SERVICE_UNAVAILABLE = 500;

}
