document.addEventListener('DOMContentLoaded', function () {


    // открытие модального окна
    function showNextSlide() {
        carouselItems[currentIndex].classList.remove('active'); // Скрываем текущий слайд
        currentIndex = (currentIndex + 1) % carouselItems.length; // Переход к следующему слайду
        carouselItems[currentIndex].classList.add('active'); // Показываем новый слайд
    }



    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const productCards = document.querySelectorAll('.product-card');
    const filterCheckboxes = document.querySelectorAll('.filters input[type="checkbox"]');

    function filterProducts() {
        const searchText = searchInput.value.toLowerCase();

        productCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const pattern = card.getAttribute('data-pattern');
            const color = card.getAttribute('data-color');
            const size = card.getAttribute('data-size');

            // Проверяем активные фильтры
            const selectedPatterns = Array.from(document.querySelectorAll('input[name="filter"][value="Кирпич"]:checked, input[name="filter"][value="Ромб"]:checked, input[name="filter"][value="Волна"]:checked, input[name="filter"][value="Клевер"]:checked'))
                
                .map(cb => cb.value);

            const selectedColors = Array.from(document.querySelectorAll('input[name="filter"][value^="Серый"]:checked, input[name="filter"][value="Красный"]:checked, input[name="filter"][value="Коричневый"]:checked, input[name="filter"][value="Черный"]:checked'))
                .map(cb => cb.value);

            const selectedSizes = Array.from(document.querySelectorAll('input[name="filter"][value^="300x300"]:checked, input[name="filter"][value="400×400"]:checked, input[name="filter"][value=" 500×500"]:checked, input[name="filter"][value="600×600"]:checked'))
                .map(cb => cb.value);

            const matchPattern = selectedPatterns.length === 0 || selectedPatterns.includes(pattern);
            const matchColor = selectedColors.length === 0 || selectedColors.includes(color);
            const matchSize = selectedSizes.length === 0 || selectedSizes.includes(size);
            const matchSearch = title.includes(searchText);

            if (matchPattern && matchColor && matchSize && matchSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchButton.addEventListener('click', filterProducts);
    filterCheckboxes.forEach(checkbox => checkbox.addEventListener('change', filterProducts));


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
        card.addEventListener('click', function () {
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

    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').innerText;
            const imgSrc = this.querySelector('img').src;
            const pattern = this.dataset.pattern;
            const color = this.dataset.color;
            const size = this.dataset.size;
            const description = this.dataset.description; // Новый атрибут
            // const price = this.dataset.price; // Новый атрибут
    
            // Заполнение модального окна
            document.getElementById('modal-title').innerText = title;
            document.getElementById('modal-image').src = imgSrc;
            document.getElementById('modal-size').innerText = ` ${size}`;
            document.getElementById('modal-description').innerText = description;
            document.getElementById('modal-pattern').innerText = `  ${pattern} `;
            document.getElementById('modal-color').innerText = `  ${color} `;

            
            // Открытие модального окна
            document.getElementById('product-modal').style.display = 'block';
        });
    });

    // Закрытие модального окна
    document.querySelector('.close').addEventListener('click', function () {
        document.getElementById('product-modal').style.display = 'none';
    });

    window.addEventListener('click', function (e) {
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