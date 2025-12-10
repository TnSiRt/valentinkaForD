// ---------- Падающие сердца ----------
const heartsContainer = document.getElementById('hearts-container');
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '❤️';
    const size = 12 + Math.random() * 28;
    heart.style.fontSize = size + 'px';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.animationDuration = 4 + Math.random() * 3 + 's';
    heartsContainer.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 7000);
}
setInterval(createHeart, 200);

// ---------- Переходы между секциями ----------
const startBtn = document.getElementById('startBtn');
const section1 = document.getElementById('section1');
const section2 = document.getElementById('section2');
const section3 = document.getElementById('section3');
const nextBtn = section2.querySelector('.nextBtn');

nextBtn.textContent = '→';
nextBtn.style.position = 'absolute';
nextBtn.style.bottom = '20px';
nextBtn.style.right = '20px';
nextBtn.style.fontSize = '28px';
nextBtn.style.padding = '12px 16px';
nextBtn.style.borderRadius = '50%';
nextBtn.style.border = '2px solid #ff4d6d';
nextBtn.style.background = 'none';
nextBtn.style.color = '#ff4d6d';

startBtn.addEventListener('click', () => {
    section1.classList.add('slide-left');
    section2.classList.remove('hidden');
    animatePhotoCards();
});

nextBtn.addEventListener('click', () => {
    section2.classList.add('fade-out');
    setTimeout(() => {
        section2.classList.add('hidden');
        section2.classList.remove('fade-out');
        section3.classList.remove('hidden');
        section3.classList.add('fade-in');

        startCollageSlider(); // запускаем слайдер
        showRestartButton();
    }, 800);
});

// ---------- Второй слайд ----------
const photoContainer1 = document.createElement('div');
photoContainer1.classList.add('photo-card');
photoContainer1.innerHTML = `<img style="height:300px;" src='/static/image/photoA.jpg' alt='Фото A' /><p style="width:300px;">Наши чувства сильнее любого растояния</p>`;
photoContainer1.style.position = 'absolute';
photoContainer1.style.top = '100px';
photoContainer1.style.left = '-650px';
photoContainer1.style.transition = 'all 1s ease';

const photoContainer2 = document.createElement('div');
photoContainer2.classList.add('photo-card');
photoContainer2.innerHTML = `<img style="height:300px; margin-right:30px;" src='/static/image/photoB.jpg' alt='Фото B' /><img style="height:300px;" src='/static/image/photoBA.jpg' alt='Фото C' /><p style="width:300px;">За это время у нас появились определенные ассациации</p>`;
photoContainer2.style.position = 'absolute';
photoContainer2.style.bottom = '100px';
photoContainer2.style.right = '-850px';
photoContainer2.style.transition = 'all 1s ease';

section2.appendChild(photoContainer1);
section2.appendChild(photoContainer2);

function animatePhotoCards() {
    setTimeout(() => { photoContainer1.style.left = '20px'; }, 300);
    setTimeout(() => { photoContainer2.style.right = '20px'; }, 800);
}

// ---------- Третий слайд: слайдер фоток ----------
const collagePhotos = [
    '/static/image/photo1.jpg',
    '/static/image/photo2.jpg',
    '/static/image/photo3.jpg',
    '/static/image/photo4.jpg',
    '/static/image/photo5.jpg',
    '/static/image/photo6.jpg',
    '/static/image/photo7.jpg',
    '/static/image/photo8.jpg',
    '/static/image/photo9.jpg',
    '/static/image/photo10.jpg',
    '/static/image/photo11.jpg',
    '/static/image/photo12.jpg',
    '/static/image/photo13.jpg',
];

let currentIndex = 0;

function showNextPhoto() {
    section3.querySelectorAll('.collage-photo').forEach(el => el.remove());

    const img = document.createElement('img');
    img.src = collagePhotos[currentIndex];
    img.classList.add('collage-photo');
    img.style.top = '-100%';
    img.style.opacity = '0';
    section3.appendChild(img);

    setTimeout(() => {
        img.style.top = '20%';
        img.style.opacity = '1';
    }, 50);

    currentIndex = (currentIndex + 1) % collagePhotos.length;
    setTimeout(showNextPhoto, 3000);
}

function startCollageSlider() {
    showNextPhoto();
}

// ---------- Кнопка перезапуска ----------
function showRestartButton() {
    const restartBtn = document.createElement('button');
    restartBtn.textContent = '↻';
    restartBtn.style.position = 'absolute';
    restartBtn.style.bottom = '20px';
    restartBtn.style.right = '20px';
    restartBtn.style.fontSize = '28px';
    restartBtn.style.padding = '12px 16px';
    restartBtn.style.borderRadius = '50%';
    restartBtn.style.border = '2px solid #ff4d6d';
    restartBtn.style.background = 'none';
    restartBtn.style.color = '#ff4d6d';
    restartBtn.addEventListener('click', () => {
        section3.classList.add('hidden');
        section3.classList.remove('fade-in');
        section1.classList.remove('slide-left');
        section1.classList.add('active');
        section2.classList.add('hidden');
        photoContainer1.style.left = '-350px';
        photoContainer2.style.right = '-350px';
        section3.querySelectorAll('.collage-photo').forEach(el => el.remove());
        restartBtn.remove();
    });
    section3.appendChild(restartBtn);
}
