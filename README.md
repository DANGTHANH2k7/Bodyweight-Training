# Simple Bodyweight Tracker

Static MVP for a personal bodyweight progression tracker.

## Plan setup

The first screen offers three program options:

- Complete beginner routine
- Start Bodyweight basic routine
- Strength split

After choosing a program, the app fills the workout fields automatically. Users do not type exercise names. Complete beginner is first and locked to its foundation routine. Basic routine and Strength split show scrollable variation lists with about four exercises visible at once.

The Start Bodyweight basic routine slots are:

- Dynamic warm up: 10 min
- Squat progression: 3 sets, 4-8 reps
- Pull up progression: 3 sets, 4-8 reps
- Handstand push up progression: 3 sets, 4-8 reps
- Leg raises progression: 3 sets, 4-8 reps
- Push up or dip alternating slot: 3 sets, 4-8 reps
- Horizontal pulls progression: 3 sets, 4-8 reps
- Plank progression: 30-60s
- Static stretching: 10 min

Warm up and stretching are shown in the workout order but are not tracked in history.

## Push up / dip alternating

The workout list shows either push up or dip in the alternating slot. After completing that slot, the next workout shows the other one. Push up and dip keep separate progression state and history.

## Run

Open `index.html` directly in a browser, or run a local static server:

```sh
python3 -m http.server 5173
```

Then visit `http://localhost:5173`.

## Storage

The app stores data locally in the browser with `localStorage` under:

```text
simple-bodyweight-tracker:v1
```
