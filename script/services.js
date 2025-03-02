document.addEventListener('DOMContentLoaded', function() {
    const filterCheckboxes = document.querySelectorAll('.filters-section input[type="checkbox"]');
    
    // Объект для активных фильтров
    let activeFilters = {
        type: [],
        complexity: [],
        price: []
    };

    // Функция обновления фильтров
    function updateFilters() {
        // Сбрасываем фильтры
        activeFilters = {
            type: [],
            complexity: [],
            price: []
        };

        // Собираем активные фильтры
        filterCheckboxes.forEach(checkbox => {
            if(checkbox.checked) {
                const category = checkbox.name;
                const value = checkbox.value;
                activeFilters[category].push(value);
            }
        });

        applyFilters();
    }

    // Функция применения фильтров
    function applyFilters() {
        document.querySelectorAll('.service-card').forEach(card => {
            const matchesType = activeFilters.type.length === 0 || 
                activeFilters.type.includes(card.dataset.type);
                
            const matchesComplexity = activeFilters.complexity.length === 0 || 
                activeFilters.complexity.includes(card.dataset.complexity);
                
            const matchesPrice = activeFilters.price.length === 0 || 
                activeFilters.price.includes(card.dataset.price);

            if(matchesType && matchesComplexity && matchesPrice) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    // Обработчики событий
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateFilters);
    });

    // Инициализация
    applyFilters();
});