# ICVM FE Boilerplate

## Prerequisite

### NodeJS

Download and install Node JS from the official website: https://nodejs.org/en/

### Checking your version of npm and Node.js

To see if you already have Node.js and npm installed and check the installed version, run the following commands:

```bash
node -v
npm -v
```

## Install npm/node modules

```bash
$ cd assets/
$ npm install
```

## NPM tasks

- `dev` - run dev server locally to compile SCSS and JS files into one
- `build` - compile and build minified versions of CSS and JS files for the production
- `build-CSS` - compile and build minified version of the CSS file for the production
- `build-JS` - compile and build minified version of the JS file(s) for the production
- `build-icons` - create icons from the SVG files inside folder `assets/icons/svg`

## BEM (SCSS/CSS)

**BEM** — is a methodology that helps you to create reusable components and code sharing in front‑end development: https://getbem.com/

## Important!

Do not edit directly two files, because those are generated and built from the SCSS files:

- `assets/css/main.css`
- `assets/css/main.min.css`

Print and PDF CSS files can be edited directly, because they should be for print views only, while main CSS file is using only for the screen.

## SCSS

### Directory structure

- `/components`: discrete, complete chunks of UI (e.g. `.c-btn {}`)
- `/elements`: unclassed HTML elements (e.g. `a {}, blockquote {}, address {}`).
- `/extra`: accessibility and CKEditor classes for the CMS
- `/generic`: low-specificity, far-reaching rulesets (e.g. resets).
- `/objects`: objects, abstractions, and design patterns (e.g. `.o-layout {}`).
- `/plugins`: anything related to the 3rd party plugin styles
- `/settings`: global variables, site-wide settings, config switches, etc.
- `/tools`: site-wide mixins and functions
- `/utilities`: high-specificity, very explicit selectors, overrides and helper classes (e.g. `.u-show-print {}, .u-hide-print {}`).

### Colors

Map file for colors: `assets/css/src/scss/settings/_settings.colors.scss`

```SCSS
// primary/default key
.c-title {
    color: getColor('black');
}

// other key/value
.c-subtitle {
    color: getColor('text', 'other');
}
```

### Font size (responsive)

Map file for colors: `assets/css/src/scss/settings/_settings.font-size.scss`

```SCSS
$settings-font-map: (
    'c-title': (
        null: 32,
        tablet: 28, // tablet breakpoint
        mobile: 24, // mobile breakpoint
    ),
);
```

Example of using font-size function:

```SCSS
.c-title {
    display: block;
    @include font-map('c-title');
}
```

### Breakpoints

Map file for colors: `assets/css/src/scss/settings/_settings.breakpoints.scss`

```SCSS
.c-title {
    display: block;
    @include font-map('c-title');

    @include breakpoint(tablet) {
        padding-top: 20px;
    }

    @include breakpoint(mobile) {
        padding-top: 0;
    }
}
```

## Icons

Source icon files are placed inside folder `assets/icons/svg` and generated in the folder `assets/icons/`.

Use generated icon in the HTML:

```HTML
<span class="icon-facebook"></span>
```

### Rules to follow for creating icon

- naming: `uEAXX-name.svg` where `XX` is the number and `name` is the icon name (e.g. `uEA01-facebook.svg`)
- SVG size should be 1:1, in this case we used `1024x1024`
- SVG icons shouldn't have any strokes because it won't work
- run npm task `build-icons` to build icon font from the SVG files (`$ npm run build-icons`)

## JavaScript

Every JavaScript file is generated into one `main.js` file. You can check a few examples of the components inside `assets/js/src/components` folder, alongside with how to initialize those functions in the `assets/js/src/main.js` file.

### Important!

You should ONLY edit files that are located inside folder: `assets/js/src/**`

Don't edit anything from this list, because it's generated from the `src` folder:

- folder for temp file generation: `assets/js/temp`
- file for the dev: `assets/js/main.js`
- file optimized for production: `assets/js/main.min.js`
