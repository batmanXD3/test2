// Анимация появления карточек
const cards = document.querySelectorAll('.project-card');
cards.forEach((card, index) => {
    setTimeout(() => {
        card.style.opacity = 1;
        card.style.transform = 'translateY(0)';
    }, 200 * index);
});

// // Открытие модального окна
// document.querySelectorAll('.project-card').forEach(card => {
//     card.addEventListener('click', () => {
//         const modal = document.getElementById('project-modal');
//         modal.style.display = 'block';
//     });
// });

// Закрытие модального окна
window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('project-modal')) {
        document.getElementById('project-modal').style.display = 'none';
    }
});