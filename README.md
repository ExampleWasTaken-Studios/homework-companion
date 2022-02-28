# Homework Companion

### Notes
- a task title is capped at 30 chars to not overlap with the date
- any input needs a char limit to accomodate for UI design (no overlapping)
- BUG: modal can be bigger than window
```css
transition-timing-function: cubic-bezier(.4, 0, .2, 1);
transition-duration: .15s
```

### Settings
The settings are structured in categories that each have their respective settings. The categories are in list view on the left. The respective settings are in a list view on the right.
| Setting | Function | Category |
| ------- | -------- | -------- |
| Perfomance mode (not final name) |  replaces performance intensive features and effects with less performance intensive alternatives | Customization |
| - | version, copyright, disclaimer, 3rd-party licenses | About |
| Auto start | automatically start application at startup | General |
| Check for updates | does that really need explaining? :p | General |


### CSS conventions
- variables should ONLY be defined in [`./src/styles/global-values.css`](./src/styles/global-values.css)
- all general styles should be defined in [`./src/styles/styles.css`](./src/styles/styles.css)
- styles inside [`./src/styles/styles.css`](./src/styles/styles.css) should be grouped into logical section, divided by comments.
- media queries are placed at the end of the file

Example:
```css
/* Sidebar START */
.sidebar {
  background-color: #000;
}
/* Sidebar END */

/* Container START */
.container {
  background-color: var(--bg-primary);
}
/* Container END */

/* Media queries START */
@media screen and (max-width: 768px) {
  background-color: #FFF;
}
/* Media queries END */
```
- colors should ALWAYS be defined as a variable
