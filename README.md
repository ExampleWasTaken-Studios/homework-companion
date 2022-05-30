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
| Hardware Acceleration | Use you GPU for certain tasks. | General |


### CSS conventions
In order to keep our CSS codebase clean we set up some conventions outlined below.

- Variables must be defined in [`global.css`](./src/renderer/styles/global.css).
- Each component has it's own file named `<component_name>.css` inside the [`styles`](./src/renderer/styles/) folder. We refer to this file as "module".  
The structure of the [`styles`](./src/renderer/styles/) folder should, to an extend, copy the structure of the [renderer](./src/renderer) folder.  
Example:
```sh
# Actual structure:
renderer
|- components
   |- changelog
      |- FixContainer.tsx

# Styles structure:
styles
|- changelog
   |- FixContainer.css
```
The goal of this approach is to avoid situations where the naming of the CSS is ambiguous or unclear.  
Example: You have a file named `FixContainer.css`. Without the `changelog` directory it would not be clear what the file belongs to.
- Each module is imported in [`main.css`](./src/renderer/styles/main.css).
- Colors are defined as a variable in [`global.css`](./src/renderer/styles/global.css).


