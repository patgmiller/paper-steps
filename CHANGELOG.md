## [Unreleased][unreleased]
 - Work in progress.


## [0.0.6] - 2016-05-19
 - Added `linear` property to `paper-steps`. When `linear` is true, then advancement to another step will be blocked until the step prior to desired step selection has been completed.


## [0.0.5] - 2016-05-18
 - Bugfix / Improvement: Updated custom styling to fix and also simplify overriding them.


## [0.0.4] - 2016-05-06
 - Added property `initialStep`, ability to start on a step other than first one.
  - When set, `paper-steps` will also check if previous steps are complete and mark them as complete.
 - Added `iron-resizeable` behavior to switch from horizontal to vertical on devices with smaller screens.


## [0.0.3] - 2016-05-02
 - Added `editable` to `paper-step`; by default `paper-step` is not editable once it has been submitted.
 - Added tests for `paper-button` click to ensure only one event is triggered.
 - Added `gh-pages` project page patgmiller.github.io/paper-steps


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


[unreleased]: https://github.com/patgmiller/paper-steps/compare/0.0.6...master
[0.0.6]: https://github.com/patgmiller/paper-steps/compare/0.0.5...0.0.6
[0.0.5]: https://github.com/patgmiller/paper-steps/compare/0.0.4...0.0.5
[0.0.4]: https://github.com/patgmiller/paper-steps/compare/0.0.3...0.0.4
[0.0.3]: https://github.com/patgmiller/paper-steps/compare/0.0.2...0.0.3
[0.0.2]: https://github.com/patgmiller/paper-steps/compare/0.0.1...0.0.2
[0.0.1]: https://github.com/patgmiller/paper-steps/compare/fb1b126...0.0.1
