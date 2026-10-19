const defaultMarkdown = `# This is slide 01
## This is heading 02 in slide 01

This is your content on slide 01
---
# This is slide 02
## This is heading 02 in slide 02

This is your content on slide 02`;

let slides = [];
let currentSlideIndex = 0;

const markdownInput = document.getElementById('markdown-input');
const slideDisplay = document.getElementById('slide-display');
const slideCounter = document.getElementById('slide-counter');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const fullScreenBtn = document.getElementById('fullscreen-btn');
const saveBtn = document.getElementById('save-btn');
const presentBtn = document.getElementById('present-btn');
const viewport = document.getElementById('presentation-viewport');
const createBtn = document.getElementById('create-btn');
const editBtn = document.getElementById('edit-btn');

function parseMarkdownToHTML(markdown) {
    if (!markdown) return '';

    return markdown
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/\n/gim, '<br />');
}

function init() {
    const savedData = localStorage.getItem('webTech_slides');
    markdownInput.value = savedData ? savedData : defaultMarkdown;

    parseAndRender();

    markdownInput.addEventListener('input', parseAndRender);
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    fullScreenBtn.addEventListener('click', toggleFullScreen);
    saveBtn.addEventListener('click', saveSlides);
    presentBtn.addEventListener('click', toggleFullScreen);
    if (createBtn) createBtn.addEventListener('click', createNewSlides);
    if (editBtn) editBtn.addEventListener('click', enableEditMode);

    document.addEventListener('keydown', handleKeyboardShortcuts);
    document.addEventListener('fullscreenchange', updateFullScreenButtonState);
}

function parseAndRender() {
    const rawText = markdownInput.value;
    
    slides = rawText.split(/\n\s*---\s*\n/);

    if (currentSlideIndex >= slides.length) currentSlideIndex = slides.length - 1;
    if (currentSlideIndex < 0) currentSlideIndex = 0;

    renderCurrentSlide();
}

function renderCurrentSlide() {
    if (slides.length === 0 || slides[0].trim() === '') {
        slideDisplay.innerHTML = '<p>No content</p>';
        slideCounter.textContent = '0 / 0';
        return;
    }

    const currentMarkdown = slides[currentSlideIndex] || '';

    slideDisplay.innerHTML = parseMarkdownToHTML(currentMarkdown);
    slideCounter.textContent = `${currentSlideIndex + 1} / ${slides.length}`;

    prevBtn.disabled = currentSlideIndex === 0;
    nextBtn.disabled = currentSlideIndex === slides.length - 1;
}

function prevSlide() {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        renderCurrentSlide();
    }
}

function nextSlide() {
    if (currentSlideIndex < slides.length - 1) {
        currentSlideIndex++;
        renderCurrentSlide();
    }
}

function createNewSlides() {
    if (confirm("Create new slide deck? Any unsaved changes will be cleared.")) {
        markdownInput.value = `# Slide 01\nYour content here...\n---\n# Slide 02\nMore content here...`;
        currentSlideIndex = 0;
        parseAndRender();
        markdownInput.focus();
    }
}

function enableEditMode() {
    markdownInput.focus();
}

function saveSlides() {
    localStorage.setItem('webTech_slides', markdownInput.value);
    alert('Slides saved to the browser memory!');
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        viewport.requestFullscreen().catch(err => console.error(err));
    } else {
        document.exitFullscreen();
    }
}

function updateFullScreenButtonState() {
    fullScreenBtn.textContent = document.fullscreenElement ? 'Exit FullScreen' : 'FullScreen';
}

function handleKeyboardShortcuts(event) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
        event.preventDefault();
        saveSlides();
        return;
    }
    if (document.activeElement === markdownInput && !document.fullscreenElement) return;

    if (event.key === 'ArrowLeft') prevSlide();
    if (event.key === 'ArrowRight') nextSlide();
}

init();