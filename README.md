# Student Finance Tracker

A small web app for tracking student spending, built with plain HTML, CSS and Javascript (no frameworks) for my responsive UI assignment

**Live site:** https://lizaituze1.github.io/student-finance-tracker/
**Demo video:** 
**Contact:** https://github.com/lizaituze1 | l.ituze@alustudent.com

## Theme

Student Finance Tracker. It lets a student record expenses, search and sort them, and see how much they have spent compared with a spending cap

## Features

- Add records with a description, amount, category and date
- Delete records with a confirmation, and edit them through the form
- Sort by date, description or amount
- Live regex search with highlighted matches ('<mark>') and a case-sensitive toggle
- Dashboard: total records, total spent, top category, cap left and a 7-day trend chart
- Spending cap with a polite or assertive ARIA live message
- Data saved in localStorage, plus JSON export and validated JSON import
- Responsive layout with three breakpoints (mobile, 768px, 1024px)

## Regex catalog

| Where | Pattern | Example |
|---|---|---|
| Description | `/^\S(?:.*\S)?$/` | "Lunch" passes, " Lunch" fails |
| Extra spaces | `/\s{2,}/g` | "Lunch  at" becomes "Lunch at" |
| Amount | `/^(0\|[1-9]\d*)(\.\d{1,2})?$/` | "12.50" passes, "012" fails |
| Date | `/^\d{4}-(0[1-9]\|1[0-2])-(0[1-9]\|[12]\d\|3[01])$/` | "2025-09-29" passes, "2025-13-01" fails |
| Category | `/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/` | "Self-care" passes, "Food2" fails |
| Duplicate words (advanced, back-reference) | `/\b(\w+)\s+\1\b/i` | "Lunch lunch" is caught |

The date rule also checks that the day really exists, so "2025-02-31" fails.

Search examples to try in the app: `coffee|tea` and `\b(\w+)\s+\1\b`. Invalid patterns sjow a message instead of crashing.

## Keyboard map

| Key | Action |
|---|---|
| Tab / Shift+Tab | Move between links, fields and buttons |
| First Tab press | Shows the "Skip to content" link |
| Enter or Space | Press a focused button |
| Arrow keys | Change the sort dropdown |
| Enter | Submit a form |

## Accessibility notes

- Semantic landmard: header, nav, main, section, footer, and one h1
- Every input has a bound label, and errors appear under the field with `role="status"
- Inputs get `aria-invalid` when they fail validation
- The cap message uses `aria-live` (polite under the cap, assertive over it)
- Visible focus outlines and a skip-to-content link
- The 7-day chart has an `aria-label` that lists its values
- Colours were chosen for good contrast

## How to run the app and tests

1. Open the project folder in VS Code and install the Live Server extension.
2. Right-click `index.html` and choose **Open with Live Server** (modules do not work from `file://`)
3. For tests, open `tests.html` the same way. Every line should say PASS.
4. To try te sample data, use **Import JSON** in Settings and choose `seed.json`.

## Project structure

```
index.html tests.html seed.json
styles/main.css
scripts/ main.js, state.js, ui.js, validators.js, search.ja, stats.js, storage.js
docs/ spec and wireframes
```

## Known limitations

- Currency settings (base currency plus two manual rates) are in the form but conversion is not built yet
- Editing happens through the form at the top, not inline in each row
- Tests cover the validators only, not search or stats

## AI assistance

I used Claude (an AI assistant) throughout this project, including for planning, debugging, and writing this README.

