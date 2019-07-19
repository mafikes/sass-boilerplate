# SASS Boilerplate
Best start for start coding new template with including html and javascripts.
Create more pages (index.html, contact.html) but header is component, you can include it.
Fully prepared the ecosystem.
All source in folder build, all files are builded to public folder.

- Project use only bootstrap 4 grid on flexbox (vendors)
- Use normalize
- Use modernizr

### Start
```
git clone git@github.com:mafikes/sass-boilerplate.git
```

### Install

Install all npm dependencies
```
npm i
```

Build all resources
command: prod - build all resources minified 
```
gulp prod
```

Now start gulp watch
command: watch - open page with browsersync live reloading
```
gulp watch
```

### Include required js
Main file is build/js/app.js, where you can include other js files.
Example: (check build folder where is live example)
```js
//=require vendors/avoid-console.js
```

### Include html
All layouts is in folder build/layouts. In root folder is all main pages. 
Folder base is like header, footer, scripts. Content folder is for other pages (home, contact etc.)
Example: (check build folder where is live example)
```js
<!--=include base/_header.html -->
```
### Thanks!
If you have some idea how to do it better, send me pull-request.
Enjoy!

### Resources:
1. https://sass-guidelin.es/cz/
2. https://getbootstrap.com/docs/4.3/layout/grid/
3. How setup gulp https://gist.github.com/jeromecoupe/0b807b0c1050647eb340360902c3203a
