// Header Js
$("#search-icon").click(function() {
    $(".nav").toggleClass("search");
    $(".nav").toggleClass("no-search");
    $(".search-input").toggleClass("search-active");
});

$('.menu-toggle').click(function() {
    $(".nav").toggleClass("mobile-nav");
    $(this).toggleClass("is-active");
});



// Hero Slider
(function() {

    var $$ = function(selector, context) {
        var context = context || document;
        var elements = context.querySelectorAll(selector);
        return [].slice.call(elements);
    };

    function _fncSliderInit($slider, options) {
        var prefix = ".fnc-";

        var $slider = $slider;
        var $slidesCont = $slider.querySelector(prefix + "slider__slides");
        var $slides = $$(prefix + "slide", $slider);
        var $controls = $$(prefix + "nav__control", $slider);
        var $controlsBgs = $$(prefix + "nav__bg", $slider);
        var $progressAS = $$(prefix + "nav__control-progress", $slider);

        var numOfSlides = $slides.length;
        var curSlide = 1;
        var sliding = false;
        var slidingAT = +parseFloat(getComputedStyle($slidesCont)["transition-duration"]) * 1000;
        var slidingDelay = +parseFloat(getComputedStyle($slidesCont)["transition-delay"]) * 1000;

        var autoSlidingActive = false;
        var autoSlidingTO;
        var autoSlidingDelay = 5000; // default autosliding delay value
        var autoSlidingBlocked = false;

        var $activeSlide;
        var $activeControlsBg;
        var $prevControl;

        function setIDs() {
            $slides.forEach(function($slide, index) {
                $slide.classList.add("fnc-slide-" + (index + 1));
            });

            $controls.forEach(function($control, index) {
                $control.setAttribute("data-slide", index + 1);
                $control.classList.add("fnc-nav__control-" + (index + 1));
            });

            $controlsBgs.forEach(function($bg, index) {
                $bg.classList.add("fnc-nav__bg-" + (index + 1));
            });
        };

        setIDs();

        function afterSlidingHandler() {
            $slider.querySelector(".m--previous-slide").classList.remove("m--active-slide", "m--previous-slide");
            $slider.querySelector(".m--previous-nav-bg").classList.remove("m--active-nav-bg", "m--previous-nav-bg");

            $activeSlide.classList.remove("m--before-sliding");
            $activeControlsBg.classList.remove("m--nav-bg-before");
            $prevControl.classList.remove("m--prev-control");
            $prevControl.classList.add("m--reset-progress");
            var triggerLayout = $prevControl.offsetTop;
            $prevControl.classList.remove("m--reset-progress");

            sliding = false;
            var layoutTrigger = $slider.offsetTop;

            if (autoSlidingActive && !autoSlidingBlocked) {
                setAutoslidingTO();
            }
        };

        function performSliding(slideID) {
            if (sliding) return;
            sliding = true;
            window.clearTimeout(autoSlidingTO);
            curSlide = slideID;

            $prevControl = $slider.querySelector(".m--active-control");
            $prevControl.classList.remove("m--active-control");
            $prevControl.classList.add("m--prev-control");
            $slider.querySelector(prefix + "nav__control-" + slideID).classList.add("m--active-control");

            $activeSlide = $slider.querySelector(prefix + "slide-" + slideID);
            $activeControlsBg = $slider.querySelector(prefix + "nav__bg-" + slideID);

            $slider.querySelector(".m--active-slide").classList.add("m--previous-slide");
            $slider.querySelector(".m--active-nav-bg").classList.add("m--previous-nav-bg");

            $activeSlide.classList.add("m--before-sliding");
            $activeControlsBg.classList.add("m--nav-bg-before");

            var layoutTrigger = $activeSlide.offsetTop;

            $activeSlide.classList.add("m--active-slide");
            $activeControlsBg.classList.add("m--active-nav-bg");

            setTimeout(afterSlidingHandler, slidingAT + slidingDelay);
        };



        function controlClickHandler() {
            if (sliding) return;
            if (this.classList.contains("m--active-control")) return;
            if (options.blockASafterClick) {
                autoSlidingBlocked = true;
                $slider.classList.add("m--autosliding-blocked");
            }

            var slideID = +this.getAttribute("data-slide");

            performSliding(slideID);
        };

        $controls.forEach(function($control) {
            $control.addEventListener("click", controlClickHandler);
        });

        function setAutoslidingTO() {
            window.clearTimeout(autoSlidingTO);
            var delay = +options.autoSlidingDelay || autoSlidingDelay;
            curSlide++;
            if (curSlide > numOfSlides) curSlide = 1;

            autoSlidingTO = setTimeout(function() {
                performSliding(curSlide);
            }, delay);
        };

        if (options.autoSliding || +options.autoSlidingDelay > 0) {
            if (options.autoSliding === false) return;

            autoSlidingActive = true;
            setAutoslidingTO();

            $slider.classList.add("m--with-autosliding");
            var triggerLayout = $slider.offsetTop;

            var delay = +options.autoSlidingDelay || autoSlidingDelay;
            delay += slidingDelay + slidingAT;

            $progressAS.forEach(function($progress) {
                $progress.style.transition = "transform " + (delay / 1000) + "s";
            });
        }

        $slider.querySelector(".fnc-nav__control:first-child").classList.add("m--active-control");

    };

    var fncSlider = function(sliderSelector, options) {
        var $sliders = $$(sliderSelector);

        $sliders.forEach(function($slider) {
            _fncSliderInit($slider, options);
        });
    };

    window.fncSlider = fncSlider;
}());

/* not part of the slider scripts */

/* Slider initialization
options:
autoSliding - boolean
autoSlidingDelay - delay in ms. If audoSliding is on and no value provided, default value is 5000
blockASafterClick - boolean. If user clicked any sliding control, autosliding won't start again
*/
fncSlider(".example-slider", { autoSlidingDelay: 3000 });

var $demoCont = document.querySelector(".demo-cont");

[].slice.call(document.querySelectorAll(".fnc-slide__action-btn")).forEach(function($btn) {
    $btn.addEventListener("click", function() {
        $demoCont.classList.toggle("credits-active");
    });
});


// FAQ Accordian 
const accordionItemHeaders = document.querySelectorAll(
    ".accordion-item-header"
);

accordionItemHeaders.forEach((accordionItemHeader) => {
    accordionItemHeader.addEventListener("click", (event) => {
        // Allow to collapse one item at a time
        const currentlyActiveAccordionItemHeader = document.querySelector(
            ".accordion-item-header.active"
        );
        if (
            currentlyActiveAccordionItemHeader &&
            currentlyActiveAccordionItemHeader !== accordionItemHeader
        ) {
            currentlyActiveAccordionItemHeader.classList.toggle("active");
            currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
        }
        //

        accordionItemHeader.classList.toggle("active");
        const accordionItemBody = accordionItemHeader.nextElementSibling;
        if (accordionItemHeader.classList.contains("active")) {
            accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
        } else {
            accordionItemBody.style.maxHeight = 0;
        }
    });
    // accordionItemHeader.addEventListener("click", function() {
    //     document.getElementById("test").scrollIntoView({ behavior: "smooth" });
    // });
});

// Active


document.addEventListener('DOMContentLoaded', function() {
    $(function() {
        $('.nav-li').each(function() {
            if ($(this).prop('href') == window.location.href) {
                $(this).addClass('current-menu');

                $(this).parents('li').addClass('current-menu');
            } else {
                $(this).removeClass('current-menu');
            }
        });
    });
});




$('.carousel-main').owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    margin: 10,
    nav: true,
    dots: false,
    navText: ['<span class="fas fa-chevron-left fa-2x"></span>', '<span class="fas fa-chevron-right fa-2x"></span>'],
})


// Traning
const slider = (function() {

    //const
    const slider = document.getElementById("slider");
    const sliderContent = document.querySelector(".slider-content");
    const sliderWrapper = document.querySelector(".slider-content-wrapper");
    const elements = document.querySelectorAll(".slider-content__item");
    const sliderContentControls = createHTMLElement("div", "slider-content__controls");
    let dotsWrapper = null;
    let prevButton = null;
    let nextButton = null;
    let autoButton = null;
    let leftArrow = null;
    let rightArrow = null;
    let intervalId = null;

    // data
    const itemsInfo = {
        offset: 0,
        position: {
            current: 0,
            min: 0,
            max: elements.length - 1
        },
        intervalSpeed: 1500,

        update: function(value) {
            this.position.current = value;
            this.offset = -value;
        },
        reset: function() {
            this.position.current = 0;
            this.offset = 0;
        }
    };

    const controlsInfo = {
        buttonsEnabled: false,
        dotsEnabled: false,
        prevButtonDisabled: true,
        nextButtonDisabled: false,
        autoMode: false
    };


    function init(props) {

        if (slider && sliderContent && sliderWrapper && elements) {

            if (props) {
                if (props.currentItem) {
                    if (parseInt(props.currentItem) >= itemsInfo.position.min && parseInt(props.currentItem) <= itemsInfo.position.max) {
                        itemsInfo.position.current = props.currentItem;
                        itemsInfo.offset = -props.currentItem;
                    }
                }

                if (props.intervalSpeed) itemsInfo.intervalSpeed = props.intervalSpeed;
                if (props.buttons) controlsInfo.buttonsEnabled = true;
                if (props.dots) controlsInfo.dotsEnabled = true;
                if (props.autoMode) controlsInfo.autoMode = true;
            }

            _createControls(controlsInfo.dotsEnabled, controlsInfo.buttonsEnabled);
            _render();
            _updateControlsInfo();


            if (controlsInfo.autoMode) {
                _startAutoMode()
            }
        } else {
            console.log("");
        }
    }


    function _updateControlsInfo() {
        const { current, min, max } = itemsInfo.position;
        controlsInfo.prevButtonDisabled = current <= min;
        controlsInfo.nextButtonDisabled = current >= max;
    }


    function _createControls(dots = false, buttons = false) {


        sliderContent.append(sliderContentControls);


        createArrows();
        buttons ? createButtons() : null;
        dots ? createDots() : null;


        function createArrows() {
            const dValueLeftArrow = "M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z";
            const dValueRightArrow = "M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z";
            const leftArrowSVG = createSVG(dValueLeftArrow);
            const rightArrowSVG = createSVG(dValueRightArrow);

            leftArrow = createHTMLElement("div", "prev-arrow");
            leftArrow.append(leftArrowSVG);
            leftArrow.addEventListener("click", () => updateSliderPosition(itemsInfo.position.current - 1))

            rightArrow = createHTMLElement("div", "next-arrow");
            rightArrow.append(rightArrowSVG);
            rightArrow.addEventListener("click", () => updateSliderPosition(itemsInfo.position.current + 1))

            sliderContentControls.append(leftArrow, rightArrow);

            // SVG function
            function createSVG(dValue, color = "currentColor") {
                const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("viewBox", "0 0 256 512");
                const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                path.setAttribute("fill", color);
                path.setAttribute("d", dValue);
                svg.appendChild(path);
                return svg;
            }
        }

        // Dots function
        function createDots() {
            dotsWrapper = createHTMLElement("div", "dots");
            for (let i = 0; i < itemsInfo.position.max + 1; i++) {
                const dot = document.createElement("div");
                dot.className = "dot";
                dot.addEventListener("click", function() {
                    updateSliderPosition(i);
                })
                dotsWrapper.append(dot);
            }
            sliderContentControls.append(dotsWrapper);
        }

        // Buttons function
        function createButtons() {
            const controlsWrapper = createHTMLElement("div", "slider-controls");
            prevButton = createHTMLElement("button", "prev-control", "Prev");
            prevButton.addEventListener("click", () => updateSliderPosition(itemsInfo.position.current - 1))

            autoButton = createHTMLElement("button", "auto-control", "Auto");
            autoButton.addEventListener("click", () => intervalId ? _stopAutoMode() : _startAutoMode())

            nextButton = createHTMLElement("button", "next-control", "Next");
            nextButton.addEventListener("click", () => updateSliderPosition(itemsInfo.position.current + 1))

            controlsWrapper.append(prevButton, autoButton, nextButton);
            slider.append(controlsWrapper);
        }
    }


    function _stopAutoMode() {
        clearInterval(intervalId)
        intervalId = null
        if (autoButton) autoButton.textContent = 'Auto'
    }


    function _startAutoMode() {
        controlsInfo.autoMode = true
        if (autoButton) autoButton.textContent = 'Stop'
        intervalId = setInterval(function() {
            if (itemsInfo.position.current < itemsInfo.position.max) {
                itemsInfo.update(itemsInfo.position.current + 1);
            } else {
                itemsInfo.reset();
            }
            _slideItem();
        }, itemsInfo.intervalSpeed)
    }


    function setClass(options) {
        if (options) {
            options.forEach(({ element, className, disabled }) => {
                if (element) {
                    disabled ? element.classList.add(className) : element.classList.remove(className)
                } else {
                    console.log("Error: function setClass(): element = ", element);
                }
            })
        }
    }


    function updateSliderPosition(value) {
        itemsInfo.update(value);
        controlsInfo.autoMode = false
        _slideItem();
    }

    function _render() {
        const { prevButtonDisabled, nextButtonDisabled } = controlsInfo;
        let controlsArray = [
            { element: leftArrow, className: "d-none", disabled: prevButtonDisabled },
            { element: rightArrow, className: "d-none", disabled: nextButtonDisabled }
        ];
        if (controlsInfo.buttonsEnabled) {
            controlsArray = [
                ...controlsArray,
                { element: prevButton, className: "disabled", disabled: prevButtonDisabled },
                { element: nextButton, className: "disabled", disabled: nextButtonDisabled }
            ];
        }


        setClass(controlsArray);


        sliderWrapper.style.transform = `translateX(${itemsInfo.offset * 100}%)`;


        if (controlsInfo.dotsEnabled) {
            if (document.querySelector(".dot--active")) {
                document.querySelector(".dot--active").classList.remove("dot--active");
            }
            dotsWrapper.children[itemsInfo.position.current].classList.add("dot--active");
        }
    }


    function _slideItem() {
        if (!controlsInfo.autoMode && intervalId) {
            _stopAutoMode()
        }
        _updateControlsInfo();
        _render();
    }


    function createHTMLElement(tagName = "div", className, innerHTML) {
        const element = document.createElement(tagName);
        element.className = className || null;
        element.innerHTML = innerHTML || null;
        return element;
    }


    return { init };
}())

slider.init({
    // intervalSpeed: 500,
    // currentItem: 2,
    buttons: false,
    dots: false,
    autoMode: false,
    loop: true
});


// LogoSlider
$('.customer-logos').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    prevArrow: '<i class="slick-prev fas fa-angle-left"></i>',
    nextArrow: '<i class="slick-next fas fa-angle-right"></i>',
    responsive: [{
        breakpoint: 768,
        settings: {
            slidesToShow: 3
        }
    }, {
        breakpoint: 520,
        settings: {
            slidesToShow: 2
        }
    }]
});


// dropdwon
const button = document.querySelector('button');
const menu = document.querySelector('.menu');

button.addEventListener('click', () => {
    menu.classList.toggle('activated');
});

const menuButtons = document.querySelectorAll('.menu__button');

const menuButtonsArray = Array.from(menuButtons);

menuButtonsArray.forEach(button => {

    button.addEventListener('click', () => {

        closeAnotherButtons(button);
        button.classList.toggle('activated');

    });
});

function closeAnotherButtons(activeButton) {

    menuButtonsArray.forEach(button => {

        if (button != activeButton) {
            if (button.classList.contains('activated')) {
                button.classList.remove('activated');
            }
        }

    });
}

// olick
// $(document).ready(function() {
//     $('.nav-item ').click(function() {
//         $('.nav-item').removeClass("current-menu");
//         $(this).addClass("current-menu");
//     });
// });

// sticky
/* ========================================== 
scrollTop() >= 300
Should be equal the the height of the header
========================================== */

$(window).scroll(function() {
    if ($(window).scrollTop() >= 300) {
        $('.header').addClass('fixed-header');
        $('nav div').addClass('visible-title');
    } else {
        $('.header').removeClass('fixed-header');
        $('nav div').removeClass('visible-title');
    }
});


// tabs 
var links = document.querySelectorAll('.tabs ul li a');
var content = document.querySelectorAll('div.content');
var border = document.querySelector('.tabs span');
var lis = document.querySelectorAll('.tabs ul li');

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(e) {
        e.preventDefault();
        var activLinks = document.querySelector('.tabs ul li a.activ');
        var activContent = document.querySelector('.tabs-div>div.activ');

        activLinks.classList.remove('activ');
        activContent.classList.remove('activ');

        this.classList.add('activ');
        var attr = this.getAttribute('href');

        var activ = document.querySelector(attr);

        activ.classList.add('activ');

        var lisLength = lis.length;
        var lisWidth = 100 / lisLength;
        var position = i * lisWidth;
        border.style.left = position + '%';

    });
}