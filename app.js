const STORAGE_KEY = "simple-bodyweight-tracker:v1";
const REP_START = [4, 4, 4];
const REP_GOAL = [8, 8, 8];
const PLANK_START = 30;
const PLANK_GOAL = 60;
const PLANK_INCREMENT = 5;
const DEFAULT_PLAN_LABEL = "Complete beginner routine";
const WARM_UP_LINK = "http://www.startbodyweight.com/p/simple-dynamic-warm-up.html";
const STRETCHING_LINK = "http://www.startbodyweight.com/p/simple-static-stretching-routine.html";
const BASIC_ROUTINE_ITEMS = [
  { id: "warm_up", kind: "fixed", title: "Dynamic warm up", prescription: "10 min", note: "Chuẩn bị khớp, nhịp tim và biên độ vận động.", link: WARM_UP_LINK },
  { id: "squat", kind: "category", categoryId: "squat", title: "Appropriate variation from squat progression", prescription: "3 sets, 4-8 reps", note: "Rest 1-2 min between sets." },
  { id: "pull_up", kind: "category", categoryId: "pull_up", title: "Appropriate pull up variation", prescription: "3 sets, 4-8 reps", note: "Rest 1-2 min between sets." },
  { id: "handstand_push_up", kind: "category", categoryId: "handstand_push_up", title: "Appropriate handstand push up variation", prescription: "3 sets, 4-8 reps", note: "Rest 1-2 min between sets." },
  { id: "leg_raises", kind: "category", categoryId: "leg_raises", title: "Appropriate leg raises variation", prescription: "3 sets, 4-8 reps", note: "Rest 1-2 min between sets." },
  { id: "push_or_dip", kind: "alternating", title: "Appropriate push up variation or dip variation", prescription: "3 sets, 4-8 reps", note: "Alternate between push up and dip every completed session." },
  { id: "horizontal_pull", kind: "category", categoryId: "horizontal_pull", title: "Appropriate horizontal pull variation", prescription: "3 sets, 4-8 reps", note: "Rest 1-2 min between sets." },
  { id: "plank", kind: "category", categoryId: "plank", title: "Appropriate plank variation", prescription: "30-60s", note: "One plank hold." },
  { id: "static_stretching", kind: "fixed", title: "Static stretching", prescription: "10 min", note: "Kết thúc buổi tập.", link: STRETCHING_LINK },
];
const PROGRAM_TEMPLATES = [
  {
    id: "beginner",
    label: "Complete beginner routine",
    summary: "3 ngày/tuần, khóa bài nền tảng trong 8 tuần trước khi chuyển sang Basic routine.",
    lockedSetup: true,
    routineItems: [
      { id: "day_1", kind: "fixed", title: "DAY 1", prescription: "Warm up, squats, horizontal pulls, push ups, plank, stretches", note: "3 sets, 8-12 reps; 60s rest. Plank 30-60s.", link: WARM_UP_LINK },
      { id: "beginner_squat", kind: "category", categoryId: "squat", title: "Squat variation", prescription: "3 sets, 8-12 reps", note: "Day 1, Day 3, Day 5." },
      { id: "beginner_horizontal_pull", kind: "category", categoryId: "horizontal_pull", title: "Horizontal pull variation", prescription: "3 sets, 8-12 reps", note: "Day 1, Day 3, Day 5." },
      { id: "beginner_push_up", kind: "category", categoryId: "push_up", title: "Push up variation", prescription: "3 sets, 8-12 reps", note: "Day 1, Day 3, Day 5." },
      { id: "beginner_plank", kind: "category", categoryId: "plank", title: "Plank variation", prescription: "30-60s", note: "Day 1 and Day 5." },
      { id: "beginner_leg_raises", kind: "category", categoryId: "leg_raises", title: "Leg raises variation", prescription: "3 sets, 8-12 reps", note: "Day 3." },
      { id: "beginner_rest", kind: "fixed", title: "Rest days", prescription: "Day 2, Day 4, Day 6, Day 7", note: "Follow for at least 8 weeks.", link: STRETCHING_LINK },
    ],
  },
  {
    id: "basic",
    label: "Start Bodyweight basic routine",
    summary: "Full body bodyweight routine, 3 buổi/tuần.",
    lockedSetup: false,
    routineItems: BASIC_ROUTINE_ITEMS,
  },
  {
    id: "strength",
    label: "Strength split",
    summary: "2 day split, 4-5 ngày/tuần, 5x5 với nghỉ dài hơn.",
    lockedSetup: false,
    routineItems: [
      { id: "push_day", kind: "fixed", title: "DAY 1 / DAY 4 - PUSH", prescription: "Warm up, 5x5, 3 min rest, stretches", note: "Squats, handstand push ups, push ups, dips, leg raises.", link: WARM_UP_LINK },
      { id: "strength_squat", kind: "category", categoryId: "squat", title: "Squat variation", prescription: "5 sets x 5 reps", note: "Push day." },
      { id: "strength_hspu", kind: "category", categoryId: "handstand_push_up", title: "Handstand push up variation", prescription: "5 sets x 5 reps", note: "Push day." },
      { id: "strength_push_up", kind: "category", categoryId: "push_up", title: "Push up variation", prescription: "5 sets x 5 reps", note: "Push day." },
      { id: "strength_dip", kind: "category", categoryId: "dip", title: "Dip variation", prescription: "5 sets x 5 reps", note: "Push day." },
      { id: "strength_leg_raises", kind: "category", categoryId: "leg_raises", title: "Leg raises variation", prescription: "5 sets x 5 reps", note: "Push day." },
      { id: "pull_day", kind: "fixed", title: "DAY 2 / DAY 5 - PULL", prescription: "Warm up, 5x5, 3 min rest, plank, stretches", note: "Deadlifts are noted but not tracked in this bodyweight MVP.", link: STRETCHING_LINK },
      { id: "strength_pull_up", kind: "category", categoryId: "pull_up", title: "Pull up variation", prescription: "5 sets x 5 reps", note: "Pull day." },
      { id: "strength_horizontal_pull", kind: "category", categoryId: "horizontal_pull", title: "Horizontal pull variation", prescription: "5 sets x 5 reps", note: "Pull day." },
      { id: "strength_plank", kind: "category", categoryId: "plank", title: "Plank variation", prescription: "30-60s", note: "Pull day." },
    ],
  },
];

const progressions = [
  {
    id: "squat",
    title: "Squat progression",
    type: "reps",
    link: "http://www.startbodyweight.com/p/squat-progression.html",
    exercises: [
      "Assisted squats",
      "Deep assisted squats",
      "Squats",
      "Deep squats",
      "Bulgarian split squats",
      "Beginner shrimp squats / Airborne lunges",
      "Assisted one legged squats",
      "Balance assisted one legged squats",
      "Weighted one legged squats",
      "One-legged squats / Pistol squats",
      "Renegade pistols",
      "Intermediate shrimps",
      "Advanced shrimps",
    ],
  },
  {
    id: "pull_up",
    title: "Pull up progression",
    type: "reps",
    link: "http://www.startbodyweight.com/p/pull-up-progression.html",
    exercises: [
      "Leg assisted pull ups",
      "Jackknife pull ups",
      "Eccentric pull ups",
      "Half pull ups / Top half",
      "Pull ups",
      "Close grip pull ups",
      "Wide grip pull ups",
      "Archer pull ups",
      "Sternum pull ups",
      "Belly button pull ups",
      "One arm towel-assisted pull ups",
      "One arm towel-assisted pull ups and eccentrics",
      "Half one arm pull ups / Top half",
      "One arm pull ups",
    ],
  },
  {
    id: "handstand_push_up",
    title: "Handstand push up progression",
    type: "reps",
    link: "http://www.startbodyweight.com/p/handstand-push-up-progression.html",
    exercises: [
      "Incline pike push ups",
      "Incline pike diamond push ups",
      "Pike push ups",
      "Pike diamond push ups",
      "Decline pike push ups",
      "Decline pike diamond push ups",
      "Wall bent waist handstand push up",
      "Wall bent waist handstand diamond push ups",
      "Wall half handstand push up",
      "Wall handstand push ups",
      "Wall handstand diamond push ups",
      "Wall raised handstand push ups",
    ],
  },
  {
    id: "leg_raises",
    title: "Leg raises progression",
    type: "reps",
    link: "http://www.startbodyweight.com/p/leg-raises-progression.html",
    exercises: [
      "Flat knee raises",
      "Flat bent leg raises",
      "Flat straight leg raises",
      "Forearm knee raises",
      "Hanging knee raises",
      "Forearm bent leg raises",
      "Hanging bent leg raises",
      "Forearm straight leg raises",
      "Hanging straight leg raises",
      "Hanging bent leg V-raises",
      "Hanging straight leg V-raises / Toes to bar",
      "Hanging fan raises",
      "Hanging V-raise windshield wipers",
      "One arm hanging leg raises",
    ],
  },
  {
    id: "push_up",
    title: "Push up progression",
    type: "reps",
    link: "http://www.startbodyweight.com/p/push-up-progression.html",
    exercises: [
      "Wall push ups",
      "Box push ups",
      "Three quarter push ups",
      "Three quarters push ups + 5s eccentric push up",
      "Push ups",
      "Elbows in push ups",
      "Diamond push ups",
      "Uneven push ups",
      "Decline push ups",
      "Decline elbows in push ups",
      "Decline diamond push ups",
      "Wall one arm push ups",
      "Incline one arm push ups",
      "One arm push ups",
      "Decline one arm push ups",
    ],
  },
  {
    id: "dip",
    title: "Dip progression",
    type: "reps",
    link: "http://www.startbodyweight.com/p/dip-progression.html",
    exercises: [
      "Bent knee bench dips",
      "Straight legs bench dips",
      "One elevated leg, straight legs bench dips",
      "Elevated legs bench dips",
      "One extended leg, elevated legs bench dips",
      "Legs supported dips",
      "One leg supported dips",
      "Jumping and 5s eccentric dips",
      "Half dips / Top half",
      "Dips",
      "Legs forward dips",
      "Modified Russian dips",
      "Russian dips / Chicken dips",
    ],
  },
  {
    id: "horizontal_pull",
    title: "Horizontal pulls progression",
    type: "reps",
    link: "http://www.startbodyweight.com/p/horizontal-pulls-progression.html",
    exercises: [
      "Vertical pulls / Door pulls / Let me ins",
      "Vertical pulls with a towel",
      "Inverted rows legs bent",
      "Inverted rows, straight legs",
      "Inverted rows, one leg extended",
      "Inverted rows legs elevated",
      "Inverted rows legs elevated, one leg extended",
      "Tuck knees, front lever rows",
      "Advanced tuck knees, front lever rows",
      "One tuck knee, one leg extended, front lever rows",
      "Straddle legs front lever rows",
      "Front lever rows",
    ],
  },
  {
    id: "plank",
    title: "Plank progression",
    type: "seconds",
    link: "http://www.startbodyweight.com/p/plank-progression.html",
    exercises: [
      "Kneeling plank",
      "Kneeling side plank",
      "Plank",
      "Side plank",
      "Decline plank",
      "Leg lift plank",
      "Arm and leg lift plank",
      "Arm and leg lift side plank",
      "Wall plank",
    ],
  },
];

let state = loadState();
let view = { name: hasSavedPlan(state) ? "home" : "plan", programId: state.programId || "beginner", draftExercises: null, categoryId: null, editingHistoryId: null, completion: null };

const app = document.querySelector("#app");

function defaultState() {
  const currentExercises = {};
  const progress = {};

  progressions.forEach((category) => {
    currentExercises[category.id] = 0;
    progress[category.id] = category.type === "seconds"
      ? { lastResult: null, nextTarget: PLANK_START }
      : { lastResult: null, nextTarget: [...REP_START] };
  });

  return {
    plan: "",
    planLabel: "",
    planMode: "sample",
    programId: "beginner",
    routineItems: createRoutineItems("beginner"),
    nextAlternatingSlot: "push_up",
    currentExercises,
    progress,
    history: [],
  };
}

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return normalizeState(stored || defaultState());
  } catch {
    return defaultState();
  }
}

function normalizeState(input) {
  const base = defaultState();
  const merged = {
    ...base,
    ...input,
    planLabel: input.planLabel || input.plan || "",
    planMode: "sample",
    programId: getProgramTemplate(input.programId || "beginner").id,
    routineItems: normalizeRoutineItems(input.routineItems, input.programId || "beginner"),
    nextAlternatingSlot: input.nextAlternatingSlot === "dip" ? "dip" : "push_up",
    currentExercises: { ...base.currentExercises, ...(input.currentExercises || {}) },
    progress: { ...base.progress, ...(input.progress || {}) },
    history: Array.isArray(input.history) ? input.history : [],
  };

  progressions.forEach((category) => {
    const entry = merged.progress[category.id] || base.progress[category.id];
    merged.currentExercises[category.id] = clampNumber(
      Number(merged.currentExercises[category.id] || 0),
      0,
      category.exercises.length - 1,
    );
    merged.progress[category.id] = category.type === "seconds"
      ? {
          lastResult: entry.lastResult === null || entry.lastResult === undefined ? null : Number(entry.lastResult),
          nextTarget: Number(entry.nextTarget || PLANK_START),
        }
      : {
          lastResult: Array.isArray(entry.lastResult) ? sanitizeRepArray(entry.lastResult) : null,
          nextTarget: sanitizeRepArray(entry.nextTarget || REP_START),
        };
  });

  return merged;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function setView(nextView) {
  view = { ...view, ...nextView };
  render();
}

function render() {
  if (!hasSavedPlan(state) || view.name === "plan") {
    renderPlan();
    return;
  }

  if (view.name === "list") renderExerciseList();
  if (view.name === "track") renderTrack();
  if (view.name === "complete") renderCompletion();
  if (view.name === "accumulation") renderAccumulation();
  if (view.name === "home") renderHome();
}

function renderPlan() {
  const program = getProgramTemplate(view.programId || state.programId || "beginner");
  const routineItems = createRoutineItems(program.id);
  const draftExercises = { ...state.currentExercises, ...(view.draftExercises || {}) };
  app.innerHTML = `
    <section class="screen">
      <div class="topbar">
        <div class="brand">
          <p class="eyebrow">Simple Bodyweight Tracker</p>
          <h1>${hasSavedPlan(state) ? "Sửa plan" : "Plan tập của bạn"}</h1>
        </div>
        ${hasSavedPlan(state) ? `<button class="btn ghost" data-action="home">Quay lại</button>` : ""}
      </div>
      <div class="program-options">
        ${PROGRAM_TEMPLATES.map((template) => `
          <button class="program-card ${template.id === program.id ? "selected" : ""}" data-action="program-option" data-program="${template.id}">
            <strong>${escapeHtml(template.label)}</strong>
            <span>${escapeHtml(template.summary)}</span>
          </button>
        `).join("")}
      </div>
      ${renderGuidanceLinks(program)}
      <div class="panel">
        <p class="eyebrow">${program.lockedSetup ? "Routine nền tảng đã khóa" : "Chọn variation bằng thanh trượt"}</p>
        <h2>${escapeHtml(program.label)}</h2>
        <p class="muted">${program.lockedSetup ? "Complete beginner chỉ tập các nhóm bài được liệt kê để xây nền. Không chọn variation ở bước setup." : "Mỗi trường progression chỉ hiện khoảng 4 bài một lúc. Kéo trong danh sách để chọn bài phù hợp hiện tại."}</p>
      </div>
      <form class="form" data-form="plan" data-program="${program.id}">
        <div class="routine-editor">
          ${routineItems.map((item) => renderRoutineSetupItem(item, draftExercises, program)).join("")}
        </div>
        <button class="btn primary" type="submit">Lưu plan</button>
      </form>
    </section>
  `;
}

function renderHome() {
  const readyCount = progressions.filter((category) => isReadyToAdvance(category)).length;
  app.innerHTML = `
    <section class="screen">
      <div class="hero">
        <div class="hero-content">
          <p class="eyebrow">Simple Bodyweight Tracker</p>
          <h1>Hôm nay tập gì?</h1>
          <div class="panel">
            <p class="eyebrow">Plan hiện tại</p>
            <h2>${escapeHtml(getPlanLabel())}</h2>
            <p class="plan-text">${escapeHtml(formatRoutineSummary())}</p>
            ${readyCount ? `<p class="notice">${readyCount} progression đã đủ điều kiện lên bài mới.</p>` : ""}
            <div class="actions">
              <button class="btn primary" data-action="list">Bắt đầu buổi tập</button>
              <button class="btn" data-action="accumulation">Tích lũy</button>
              <button class="btn" data-action="edit-plan">Sửa plan</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderExerciseList() {
  app.innerHTML = `
    <section class="screen">
      ${topbar("Chọn bài tập", "home")}
      <div class="list">
        ${state.routineItems.map((item, index) => renderWorkoutRow(item, index)).join("")}
      </div>
    </section>
  `;
}

function renderTrack() {
  const category = getCategory(view.categoryId);
  if (!category) {
    setView({ name: "list", categoryId: null });
    return;
  }

  const progress = state.progress[category.id];
  const exercise = getCurrentExercise(category);
  const target = progress.nextTarget;
  const historyItem = view.editingHistoryId ? state.history.find((item) => item.id === view.editingHistoryId) : null;
  const initial = historyItem ? historyItem.result : target;

  app.innerHTML = `
    <section class="screen">
      ${topbar(category.title, "list")}
      <div class="panel">
        <p class="eyebrow">Bài hiện tại</p>
        <h2>${escapeHtml(exercise)}</h2>
        <div class="summary-grid">
          <div class="metric"><span>Mục tiêu hôm nay</span><strong>${formatResult(target, category.type)}</strong></div>
          <div class="metric"><span>Lần gần nhất</span><strong>${formatResult(progress.lastResult, category.type)}</strong></div>
          <div class="metric"><span>Mục tiêu lên bài</span><strong>${formatGoal(category.type)}</strong></div>
        </div>
        <a class="link" href="${category.link}" target="_blank" rel="noreferrer">Xem hướng dẫn</a>
      </div>
      <form class="panel form" data-form="track" data-category="${category.id}" data-history-id="${view.editingHistoryId || ""}">
        <p class="eyebrow">Nhập kết quả</p>
        ${category.type === "seconds" ? renderSecondsInput(Number(initial || PLANK_START)) : renderRepInputs(initial)}
        <button class="btn primary" type="submit">${historyItem ? "Lưu chỉnh sửa" : "Hoàn thành"}</button>
      </form>
    </section>
  `;
}

function renderRepInputs(values) {
  return `
    <div class="set-grid">
      ${sanitizeRepArray(values).map((value, index) => `
        <label class="set-row">
          <span>Set ${index + 1}</span>
          <button class="stepper" type="button" data-action="step" data-target="set-${index}" data-delta="-1">−</button>
          <input id="set-${index}" name="set-${index}" type="number" min="0" max="99" inputmode="numeric" value="${value}" />
          <button class="stepper" type="button" data-action="step" data-target="set-${index}" data-delta="1">+</button>
        </label>
      `).join("")}
    </div>
  `;
}

function renderSecondsInput(value) {
  return `
    <label class="set-row">
      <span>Giây</span>
      <button class="stepper" type="button" data-action="step" data-target="seconds" data-delta="-5">−</button>
      <input id="seconds" name="seconds" type="number" min="0" max="999" inputmode="numeric" value="${value}" />
      <button class="stepper" type="button" data-action="step" data-target="seconds" data-delta="5">+</button>
    </label>
  `;
}

function renderCompletion() {
  const completion = view.completion;
  if (!completion) {
    setView({ name: "list" });
    return;
  }

  const category = getCategory(completion.categoryId);
  const nextExercise = getNextExercise(category);
  app.innerHTML = `
    <section class="screen">
      ${topbar("Đã lưu kết quả", "list")}
      <div class="panel">
        <p class="eyebrow">${escapeHtml(category.title)}</p>
        <h2>${escapeHtml(completion.exerciseName)}</h2>
        <div class="summary-grid">
          <div class="metric"><span>Bạn đã đạt</span><strong>${formatResult(completion.result, category.type)}</strong></div>
          <div class="metric"><span>Mục tiêu buổi sau</span><strong>${formatResult(state.progress[category.id].nextTarget, category.type)}</strong></div>
        </div>
        ${completion.ready && nextExercise ? `
          <div class="notice">
            Bạn đủ điều kiện chuyển sang: <strong>${escapeHtml(nextExercise)}</strong>
          </div>
          <div class="actions">
            <button class="btn primary" data-action="advance" data-category="${category.id}">Chuyển sang bài tiếp theo</button>
            <button class="btn" data-action="list">Để sau</button>
          </div>
        ` : `
          <p class="muted">Kết quả đã được lưu vào lịch sử.</p>
          <div class="actions">
            <button class="btn primary" data-action="list">Tiếp tục buổi tập</button>
            <button class="btn" data-action="accumulation">Tích lũy</button>
          </div>
        `}
      </div>
    </section>
  `;
}

function renderAccumulation() {
  const recent = state.history[0];
  app.innerHTML = `
    <section class="screen">
      ${topbar("Tích lũy", "home")}
      <div class="list">
        ${progressions.map((category) => {
          const progress = state.progress[category.id];
          const ready = isReadyToAdvance(category);
          return `
            <div class="panel">
              <div class="topbar">
                <div class="brand">
                  <h3>${escapeHtml(category.title)}</h3>
                  <p class="muted">Hiện tại: ${escapeHtml(getCurrentExercise(category))}</p>
                </div>
                <span class="${ready ? "status-pill ready" : "target-pill"}">${ready ? "Đủ lên bài" : progressPercent(category) + "%"}</span>
              </div>
              <div class="summary-grid">
                <div class="metric"><span>Lần gần nhất</span><strong>${formatResult(progress.lastResult, category.type)}</strong></div>
                <div class="metric"><span>Mục tiêu kế tiếp</span><strong>${formatResult(progress.nextTarget, category.type)}</strong></div>
                <div class="metric"><span>Cần đạt</span><strong>${formatGoal(category.type)}</strong></div>
              </div>
              ${ready && getNextExercise(category) ? `<p class="notice">Gợi ý: chuyển sang ${escapeHtml(getNextExercise(category))}</p>` : ""}
            </div>
          `;
        }).join("")}
      </div>
      <div class="panel">
        <h2>Lịch sử gần nhất</h2>
        ${recent ? renderHistoryItem(recent) : `<p class="muted">Chưa có buổi tập nào được lưu.</p>`}
      </div>
    </section>
  `;
}

function renderHistoryItem(item) {
  const category = getCategory(item.category);
  return `
    <div class="history-row">
      <span>
        <strong>${escapeHtml(item.exerciseName)}</strong><br />
        <span class="muted">${formatDate(item.date)} · ${formatResult(item.result, category.type)}</span>
      </span>
      <button class="btn" data-action="edit-history" data-history-id="${item.id}">Sửa</button>
    </div>
  `;
}

function topbar(title, backAction) {
  return `
    <div class="topbar">
      <div class="brand">
        <p class="eyebrow">Simple Bodyweight Tracker</p>
        <h1>${escapeHtml(title)}</h1>
      </div>
      <button class="btn ghost" data-action="${backAction}">Quay lại</button>
    </div>
  `;
}

function completeExercise(category, result, historyId = null) {
  const exerciseName = getCurrentExercise(category);
  const existingHistory = historyId ? state.history.find((item) => item.id === historyId) : null;
  const ready = hasReachedGoal(category, result);
  const nextTarget = ready
    ? result
    : category.type === "seconds"
      ? nextSecondsTarget(result, state.progress[category.id].nextTarget)
      : nextRepTarget(result, state.progress[category.id].nextTarget);

  state.progress[category.id] = {
    lastResult: Array.isArray(result) ? [...result] : result,
    nextTarget: Array.isArray(nextTarget) ? [...nextTarget] : nextTarget,
  };

  const historyEntry = {
    id: historyId || crypto.randomUUID(),
    date: existingHistory ? existingHistory.date : todayIso(),
    category: category.id,
    exerciseIndex: existingHistory ? existingHistory.exerciseIndex : state.currentExercises[category.id],
    exerciseName: existingHistory ? existingHistory.exerciseName : exerciseName,
    result: Array.isArray(result) ? [...result] : result,
  };

  if (historyId) {
    state.history = state.history.map((item) => item.id === historyId ? historyEntry : item);
  } else {
    state.history = [historyEntry, ...state.history];
    if (category.id === state.nextAlternatingSlot && (category.id === "push_up" || category.id === "dip")) {
      state.nextAlternatingSlot = category.id === "push_up" ? "dip" : "push_up";
    }
  }

  saveState();
  setView({
    name: "complete",
    editingHistoryId: null,
    completion: {
      categoryId: category.id,
      exerciseName,
      result,
      ready,
    },
  });
}

function advanceExercise(categoryId) {
  const category = getCategory(categoryId);
  const current = state.currentExercises[category.id];
  if (current < category.exercises.length - 1) {
    state.currentExercises[category.id] = current + 1;
    state.progress[category.id] = category.type === "seconds"
      ? { lastResult: null, nextTarget: PLANK_START }
      : { lastResult: null, nextTarget: [...REP_START] };
    saveState();
  }
  setView({ name: "list", completion: null });
}

function nextRepTarget(result, currentTarget) {
  const sanitizedResult = sanitizeRepArray(result);
  const target = sanitizeRepArray(currentTarget);
  if (!meetsOrExceeds(sanitizedResult, target)) return target;
  if (meetsOrExceeds(sanitizedResult, REP_GOAL)) return REP_GOAL;

  const next = [...target];
  const lowest = Math.min(...next.filter((value) => value < REP_GOAL[0]));
  const index = next.findIndex((value) => value === lowest);
  if (index !== -1) next[index] += 1;
  return next;
}

function nextSecondsTarget(result, currentTarget) {
  const target = Number(currentTarget || PLANK_START);
  const achieved = Number(result || 0);
  if (achieved < target) return target;
  if (achieved >= PLANK_GOAL) return PLANK_GOAL;
  return Math.min(PLANK_GOAL, target + PLANK_INCREMENT);
}

function hasReachedGoal(category, result) {
  if (category.type === "seconds") return Number(result || 0) >= PLANK_GOAL;
  return meetsOrExceeds(sanitizeRepArray(result), REP_GOAL);
}

function isReadyToAdvance(category) {
  const result = state.progress[category.id].lastResult;
  return result !== null && hasReachedGoal(category, result) && Boolean(getNextExercise(category));
}

function progressPercent(category) {
  const progress = state.progress[category.id];
  if (category.type === "seconds") {
    const value = Number(progress.lastResult || 0);
    return Math.round(clampNumber(((value - PLANK_START) / (PLANK_GOAL - PLANK_START)) * 100, 0, 100));
  }

  const value = sanitizeRepArray(progress.lastResult || REP_START).reduce((sum, rep) => sum + rep, 0);
  const start = REP_START.reduce((sum, rep) => sum + rep, 0);
  const goal = REP_GOAL.reduce((sum, rep) => sum + rep, 0);
  return Math.round(clampNumber(((value - start) / (goal - start)) * 100, 0, 100));
}

function getCategory(id) {
  return progressions.find((category) => category.id === id);
}

function getPlanLabel() {
  return state.planLabel || state.plan || DEFAULT_PLAN_LABEL;
}

function hasSavedPlan(value) {
  return Boolean(value.planLabel || value.plan);
}

function getProgramTemplate(id) {
  return PROGRAM_TEMPLATES.find((template) => template.id === id) || PROGRAM_TEMPLATES[0];
}

function createRoutineItems(programId = "basic") {
  return getProgramTemplate(programId).routineItems.map((item) => ({ ...item }));
}

function normalizeRoutineItems(items, programId = "basic") {
  const requiredItems = createRoutineItems(programId);
  const source = Array.isArray(items) ? items : [];
  return requiredItems.map((required) => {
    const saved = source.find((item) => item && item.id === required.id) || {};
    return {
      ...required,
      title: String(saved.title || required.title).trim() || required.title,
      prescription: String(saved.prescription || required.prescription).trim() || required.prescription,
      note: String(saved.note || required.note).trim(),
    };
  });
}

function getLockedProgramExerciseDefaults(program) {
  if (!program.lockedSetup) return {};
  const defaults = {};
  program.routineItems.forEach((item) => {
    if (item.kind === "category" && item.categoryId) defaults[item.categoryId] = 0;
  });
  return defaults;
}

function getProgramGuidanceLinks(program) {
  const links = [
    { id: "warm_up", title: "Dynamic warm up", href: WARM_UP_LINK },
    { id: "static_stretching", title: "Static stretching", href: STRETCHING_LINK },
  ];
  const categoryIds = new Set();

  program.routineItems.forEach((item) => {
    if (item.kind === "category" && item.categoryId) categoryIds.add(item.categoryId);
    if (item.kind === "alternating") {
      categoryIds.add("push_up");
      categoryIds.add("dip");
    }
  });

  categoryIds.forEach((categoryId) => {
    const category = getCategory(categoryId);
    if (category) links.push({ id: category.id, title: category.title, href: category.link });
  });

  return links;
}

function renderGuidanceLinks(program) {
  return `
    <div class="panel guide-panel">
      <div class="brand">
        <p class="eyebrow">Hướng dẫn trước khi chọn plan</p>
        <h2>Xem độ khó và kỹ thuật</h2>
      </div>
      <div class="guide-links">
        ${getProgramGuidanceLinks(program).map((guide) => `
          <a class="guide-link" href="${guide.href}" target="_blank" rel="noreferrer">${escapeHtml(guide.title)}</a>
        `).join("")}
      </div>
    </div>
  `;
}

function formatRoutineSummary() {
  return state.routineItems
    .map((item) => `${item.title}: ${item.prescription}`)
    .join("\n");
}

function getRoutineCategory(item) {
  if (item.kind === "alternating") return getCategory(state.nextAlternatingSlot);
  if (item.kind === "category") return getCategory(item.categoryId);
  return null;
}

function renderRoutineSetupItem(item, draftExercises, program) {
  if (item.kind === "alternating") {
    return `
      <div class="routine-item">
        <p class="eyebrow">${escapeHtml(item.title)}</p>
        <strong>${escapeHtml(item.prescription)}</strong>
        <span class="muted">${escapeHtml(item.note)}</span>
        <h3>Push up variation</h3>
        ${renderVariationScroller(getCategory("push_up"), draftExercises)}
        <h3>Dip variation</h3>
        ${renderVariationScroller(getCategory("dip"), draftExercises)}
      </div>
    `;
  }

  const category = getRoutineCategoryForSetup(item);
  if (!category) {
    return `
      <div class="routine-item routine-fixed">
        <p class="eyebrow">${escapeHtml(item.title)}</p>
        <strong>${escapeHtml(item.prescription)}</strong>
        <span class="muted">${escapeHtml(item.note)}</span>
        ${item.link ? `<a class="link" href="${item.link}" target="_blank" rel="noreferrer">Xem hướng dẫn</a>` : ""}
      </div>
    `;
  }

  if (program.lockedSetup) {
    return `
      <div class="routine-item routine-fixed">
        <p class="eyebrow">${escapeHtml(item.title)}</p>
        <strong>${escapeHtml(item.prescription)}</strong>
        <span class="muted">${escapeHtml(item.note)}</span>
        <span class="target-pill">${escapeHtml(category.exercises[0])}</span>
      </div>
    `;
  }

  return `
    <div class="routine-item">
      <p class="eyebrow">${escapeHtml(item.title)}</p>
      <strong>${escapeHtml(item.prescription)}</strong>
      <span class="muted">${escapeHtml(item.note)}</span>
      ${renderVariationScroller(category, draftExercises)}
    </div>
  `;
}

function getRoutineCategoryForSetup(item) {
  if (item.kind === "alternating") return null;
  if (item.kind === "category") return getCategory(item.categoryId);
  return null;
}

function renderVariationScroller(category, draftExercises) {
  const selectedIndex = clampNumber(Number(draftExercises[category.id] || 0), 0, category.exercises.length - 1);
  return `
    <input type="hidden" name="${category.id}-exercise" value="${selectedIndex}" />
    <div class="variation-list" role="listbox" aria-label="${escapeHtml(category.title)}">
      ${category.exercises.map((exercise, index) => `
        <button
          class="variation-option ${index === selectedIndex ? "selected" : ""}"
          type="button"
          role="option"
          aria-selected="${index === selectedIndex ? "true" : "false"}"
          data-action="variation"
          data-category="${category.id}"
          data-index="${index}"
        >
          <span>${index + 1}</span>
          <strong>${escapeHtml(exercise)}</strong>
        </button>
      `).join("")}
    </div>
  `;
}

function renderWorkoutRow(item, index) {
  const category = getRoutineCategory(item);
  const number = `${index + 1}.`;

  if (!category) {
    return `
      <div class="exercise-row routine-static">
        <span class="row-main">
          <strong>${number} ${escapeHtml(item.title)}</strong>
          <span class="row-meta">${escapeHtml(item.note)}</span>
          ${item.link ? `<a class="link" href="${item.link}" target="_blank" rel="noreferrer">Xem hướng dẫn</a>` : ""}
        </span>
        <span class="target-pill">${escapeHtml(item.prescription)}</span>
      </div>
    `;
  }

  const exercise = getCurrentExercise(category);
  const progress = state.progress[category.id];
  const ready = isReadyToAdvance(category);
  const alternatingNote = item.kind === "alternating" ? `Luân phiên: hôm nay ${category.id === "push_up" ? "push up" : "dip"}` : item.note;
  return `
    <button class="exercise-row" data-action="track" data-category="${category.id}">
      <span class="row-main">
        <strong>${number} ${escapeHtml(item.title)}</strong>
        <span class="row-meta">${escapeHtml(alternatingNote)}</span>
        <span class="row-meta">Hiện tại: ${escapeHtml(exercise)}</span>
        ${ready ? `<span class="row-meta">Gợi ý: chuyển sang ${escapeHtml(getNextExercise(category) || "bài cuối")}</span>` : ""}
      </span>
      <span class="${ready ? "status-pill ready" : "target-pill"}">${ready ? "Đủ lên bài" : formatResult(progress.nextTarget, category.type)}</span>
    </button>
  `;
}

function getCurrentExercise(category) {
  return category.exercises[state.currentExercises[category.id]] || category.exercises[0];
}

function getNextExercise(category) {
  return category.exercises[state.currentExercises[category.id] + 1] || "";
}

function sanitizeRepArray(value) {
  const source = Array.isArray(value) ? value : REP_START;
  return [0, 1, 2].map((index) => clampNumber(Number(source[index] ?? REP_START[index]), 0, 99));
}

function meetsOrExceeds(result, target) {
  return target.every((targetValue, index) => Number(result[index] || 0) >= targetValue);
}

function clampNumber(value, min, max) {
  if (Number.isNaN(value)) return min;
  return Math.max(min, Math.min(max, value));
}

function formatResult(result, type) {
  if (result === null || result === undefined) return type === "seconds" ? `${PLANK_START}s` : REP_START.join(",");
  if (type === "seconds") return `${Number(result)}s`;
  return sanitizeRepArray(result).join(",");
}

function formatGoal(type) {
  return type === "seconds" ? `${PLANK_GOAL}s` : REP_GOAL.join(",");
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(value) {
  return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(value));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

app.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const action = button.dataset.action;

  if (action === "home") setView({ name: "home", completion: null, editingHistoryId: null });
  if (action === "list") setView({ name: "list", completion: null, editingHistoryId: null });
  if (action === "accumulation") setView({ name: "accumulation", completion: null, editingHistoryId: null });
  if (action === "edit-plan") setView({ name: "plan" });
  if (action === "program-option") setView({ name: "plan", programId: button.dataset.program, draftExercises: { ...state.currentExercises, ...(view.draftExercises || {}) } });
  if (action === "variation") {
    setView({
      name: "plan",
      draftExercises: {
        ...state.currentExercises,
        ...(view.draftExercises || {}),
        [button.dataset.category]: Number(button.dataset.index || 0),
      },
    });
  }
  if (action === "track") setView({ name: "track", categoryId: button.dataset.category, editingHistoryId: null });
  if (action === "advance") advanceExercise(button.dataset.category);

  if (action === "edit-history") {
    const item = state.history.find((historyItem) => historyItem.id === button.dataset.historyId);
    if (item) {
      setView({ name: "track", categoryId: item.category, editingHistoryId: item.id });
    }
  }

  if (action === "step") {
    const input = document.getElementById(button.dataset.target);
    if (!input) return;
    const next = clampNumber(Number(input.value || 0) + Number(button.dataset.delta || 1), Number(input.min || 0), Number(input.max || 999));
    input.value = next;
  }
});

app.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;

  if (form.dataset.form === "plan") {
    const program = getProgramTemplate(form.dataset.program || view.programId || "beginner");
    const selectedExercises = { ...state.currentExercises, ...(view.draftExercises || {}) };
    state.plan = program.label;
    state.planLabel = program.label;
    state.planMode = "sample";
    state.programId = program.id;
    state.routineItems = createRoutineItems(program.id);
    state.currentExercises = { ...state.currentExercises, ...selectedExercises, ...getLockedProgramExerciseDefaults(program) };
    state.nextAlternatingSlot = state.nextAlternatingSlot === "dip" ? "dip" : "push_up";
    saveState();
    setView({ name: "home", programId: program.id, draftExercises: null });
  }

  if (form.dataset.form === "track") {
    const category = getCategory(form.dataset.category);
    const formData = new FormData(form);
    const result = category.type === "seconds"
      ? clampNumber(Number(formData.get("seconds") || 0), 0, 999)
      : [0, 1, 2].map((index) => clampNumber(Number(formData.get(`set-${index}`) || 0), 0, 99));
    completeExercise(category, result, form.dataset.historyId || null);
  }
});

render();
