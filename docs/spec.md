\# Spec: Student Finance Tracker



\## Data model

Each record is one expense and has:

\- id: a unique label for the record (e.g. "txn\_1")

\- description: what the money was spent on (e.g. "Lunch at cafeteria")

\- amount: how much was spent (e.g. 12.50)

\- category: type of spending (Food, Books, Transport, Entertainment, Fees, Other)

\- date: when it was spent, written YYYY-MM-DD

\- createdAt: when the record was added (set automatically)

\- updatedAt: when the record was last edited (set automatically)



\## Settings

\- baseCurrency: my main currency

\- rates: two other currencies with manual exchange rates

\- cap: the spending limit



\## Storage

\- Records are saved in localStorage under the key "sft:records"

\- Settings are saved in localStorage under the key "sft:settings"



\## Accessibility plan

\- Landmarks: header, nav, main, section, footer

\- A skip-to-content link is the first thing on the page

\- Every input has a label, and error messages sit under the input

\- Errors and status messages use aria-live (polite for normal messages, assertive when over the cap)

\- Everything works with the keyboard only (Tab, Enter, Space, Esc)

\- Focus is always visible

\- Colors will meet 4.5:1 contrast

