export const generateCSP = () => {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
    const CSPPages = `
    default-src 'self';
    style-src 'self' 
      'unsafe-inline'
      https://accounts.google.com;
    script-src 'self' 
     'wasm-unsafe-eval'
  'inline-speculation-rules'
  chrome-extension:
  https://www.recaptcha.net
  https://www.google.com
  https://www.gstatic.com
  https://*.googletagmanager.com 
  https://*.google-analytics.com
  https://accounts.google.com
  https://va.vercel-scripts.com
  'unsafe-inline' 'unsafe-eval';
    img-src 'self' 
      https://avatar.vercel.sh
      blob: data: 
      https://*.googletagmanager.com;
    font-src 'self'
      https://fonts.gstatic.com;
    child-src 'self' 
      https://www.recaptcha.net
      https://www.google.com;
    frame-src 'self' 
      https://www.recaptcha.net
      https://www.google.com
      https://accounts.google.com;
    object-src 'none';
    media-src *;
    base-uri 'self';
    connect-src 'self' 
      blob:
      https://*.googletagmanager.com
      https://accounts.google.com
      https://va.vercel-scripts.com;
    form-action 'self';
    frame-ancestors 'self'
    https://va.vercel-scripts.com
`

    const CSPStaticFiles = `
    default-src 'self';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `

    // Replace newline characters and spaces
    const contentSecurityPolicyPages = CSPPages.replace(/\s{2,}/g, ' ').trim()
    const contentSecurityPolicyStaticFiles = CSPStaticFiles.replace(/\s{2,}/g, ' ').trim()

    return {
        nonce,
        contentSecurityPolicyPages,
        contentSecurityPolicyStaticFiles,
    } as const
}
