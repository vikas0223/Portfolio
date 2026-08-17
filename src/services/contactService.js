/**
 * Contact Service Layer
 * Decouples the contact form UI from backend email providers.
 * 
 * Provider: Formspree
 * Endpoint: https://formspree.io/f/xvkpqljw
 * 
 * Future Resend Migration:
 * Replace FORMSPREE_ENDPOINT / fetch call in this file with Resend API / Vercel Serverless Function.
 * The Contact UI component will remain untouched as it only relies on submitContactForm(formData).
 */

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xvkpqljw';

/**
 * Submits contact form data to the email service provider.
 * 
 * @param {Object} formData - Form input values
 * @param {string} formData.name - User's name
 * @param {string} formData.email - User's email
 * @param {string} [formData.company] - Company name (optional)
 * @param {string} [formData.projectType] - Project type selection
 * @param {string} formData.message - Main message / project details
 * @returns {Promise<{ success: boolean, data?: any, error?: string }>}
 */
export async function submitContactForm(formData) {
  try {
    const payload = {
      name: formData.name ? formData.name.trim() : '',
      email: formData.email ? formData.email.trim() : '',
      company: formData.company ? formData.company.trim() : '',
      projectTypes: formData.projectType || formData.projectTypes || '',
      message: formData.message ? formData.message.trim() : ''
    };

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const data = await response.json().catch(() => ({}));
      return { success: true, data };
    } else {
      const errorData = await response.json().catch(() => ({}));
      let errorMessage = 'Form submission failed. Please try again.';
      
      if (errorData.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
        errorMessage = errorData.errors.map(err => err.message).join(', ');
      } else if (errorData.error) {
        errorMessage = errorData.error;
      }

      return { success: false, error: errorMessage };
    }
  } catch (err) {
    console.error('Service layer contact submission error:', err);
    return {
      success: false,
      error: 'Network connection issue. Please check your network and try again.'
    };
  }
}
