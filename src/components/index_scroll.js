window?.addEventListener("load", function () {
  new WOW({
    scrollContainer: "#snapper",
  }).init();
  var appScroll = appScrollForward;
  var appScrollPosition = 0;
  var scheduledAnimationFrame = false;
  var snapperEl = document.getElementById("snapper");
  var diamondEl = document.getElementById("diamond");
  var secondSectionLeftEl = document.getElementById(".about-left-text");
  var firstSection = document.getElementById("Home").offsetTop;
  var secondSection = document.getElementById("About").offsetTop;

  function appScrollReverse() {
    scheduledAnimationFrame = false;
    console.log("reverse", appScrollPosition);

    // Scrolling from second section to first section
    if (appScrollPosition < secondSection - secondSection * 0.5) {
      diamondEl.classList.remove("diamond-fly");
      console.log("here doing tit");
    }
    // Scrolling from first section to second section
    if (appScrollPosition > secondSection - secondSection * 0.8) {
      diamondEl.classList.add("diamond-fly");
      console.log("here doing taht");
    }
    // If inside first section - do nothing
    if (appScrollPosition < secondSection) return;
    // if after second section - do not snap
    snapperEl.classList.remove("snap-y");
    appScroll = appScrollForward;
  }

  function appScrollForward() {
    scheduledAnimationFrame = false;
    console.log("forw", appScrollPosition);
    if (appScrollPosition > secondSection) return;
    // If before second section - make sure to snap
    console.log("yeah makiing sure snappy");
    snapperEl.classList.add("snap-y");
    appScroll = appScrollReverse;
  }

  function appScrollHandler(evt) {
    appScrollPosition = evt.target.scrollTop;
    if (scheduledAnimationFrame) return;
    scheduledAnimationFrame = true;
    requestAnimationFrame(appScroll);
  }

  snapperEl.addEventListener("scroll", appScrollHandler, { passive: true });
});
