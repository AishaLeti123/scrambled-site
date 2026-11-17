// === КУБИК РУБИКА - ЛОГИКА ===

const cube = document.querySelector('.rubik-cube');
const shuffleBtn = document.querySelector('.rubik-btn:first-child');
const resetBtn = document.querySelector('.rubik-btn:last-child');

// Цвета граней
const faceColors = {
    front: '#ff6b35',   // Оранжевый
    back: '#e63946',    // Красный
    right: '#00b4d8',   // Синий
    left: '#ffd166',    // Жёлтый
    top: '#06d6a0',     // Зелёный
    bottom: '#ffffff'   // Белый
};

// Исходное состояние кубика
const originalState = {
    front: Array(9).fill(faceColors.front),
    back: Array(9).fill(faceColors.back),
    right: Array(9).fill(faceColors.right),
    left: Array(9).fill(faceColors.left),
    top: Array(9).fill(faceColors.top),
    bottom: Array(9).fill(faceColors.bottom)
};

// Текущее состояние
let currentState = JSON.parse(JSON.stringify(originalState));

// Инициализация кубика
function initCube() {
    const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    
    faces.forEach(faceName => {
        const face = document.querySelector(`.face-${faceName}`);
        if (!face) return;
        
        face.innerHTML = '';
        
        for (let i = 0; i < 9; i++) {
            const sticker = document.createElement('div');
            sticker.className = 'sticker';
            sticker.style.background = currentState[faceName][i];
            sticker.dataset.face = faceName;
            sticker.dataset.index = i;
            face.appendChild(sticker);
        }
    });
}

// Перемешать кубик
function shuffleCube() {
    const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    const allColors = Object.values(faceColors);
    
    // Случайно меняем цвета на каждой грани
    faces.forEach(faceName => {
        for (let i = 0; i < 9; i++) {
            const randomColor = allColors[Math.floor(Math.random() * allColors.length)];
            currentState[faceName][i] = randomColor;
        }
    });
    
    updateCubeDisplay();
    
    // Анимация вращения
    cube.style.transition = 'transform 1s ease';
    cube.style.transform = 'rotateX(-30deg) rotateY(405deg)';
    
    setTimeout(() => {
        cube.style.transform = 'rotateX(-30deg) rotateY(45deg)';
    }, 1000);
}

// Сбросить кубик
function resetCube() {
    currentState = JSON.parse(JSON.stringify(originalState));
    updateCubeDisplay();
    
    // Анимация сброса
    cube.style.transition = 'transform 0.8s ease';
    cube.style.transform = 'rotateX(-30deg) rotateY(-315deg)';
    
    setTimeout(() => {
        cube.style.transform = 'rotateX(-30deg) rotateY(45deg)';
    }, 800);
}

// Обновить отображение кубика
function updateCubeDisplay() {
    const stickers = document.querySelectorAll('.sticker');
    
    stickers.forEach(sticker => {
        const faceName = sticker.dataset.face;
        const index = parseInt(sticker.dataset.index);
        sticker.style.background = currentState[faceName][index];
    });
}

// Вращение кубика мышкой
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let rotation = { x: -30, y: 45 };

cube.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
    cube.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
    };
    
    rotation.y += deltaMove.x * 0.5;
    rotation.x -= deltaMove.y * 0.5;
    
    cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
    
    previousMousePosition = { x: e.clientX, y: e.clientY };
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    cube.style.cursor = 'grab';
});

// Обработчики кнопок
shuffleBtn.addEventListener('click', shuffleCube);
resetBtn.addEventListener('click', resetCube);

// Инициализация при загрузке
initCube();