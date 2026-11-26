document.addEventListener('DOMContentLoaded', function() {
    // 1. Capture des paramètres UTM (depuis Outlook)
    const urlParams = new URLSearchParams(window.location.search);
    
    if(urlParams.has('utm_source')) {
        document.getElementById('utm_source').value = urlParams.get('utm_source');
    }
    if(urlParams.has('utm_campaign')) {
        document.getElementById('utm_campaign').value = urlParams.get('utm_campaign');
    }

    // 2. Traitement du formulaire
    const form = document.getElementById('partenaireForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // URL Google Apps Script configurée
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbywb4mP8KoL8P-VwjbRC03FXK1U6AaHsqhWElUGvgcsD0DoYmFYikSY-Z3jjK0qgkGhzA/exec';

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Sécurité anti-double clic
        submitBtn.disabled = true;
        submitBtn.textContent = 'TRANSMISSION EN COURS...';
        errorMessage.style.display = 'none';

        const formData = new FormData(form);

        fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        })
        .then(() => {
            form.style.display = 'none';
            successMessage.style.display = 'block';
            window.scrollTo({ top: document.querySelector('.form-container').offsetTop - 20, behavior: 'smooth' });
        })
        .catch(error => {
            console.error('Erreur:', error);
            errorMessage.style.display = 'block';
            submitBtn.disabled = false;
            submitBtn.textContent = 'INTÉGRER LE RÉSEAU RENAISSANCE';
        });
    });
});
