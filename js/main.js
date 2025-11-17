// Chờ cho đến khi trang web tải xong
document.addEventListener("DOMContentLoaded", function() {
    
    const addToCartBtn = document.getElementById("add-to-cart-btn");

    // --- XỬ LÝ SIZE (Giữ nguyên) ---
    const sizeWrapper = document.getElementById("size-options-wrapper");
    if (sizeWrapper) {
        const sizeBoxes = sizeWrapper.querySelectorAll("[data-size]");
        
        function updateSelectedSize(clickedBox) {
            sizeBoxes.forEach(box => box.classList.remove("active"));
            clickedBox.classList.add("active");
            const currentSelectedSize = clickedBox.getAttribute("data-size");
            if (addToCartBtn) {
                addToCartBtn.setAttribute("data-item-custom1-value", currentSelectedSize);
            }
        }

        sizeBoxes.forEach(box => {
            box.addEventListener("click", function() {
                updateSelectedSize(box);
            });
        });

        if (sizeBoxes.length > 0) {
            updateSelectedSize(sizeBoxes[0]);
        }
    }
    
    // --- XỬ LÝ MÀU (Giữ nguyên) ---
    const colorWrapper = document.getElementById("color-options-wrapper");
    if (colorWrapper) {
        const colorSwatches = colorWrapper.querySelectorAll(".color-swatch");

        function updateSelectedColor(clickedSwatch) {
            colorSwatches.forEach(swatch => swatch.classList.remove("active"));
            clickedSwatch.classList.add("active");
            const currentSelectedColor = clickedSwatch.getAttribute("data-color-name");
            if (addToCartBtn) {
                addToCartBtn.setAttribute("data-item-custom2-value", currentSelectedColor);
            }
        }

        colorSwatches.forEach(swatch => {
            swatch.addEventListener("click", function() {
                updateSelectedColor(swatch);
            });
        });

        if (colorSwatches.length > 0) {
            updateSelectedColor(colorSwatches[0]);
        }
    }

    // --- XỬ LÝ GIỚI TÍNH (MỚI) ---
    const genderWrapper = document.getElementById("gender-options-wrapper");
    if (genderWrapper) {
        // Tìm các ô .gender-box BÊN TRONG gender-options-wrapper
        const genderBoxes = genderWrapper.querySelectorAll(".gender-box");
        
        function updateSelectedGender(clickedBox) {
            // Chỉ bỏ active các ô gender
            genderBoxes.forEach(box => box.classList.remove("active"));
            clickedBox.classList.add("active");
            const currentSelectedGender = clickedBox.getAttribute("data-gender");
            
            // Gán vào custom field SỐ 3
            if (addToCartBtn) {
                addToCartBtn.setAttribute("data-item-custom3-value", currentSelectedGender);
            }
        }

        genderBoxes.forEach(box => {
            box.addEventListener("click", function() {
                updateSelectedGender(box);
            });
        });

        if (genderBoxes.length > 0) {
            updateSelectedGender(genderBoxes[0]);
        }
    }
});
// ======== CODE MỚI CHO FAQ ACCORDION ========
document.addEventListener("DOMContentLoaded", function() {
    
    // Tìm tất cả các nút câu hỏi
    const faqQuestions = document.querySelectorAll(".faq-question");

    if (faqQuestions.length > 0) {
        
        faqQuestions.forEach(button => {
            button.addEventListener("click", function() {
                // 1. Lấy khung câu trả lời (là thẻ <div> ngay sau nút <button>)
                const answerPanel = this.nextElementSibling;

                // 2. Thêm/Xóa class "active" (để xoay icon +/-)
                this.classList.toggle("active");

                // 3. Xử lý hiệu ứng trượt (slide)
                if (answerPanel.style.maxHeight) {
                    // Nếu đang mở, đóng nó lại
                    answerPanel.style.maxHeight = null;
                } else {
                    // Nếu đang đóng, mở nó ra
                    // (scrollHeight là chiều cao thật của nội dung)
                    answerPanel.style.maxHeight = answerPanel.scrollHeight + "px";
                } 
            });
        });
    }
});