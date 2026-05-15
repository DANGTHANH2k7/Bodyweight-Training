const STORAGE_KEY = "simple-bodyweight-tracker:v1";
const REP_START = [4, 4, 4];
const REP_GOAL = [8, 8, 8];
const PLANK_START = 30;
const PLANK_GOAL = 60;
const PLANK_INCREMENT = 5;
const DEFAULT_PLAN_LABEL = "Complete beginner routine";
const WARM_UP_LINK = "http://www.startbodyweight.com/p/simple-dynamic-warm-up.html";
const STRETCHING_LINK = "http://www.startbodyweight.com/p/simple-static-stretching-routine.html";
const STRENGTH_MODE_ITEMS = {
  push: new Set(["strength_push_warm_up", "strength_squat", "strength_hspu", "strength_push_up", "strength_dip", "strength_leg_raises", "strength_push_stretching"]),
  pull: new Set(["strength_pull_warm_up", "strength_pull_up", "strength_horizontal_pull", "strength_plank", "strength_pull_stretching"]),
};
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
  { id: "warm_up", kind: "fixed", title: "Dynamic warm up", prescription: "10 min", note: "Prepare joints, heart rate, and range of motion.", link: WARM_UP_LINK },
  { id: "squat", kind: "category", categoryId: "squat", title: "Squat variation", prescription: "3 sets, 4-8 reps", note: "Rest 1-2 min between sets." },
  { id: "pull_up", kind: "category", categoryId: "pull_up", title: "Pull up variation", prescription: "3 sets, 4-8 reps", note: "Rest 1-2 min between sets." },
  { id: "handstand_push_up", kind: "category", categoryId: "handstand_push_up", title: "Handstand push up variation", prescription: "3 sets, 4-8 reps", note: "Rest 1-2 min between sets." },
  { id: "leg_raises", kind: "category", categoryId: "leg_raises", title: "Leg raises variation", prescription: "3 sets, 4-8 reps", note: "Rest 1-2 min between sets." },
  { id: "push_or_dip", kind: "alternating", title: "Push up or dip variation", prescription: "3 sets, 4-8 reps", note: "Alternate between push up and dip every completed session." },
  { id: "horizontal_pull", kind: "category", categoryId: "horizontal_pull", title: "Horizontal pull variation", prescription: "3 sets, 4-8 reps", note: "Rest 1-2 min between sets." },
  { id: "plank", kind: "category", categoryId: "plank", title: "Plank variation", prescription: "30-60s", note: "One plank hold." },
  { id: "static_stretching", kind: "fixed", title: "Static stretching", prescription: "10 min", note: "Finish the workout.", link: STRETCHING_LINK },
];
const PROGRAM_TEMPLATES = [
  {
    id: "beginner",
    label: "Complete beginner routine",
    summary: "3 days/week, locked foundation exercises for 8 weeks before moving to the Basic routine.",
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
    summary: "Full body bodyweight routine, 3 sessions/week.",
    lockedSetup: false,
    routineItems: BASIC_ROUTINE_ITEMS,
  },
  {
    id: "strength",
    label: "Strength split",
    summary: "2 day split, 4-5 days/week, 5x5 with longer rests.",
    lockedSetup: false,
    routineItems: [
      { id: "strength_push_warm_up", kind: "fixed", title: "Dynamic warm up", prescription: "10 min", note: "Prepare joints, heart rate, and range of motion.", link: WARM_UP_LINK },
      { id: "strength_squat", kind: "category", categoryId: "squat", title: "Squat variation", prescription: "5 sets x 5 reps", note: "Push day." },
      { id: "strength_hspu", kind: "category", categoryId: "handstand_push_up", title: "Handstand push up variation", prescription: "5 sets x 5 reps", note: "Push day." },
      { id: "strength_push_up", kind: "category", categoryId: "push_up", title: "Push up variation", prescription: "5 sets x 5 reps", note: "Push day." },
      { id: "strength_dip", kind: "category", categoryId: "dip", title: "Dip variation", prescription: "5 sets x 5 reps", note: "Push day." },
      { id: "strength_leg_raises", kind: "category", categoryId: "leg_raises", title: "Leg raises variation", prescription: "5 sets x 5 reps", note: "Push day." },
      { id: "strength_push_stretching", kind: "fixed", title: "Static stretching", prescription: "10 min", note: "Finish the workout.", link: STRETCHING_LINK },
      { id: "strength_pull_warm_up", kind: "fixed", title: "Dynamic warm up", prescription: "10 min", note: "Prepare joints, heart rate, and range of motion.", link: WARM_UP_LINK },
      { id: "strength_pull_up", kind: "category", categoryId: "pull_up", title: "Pull up variation", prescription: "5 sets x 5 reps", note: "Pull day." },
      { id: "strength_horizontal_pull", kind: "category", categoryId: "horizontal_pull", title: "Horizontal pull variation", prescription: "5 sets x 5 reps", note: "Pull day." },
      { id: "strength_plank", kind: "category", categoryId: "plank", title: "Plank variation", prescription: "30-60s", note: "Pull day." },
      { id: "strength_pull_stretching", kind: "fixed", title: "Static stretching", prescription: "10 min", note: "Finish the workout.", link: STRETCHING_LINK },
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
const ADVANCED_SKILLS = [
  {
    id: "crow_stand",
    title: "The crow stand",
    prerequisites: [
      { type: "exercise", categoryId: "handstand_push_up", exercise: "Pike push ups" },
      { type: "exercise", categoryId: "plank", exercise: "Plank" },
    ],
  },
  {
    id: "double_elbow_levers",
    title: "Double elbow levers",
    prerequisites: [
      { type: "exercise", categoryId: "plank", exercise: "Decline plank" },
      { type: "skill", skillId: "crow_stand", label: "The crow stand" },
    ],
  },
  {
    id: "l_sits",
    title: "L-sits",
    prerequisites: [
      { type: "exercise", categoryId: "leg_raises", exercise: "Hanging straight leg raises" },
      { type: "exercise", categoryId: "dip", exercise: "Dips" },
    ],
  },
  {
    id: "dragon_flags",
    title: "Dragon flags",
    prerequisites: [
      { type: "exercise", categoryId: "plank", exercise: "Leg lift plank" },
      { type: "exercise", categoryId: "pull_up", exercise: "Pull ups" },
      { type: "exercise", categoryId: "leg_raises", exercise: "Hanging bent leg V-raises" },
    ],
  },
  {
    id: "back_levers",
    title: "Back levers",
    prerequisites: [
      { type: "exercise", categoryId: "plank", exercise: "Arm and leg lift plank" },
      { type: "exercise", categoryId: "dip", exercise: "Legs forward dips" },
    ],
  },
  {
    id: "muscle_ups",
    title: "Muscle ups",
    prerequisites: [
      { type: "exercise", categoryId: "pull_up", exercise: "Archer pull ups" },
      { type: "exercise", categoryId: "dip", exercise: "Modified Russian dips" },
    ],
  },
  {
    id: "ab_wheel_rollouts",
    title: "Ab wheel rollouts",
    prerequisites: [
      { type: "exercise", categoryId: "plank", exercise: "Wall plank" },
      { type: "exercise", categoryId: "leg_raises", exercise: "Hanging straight leg V-raises / Toes to bar", label: "Hanging straight leg V-raises" },
    ],
  },
  {
    id: "handstands",
    title: "Handstands",
    prerequisites: [
      { type: "exercise", categoryId: "handstand_push_up", exercise: "Wall handstand push ups" },
    ],
  },
  {
    id: "front_planche_rope",
    title: "Front planche on a rope",
    prerequisites: [
      { type: "skill", skillId: "dragon_flags", label: "Dragon flags" },
      { type: "exercise", categoryId: "pull_up", exercise: "Pull ups" },
    ],
  },
];

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
    strengthMode: "push",
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
    strengthMode: input.strengthMode === "pull" ? "pull" : "push",
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
  if (view.name === "achievement") renderAchievement();
  if (view.name === "timer") renderTimer();
  if (view.name === "fixed") renderFixedDetail();
  if (view.name === "home") renderHome();
}

function renderPlan() {
  const program = getProgramTemplate(view.programId || state.programId || "beginner");
  const strengthMode = getStrengthMode(view.strengthMode || state.strengthMode);
  const routineItems = getVisibleRoutineItems(createRoutineItems(program.id), program.id, strengthMode);
  const draftExercises = { ...state.currentExercises, ...(view.draftExercises || {}) };
  app.innerHTML = `
    <section class="screen">
      <div class="topbar">
        <div class="brand">
          <h1>${hasSavedPlan(state) ? "Edit plan" : "Your training plan"}</h1>
        </div>
        <div class="topbar-actions">
          ${program.id === "strength" ? renderStrengthModeToggle(strengthMode) : ""}
          <button class="btn primary" type="submit" form="plan-form">Save plan</button>
        </div>
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
        <p class="eyebrow">${program.lockedSetup ? "Foundation routine locked" : "Choose variations with the scroller"}</p>
        <h2>${escapeHtml(program.label)}</h2>
        <p class="muted">${program.lockedSetup ? "Complete beginner uses only the listed exercise groups to build a base. Variation selection is locked during setup." : "Each progression field shows about 4 exercises at a time. Scroll the list to choose your current level."}</p>
      </div>
      <form id="plan-form" class="form" data-form="plan" data-program="${program.id}" data-strength-mode="${strengthMode}">
        <div class="routine-editor">
          ${routineItems.map((item) => renderRoutineSetupItem(item, draftExercises, program)).join("")}
        </div>
      </form>
      ${hasSavedPlan(state) ? renderBottomNav("profile") : ""}
    </section>
  `;
}

function renderHome() {
  app.innerHTML = `
    <section class="screen home-screen">
      <button class="btn primary home-floating-cta" data-action="list">Start Working Out <span>→</span></button>
      <section class="home-hero">
        <div class="home-hero-copy">
          <p class="home-logo"><img class="home-logo-image" src="./images/brand/favicon.png" alt="" /><span>Start<br />Bodyweight</span></p>
          <h1>Smarter Plan.<br />Stronger You.<br /><span>Every Day.</span></h1>
          <p class="home-description">The all-in-one app inspired by Start Bodyweight by Nick Janvier. Plan your workouts, track your progress, and build real strength with bodyweight training.</p>
          <button class="btn home-cta home-see-more" data-action="home-see-more">See More <span>↓</span></button>
        </div>
        <div class="home-hero-media" aria-hidden="true">
          <span class="home-phone-card">
            <span class="home-phone-time">9:41</span>
            <span class="home-phone-kicker">Today's workout</span>
            <strong>Workout A</strong>
            <em>Upper Body Focus</em>
            <span class="home-phone-row"><b>Warm-up</b><i>10:00</i></span>
            <span class="home-phone-row"><b>${state.routineItems.length} Exercises</b><i>45:00</i></span>
            <span class="home-phone-row"><b>Next Goal</b><i>8,8,8</i></span>
          </span>
        </div>
      </section>
      <section id="home-intro" class="home-intro-grid">
        ${renderHomeIntroCard("1", "Plan", "calendar", "Get a personalized workout plan that fits your schedule and goals.")}
        ${renderHomeIntroCard("2", "Track", "bar_chart", "Log your workouts, sets, reps, and variations. See your progress clearly.")}
        ${renderHomeIntroCard("3", "Progress", "trend_up", "Follow a proven system with smart progression, deloads, and level-ups built in.")}
        ${renderHomeIntroCard("4", "Motivate", "trophy", "Unlock skills, earn achievements, and stay inspired every step of the way.")}
      </section>
      <section class="home-trust-bar">
        ${renderHomeTrustItem("shield", "Built on a proven method", "By Nick Janvier")}
        ${renderHomeTrustItem("users", "Trusted by thousands", "Worldwide")}
        ${renderHomeTrustItem("lightning", "No gym. Just results.", "Anywhere, anytime")}
      </section>
      ${renderBottomNav("home")}
    </section>
  `;
}

function renderHomeIntroCard(number, title, icon, description) {
  return `
    <article class="home-intro-card">
      <span class="home-card-icon">${iconSvg(icon)}</span>
      <span class="home-card-number">${number}</span>
      <span class="home-card-copy">
        <h2>${escapeHtml(title)}</h2>
        <p>${escapeHtml(description)}</p>
      </span>
    </article>
  `;
}

function renderHomeTrustItem(icon, title, subtitle) {
  return `
    <div class="home-trust-item">
      <span>${iconSvg(icon)}</span>
      <strong>${escapeHtml(title)}</strong>
      <em>${escapeHtml(subtitle)}</em>
    </div>
  `;
}

function renderStrengthModeToggle(activeMode) {
  const mode = getStrengthMode(activeMode);
  return `
    <div class="strength-mode-toggle" role="tablist" aria-label="Strength split mode">
      <button class="strength-mode-option ${mode === "push" ? "active" : ""}" type="button" data-action="strength-mode" data-mode="push" role="tab" aria-selected="${mode === "push"}">Push</button>
      <button class="strength-mode-option ${mode === "pull" ? "active" : ""}" type="button" data-action="strength-mode" data-mode="pull" role="tab" aria-selected="${mode === "pull"}">Pull</button>
    </div>
  `;
}

function renderExerciseList() {
  const hasVisibleCompletions = getVisibleTodayEntries().length > 0;
  const strengthMode = getStrengthMode(state.strengthMode);
  const routineItems = getVisibleRoutineItems(state.routineItems, state.programId, strengthMode);
  app.innerHTML = `
    <section class="screen">
      ${topbar("Today's Exercise", "", `
        ${state.programId === "strength" ? renderStrengthModeToggle(strengthMode) : ""}
        <button class="btn small icon-action" data-action="reset-today" aria-label="Reset" ${hasVisibleCompletions ? "" : "disabled"}>${iconSvg("rotate_ccw")}</button>
      `)}
      <div class="list">
        ${routineItems.map((item, index) => renderWorkoutRow(item, index)).join("")}
      </div>
      ${view.confirmReset ? renderResetConfirmation() : ""}
      ${renderBottomNav("workouts")}
    </section>
  `;
}

function renderResetConfirmation() {
  return `
    <div class="confirm-overlay" role="dialog" aria-modal="true" aria-labelledby="reset-confirm-title">
      <div class="confirm-dialog">
        <h2 id="reset-confirm-title">Start a new workout?</h2>
        <div class="confirm-actions">
          <button class="btn primary" data-action="confirm-reset">YES</button>
          <button class="btn" data-action="cancel-reset">NO</button>
        </div>
      </div>
    </div>
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
  const isStretching = getFixedItemLabel(item) === "Stretch";
  const completedButtonLabel = isStretching ? "Kết thúc buổi tập" : "Tiếp tục";
  const completedButtonAction = isStretching ? "home" : "list";
  app.innerHTML = `
    <section class="screen">
      ${topbar(item.title, "list")}
      <div class="exercise-row workout-card routine-static${completedEntry ? " completed" : ""}" style="--card-image:url('${imageUrl}')">
        <span class="card-overlay"></span>
        <span class="row-main">
          <span class="card-kicker">${escapeHtml(getFixedItemLabel(item))}</span>
          ${renderWorkoutCardTitle(item.title)}
          <span class="row-meta">${escapeHtml(item.note)}</span>
        </span>
        <span class="row-actions">
          <span class="target-pill">${escapeHtml(item.prescription)}</span>
        </span>
      </div>
      <div class="panel">
        <div class="fixed-detail-actions">
          ${item.link ? `<a class="btn guide-button fixed-guide-button" href="${item.link}" target="_blank" rel="noreferrer">View guide</a>` : ""}
          ${completedEntry
            ? `<div class="split-action fixed-completion-split">
                <button class="btn split-undo" type="button" data-action="undo-fixed" data-entry="${completedEntry.id}">Undo</button>
                <button class="btn split-continue" type="button" data-action="${completedButtonAction}">${completedButtonLabel}</button>
              </div>`
            : `<button class="btn primary fixed-complete-button" data-action="toggle-fixed" data-item="${item.id}" data-title="${escapeHtml(item.title)}" data-prescription="${escapeHtml(item.prescription)}">Hoàn thành</button>`}
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
        <button class="btn split-continue" type="button" data-action="list">Continue workout</button>
      </div>
    `
    : "";
  const inputPanel = `
    <form class="panel form" data-form="track" data-category="${category.id}" data-history-id="${view.editingHistoryId || ""}">
      <p class="eyebrow">${historyItem ? "Enter latest result" : "Enter result"}</p>
      ${category.type === "seconds" ? renderSecondsInput(Number(initial || PLANK_START)) : renderRepInputs(initial)}
      <button class="btn primary" type="submit">${historyItem ? "Save changes" : "Complete"}</button>
    </form>
  `;
  const completedPanel = `
    <div class="panel completed-track-panel">
      <div class="inspiration-frame" style="--inspiration-image:url('${inspirationImageUrl}')">
        <span class="inspiration-overlay"></span>
        <span class="inspiration-copy">
          <span class="eyebrow">Completed today</span>
          <strong>${escapeHtml(exercise)}</strong>
          <span>${formatResult(completedEntry?.result, category.type)}</span>
        </span>
      </div>
      ${completedActions}
    </div>
  `;

  app.innerHTML = `
    <section class="screen">
      ${topbar(category.title, "list", "", "compact")}
      ${isCompletedView ? "" : `<div class="panel track-overview">
        <div class="track-overview-main">
          <p class="eyebrow">${escapeHtml(category.title)}</p>
          <h2 class="track-exercise-title">${escapeHtml(exercise)}</h2>
          <div class="summary-grid vertical">
            <div class="metric"><span>Today target</span><strong>${formatResult(target, category.type)}</strong></div>
            <div class="metric"><span>Latest result</span><strong>${formatResult(progress.lastResult, category.type)}</strong></div>
            <div class="metric"><span>Level-up goal</span><strong>${formatGoal(category.type)}</strong></div>
          </div>
          <a class="btn guide-button" href="${category.link}" target="_blank" rel="noreferrer">View guide</a>
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
      <span>Seconds</span>
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
      ${topbar("Profile", "")}
      <div class="panel profile-plan">
        <p class="eyebrow">Current plan</p>
        <h2>${escapeHtml(getPlanLabel())}</h2>
        <p class="plan-text">${escapeHtml(formatRoutineSummary())}</p>
        <button class="btn primary" data-action="edit-plan">Edit plan</button>
      </div>
      <div class="panel">
        <h2>Latest history</h2>
        ${recent ? renderHistoryItem(recent) : `<p class="muted">No workouts saved yet.</p>`}
      </div>
      ${renderBottomNav("profile")}
    </section>
  `;
}

function renderAchievement() {
  const detailCategory = view.achievementDetailCategoryId ? getCategory(view.achievementDetailCategoryId) : null;
  if (detailCategory) {
    renderAchievementDetail(detailCategory);
    return;
  }

  const activeTab = view.achievementTab === "skill" ? "skill" : "progressions";
  app.innerHTML = `
    <section class="screen achievement-screen">
      ${topbar("Achievement", "")}
      ${renderAchievementTabs(activeTab)}
      ${activeTab === "skill"
        ? `<div class="achievement-list skill-list">${ADVANCED_SKILLS.map((skill) => renderSkillCard(skill)).join("")}</div>`
        : `<div class="achievement-list">${progressions.map((category) => renderAchievementCard(category)).join("")}</div>`
      }
      ${renderBottomNav("achievement")}
    </section>
  `;
}

function renderAchievementTabs(activeTab) {
  return `
    <div class="achievement-tabs" role="tablist" aria-label="Achievement views">
      <button
        class="achievement-tab ${activeTab === "progressions" ? "active" : ""}"
        type="button"
        data-action="achievement-tab"
        data-tab="progressions"
        role="tab"
        aria-selected="${activeTab === "progressions"}"
      >All Progressions</button>
      <button
        class="achievement-tab ${activeTab === "skill" ? "active" : ""}"
        type="button"
        data-action="achievement-tab"
        data-tab="skill"
        role="tab"
        aria-selected="${activeTab === "skill"}"
      >Skill</button>
    </div>
  `;
}

function renderAchievementCard(category) {
  const currentIndex = state.currentExercises[category.id] || 0;
  const achievedCount = currentIndex + 1;
  const total = category.exercises.length;
  const percent = Math.round((achievedCount / total) * 100);
  const tier = getAchievementTier(currentIndex, total);
  const currentExercise = getCurrentExercise(category);
  const finalExercise = category.exercises[total - 1];
  const tierVars = getTierCssVars(tier);
  return `
    <article class="achievement-card tier-${tier} ${total >= 13 ? "dense-nodes" : ""}" style="--achievement-count:${total}; ${tierVars}">
      <div class="achievement-identity">
        <div class="achievement-icon-ring">
          <img class="achievement-image" src="./images/achievements/${category.id}.png" alt="" />
        </div>
        <div class="achievement-title-block">
          <h2>${escapeHtml(getProgressionDisplayTitle(category.title))}</h2>
          <p><strong>${achievedCount}/${total}</strong> skills <span>${percent}%</span></p>
        </div>
      </div>
      <div class="achievement-track">
        <div class="achievement-steps">
          ${category.exercises.map((exercise, index) => {
            const stepTier = getAchievementStepTier(index, total);
            return `
            <span
              class="achievement-step tier-${stepTier} ${index < currentIndex ? "achieved reached is-completed" : ""} ${index === currentIndex ? "current reached is-current" : ""} ${index > currentIndex ? "locked is-locked" : ""}"
              style="${getNodeCssVars(stepTier)}"
              title="${escapeHtml(exercise)}"
            >${index > currentIndex ? iconSvg("lock") : index + 1}</span>
          `;
          }).join("")}
        </div>
        <div class="achievement-exercise-labels">
          ${renderAchievementExerciseLabel(currentExercise)}
          ${renderAchievementExerciseLabel(finalExercise)}
        </div>
        <div class="achievement-tier-labels">
          <span class="tier-label tier-beginner ${getAchievementTierLabelState("beginner", currentIndex, total)}">Beginner</span>
          <span class="tier-label tier-intermediate ${getAchievementTierLabelState("intermediate", currentIndex, total)}">Intermediate</span>
          <span class="tier-label tier-pro ${getAchievementTierLabelState("pro", currentIndex, total)}">Pro</span>
          <span class="tier-label tier-master ${getAchievementTierLabelState("master", currentIndex, total)}">Master</span>
        </div>
      </div>
      <button class="achievement-open" data-action="achievement-detail" data-category="${category.id}" aria-label="${escapeHtml(category.title)}">›</button>
    </article>
  `;
}

function renderAchievementDetail(category) {
  const currentIndex = state.currentExercises[category.id] || 0;
  const tier = getAchievementTier(currentIndex, category.exercises.length);
  app.innerHTML = `
    <section class="screen achievement-screen tier-${tier}">
      ${topbar(category.title, "achievement", "", "compact")}
      <div class="achievement-detail-list">
        ${category.exercises.map((exercise, index) => renderAchievementDetailRow(exercise, index, currentIndex)).join("")}
      </div>
      ${renderBottomNav("achievement")}
    </section>
  `;
}

function renderAchievementDetailRow(exercise, index, currentIndex) {
  const status = index < currentIndex ? "passed" : index === currentIndex ? "current" : "locked";
  return `
    <div class="achievement-detail-row ${status}">
      <span class="achievement-detail-number">${index + 1}</span>
      <strong>${escapeHtml(exercise)}</strong>
      <span class="achievement-detail-status">
        ${status === "passed" ? iconSvg("check") : ""}
        ${status === "locked" ? iconSvg("lock") : ""}
      </span>
    </div>
  `;
}

function renderSkillCard(skill) {
  const status = getSkillStatus(skill);
  const unlocked = status.unlocked;
  return `
    <article class="achievement-card skill-card ${unlocked ? "unlocked" : "locked"}">
      <div class="skill-lock-ring">
        ${unlocked ? iconSvg("trophy") : iconSvg("lock")}
      </div>
      <div class="achievement-title-block skill-title-block">
        <h2>${escapeHtml(skill.title)}</h2>
        <p>${unlocked ? "Unlocked" : "Locked"} <span>${status.completed}/${status.total}</span></p>
      </div>
      <div class="skill-prerequisites">
        ${status.prerequisites.map((item) => `
          <span class="skill-prerequisite ${item.met ? "met" : "missing"}">
            ${item.met ? iconSvg("check") : iconSvg("lock")}
            ${escapeHtml(item.label)}
          </span>
        `).join("")}
      </div>
    </article>
  `;
}

function renderTimer() {
  const modeConfig = getTimerModeConfig(timerState.mode);
  const progress = timerState.duration ? 1 - (timerState.remaining / timerState.duration) : 0;
  const isDone = timerState.remaining <= 0;
  app.innerHTML = `
    <section class="screen timer-screen">
      ${topbar("Timer", "", `<button class="btn small icon-action timer-settings" type="button" aria-label="Timer settings">${iconSvg("settings")}</button>`)}
      ${isDone ? "" : `<div class="timer-mode-tabs">
        <button class="timer-mode ${timerState.mode === "rest" ? "active rest" : ""}" data-action="timer-mode" data-mode="rest">REST</button>
        <button class="timer-mode ${timerState.mode === "break" ? "active break" : ""}" data-action="timer-mode" data-mode="break">BREAK</button>
      </div>`}
      ${!isDone && timerState.mode === "rest" ? `
        <div class="timer-duration-tabs" aria-label="Rest duration">
          <button class="timer-duration ${timerState.restDuration === 60 ? "active" : ""}" data-action="timer-duration" data-duration="60">1 min</button>
          <button class="timer-duration ${timerState.restDuration === 120 ? "active" : ""}" data-action="timer-duration" data-duration="120">2 min</button>
        </div>
      ` : ""}
      <div class="timer-watch ${timerState.mode}" style="--timer-progress:${Math.round(progress * 360)}deg; --timer-accent:${modeConfig.accent};">
        ${isDone ? `
          <p class="eyebrow">BACK TO WORK</p>
          <h1>NEXT SET</h1>
          <p class="muted">The alert stops when you continue training.</p>
          <button class="btn primary pulse" data-action="timer-continue">Continue workout</button>
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
      ${category ? `<button class="btn" data-action="edit-history" data-history-id="${item.id}">Edit</button>` : ""}
    </div>
  `;
}

function topbar(title, backAction, extraActions = "", variant = "") {
  return `
    <div class="topbar ${backAction ? "with-back" : ""} ${variant ? `topbar-${variant}` : ""}">
      ${backAction ? `<button class="back-fab" data-action="${backAction}" aria-label="Back"></button>` : ""}
      <div class="brand">
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
    { id: "home", label: "Home", icon: "home", action: "home" },
    { id: "workouts", label: "Workout", icon: "dumbbell", action: "list" },
    { id: "timer", label: "Timer", icon: "timer", action: "timer" },
    { id: "achievement", label: "Achieve", icon: "trophy", action: "achievement" },
    { id: "profile", label: "Profile", icon: "profile", action: "accumulation" },
  ];
  return `
    <nav class="bottom-nav" aria-label="Main navigation">
      ${items.map((item) => `
        <button class="nav-item ${active === item.id ? "active" : ""}" data-action="${item.action}">
          <span>${iconSvg(item.icon)}</span>
          <strong>${item.label}</strong>
        </button>
      `).join("")}
    </nav>
  `;
}

function iconSvg(name) {
  const icons = {
    calendar: `<rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M8 3v4M16 3v4M4 10h16"></path>`,
    bar_chart: `<path d="M4 19V9M10 19V5M16 19v-8M3 19h18"></path><path d="M5 9l5-4 5 6 5-7"></path>`,
    trend_up: `<path d="M4 17c5-1 8-5 10-10"></path><path d="M12 7h6v6"></path><path d="M5 20h14"></path>`,
    trophy: `<path d="M8 4h8v5a4 4 0 0 1-8 0V4Z"></path><path d="M8 6H5a3 3 0 0 0 3 5M16 6h3a3 3 0 0 1-3 5M12 13v5M8 20h8"></path>`,
    shield: `<path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z"></path>`,
    users: `<path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 20a5 5 0 0 1 10 0M11 20a5 5 0 0 1 10 0"></path>`,
    lightning: `<path d="m13 2-8 12h6l-1 8 9-13h-6l0-7Z"></path>`,
    home: `<path d="M4 11 12 4l8 7v9H6v-7h12"></path>`,
    dumbbell: `<rect x="3" y="8" width="3" height="8" rx="1"></rect><rect x="6" y="6" width="3" height="12" rx="1"></rect><path d="M9 12h6"></path><rect x="15" y="6" width="3" height="12" rx="1"></rect><rect x="18" y="8" width="3" height="8" rx="1"></rect>`,
    timer: `<path d="M12 8v5l3 2"></path><circle cx="12" cy="13" r="8"></circle><path d="M9 2h6M12 2v3"></path>`,
    settings: `<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1A2 2 0 0 1 7.1 4l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1A2 2 0 0 1 19.9 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"></path>`,
    profile: `<circle cx="12" cy="8" r="4"></circle><path d="M4 21a8 8 0 0 1 16 0"></path>`,
    lock: `<rect x="6" y="10" width="12" height="10" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path>`,
    check: `<path d="m5 13 4 4L19 7"></path>`,
    rotate_ccw: `<path d="M3 12a9 9 0 1 0 3-6.7"></path><path d="M3 4v6h6"></path>`,
    undo: `<path d="M9 7 4 12l5 5"></path><path d="M5 12h10a5 5 0 0 1 5 5v1"></path>`,
    restore: `<path d="M6.4 8.1A8 8 0 1 1 4 14"></path><path d="M3.5 6.2v6.2h6.2"></path>`,
  };
  return `<svg class="line-icon" viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.home}</svg>`;
}

function normalizeExerciseName(value) {
  return String(value)
    .toLowerCase()
    .replaceAll("&", "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function findExerciseIndex(categoryId, exerciseName) {
  const category = getCategory(categoryId);
  if (!category) return -1;
  const normalizedName = normalizeExerciseName(exerciseName);
  return category.exercises.findIndex((exercise) => normalizeExerciseName(exercise) === normalizedName);
}

function hasPassedExercise(categoryId, exerciseName) {
  const index = findExerciseIndex(categoryId, exerciseName);
  if (index < 0) return false;
  return Number(state.currentExercises[categoryId] || 0) > index;
}

function getSkillById(skillId) {
  return ADVANCED_SKILLS.find((skill) => skill.id === skillId) || null;
}

function getPrerequisiteLabel(prerequisite) {
  return prerequisite.label || prerequisite.exercise || prerequisite.skillId || "";
}

function isPrerequisiteMet(prerequisite, visited = new Set()) {
  if (prerequisite.type === "exercise") return hasPassedExercise(prerequisite.categoryId, prerequisite.exercise);
  if (prerequisite.type === "skill") return isSkillUnlocked(prerequisite.skillId, visited);
  return false;
}

function isSkillUnlocked(skillId, visited = new Set()) {
  if (visited.has(skillId)) return false;
  const skill = getSkillById(skillId);
  if (!skill) return false;
  visited.add(skillId);
  return skill.prerequisites.every((prerequisite) => isPrerequisiteMet(prerequisite, new Set(visited)));
}

function getSkillStatus(skill) {
  const prerequisites = skill.prerequisites.map((prerequisite) => ({
    label: getPrerequisiteLabel(prerequisite),
    met: isPrerequisiteMet(prerequisite),
  }));
  const completed = prerequisites.filter((prerequisite) => prerequisite.met).length;
  return {
    prerequisites,
    completed,
    total: prerequisites.length,
    unlocked: completed === prerequisites.length,
  };
}

function getAchievementTier(index, total) {
  const ratio = (index + 1) / total;
  if (ratio >= 0.76) return "master";
  if (ratio >= 0.51) return "pro";
  if (ratio >= 0.26) return "intermediate";
  return "beginner";
}

function getProgressionDisplayTitle(title) {
  return String(title || "").replace(/\s+progression$/i, "");
}

const tierColors = {
  beginner: { color: "#9cff2e", rgb: "156, 255, 46" },
  intermediate: { color: "#28a8ff", rgb: "40, 168, 255" },
  pro: { color: "#d85cff", rgb: "216, 92, 255" },
  master: { color: "#ffb21f", rgb: "255, 178, 31" },
};

function getTierCssVars(tier) {
  const color = tierColors[tier] || tierColors.beginner;
  return `--tier-color:${color.color}; --tier-rgb:${color.rgb}; --current-tier-color:${color.color}; --current-tier-glow:rgba(${color.rgb}, 0.30);`;
}

function getNodeCssVars(tier) {
  const color = tierColors[tier] || tierColors.beginner;
  return `--node-color:${color.color}; --node-rgb:${color.rgb}; --node-glow:rgba(${color.rgb}, 0.34);`;
}

function getExerciseLabelFitClass(text) {
  const length = String(text || "").length;
  if (length >= 30) return "label-fit-small";
  if (length >= 20) return "label-fit-medium";
  return "label-fit-normal";
}

function renderAchievementExerciseLabel(text) {
  return `
    <span class="achievement-exercise-label ${getExerciseLabelFitClass(text)}">
      ${escapeHtml(text)}
    </span>
  `;
}

function getExerciseLabelLines(text) {
  const words = String(text || "").trim().split(/\s+/).filter(Boolean);
  if (words.length <= 2) return [words.join(" ")];
  if (words.length === 3) return [words[0], words.slice(1).join(" ")];

  const lines = [];
  for (let index = 0; index < words.length; index += 2) {
    lines.push(words.slice(index, index + 2).join(" "));
  }
  return lines;
}

function getAchievementStepTier(index, total) {
  return getAchievementTier(index, total);
}

function getAchievementTierLabelState(tier, currentIndex, total) {
  const tiers = ["beginner", "intermediate", "pro", "master"];
  const currentTier = getAchievementTier(currentIndex, total);
  const tierPosition = tiers.indexOf(tier);
  const currentPosition = tiers.indexOf(currentTier);
  if (tierPosition < currentPosition) return "reached";
  if (tierPosition === currentPosition) return "current";
  return "future";
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

function getStrengthMode(value) {
  return value === "pull" ? "pull" : "push";
}

function getVisibleRoutineItems(items, programId, strengthMode = "push") {
  if (programId !== "strength") return items;
  const allowedItems = STRENGTH_MODE_ITEMS[getStrengthMode(strengthMode)];
  return items.filter((item) => allowedItems.has(item.id));
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
  setView({ name: "list", confirmReset: false });
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
        <p class="eyebrow">Guide before choosing a plan</p>
        <h2>Review difficulty and technique</h2>
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
        ${item.link ? `<a class="link" href="${item.link}" target="_blank" rel="noreferrer">View guide</a>` : ""}
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
          ${renderWorkoutCardTitle(item.title)}
          <span class="row-meta">${escapeHtml(item.note)}</span>
          ${completedEntry ? `<span class="done-line">Completed today</span>` : ""}
        </span>
        <span class="row-actions">
          ${completedEntry
            ? `<span class="btn small card-reset-button" data-action="undo-fixed" data-entry="${completedEntry.id}" aria-label="Reset completion">${iconSvg("restore")}</span>`
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
  const latestCompletedEntry = completedEntries[0] || null;
  const completedClass = completedEntries.length ? " completed" : "";
  const imageKey = getExerciseImageKey(category, exercise);
  const meta = getExerciseMeta(category, exercise);
  const difficulty = getExerciseDifficulty(category);
  const imageUrl = exerciseImageMap[imageKey] || exerciseImageMap.strength;
  const alternatingNote = item.kind === "alternating" ? `Alternating: today is ${category.id === "push_up" ? "push up" : "dip"}` : item.note;
  const rowActions = [
    ready ? `<span class="status-pill ready">Ready to level up</span>` : "",
    latestCompletedEntry ? `<span class="btn small card-reset-button" data-action="undo-exercise" data-entry="${latestCompletedEntry.id}" aria-label="Reset completion">${iconSvg("restore")}</span>` : "",
  ].filter(Boolean).join("");
  return `
    <button class="exercise-row workout-card${completedClass}" data-action="track" data-category="${category.id}" style="--card-image:url('${imageUrl}')">
      <span class="card-overlay"></span>
      <span class="row-main">
        <span class="card-kicker">${escapeHtml(meta.type)}</span>
        ${renderWorkoutCardTitle(exercise)}
        <span class="row-meta">${escapeHtml(alternatingNote)}</span>
        <span class="card-stats">
          <span>${escapeHtml(meta.muscle)}</span>
          <span>${difficulty}</span>
        </span>
        ${item.kind === "alternating" ? `
          <span class="inline-actions">
            <span class="mini-toggle ${category.id === "push_up" ? "selected" : ""}" data-action="set-alternating" data-category="push_up">Push up</span>
            <span class="mini-toggle ${category.id === "dip" ? "selected" : ""}" data-action="set-alternating" data-category="dip">Dip</span>
          </span>
        ` : ""}
        ${latestCompletedEntry ? (() => {
          const entryCategory = getCategory(latestCompletedEntry.category);
          return `<span class="done-line">Completed today: ${escapeHtml(latestCompletedEntry.exerciseName)} - ${formatResult(latestCompletedEntry.result, entryCategory.type)}</span>`;
        })() : ""}
        ${ready ? `<span class="row-meta">Suggestion: move to ${escapeHtml(getNextExercise(category) || "the final exercise")}</span>` : ""}
        <span class="card-field-label">${escapeHtml(getShortCategoryLabel(category.id))}</span>
      </span>
      ${rowActions ? `<span class="row-actions">${rowActions}</span>` : ""}
    </button>
  `;
}

function getCurrentExercise(category) {
  return category.exercises[state.currentExercises[category.id]] || category.exercises[0];
}

function getCardTitleFitClass(text) {
  const length = String(text || "").length;
  if (length >= 28) return "title-fit-small";
  if (length >= 15) return "title-fit-medium";
  return "";
}

function renderWorkoutCardTitle(text) {
  return `
    <strong class="card-title ${getCardTitleFitClass(text)}">
      ${getWorkoutCardTitleLines(text).map((line) => `<span class="card-title-line">${escapeHtml(line)}</span>`).join("")}
    </strong>
  `;
}

function getWorkoutCardTitleLines(text) {
  const words = String(text || "").trim().split(/\s+/).filter(Boolean);
  const lines = [];
  let currentLine = "";

  words.forEach((word) => {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    if (candidate.length <= 10) {
      currentLine = candidate;
      return;
    }
    if (currentLine) lines.push(currentLine);
    currentLine = word;
  });

  if (currentLine) {
    lines.push(currentLine);
  }
  return lines.length ? lines : [String(text || "")];
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
  if (action === "achievement") setView({ name: "achievement", achievementDetailCategoryId: null, achievementTab: view.achievementTab || "progressions", completion: null, editingHistoryId: null });
  if (action === "achievement-tab") setView({ name: "achievement", achievementDetailCategoryId: null, achievementTab: button.dataset.tab === "skill" ? "skill" : "progressions" });
  if (action === "achievement-detail") setView({ name: "achievement", achievementDetailCategoryId: button.dataset.category, achievementTab: "progressions" });
  if (action === "home-see-more") document.getElementById("home-intro")?.scrollIntoView({ behavior: "smooth", block: "start" });
  if (action === "edit-plan") setView({ name: "plan" });
  if (action === "fixed-detail") setView({ name: "fixed", fixedItemId: button.dataset.item });
  if (action === "timer") setView({ name: "timer" });
  if (action === "timer-mode") setTimerMode(button.dataset.mode);
  if (action === "timer-duration") setTimerDuration(button.dataset.duration);
  if (action === "timer-toggle") toggleTimer();
  if (action === "timer-reset") resetTimer();
  if (action === "timer-skip") skipTimer();
  if (action === "timer-continue") continueTimerWorkout();
  if (action === "strength-mode") {
    const strengthMode = getStrengthMode(button.dataset.mode);
    if (view.name === "plan") {
      setView({ name: "plan", strengthMode });
    } else {
      state.strengthMode = strengthMode;
      saveState();
      setView({ name: "list" });
    }
  }
  if (action === "program-option") setView({
    name: "plan",
    programId: button.dataset.program,
    strengthMode: button.dataset.program === "strength" ? getStrengthMode(view.strengthMode || state.strengthMode) : view.strengthMode,
    draftExercises: { ...state.currentExercises, ...(view.draftExercises || {}) },
  });
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
  if (action === "reset-today") setView({ name: "list", confirmReset: true });
  if (action === "confirm-reset") resetTodayCompletions();
  if (action === "cancel-reset") setView({ name: "list", confirmReset: false });
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
    state.strengthMode = program.id === "strength" ? getStrengthMode(form.dataset.strengthMode || view.strengthMode || state.strengthMode) : state.strengthMode;
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
