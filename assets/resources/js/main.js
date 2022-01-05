

// Header Js
$("#search-icon").click(function() {
    $(".nav").toggleClass("search");
    $(".nav").toggleClass("no-search");
    $(".search-input").toggleClass("search-active");
  });
  
  $('.menu-toggle').click(function(){
     $(".nav").toggleClass("mobile-nav");
     $(this).toggleClass("is-active");
  });

  
// CounterJs

$.fn.jQuerySimpleCounter = function( options ) {
   var settings = $.extend({
       start:  0,
       end:    100,
       easing: 'swing',
       duration: 400,
       complete: ''
   }, options );

   var thisElement = $(this);

   $({count: settings.start}).animate({count: settings.end}, {
     duration: settings.duration,
     easing: settings.easing,
     step: function() {
        var mathCount = Math.ceil(this.count);
        thisElement.text(mathCount);
     },
     complete: settings.complete
  });
};


$('#number1').jQuerySimpleCounter({end: 12,duration: 3000});
$('#number2').jQuerySimpleCounter({end: 55,duration: 3000});
$('#number3').jQuerySimpleCounter({end: 359,duration: 2000});
$('#number4').jQuerySimpleCounter({end: 246,duration: 2500});


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
   accordionItemHeader.addEventListener("click", function () {
     document.getElementById("test").scrollIntoView({ behavior: "smooth" });
   });
 });
 