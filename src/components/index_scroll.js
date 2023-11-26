import ScrollTrigger from "@terwanerik/scrolltrigger";
window?.addEventListener("load", function () {
  new WOW({
    scrollContainer: "#snapper",
  }).init();
  var appScroll = appScrollForward;
  var appScrollPosition = 0;
  var scheduledAnimationFrame = false;
  var snapperEl = document.getElementById("snapper");
  var diamondEl = document.getElementById("diamond");
  var secondSectionLeftEl = document.querySelector(".about-left-text");
  var firstSection = document.getElementById("Home").offsetTop;
  var aboutLeftText = document.querySelector(".about-left-text");
  var secondSection = document.getElementById("About").offsetTop;
  var thirdSection = document.getElementById("Third").offsetTop;

  function appScrollReverse() {
    scheduledAnimationFrame = false;
    // console.log("reverse", appScrollPosition);

    // Scrolling from second section to first section
    if (appScrollPosition < secondSection - secondSection * 0.5) {
      diamondEl.classList.remove("diamond-fly");
      // aboutLeftText.classList.remove("slideInRight");
      // aboutLeftText.classList.add("slideInRight");
      // aboutLeftText.classList.remove("slideInLeft");
      // console.log("here doing tit");
    }
    // Scrolling from first section to second section
    if (appScrollPosition > secondSection - secondSection * 0.8) {
      diamondEl.classList.add("diamond-fly");
      // aboutLeftText.classList.remove("slideInRight");
      // aboutLeftText.classList.remove("slideInLeft");
      // aboutLeftText.classList.add("slideInLeft");
      // console.log("here doing taht");
    }
    // If inside first section - do nothing
    if (appScrollPosition < thirdSection) return;
    if (appScrollPosition > thirdSection) {
      snapperEl.classList.remove("snap-y");
    }
    // if after second section - do not snap
    appScroll = appScrollForward;
  }

  function appScrollForward() {
    scheduledAnimationFrame = false;
    // console.log("forw", appScrollPosition);
    if (appScrollPosition > thirdSection) return;
    if (appScrollPosition < thirdSection) {
      snapperEl.classList.add("snap-y");

      console.log("yeah makiing sure snappy");
    }
    // If before second section - make sure to snap
    appScroll = appScrollReverse;
  }

  function appScrollHandler(evt) {
    appScrollPosition = evt.target.scrollTop;
    if (scheduledAnimationFrame) return;
    scheduledAnimationFrame = true;
    requestAnimationFrame(appScroll);
  }

  snapperEl.addEventListener("scroll", appScrollHandler, { passive: true });

  diamondEl.addEventListener("scroll", (e) => {
    // var el = document.querySelector(".right-side");
    e.preventDefault();

    console.log("diamond scrolling");
    return false;
    // snapperEl.dispatchEvent(new Event("scroll"));
  });

  (function () {
    var snapper = document.querySelector("#snapper"),
      $window = $(window),
      win_height_padded = $window.height() * 1.1;

    snapper.addEventListener("scroll", revealOnScroll, { passive: true });

    function revealOnScroll() {
      var scrolled = $window.scrollTop(),
        win_height_padded = $window.height() * 1.1;

      // Showed...
      $(".revealOnScroll:not(.animated)").each(function () {
        var $this = $(this),
          offsetTop = $this.offset().top;

        const duration = $this.data("duration"),
          animation = $this.data("animation"),
          timeout = $this.data("timeout");

        if (scrolled + win_height_padded > offsetTop) {
          if ($this.data("timeout")) {
            window.setTimeout(function () {
              $this.addClass(
                `animated animation-duration-${duration} ${animation}`
              );
            }, parseInt(timeout));
          } else {
            $this.addClass(
              `animated animation-duration-${duration} ${animation}`
            );
          }
        }
      });
      // Hidden...
      $(".revealOnScroll.animated").each(function (index) {
        var $this = $(this),
          offsetTop = $this.offset().top;
        if (scrolled + win_height_padded < offsetTop) {
          $(this).removeClass(
            "animated fadeInUp flipInX slideInLeft slideInRight lightSpeedIn"
          );
        }
      });
    }

    revealOnScroll();
  })();

  // init controller
  // var controller = new ScrollMagic.Controller();

  // create a scene
  // new ScrollMagic.Scene({
  //   duration: 100, // the scene should last for a scroll distance of 100px
  //   offset: 50, // start this scene after scrolling for 50px
  // })
  //   .setPin("section") // pins the element for the the scene's duration
  //   .addTo(controller); // assign the scene to the controller

  // const trigger = new ScrollTrigger();
  // Add all html elements with attribute data-trigger
  // trigger.add("[data-slideInBottom]", { once: false });

  const trigger = new ScrollTrigger({
    // Set custom (default) options for the triggers, these can be overwritten
    // when adding new triggers to the ScrollTrigger instance. If you pass
    // options when adding new triggers, you'll only need to pass the object
    // `trigger`, e.g. { once: false }
    trigger: {
      // If the trigger should just work one time
      once: false,
      offset: {
        // Set an offset based on the elements position, returning an
        // integer = offset in px, float = offset in percentage of either
        // width (when setting the x offset) or height (when setting y)
        //
        // So setting an yOffset of 0.2 means 20% of the elements height,
        // the callback / class will be toggled when the element is 20%
        // in the viewport.
        element: {
          x: 0,
          y: (trigger, rect, direction) => {
            // You can add custom offsets according to callbacks, you
            // get passed the trigger, rect (DOMRect) and the scroll
            // direction, a string of either top, left, right or
            // bottom.
            return 0.2;
          },
        },
        // Setting an offset of 0.2 on the viewport means the trigger
        // will be called when the element is 20% in the viewport. So if
        // your screen is 1200x600px, the trigger will be called when the
        // user has scrolled for 120px.
        viewport: {
          x: 0,
          y: (trigger, frame, direction) => {
            // We check if the trigger is visible, if so, the offset
            // on the viewport is 0, otherwise it's 20% of the height
            // of the viewport. This causes the triggers to animate
            // 'on screen' when the element is in the viewport, but
            // don't trigger the 'out' class until the element is out
            // of the viewport.

            // This is the same as returning Math.ceil(0.2 * frame.h)
            return trigger.visible ? 0 : 0.2;
          },
        },
      },
      toggle: {
        // The class(es) that should be toggled
        class: {
          in: "slideInDown", // Either a string, or an array of strings
          out: ["slideInUp", "extraClassToToggleWhenHidden"],
        },
        callback: {
          // A callback when the element is going in the viewport, you can
          // return a Promise here, the trigger will not be called until
          // the promise resolves.
          in: () => {
            console.log("INNNNNN");
          },
          // A callback when the element is visible on screen, keeps
          // on triggering for as long as 'sustain' is set
          visible: null,
          // A callback when the element is going out of the viewport.
          // You can also return a promise here, like in the 'in' callback.
          //
          // Here an example where all triggers take 10ms to trigger
          // the 'out' class.
          out: (trigger) => {
            // `trigger` contains the Trigger object that goes out
            // of the viewport
            return new Promise((resolve, reject) => {
              setTimeout(resolve, 10);
            });
          },
        },
      },
    },
    // Set custom options and callbacks for the ScrollAnimationLoop
    scroll: {
      // The amount of ms the scroll loop should keep triggering after the
      // scrolling has stopped. This is sometimes nice for canvas
      // animations.
      sustain: 200,
      // Window|HTMLDocument|HTMLElement to check for scroll events
      element: snapperEl,
      // Add a callback when the user has scrolled, keeps on triggering for
      // as long as the sustain is set to do
      callback: () => {
        // console.log("did scroll");
      },
      // Callback when the user started scrolling
      start: () => {},
      // Callback when the user stopped scrolling
      stop: () => {},
      // Callback when the user changes direction in scrolling
      directionChange: () => {},
    },
  });
  trigger.add("[data-slideInBottom]", { once: false });
});
