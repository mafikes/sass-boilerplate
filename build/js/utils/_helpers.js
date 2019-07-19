/* ------------------------------------------------------------------------
/* Base: Helpers
/* This file contains helpers classes.
/* ------------------------------------------------------------------------ */

// Google Analytics
// Set into window function GA for sending data to analytics
window.ga = function () {
    ga.q.push(arguments)
};