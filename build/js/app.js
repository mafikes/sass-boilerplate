/**
 * file: App.js
 * Main App Js Controller
 */
// Vendors
//=require vendors/modernizr-3.7.1.min.js
//=require vendors/avoid-console.js
//=require vendors/jquery-3.4.1.min.js

// Utils
//=require utils/_helpers.js

// Components
//=require components/_carousel.js

// Example use

// Google Analytics
ga.q = [];
ga.l = +new Date;
ga('create', 'UA-XXXXX-Y', 'auto'); // set own UA
ga('set', 'transport', 'beacon');
ga('send', 'pageview');