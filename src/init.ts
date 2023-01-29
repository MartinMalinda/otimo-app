


const handleGoogleLogin = async () => {
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code');
  if (code) {
    url.searchParams.delete('code');
    url.searchParams.delete('redirect_uri');
    url.searchParams.delete('scope');
    url.searchParams.delete('authuser');
    url.searchParams.delete('prompt');
    window.history.replaceState('', '', url);
    const targetUrl = new URL('https://x8ki-letl-twmt.n7.xano.io/api:-JtYy9Ru/oauth/google/continue');
    targetUrl.searchParams.set('code', code);
    targetUrl.searchParams.set('redirect_uri', 'http://localhost:5173');
    (window as any).authPromise = fetch(targetUrl)
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          localStorage.setItem('token', json.token);
        }
      });
  }
};

handleGoogleLogin();

export { };
