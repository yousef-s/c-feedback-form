## Feedback Form

This POC provides a feedback form (with basic validation), a set of latest comments and a trend graph displaying the count of each feedback rating.

## Running

Clone the repository and then...

To install dependencies:

```sh
yarn install
````

**To make this POC simple to run/interact with I've introduced some mock comments.**

To run a development server (with mock data), will load in browser as localhost:3000:

```sh
yarn run start:mock
```

To run a development server, will load in browser as localhost:3000:
```sh
yarn run start
```

To run tests:

```sh
yarn test
```

## Overview & Project Architecture

- Use of create-react-app due to POC nature
- Segmentation of React components into atoms (re-usable small abstractions on HTML good for a component library) and views (composite atoms/HTML with their own contextual components - to be mounted as view/nav states)
- Creation of custom react hooks for form control to abstract away form logic from components to keep them light
- Use of co-located CSS modules for styling
- Jest/react-testing-library unit/integration tests focusing on component states/behaviours


## Productionisation

When building this app for production, here's a short list of some of the things I would add/do differently.

### Build/Development workflow

- Ejection from create-react-app for more control
- Introduce code formatting (prettier)
- Introduce git hooks to run lightweight formatting/linting checks as appropriate before commit or push
- Consider introducing better project-file module management (e.g. typescript aliases) to supplant verbose relative imports
- CI/CD pipeline with quality gates (e.g. automation tests, code quality checks, etc)

### Components

- Extraction of atoms to a component library, wrapped in a viewer (e.g. storybook) to ensure sharing components across projects happens as the appropriate level with visibility
- Swap out form control for [Formik](https://jaredpalmer.com/formik) a widely used and battle tested library for form building in React, creating appropriate abstractions as needed.

### Styling

- Introduce a CSS pre-processor (e.g. Sass) for better style composition and common styles (e.g. color palettes, layouts, etc)

### Data

- Defining a state management architecture (however this is a single view) ensuring that local component state/global client-side state is used as appropriate (e.g. redux, mobx, graphql client etc)

### Testing

- Define a thorough testing strategy across the testing pyramid assessing what tool should be used where along with cost/benefit analysis of maintainability and visibility vs. running time/cost
- ^ Potentially swapping out react-testing-library in-memory integration tests for Cypress run browser tests

### General

- Ensuring accessibility standards are met and introduction of accessibility automated testing (a11y)
- Perf testing components, ensuring that they are wrapped as appropriate/unneccessary re-renders don't occur
- Logging as appropriate, pushing logs to a third party logging tool along with source-maps (reduce mean-time to discovery/resolution)
- Ensuring bundle size is as minimal as possible (e.g. tree-shaking)
- Introducing top-level error boundaries to prevent user's ever being in an unhandled state