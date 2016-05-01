## [Unreleased][unreleased]
 - Work in progress.

## [0.0.2] - 2016-04-30
 - Added `continue`, `reset`, and `skip` buttons for `paper-step` with default and custom text labels.
 - Bugfix: Change `paper-step` `title` property to `label` to avoid actual HTML title attribute behaviors.
 - Refactor HTML and CSS for `paper-step` labels and icons using `flex box`.
 - Add HTML and CSS for optional sub heading.
 - Added `iron-form` and `paper-input` elements to demo.
 - Added methods to disable and re-enable `continue` button during after form submit.
 - Added `this.debounce` to `paper-button` click methods to avoid multiple submit events.
 - Added `iron-form` event listeners for submit, error, and response type events.
     - `paper-steps` will advance to the next step upon successful HTTP response (status code 200).
     - `paper-steps` will remain on the current step if any other HTTP response codes are returned.
 - Added `icons:check` for completed steps.


## [0.0.1] - 2016-04-25
 - Basic initial implementation of material design paper steppers.
 - Display steps horizontally or vertically.
 - Setup tests to run on travis-ci.org.


[unreleased]: /patgmiller/paper-steps/compare/0.0.2...master
[0.0.2]: /patgmiller/paper-steps/compare/0.0.1...0.0.2
[0.0.1]: /patgmiller/paper-steps/compare/fb1b126...0.0.1
