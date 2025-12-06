// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
    updateLanguage(currentLang);
    
    // Evento botón idioma
    document.getElementById('lang-toggle').addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        updateLanguage(currentLang);
        
        // Cambiar texto del botón
        const langText = document.getElementById('lang-text');
        langText.textContent = translations[currentLang]['lang.' + currentLang];
    });
});

// Cambiar todos los textos
function updateLanguage(lang) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translations[lang][key];
    });
    
    // Cambiar título página
    document.title = translations[lang].title;
    
    // Cambiar lang del HTML
    document.documentElement.lang = lang;
}
