const STORAGE_KEY = "simple-bodyweight-tracker:v1";
const REP_START = [4, 4, 4];
const REP_GOAL = [8, 8, 8];
const PLANK_START = 30;
const PLANK_GOAL = 60;
const PLANK_INCREMENT = 5;
const DEFAULT_PLAN_LABEL = "Complete beginner routine";
const WARM_UP_LINK = "http://www.startbodyweight.com/p/simple-dynamic-warm-up.html";
const STRETCHING_LINK = "http://www.startbodyweight.com/p/simple-static-stretching-routine.html";
const exerciseImageMap = {
  pull_up: "./images/workouts/pull-up.png",
  handstand_push_up: "./images/workouts/handstand-push-up.png",
  leg_raises: "./images/workouts/leg-raises.png",
  push_up: "./images/workouts/push-up.png",
  dips: "./images/workouts/dips.png",
  horizontal_pull: "./images/workouts/horizontal-row.png",
  plank: "./images/workouts/plank.png",
  pistol_squat: "./images/workouts/squat.png",
  squat: "./images/workouts/squat.png",
  warm_up: "./images/workouts/warm-up.png",
  stretching: "./images/workouts/stretching.png",
  mobility: "./images/workouts/warm-up.png",
  core: "./images/workouts/leg-raises.png",
  strength: "./images/workouts/push-up.png",
  skill_progression: "./images/workouts/handstand-push-up.png",
};
const inspirationImageMap = {
  squat: "./images/inspiration/squat.png",
  pull_up: "./images/inspiration/pull-up.png",
  handstand_push_up: "./images/inspiration/handstand-push-up.png",
  leg_raises: "./images/inspiration/leg-raises.png",
  push_up: "./images/inspiration/push-up.png",
  dip: "./images/inspiration/dip.png",
  horizontal_pull: "./images/inspiration/horizontal-pull.png",
  plank: "./images/inspiration/plank.png",
};
const exerciseMetaMap = {
  pull_up: { muscle: "Back", type: "Strength" },
  handstand_push_up: { muscle: "Shoulders", type: "Skill" },
  leg_raises: { muscle: "Core", type: "Core" },
  push_up: { muscle: "Chest", type: "Strength" },
  dip: { muscle: "Triceps", type: "Strength" },
  horizontal_pull: { muscle: "Back", type: "Strength" },
  plank: { muscle: "Core", type: "Core" },
  squat: { muscle: "Legs", type: "Strength" },
  fixed: { muscle: "Mobility", type: "Mobility" },
};
const BASIC_ROUTINE_ITEMS = [
  { id: "warm_up", kind: "fixed", title: "Dynamic warm up", prescription: "10 min", note: "Chuẩn bị khớp, nhịp tim và biên độ vận động.", link: WARM_UP_LINK },
  { id: "squat", kind: "category", categoryId: "squat", title: "Squat variation", prescription: "3 sets, 4-8 reps", note: "Rest 1-2 min between sets." },
  { id: "pull_up", kind: "category", categoryId: "pull_up", title: "Pull up variation", prescription: "3 sets, 4-8 reps", note: "Rest 1-2 min between sets." },
  { id: "handstand_push_up", kind: "category", categoryId: "handstand_push_up", title: "Handstand push up variation", prescription: "3 sets, 4-8 reps", note: "Rest 1-2 min between sets." },
  { id: "leg_raises", kind: "category", categoryId: "leg_raises", title: "Leg raises variation", prescription: "3 sets, 4-8 reps", note: "Rest 1-2 min between sets." },
  { id: "push_or_dip", kind: "alternating", title: "Push up or dip variation", prescription: "3 sets, 4-8 reps", note: "Alternate between push up and dip every completed session." },
  { id: "horizontal_pull", kind: "category", categoryId: "horizontal_pull", title: "Horizontal pull variation", prescription: "3 sets, 4-8 reps", note: "Rest 1-2 min between sets." },
  { id: "plank", kind: "category", categoryId: "plank", title: "Plank variation", prescription: "30-60s", note: "One plank hold." },
  { id: "static_stretching", kind: "fixed", title: "Static stretching", prescription: "10 min", note: "Kết thúc buổi tập.", link: STRETCHING_LINK },
];
const PROGRAM_TEMPLATES = [
  {
    id: "beginner",
    label: "Complete beginner routine",
    summary: "3 ngày/tuần, khóa bài nền tảng trong 8 tuần trước khi chuyển sang Basic routine.",
    lockedSetup: true,
    routineItems: [
      { id: "beginner_warm_up", kind: "fixed", title: "Dynamic warm up", prescription: "10 min", note: "Before every workout.", link: WARM_UP_LINK },
      { id: "beginner_squat", kind: "category", categoryId: "squat", title: "Squat variation", prescription: "3 sets, 8-12 reps", note: "Day 1, Day 3, Day 5." },
      { id: "beginner_horizontal_pull", kind: "category", categoryId: "horizontal_pull", title: "Horizontal pull variation", prescription: "3 sets, 8-12 reps", note: "Day 1, Day 3, Day 5." },
      { id: "beginner_push_up", kind: "category", categoryId: "push_up", title: "Push up variation", prescription: "3 sets, 8-12 reps", note: "Day 1, Day 3, Day 5." },
      { id: "beginner_plank", kind: "category", categoryId: "plank", title: "Plank variation", prescription: "30-60s", note: "Day 1 and Day 5." },
      { id: "beginner_leg_raises", kind: "category", categoryId: "leg_raises", title: "Leg raises variation", prescription: "3 sets, 8-12 reps", note: "Day 3." },
      { id: "beginner_static_stretching", kind: "fixed", title: "Static stretching", prescription: "10 min", note: "After every workout.", link: STRETCHING_LINK },
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
const progressionExerciseImageMap = progressions.reduce((map, category) => {
  category.exercises.forEach((exercise) => {
    map[`${category.id}:${exercise}`] = `./images/progressions/${category.id}/${slugifyImageName(exercise)}.jpg`;
  });
  return map;
}, {});

let state = loadState();
let view = { name: hasSavedPlan(state) ? "home" : "plan", programId: state.programId || "beginner", draftExercises: null, categoryId: null, editingHistoryId: null, completion: null };
let timerState = { mode: "rest", restDuration: 60, duration: 60, remaining: 60, running: false, endsAt: null, alarm: false };
let timerTick = null;
let timerAlarmTick = null;
let timerAudioContext = null;
let lastTimerSecond = null;

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
    completionResetAt: "",
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
    completionResetAt: isTodayTimestamp(input.completionResetAt || input.completionResetDate) ? (input.completionResetAt || input.completionResetDate) : "",
    currentExercises: { ...base.currentExercises, ...(input.currentExercises || {}) },
    progress: { ...base.progress, ...(input.progress || {}) },
    history: Array.isArray(input.history) ? input.history.map((item) => ({
      ...item,
      completedAt: item.completedAt || `${item.date || todayIso()}T00:00:00.000Z`,
    })) : [],
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
  if (view.name === "accumulation") renderAccumulation();
  if (view.name === "timer") renderTimer();
  if (view.name === "fixed") renderFixedDetail();
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
        <button class="btn primary" type="submit" form="plan-form">Lưu plan</button>
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
      <form id="plan-form" class="form" data-form="plan" data-program="${program.id}">
        <div class="routine-editor">
          ${routineItems.map((item) => renderRoutineSetupItem(item, draftExercises, program)).join("")}
        </div>
      </form>
      ${hasSavedPlan(state) ? renderBottomNav("profile") : ""}
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
            </div>
          </div>
        </div>
      </div>
      ${renderBottomNav("home")}
    </section>
  `;
}

function renderExerciseList() {
  const hasVisibleCompletions = getVisibleTodayEntries().length > 0;
  const canUndoReset = isTodayTimestamp(state.completionResetAt);
  app.innerHTML = `
    <section class="screen">
      ${topbar("Chọn bài tập", "", `
        <button class="btn small" data-action="reset-today" ${hasVisibleCompletions ? "" : "disabled"}>Reset</button>
        <button class="btn small" data-action="undo-reset" ${canUndoReset ? "" : "disabled"}>Undo</button>
      `)}
      <div class="list">
        ${state.routineItems.map((item, index) => renderWorkoutRow(item, index)).join("")}
      </div>
      ${renderBottomNav("workouts")}
    </section>
  `;
}

function renderFixedDetail() {
  const item = getRoutineItem(view.fixedItemId);
  if (!item) {
    setView({ name: "list", fixedItemId: null });
    return;
  }
  const completedEntry = getVisibleTodayEntries().find((entry) => entry.kind === "fixed" && entry.itemId === item.id);
  const imageUrl = getFixedItemImage(item);
  app.innerHTML = `
    <section class="screen">
      ${topbar(item.title, "list")}
      <div class="exercise-row workout-card routine-static${completedEntry ? " completed" : ""}" style="--card-image:url('${imageUrl}')">
        <span class="card-overlay"></span>
        <span class="row-main">
          <span class="card-kicker">${escapeHtml(getFixedItemLabel(item))}</span>
          <strong class="card-title">${escapeHtml(item.title)}</strong>
          <span class="row-meta">${escapeHtml(item.note)}</span>
          ${completedEntry ? `<span class="done-line">Hoàn thành hôm nay</span>` : ""}
        </span>
        <span class="row-actions">
          ${completedEntry
            ? `<span class="btn small card-undo-button" data-action="undo-fixed" data-entry="${completedEntry.id}">Undo</span>`
            : `<span class="target-pill">${escapeHtml(item.prescription)}</span>`}
        </span>
      </div>
      <div class="panel">
        <div class="actions">
          ${item.link ? `<a class="btn guide-button" href="${item.link}" target="_blank" rel="noreferrer">Xem hướng dẫn</a>` : ""}
          ${completedEntry ? "" : `<button class="btn primary" data-action="toggle-fixed" data-item="${item.id}" data-title="${escapeHtml(item.title)}" data-prescription="${escapeHtml(item.prescription)}">Check done</button>`}
        </div>
      </div>
      ${renderBottomNav("workouts")}
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
  const completedEntry = getVisibleTodayEntries().find((entry) => entry.category === category.id && entry.exerciseName === exercise)
    || getVisibleTodayEntries().find((entry) => entry.category === category.id);
  const initial = historyItem ? historyItem.result : completedEntry ? completedEntry.result : target;
  const isCompletedView = Boolean(completedEntry && !historyItem);
  const imageKey = getExerciseImageKey(category, exercise);
  const exerciseImageUrl = exerciseImageMap[imageKey] || exerciseImageMap.strength;
  const progressionImageUrl = getProgressionExerciseImage(category, exercise);
  const inspirationImageUrl = inspirationImageMap[category.id] || inspirationImageMap.strength || exerciseImageUrl;
  const completedActions = isCompletedView
    ? `
      <div class="split-action">
        <button class="btn split-undo" type="button" data-action="undo-exercise" data-entry="${completedEntry.id}">Undo</button>
        <button class="btn split-continue" type="button" data-action="list">Tiếp tục tập</button>
      </div>
    `
    : "";
  const inputPanel = `
    <form class="panel form" data-form="track" data-category="${category.id}" data-history-id="${view.editingHistoryId || ""}">
      <p class="eyebrow">${historyItem ? "Nhập lần gần nhất" : "Nhập kết quả"}</p>
      ${category.type === "seconds" ? renderSecondsInput(Number(initial || PLANK_START)) : renderRepInputs(initial)}
      <button class="btn primary" type="submit">${historyItem ? "Lưu chỉnh sửa" : "Hoàn thành"}</button>
    </form>
  `;
  const completedPanel = `
    <div class="panel completed-track-panel">
      <div class="inspiration-frame" style="--inspiration-image:url('${inspirationImageUrl}')">
        <span class="inspiration-overlay"></span>
        <span class="inspiration-copy">
          <span class="eyebrow">Hoàn thành hôm nay</span>
          <strong>${escapeHtml(exercise)}</strong>
          <span>${formatResult(completedEntry?.result, category.type)}</span>
        </span>
      </div>
      ${completedActions}
    </div>
  `;

  app.innerHTML = `
    <section class="screen">
      ${topbar(category.title, "list")}
      ${isCompletedView ? "" : `<div class="panel track-overview">
        <div class="track-overview-main">
          <p class="eyebrow">Bài hiện tại</p>
          <h2>${escapeHtml(exercise)}</h2>
          <div class="summary-grid vertical">
            <div class="metric"><span>Mục tiêu hôm nay</span><strong>${formatResult(target, category.type)}</strong></div>
            <div class="metric"><span>Lần gần nhất</span><strong>${formatResult(progress.lastResult, category.type)}</strong></div>
            <div class="metric"><span>Mục tiêu lên bài</span><strong>${formatGoal(category.type)}</strong></div>
          </div>
          <a class="btn guide-button" href="${category.link}" target="_blank" rel="noreferrer">Xem hướng dẫn</a>
        </div>
        <div class="track-image" style="--track-image:url('${progressionImageUrl}'); --track-fallback:url('${exerciseImageUrl}')" aria-hidden="true"></div>
      </div>`}
      ${isCompletedView ? completedPanel : inputPanel}
      ${renderBottomNav("workouts")}
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

function renderAccumulation() {
  const recent = state.history[0];
  app.innerHTML = `
    <section class="screen">
      ${topbar("Tích lũy", "")}
      <div class="panel profile-plan">
        <p class="eyebrow">Plan hiện tại</p>
        <h2>${escapeHtml(getPlanLabel())}</h2>
        <p class="plan-text">${escapeHtml(formatRoutineSummary())}</p>
        <button class="btn primary" data-action="edit-plan">Sửa plan</button>
      </div>
      <div class="list">
        ${progressions.map((category) => {
          const progress = state.progress[category.id];
          const ready = isReadyToAdvance(category);
          const latestEntry = getLatestHistoryEntry(category.id);
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
              ${latestEntry ? `<button class="btn" data-action="edit-history" data-history-id="${latestEntry.id}">Sửa lần gần nhất</button>` : ""}
            </div>
          `;
        }).join("")}
      </div>
      <div class="panel">
        <h2>Lịch sử gần nhất</h2>
        ${recent ? renderHistoryItem(recent) : `<p class="muted">Chưa có buổi tập nào được lưu.</p>`}
      </div>
      ${renderBottomNav("profile")}
    </section>
  `;
}

function renderTimer() {
  const modeConfig = getTimerModeConfig(timerState.mode);
  const progress = timerState.duration ? 1 - (timerState.remaining / timerState.duration) : 0;
  const isDone = timerState.remaining <= 0;
  app.innerHTML = `
    <section class="screen timer-screen">
      ${topbar("Bấm giờ", "")}
      ${isDone ? "" : `<div class="timer-mode-tabs">
        <button class="timer-mode ${timerState.mode === "rest" ? "active rest" : ""}" data-action="timer-mode" data-mode="rest">REST</button>
        <button class="timer-mode ${timerState.mode === "break" ? "active break" : ""}" data-action="timer-mode" data-mode="break">BREAK</button>
      </div>`}
      ${!isDone && timerState.mode === "rest" ? `
        <div class="timer-duration-tabs" aria-label="Rest duration">
          <button class="timer-duration ${timerState.restDuration === 60 ? "active" : ""}" data-action="timer-duration" data-duration="60">1 phút</button>
          <button class="timer-duration ${timerState.restDuration === 120 ? "active" : ""}" data-action="timer-duration" data-duration="120">2 phút</button>
        </div>
      ` : ""}
      <div class="timer-watch ${timerState.mode}" style="--timer-progress:${Math.round(progress * 360)}deg; --timer-accent:${modeConfig.accent};">
        ${isDone ? `
          <p class="eyebrow">BACK TO WORK</p>
          <h1>NEXT SET</h1>
          <p class="muted">Chuông sẽ dừng khi bạn tiếp tục tập.</p>
          <button class="btn primary pulse" data-action="timer-continue">Tiếp tục tập</button>
        ` : `
          <p class="eyebrow">${modeConfig.title}</p>
          <div class="timer-ring">
            <div class="timer-time">${formatTimer(timerState.remaining)}</div>
            <span>${modeConfig.subtitle}</span>
          </div>
          <div class="timer-actions">
            <button class="timer-play" data-action="timer-toggle">${timerState.running ? "PAUSE" : "PLAY"}</button>
            <button class="btn small" data-action="timer-reset">Reset</button>
            ${timerState.mode === "break" ? `<button class="btn small" data-action="timer-skip">Skip Break</button>` : ""}
          </div>
        `}
      </div>
      ${renderBottomNav("timer")}
    </section>
  `;
}

function getTimerModeConfig(mode) {
  if (mode === "break") return { title: "BREAK TIME", subtitle: "Take a short break", duration: 180, accent: "#31c5ff" };
  return { title: "REST TIME", subtitle: "Rest between sets", duration: timerState.restDuration || 60, accent: "#ff5a00" };
}

function setTimerMode(mode) {
  const config = getTimerModeConfig(mode);
  stopTimer();
  stopTimerAlarm();
  timerState = { ...timerState, mode, duration: config.duration, remaining: config.duration, running: false, endsAt: null, alarm: false };
  setView({ name: "timer" });
}

function toggleTimer() {
  if (timerState.remaining <= 0) setTimerMode(timerState.mode);
  ensureTimerAudio();
  if (timerState.running) {
    timerState.remaining = Math.max(0, Math.ceil((timerState.endsAt - Date.now()) / 1000));
    stopTimer();
  } else {
    timerState.running = true;
    timerState.alarm = false;
    timerState.endsAt = Date.now() + (timerState.remaining * 1000);
    startTimerTick();
  }
  renderTimer();
}

function resetTimer() {
  const config = getTimerModeConfig(timerState.mode);
  stopTimer();
  stopTimerAlarm();
  timerState = { ...timerState, duration: config.duration, remaining: config.duration, running: false, endsAt: null, alarm: false };
  renderTimer();
}

function skipTimer() {
  stopTimer();
  completeTimer();
}

function setTimerDuration(seconds) {
  const duration = clampNumber(Number(seconds || 60), 60, 120);
  stopTimer();
  stopTimerAlarm();
  timerState = { ...timerState, mode: "rest", restDuration: duration, duration, remaining: duration, running: false, endsAt: null, alarm: false };
  renderTimer();
}

function startTimerTick() {
  clearInterval(timerTick);
  lastTimerSecond = timerState.remaining;
  timerTick = setInterval(() => {
    const nextRemaining = Math.max(0, Math.ceil((timerState.endsAt - Date.now()) / 1000));
    if (nextRemaining !== lastTimerSecond && nextRemaining > 0) playTimerTick();
    lastTimerSecond = nextRemaining;
    timerState.remaining = nextRemaining;
    if (timerState.remaining <= 0) completeTimer();
    if (view.name === "timer") renderTimer();
  }, 250);
}

function stopTimer() {
  clearInterval(timerTick);
  timerTick = null;
  timerState.running = false;
  lastTimerSecond = null;
}

function completeTimer() {
  stopTimer();
  timerState = { ...timerState, remaining: 0, running: false, endsAt: null, alarm: true };
  startTimerAlarm();
  if (view.name === "timer") renderTimer();
}

function continueTimerWorkout() {
  stopTimer();
  stopTimerAlarm();
  const config = getTimerModeConfig("rest");
  timerState = { ...timerState, mode: "rest", duration: config.duration, remaining: config.duration, running: false, endsAt: null, alarm: false };
  renderTimer();
}

function ensureTimerAudio() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  if (!timerAudioContext) timerAudioContext = new AudioContext();
  if (timerAudioContext.state === "suspended") timerAudioContext.resume();
  return timerAudioContext;
}

function playTimerTone(frequency, duration, volume = 0.08) {
  const context = ensureTimerAudio();
  if (!context) return;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, context.currentTime);
  gain.gain.setValueAtTime(volume, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + duration);
}

function playTimerTick() {
  playTimerTone(880, 0.045, 0.035);
}

function playTimerAlarm() {
  playTimerTone(660, 0.18, 0.09);
  setTimeout(() => playTimerTone(990, 0.22, 0.09), 190);
}

function startTimerAlarm() {
  ensureTimerAudio();
  if (timerAlarmTick) return;
  playTimerAlarm();
  timerAlarmTick = setInterval(playTimerAlarm, 1200);
}

function stopTimerAlarm() {
  clearInterval(timerAlarmTick);
  timerAlarmTick = null;
  timerState.alarm = false;
}

function formatTimer(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function renderHistoryItem(item) {
  const category = getCategory(item.category);
  const type = category ? category.type : "fixed";
  return `
    <div class="history-row">
      <span>
        <strong>${escapeHtml(item.exerciseName)}</strong><br />
        <span class="muted">${formatDate(item.date)} · ${formatResult(item.result, type)}</span>
      </span>
      ${category ? `<button class="btn" data-action="edit-history" data-history-id="${item.id}">Sửa</button>` : ""}
    </div>
  `;
}

function topbar(title, backAction, extraActions = "") {
  return `
    <div class="topbar ${backAction ? "with-back" : ""}">
      ${backAction ? `<button class="back-fab" data-action="${backAction}" aria-label="Quay lại"></button>` : ""}
      <div class="brand">
        <p class="eyebrow">Simple Bodyweight Tracker</p>
        <h1>${escapeHtml(title)}</h1>
      </div>
      ${extraActions ? `<div class="topbar-actions">
        ${extraActions}
      </div>` : ""}
    </div>
  `;
}

function renderBottomNav(active) {
  const items = [
    { id: "home", label: "Home", icon: "⌂", action: "home" },
    { id: "workouts", label: "Workouts", icon: "▥", action: "list" },
    { id: "timer", label: "Timer", icon: "◷", action: "timer" },
    { id: "profile", label: "Profile", icon: "◎", action: "accumulation" },
  ];
  return `
    <nav class="bottom-nav" aria-label="Main navigation">
      ${items.map((item) => `
        <button class="nav-item ${active === item.id ? "active" : ""}" data-action="${item.action}">
          <span>${item.icon}</span>
          <strong>${item.label}</strong>
        </button>
      `).join("")}
    </nav>
  `;
}

function completeExercise(category, result, historyId = null) {
  const exerciseName = getCurrentExercise(category);
  const existingHistory = historyId ? state.history.find((item) => item.id === historyId) : null;
  const historyEntry = {
    id: historyId || crypto.randomUUID(),
    date: existingHistory ? existingHistory.date : todayIso(),
    completedAt: existingHistory ? existingHistory.completedAt : new Date().toISOString(),
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

  recomputeProgressFromHistory(category.id);

  saveState();
  setView({
    name: "track",
    categoryId: category.id,
    editingHistoryId: null,
    completion: null,
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
  const normalized = normalizeRepResult(sanitizedResult);
  return incrementRepTarget(normalized);
}

function nextSecondsTarget(result, currentTarget) {
  const target = Number(currentTarget || PLANK_START);
  const achieved = Number(result || 0);
  if (achieved < target) return target;
  if (achieved >= PLANK_GOAL) return PLANK_GOAL;
  return Math.min(PLANK_GOAL, target + PLANK_INCREMENT);
}

function getRepTargetSequence() {
  const sequence = [];
  const target = [...REP_START];
  sequence.push([...target]);

  while (!meetsOrExceeds(target, REP_GOAL)) {
    const lowest = Math.min(...target.filter((value) => value < REP_GOAL[0]));
    const index = target.findIndex((value) => value === lowest);
    target[index] += 1;
    sequence.push([...target]);
  }

  return sequence;
}

function normalizeRepResult(result) {
  const capped = sanitizeRepArray(result).map((value) => Math.min(value, REP_GOAL[0]));
  const normalized = [...capped];

  for (let index = 1; index < normalized.length; index += 1) {
    if (normalized[index] > normalized[index - 1]) normalized[index] = normalized[index - 1];
  }

  return normalized;
}

function incrementRepTarget(target) {
  const next = sanitizeRepArray(target).map((value) => Math.min(value, REP_GOAL[0]));
  const index = next.findIndex((value) => value < REP_GOAL[0]);
  if (index !== -1) next[index] += 1;
  return next;
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
      title: required.title,
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

function getTodayEntries() {
  const today = todayIso();
  return state.history.filter((item) => item.date === today);
}

function getLatestHistoryEntry(categoryId) {
  return state.history.find((item) => item.category === categoryId) || null;
}

function getVisibleTodayEntries() {
  const resetTime = Date.parse(state.completionResetAt || "");
  return getTodayEntries().filter((item) => {
    if (!Number.isFinite(resetTime)) return true;
    return Date.parse(item.completedAt || `${item.date}T00:00:00.000Z`) > resetTime;
  });
}

function resetTodayCompletions() {
  if (!getVisibleTodayEntries().length) return;
  state.completionResetAt = new Date().toISOString();
  saveState();
  setView({ name: "list" });
}

function undoTodayReset() {
  if (!isTodayTimestamp(state.completionResetAt)) return;
  state.completionResetAt = "";
  saveState();
  setView({ name: "list" });
}

function setAlternatingSlot(categoryId) {
  if (categoryId !== "push_up" && categoryId !== "dip") return;
  state.nextAlternatingSlot = categoryId;
  saveState();
  setView({ name: "list" });
}

function toggleFixedCompletion(itemId, title, prescription) {
  const existing = getVisibleTodayEntries().find((item) => item.kind === "fixed" && item.itemId === itemId);
  if (existing) return;
  state.history = [{
    id: crypto.randomUUID(),
    date: todayIso(),
    completedAt: new Date().toISOString(),
    kind: "fixed",
    itemId,
    category: "fixed",
    exerciseIndex: 0,
    exerciseName: title,
    result: prescription,
  }, ...state.history];
  saveState();
  setView(view.name === "fixed" ? { name: "fixed", fixedItemId: itemId } : { name: "list" });
}

function undoFixedCompletion(entryId) {
  const entry = state.history.find((item) => item.id === entryId);
  if (!entry || entry.kind !== "fixed") return;
  state.history = state.history.filter((item) => item.id !== entryId);
  saveState();
  setView(view.name === "fixed" ? { name: "fixed", fixedItemId: entry.itemId } : { name: "list" });
}

function undoExerciseCompletion(entryId) {
  const entry = state.history.find((item) => item.id === entryId);
  if (!entry || entry.kind === "fixed") return;
  state.history = state.history.filter((item) => item.id !== entryId);
  recomputeProgressFromHistory(entry.category);
  saveState();
  setView(view.name === "track"
    ? { name: "track", categoryId: entry.category, editingHistoryId: null, completion: null }
    : { name: "list" });
}

function recomputeProgressFromHistory(categoryId) {
  const category = getCategory(categoryId);
  if (!category) return;
  const latest = state.history.find((item) => item.category === categoryId && item.kind !== "fixed");
  if (!latest) {
    state.progress[categoryId] = category.type === "seconds"
      ? { lastResult: null, nextTarget: PLANK_START }
      : { lastResult: null, nextTarget: [...REP_START] };
    return;
  }

  const result = latest.result;
  const startTarget = category.type === "seconds" ? PLANK_START : REP_START;
  state.progress[categoryId] = {
    lastResult: Array.isArray(result) ? [...result] : result,
    nextTarget: category.type === "seconds"
      ? nextSecondsTarget(result, startTarget)
      : nextRepTarget(result, startTarget),
  };
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

function getRoutineItem(itemId) {
  return state.routineItems.find((item) => item.id === itemId) || null;
}

function getExerciseImageKey(category, exerciseName) {
  const name = exerciseName.toLowerCase();
  if (name.includes("pistol") || name.includes("one-legged") || name.includes("one legged")) return "pistol_squat";
  if (category.id === "dip") return "dips";
  if (category.id === "horizontal_pull") return "horizontal_pull";
  if (category.id === "leg_raises") return "leg_raises";
  return category.id;
}

function getProgressionExerciseImage(category, exerciseName) {
  return progressionExerciseImageMap[`${category.id}:${exerciseName}`]
    || `./images/progressions/${category.id}/${slugifyImageName(exerciseName)}.jpg`;
}

function slugifyImageName(value) {
  return String(value)
    .toLowerCase()
    .replaceAll("&", " and ")
    .replaceAll("+", " plus ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getExerciseMeta(category, exerciseName) {
  if (category.id === "squat" && getExerciseImageKey(category, exerciseName) === "pistol_squat") return { muscle: "Legs", type: "Skill Progression" };
  return exerciseMetaMap[category.id] || exerciseMetaMap.fixed;
}

function getExerciseDifficulty(category) {
  const index = state.currentExercises[category.id] || 0;
  if (index <= 2) return "Beginner";
  if (index <= 7) return "Intermediate";
  return "Advanced";
}

function getFixedItemImage(item) {
  const text = `${item.id} ${item.title} ${item.prescription}`.toLowerCase();
  if (text.includes("stretch")) return exerciseImageMap.stretching;
  if (text.includes("warm")) return exerciseImageMap.warm_up;
  return exerciseImageMap.mobility;
}

function getFixedItemLabel(item) {
  const text = `${item.id} ${item.title} ${item.prescription}`.toLowerCase();
  if (text.includes("stretch")) return "Stretch";
  if (text.includes("warm")) return "Warm Up";
  return "Mobility";
}

function getShortCategoryLabel(categoryId) {
  const labels = {
    squat: "Squat",
    pull_up: "Pull Up",
    handstand_push_up: "Handstand Push Up",
    leg_raises: "Leg Raises",
    push_up: "Push Up",
    dip: "Dips",
    horizontal_pull: "Horizontal Row",
    plank: "Plank",
  };
  return labels[categoryId] || "Workout";
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
    const completedEntry = getVisibleTodayEntries().find((entry) => entry.kind === "fixed" && entry.itemId === item.id);
    const completedClass = completedEntry ? " completed" : "";
    const imageUrl = getFixedItemImage(item);
    return `
      <button class="exercise-row workout-card routine-static${completedClass}" data-action="fixed-detail" data-item="${item.id}" style="--card-image:url('${imageUrl}')">
        <span class="card-overlay"></span>
        <span class="row-main">
          <span class="card-kicker">${escapeHtml(getFixedItemLabel(item))}</span>
          <strong class="card-title">${escapeHtml(item.title)}</strong>
          <span class="row-meta">${escapeHtml(item.note)}</span>
          ${completedEntry ? `<span class="done-line">Hoàn thành hôm nay</span>` : ""}
        </span>
        <span class="row-actions">
          ${completedEntry
            ? `<span class="btn small card-undo-button" data-action="undo-fixed" data-entry="${completedEntry.id}">Undo</span>`
            : `<span class="target-pill">${escapeHtml(item.prescription)}</span>`}
        </span>
      </button>
    `;
  }

  const exercise = getCurrentExercise(category);
  const progress = state.progress[category.id];
  const ready = isReadyToAdvance(category);
  const completedEntries = item.kind === "alternating"
    ? getVisibleTodayEntries().filter((entry) => entry.category === "push_up" || entry.category === "dip")
    : getVisibleTodayEntries().filter((entry) => entry.category === category.id);
  const completedClass = completedEntries.length ? " completed" : "";
  const imageKey = getExerciseImageKey(category, exercise);
  const meta = getExerciseMeta(category, exercise);
  const difficulty = getExerciseDifficulty(category);
  const imageUrl = exerciseImageMap[imageKey] || exerciseImageMap.strength;
  const alternatingNote = item.kind === "alternating" ? `Luân phiên: hôm nay ${category.id === "push_up" ? "push up" : "dip"}` : item.note;
  const rowActions = [
    ready ? `<span class="status-pill ready">Đủ lên bài</span>` : "",
    ...completedEntries.map((entry) => `<span class="btn small card-undo-button" data-action="undo-exercise" data-entry="${entry.id}">Undo</span>`),
  ].filter(Boolean).join("");
  return `
    <button class="exercise-row workout-card${completedClass}" data-action="track" data-category="${category.id}" style="--card-image:url('${imageUrl}')">
      <span class="card-overlay"></span>
      <span class="row-main">
        <span class="card-kicker">${escapeHtml(meta.type)}</span>
        <strong class="card-title">${escapeHtml(exercise)}</strong>
        <span class="row-meta">${escapeHtml(alternatingNote)}</span>
        <span class="card-stats">
          <span>${escapeHtml(meta.muscle)}</span>
          <span>${formatResult(progress.nextTarget, category.type)}</span>
          <span>${difficulty}</span>
        </span>
        ${item.kind === "alternating" ? `
          <span class="inline-actions">
            <span class="mini-toggle ${category.id === "push_up" ? "selected" : ""}" data-action="set-alternating" data-category="push_up">Push up</span>
            <span class="mini-toggle ${category.id === "dip" ? "selected" : ""}" data-action="set-alternating" data-category="dip">Dip</span>
          </span>
        ` : ""}
        ${completedEntries.map((entry) => {
          const entryCategory = getCategory(entry.category);
          return `<span class="done-line">Hoàn thành hôm nay: ${escapeHtml(entry.exerciseName)} - ${formatResult(entry.result, entryCategory.type)}</span>`;
        }).join("")}
        ${ready ? `<span class="row-meta">Gợi ý: chuyển sang ${escapeHtml(getNextExercise(category) || "bài cuối")}</span>` : ""}
        <span class="card-field-label">${escapeHtml(getShortCategoryLabel(category.id))}</span>
      </span>
      ${rowActions ? `<span class="row-actions">${rowActions}</span>` : ""}
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
  if (type === "fixed") return String(result);
  if (type === "seconds") return `${Number(result)}s`;
  return sanitizeRepArray(result).join(",");
}

function formatGoal(type) {
  return type === "seconds" ? `${PLANK_GOAL}s` : REP_GOAL.join(",");
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function isTodayTimestamp(value) {
  if (!value) return false;
  return String(value).slice(0, 10) === todayIso();
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
  if (action === "fixed-detail") setView({ name: "fixed", fixedItemId: button.dataset.item });
  if (action === "timer") setView({ name: "timer" });
  if (action === "timer-mode") setTimerMode(button.dataset.mode);
  if (action === "timer-duration") setTimerDuration(button.dataset.duration);
  if (action === "timer-toggle") toggleTimer();
  if (action === "timer-reset") resetTimer();
  if (action === "timer-skip") skipTimer();
  if (action === "timer-continue") continueTimerWorkout();
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
  if (action === "reset-today") resetTodayCompletions();
  if (action === "undo-reset") undoTodayReset();
  if (action === "set-alternating") setAlternatingSlot(button.dataset.category);
  if (action === "toggle-fixed") toggleFixedCompletion(button.dataset.item, button.dataset.title, button.dataset.prescription);
  if (action === "undo-fixed") undoFixedCompletion(button.dataset.entry);
  if (action === "undo-exercise") undoExerciseCompletion(button.dataset.entry);

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
