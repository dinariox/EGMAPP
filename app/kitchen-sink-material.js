/* eslint-disable */
module.exports = function(vueApp) {
  var myApp = window.f7;
  var $$ = window.Dom7;

  // Show/hide preloader for remote ajax loaded pages
  // Probably should be removed on a production/local app
  /* ===== Pull To Refresh Demo ===== */
  myApp.onPageInit('plan', function(page) {
    myApp.pullToRefreshDone();
    // Pull to refresh content
    var ptrContent = $$(page.container).find('.pull-to-refresh-content');
    // Add 'refresh' listener on it
    ptrContent.on('refresh', function(e) {
      // Emulate 2s loading
      setTimeout(function() {
        setPlan();
        // When loading done, we need to "close" it
        myApp.pullToRefreshDone();
      }, 2000);
    });
  });

}
