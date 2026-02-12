
export const openWhatsApp = (phoneData, navigate) => {
    // 1. Extract phone string from potentially complex object
    let phone = phoneData;

    // Handle object wrappers common in Select/Combobox components
    if (typeof phoneData === 'object' && phoneData !== null) {
        phone = phoneData.phone || phoneData.value || phoneData.number || phoneData.label;
    }

    console.log('OpenWhatsApp called with:', phoneData, 'Resolved phone:', phone);

    // 2. Sanitation
    if (!phone) {
        console.warn('Numero di telefono mancante per WhatsApp. Data:', phoneData);
        alert('Attenzione: Numero di telefono non rilevato. Controlla che il campo Telefono sia compilato.');
        return;
    }

    // Remove all non-numeric chars
    let cleanPhone = String(phone).replace(/\D/g, '');

    // 3. Country Code Logic (Default to IT +39 if length is 10)
    // Italian mobile numbers are typically 10 digits (e.g., 3331234567).
    // If it's 10 digits, we assume it's missing the prefix.
    if (cleanPhone.length === 10) {
        cleanPhone = '39' + cleanPhone;
    }

    console.log('Clean phone:', cleanPhone);

    // 5. Smart Protocol Logic
    // Try to open WhatsApp App via protocol handler, fallback to Web.

    // For Web App:
    // We can try to open whatsapp:// first. If it fails (timeout), we open web.whatsapp.com.
    // NOTE: In some modern browsers, protocol handlers might prompt the user.

    const appUrl = `whatsapp://send?phone=${cleanPhone}`;
    const webUrl = `https://web.whatsapp.com/send?phone=${cleanPhone}`;

    // Create hidden iframe
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = appUrl;
    document.body.appendChild(iframe);

    // Set a cleanup + fallback timer
    const fallbackTimer = setTimeout(() => {
        // Remove the iframe
        document.body.removeChild(iframe);

        // If window is still focused, assume App didn't open. Launch Web.
        if (!document.hidden) {
            console.log('App not detected, falling back to Web');
            window.open(webUrl, '_blank');
        }
    }, 2500); // 2.5 seconds timeout (gave more time for app to launch)

    // If the window loses focus (App opened), clear the fallback
    window.addEventListener('blur', () => {
        clearTimeout(fallbackTimer);
        // We can also remove the iframe now
        if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
        }
    }, { once: true });
};
