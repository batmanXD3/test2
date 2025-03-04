document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('h3').innerText;
        const imgSrc = this.querySelector('img').src;
        const pattern = this.dataset.pattern;
        const color = this.dataset.color;
        const size = this.dataset.size;
        const description = this.dataset.description; // Новый атрибут
        const price = this.dataset.price; // Новый атрибут

        // Заполнение модального окна
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-image').src = imgSrc;
        document.getElementById('modal-size').innerText = `Размер: ${size}`;
        document.getElementById('modal-description').innerText = description;
        document.getElementById('modal-price').innerText = `Цена: от ${price} руб/м²`;
        
        // Открытие модального окна
        document.getElementById('product-modal').style.display = 'block';
    });
});