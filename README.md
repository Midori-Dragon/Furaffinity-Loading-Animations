# Furaffinity Loading Animations

Library for creating different loading animations on Furaffinity. Also see this Script on Greasy Fork as [Furaffinity-Loading-Animations](https://greasyfork.org/de/scripts/475041-furaffinity-loading-animations)

## How to use

- `@require` this script with the following url "https://raw.githubusercontent.com/Midori-Dragon/Furaffinity-Loading-Animations/main/Furaffinity-Loading-Animations.js"
  <br>
- Create a new Loading Animation:
  ```javascript
  const baseElem = document.getElementById('spinner-container');
  const spinner = new LoadingSpinner(baseElem); //always give the baseElem as parameter
  spinner.visible = true;
  ```
  See [LoadingSpinner](#loadingspinner) for more info
  <br>
- _Optional:_ Change Settings:
  ```javascript
  spinner.forecolorHex = "#FF0000";
  ```

## Documentation

### LoadingSpinner

The LoadingSpinner class contains following Properties:

- `delay` - The time in Milliseconds which each full rotation takes. `default: 1000`
- `size` - The size of the Spinner. `default: 60`
- `spinnerThickness` - The thickness of the Spinner. `default: 4`
- `spinnerLength` - The length of the Spinner. `default: 1` _(Can only be set in quarters. 1 = 25%, 2 = 50% ...)_
- `linearSpin` - Whether the Spinner spins linearly. `default: false`
- `forecolorHex` - The Forecolor of the Spinner in Hex. `default: #8941de`
- `backcolorHex` - The Backcolor of the Spinner in Hex. `default: #f3f3f3`
- `visible` - Whether the Spinner is visible. `default: false`
- `animationCurve` - The Animation Curve of the Spinner. `default: "cubic-bezier(.53,.24,.46,.83)"` _(For example: "ease-in-out")_
- `spinner` - The actual Spinner Element.
- `spinnerContainer` - The Container of the Spinner.
- `baseElem` - The Base Element in which the SpinnerContainer Element is located.

### LoadingTextSpinner

The LoadingTextSpinner class contains following Properties:

- `delay` - The time in Milliseconds which each full rotation takes. `default: 600` _(Changes only apply after visibility is reset)_
- `characters` - The characters that make up the Text rotation as an array. `default: ["◜", "◠", "◝", "◞", "◡", "◟"]`
- `visible` - Whether the Spinner is visible. `default: false`
- `fontSize` - The Font Size of the Spinner Text. `default: 15`
- `spinner` - The actual Spinner Element.
- `baseElem` - The Base Element in which the Spinner Element is located.

### LoadingImage

The LoadingImage class contains following Properties:

- `delay` - The delay in Milliseconds after each animation step. `default: 100` _(Changes only apply after visibility is reset)_
- `size` - The size of the Image. `default: 60`
- `doScaleImage` - Whether the Image should be scaled up and down during the animation. `default: true`
- `scaleChange` - The amount of Scale in percent the Image should be changed with each animation step. `default: 0.05`
- `scaleChangeMax` - Maximum Scale of the Image in percent. `default: 1.2`
- `scaleChangeMin` - Minimum Scale of the Image in percent. `default: 0.8`
- `doRotadeImage` - Whether the Image should be rotated during the animation. `default: true`
- `rotateDegrees` - The amount of Degrees the Image should be rotated with each animation step. `default: 5`
- `imageSrc` - The Source Url of the Image. `default: "https://www.furaffinity.net/themes/beta/img/banners/fa_logo.png"`
- `isGrowing` - Whether the Image is currently growing or shrinking. Changes when animating. `default: true`
- `scale` - The current Scale of the Image in percent. Changes when animating. `default: 1`
- `rotation` - The current Rotation of the Image in Degrees. Changes when animating. `default: 0`
- `visible` - Whether the Spinner is visible. `default: false`
- `image` - The actual Image Element.
- `imageContainer` - The Container of the Image.
- `baseElem` - The Base Element in which the ImageContainer Element is located.

### LoadingBar

The LoadingBar class contains following Properties:

- `delay` - The time in Milliseconds which each full animation loop takes. `default: 600`
- `text` - The Text that will be displayed on the Bar.
- `height` - The Height of the LoadingBar. `default: 60`
- `visible` - Whether the LoadingBar is visible. `default: false`
- `fontSize` - The Font Size of the LoadingBar Text. `default: 15`
- `cornerRadius` - The Corner Radius of the LoadingBar. `default: 0`
- `gradient` - The Gradient of the LoadingBar. `default: "repeating-linear-gradient(to right, ... 100%)"`
- `loadingBar` - The actual LoadingBar Element.
- `baseElem` - The Base Element in which the LoadingBar Element is located.

### ProgressBar

The ProgressBar class contains following Properties:

- `text` - The Text that will be displayed on the Bar.
- `showPercent` - Whether the Progress Percentage should be displayed on the Bar. `default: false`
- `imageSrc` - The Source Url of the Image taken as Background. _(No image if empty)_
- `height` - The Height of the ProgressBar. `default: 60`
- `visible` - Whether the ProgressBar is visible. `default: false`
- `fontSize` - The Font Size of the ProgressBar Text. `default: 15`
- `cornerRadius` - The Corner Radius of the ProgressBar. `default: 0`
- `gradient` - The Gradient of the ProgressBar. `default: "linear-gradient(to right, ... 100%)"`
- `backcolorHex` - The Backcolor of the ProgressBar in Hex. `default: #000000`
- `progressBarContainer` - The Container of the ProgressBar.
- `progressBarChild` - The actual ProgressBar Element.
- `progressBarShrinker` - The Shrinker of the ProgressBar that displays the Progress.
- `progressBarText` - The Text Element of the ProgressBar.
- `baseElem` - The Base Element in which the ProgressBarContainer Element is located.

Functions:

- `update(value)` - Updates the ProgressBar with the given value in percent. _(For example: update(50) will set the ProgressBar to 50%)_
  - _`value` - The new value in percent_
