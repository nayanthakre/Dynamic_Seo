# Dynamic Interview SEO

This demo renders interview data from a URL ID and updates the page SEO metadata during SSR.

## Development server

To start a local development server, run:

```bash
cd dynamic-interview-seo
npm start
```

Open `http://localhost:4200/interview/1`, then use the React, Angular, and Frontend links in the header. Each URL loads a different record from `public/assets/interviews.json` and changes the content, title, description, Open Graph tags, and canonical URL.

## SSR and SEO verification

Build and start the SSR server from the project directory:

```bash
npm run build
PORT=4000 npm run serve:ssr:dynamic-interview-seo
```

Check `/interview/1` and `/interview/2`. Use **View Page Source** and search for the interview title and description; they should be present in the initial HTML. In Chrome DevTools, run Lighthouse in Navigation mode with Performance, Accessibility, Best Practices, and SEO enabled.

Lighthouse is a technical audit; its score is not proof that Google indexed the page.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
