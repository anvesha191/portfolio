// ---------- Greeting ----------
(function setGreeting() {
  const h = new Date().getHours();
  const el = document.getElementById('time-greeting');
  el.textContent = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
})();

// ---------- Renderers: build response HTML from RESUME data ----------
function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

function renderProfile() {
  return `
    <h2>Profile</h2>
    <p>${esc(RESUME.profile)}</p>
    <div class="chip-row">
      <a class="chip" href="mailto:${RESUME.email}">${RESUME.email}</a>
      <span class="chip">${RESUME.phone}</span>
      <a class="chip" href="${RESUME.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
      <a class="chip" href="${RESUME.github}" target="_blank" rel="noopener">GitHub</a>
    </div>`;
}

function renderExperience() {
  const blocks = RESUME.experience.map(job => `
    <div class="entry">
      <div class="entry-head">
        <div>
          <h3>${esc(job.role)}</h3>
          <div class="entry-org">${esc(job.org)}</div>
        </div>
        <div class="entry-dates">${esc(job.dates)}</div>
      </div>
      ${job.groups.map(g => `
        ${g.heading ? `<div class="group-heading">${esc(g.heading)}</div>` : ''}
        <ul>${g.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
      `).join('')}
    </div>
  `).join('<hr class="divider">');
  return `<h2>Professional Experience</h2>${blocks}`;
}

function renderProjects() {
  const blocks = RESUME.projects.map(p => `
    <div class="entry">
      <div class="entry-head">
        <div>
          <h3>${esc(p.name)}</h3>
          <div class="entry-org">${esc(p.note)}</div>
        </div>
      </div>
      <ul>${p.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
    </div>
  `).join('<hr class="divider">');
  return `<h2>Projects</h2>${blocks}`;
}

function renderSkills() {
  const blocks = Object.entries(RESUME.skills).map(([cat, items]) => `
    <div class="skill-cat">
      <div class="group-heading">${esc(cat)}</div>
      <div class="chip-row">${items.map(i => `<span class="chip chip-static">${esc(i)}</span>`).join('')}</div>
    </div>
  `).join('');
  return `<h2>Skills</h2>${blocks}`;
}

function renderEducation() {
  const blocks = RESUME.education.map(e => `
    <div class="entry">
      <div class="entry-head">
        <div>
          <h3>${esc(e.school)}</h3>
          <div class="entry-org">${esc(e.degree)}</div>
        </div>
        <div class="entry-dates">${esc(e.dates)}</div>
      </div>
      <p>${esc(e.detail)}</p>
    </div>
  `).join('');
  return `<h2>Education</h2>${blocks}`;
}

function renderResume() {
  return `
    <h2>Resume</h2>
    <p>Here's my full resume as a PDF — you can view it directly or download it.</p>
    <div class="chip-row">
      <a class="chip" href="resume.pdf" target="_blank" rel="noopener">Open Resume (PDF)</a>
    </div>`;
}

function renderContact() {
  return `
    <h2>Get in touch</h2>
    <p>Happy to talk product, growth, or AI-driven experiences. Best ways to reach me:</p>
    <div class="chip-row">
      <a class="chip" href="mailto:${RESUME.email}">${RESUME.email}</a>
      <span class="chip">${RESUME.phone}</span>
      <a class="chip" href="${RESUME.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
      <a class="chip" href="${RESUME.github}" target="_blank" rel="noopener">GitHub</a>
    </div>`;
}

function renderCurrentRole() {
  const job = RESUME.experience[0];
  return `
    <h2>Current role</h2>
    <p>I'm currently an <strong>${esc(job.role)}</strong> at <strong>${esc(job.org)}</strong> (${esc(job.dates)}).</p>
    ${job.groups.slice(0, 2).map(g => `
      ${g.heading ? `<div class="group-heading">${esc(g.heading)}</div>` : ''}
      <ul>${g.bullets.slice(0, 2).map(b => `<li>${esc(b)}</li>`).join('')}</ul>
    `).join('')}
    <p class="hint">Ask me for "full experience" to see everything.</p>`;
}

function renderGreeting() {
  return `
    <h2>Hi, I'm ${esc(RESUME.name)} 👋</h2>
    <p>${esc(RESUME.profile)}</p>
    <p class="hint">Try asking about my experience, projects, skills, education, or how to reach me.</p>`;
}

function renderFallback(query) {
  return `
    <h2>I don't have a canned answer for that yet</h2>
    <p>I can currently talk about my <strong>experience</strong>, <strong>projects</strong>, <strong>skills</strong>, <strong>education</strong>, and <strong>contact details</strong>. Try one of those, or use the sidebar.</p>`;
}

// ---------- Intent matching ----------
function classify(raw) {
  const q = raw.toLowerCase();
  const has = (...words) => words.some(w => q.includes(w));

  if (has('hi', 'hello', 'hey', 'who are you', 'about you', 'yourself', 'introduce')) return 'greeting';
  if (has('current role', 'current job', 'right now', 'today', 'times internet', 'toi')) return 'current';
  if (has('experience', 'work', 'job', 'career', 'jpmorgan', 'drdo', 'intern')) return 'experience';
  if (has('project', 'vogue', 'recommend', 'built', 'build')) return 'projects';
  if (has('skill', 'tech stack', 'tools', 'know', 'python', 'sql', 'react')) return 'skills';
  if (has('education', 'study', 'studied', 'college', 'university', 'degree', 'nsut', 'cgpa')) return 'education';
  if (has('contact', 'email', 'reach', 'phone', 'linkedin', 'github', 'hire')) return 'contact';
  if (has('resume', 'cv', 'download')) return 'resume';
  return 'fallback';
}

const RENDERERS = {
  greeting: renderGreeting,
  current: renderCurrentRole,
  profile: renderProfile,
  experience: renderExperience,
  projects: renderProjects,
  skills: renderSkills,
  education: renderEducation,
  contact: renderContact,
  resume: renderResume,
  fallback: renderFallback
};

// ---------- View / chat wiring ----------
const viewHome = document.getElementById('view-home');
const viewChat = document.getElementById('view-chat');
const chatThread = document.getElementById('chat-thread');

function showChatView() {
  viewHome.classList.remove('active');
  viewChat.classList.add('active');
}

function showHomeView() {
  viewChat.classList.remove('active');
  viewHome.classList.add('active');
  chatThread.innerHTML = '';
}

function appendUserBubble(text) {
  const div = document.createElement('div');
  div.className = 'bubble bubble-user';
  div.textContent = text;
  chatThread.appendChild(div);
}

function appendAssistantBubble(html) {
  const div = document.createElement('div');
  div.className = 'bubble bubble-assistant';
  div.innerHTML = html;
  chatThread.appendChild(div);
  chatThread.scrollTop = chatThread.scrollHeight;
}

function askAndRender(userText, intentOverride) {
  showChatView();
  appendUserBubble(userText);
  const intent = intentOverride || classify(userText);
  const html = RENDERERS[intent](userText);
  // tiny delay so it reads like a response, not an instant swap
  setTimeout(() => {
    appendAssistantBubble(html);
    chatThread.scrollTop = chatThread.scrollHeight;
  }, 220);
}

// ---------- Mobile drawer ----------
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');
const menuToggle = document.getElementById('menu-toggle');
const sidebarClose = document.getElementById('sidebar-close');

function openDrawer() {
  sidebar.classList.add('open');
  overlay.classList.add('visible');
}
function closeDrawer() {
  sidebar.classList.remove('open');
  overlay.classList.remove('visible');
}
menuToggle && menuToggle.addEventListener('click', openDrawer);
sidebarClose && sidebarClose.addEventListener('click', closeDrawer);
overlay && overlay.addEventListener('click', closeDrawer);

// Sidebar nav
document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    const section = btn.dataset.section;
    closeDrawer();
    if (section === 'home') {
      showHomeView();
      return;
    }
    btn.classList.add('active');
    const labels = {
      profile: 'Show me your profile',
      experience: 'Show me your professional experience',
      projects: 'Show me your projects',
      skills: 'Show me your skills',
      education: 'Show me your education'
    };
    askAndRender(labels[section], section);
  });
});

// Quick pills on home
document.querySelectorAll('.pill').forEach(btn => {
  btn.addEventListener('click', () => askAndRender(btn.dataset.prompt));
});

// Chat form (home)
document.getElementById('chat-form').addEventListener('submit', e => {
  e.preventDefault();
  const input = document.getElementById('chat-input');
  const val = input.value.trim();
  if (!val) return;
  input.value = '';
  askAndRender(val);
});

// Chat form (docked, inside chat view)
document.getElementById('chat-form-2').addEventListener('submit', e => {
  e.preventDefault();
  const input = document.getElementById('chat-input-2');
  const val = input.value.trim();
  if (!val) return;
  input.value = '';
  appendUserBubble(val);
  const intent = classify(val);
  const html = RENDERERS[intent](val);
  setTimeout(() => {
    appendAssistantBubble(html);
    chatThread.scrollTop = chatThread.scrollHeight;
  }, 220);
});
