const form = document.getElementById('contactForm');
const statusDiv = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    statusDiv.className = 'mt-4 p-3 rounded-lg bg-blue-100 text-blue-700 text-sm alert-show';
    statusDiv.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Envoi en cours...';
    statusDiv.classList.remove('hidden');

    const formData = new FormData(form);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        statusDiv.className = 'mt-4 p-3 rounded-lg bg-green-100 text-green-700 text-sm alert-show';
        statusDiv.innerHTML = '<i class="fas fa-check-circle mr-2"></i> ✅ Message envoyé avec succès ! Nous vous répondrons sous 24h. Merci !';
        form.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      statusDiv.className = 'mt-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm alert-show';
      statusDiv.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i> ❌ Erreur technique. Veuillez nous contacter directement par téléphone ou WhatsApp.';
    }

    setTimeout(() => {
      statusDiv.classList.add('hidden');
    }, 5000);
  });
}