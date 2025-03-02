document.addEventListener('DOMContentLoaded', function () {
    

    // открытие модального окна
    function showNextSlide() {
        carouselItems[currentIndex].classList.remove('active'); // Скрываем текущий слайд
        currentIndex = (currentIndex + 1) % carouselItems.length; // Переход к следующему слайду
        carouselItems[currentIndex].classList.add('active'); // Показываем новый слайд
    }

   

    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const filterCheckboxes = document.querySelectorAll('.filters input[type="checkbox"]');

    function filterProducts() {
        const searchText = searchInput.value.toLowerCase();
        
        // Получаем выбранные значения фильтров
        const selectedPatterns = Array.from(document.querySelectorAll('input[name="filter"][value="Рисунок"]:checked'))
            .map(checkbox => checkbox.nextElementSibling.textContent.trim());
        
        const selectedColors = Array.from(document.querySelectorAll('input[name="filter"][value="Цвет"]:checked'))
            .map(checkbox => checkbox.nextElementSibling.textContent.trim());
            
        const selectedSizes = Array.from(document.querySelectorAll('input[name="filter"][value="Размер"]:checked'))
            .map(checkbox => checkbox.nextElementSibling.textContent.trim());

           

        document.querySelectorAll('.product-card').forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const pattern = card.dataset.pattern;
            const color = card.dataset.color;
            const size = card.dataset.size;
           

            const matchesSearch = title.includes(searchText);
            const matchesPattern = selectedPatterns.length === 0 || selectedPatterns.includes(pattern);
            const matchesColor = selectedColors.length === 0 || selectedColors.includes(color);
            const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(size);
            


            if (matchesSearch && matchesPattern && matchesColor && matchesSize) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Обработчики событий
    searchButton.addEventListener('click', filterProducts);
    searchInput.addEventListener('input', filterProducts);
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    // Инициализация фильтров
    filterProducts();

   // Обработчик клика по карточке
   document.querySelectorAll('.product-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function() {
        const modal = document.getElementById('product-modal');
        
        // Заполняем данные
        document.getElementById('modal-image').src = this.querySelector('img').src;
        document.getElementById('modal-title').textContent = this.querySelector('h3').textContent;
        document.getElementById('modal-category').textContent = this.dataset.category;
        document.getElementById('modal-subcategory').textContent = this.dataset.subcategory;
        document.getElementById('modal-size').textContent = this.dataset.size;
        document.getElementById('modal-price').textContent = this.dataset.price;
        document.getElementById('modal-description').textContent = this.dataset.description;

        modal.style.display = 'block';
    });
});

// Закрытие модального окна
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('product-modal').style.display = 'none';
});

window.addEventListener('click', function(e) {
    if (e.target === document.getElementById('product-modal')) {
        document.getElementById('product-modal').style.display = 'none';
    }
});

    // Закрытие модального окна
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});