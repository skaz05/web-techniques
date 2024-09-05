window.addEventListener("load", function() {
    const themeSelector = document.getElementById('theme-selector');
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        document.documentElement.setAttribute('data-theme', storedTheme);
        themeSelector.value = storedTheme;
    }
    themeSelector.addEventListener('change', (event) => {
        const selectedTheme = event.target.value;
        document.documentElement.setAttribute('data-theme', selectedTheme);
        localStorage.setItem('theme', selectedTheme);
    });
});