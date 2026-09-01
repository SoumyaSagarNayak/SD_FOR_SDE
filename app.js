// ==========================================================================
// mySystemDesign — Full Application with Proper Checkboxes & Progress
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------------------------------------------------
  // STATE
  // -------------------------------------------------------------------------
  let currentTab = 'roadmap';
  let currentFilter = 'all';
  let searchQuery = '';
  let completedItems = new Set(JSON.parse(localStorage.getItem('sd_completed') || '[]'));
  let savedItems = new Set(JSON.parse(localStorage.getItem('sd_saved') || '[]'));
  let activeModal = null;

  // Total trackable items (sum of all checkboxable items across all views)
  const TOTAL_ITEMS = SD.phases.reduce((acc, p) => acc + p.topics.length, 0)
    + SD.caseStudies.length
    + SD.buildingBlocks.length
    + SD.lldProblems.length
    + SD.solidPrinciples.length
    + SD.behavioralScenarios.length
    + SD.engineeringBlogs.length
    + (SD.cloudMatrix ? SD.cloudMatrix.length : 0)
    + (SD.decisionTable ? SD.decisionTable.length : 0)
    + (SD.testingTypes ? SD.testingTypes.length : 0);

  // -------------------------------------------------------------------------
  // DOM REFS
  // -------------------------------------------------------------------------
  const mainContent = document.getElementById('main-content');
  const navTabs = document.querySelectorAll('.nav-tab');
  const filterChips = document.querySelectorAll('.filter-chip');
  const searchInput = document.getElementById('global-search');
  const navTabContainer = document.getElementById('nav-tabs');
  const countDoneEl = document.getElementById('count-done');
  const countSavedEl = document.getElementById('count-saved');
  const countPendingEl = document.getElementById('count-pending');
  const progressPctText = document.getElementById('progress-percent-text');
  const progressFill = document.getElementById('global-progress-fill');
  const modalOverlay = document.getElementById('detail-modal');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalLevel = document.getElementById('modal-level');
  const modalBody = document.getElementById('modal-body');
  const modalSaveBtn = document.getElementById('modal-bookmark-toggle');
  const modalDoneBtn = document.getElementById('modal-status-toggle');
  const btnReset = document.getElementById('btn-reset-progress');
  const btnExport = document.getElementById('btn-export-progress');

  // -------------------------------------------------------------------------
  // PERSISTENCE HELPERS
  // -------------------------------------------------------------------------
  function persist() {
    localStorage.setItem('sd_completed', JSON.stringify([...completedItems]));
    localStorage.setItem('sd_saved', JSON.stringify([...savedItems]));
  }

  function toggleDone(id, event) {
    if (event) event.stopPropagation();
    if (completedItems.has(id)) completedItems.delete(id);
    else completedItems.add(id);
    persist();
    updateStats();
    refreshCheckbox(id, 'done');
  }

  function toggleSaved(id, event) {
    if (event) event.stopPropagation();
    if (savedItems.has(id)) savedItems.delete(id);
    else savedItems.add(id);
    persist();
    updateStats();
    refreshCheckbox(id, 'saved');
  }

  // Refresh a single checkbox without full re-render
  function refreshCheckbox(id, type) {
    if (type === 'done') {
      document.querySelectorAll(`[data-done-id="${id}"]`).forEach(el => {
        el.classList.toggle('checked', completedItems.has(id));
        el.title = completedItems.has(id) ? 'Mark as incomplete' : 'Mark as done';
      });
    } else {
      document.querySelectorAll(`[data-save-id="${id}"]`).forEach(el => {
        el.classList.toggle('saved', savedItems.has(id));
        el.title = savedItems.has(id) ? 'Remove bookmark' : 'Save for later';
      });
    }
    // Update modal buttons if open
    if (activeModal === id) {
      modalDoneBtn.textContent = completedItems.has(id) ? '✓ Marked Complete — Click to Undo' : 'Mark as Completed ✓';
      modalSaveBtn.textContent = savedItems.has(id) ? '★ Saved — Click to Remove' : '☆ Save for Later';
    }
  }

  // -------------------------------------------------------------------------
  // STATS
  // -------------------------------------------------------------------------
  function updateStats() {
    const done = completedItems.size;
    const saved = savedItems.size;
    const pending = Math.max(0, TOTAL_ITEMS - done);
    const pct = Math.min(100, Math.round((done / TOTAL_ITEMS) * 100));

    countDoneEl.textContent = done;
    countSavedEl.textContent = saved;
    countPendingEl.textContent = pending;
    progressPctText.textContent = `${pct}%`;
    progressFill.style.width = `${pct}%`;
  }

  // -------------------------------------------------------------------------
  // UTILITY: Build a checkbox row
  // -------------------------------------------------------------------------
  function checkbox(id, label, extraClass = '') {
    const isDone = completedItems.has(id);
    const isSaved = savedItems.has(id);
    return `
      <div class="checklist-row ${isDone ? 'row-done' : ''} ${extraClass}" id="row-${id}">
        <button class="cb-done ${isDone ? 'checked' : ''}"
          data-done-id="${id}"
          onclick="window.toggleDone('${id}', event)"
          title="${isDone ? 'Mark as incomplete' : 'Mark as done'}">
          ${isDone ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
        </button>
        <span class="cb-label ${isDone ? 'label-done' : ''}">${label}</span>
        <button class="cb-save ${isSaved ? 'saved' : ''}"
          data-save-id="${id}"
          onclick="window.toggleSaved('${id}', event)"
          title="${isSaved ? 'Remove bookmark' : 'Save for later'}">★</button>
      </div>`;
  }

  // -------------------------------------------------------------------------
  // TAB ROUTING
  // -------------------------------------------------------------------------
  function switchTab(name) {
    currentTab = name;
    navTabs.forEach(t => t.classList.toggle('active', t.dataset.tab === name));
    const target = document.querySelector(`.nav-tab[data-tab="${name}"]`);
    if (target) target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    render();
  }
  window.switchTab = switchTab;

  navTabs.forEach(t => t.addEventListener('click', () => switchTab(t.dataset.tab)));

  document.getElementById('tab-scroll-left').addEventListener('click', () => {
    navTabContainer.scrollBy({ left: -220, behavior: 'smooth' });
  });
  document.getElementById('tab-scroll-right').addEventListener('click', () => {
    navTabContainer.scrollBy({ left: 220, behavior: 'smooth' });
  });

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter = chip.dataset.filter;
      render();
    });
  });

  searchInput.addEventListener('input', e => {
    searchQuery = e.target.value.toLowerCase().trim();
    render();
  });

  document.getElementById('btn-search-toggle').addEventListener('click', () => searchInput.focus());

  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); searchInput.focus(); }
    if (e.key === 'Escape') closeModal();
  });

  btnReset.addEventListener('click', () => {
    if (!confirm('Reset ALL progress and saved items?')) return;
    completedItems.clear();
    savedItems.clear();
    persist();
    updateStats();
    render();
  });

  btnExport.addEventListener('click', () => {
    const data = { completed: [...completedItems], saved: [...savedItems], exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'sd-progress.json';
    a.click();
  });

  // -------------------------------------------------------------------------
  // MAIN RENDER ROUTER
  // -------------------------------------------------------------------------
  function render() {
    switch (currentTab) {
      case 'roadmap': renderRoadmap(); break;
      case 'building-blocks': renderBuildingBlocks(); break;
      case 'case-studies': renderCaseStudies(); break;
      case 'cloud-matrix': renderCloudMatrix(); break;
      case 'decision-table': renderDecisionTable(); break;
      case 'testing': renderTesting(); break;
      case 'lld': renderLld(); break;
      case 'interview': renderInterview(); break;
      case 'behavioral': renderBehavioral(); break;
      case 'blogs': renderBlogs(); break;
      case 'wizard': renderWizard(); break;
      default: renderRoadmap();
    }
  }

  // =========================================================================
  // VIEW 1: 10-PHASE ROADMAP
  // =========================================================================
  function renderRoadmap() {
    const filteredPhases = SD.phases.map(phase => {
      const topics = phase.topics.filter(t => {
        const matchSearch = !searchQuery || t.title.toLowerCase().includes(searchQuery) || t.description.toLowerCase().includes(searchQuery);
        let matchFilter = true;
        if (currentFilter === 'completed') matchFilter = completedItems.has(t.id);
        else if (currentFilter === 'saved') matchFilter = savedItems.has(t.id);
        else if (!['all'].includes(currentFilter)) matchFilter = phase.level === currentFilter;
        return matchSearch && matchFilter;
      });
      return { ...phase, topics };
    }).filter(p => p.topics.length > 0);

    const doneInRoadmap = SD.phases.reduce((acc, p) => acc + p.topics.filter(t => completedItems.has(t.id)).length, 0);
    const totalTopics = SD.phases.reduce((acc, p) => acc + p.topics.length, 0);

    let html = `
      <div class="section-header-block">
        <div>
          <h1 class="section-title">🗺️ 10-Phase System Design Learning Roadmap</h1>
          <p class="section-desc">Fully sequenced from DNS & HTTP basics to CQRS, event sourcing, and FAANG interview mastery. Check off each topic as you complete it.</p>
        </div>
        <div class="progress-ring-wrap">
          <span class="phase-progress-text">${doneInRoadmap} / ${totalTopics} topics done</span>
        </div>
      </div>
    `;

    filteredPhases.forEach(phase => {
      const phaseDone = phase.topics.filter(t => completedItems.has(t.id)).length;
      const phaseTotal = phase.topics.length;
      const phasePct = Math.round((phaseDone / phaseTotal) * 100);

      html += `
        <div class="phase-group">
          <div class="phase-header" style="border-left-color: ${phase.color}">
            <div class="phase-header-left">
              <div class="phase-badge" style="background: ${phase.color}20; color: ${phase.color}; border: 1px solid ${phase.color}40;">Phase ${phase.number}</div>
              <div>
                <div class="phase-title">${phase.title}</div>
                <div class="phase-tagline">${phase.tagline}</div>
              </div>
            </div>
            <div class="phase-meta">
              <span class="level-pill level-${phase.level.toLowerCase()}">${phase.level}</span>
              <span class="phase-count">${phaseDone}/${phaseTotal} done</span>
              <div class="mini-progress-track"><div class="mini-progress-fill" style="width:${phasePct}%;background:${phase.color};"></div></div>
            </div>
          </div>

          ${phase.topics.map(t => {
        const isDone = completedItems.has(t.id);
        const isSaved = savedItems.has(t.id);
        return `
              <div class="topic-item ${isDone ? 'topic-done' : ''}">
                <div class="topic-item-top">
                  <button class="cb-done ${isDone ? 'checked' : ''}"
                    data-done-id="${t.id}"
                    onclick="window.toggleDone('${t.id}', event)"
                    title="${isDone ? 'Mark as incomplete' : 'Mark as done'}">
                    ${isDone ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
                  </button>
                  <div class="topic-item-content">
                    <div class="topic-item-title">${t.title}</div>
                    <div class="topic-item-desc">${t.description}</div>
                    <div class="topic-why"><strong>Why it matters:</strong> ${t.whyItMatters}</div>
                    <div class="topic-resources">
                      ${t.resources.map(r => `
                        <a href="${r.url}" target="_blank" rel="noopener" class="res-link tag-${r.type}">
                          <span class="res-type-label">${r.type}</span>${r.label} ↗
                        </a>
                      `).join('')}
                    </div>
                  </div>
                  <button class="cb-save ${isSaved ? 'saved' : ''}"
                    data-save-id="${t.id}"
                    onclick="window.toggleSaved('${t.id}', event)"
                    title="${isSaved ? 'Remove bookmark' : 'Save for later'}">★</button>
                </div>
              </div>
            `;
      }).join('')}
        </div>
      `;
    });

    if (filteredPhases.length === 0) {
      html += `<div class="empty-state">No topics match your current filter. <button onclick="document.querySelector('[data-filter=all]').click()">Clear filters</button></div>`;
    }

    mainContent.innerHTML = html;
  }

  // =========================================================================
  // VIEW 2: BUILDING BLOCKS
  // =========================================================================
  function renderBuildingBlocks() {
    const filtered = SD.buildingBlocks.filter(b => {
      const m = !searchQuery || b.name.toLowerCase().includes(searchQuery) || b.whatItDoes.toLowerCase().includes(searchQuery) || b.tools.toLowerCase().includes(searchQuery);
      let f = true;
      if (currentFilter === 'completed') f = completedItems.has('bb-' + b.name.replace(/\s/g, '-').toLowerCase());
      else if (currentFilter === 'saved') f = savedItems.has('bb-' + b.name.replace(/\s/g, '-').toLowerCase());
      else if (!['all'].includes(currentFilter)) f = b.level === currentFilter;
      return m && f;
    });

    let html = `
      <div class="section-header-block">
        <div>
          <h1 class="section-title">🏗️ System Design Building Blocks</h1>
          <p class="section-desc">The core architectural components. Know each one: what it does, when to use it, when NOT to use it, and which tools implement it.</p>
        </div>
        <span class="badge-count">${filtered.length} components</span>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th class="th-check">Done</th>
              <th>Component</th>
              <th>Category</th>
              <th>Level</th>
              <th>What It Does</th>
              <th>Use When</th>
              <th>Avoid When</th>
              <th>Tools</th>
            </tr>
          </thead>
          <tbody>
    `;

    filtered.forEach(b => {
      const bid = 'bb-' + b.name.replace(/\s+/g, '-').toLowerCase();
      const isDone = completedItems.has(bid);
      html += `
        <tr class="${isDone ? 'tr-done' : ''}">
          <td class="td-check">
            <button class="cb-done ${isDone ? 'checked' : ''}"
              data-done-id="${bid}"
              onclick="window.toggleDone('${bid}', event)"
              title="${isDone ? 'Unmark' : 'Mark done'}">
              ${isDone ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
            </button>
          </td>
          <td class="td-strong">${b.name}</td>
          <td><span class="badge-tag">${b.category}</span></td>
          <td><span class="level-pill level-${b.level.toLowerCase()}">${b.level}</span></td>
          <td>${b.whatItDoes}</td>
          <td class="td-green">${b.whenToUse}</td>
          <td class="td-red">${b.whenNotToUse}</td>
          <td>
            <code class="code-inline">${b.tools}</code>
            ${b.resources && b.resources.length > 0 ? `<div class="bb-resources">${b.resources.map(r => `<a href="${r.url}" target="_blank" rel="noopener" class="res-link tag-${r.type}">${r.label} ↗</a>`).join('')}</div>` : ''}
          </td>
        </tr>
      `;
    });

    html += `</tbody></table></div>`;
    mainContent.innerHTML = html;
  }

  // =========================================================================
  // VIEW 3: CASE STUDIES
  // =========================================================================
  function renderCaseStudies() {
    const filtered = SD.caseStudies.filter(c => {
      const m = !searchQuery || c.title.toLowerCase().includes(searchQuery) || c.clarify.toLowerCase().includes(searchQuery) || c.components.toLowerCase().includes(searchQuery);
      let f = true;
      if (currentFilter === 'completed') f = completedItems.has(c.id);
      else if (currentFilter === 'saved') f = savedItems.has(c.id);
      else if (!['all'].includes(currentFilter)) f = c.level.toLowerCase() === currentFilter.toLowerCase();
      return m && f;
    });

    let html = `
      <div class="section-header-block">
        <div>
          <h1 class="section-title">💼 Worked System Design Case Studies</h1>
          <p class="section-desc">Click any case for the full deep-dive: components, bottlenecks, exact follow-up questions & answers the interviewer expects.</p>
        </div>
        <span class="badge-count">${filtered.length} problems</span>
      </div>
      <div class="case-grid">
    `;

    filtered.forEach(c => {
      const isDone = completedItems.has(c.id);
      const isSaved = savedItems.has(c.id);
      html += `
        <div class="case-card ${isDone ? 'case-done' : ''}" onclick="window.openCaseModal('${c.id}')">
          <div class="case-card-top">
            <div>
              <span class="level-pill level-${c.level.toLowerCase().replace('-', '')}">${c.level}</span>
              <div class="case-scale">Scale: ${c.scale}</div>
            </div>
            <div class="cb-group" onclick="event.stopPropagation()">
              <button class="cb-save ${isSaved ? 'saved' : ''}" data-save-id="${c.id}" onclick="window.toggleSaved('${c.id}', event)" title="Save">★</button>
              <button class="cb-done ${isDone ? 'checked' : ''}" data-done-id="${c.id}" onclick="window.toggleDone('${c.id}', event)" title="Mark done">
                ${isDone ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
              </button>
            </div>
          </div>
          <h3 class="case-title">${c.title}</h3>
          <div class="case-box">
            <strong>Clarify first:</strong>
            <p>${c.clarify}</p>
          </div>
          <div class="case-box">
            <strong>Key components:</strong>
            <p>${c.components}</p>
          </div>
          <div class="case-bottleneck">
            🔥 <strong>Real bottleneck:</strong> ${c.bottleneck}
          </div>
          <div class="case-footer">
            <span class="case-open-hint">Click for full deep-dive & follow-up Q&A →</span>
            ${c.gfgLink ? `<a href="${c.gfgLink}" target="_blank" rel="noopener" class="gfg-link" onclick="event.stopPropagation()">GFG Article ↗</a>` : ''}
          </div>
        </div>
      `;
    });

    html += `</div>`;
    mainContent.innerHTML = html;
  }

  // =========================================================================
  // VIEW 4: CLOUD MATRIX
  // =========================================================================
  function renderCloudMatrix() {
    const filtered = SD.cloudMatrix.filter(r => {
      return !searchQuery || r.concept.toLowerCase().includes(searchQuery) || r.aws.toLowerCase().includes(searchQuery) || r.azure.toLowerCase().includes(searchQuery) || r.gcp.toLowerCase().includes(searchQuery);
    });

    let html = `
      <div class="section-header-block">
        <div>
          <h1 class="section-title">☁️ Cloud Architecture Matrix — AWS vs Azure vs GCP</h1>
          <p class="section-desc">Transferable mental model: understand the CONCEPT first (e.g. Object Storage), then map it to whichever cloud the client uses. Don't memorize service names in isolation.</p>
        </div>
        <div class="cloud-legend">
          <span class="cloud-pill aws">AWS</span>
          <span class="cloud-pill azure">Azure</span>
          <span class="cloud-pill gcp">GCP</span>
        </div>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Architecture Concept</th>
              <th class="th-aws">Amazon Web Services</th>
              <th class="th-azure">Microsoft Azure</th>
              <th class="th-gcp">Google Cloud</th>
              <th>Use Case & When to Apply</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.map(r => `
              <tr>
                <td class="td-strong">${r.concept}</td>
                <td class="td-aws">${r.aws}</td>
                <td class="td-azure">${r.azure}</td>
                <td class="td-gcp">${r.gcp}</td>
                <td>${r.useCase}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
    mainContent.innerHTML = html;
  }

  // =========================================================================
  // VIEW 5: TECH DECISION TABLE
  // =========================================================================
  function renderDecisionTable() {
    const filtered = SD.decisionTable.filter(r => {
      return !searchQuery || r.problem.toLowerCase().includes(searchQuery) || r.primary.toLowerCase().includes(searchQuery) || r.alternative.toLowerCase().includes(searchQuery);
    });

    let html = `
      <div class="section-header-block">
        <div>
          <h1 class="section-title">📊 Complete Technology Decision Master Table</h1>
          <p class="section-desc">For every architectural layer: first consideration, valid alternative, and what to NEVER use blindly. The Golden Rule: justify with trade-offs, not trends.</p>
        </div>
        <span class="badge-count">${filtered.length} decisions</span>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Problem / Layer</th>
              <th class="th-green">✅ First Consideration</th>
              <th class="th-blue">🔄 Valid Alternative</th>
              <th class="th-red">⚠️ Don't Use Blindly</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.map(r => `
              <tr>
                <td class="td-strong">${r.problem}</td>
                <td class="td-green"><strong>${r.primary}</strong></td>
                <td class="td-blue">${r.alternative}</td>
                <td class="td-red">${r.avoid}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
    mainContent.innerHTML = html;
  }

  // =========================================================================
  // VIEW 6: TESTING STRATEGIES
  // =========================================================================
  function renderTesting() {
    let html = `
      <div class="section-header-block">
        <div>
          <h1 class="section-title">🧪 Testing Strategies & CI/CD Pipeline Design</h1>
          <p class="section-desc">A system without tests is a liability. Know the testing pyramid, when each type applies, and how to build a CI/CD pipeline that catches issues before production.</p>
        </div>
      </div>

      <div class="phase-group">
        <div class="phase-header" style="border-left-color:#f59e0b;">
          <div class="phase-header-left">
            <div class="phase-badge" style="background:#f59e0b20;color:#f59e0b;border:1px solid #f59e0b40;">Tests</div>
            <div>
              <div class="phase-title">10 Testing Categories — When, What & Which Tools</div>
              <div class="phase-tagline">Check off each type you understand and can discuss in an interview.</div>
            </div>
          </div>
        </div>
        ${SD.testingTypes.map(t => {
      const tid = 'test-' + t.type.replace(/\s+\/?\s*/g, '-').toLowerCase().replace(/[^a-z0-9-]/g, '');
      const isDone = completedItems.has(tid);
      const isSaved = savedItems.has(tid);
      return `
            <div class="topic-item ${isDone ? 'topic-done' : ''}">
              <div class="topic-item-top">
                <button class="cb-done ${isDone ? 'checked' : ''}"
                  data-done-id="${tid}"
                  onclick="window.toggleDone('${tid}', event)">
                  ${isDone ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
                </button>
                <div class="topic-item-content">
                  <div class="topic-item-title">${t.type}</div>
                  <div class="topic-item-desc">${t.what}</div>
                  <div class="topic-why"><strong>When to use:</strong> ${t.when}</div>
                  <div class="topic-resources">
                    <span class="res-link tag-code">Tools: ${t.tools}</span>
                  </div>
                </div>
                <button class="cb-save ${isSaved ? 'saved' : ''}"
                  data-save-id="${tid}"
                  onclick="window.toggleSaved('${tid}', event)">★</button>
              </div>
            </div>
          `;
    }).join('')}
      </div>

      <div class="phase-group">
        <div class="phase-header" style="border-left-color:#38bdf8;">
          <div class="phase-header-left">
            <div class="phase-badge" style="background:#38bdf820;color:#38bdf8;border:1px solid #38bdf840;">CI/CD</div>
            <div>
              <div class="phase-title">CI/CD Pipeline Architecture</div>
              <div class="phase-tagline">From git push to production — know every stage and its purpose.</div>
            </div>
          </div>
        </div>
        <div class="cicd-pipeline">
          ${[
        { step: '1', label: 'Git Push / PR', detail: 'Developer opens PR. Pre-commit hooks run linting and type checks locally.' },
        { step: '2', label: 'CI: Build', detail: 'Compile code, install deps, create optimized build artifact. Fail fast on syntax errors.' },
        { step: '3', label: 'CI: Unit Tests', detail: 'Isolated function tests with mocked deps. Fast (<60s). Cover 80%+ of business logic.' },
        { step: '4', label: 'CI: Integration Tests', detail: 'Real database (Testcontainers) + real services. Slower (2-10 min). Cover API contracts.' },
        { step: '5', label: 'CI: SAST Security Scan', detail: 'Snyk/Trivy scans code and Docker image for CVEs. Block deploy on critical severity.' },
        { step: '6', label: 'CI: Docker Build', detail: 'Multi-stage build produces slim runtime image. Push to ECR/ACR/GCR with git SHA tag.' },
        { step: '7', label: 'CD: Staging Deploy', detail: 'Auto-deploy to staging environment. Run E2E smoke tests against staging.' },
        { step: '8', label: 'CD: Manual Approval Gate', detail: 'Required for production. QA sign-off or tech lead approval before proceeding.' },
        { step: '9', label: 'CD: Canary Deploy (5%)', detail: 'Route 5% of traffic to new version. Monitor error rate and p99 latency for 15 min.' },
        { step: '10', label: 'CD: Full Rollout (100%)', detail: 'Roll out to 100% if canary metrics are healthy. Auto-rollback if error rate spikes.' }
      ].map(s => `
            <div class="cicd-step">
              <div class="cicd-num">${s.step}</div>
              <div class="cicd-content">
                <div class="cicd-label">${s.label}</div>
                <div class="cicd-detail">${s.detail}</div>
              </div>
            </div>
          `).join('<div class="cicd-arrow">↓</div>')}
        </div>
      </div>
    `;
    mainContent.innerHTML = html;
  }

  // =========================================================================
  // VIEW 7: LLD & DESIGN PATTERNS
  // =========================================================================
  function renderLld() {
    let html = `
      <div class="section-header-block">
        <div>
          <h1 class="section-title">📐 Low Level Design (LLD) & SOLID Principles</h1>
          <p class="section-desc">Class diagrams, design patterns, concurrency, and the 5 SOLID principles with real interview examples. LLD is asked directly at Amazon, Flipkart, Swiggy, and all Indian product companies.</p>
        </div>
      </div>

      <!-- SOLID Principles -->
      <div class="phase-group">
        <div class="phase-header" style="border-left-color:#e879f9;">
          <div class="phase-header-left">
            <div class="phase-badge" style="background:#e879f920;color:#e879f9;border:1px solid #e879f940;">SOLID</div>
            <div>
              <div class="phase-title">5 SOLID Principles — Definition, Violation & Fix</div>
              <div class="phase-tagline">The foundation of maintainable object-oriented code. Interviewers verify SOLID understanding in every LLD round.</div>
            </div>
          </div>
        </div>
        ${SD.solidPrinciples.map((p, idx) => {
      const pid = 'solid-' + idx;
      const isDone = completedItems.has(pid);
      const isSaved = savedItems.has(pid);
      return `
            <div class="topic-item ${isDone ? 'topic-done' : ''}">
              <div class="topic-item-top">
                <button class="cb-done ${isDone ? 'checked' : ''}" data-done-id="${pid}" onclick="window.toggleDone('${pid}', event)">
                  ${isDone ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
                </button>
                <div class="topic-item-content">
                  <div class="topic-item-title">${p.name}</div>
                  <div class="topic-item-desc">${p.definition}</div>
                  <div class="solid-violation"><strong>❌ Violation example:</strong> ${p.violation}</div>
                  <div class="solid-fix"><strong>✅ Correct approach:</strong> ${p.fix}</div>
                  <div class="topic-why"><strong>Interview angle:</strong> ${p.interviewAngle}</div>
                </div>
                <button class="cb-save ${isSaved ? 'saved' : ''}" data-save-id="${pid}" onclick="window.toggleSaved('${pid}', event)">★</button>
              </div>
            </div>
          `;
    }).join('')}
      </div>

      <!-- Classic LLD Problems -->
      <div class="phase-group">
        <div class="phase-header" style="border-left-color:#fbbf24;">
          <div class="phase-header-left">
            <div class="phase-badge" style="background:#fbbf2420;color:#fbbf24;border:1px solid #fbbf2440;">Problems</div>
            <div>
              <div class="phase-title">10 Classic LLD Interview Problems</div>
              <div class="phase-tagline">With classes, design patterns, concurrency handling, and the tricky edge case that separates candidates.</div>
            </div>
          </div>
        </div>
        ${SD.lldProblems.map(p => {
      const isDone = completedItems.has(p.id);
      const isSaved = savedItems.has(p.id);
      return `
            <div class="topic-item ${isDone ? 'topic-done' : ''}">
              <div class="topic-item-top">
                <button class="cb-done ${isDone ? 'checked' : ''}" data-done-id="${p.id}" onclick="window.toggleDone('${p.id}', event)">
                  ${isDone ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
                </button>
                <div class="topic-item-content">
                  <div class="topic-item-top-row">
                    <div class="topic-item-title">${p.title}</div>
                    <span class="level-pill level-${p.level.toLowerCase()}">${p.level}</span>
                  </div>
                  <div class="lld-section">
                    <strong>Classes:</strong>
                    <div class="lld-classes">${p.classes.map(c => `<span class="code-badge">${c}</span>`).join('')}</div>
                  </div>
                  <div class="lld-section">
                    <strong>Design Patterns Used:</strong>
                    <div class="lld-classes">${p.patterns.map(pt => `<span class="pattern-badge">${pt}</span>`).join('')}</div>
                  </div>
                  <div class="lld-section"><strong>Concurrency:</strong> <span class="lld-text">${p.concurrency}</span></div>
                  <div class="lld-tricky">💡 <strong>Tricky Part:</strong> ${p.tricky}</div>
                </div>
                <button class="cb-save ${isSaved ? 'saved' : ''}" data-save-id="${p.id}" onclick="window.toggleSaved('${p.id}', event)">★</button>
              </div>
            </div>
          `;
    }).join('')}
      </div>

      <!-- Design Patterns Quick Reference -->
      <div class="phase-group">
        <div class="phase-header" style="border-left-color:#34d399;">
          <div class="phase-header-left">
            <div class="phase-badge" style="background:#34d39920;color:#34d399;border:1px solid #34d39940;">Patterns</div>
            <div>
              <div class="phase-title">GoF Design Patterns Quick Reference</div>
              <div class="phase-tagline">The 23 Gang of Four patterns grouped by type with 1-line purpose and interview signal.</div>
            </div>
          </div>
        </div>
        <div class="pattern-groups">
          ${[
        {
          type: 'Creational', color: '#38bdf8',
          patterns: [
            { name: 'Singleton', purpose: 'One instance globally (DB connection, Logger)', signal: 'Ask: thread safety, lazy vs eager init' },
            { name: 'Factory Method', purpose: 'Delegate object creation to subclasses', signal: 'Ask: how to add new types without modifying factory' },
            { name: 'Abstract Factory', purpose: 'Family of related objects without specifying classes', signal: 'Cross-platform UI toolkit example' },
            { name: 'Builder', purpose: 'Construct complex objects step-by-step', signal: 'HTTP client builder, Query builder DSL' },
            { name: 'Prototype', purpose: 'Clone existing objects without coupling to their class', signal: 'Deep vs shallow copy' }
          ]
        },
        {
          type: 'Structural', color: '#a78bfa',
          patterns: [
            { name: 'Adapter', purpose: 'Convert incompatible interfaces to work together', signal: 'Legacy system integration, third-party API wrapping' },
            { name: 'Decorator', purpose: 'Add behavior to objects dynamically without subclassing', signal: 'Logging, auth, caching wrapping HTTP handlers' },
            { name: 'Proxy', purpose: 'Control access to an object (lazy init, auth, logging)', signal: 'ORM lazy loading, service mesh sidecar' },
            { name: 'Facade', purpose: 'Simplified interface to complex subsystem', signal: 'AWS SDK as facade to complex AWS API calls' },
            { name: 'Composite', purpose: 'Treat individual objects and compositions uniformly', signal: 'File system (files and folders behave the same)' },
            { name: 'Bridge', purpose: 'Decouple abstraction from implementation', signal: 'Database driver abstraction (JDBC interface)' },
            { name: 'Flyweight', purpose: 'Share common state to minimize memory use', signal: 'Character objects in a text editor, game sprites' }
          ]
        },
        {
          type: 'Behavioral', color: '#00e676',
          patterns: [
            { name: 'Observer', purpose: 'Notify multiple subscribers of state changes', signal: 'Event bus, React state management, DOM events' },
            { name: 'Strategy', purpose: 'Define family of algorithms, swap at runtime', signal: 'Payment method, sort algorithm, pricing strategy' },
            { name: 'Command', purpose: 'Encapsulate request as object (undo/redo)', signal: 'Text editor undo history, job queue' },
            { name: 'State', purpose: 'Object changes behavior when internal state changes', signal: 'Vending machine, traffic light, order status machine' },
            { name: 'Template Method', purpose: 'Define algorithm skeleton, let subclasses fill steps', signal: 'Framework hooks, data processing pipelines' },
            { name: 'Iterator', purpose: 'Access collection elements without exposing structure', signal: 'Java Iterator, database cursor, stream API' },
            { name: 'Chain of Responsibility', purpose: 'Pass request along chain of handlers', signal: 'HTTP middleware chain, logging pipeline, auth chain' },
            { name: 'Mediator', purpose: 'Centralize communication between objects', signal: 'Chat room, air traffic control, GUI event hub' },
            { name: 'Visitor', purpose: 'Add operations to objects without modifying classes', signal: 'AST node processing, report generation' },
            { name: 'Memento', purpose: 'Capture and restore object state (undo)', signal: 'Editor undo stack, game save state' },
            { name: 'Interpreter', purpose: 'Define grammar for simple language', signal: 'SQL parser, regex engine, expression evaluator' }
          ]
        }
      ].map(group => `
            <div class="pattern-group-box">
              <div class="pattern-group-title" style="color:${group.color};">${group.type} Patterns</div>
              ${group.patterns.map(p => `
                <div class="pattern-row">
                  <span class="pattern-name">${p.name}</span>
                  <span class="pattern-purpose">${p.purpose}</span>
                  <span class="pattern-signal">💡 ${p.signal}</span>
                </div>
              `).join('')}
            </div>
          `).join('')}
        </div>
      </div>
    `;
    mainContent.innerHTML = html;
  }

  // =========================================================================
  // VIEW 8: INTERVIEW PREP
  // =========================================================================
  function renderInterview() {
    const fw = SD.interviewFramework;
    let html = `
      <div class="section-header-block">
        <div>
          <h1 class="section-title">🎯 System Design Interview Mastery — 45-Minute Framework</h1>
          <p class="section-desc">The exact steps, timing, and language to use in a system design interview. Deloitte-specific advice included.</p>
        </div>
      </div>

      <!-- 45-Minute Steps -->
      <div class="phase-group">
        <div class="phase-header" style="border-left-color:#00e676;">
          <div class="phase-header-left">
            <div class="phase-badge" style="background:#00e67620;color:#00e676;border:1px solid #00e67640;">Framework</div>
            <div>
              <div class="phase-title">5-Step 45-Minute Interview Structure</div>
              <div class="phase-tagline">Master the timing and what to say at each step. Check each step as you practice it in mock interviews.</div>
            </div>
          </div>
        </div>
        ${fw.steps.map(s => {
      const sid = 'interview-' + s.id;
      const isDone = completedItems.has(sid);
      const isSaved = savedItems.has(sid);
      return `
            <div class="topic-item ${isDone ? 'topic-done' : ''}">
              <div class="topic-item-top">
                <button class="cb-done ${isDone ? 'checked' : ''}" data-done-id="${sid}" onclick="window.toggleDone('${sid}', event)">
                  ${isDone ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
                </button>
                <div class="topic-item-content">
                  <div class="topic-item-top-row">
                    <div class="topic-item-title">${s.phase}</div>
                    <span class="time-badge">${s.time}</span>
                  </div>
                  <ul class="do-list">
                    ${s.doThis.map(d => `<li>${d}</li>`).join('')}
                  </ul>
                  <div class="avoid-box">⚠️ <strong>Avoid:</strong> ${s.avoid}</div>
                </div>
                <button class="cb-save ${isSaved ? 'saved' : ''}" data-save-id="${sid}" onclick="window.toggleSaved('${sid}', event)">★</button>
              </div>
            </div>
          `;
    }).join('')}
      </div>

      <!-- Golden Questions -->
      <div class="phase-group">
        <div class="phase-header" style="border-left-color:#fbbf24;">
          <div class="phase-header-left">
            <div class="phase-badge" style="background:#fbbf2420;color:#fbbf24;border:1px solid #fbbf2440;">Q&A</div>
            <div>
              <div class="phase-title">The 6 Golden Interviewer Questions — How to Answer Each</div>
              <div class="phase-tagline">These are asked in nearly every system design interview. Have a crisp, confident answer ready.</div>
            </div>
          </div>
        </div>
        ${fw.goldenQuestions.map((q, idx) => `
          <div class="topic-item">
            <div class="topic-item-top">
              <div style="width:24px;flex-shrink:0;"></div>
              <div class="topic-item-content">
                <div class="topic-item-title">❓ ${q.q}</div>
                <div class="topic-why"><strong>How to answer:</strong> ${q.howToAnswer}</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Deloitte-Specific -->
      <div class="phase-group">
        <div class="phase-header" style="border-left-color:#38bdf8;">
          <div class="phase-header-left">
            <div class="phase-badge" style="background:#38bdf820;color:#38bdf8;border:1px solid #38bdf840;">Deloitte</div>
            <div>
              <div class="phase-title">Deloitte Consulting — What They Actually Look For</div>
              <div class="phase-tagline">Enterprise context, cloud migrations, multi-tenant SaaS, legacy integration, and regulatory compliance.</div>
            </div>
          </div>
        </div>
        <div class="checklist-block">
          ${fw.deloitteSpecific.map((item, idx) => {
      const did = 'deloitte-' + idx;
      const isDone = completedItems.has(did);
      return checkbox(did, item);
    }).join('')}
        </div>
      </div>

      <!-- The 5 Golden Questions for Every Component -->
      <div class="phase-group">
        <div class="phase-header" style="border-left-color:#e879f9;">
          <div class="phase-header-left">
            <div class="phase-badge" style="background:#e879f920;color:#e879f9;border:1px solid #e879f940;">Framework</div>
            <div>
              <div class="phase-title">The 5 Golden Questions for EVERY Component You Draw</div>
              <div class="phase-tagline">Ask these about every single box in your architecture diagram. This is how you think like a senior engineer.</div>
            </div>
          </div>
        </div>
        <div class="checklist-block">
          ${[
        '1. <strong>Why this?</strong> — What problem does this specific component solve?',
        '2. <strong>What alternative exists?</strong> — Name at least one alternative.',
        '3. <strong>Why did I NOT choose the alternative?</strong> — Specific trade-off.',
        '4. <strong>What happens when this component fails?</strong> — Failover strategy.',
        '5. <strong>What happens at 10× current scale?</strong> — Scaling path from here.'
      ].map((q, idx) => checkbox('golden-q-' + idx, q)).join('')}
        </div>
      </div>

      <!-- System Design Flow: 14 Steps -->
      <div class="phase-group">
        <div class="phase-header" style="border-left-color:#34d399;">
          <div class="phase-header-left">
            <div class="phase-badge" style="background:#34d39920;color:#34d399;border:1px solid #34d39940;">Process</div>
            <div>
              <div class="phase-title">Full 14-Step Design Flow (Requirements → Observability)</div>
              <div class="phase-tagline">The complete design process from requirement clarification to choosing technology. Only pick tools at Step 14.</div>
            </div>
          </div>
        </div>
        <div class="checklist-block">
          ${[
        'Step 1 — <strong>Clarify:</strong> Who uses it? How many? What problem exactly?',
        'Step 2 — <strong>Functional requirements:</strong> What does the system DO?',
        'Step 3 — <strong>Non-functional requirements:</strong> Scale, latency, availability, consistency.',
        'Step 4 — <strong>Estimate scale:</strong> DAU → QPS → Storage → Bandwidth.',
        'Step 5 — <strong>Define entities/data models:</strong> User, Order, Product, Payment...',
        'Step 6 — <strong>Define workflows:</strong> Step-by-step user journey through the system.',
        'Step 7 — <strong>Design APIs:</strong> Endpoints, request/response schemas, idempotency.',
        'Step 8 — <strong>Choose database:</strong> SQL or NoSQL? Which one? Justify with data shape.',
        'Step 9 — <strong>Draw high-level architecture:</strong> Client → LB → API Gateway → Services → DB.',
        'Step 10 — <strong>Performance optimizations:</strong> Caching, CDN, indexing, async processing.',
        'Step 11 — <strong>Scaling strategy:</strong> Horizontal, replicas, partitioning, sharding.',
        'Step 12 — <strong>Reliability:</strong> What can fail? Failover? Circuit breaker? Retry strategy?',
        'Step 13 — <strong>Security:</strong> Auth, authorization, rate limiting, encryption, secrets.',
        'Step 14 — <strong>Observability & technology choices:</strong> Logs, metrics, traces + justify every tool.'
      ].map((s, idx) => checkbox('flow-step-' + idx, s)).join('')}
        </div>
      </div>
    `;
    mainContent.innerHTML = html;
  }

  // =========================================================================
  // VIEW 9: BEHAVIORAL (STAR)
  // =========================================================================
  function renderBehavioral() {
    const filtered = SD.behavioralScenarios.filter(b => {
      return !searchQuery || b.question.toLowerCase().includes(searchQuery) || b.category.toLowerCase().includes(searchQuery);
    });

    let html = `
      <div class="section-header-block">
        <div>
          <h1 class="section-title">💬 Behavioral Interview (STAR Method)</h1>
          <p class="section-desc">Situation → Task → Action → Result → Lesson. 6 fully-worked scenarios covering production crises, disagreements, scaling, ambiguity, deadlines, and failures.</p>
        </div>
      </div>
    `;

    filtered.forEach(b => {
      const isDone = completedItems.has(b.id);
      const isSaved = savedItems.has(b.id);
      html += `
        <div class="beh-card ${isDone ? 'beh-done' : ''}">
          <div class="beh-card-header">
            <div>
              <span class="badge-tag">${b.category}</span>
              <div class="beh-question">${b.question}</div>
            </div>
            <div class="cb-group">
              <button class="cb-save ${isSaved ? 'saved' : ''}" data-save-id="${b.id}" onclick="window.toggleSaved('${b.id}', event)">★</button>
              <button class="cb-done ${isDone ? 'checked' : ''}" data-done-id="${b.id}" onclick="window.toggleDone('${b.id}', event)">
                ${isDone ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>` : '✓'}
              </button>
            </div>
          </div>
          <div class="star-grid">
            <div class="star-block star-s">
              <div class="star-label">Situation</div>
              <p>${b.situation}</p>
            </div>
            <div class="star-block star-t">
              <div class="star-label">Task</div>
              <p>${b.task}</p>
            </div>
            <div class="star-block star-a">
              <div class="star-label">Action</div>
              <p>${b.action}</p>
            </div>
            <div class="star-block star-r">
              <div class="star-label">Result</div>
              <p>${b.result}</p>
            </div>
          </div>
          <div class="beh-lesson">
            💡 <strong>Lesson learned:</strong> ${b.lessonLearned}
          </div>
        </div>
      `;
    });

    html += `
      <div class="phase-group" style="margin-top:24px;">
        <div class="phase-header" style="border-left-color:#f59e0b;">
          <div class="phase-header-left">
            <div class="phase-badge" style="background:#f59e0b20;color:#f59e0b;border:1px solid #f59e0b40;">Prep</div>
            <div>
              <div class="phase-title">Most Common Behavioral Questions — Prepare Your Own STAR Stories</div>
            </div>
          </div>
        </div>
        <div class="checklist-block">
          ${[
        'Production incident — walked through diagnosis, fix, and post-mortem',
        'Disagreed with a technical decision — used data to make case without personal conflict',
        'Delivered under a tight deadline — prioritized ruthlessly and communicated trade-offs',
        'Worked with ambiguous requirements — wrote assumptions, validated with stakeholder',
        'Led a cross-functional initiative — coordinated frontend, backend, infra, and PM',
        'Made a mistake — owned it, fixed it, and systemically prevented recurrence',
        'Onboarded a new team member or mentored a junior engineer',
        'Improved a process that was slowing the team down (CI, code review, deployment)',
        'Dealt with a difficult stakeholder / customer escalation',
        'Chose NOT to over-engineer — kept it simple when complexity was tempting'
      ].map((q, idx) => checkbox('beh-prep-' + idx, q)).join('')}
        </div>
      </div>
    `;

    mainContent.innerHTML = html;
  }

  // =========================================================================
  // VIEW 10: ENGINEERING BLOGS
  // =========================================================================
  function renderBlogs() {
    const filtered = SD.engineeringBlogs.filter(b => {
      const m = !searchQuery || b.company.toLowerCase().includes(searchQuery) || b.topics.toLowerCase().includes(searchQuery) || b.why.toLowerCase().includes(searchQuery);
      let f = true;
      if (currentFilter === 'completed') f = completedItems.has(b.id);
      else if (currentFilter === 'saved') f = savedItems.has(b.id);
      return m && f;
    });

    let html = `
      <div class="section-header-block">
        <div>
          <h1 class="section-title">📰 Real Engineering Blogs — What to Read & Why</h1>
          <p class="section-desc">Reading 2 real engineering blog posts a week separates textbook candidates from engineers who understand production trade-offs. Check each one you've explored.</p>
        </div>
        <span class="badge-count">${filtered.length} blogs</span>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th class="th-check">Read</th>
              <th class="th-check">Save</th>
              <th>Company Blog</th>
              <th>Topics They Write About</th>
              <th>Why Worth Your Time</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.map(b => {
      const isDone = completedItems.has(b.id);
      const isSaved = savedItems.has(b.id);
      return `
                <tr class="${isDone ? 'tr-done' : ''}">
                  <td class="td-check">
                    <button class="cb-done ${isDone ? 'checked' : ''}" data-done-id="${b.id}" onclick="window.toggleDone('${b.id}', event)">
                      ${isDone ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
                    </button>
                  </td>
                  <td class="td-check">
                    <button class="cb-save ${isSaved ? 'saved' : ''}" data-save-id="${b.id}" onclick="window.toggleSaved('${b.id}', event)">★</button>
                  </td>
                  <td class="td-strong">${b.company}</td>
                  <td style="color:#c9d1d9;font-size:0.82rem;">${b.topics}</td>
                  <td style="color:#a7f3d0;font-size:0.82rem;">${b.why}</td>
                  <td>
                    <div style="display:flex;flex-direction:column;gap:4px;">
                      <a href="${b.link}" target="_blank" rel="noopener" class="res-link tag-blog" style="white-space:nowrap;">Visit Blog ↗</a>
                      ${b.mustRead ? `<a href="${b.mustRead}" target="_blank" rel="noopener" class="res-link tag-doc" style="white-space:nowrap;">⭐ Must Read ↗</a>` : ''}
                    </div>
                  </td>
                </tr>
              `;
    }).join('')}
          </tbody>
        </table>
      </div>
    `;
    mainContent.innerHTML = html;
  }

  // =========================================================================
  // VIEW 11: ARCHITECTURE WIZARD (Detailed)
  // =========================================================================
  function renderWizard() {
    const questions = [
      {
        id: 'w-traffic', label: 'Expected Traffic Scale', options: [
          { value: 'tiny', label: '< 100 QPS', sub: 'Side project / internal tool / startup MVP' },
          { value: 'medium', label: '100 – 10,000 QPS', sub: 'Growing consumer app or B2B SaaS' },
          { value: 'high', label: '10k – 100k QPS', sub: 'Popular platform (Swiggy, Razorpay level)' },
          { value: 'massive', label: '> 100,000 QPS', sub: 'Netflix, Google, Amazon scale' }
        ]
      },
      {
        id: 'w-data', label: 'Primary Data Shape', options: [
          { value: 'relational', label: 'Relational / Financial (ACID)', sub: 'Users, Orders, Payments, Inventory — strict integrity' },
          { value: 'document', label: 'Semi-structured Documents', sub: 'Catalogs, Profiles, CMS, variable nested data' },
          { value: 'timeseries', label: 'Time-series / IoT / Events', sub: 'Logs, Metrics, Sensor data, Clickstream' },
          { value: 'graph', label: 'Highly connected Graph', sub: 'Social network, recommendations, fraud detection' }
        ]
      },
      {
        id: 'w-realtime', label: 'Client Interaction Pattern', options: [
          { value: 'rest', label: 'Standard REST / CRUD', sub: 'Request-Response: dashboards, CRUD forms, search' },
          { value: 'realtime', label: 'Real-time Bidirectional', sub: 'Chat, multiplayer games, live collaboration' },
          { value: 'streaming', label: 'Server Push / Feed', sub: 'Live notifications, activity feeds, progress streaming' }
        ]
      },
      {
        id: 'w-availability', label: 'Availability Requirement', options: [
          { value: 'std', label: '99.9% (8.7h downtime/year)', sub: 'Internal tools, B2B dashboards, dev environments' },
          { value: 'high', label: '99.99% (52 min/year)', sub: 'Consumer apps, e-commerce, SaaS platforms' },
          { value: 'ultra', label: '99.999% (5 min/year)', sub: 'Payment processing, healthcare, trading systems' }
        ]
      },
      {
        id: 'w-async', label: 'Async Processing Need', options: [
          { value: 'none', label: 'None / Minimal', sub: 'All operations are synchronous, results returned immediately' },
          { value: 'queue', label: 'Background Tasks (Queue)', sub: 'Email, PDF generation, image resize, notifications' },
          { value: 'stream', label: 'Event Streaming (Kafka)', sub: 'Multiple consumers, replay, audit log, analytics pipeline' }
        ]
      }
    ];

    let html = `
      <div class="section-header-block">
        <div>
          <h1 class="section-title">⚡ Interactive Architecture Decision Wizard</h1>
          <p class="section-desc">Answer 5 questions about your system requirements. Get an instantly generated, production-grade architecture blueprint with full justification for each choice.</p>
        </div>
      </div>

      <div class="wizard-wrap">
        ${questions.map(q => `
          <div class="wizard-q-block">
            <div class="wizard-q-label">${q.label}</div>
            <div class="wizard-options-row" id="${q.id}">
              ${q.options.map((opt, i) => `
                <div class="wizard-option ${i === 0 ? 'selected' : ''}" data-value="${opt.value}">
                  <div class="wo-label">${opt.label}</div>
                  <div class="wo-sub">${opt.sub}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}

        <button class="btn-generate" id="btn-generate-arch">
          🚀 Generate My Architecture Blueprint
        </button>

        <div class="wizard-output" id="wizard-output" style="display:none;"></div>
      </div>
    `;

    mainContent.innerHTML = html;

    // Option selection
    document.querySelectorAll('.wizard-options-row').forEach(row => {
      row.querySelectorAll('.wizard-option').forEach(opt => {
        opt.addEventListener('click', () => {
          row.querySelectorAll('.wizard-option').forEach(o => o.classList.remove('selected'));
          opt.classList.add('selected');
        });
      });
    });

    document.getElementById('btn-generate-arch').addEventListener('click', generateArchitecture);
  }

  function generateArchitecture() {
    const get = id => document.querySelector(`#${id} .selected`)?.dataset.value || '';
    const traffic = get('w-traffic');
    const data = get('w-data');
    const realtime = get('w-realtime');
    const avail = get('w-availability');
    const async_ = get('w-async');

    const decisions = {
      compute: traffic === 'massive' ? 'Kubernetes (EKS/GKE/AKS) with Horizontal Pod Autoscaler (HPA) + Cluster Autoscaler'
        : traffic === 'high' ? 'Docker on AWS ECS or managed K8s — scale app containers independently'
          : traffic === 'medium' ? 'Docker on AWS ECS Fargate (serverless containers, no cluster management)'
            : 'AWS Lambda (serverless) or single Docker container on App Service — cheapest at low scale',

      database: data === 'relational' ? 'PostgreSQL (AWS Aurora for managed HA with auto-failover) + PgBouncer connection pooler'
        : data === 'document' ? 'MongoDB Atlas or AWS DynamoDB (pay-per-request for variable load)'
          : data === 'timeseries' ? 'Apache Cassandra / TimescaleDB — write-optimized, time-partitioned'
            : 'Neo4j or AWS Neptune — native graph traversal at O(1) per hop',

      cache: traffic === 'tiny' ? 'In-process LRU cache (no Redis needed at this scale)'
        : traffic === 'massive' ? 'Redis Cluster (sharded) with 3 read replicas — 99.99% availability via Redis Sentinel'
          : 'Redis Standalone → add Redis Cluster when single node hits 80% memory',

      lb: traffic === 'massive' ? 'Layer 7 ALB (HTTP/2, path routing) + Layer 4 NLB (TCP, ultra-low latency) for different traffic types'
        : traffic === 'tiny' ? 'No load balancer needed initially — scale vertically first'
          : 'AWS ALB (Application Load Balancer) — handles SSL termination, sticky sessions, path routing',

      gateway: traffic !== 'tiny' ? 'API Gateway (Kong or AWS API Gateway) — auth, rate limiting, routing, logging at edge'
        : 'Skip API Gateway at tiny scale — add later when multiple clients or services emerge',

      messaging: async_ === 'stream' ? 'Apache Kafka (3-broker cluster, 3× replication factor) — durable event log, multi-consumer fan-out'
        : async_ === 'queue' ? 'AWS SQS + Dead Letter Queue (DLQ) — managed, auto-scales, pay-per-message'
          : 'No async messaging needed — keep synchronous and add later when operations become slow',

      realtime: realtime === 'realtime' ? 'WebSocket Gateway cluster with Redis Pub/Sub backplane (all gateways share session routing)'
        : realtime === 'streaming' ? 'Server-Sent Events (SSE) over HTTP/2 — simpler than WebSockets for one-directional push'
          : 'Standard HTTPS REST APIs — no persistent connection needed',

      availability: avail === 'ultra' ? 'Multi-Region Active-Active (Route 53 latency routing + global DB replication). RTO < 30s, RPO < 1min'
        : avail === 'high' ? 'Multi-AZ Active-Passive in primary region. Automated failover via Route 53 health checks. RTO < 5 min'
          : 'Single-AZ with automated DB backups. RTO < 30 min acceptable. Start simple, add HA as traffic grows',

      cdn: 'Cloudflare CDN (or AWS CloudFront) — static assets, images, and API response caching at edge. WAF included on Cloudflare Pro+',
      storage: 'AWS S3 (or GCS/Azure Blob) for all user-uploaded files, images, and media. Pre-signed URLs for secure browser-direct upload.',
      observability: 'OpenTelemetry SDK → Prometheus (metrics) + Jaeger (traces) + ELK Stack (logs). Alert on: p99 latency, error rate > 0.1%, CPU > 70%.'
    };

    const safetyChecks = [
      traffic !== 'tiny' && avail !== 'std' ? '✅ Design for failures: every external call has timeout + retry with exponential backoff + dead letter queue' : null,
      async_ !== 'none' ? '✅ All async operations are idempotent — safe to retry without side effects (Idempotency-Key on mutations)' : null,
      avail === 'ultra' ? '✅ Distributed transactions use SAGA pattern — no 2PC across services' : null,
      realtime !== 'rest' ? '✅ WebSocket / SSE gateway is stateless — user sessions stored in Redis, not in-process' : null,
      '✅ All secrets in AWS Secrets Manager or HashiCorp Vault — never in environment variables or source code',
      '✅ Database schema migrations use Expand-Contract pattern — no blocking ALTER TABLE in production',
      traffic !== 'tiny' ? '✅ Rate limiting per user/IP at API Gateway to prevent abuse and protect downstream services' : null
    ].filter(Boolean);

    const output = document.getElementById('wizard-output');
    output.style.display = 'block';
    output.innerHTML = `
      <h3 class="wizard-result-title">✅ Generated Architecture Blueprint</h3>

      <div class="result-grid">
        ${[
        { label: '🖥️ Compute & Orchestration', value: decisions.compute },
        { label: '🗄️ Primary Database', value: decisions.database },
        { label: '⚡ Caching Layer', value: decisions.cache },
        { label: '⚖️ Load Balancer', value: decisions.lb },
        { label: '🔀 API Gateway', value: decisions.gateway },
        { label: '📨 Messaging / Async', value: decisions.messaging },
        { label: '🔄 Real-Time Layer', value: decisions.realtime },
        { label: '🌍 Availability Strategy', value: decisions.availability },
        { label: '🌐 CDN & Edge', value: decisions.cdn },
        { label: '📁 File Storage', value: decisions.storage },
        { label: '🔍 Observability', value: decisions.observability }
      ].map(r => `
          <div class="result-row">
            <div class="result-label">${r.label}</div>
            <div class="result-value">${r.value}</div>
          </div>
        `).join('')}
      </div>

      <div class="result-safety">
        <div class="result-safety-title">🛡️ Production Safety Checklist for This Architecture</div>
        ${safetyChecks.map(c => `<div class="safety-item">${c}</div>`).join('')}
      </div>

      <div class="result-deloitte">
        <strong>💼 Deloitte Interview Justification:</strong> This architecture follows the Expand-Contract migration principle, uses cloud-agnostic concepts (the database is a managed relational store, not "Aurora specifically"), and delivers the stated SLA while remaining operable by a small team. It scales incrementally — no premature optimization.
      </div>
    `;

    output.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // =========================================================================
  // CASE STUDY MODAL
  // =========================================================================
  function openCaseModal(caseId) {
    const c = SD.caseStudies.find(x => x.id === caseId);
    if (!c) return;
    activeModal = caseId;

    modalTitle.textContent = c.title;
    modalLevel.textContent = c.level;
    modalLevel.className = `badge-level level-${c.level.toLowerCase().replace('-', '')}`;

    modalBody.innerHTML = `
      <div class="modal-meta">Scale: <strong>${c.scale}</strong></div>

      <h4>🎯 Clarify Requirements First</h4>
      <p>${c.clarify}</p>

      <h4>🏗️ Architecture Components</h4>
      <p>${c.components}</p>

      <div class="modal-bottleneck">
        🔥 <strong>The Real Bottleneck:</strong> ${c.bottleneck}
      </div>

      <h4>❓ Deep-Dive Q&A (Expect These Follow-ups)</h4>
      ${c.deepDive.map(d => `
        <div class="modal-qa">
          <div class="modal-q">Q: ${d.q}</div>
          <div class="modal-a">A: ${d.a}</div>
        </div>
      `).join('')}
    `;

    updateModalButtons(caseId);
    modalOverlay.classList.add('open');
  }
  window.openCaseModal = openCaseModal;

  function updateModalButtons(id) {
    modalDoneBtn.textContent = completedItems.has(id) ? '✓ Marked Complete — Click to Undo' : 'Mark as Completed ✓';
    modalSaveBtn.textContent = savedItems.has(id) ? '★ Saved — Click to Remove' : '☆ Save for Later';
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    activeModal = null;
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

  modalDoneBtn.addEventListener('click', () => {
    if (!activeModal) return;
    if (completedItems.has(activeModal)) completedItems.delete(activeModal);
    else completedItems.add(activeModal);
    persist();
    updateStats();
    updateModalButtons(activeModal);
    refreshCheckbox(activeModal, 'done');
  });

  modalSaveBtn.addEventListener('click', () => {
    if (!activeModal) return;
    if (savedItems.has(activeModal)) savedItems.delete(activeModal);
    else savedItems.add(activeModal);
    persist();
    updateStats();
    updateModalButtons(activeModal);
    refreshCheckbox(activeModal, 'saved');
  });

  // =========================================================================
  // GLOBAL WINDOW BINDINGS
  // =========================================================================
  window.toggleDone = toggleDone;
  window.toggleSaved = toggleSaved;

  // =========================================================================
  // INITIAL BOOT
  // =========================================================================
  updateStats();
  render();
});
