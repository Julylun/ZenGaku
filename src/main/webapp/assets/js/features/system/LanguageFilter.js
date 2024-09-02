let badWords;

async function loadCsv() {
    try {
        const response = await fetch('assets/resources/data/badwords.csv'); // Đảm bảo đường dẫn đúng
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const text = await response.text();
        return parseCsv(text);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return [];
    }
}

// Hàm để phân tách nội dung CSV thành mảng
function parseCsv(text) {
    // Xóa khoảng trắng thừa và phân tách các dòng dựa trên dấu phân cách (dấu phẩy)
    const lines = text
        .trim()
        .split(/\r?\n/) // Phân tách chuỗi dựa trên dấu xuống dòng
        .map(line => line.trim()); // Xóa khoảng trắng thừa ở đầu và cuối của mỗi dòng
    return lines;
}

// Hàm để kiểm tra và thay thế các từ tục tĩu
async function filterBadWords(input) {
    badWords = await loadCsv();
    if (!Array.isArray(badWords)) {
        console.error('Bad words list is not an array');
        return input; // Trả về chuỗi gốc nếu danh sách từ tục tĩu không hợp lệ
    }
    let filteredInput = input;
    badWords.forEach(word => {
        // Tạo một biểu thức chính quy để tìm từ tục tĩu
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        // Thay thế từ tục tĩu bằng dấu hoa thị
        filteredInput = filteredInput.replace(regex, '****');
    });
    return filteredInput;
}

(async function() {
    const userInput = 'abcdef con cặc cái lồn';
    const filteredOutput = await filterBadWords(userInput);
    console.log(filteredOutput); // Output: "abcdef **** cái ****"
})();