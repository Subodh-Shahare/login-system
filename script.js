const DEMO_EMAIL = "demo@example.com";
const DEMO_PASSWORD = "Demo@123";
const SESSION_KEY = "lumaLoginSession";
const REMEMBER_KEY = "lumaRememberedEmail";
const $ = selector => document.querySelector(selector);

function showDialog(title, text) {
  $("#dialogTitle").textContent = title;
  $("#dialogMessage").textContent = text;
  $("#infoDialog").showModal();
}
function validEmail(email) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(email);
}
function clearErrors() {
  $("#emailError").textContent = "";
  $("#passwordError").textContent = "";
  $("#formMessage").textContent = "";
  $("#formMessage").className = "message";
}
function strengthScore(password) {
  return [password.length >= 8, /[a-z]/.test(password) && /[A-Z]/.test(password), /\d/.test(password), /[^A-Za-z0-9]/.test(password)].filter(Boolean).length;
}
function updateStrength() {
  const password = $("#password").value;
  const wrap = $("#strengthWrap");
  if (!password) { wrap.hidden = true; return; }
  wrap.hidden = false;
  const score = strengthScore(password);
  $("#strengthBar").style.width = `${score * 25}%`;
  $("#strengthBar").style.background = score < 2 ? "#ff8290" : score < 4 ? "#ffc56b" : "#5de0c0";
  $("#strengthText").textContent = ["Very weak", "Weak", "Fair", "Good", "Strong"][score];
}

$("#togglePassword").addEventListener("click", event => {
  const input = $("#password");
  const visible = input.type === "text";
  input.type = visible ? "password" : "text";
  event.currentTarget.setAttribute("aria-label", visible ? "Show password" : "Hide password");
  event.currentTarget.textContent = visible ? "◉" : "◎";
});
$("#password").addEventListener("input", updateStrength);
$("#email").addEventListener("input", () => $("#emailError").textContent = "");
$("#password").addEventListener("input", () => $("#passwordError").textContent = "");
$("#fillDemo").addEventListener("click", () => {
  $("#email").value = DEMO_EMAIL;
  $("#password").value = DEMO_PASSWORD;
  updateStrength(); clearErrors();
});
$("#forgotBtn").addEventListener("click", () => showDialog("Password reset", "This front-end demo does not send password reset emails. A real reset flow needs a secure backend and email verification."));
$("#signupLink").addEventListener("click", event => {
  event.preventDefault();
  showDialog("Create an account", "Registration is not included in this demo. Use the demo credentials displayed on the login page.");
});

$("#loginForm").addEventListener("submit", event => {
  event.preventDefault(); clearErrors();
  const email = $("#email").value.trim();
  const password = $("#password").value;
  let valid = true;
  if (!email) { $("#emailError").textContent = "Please enter your email address."; valid = false; }
  else if (!validEmail(email)) { $("#emailError").textContent = "Please enter a valid email address."; valid = false; }
  if (!password) { $("#passwordError").textContent = "Please enter your password."; valid = false; }
  else if (password.length < 8) { $("#passwordError").textContent = "Password must contain at least 8 characters."; valid = false; }
  if (!valid) return;

  // Learning demo only: real authentication must happen on a secure server.
  if (email.toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    $("#formMessage").textContent = "Incorrect email or password. Try the demo credentials below.";
    $("#formMessage").classList.add("failure"); return;
  }
  const session = { email: DEMO_EMAIL, signedInAt: new Date().toISOString() };
  if ($("#rememberMe").checked) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    localStorage.setItem(REMEMBER_KEY, email);
  } else {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    localStorage.removeItem(REMEMBER_KEY);
  }
  $("#formMessage").textContent = "Login successful! Your demo session is active.";
  $("#formMessage").classList.add("success");
  showDialog("Welcome back!", `You are signed in as ${DEMO_EMAIL}. This is a front-end demonstration, not real server authentication.`);
});

function restoreSession() {
  const remembered = localStorage.getItem(REMEMBER_KEY);
  if (remembered) { $("#email").value = remembered; $("#rememberMe").checked = true; }
  const session = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
  if (!session) return;
  try {
    const data = JSON.parse(session);
    if (data.email === DEMO_EMAIL) {
      $("#formMessage").textContent = "A demo session is already active in this browser.";
      $("#formMessage").classList.add("success");
    }
  } catch {
    sessionStorage.removeItem(SESSION_KEY); localStorage.removeItem(SESSION_KEY);
  }
}
restoreSession();
