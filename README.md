# DinoPark front-end

A front-end for the repositioned Mozillians, to display, edit and search for people's profiles.

## Setup

To install all resources for this project, please make sure to have [Node](https://nodejs.org/) installed, then run:

```bash
npm install
```

This will install the dependencies the project requires. Then run:

```bash
npm run serve
```

This will start a local server.

Note that this does not give you data. To use the front-end with data, you must point the `DP_K8S` variable to a URL that serves DinoPark data, for example using [dino-park-dev-tools](https://github.com/mozilla-iam/dino-park-dev-tools).

```
export DP_K8S=[url goes here]
```

## Tests

Unit tests are in the `tests` folder and ran with Jest.

## App-wide patterns

### Apollo/GraphQL

To transfer profile data between front-end components and the back-end, we use Apollo, a client for GraphQL transactions.

The **client** is defined in `main.js`, the queries are in the `queries` folder and the components that trigger Apollo to get (‘query’) and change (‘mutate’) data can be anywhere in the application.

We use the `<ApolloQuery>` and `<ApolloMutation>` components for querying and mutating. They contain a `<template>` with `slot-scope` that has the data and error information in it. Within that template, data can be used as usual.

### Modal overlay

We use the `<Modal>` component to describe the contents and behaviour of modal overlays.

To add a modal overlay, we need to parts: something that triggers it, and the overlay itself.

A trigger can be a `button` that `onclick` changes the `isOpen` value of an overlay to `true` (or a script that does that on whatever event required). The easiest is to link an overlay to its triggering button is to use refs, for example:

```markup
<button @click="$refs.myOverlay.isOpen = true">Change info</button>
<Modal ref="myOverlay">
<!-- content goes here -->
</Modal>
```

Notes:

- While a modal is open, scroll is prevented and focus is trapped inside the modal.
- We don't do anything special to make the modal be layered on top of everything else. Increase the `z-index` if there are elements with a higher z-index.

### ShowMore

There is a `<ShowMore>` component used anywhere you would show more content using a button.

Features:

- opened/closed state is conveyed to Assistive Technologies (AT) through ARIA
- focus can be moved to the newly opened content (optional)
- can use icons for expanded and collapsed state
- can use (visible or visually hidden) text for expanded and collapsed state

### Popover

`<Popover>` is a component that is shared between tooltips, Contact Me and custom selects. In most cases, it is used as the toggled content of a `ShowMore` component.

## Technical considerations

### General front-end practices

- We ensure our code complies to the [Web Content Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.1) (WCAG), so that Mozillians is usable by all and we comply with relevant legislation.
  - Example: our autocomplete works well with keyboard, screenreaders and dictation
- We prefer web platform features to library-specific workarounds
  - Example: we make sure form elements are in a `form` tag and submitting works (by pressing ENTER in an element, by firing `form.submit()`, by pressing GO on iOS, etc)
- We embrace progressive enhancement to make our code more resilient with things like feature detection
  - Examples: if we require geolocation to display something, we build the no-geo view first, make sure that is GOOD then add geo as an enhancement so that it is GREAT. An escalator is still stairs when the power is off.

### CSS

- We embrace the cascade where it makes sense.
- We write as little CSS as possible.
- We don't scope CSS with JS, we use ‘naming for scoping’, i.e. by sticking to unique names, we have workable enough ‘scopes’.
- CSS is included with the highest level component that needs it. For example, styles that work for the whole app, go into the `App.vue` file. Styles that only apply to a Profile view go to `Profile.vue`, styles that only apply to tag commponents go to `Tag.vue`.
- As a naming convention we follow BEM (block, element, modifier). Quick summary:
  - `.block` is a component
  - `.block--modifier` is a variation on the block component
  - `.block__element` is something inside the block component
- We make sure components look good (not necessarily the same) in the devices, browsers, platforms our users use.

### Deploying
This application will automatically deploy to test/dev from the `master` branch. To deploy to `prod` cut a release tag following the patter in `releases` with the suffix `-prod`.
