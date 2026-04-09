export function initContactForm() {
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  if (!form) return;

  const submitBtn = form.querySelector('[type="submit"]') as HTMLButtonElement;
  const successMsg = document.getElementById('form-success');
  const errorMsg = document.getElementById('form-error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Client-side validation
    const name = (form.querySelector('[name="name"]') as HTMLInputElement)?.value.trim();
    const email = (form.querySelector('[name="email"]') as HTMLInputElement)?.value.trim();
    const message = (form.querySelector('[name="message"]') as HTMLTextAreaElement)?.value.trim();
    const honeypot = (form.querySelector('[name="website"]') as HTMLInputElement)?.value;

    if (honeypot) return; // Bot detected

    if (!name || !email || !message) {
      showError('Please fill in all required fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('Please enter a valid email address.');
      return;
    }

    // Submit
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Sending...';

    try {
      const formData = new FormData(form);
      const response = await fetch('/contact.php', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        form.reset();
        showSuccess();
      } else {
        showError(result.message || 'Something went wrong. Please try again.');
      }
    } catch {
      showError('Unable to send message. Please email us directly or try again later.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Message';
    }
  });

  function showSuccess() {
    successMsg?.classList.remove('hidden');
    errorMsg?.classList.add('hidden');
    setTimeout(() => successMsg?.classList.add('hidden'), 8000);
  }

  function showError(msg: string) {
    if (errorMsg) {
      errorMsg.textContent = msg;
      errorMsg.classList.remove('hidden');
    }
    successMsg?.classList.add('hidden');
    setTimeout(() => errorMsg?.classList.add('hidden'), 8000);
  }
}
