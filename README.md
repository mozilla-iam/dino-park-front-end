# Mozillians front-end

A front-end for the repositioned Mozillians, to display, edit and search for people's profiles.

## Setup

To set up, you need the [yarn package manager](https://yarnpkg.com/lang/en/docs/install/) installed. 

For the first time only, run:

```yarn install``` 

This will install the dependencies the project requires. Then run:

```yarn serve```

This will start a local server.

## Tests

Unit tests are in the `tests` folder and ran with Jest.

## Technical considerations

### General front-end practices

* We ensure our code complies to the [Web Content Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.1) (WCAG)], so that Mozillians is usable by all and we comply with relevant legislation.
    * Example: our autocomplete works well with keyboard, screenreaders and dictation 
* We prefer web platform features to library-specific workarounds
    * Example: we make sure form elements are in a `form` tag and submitting works (by pressing ENTER in an element, by firing `form.submit()`, by pressing GO on iOS, etc)
* We embrace progressive enhancement to make our code more resilient with things like feature detection
    * Examples: if we require geolocation to display something, we build the no-geo view first, make sure that is GOOD then add geo as an enhancement so that it is GREAT. An escalator is still stairs when the power is off.

### CSS

* We embrace the cascade where it makes sense.
* We write as little CSS as possible.
* No preprocessor, but we'll postprocess so that we can autoprefix.
* We use CSS Variables for colors.
* We don't scope CSS with JS, we use ‘naming for scoping’, i.e. by sticking to unique names, we have workable enough ‘scopes’. 
* As a naming convention we follow BEM (block, element, modifier). Quick summary:
    * `.block` is a component
    * `.block--modifier` is a variation on the block component
    * `.block__element` is something inside the block component
* We make sure components look good (not necessarily the same) in the devices, browsers, platforms our users use.
