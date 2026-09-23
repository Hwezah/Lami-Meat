/* LAMI MEAT session-auth module — self-contained shadcn-style modals.
   Loads on any page; binds to any element with [data-gm-account].
   Session lives in sessionStorage under 'lm-session'. */
(function () {
  if (window.__gmAuthLoaded) return;
  window.__gmAuthLoaded = true;

  var SS_KEY = 'lm-session';
  var state = { modal: null, showPass: false, name: '', email: '', pass: '', error: '' };

  function getSession() {
    try { var s = JSON.parse(sessionStorage.getItem(SS_KEY) || 'null'); return (s && s.email) ? s : null; }
    catch (e) { return null; }
  }
  function setSession(s) {
    try { sessionStorage.setItem(SS_KEY, JSON.stringify(s)); } catch (e) {}
    render(); syncAccountIcons();
  }
  function clearSession() {
    try { sessionStorage.removeItem(SS_KEY); } catch (e) {}
    render(); syncAccountIcons();
  }

  var root;
  function ensureRoot() {
    if (root) return root;
    var style = document.createElement('style');
    style.textContent = [
      "#gm-auth-root [data-gm-modal]{opacity:0;visibility:hidden;pointer-events:none;transition:opacity .18s ease,visibility .18s ease;}",
      "#gm-auth-root [data-gm-modal][data-open=\"true\"]{opacity:1;visibility:visible;pointer-events:auto;}",
      "@keyframes gmAuthOverlayIn{from{opacity:0}to{opacity:1}}",
      "@keyframes gmAuthPanelIn{from{opacity:0;transform:translateY(10px) scale(.965)}to{opacity:1;transform:translateY(0) scale(1)}}",
      "#gm-auth-root [data-gm-modal] [data-gm-overlay]{animation:gmAuthOverlayIn .18s ease both;}",
      "#gm-auth-root [data-gm-modal][data-open=\"true\"] [data-gm-panel]{animation:gmAuthPanelIn .24s cubic-bezier(.16,1,.3,1) both;}",
      "#gm-auth-root [data-gm-field]{width:100%;padding:13px 14px;background:#F7F3EC;border:1.5px solid rgba(22,23,26,.16);border-radius:2px;font-family:'Hanken Grotesk',sans-serif;font-size:15px;color:#16171A;box-sizing:border-box;transition:border-color .15s,box-shadow .15s;}",
      "#gm-auth-root [data-gm-field]:focus{outline:none;border-color:#8A6A33;box-shadow:0 0 0 3px rgba(184,149,90,.25);}",
      "#gm-auth-root [data-gm-field]::placeholder{color:#9C958A;}",
      "#gm-auth-root [data-gm-lab]{display:block;font-family:'Space Mono',monospace;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:#6E685F;margin-bottom:7px;}",
      "#gm-auth-root [data-gm-primary]{width:100%;margin-top:2px;padding:15px;background:#16171A;color:#EFE9DF;border:none;border-radius:2px;letter-spacing:.08em;text-transform:uppercase;font-family:'Hanken Grotesk',sans-serif;font-weight:700;font-size:15px;cursor:pointer;}",
      "#gm-auth-root [data-gm-primary]:hover{background:#8A6A33;}",
      "#gm-auth-root [data-gm-x]{position:absolute;top:14px;right:14px;width:48px;height:48px;border-radius:2px;background:none;border:none;color:#6E685F;cursor:pointer;display:flex;align-items:center;justify-content:center;}",
      "#gm-auth-root [data-gm-x]:hover{background:#E4DCCF;color:#16171A;}",
      "@media (max-width:560px){#gm-auth-root [data-gm-panel]{width:calc(100vw - 28px) !important;}}"
    ].join('');
    document.head.appendChild(style);

    root = document.createElement('div');
    root.id = 'gm-auth-root';
    document.body.appendChild(root);
    return root;
  }

  var X = '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"></path></svg>';
  function eye(open) {
    return open
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
  }
  var PANEL = 'position:relative;width:400px;max-width:100%;background:#EFE9DF;border:1px solid #B8955A;border-radius:2px;box-shadow:0 30px 70px -20px rgba(0,0,0,.5);padding:28px 28px 26px;box-sizing:border-box;';
  var WRAP = 'position:fixed;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;padding:20px;';
  var OVL = 'position:absolute;inset:0;background:rgba(0,0,0,.62);backdrop-filter:blur(3px);';
  var H2 = "margin:0 0 6px;font-family:'Hanken Grotesk',sans-serif;font-weight:900;font-size:26px;color:#16171A;letter-spacing:-.03em;text-transform:uppercase;";
  var SUB = "margin:0 0 22px;font-size:14px;line-height:1.5;color:#6E685F;";

  function errHTML() { return state.error ? '<div style="font-size:13px;color:#9A3A26;font-weight:600;">' + esc(state.error) + '</div>' : ''; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function passField(ph) {
    return '<div style="position:relative;"><input data-gm-input="pass" data-gm-field type="' + (state.showPass ? 'text' : 'password') + '" placeholder="' + ph + '" value="' + esc(state.pass) + '" style="padding-right:44px;">'
      + '<button data-gm-act="togglePass" type="button" aria-label="Toggle password" style="position:absolute;top:50%;right:8px;transform:translateY(-50%);width:30px;height:30px;border:none;background:none;color:#6E685F;cursor:pointer;display:flex;align-items:center;justify-content:center;">' + eye(state.showPass) + '</button></div>';
  }

  function render() {
    ensureRoot();
    var s = getSession();
    var m = state.modal;
    var html = '';

    // LOGIN
    html += '<div data-gm-modal="login" data-open="' + (m === 'login') + '" style="' + WRAP + '">'
      + '<div data-gm-overlay data-gm-act="close" style="' + OVL + '"></div>'
      + '<div data-gm-panel role="dialog" aria-modal="true" style="' + PANEL + '">'
      + '<button data-gm-x data-gm-act="close" aria-label="Close">' + X + '</button>'
      + '<h2 style="' + H2 + '">Sign in</h2><p style="' + SUB + '">Welcome back. Enter your details to continue.</p>'
      + '<div style="display:flex;flex-direction:column;gap:14px;">'
      + '<label><span data-gm-lab>Email</span><input data-gm-input="email" data-gm-field type="email" placeholder="you@example.com" value="' + esc(state.email) + '"></label>'
      + '<label><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:7px;"><span data-gm-lab style="margin-bottom:0;">Password</span><a href="#" data-gm-act="noop" style="font-size:12px;font-weight:600;color:#7D5E2A;text-decoration:none;">Forgot?</a></div>' + passField('\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022') + '</label>'
      + errHTML()
      + '<button data-gm-primary data-gm-act="login">Sign in</button></div>'
      + '<div style="margin-top:20px;text-align:center;font-size:13.5px;color:#6E685F;">New here? <a href="#" data-gm-act="toSignup" style="font-weight:700;color:#7D5E2A;text-decoration:none;">Create an account</a></div>'
      + '</div></div>';

    // SIGNUP
    html += '<div data-gm-modal="signup" data-open="' + (m === 'signup') + '" style="' + WRAP + '">'
      + '<div data-gm-overlay data-gm-act="close" style="' + OVL + '"></div>'
      + '<div data-gm-panel role="dialog" aria-modal="true" style="' + PANEL + '">'
      + '<button data-gm-x data-gm-act="close" aria-label="Close">' + X + '</button>'
      + '<h2 style="' + H2 + '">Create account</h2><p style="' + SUB + '">Join LAMI MEAT to save your box and order faster.</p>'
      + '<div style="display:flex;flex-direction:column;gap:14px;">'
      + '<label><span data-gm-lab>Full name</span><input data-gm-input="name" data-gm-field type="text" placeholder="Jane Doe" value="' + esc(state.name) + '"></label>'
      + '<label><span data-gm-lab>Email</span><input data-gm-input="email" data-gm-field type="email" placeholder="you@example.com" value="' + esc(state.email) + '"></label>'
      + '<label><span data-gm-lab>Password</span>' + passField('At least 6 characters') + '</label>'
      + errHTML()
      + '<button data-gm-primary data-gm-act="signup">Create account</button></div>'
      + '<div style="margin-top:20px;text-align:center;font-size:13.5px;color:#6E685F;">Already have an account? <a href="#" data-gm-act="toLogin" style="font-weight:700;color:#7D5E2A;text-decoration:none;">Sign in</a></div>'
      + '</div></div>';

    // SIGN OUT
    var who = s ? esc(s.email) : '';
    html += '<div data-gm-modal="signout" data-open="' + (m === 'signout') + '" style="' + WRAP + '">'
      + '<div data-gm-overlay data-gm-act="close" style="' + OVL + '"></div>'
      + '<div data-gm-panel role="alertdialog" aria-modal="true" style="' + PANEL.replace('width:400px', 'width:388px').replace('padding:28px 28px 26px', 'padding:28px 28px 24px') + '">'
      + '<div style="width:46px;height:46px;border-radius:2px;background:#E4DCCF;display:flex;align-items:center;justify-content:center;margin-bottom:16px;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7D5E2A" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg></div>'
      + '<h2 style="' + H2.replace('font-size:22px', 'font-size:21px') + '">Sign out?</h2>'
      + '<p style="' + SUB.replace('margin:0 0 22px', 'margin:0 0 24px') + '">You\'re signed in as ' + who + '. Your saved meat box stays on this device.</p>'
      + '<div style="display:flex;gap:11px;">'
      + '<button data-gm-act="close" style="flex:1;padding:13px;background:transparent;color:#16171A;border:1.5px solid rgba(22,23,26,.16);border-radius:2px;font-family:\'Hanken Grotesk\',sans-serif;font-weight:700;font-size:14.5px;cursor:pointer;">Cancel</button>'
      + '<button data-gm-act="doSignout" style="flex:1;padding:13px;background:#16171A;color:#EFE9DF;border:none;border-radius:2px;font-family:\'Hanken Grotesk\',sans-serif;font-weight:700;font-size:14.5px;cursor:pointer;">Sign out</button>'
      + '</div></div></div>';

    root.innerHTML = html;
  }

  function open(which) { state.modal = which; state.error = ''; state.pass = ''; state.showPass = false; render(); }
  function close() { state.modal = null; state.error = ''; render(); }
  function toggle() { open(getSession() ? 'signout' : 'login'); }

  function validEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }
  function login() {
    var email = (state.email || '').trim();
    if (!validEmail(email)) { state.error = 'Enter a valid email address.'; return render(); }
    if ((state.pass || '').length < 6) { state.error = 'Password must be at least 6 characters.'; return render(); }
    state.modal = null; state.name = ''; state.email = ''; state.pass = ''; state.error = '';
    setSession({ name: email.split('@')[0], email: email, at: Date.now() });
  }
  function signup() {
    var name = (state.name || '').trim(), email = (state.email || '').trim();
    if (!name) { state.error = 'Please enter your name.'; return render(); }
    if (!validEmail(email)) { state.error = 'Enter a valid email address.'; return render(); }
    if ((state.pass || '').length < 6) { state.error = 'Password must be at least 6 characters.'; return render(); }
    state.modal = null; state.name = ''; state.email = ''; state.pass = ''; state.error = '';
    setSession({ name: name, email: email, at: Date.now() });
  }

  // Delegated events
  document.addEventListener('click', function (e) {
    var acct = e.target.closest && e.target.closest('[data-gm-account]');
    if (acct) { e.preventDefault(); toggle(); return; }
    var t = e.target.closest && e.target.closest('[data-gm-act]');
    if (!t || !root || !root.contains(t)) return;
    e.preventDefault();
    var act = t.getAttribute('data-gm-act');
    if (act === 'close') close();
    else if (act === 'togglePass') { state.showPass = !state.showPass; render(); }
    else if (act === 'toSignup') open('signup');
    else if (act === 'toLogin') open('login');
    else if (act === 'login') login();
    else if (act === 'signup') signup();
    else if (act === 'doSignout') { close(); clearSession(); }
    else if (act === 'noop') { /* placeholder */ }
  });
  document.addEventListener('input', function (e) {
    var f = e.target.getAttribute && e.target.getAttribute('data-gm-input');
    if (f) state[f] = e.target.value;
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  function syncAccountIcons() {
    var s = getSession();
    document.querySelectorAll('[data-gm-account]').forEach(function (el) {
      if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
      var dot = el.querySelector('[data-gm-dot]');
      if (s && !dot) {
        dot = document.createElement('span');
        dot.setAttribute('data-gm-dot', '');
        dot.style.cssText = 'position:absolute;top:2px;right:0;width:9px;height:9px;border-radius:50%;background:#7BE38B;box-shadow:0 0 0 2px rgba(40,12,9,.35);pointer-events:none;';
        el.appendChild(dot);
      } else if (!s && dot) { dot.remove(); }
    });
  }

  // React re-renders can wipe injected dots; observe and re-sync.
  var mo = new MutationObserver(function () { syncAccountIcons(); });
  function boot() {
    render();
    syncAccountIcons();
    mo.observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  window.GMAuth = { open: open, close: close, toggle: toggle, getSession: getSession, signOut: function () { clearSession(); } };
})();