document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const resultsDropdown = document.getElementById('search-results-dropdown');
    const searchForm = document.querySelector('.header-search-form'); // Lấy form để xử lý submit
    let fuse;
    let searchData = [];
    let latestSearchResults = []; // Biến mới để lưu kết quả cho phím Enter

    // 1. Tải tệp search.json
    fetch('/search.json')
        .then(response => response.json())
        .then(data => {
            searchData = data;
            // 2. Cấu hình Fuse.js
            const options = {
                // QUAN TRỌNG: Đảm bảo 'featured_image' đã được thêm vào search.json
                keys: ['title', 'category', 'content', 'featured_image'], 
                includeScore: true,
                threshold: 0.4,
            };
            fuse = new Fuse(searchData, options);
        })
        .catch(error => console.error('Error fetching search data:', error));

    // 3. Xử lý khi gõ (input)
    searchInput.addEventListener('input', function () {
        const query = this.value.trim();

        if (query.length < 2) {
            resultsDropdown.innerHTML = '';
            resultsDropdown.style.display = 'none';
            latestSearchResults = []; // Xóa kết quả
            return;
        }

        const results = fuse.search(query);
        latestSearchResults = results.slice(0, 5); // Lưu 5 kết quả cho phím Enter
        displayResults(latestSearchResults);
    });
    
    // --- XỬ LÝ KHI NHẤN PHÍM ENTER (YÊU CẦU CỦA BẠN) ---
    searchForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Ngăn form submit mặc định

        if (latestSearchResults.length > 0) {
            // Nếu có sản phẩm trong danh sách:
            // Tự động chuyển đến trang chi tiết của SẢN PHẨM ĐẦU TIÊN
            const firstResult = latestSearchResults[0].item;
            window.location.href = firstResult.uri; // Dùng item.uri (Permalink) từ search.json
            
        } else {
            // Nếu không có sản phẩm:
            // Chuyển đến trang tìm kiếm tổng quát (/search?q=...)
            const query = searchInput.value.trim();
            if (query.length > 0) {
                window.location.href = `/search?q=${encodeURIComponent(query)}`;
            }
        }
    });


    // 4. HIỂN THỊ KẾT QUẢ
function displayResults(results) {
    resultsDropdown.innerHTML = '';
    const currentQuery = searchInput.value.trim();

    if (results.length === 0) {
        // Hiển thị thông báo không tìm thấy
        const noResultLi = document.createElement('li');
        noResultLi.innerHTML = `<div class="no-results-text">Không tìm thấy sản phẩm nào cho "${currentQuery}".</div>`;
        
        const resultList = document.createElement('ul');
        resultList.appendChild(noResultLi);

        resultsDropdown.appendChild(resultList);
        resultsDropdown.style.display = 'block';
        return;
    }

    const resultList = document.createElement('ul');
    results.forEach(result => {
        const item = result.item;
        
        // Xử lý đường dẫn ảnh
        const imageUrl = item.featured_image ? item.featured_image : 'https://placehold.co/60x60/f0f0f0/999?text=IMG'; 
        
        // === SỬA LỖI: DÙNG TRANG CHI TIẾT (ITEM.URI) CHO CHUỘT CLICK ===
        // Khi bấm chuột, link sẽ chuyển đến trang CHI TIẾT sản phẩm (item.uri)
        const itemLink = item.uri; 

        const li = document.createElement('li');
        li.innerHTML = `
            <a href="${itemLink}" class="search-result-link">
                <div class="search-result-item">
                    
                    <div class="result-image-container">
                        <img src="${imageUrl}" alt="${item.title}" class="result-image">
                    </div>
                    
                    <div class="result-text-container">
                        <h3 class="result-title">${item.title}</h3>
                        <p class="result-category">${item.category}</p>
                    </div>

                </div>
            </a>
        `;
        resultList.appendChild(li);
    });
    
    // THÊM LINK "XEM TẤT CẢ" Ở CUỐI (Link này vẫn đi đến trang tìm kiếm chung)
    const viewAllLi = document.createElement('li');
    viewAllLi.innerHTML = `
        <a href="/search?q=${encodeURIComponent(currentQuery)}" class="search-result-link view-all-link">
            <div class="view-all-text">Xem tất cả kết quả cho "${currentQuery}"...</div>
        </a>
    `;
    resultList.appendChild(viewAllLi);


    resultsDropdown.appendChild(resultList);
    resultsDropdown.style.display = 'block';
}

// ... (phần code còn lại của search.js) ...
    // 5. Ẩn kết quả khi bấm ra ngoài
    document.addEventListener('click', function (e) {
        if (!searchInput.contains(e.target) && !resultsDropdown.contains(e.target)) {
            resultsDropdown.style.display = 'none';
        }
    });
});