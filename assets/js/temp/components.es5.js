"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var BoxAnimation = /*#__PURE__*/function () {
  /**
   *
   * @param props
   */
  function BoxAnimation(props) {
    _classCallCheck(this, BoxAnimation);

    var defaults = {
      items: '.js-box-animation',
      box: '.js-box-item',
      titles: '.js-box-title'
    };
    this.options = _extends({}, defaults, props);
    this.init();
  } // region Getters

  /**
   *
   * @returns {*|jQuery.fn.init|jQuery|HTMLElement}
   */


  _createClass(BoxAnimation, [{
    key: "items",
    get: function get() {
      return $(this.options.items);
    } // endregion
    // region Init

    /**
     *
     */

  }, {
    key: "init",
    value: function init() {
      var _this = this;

      if (this.items.length > 0) {
        this.items.each(function (index, element) {
          var tl = gsap.timeline({
            paused: true
          });
          var $element = $(element);
          var $item = $element.find(_this.options.box);
          var $title = $element.find(_this.options.titles);

          if ($item.length > 0 && $title.length > 0) {
            tl.fromTo($item, {
              y: '100%'
            }, {
              y: '0%',
              duration: 1,
              ease: 'expo.out'
            }, 0);
            tl.fromTo($title, {
              y: '-100%'
            }, {
              y: '0%',
              duration: 1,
              ease: 'expo.out'
            }, 0);
            $element.on('mouseenter', function () {
              tl.timeScale(1).play();
            }).on('mouseleave', function () {
              tl.timeScale(2).reverse();
            });
          }
        });
      } // set min height for elements to even each other


      this.setMinHeight();
      $(window).on('resize', function () {
        _this.setMinHeight();
      });
    }
    /**
     *
     */

  }, {
    key: "setMinHeight",
    value: function setMinHeight() {
      if (this.items.length > 0) {
        // set initial value
        var minHeight = 0; // loop items and find biggest element

        this.items.each(function (index, element) {
          element.style.minHeight = '1px';
          if (minHeight < element.offsetHeight) minHeight = element.offsetHeight;
        }); // set CSS minHeight

        this.items.css({
          minHeight: minHeight
        });
      }
    } // endregion

  }]);

  return BoxAnimation;
}();
"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var InsightForm = /*#__PURE__*/function () {
  /**
   *
   * @param props
   */
  function InsightForm(props) {
    _classCallCheck(this, InsightForm);

    var defaults = {
      btns: '.js-check-dates',
      inputs: '.js-date-input',
      error: '.js-error-msg'
    };
    this.options = _objectSpread(_objectSpread({}, defaults), props);
    if (this.btns.length > 0 && this.inputs.length > 0) this.init(); // region States

    this.changedInputs = []; // endregion
  } // region Getters

  /**
   *
   * @returns {jQuery|HTMLElement|[]|*}
   */


  _createClass(InsightForm, [{
    key: "btns",
    get: function get() {
      return $(this.options.btns);
    }
    /**
     *
     * @returns {jQuery|HTMLElement|[]|*}
     */

  }, {
    key: "inputs",
    get: function get() {
      return $(this.options.inputs);
    }
    /**
     *
     * @returns {jQuery|HTMLElement|[]|*}
     */

  }, {
    key: "errors",
    get: function get() {
      return $(this.options.error);
    } // endregion
    // region Init

    /**
     *
     */

  }, {
    key: "init",
    value: function init() {
      var _this = this;

      var $startMonth = this.inputs.filter('[name="startmonth"]');
      var $startYear = this.inputs.filter('[name="startyear"]');
      var $endMonth = this.inputs.filter('[name="endmonth"]');
      var $endYear = this.inputs.filter('[name="endyear"]');
      this.btns.on('click', function (ev) {
        var startMonth = $startMonth[0].value;
        var startYear = $startYear[0].value;
        var endMonth = $endMonth[0].value;
        var endYear = $endYear[0].value || 9999;

        if (_this.changedInputs.length > 0) {
          if (startYear > endYear) {
            ev.preventDefault();

            _this.showError('Please select a valid date range.');
          } else if (startYear === endYear && startMonth > endMonth) {
            ev.preventDefault();

            _this.showError('Please select a valid months range.');
          } else if (!!startMonth && !startYear) {
            ev.preventDefault();

            _this.showError('Please select both months and years.');
          } else if (!!endMonth && endYear === 9999) {
            ev.preventDefault();

            _this.showError('Please select both months and years.');
          }
        }
      });
      this.inputs.on('change', function (ev) {
        var name = ev.currentTarget.name;
        var value = ev.currentTarget.value;

        var foundIndex = _this.changedInputs.findIndex(function (el) {
          return el === name;
        });

        if (foundIndex < 0 && value) {
          _this.changedInputs.push(name);
        } else if (foundIndex >= 0 && !value) {
          _this.changedInputs.splice(foundIndex, 1);
        }

        _this.hideErrors();
      });
    } // endregion
    // region Messages

    /**
     *
     */

  }, {
    key: "hideErrors",
    value: function hideErrors() {
      // hide error message always
      this.errors.css('display', 'none');
    }
    /**
     *
     * @param msg {string}
     */

  }, {
    key: "showError",
    value: function showError(msg) {
      this.errors.css('display', 'block').html(msg);
    } // endregion

  }]);

  return InsightForm;
}();
"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var LensSlider = /*#__PURE__*/function () {
  /**
   *
   * @param props
   */
  function LensSlider(props) {
    _classCallCheck(this, LensSlider);

    var defaults = {
      wrapper: '.js-lens-slider-wrapper',
      slider: '.js-lens-slider'
    };
    this.options = _objectSpread(_objectSpread({}, defaults), props);
    if (this.wrapper.length > 0) this.init();
  } // region Getters

  /**
   *
   * @returns {jQuery|HTMLElement|[]|*}
   */


  _createClass(LensSlider, [{
    key: "wrapper",
    get: function get() {
      return $(this.options.wrapper);
    } // endregion
    // region Init

    /**
     *
     */

  }, {
    key: "init",
    value: function init() {
      var _this = this;

      this.wrapper.each(function (index, element) {
        var $element = $(element);
        var $slider = $element.find(_this.options.slider);
        new Swiper($slider[0], {
          autoplay: {
            delay: 4000
          },
          effect: 'fade',
          fadeEffect: {
            crossFade: true
          },
          allowTouchMove: false,
          simulateTouch: false
        });
      });
    } // endregion

  }]);

  return LensSlider;
}();
"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var MapKey = /*#__PURE__*/function () {
  /**
   *
   * @param props
   */
  function MapKey(props) {
    _classCallCheck(this, MapKey);

    var defaults = {
      element: '.js-custom-dropdown',
      target: '.js-custom-dropdown-btn',
      activeClass: 'is-opened'
    };
    this.options = _objectSpread(_objectSpread({}, defaults), props);
    this.activeElement = null;
    if (this.elements.length > 0) this.init();
  } // region Getters

  /**
   *
   * @returns {*|Window.jQuery|HTMLElement}
   */


  _createClass(MapKey, [{
    key: "elements",
    get: function get() {
      return $(this.options.element);
    } // endregion
    // region Init

    /**
     *
     */

  }, {
    key: "init",
    value: function init() {
      var _this = this;

      this.elements.each(function (index, element) {
        var $element = $(element);
        var $button = $element.find(_this.options.target);
        $button.on('click', function () {
          $element.hasClass(_this.options.target) ? _this.activeElement = null : _this.activeElement = $element;
          $element.toggleClass(_this.options.activeClass);
        });
      });
      $(document).mouseup(function (ev) {
        if (_this.activeElement && !_this.activeElement.is(ev.target) && _this.activeElement.has(ev.target).length === 0) {
          _this.activeElement.removeClass(_this.options.activeClass);
        }
      });
    } // endregion

  }]);

  return MapKey;
}();
"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Navigation = /*#__PURE__*/function () {
  /**
   *
   * @param props
   */
  function Navigation(props) {
    _classCallCheck(this, Navigation);

    var defaults = {
      main: '.js-main-nav',
      secondaryNavigation: '.js-secondary-navigation',
      list: '.js-mobile-navigation',
      trigger: '.js-mobile-navigation-trigger',
      states: {
        navigationScrolled: 'has-scrolled',
        navigationFixed: 'is-fixed',
        navigationSlideUp: 'slide-up'
      }
    };
    this.isOpened = false;
    this.openedClass = 'is-opened';
    this.options = _extends({}, defaults, props);
    this.init();
    /**
     * flag, state variable for scrolling event
     * @type {boolean}
     */

    this.scrolling = false;
    /**
     * amount of pixels to scroll from top for adding "has-scrolled" state class
     * @type {number}
     */

    this.scrollNavigationOffset = 200;
    /**
     * variable for storing amount of scroll from top position value
     * @type {number}
     */

    this.previousTop = 0;
    /**
     * variable for storing current scroll position value
     * @type {number}
     */

    this.scrollDelta = 0;
    this.scrollOffset = 0;
  } // region Getters

  /**
   *
   * @returns {jQuery|HTMLElement|[]|*}
   */


  _createClass(Navigation, [{
    key: "main",
    get: function get() {
      return $(this.options.main);
    }
    /**
     * fetch navigation element options element
     * @type {Element}
     */

  }, {
    key: "navigation",
    get: function get() {
      return document.querySelector(this.options.secondaryNavigation);
    }
    /**
     *
     * @returns {*|jQuery.fn.init|jQuery|HTMLElement}
     */

  }, {
    key: "list",
    get: function get() {
      return $(this.options.list);
    }
    /**
     *
     * @returns {*|jQuery.fn.init|jQuery|HTMLElement}
     */

  }, {
    key: "trigger",
    get: function get() {
      return $(this.options.trigger);
    } // endregion
    // region Init

    /**
     *
     */

  }, {
    key: "init",
    value: function init() {
      var _this = this;

      if (this.list.length > 0 && this.trigger.length > 0) {
        this.trigger.on('click', function (ev) {
          ev.preventDefault();

          if (_this.isOpened) {
            _this.isOpened = false;

            _this.list.removeClass(_this.openedClass);

            _this.trigger.removeClass(_this.openedClass);

            _this.main.removeClass(_this.openedClass);

            bodyScrollLock.clearAllBodyScrollLocks();
          } else {
            _this.isOpened = true;

            _this.list.addClass(_this.openedClass);

            _this.trigger.addClass(_this.openedClass);

            _this.main.addClass(_this.openedClass);

            bodyScrollLock.disableBodyScroll(_this.main[0]);
          }
        });
      }

      this.navigationController();
    }
    /**
     *
     */

  }, {
    key: "navigationController",
    value: function navigationController() {
      var _this2 = this;

      document.addEventListener('scroll', function () {
        if (!_this2.scrolling) {
          _this2.scrolling = true;

          if (!window.requestAnimationFrame) {
            setTimeout(_this2.checkScroll(), 250);
          } else {
            requestAnimationFrame(function () {
              return _this2.checkScroll();
            });
          }
        }
      });
    }
    /**
     *
     */

  }, {
    key: "checkScroll",
    value: function checkScroll() {
      /**
       *
       * @type {number}
       */
      var currentTop = window.pageYOffset | document.body.scrollTop;
      this.changeNavigationState(currentTop);
      this.previousTop = currentTop;
      this.scrolling = false;
    }
    /**
     *
     * @param currentTop
     */

  }, {
    key: "changeNavigationState",
    value: function changeNavigationState(currentTop) {
      if (currentTop > this.scrollNavigationOffset) {
        this.navigation.classList.add(this.options.states.navigationScrolled);
        if (this.cookie) this.cookie.classList.add(this.options.states.navigationScrolled);
      } else {
        this.navigation.classList.remove(this.options.states.navigationScrolled);
        if (this.cookie) this.cookie.classList.remove(this.options.states.navigationScrolled);
      }

      if (currentTop > 10) {
        this.main.addClass(this.options.states.navigationScrolled);
      } else {
        this.main.removeClass(this.options.states.navigationScrolled);
      }

      if (this.previousTop >= currentTop) {
        this.scrollingUp(currentTop);
      } else {
        this.scrollingDown(currentTop);
      }
    }
    /**
     *
     * @param currentTop
     */

  }, {
    key: "scrollingUp",
    value: function scrollingUp(currentTop) {
      if (currentTop < this.scrollNavigationOffset) {
        this.navigation.classList.remove(this.options.states.navigationSlideUp);
        this.main.removeClass(this.options.states.navigationSlideUp);
      } else if (this.previousTop - currentTop > this.scrollDelta) {
        this.navigation.classList.remove(this.options.states.navigationSlideUp);
        this.main.addClass(this.options.states.navigationSlideUp);
      }
    }
    /**
     *
     * @param currentTop
     */

  }, {
    key: "scrollingDown",
    value: function scrollingDown(currentTop) {
      if (currentTop > this.scrollNavigationOffset + this.scrollOffset) {
        this.navigation.classList.add(this.options.states.navigationSlideUp);
        this.main.addClass(this.options.states.navigationSlideUp);
      } else if (currentTop > this.scrollNavigationOffset) {
        this.navigation.classList.remove(this.options.states.navigationSlideUp);
        this.main.removeClass(this.options.states.navigationSlideUp);
      }
    } // endregion

  }]);

  return Navigation;
}();
"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var OnScrollAnimations = /*#__PURE__*/function () {
  /**
   *
   * @param props
   */
  function OnScrollAnimations(props) {
    _classCallCheck(this, OnScrollAnimations);

    var defaults = {
      items: '[data-animation]'
    };
    this.options = _extends({}, defaults, props);
    this.animations = {
      "default": {
        from: {
          autoAlpha: 0
        },
        to: {
          autoAlpha: 1
        }
      },
      fmTop: {
        from: {
          autoAlpha: 0,
          y: -50
        },
        to: {
          autoAlpha: 1,
          y: 0
        }
      }
    };
    this.tls = [];
    this.percentage = 60;
    this.init();
  } // region Getters

  /**
   *
   * @returns {*|jQuery.fn.init|jQuery|HTMLElement}
   */


  _createClass(OnScrollAnimations, [{
    key: "items",
    get: function get() {
      return $(this.options.items);
    } // endregion
    // region Init

    /**
     *
     */

  }, {
    key: "init",
    value: function init() {
      var _this = this;

      if (this.items.length > 0) {
        this.items.each(function (index, element) {
          if (element.dataset.animation === 'stagger') {
            var stagger = element.dataset.stagger || 0.2;
            var delay = element.dataset.delay || 0;
            var animationType = element.dataset.animationType || 'fmTop';
            var staggerElement = Array.from(element.querySelectorAll('.js-animation-stagger')) || [];
            var tl = gsap.timeline({
              paused: true
            });

            if (staggerElement.length > 0) {
              tl.staggerTo(staggerElement, 0.4, _objectSpread({
                delay: delay,
                ease: 'Sine.easeInOut'
              }, _this.animations.fmTop.to), stagger); // set animation

              gsap.set(staggerElement, _objectSpread(_objectSpread({}, _this.animations.fmTop.from), {}, {
                onComplete: function onComplete() {
                  // create scroll trigger
                  ScrollTrigger.create({
                    trigger: element,
                    start: "top ".concat(_this.percentage, "%"),
                    onEnter: function onEnter() {
                      tl.play();

                      if (index === 0 && _this.items[1]) {
                        tl.eventCallback('onComplete', function () {
                          return _this.playSecondSection();
                        });
                      }
                    }
                  });
                }
              }));
            } // push to the global state


            _this.tls.push(tl);
          } else {
            var _this$animations, _this$animations$elem, _this$animations2, _this$animations2$ele;

            var _delay = element.dataset.delay || 0;

            var duration = element.dataset.duration || 0.2;
            var animationFrom = ((_this$animations = _this.animations) === null || _this$animations === void 0 ? void 0 : (_this$animations$elem = _this$animations[element.dataset.animation]) === null || _this$animations$elem === void 0 ? void 0 : _this$animations$elem.from) || _this.animations["default"].from;
            var animationTo = ((_this$animations2 = _this.animations) === null || _this$animations2 === void 0 ? void 0 : (_this$animations2$ele = _this$animations2[element.dataset.animation]) === null || _this$animations2$ele === void 0 ? void 0 : _this$animations2$ele.to) || _this.animations["default"].to; // set initial animation first

            gsap.set(element, _objectSpread(_objectSpread({}, animationFrom), {}, {
              onComplete: function onComplete() {
                gsap.to(element, _objectSpread({
                  scrollTrigger: {
                    trigger: element,
                    start: "top ".concat(_this.percentage, "%")
                  },
                  delay: _delay,
                  duration: duration,
                  ease: 'Sine.easeInOut'
                }, animationTo));
              }
            }));
          }
        });
      }
    }
    /**
     *
     */

  }, {
    key: "playSecondSection",
    value: function playSecondSection() {
      var _this2 = this;

      return setTimeout(function () {
        if (_this2.tls[1]) {
          var bounding = _this2.items[1].getBoundingClientRect();

          var percentageTop = bounding.top / window.innerHeight * 100;

          if (bounding.top < window.innerHeight && percentageTop <= 75) {
            _this2.tls[1].play();
          }
        }
      }, 20);
    } // endregion

  }]);

  return OnScrollAnimations;
}();
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var PeopleSearch = /*#__PURE__*/function () {
  /**
   *
   * @param props
   */
  function PeopleSearch(props) {
    _classCallCheck(this, PeopleSearch);

    var defaults = {
      formID: 'filters',
      inputID: 'filtersName',
      dropdownPlacementID: 'filtersDropdownPlacement',
      json: '/typeahead.json',
      output: '#filters-output',
      changeURL: true,
      removeElements: '.js-filters-remove-element'
    };
    this.options = _objectSpread(_objectSpread({}, defaults), props);
    this.data = [];
    this.submitting = false;
    if (this.form.length > 0) this.init();
  } // region Getters

  /**
   *
   * @returns {[]|*|jQuery|HTMLElement}
   */


  _createClass(PeopleSearch, [{
    key: "form",
    get: function get() {
      return $("#".concat(this.options.formID));
    }
    /**
     *
     * @returns {[]|*|Window.jQuery|HTMLElement}
     */

  }, {
    key: "input",
    get: function get() {
      return $("#".concat(this.options.inputID));
    }
    /**
     *
     * @returns {[]|*|Window.jQuery|HTMLElement}
     */

  }, {
    key: "output",
    get: function get() {
      return $(this.options.output);
    }
    /**
     *
     * @returns {*}
     */

  }, {
    key: "autosuggestElement",
    get: function get() {
      return this.form.find('#as_searchkey');
    } // endregion
    // region Init

    /**
     *
     */

  }, {
    key: "init",
    value: function init() {
      var _this = this;

      if (this.output.length > 0) {
        var query = window.location.search.substring(1);
        var data = this.parse_query_string(query);
        $.ajax({
          url: '/ajax/professionalkeywordsearch.cfm',
          data: data
        }).done(function (data) {
          _this.output.html(data);
        });
      }

      if (this.form.length > 0 && this.options.inputID && this.options.json) {
        var dataJSONattr = this.form.data('json');
        $.ajax({
          dataType: 'json',
          url: dataJSONattr || this.options.json,
          success: function success(results) {
            _this.data = _toConsumableArray(results);
            new bsn.AutoSuggest(_this.options.inputID, {
              script: function script(keyword) {
                return _this.search(keyword, 2);
              },
              varname: 'input',
              maxresults: 10,
              timeout: 600000,
              json: true,
              shownoresults: true,
              noresults: 'No matches found.',
              formID: _this.options.dropdownPlacementID || _this.options.formID || ''
            });
          }
        });
        this.form.on('submit', function (ev) {
          ev.preventDefault();
          var url = _this.form.data('url') || null;

          var data = _this.form.serialize(); // fetch data


          _this.fetchData("".concat(url, "?").concat(data)); // remove elements on search submit


          $(_this.options.removeElements).remove();
        }).on('reset', function () {// const url = this.form.data('url') || null;
          // this.fetchData(url);
        });
      }
    }
    /**
     *
     * @param keyword
     * @param itemType
     */

  }, {
    key: "search",
    value: function search(keyword) {
      var itemType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var outputdata = [];
      keyword = decodeURIComponent(keyword).toLowerCase();

      for (var i = 0; i < this.data.length; i++) {
        var item = this.data[i];

        if ((itemType === 0 || item.itemType === itemType) && (item.title.toLowerCase().indexOf(keyword) !== -1 || item.extraFields.toLowerCase().indexOf(keyword) !== -1 || this.normalizeNFD(item.title.toLowerCase()).indexOf(keyword) !== -1)) {
          outputdata.push({
            id: item.pageUrl,
            value: item.title
          });
        }
      }

      return outputdata;
    }
    /**
     *
     * @param input {string}
     */

  }, {
    key: "normalizeNFD",
    value: function normalizeNFD(input) {
      return input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    /**
     *
     */

  }, {
    key: "resetSearch",
    value: function resetSearch() {
      if (this.input.length > 0) this.input.val('');
      if (this.autosuggestElement.length > 0) this.autosuggestElement.remove();
    }
    /**
     *
     * @param url
     */

  }, {
    key: "fetchData",
    value: function fetchData(url) {
      var _this2 = this;

      if (!this.submitting && url) {
        // set loading message
        this.output.html('Loading...');
        var splitURL = url.split('?');

        if (this.options.changeURL && splitURL && window.history.pushState) {
          var queryString = splitURL[1] ? "?".concat(splitURL[1]) : '';
          history.pushState(null, null, "".concat(window.location.pathname).concat(queryString));
        } // fetch data


        $.ajax({
          url: url,
          dataType: 'html',
          success: function success(output) {
            _this2.output.html(output);
          },
          complete: function complete() {
            _this2.submitting = false;
          }
        });
      }
    }
    /**
     *
     * @param query
     * @returns {{}}
     */

  }, {
    key: "parse_query_string",
    value: function parse_query_string(query) {
      var vars = query.split('&');
      var query_string = {};

      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        var key = decodeURIComponent(pair.shift());
        var value = decodeURIComponent(pair.join('='));

        if (typeof query_string[key] === 'undefined') {
          query_string[key] = value;
        } else if (typeof query_string[key] === 'string') {
          query_string[key] = [query_string[key], value];
        } else {
          query_string[key].push(value);
        }
      }

      return query_string;
    } // endregion

  }]);

  return PeopleSearch;
}();
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Search = /*#__PURE__*/function () {
  /**
   *
   * @param props
   */
  function Search(props) {
    _classCallCheck(this, Search);

    var defaults = {
      open: '.js-open-search',
      close: '.js-close-search',
      toggle: '.js-toggle-search',
      formID: 'searchform',
      inputID: 'searchkey',
      json: '/typeahead.json',
      activeClass: 'is-active'
    };
    this.options = _objectSpread(_objectSpread({}, defaults), props);
    this.isActive = false;
    this.data = [];
    if (this.form.length > 0) this.init();
  } // region Getters

  /**
   *
   * @returns {[]|*|jQuery|HTMLElement}
   */


  _createClass(Search, [{
    key: "form",
    get: function get() {
      return $("#".concat(this.options.formID));
    }
    /**
     *
     * @returns {[]|*|Window.jQuery|HTMLElement}
     */

  }, {
    key: "input",
    get: function get() {
      return $("#".concat(this.options.inputID));
    }
    /**
     *
     * @returns {*}
     */

  }, {
    key: "autosuggestElement",
    get: function get() {
      return this.form.find('#as_searchkey');
    } // endregion
    // region Init

    /**
     *
     */

  }, {
    key: "init",
    value: function init() {
      var _this = this;

      $(this.options.open).on('click', function (ev) {
        ev.preventDefault();

        _this.open();
      });
      $(this.options.close).on('click', function (ev) {
        ev.preventDefault();

        _this.close();
      });
      $(this.options.toggle).on('click', function (ev) {
        ev.preventDefault();

        _this.toggleSearch(ev);
      });

      if (this.form.length > 0 && this.options.inputID && this.options.json) {
        var dataJSONattr = this.form.data('json');
        $.ajax({
          dataType: 'json',
          url: dataJSONattr || this.options.json,
          success: function success(results) {
            _this.data = _toConsumableArray(results);
            new bsn.AutoSuggest(_this.options.inputID, {
              script: function script(keyword, itemType) {
                return _this.search(keyword, itemType);
              },
              varname: 'input',
              maxresults: 10,
              timeout: 600000,
              json: true,
              formID: _this.options.formID || ''
            });
          }
        });
      }
    }
    /**
     *
     */

  }, {
    key: "toggleSearch",
    value: function toggleSearch(ev) {
      if (this.form.length > 0) {
        var formId = ev.currentTarget.dataset.target;
        this.isActive ? this.close(ev, formId) : this.open(ev, formId);
      }
    }
    /**
     *
     */

  }, {
    key: "open",
    value: function open(ev, formId) {
      var trigger = $(ev.currentTarget);
      var searchForm = $("#".concat(formId));

      if (searchForm.length > 0) {
        // open search
        searchForm.addClass(this.options.activeClass); // add active class to the toggle elements

        trigger.addClass(this.options.activeClass); // set active state

        this.isActive = true;
      }
    }
    /**
     *
     */

  }, {
    key: "close",
    value: function close(ev, formId) {
      var trigger = $(ev.currentTarget);
      var searchForm = $("#".concat(formId));

      if (searchForm.length > 0) {
        // reset search
        this.resetSearch(formId); // hide top bar

        searchForm.removeClass(this.options.activeClass); // add active class to the toggle elements

        trigger.removeClass(this.options.activeClass); // remove active state

        this.isActive = false;
      }
    }
    /**
     *
     * @param keyword
     * @param itemType
     */

  }, {
    key: "search",
    value: function search(keyword) {
      var itemType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var outputdata = [];
      keyword = decodeURIComponent(keyword).toLowerCase();

      for (var i = 0; i < this.data.length; i++) {
        var item = this.data[i];

        if ((itemType === 0 || item.itemType === itemType) && (item.title.toLowerCase().indexOf(keyword) !== -1 || item.extraFields.toLowerCase().indexOf(keyword) !== -1 || this.normalizeNFD(item.title.toLowerCase()).indexOf(keyword) !== -1)) {
          outputdata.push({
            id: item.pageUrl,
            value: item.title
          });
        }
      }

      return outputdata;
    }
    /**
     *
     * @param input {string}
     */

  }, {
    key: "normalizeNFD",
    value: function normalizeNFD(input) {
      return input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    /**
     *
     */

  }, {
    key: "resetSearch",
    value: function resetSearch(formId) {
      var searchForm = $("#".concat(formId));
      var searchInput = searchForm.find('input');
      if (searchInput.length > 0) searchInput.val('');
      if (this.autosuggestElement.length > 0) this.autosuggestElement.remove();
    } // endregion

  }]);

  return Search;
}();
"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var ServicesDropdown = /*#__PURE__*/function () {
  /**
   *
   * @param props
   */
  function ServicesDropdown(props) {
    _classCallCheck(this, ServicesDropdown);

    var defaults = {
      wrapper: '.js-services-list'
    };
    this.options = _extends({}, defaults, props);
    this.init();
  } // region Getters

  /**
   *
   * @returns {*|jQuery.fn.init|jQuery|HTMLElement}
   */


  _createClass(ServicesDropdown, [{
    key: "wrapper",
    get: function get() {
      return $(this.options.wrapper);
    } // endregion
    // region Init

    /**
     *
     */

  }, {
    key: "init",
    value: function init() {
      if (this.wrapper.length > 0) {
        this.wrapper.each(function (index, element) {
          new SlimSelect({
            select: element,
            showSearch: false,
            showContent: 'down',
            onChange: function onChange(info) {
              window.location = info.value;
            }
          });
        });
      }
    } // endregion

  }]);

  return ServicesDropdown;
}();
"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Share = /*#__PURE__*/function () {
  /**
   *
   * @param props
   */
  function Share(props) {
    _classCallCheck(this, Share);

    var defaults = {
      share: ".js-share",
      modal: "#pageshare",
      modalClose: ".js-close-modal"
    };
    this.options = _extends({}, defaults, props);

    if (this.share.length > 0) {
      this.init();
    }
  } // region Getters

  /**
   *
   * @returns {*|jQuery.fn.init|jQuery|HTMLElement}
   */


  _createClass(Share, [{
    key: "share",
    get: function get() {
      return $(this.options.share);
    }
    /**
     *
     * @returns {*|jQuery.fn.init|jQuery|HTMLElement}
     */

  }, {
    key: "modal",
    get: function get() {
      return $(this.options.modal);
    }
    /**
     *
     * @returns {*|jQuery.fn.init|jQuery|HTMLElement}
     */

  }, {
    key: "modalClose",
    get: function get() {
      return $(this.options.modalClose);
    } // endregion
    // region Init

    /**
     *
     */

  }, {
    key: "init",
    value: function init() {
      var _this = this;

      this.share.on("click", function (ev) {
        ev.preventDefault();

        _this.open(_this.modal, _this.modal.find(".c-pageshare__inner"));
      });
      this.modalClose.on("click", function (ev) {
        ev.preventDefault();

        _this.close(_this.modal, _this.modal.find(".c-pageshare__inner"));
      }).on("keydown", function (ev) {
        if (ev.keyCode === 13) {
          ev.preventDefault();

          _this.close(_this.modal, _this.modal.find(".c-pageshare__inner"));
        }
      });
    }
    /**
     *
     * @param modal
     * @param inner
     */

  }, {
    key: "open",
    value: function open(modal, inner) {
      TweenMax.to(modal, 0.3, {
        autoAlpha: 1,
        onComplete: function onComplete() {
          setTimeout(function () {
            modal.find(".js-pageshare-focus").focus();
          }, 100);
        }
      });
      TweenMax.fromTo(inner, 0.3, {
        y: -20,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1
      });
    }
    /**
     *
     * @param modal
     * @param inner
     */

  }, {
    key: "close",
    value: function close(modal, inner) {
      TweenMax.to(inner, 0.3, {
        y: 20,
        autoAlpha: 0
      });
      TweenMax.to(modal, 0.3, {
        autoAlpha: 0
      });
    } // endregion

  }]);

  return Share;
}();
"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var ShareModal = /*#__PURE__*/function () {
  /**
   *
   * @param props
   */
  function ShareModal(props) {
    _classCallCheck(this, ShareModal);

    var defaults = {
      element: '#sharemodal',
      open: '.js-open-sharemodal',
      close: '.js-close-sharemodal',
      email: '.js-share-email',
      linkedin: '.js-share-linkedin',
      facebook: '.js-share-facebook',
      twitter: '.js-share-twitter'
    };
    this.options = _objectSpread(_objectSpread({}, defaults), props);
    if (this.element.length > 0) this.init();
  } // region Getters

  /**
   *
   * @returns {[]|*|Window.jQuery|HTMLElement}
   */


  _createClass(ShareModal, [{
    key: "element",
    get: function get() {
      return $(this.options.element);
    }
    /**
     *
     * @returns {*}
     */

  }, {
    key: "focusableFirst",
    get: function get() {
      return $(this.options.element).find('.js-focus-sharemodal');
    } // endregion
    // region Init

    /**
     *
     */

  }, {
    key: "init",
    value: function init() {
      var _this = this;

      $(this.options.open).on('click', function (ev) {
        ev.preventDefault();

        _this.open();
      });
      $(this.options.close).on('click', function (ev) {
        ev.preventDefault();

        _this.close();
      });
      $(this.options.email).on('click', function (ev) {
        ev.preventDefault();
        var title = ev.currentTarget.getAttribute('data-subject');

        _this.shareEmail(title, location.href);
      });
      $(this.options.linkedin).on('click', function (ev) {
        ev.preventDefault();

        _this.shareLinkedIn(location.href);
      });
      $(this.options.facebook).on('click', function (ev) {
        ev.preventDefault();

        _this.shareFacebook(location.href);
      });
      $(this.options.twitter).on('click', function (ev) {
        ev.preventDefault();

        _this.shareTwitter(location.href);
      });
    }
    /**
     *
     */

  }, {
    key: "open",
    value: function open() {
      var _this2 = this;

      if (this.element.length > 0) {
        gsap.to(this.element, {
          duration: 0.2,
          autoAlpha: 1,
          onComplete: function onComplete() {
            _this2.element.attr('aria-hidden', 'false');

            if (_this2.focusableFirst.length > 0) _this2.focusableFirst.focus();
          }
        });
      }
    }
    /**
     *
     */

  }, {
    key: "close",
    value: function close() {
      var _this3 = this;

      if (this.element.length > 0) {
        gsap.to(this.element, {
          duration: 0.2,
          autoAlpha: 0,
          onComplete: function onComplete() {
            _this3.element.attr('aria-hidden', 'true');
          }
        });
      }
    }
    /**
     *
     * @param title {string}
     * @param url {string}
     */

  }, {
    key: "shareEmail",
    value: function shareEmail(title, url) {
      location.href = "mailto:?subject=".concat(encodeURIComponent(title), "&body=").concat(encodeURIComponent(url));
    }
    /**
     *
     * @param url {string}
     */

  }, {
    key: "shareLinkedIn",
    value: function shareLinkedIn(url) {
      window.open("https://www.linkedin.com/shareArticle?mini=true&url=".concat(encodeURIComponent(url)), '_blank');
    }
    /**
     *
     * @param url {string}
     */

  }, {
    key: "shareFacebook",
    value: function shareFacebook(url) {
      window.open("https://www.facebook.com/sharer/sharer.php?u=".concat(encodeURIComponent(url)), '_blank');
    }
    /**
     *
     * @param url {string}
     */

  }, {
    key: "shareTwitter",
    value: function shareTwitter(url) {
      window.open("https://twitter.com/intent/tweet?url=".concat(encodeURIComponent(url)), '_blank');
    } // endregion

  }]);

  return ShareModal;
}();
"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var SliderFade = /*#__PURE__*/function () {
  /**
   *
   * @param props
   */
  function SliderFade(props) {
    _classCallCheck(this, SliderFade);

    var defaults = {
      wrapper: '.js-fade-slider-wrapper',
      slider: '.js-fade-slider',
      nav: '.js-fade-slider-nav',
      btnClass: 'c-fadeslider__dots-item',
      activeClass: 'is-active'
    };
    this.options = _objectSpread(_objectSpread({}, defaults), props);
    if (this.wrapper.length > 0) this.init();
  } // region Getters

  /**
   *
   * @returns {jQuery|HTMLElement|[]|*}
   */


  _createClass(SliderFade, [{
    key: "wrapper",
    get: function get() {
      return $(this.options.wrapper);
    } // endregion
    // region Init

    /**
     *
     */

  }, {
    key: "init",
    value: function init() {
      var _this = this;

      this.wrapper.each(function (index, element) {
        var $element = $(element);
        var $slider = $element.find(_this.options.slider);
        var $nav = $element.find(_this.options.nav);
        new Swiper($slider[0], {
          autoplay: {
            delay: 7000
          },
          effect: 'fade',
          fadeEffect: {
            crossFade: true
          },
          allowTouchMove: false,
          simulateTouch: false,
          on: {
            init: function init(swiper) {
              _this.generateButtons($nav, swiper);
            },
            slideChange: function slideChange(swiper) {
              _this.setActiveButtonIndex($nav, swiper.activeIndex);
            }
          }
        });
      });
    }
    /**
     *
     * @param nav {jQuery}
     * @param swiper {object}
     */

  }, {
    key: "generateButtons",
    value: function generateButtons(nav, swiper) {
      if (nav.length > 0 && swiper && swiper.initialized) {
        for (var i = 0; i < swiper.slides.length; i++) {
          nav.append("<li><button aria-label=\"Go to slide ".concat(i + 1, "\" class=\"").concat(this.options.btnClass, " ").concat(swiper.activeIndex === i ? this.options.activeClass : '', "\" data-index=").concat(i, "></button></li>"));
        }

        nav.find(".".concat(this.options.btnClass)).on('click', function (ev) {
          ev.preventDefault();
          var dataIndex = Number(ev.currentTarget.getAttribute('data-index'));
          if (swiper) swiper.slideTo(dataIndex);
        });
      }
    }
    /**
     *
     * @param nav {jQuery}
     * @param index {number}
     */

  }, {
    key: "setActiveButtonIndex",
    value: function setActiveButtonIndex(nav, index) {
      if (nav.length > 0) {
        var $buttons = nav.find(".".concat(this.options.btnClass));
        $buttons.removeClass(this.options.activeClass);
        $buttons.filter("[data-index=\"".concat(index, "\"]")).addClass(this.options.activeClass);
      }
    } // endregion

  }]);

  return SliderFade;
}();
"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Tabs = /*#__PURE__*/function () {
  /**
   *
   * @param props
   */
  function Tabs(props) {
    _classCallCheck(this, Tabs);

    var defaults = {
      elements: '.js-tab-open',
      tabs: '.js-tab-item',
      activeClass: 'is-active',
      mobile: '.js-tab-mobile',
      hashchange: true
    };
    this.options = _objectSpread(_objectSpread({}, defaults), props);
    if (this.elements.length > 0) this.init();
  } // region Getters

  /**
   *
   * @returns {[]|*|Window.jQuery|HTMLElement}
   */


  _createClass(Tabs, [{
    key: "elements",
    get: function get() {
      return $(this.options.elements);
    }
    /**
     *
     * @returns {[]|*|Window.jQuery|HTMLElement}
     */

  }, {
    key: "tabs",
    get: function get() {
      return $(this.options.tabs);
    }
    /**
     *
     * @returns {[]|*|Window.jQuery|HTMLElement}
     */

  }, {
    key: "mobileDropdown",
    get: function get() {
      return $(this.options.mobile);
    } // endregion
    // region Init

    /**
     *
     */

  }, {
    key: "init",
    value: function init() {
      var _this = this;

      this.elements.each(function (index, element) {
        var $element = $(element);
        var id = $element.attr('href');
        var group = $element.data('group');
        $element.on('click', function (ev) {
          ev.preventDefault();

          if (id && group && !ev.currentTarget.classList.contains(_this.options.activeClass)) {
            _this.open(id, group, ev.currentTarget.innerHTML);
          }
        });
      });
      this.mobileDropdown.on('click', function (ev) {
        ev.preventDefault();
        ev.currentTarget.classList.toggle(_this.options.activeClass);
      }); // check for existing hash and open tab accordingly

      if (window.location.hash) {
        var $tab = $(window.location.hash);

        if ($tab.length > 0) {
          var group = $tab.data('group');
          if (group) this.open(window.location.hash, group);
        }
      }
    }
    /**
     *
     * @param id
     * @param group
     * @param text
     */

  }, {
    key: "open",
    value: function open(id, group) {
      var text = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      // remove active classes from links and tabs group
      this.elements.filter("[data-group=\"".concat(group, "\"]")).removeClass(this.options.activeClass);
      this.tabs.filter("[data-group=\"".concat(group, "\"]")).removeClass(this.options.activeClass).attr('aria-expanded', 'false'); // add active class to the link and group

      var $active = this.elements.filter("[href=\"".concat(id, "\"]")).addClass(this.options.activeClass);
      this.tabs.filter("[id=\"".concat(id.replace('#', ''), "\"]")).addClass(this.options.activeClass).attr('aria-expanded', 'true'); // replace text on the mobile button

      this.mobileDropdown.filter("[data-group=\"".concat(group, "\"]")).html("<span>".concat(text || $active.text(), "</span>")).removeClass(this.options.activeClass); // change location has

      if (this.options.hashchange) {
        if (window.history.pushState) {
          history.pushState(null, null, id);
        } else {
          window.location.hash = id.replace('#', '');
        }
      }
    } // endregion

  }]);

  return Tabs;
}();