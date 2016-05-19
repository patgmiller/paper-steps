# paper-steps [![GitHub version](https://badge.fury.io/gh/patgmiller%2Fpaper-steps.svg)](https://badge.fury.io/gh/patgmiller%2Fpaper-steps) [![Build Status](https://travis-ci.org/patgmiller/paper-steps.svg?branch=master)](https://travis-ci.org/patgmiller/paper-steps)

An implementation of the Material Design [steppers](https://www.google.com/design/spec/components/steppers.html).

## Demo

Check it out live! [patgmiller.github.io/paper-steps/](https://patgmiller.github.io/paper-steps/)


## Installation

To use this:

    bower install paper-steps


## Dependencies

Are managed via [Bower](http://bower.io/). You can install that via:

    npm install -g bower

Then, go ahead and download the dependencies for `<paper-steps>` with:

    bower install


## Getting Started

If you wish to try out `paper-steps` in isolation or develop on it locally, use
[Polyserve](https://github.com/PolymerLabs/polyserve) to keep the
bower dependencies in line. You can install it via:

    npm install -g polyserve

And you can run it via:

    polyserve

Once running, you can preview `paper-steps` at
`http://localhost:8080/components/paper-steps/`.


## Testing

Simply navigate to the `/test` directory of `paper-steps` to run the tests. If
you are using Polyserve: `http://localhost:8080/components/paper-steps/test/`

### web-component-tester

The tests are compatible with [web-component-tester](https://github.com/Polymer/web-component-tester).
Install it via:

    npm install -g web-component-tester

Then, you can run all tests on _all_ of your local browsers via: 

    wct
