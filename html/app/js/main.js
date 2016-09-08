'use strict';



$(document).ready(function() {
  var wWidth = $(window).width();
  if(wWidth > 1200 ){
      skrollr.init();

  }


  var myNavBar = {

    flagAdd: true,

    elements: [],

    init: function(elements) {
      this.elements = elements;
    },

    add: function() {
      if (this.flagAdd) {
        for (var i = 0; i < this.elements.length; i++) {
          document.getElementById(this.elements[i]).className += ' fixed-theme';
        }
        this.flagAdd = false;
      }
    },

    remove: function() {
      for (var i = 0; i < this.elements.length; i++) {
        document.getElementById(this.elements[i]).className =
          document.getElementById(this.elements[i]).className.replace(/(?:^|\s)fixed-theme(?!\S)/g, '');
      }
      this.flagAdd = true;
    }

  };

  /**
   * Init the object. Pass the object the array of elements
   * that we want to change when the scroll goes down
   */
  myNavBar.init([
    'header',
    'header-container',
    'brand'
  ]);

  /**
   * Function that manage the direction
   * of the scroll
   */
  function offSetManager() {

    var yOffset = 0;
    var currYOffSet = window.pageYOffset;

    if (yOffset < currYOffSet) {
      myNavBar.add();
    } else if (currYOffSet === yOffset) {
      myNavBar.remove();
    }

  }

  /**
   * bind to the document scroll detection
   */
  window.onscroll = function(e) {
    offSetManager(e);
  };

  /**
   * We have to do a first detectation of offset because the page
   * could be load with scroll down set.
   */
  offSetManager();






  // Accordian Action
  var action = 'click';
  var speed = "500";



  // Question handler
  $('li.q').on(action, function() {

    // gets next element
    // opens .a of selected question
    $(this).next().slideToggle(speed)

    // selects all other answers and slides up any open answer
    .siblings('li.a').slideUp();

    // Grab img from clicked question
    var img = $(this).children('i');

    // remove Rotate class from all images except the active
    $('i').not(img).removeClass('rotate');

    // toggle rotate class
    img.toggleClass('rotate');

  });

  /** Smooth Scrolling Functionality **/
  function filterPath(string) {
    return string
      .replace(/^\//, '')
      .replace(/(index|default).[a-zA-Z]{3,4}$/, '')
      .replace(/\/$/, '');
  }
  var locationPath = filterPath(location.pathname);
  var scrollElem = scrollableElement('html', 'body');
  var urlHash = '#' + window.location.href.split("#")[1];

  $('a[href*=\\#]').each(function() {
    $(this).click(function(event) {

      var thisPath = filterPath(this.pathname) || locationPath;
      if (locationPath == thisPath && (location.hostname == this.hostname || !this.hostname) && this.hash.replace(/#/, '')) {
        var $target = $(this.hash),
          target = this.hash;
        if (target) {
          var targetOffset = $target.offset().top;
          event.preventDefault();

          $(scrollElem).animate({ scrollTop: targetOffset - 100 }, 400, function() {

          });
        }
      }
    });
  });

  // use the first element that is "scrollable"
  function scrollableElement(els) {
    for (var i = 0, argLength = arguments.length; i < argLength; i++) {
      var el = arguments[i],
        $scrollElement = $(el);
      if ($scrollElement.scrollTop() > 0) {
        return el;
      } else {
        $scrollElement.scrollTop(1);
        var isScrollable = $scrollElement.scrollTop() > 0;
        $scrollElement.scrollTop(0);
        if (isScrollable) {
          return el;
        }
      }
    }
    return [];
  }
  /** END SMOOTH SCROLLING FUNCTIONALITY **/




});

$(document).scroll(function() {

    var cutoff = $(window).scrollTop();


    var cutoffRange = cutoff + 500;
    // Find current section and highlight nav menu
     var curSec = $.find('.current');
     var curID = $(curSec).attr('id');
     var curNav = $.find('a[href=#'+curID+']')

    $('a[href$="#'+curID+'"]').parent().siblings().removeClass('active')
    $(curNav).parent().addClass('active');
    $('.section').each(function(){
        if ($(this).offset().top > cutoff && $(this).offset().top < cutoffRange) {
            $('.section').removeClass('current')
            $(this).addClass('current');
           /* ga('send', 'event', $(this).attr('id'), 'section_view', section);*/
            return false; // stops the iteration after the first one on screen
        }
    });
});


