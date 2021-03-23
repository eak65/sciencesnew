
(function ($) {
  // set up the variables that I would like to change
  let clickedNav;
  let currentImageIndex = 0;
  let lastImageIndex = 0;
  let click;
  let end = false;
  let beginning = true;
  let slideWidth = 0;
  const slideHeight = 0;
  let slideShowWidth = 0;
  let slideShowHeight = 0;
  let images;
  let numImages = 1;
  let dotNum = 1;
  let dotContent = '';
  let scale;
  let activeId;
  let actualOffset = 0;
  let currentOffset = 0;
  let active = false;

  // run the window.load funtion
  $(window).load((event) => {
    // set up the slideshow div
    slideShowSet();
  });

  function slideShowSet() {
    // set up the slideshow div
    $('.slideshow').parent()
      .addClass('slideContainer');
    currentOffset = 0;
    images = $('.slideContainer');
    // get the slide's height and width
    // slideShowWidth = $($('.slideContainer')[0]).width();
    slideShowWidth = $('.slideContainer').parent().width();
    // get the image height and width
    slideShowHeight = $($('.slideContainer')[0]).height();
    slideWidth = $($('.slideContainer')[0]).width();
    // set up the viewport
    const viewport = `<div id="viewport" width="${slideShowWidth}px""><img class="arrowLeft" src="${sciencenewsLegacyAssetsURL}/images/next_arrowL_80white.png"/><img src="${sciencenewsLegacyAssetsURL}/images/next_arrowR_80white.png" class="arrowRight"/><div class="dotContainer"></div><div id="container"></div></div>`;
    // find the images and wrap them
    $($('.slideContainer')[0]).before(viewport);
    // grab all the images and put into the container
    $('#container').append($('.slideContainer'));
    // set up the dot menu
    numImages = $('.slideshow').length;
    var imageCount = 1;
    while (imageCount <= numImages) {
      dotContent += `<div class="navDot" id="${imageCount}"></div>`;
      imageCount ++;
    }
    $('.dotContainer').html(dotContent);
    // make the first dot active
    activeId = `#${dotNum.toString()}`;
    $('.navDot').removeClass('active');
    $(activeId).addClass('active');
    // if we want ot normalize the height, now is the time to do it, for now lets keep all images the same size
    $('#viewport').width(slideShowWidth);
    $('#viewport').height(slideShowHeight);
    // Set the container to be all of the combined widths and fade em all out
    $('.slideContainer').height(slideShowHeight).each((index, element) => {
      const container = $('#container');
      container.width(container.width() + slideShowWidth);
    }).fadeTo(1, 0.25);// fade then all out
    $('.slideContainer').each((index, element) => {
      $(element).width(slideShowWidth);
    });
    // set the position of the container to be at the beggining
    $('#container').animate({ left: 0 }, 1);
    // fade in the first image
    $(images[currentImageIndex]).fadeTo('slow', 1);
    // set up the controls
    // if we are at the beginning, hide the left arrow and disable left swipe
    arrows();
    // offset the dot container
    const imageHeight = $($('.slideContainer')[0]).height();
    const dotOffset = imageHeight + 40;
    const arrowOffset = ((imageHeight / 2) + 55) - (0.08 * imageHeight);
    // fix the viewport
    // $('#viewport').width($($('.slideContainer')[0]).width());
    // position the nav dot
    $('.dotContainer').css({ top: dotOffset });
    // position the arrows
    // $('.arrowLeft').css({ top: arrowOffset });
    // $('.arrowRight').css({ top: arrowOffset });
    // get the height of each of the $('figcaption').height() and set all of them equal to the largest ones
    var imageCount = 0;
    let currentCaptionHeight = 0;
    let biggestCaptionHeight = 0;
    let biggestImageHeight = 0;
    let currentImageHeight = 0;
    while (imageCount <= numImages - 1) {
      // fix the image height
      currentImageHeight = $($('.slideContainer img')[imageCount]).height();
      if (biggestImageHeight < currentImageHeight) {
        biggestImageHeight = currentImageHeight;
      }
      imagePadding = biggestImageHeight - currentImageHeight;
      imagePadding += 'px';
      $($('.slideContainer img')[imageCount]).css({ 'padding-bottom': imagePadding, background: '#000000' }).width(slideShowWidth);
      // get the biggest caption height
      currentCaptionHeight = $($('.slideContainer figcaption')[imageCount]).outerHeight();

      if ('' == $($('.slideContainer figcaption')[imageCount]).text()) {
        $($('.slideContainer figcaption')[imageCount]).remove();
      } else if (biggestCaptionHeight < currentCaptionHeight) {
        biggestCaptionHeight = currentCaptionHeight;
      }

      imageCount ++;
    }
    $('.slideContainer figcaption').height(biggestCaptionHeight).css({ background: '#000000' });
    // fix the viewport height
    // const creditHeight = $('.slideContainer figcaption').height();
    let viewportHeight = biggestImageHeight + biggestCaptionHeight;
    let dotContainerHeight = viewportHeight - 20;

    if ('sciencenews-sns-child' == sciencenewsLegacySite) {
      viewportHeight += 20;
      dotContainerHeight += 70;
    }

    $('#viewport').height(viewportHeight);
    $('.dotContainer').css({ top: dotContainerHeight });
    // if we are at the end, hide the right arrow and disable right swipe
    // navDot
    $('.navDot').click((e) => {
    // disable all image movement if the animation is active
      if (active) {
        return;
      }
      active = true;
      clickedNav = e.target;
      gotoImage();
    });
    // arrows
    $('.arrowRight').click((e) => {
    // disable all image movement if the animation is active
      if (active) {

      } else {
        active = true;
        imageRight();
      }
    });
    $('.arrowLeft').click((e) => {
    // disable all image movement if the animation is active
      if (active) {

      } else {
        https:// www.sciencenews.org/sites/default/files/images/notebook_A_004.jpg   active = true;
        imageLeft();
      }
    });
    // move with a swipe on mobile
    // swipe left, move image right
    // swipe right, move image left
    $('#viewport').swipe({
      // Generic swipe handler for all directions
      swipe(event, direction, distance, duration, fingerCount) {
        if (active) {

        } else {
          if ('left' == direction && true != end) {
            active = true;
            imageRight();
          }
          if ('right' == direction && true != beginning) {
            active = true;
            imageLeft();
          }
        }
      },
      // Default is 75px
      threshold: 75,
    });

    // $('#viewport').on('swipe',function(){alert('swipe');});
    // if(!end){
    // $('.slideContainer').on('swiperight', imageLeft);
    // }
    // if(!beginning){
    // $('.slideContainer').on('swipeleft', imageRight);
    // }
  }
  function arrows() {
    if (beginning) {
      $('.arrowLeft').fadeOut();
    } else $('.arrowLeft').fadeIn();
    if (end) {
      $('.arrowRight').fadeOut();
    } else { $('.arrowRight').fadeIn(); }
  }
  function imageRight() { // formerly nextImage()
    // if this was clicked then we arent at the beginning anymore
    if (beginning = true) {
      beginning = false;
    }
    // set lastImageIndex eqaul to currentImageIndex before we move it
    lastImageIndex = currentImageIndex;
    currentImageIndex ++;
    if (currentImageIndex == images.length - 1) {
      end = true;
    }
    const moveNum = lastImageIndex - currentImageIndex; // calculate the Numver of spots we need to move -- here it will always be -1
    currentOffset = (moveNum * slideShowWidth); // calculate the width we need to move
    actualOffset += currentOffset;
    // call the animate function
    $('#container').animate({ left: actualOffset }, 'slow');
    // fade out the previous image and fade in the current one
    $(images[lastImageIndex]).fadeTo('slow', 0.25);
    $(images[currentImageIndex]).fadeTo('slow', 1, () => { active = false; });
    if (dotNum != images.length) {
      dotNum ++;
      moveDot();
    }
    arrows();
  }
  function imageLeft() { // formerly previous()
    // if this was clicked then we arent at the beginning anymore
    if (end = true) {
      end = false;
    }
    // set lastImageIndex eqaul to currentImageIndex before we move it
    lastImageIndex = currentImageIndex;
    currentImageIndex --;
    if (0 == currentImageIndex) {
      beginning = true;
    }
    const moveNum = lastImageIndex - currentImageIndex; // calculate the Number of spots we need to move -- here it will always be 1
    currentOffset = (moveNum * slideShowWidth); // calculate the width we need to move
    actualOffset += currentOffset;
    // call the animate function
    $('#container').animate({ left: actualOffset }, 'slow');
    // fade out the previous image and fade in the current one
    $(images[lastImageIndex]).fadeTo('slow', 0.25);
    $(images[currentImageIndex]).fadeTo('slow', 1, () => { active = false; });
    if (1 != dotNum) {
      dotNum --;
      moveDot();
    }
    arrows();
  }
  function moveDot() {
    activeId = `#${dotNum.toString()}`;
    $('.navDot').removeClass('active');
    $(activeId).addClass('active');
  }
  function gotoImage() {
    // var images = $(".slideContainer");
    lastImageIndex = currentImageIndex;
    const prevDotNum = dotNum;
    dotNum = $(clickedNav).attr('id');
    const moveNum = prevDotNum - dotNum;// calculate the Number of spots we need to move
    currentOffset = (moveNum * slideShowWidth); // calculate the width we need to move
    actualOffset += currentOffset;
    currentImageIndex = dotNum - 1;
    $('#container').animate({ left: actualOffset }, 'slow');
    // fade out the previous image and fade in the current one
    $(images[lastImageIndex]).fadeTo('slow', 0.25);
    $(images[currentImageIndex]).fadeTo('slow', 1, () => { active = false; });
    moveDot();
    if (dotNum == images.length) {
      end = true;
    } else { end = false; }
    if (1 == dotNum) {
      beginning = true;
    } else { beginning = false; }
    arrows();
  }
}(jQuery));
/** *****************
Swipe Plugin
********************/
(function (a) { if ('function' === typeof define && define.amd && define.amd.jQuery) { define(['jquery'], a); } else { a(jQuery); } }((e) => {
  let o = 'left',
    n = 'right',
    d = 'up',
    v = 'down',
    c = 'in',
    w = 'out',
    l = 'none',
    r = 'auto',
    k = 'swipe',
    s = 'pinch',
    x = 'tap',
    i = 'doubletap',
    b = 'longtap',
    A = 'horizontal',
    t = 'vertical',
    h = 'all',
    q = 10,
    f = 'start',
    j = 'move',
    g = 'end',
    p = 'cancel',
    a = 'ontouchstart' in window,
    y = 'TouchSwipe'; const m = {
    fingers: 1, threshold: 75, cancelThreshold: null, pinchThreshold: 20, maxTimeThreshold: null, fingerReleaseThreshold: 250, longTapThreshold: 500, doubleTapThreshold: 200, swipe: null, swipeLeft: null, swipeRight: null, swipeUp: null, swipeDown: null, swipeStatus: null, pinchIn: null, pinchOut: null, pinchStatus: null, click: null, tap: null, doubleTap: null, longTap: null, triggerOnTouchEnd: true, triggerOnTouchLeave: false, allowPageScroll: 'auto', fallbackToMouseEvents: true, excludedElements: 'label, button, input, select, textarea, a, .noSwipe',
  }; e.fn.swipe = function (D) {
    let C = e(this),
      B = C.data(y); if (B && 'string' === typeof D) { if (B[D]) { return B[D].apply(this, Array.prototype.slice.call(arguments, 1)); } e.error(`Method ${D} does not exist on jQuery.swipe`); } else if (! B && ('object' === typeof D || ! D)) { return u.apply(this, arguments); } return C;
  }; e.fn.swipe.defaults = m; e.fn.swipe.phases = {
    PHASE_START: f, PHASE_MOVE: j, PHASE_END: g, PHASE_CANCEL: p,
  }; e.fn.swipe.directions = {
    LEFT: o, RIGHT: n, UP: d, DOWN: v, IN: c, OUT: w,
  }; e.fn.swipe.pageScroll = {
    NONE: l, HORIZONTAL: A, VERTICAL: t, AUTO: r,
  }; e.fn.swipe.fingers = {
    ONE: 1, TWO: 2, THREE: 3, ALL: h,
  }; function u(B) { if (B && (B.allowPageScroll === undefined && (B.swipe !== undefined || B.swipeStatus !== undefined))) { B.allowPageScroll = l; } if (B.click !== undefined && B.tap === undefined) { B.tap = B.click; } if (! B) { B = {}; }B = e.extend({}, e.fn.swipe.defaults, B); return this.each(function () { const D = e(this); let C = D.data(y); if (! C) { C = new z(this, B); D.data(y, C); } }); } function z(a0, aq) {
    let av = (a || ! aq.fallbackToMouseEvents),
      G = av ? 'touchstart' : 'mousedown',
      au = av ? 'touchmove' : 'mousemove',
      R = av ? 'touchend' : 'mouseup',
      P = av ? null : 'mouseleave',
      az = 'touchcancel'; let ac = 0,
      aL = null,
      Y = 0,
      aX = 0,
      aV = 0,
      D = 1,
      am = 0,
      aF = 0,
      J = null; const aN = e(a0); let W = 'start'; let T = 0; let aM = null; let Q = 0,
      aY = 0,
      a1 = 0,
      aa = 0,
      K = 0; let aS = null; try { aN.bind(G, aJ); aN.bind(az, a5); } catch (ag) { e.error(`events not supported ${G},${az} on jQuery.swipe`); } this.enable = function () { aN.bind(G, aJ); aN.bind(az, a5); return aN; }; this.disable = function () { aG(); return aN; }; this.destroy = function () { aG(); aN.data(y, null); return aN; }; this.option = function (a8, a7) { if (aq[a8] !== undefined) { if (a7 === undefined) { return aq[a8]; } aq[a8] = a7; } else { e.error(`Option ${a8} does not exist on jQuery.swipe.options`); } return null; }; function aJ(a9) {
      if (ax()) { return; } if (0 < e(a9.target).closest(aq.excludedElements, aN).length) { return; } const ba = a9.originalEvent ? a9.originalEvent : a9; let a8,
        a7 = a ? ba.touches[0] : ba; W = f; if (a) { T = ba.touches.length; } else { a9.preventDefault(); }ac = 0; aL = null; aF = null; Y = 0; aX = 0; aV = 0; D = 1; am = 0; aM = af(); J = X(); O(); if (! a || (T === aq.fingers || aq.fingers === h) || aT()) { ae(0, a7); Q = ao(); if (2 == T) { ae(1, ba.touches[1]); aX = aV = ap(aM[0].start, aM[1].start); } if (aq.swipeStatus || aq.pinchStatus) { a8 = L(ba, W); } } else { a8 = false; } if (false === a8) { W = p; L(ba, W); return a8; } ak(true); return null;
    } function aZ(ba) {
      const bd = ba.originalEvent ? ba.originalEvent : ba; if (W === g || W === p || ai()) { return; } let a9,
        a8 = a ? bd.touches[0] : bd; const bb = aD(a8); aY = ao(); if (a) { T = bd.touches.length; }W = j; if (2 == T) { if (0 == aX) { ae(1, bd.touches[1]); aX = aV = ap(aM[0].start, aM[1].start); } else { aD(bd.touches[1]); aV = ap(aM[0].end, aM[1].end); aF = an(aM[0].end, aM[1].end); }D = a3(aX, aV); am = Math.abs(aX - aV); } if ((T === aq.fingers || aq.fingers === h) || ! a || aT()) { aL = aH(bb.start, bb.end); ah(ba, aL); ac = aO(bb.start, bb.end); Y = aI(); aE(aL, ac); if (aq.swipeStatus || aq.pinchStatus) { a9 = L(bd, W); } if (! aq.triggerOnTouchEnd || aq.triggerOnTouchLeave) { let a7 = true; if (aq.triggerOnTouchLeave) { const bc = aU(this); a7 = B(bb.end, bc); } if (! aq.triggerOnTouchEnd && a7) { W = ay(j); } else if (aq.triggerOnTouchLeave && ! a7) { W = ay(g); } if (W == p || W == g) { L(bd, W); } } } else { W = p; L(bd, W); } if (false === a9) { W = p; L(bd, W); }
    } function I(a7) { const a8 = a7.originalEvent; if (a) { if (0 < a8.touches.length) { C(); return true; } } if (ai()) { T = aa; }a7.preventDefault(); aY = ao(); Y = aI(); if (a6()) { W = p; L(a8, W); } else if (aq.triggerOnTouchEnd || (false == aq.triggerOnTouchEnd && W === j)) { W = g; L(a8, W); } else if (! aq.triggerOnTouchEnd && a2()) { W = g; aB(a8, W, x); } else if (W === j) { W = p; L(a8, W); }ak(false); return null; } function a5() { T = 0; aY = 0; Q = 0; aX = 0; aV = 0; D = 1; O(); ak(false); } function H(a7) { const a8 = a7.originalEvent; if (aq.triggerOnTouchLeave) { W = ay(g); L(a8, W); } } function aG() { aN.unbind(G, aJ); aN.unbind(az, a5); aN.unbind(au, aZ); aN.unbind(R, I); if (P) { aN.unbind(P, H); }ak(false); } function ay(bb) { let ba = bb; const a9 = aw(); const a8 = aj(); const a7 = a6(); if (! a9 || a7) { ba = p; } else if (a8 && bb == j && (! aq.triggerOnTouchEnd || aq.triggerOnTouchLeave)) { ba = g; } else if (! a8 && bb == g && aq.triggerOnTouchLeave) { ba = p; } return ba; } function L(a9, a7) { let a8; if (F() || S()) { a8 = aB(a9, a7, k); } else if ((M() || aT()) && false !== a8) { a8 = aB(a9, a7, s); } if (aC() && false !== a8) { a8 = aB(a9, a7, i); } else if (al() && false !== a8) { a8 = aB(a9, a7, b); } else if (ad() && false !== a8) { a8 = aB(a9, a7, x); } if (a7 === p) { a5(a9); } if (a7 === g) { if (a) { if (0 == a9.touches.length) { a5(a9); } } else { a5(a9); } } return a8; } function aB(ba, a7, a9) { let a8; if (a9 == k) { aN.trigger('swipeStatus', [a7, aL || null, ac || 0, Y || 0, T]); if (aq.swipeStatus) { a8 = aq.swipeStatus.call(aN, ba, a7, aL || null, ac || 0, Y || 0, T); if (false === a8) { return false; } } if (a7 == g && aR()) { aN.trigger('swipe', [aL, ac, Y, T]); if (aq.swipe) { a8 = aq.swipe.call(aN, ba, aL, ac, Y, T); if (false === a8) { return false; } } switch (aL) { case o: aN.trigger('swipeLeft', [aL, ac, Y, T]); if (aq.swipeLeft) { a8 = aq.swipeLeft.call(aN, ba, aL, ac, Y, T); } break; case n: aN.trigger('swipeRight', [aL, ac, Y, T]); if (aq.swipeRight) { a8 = aq.swipeRight.call(aN, ba, aL, ac, Y, T); } break; case d: aN.trigger('swipeUp', [aL, ac, Y, T]); if (aq.swipeUp) { a8 = aq.swipeUp.call(aN, ba, aL, ac, Y, T); } break; case v: aN.trigger('swipeDown', [aL, ac, Y, T]); if (aq.swipeDown) { a8 = aq.swipeDown.call(aN, ba, aL, ac, Y, T); } break; } } } if (a9 == s) { aN.trigger('pinchStatus', [a7, aF || null, am || 0, Y || 0, T, D]); if (aq.pinchStatus) { a8 = aq.pinchStatus.call(aN, ba, a7, aF || null, am || 0, Y || 0, T, D); if (false === a8) { return false; } } if (a7 == g && a4()) { switch (aF) { case c: aN.trigger('pinchIn', [aF || null, am || 0, Y || 0, T, D]); if (aq.pinchIn) { a8 = aq.pinchIn.call(aN, ba, aF || null, am || 0, Y || 0, T, D); } break; case w: aN.trigger('pinchOut', [aF || null, am || 0, Y || 0, T, D]); if (aq.pinchOut) { a8 = aq.pinchOut.call(aN, ba, aF || null, am || 0, Y || 0, T, D); } break; } } } if (a9 == x) { if (a7 === p || a7 === g) { clearTimeout(aS); if (V() && ! E()) { K = ao(); aS = setTimeout(e.proxy(() => { K = null; aN.trigger('tap', [ba.target]); if (aq.tap) { a8 = aq.tap.call(aN, ba, ba.target); } }, this), aq.doubleTapThreshold); } else { K = null; aN.trigger('tap', [ba.target]); if (aq.tap) { a8 = aq.tap.call(aN, ba, ba.target); } } } } else if (a9 == i) { if (a7 === p || a7 === g) { clearTimeout(aS); K = null; aN.trigger('doubletap', [ba.target]); if (aq.doubleTap) { a8 = aq.doubleTap.call(aN, ba, ba.target); } } } else if (a9 == b) { if (a7 === p || a7 === g) { clearTimeout(aS); K = null; aN.trigger('longtap', [ba.target]); if (aq.longTap) { a8 = aq.longTap.call(aN, ba, ba.target); } } } return a8; } function aj() { let a7 = true; if (null !== aq.threshold) { a7 = ac >= aq.threshold; } return a7; } function a6() { let a7 = false; if (null !== aq.cancelThreshold && null !== aL) { a7 = (aP(aL) - ac) >= aq.cancelThreshold; } return a7; } function ab() { if (null !== aq.pinchThreshold) { return am >= aq.pinchThreshold; } return true; } function aw() { let a7; if (aq.maxTimeThreshold) { if (Y >= aq.maxTimeThreshold) { a7 = false; } else { a7 = true; } } else { a7 = true; } return a7; } function ah(a7, a8) { if (aq.allowPageScroll === l || aT()) { a7.preventDefault(); } else { const a9 = aq.allowPageScroll === r; switch (a8) { case o: if ((aq.swipeLeft && a9) || (! a9 && aq.allowPageScroll != A)) { a7.preventDefault(); } break; case n: if ((aq.swipeRight && a9) || (! a9 && aq.allowPageScroll != A)) { a7.preventDefault(); } break; case d: if ((aq.swipeUp && a9) || (! a9 && aq.allowPageScroll != t)) { a7.preventDefault(); } break; case v: if ((aq.swipeDown && a9) || (! a9 && aq.allowPageScroll != t)) { a7.preventDefault(); } break; } } } function a4() { const a8 = aK(); const a7 = U(); const a9 = ab(); return a8 && a7 && a9; } function aT() { return !! (aq.pinchStatus || aq.pinchIn || aq.pinchOut); } function M() { return !! (a4() && aT()); } function aR() { const ba = aw(); const bc = aj(); const a9 = aK(); const a7 = U(); const a8 = a6(); const bb = ! a8 && a7 && a9 && bc && ba; return bb; } function S() { return !! (aq.swipe || aq.swipeStatus || aq.swipeLeft || aq.swipeRight || aq.swipeUp || aq.swipeDown); } function F() { return !! (aR() && S()); } function aK() { return ((T === aq.fingers || aq.fingers === h) || ! a); } function U() { return 0 !== aM[0].end.x; } function a2() { return !! (aq.tap); } function V() { return !! (aq.doubleTap); } function aQ() { return !! (aq.longTap); } function N() { if (null == K) { return false; } const a7 = ao(); return (V() && ((a7 - K) <= aq.doubleTapThreshold)); } function E() { return N(); } function at() { return ((1 === T || ! a) && (isNaN(ac) || 0 === ac)); } function aW() { return ((Y > aq.longTapThreshold) && (ac < q)); } function ad() { return !! (at() && a2()); } function aC() { return !! (N() && V()); } function al() { return !! (aW() && aQ()); } function C() { a1 = ao(); aa = event.touches.length + 1; } function O() { a1 = 0; aa = 0; } function ai() { let a7 = false; if (a1) { const a8 = ao() - a1; if (a8 <= aq.fingerReleaseThreshold) { a7 = true; } } return a7; } function ax() { return !! (true === aN.data(`${y}_intouch`)); } function ak(a7) { if (true === a7) { aN.bind(au, aZ); aN.bind(R, I); if (P) { aN.bind(P, H); } } else { aN.unbind(au, aZ, false); aN.unbind(R, I, false); if (P) { aN.unbind(P, H, false); } }aN.data(`${y}_intouch`, true === a7); } function ae(a8, a7) { const a9 = a7.identifier !== undefined ? a7.identifier : 0; aM[a8].identifier = a9; aM[a8].start.x = aM[a8].end.x = a7.pageX || a7.clientX; aM[a8].start.y = aM[a8].end.y = a7.pageY || a7.clientY; return aM[a8]; } function aD(a7) { const a9 = a7.identifier !== undefined ? a7.identifier : 0; const a8 = Z(a9); a8.end.x = a7.pageX || a7.clientX; a8.end.y = a7.pageY || a7.clientY; return a8; } function Z(a8) { for (let a7 = 0; a7 < aM.length; a7 ++) { if (aM[a7].identifier == a8) { return aM[a7]; } } } function af() { const a7 = []; for (let a8 = 0; 5 >= a8; a8 ++) { a7.push({ start: { x: 0, y: 0 }, end: { x: 0, y: 0 }, identifier: 0 }); } return a7; } function aE(a7, a8) { a8 = Math.max(a8, aP(a7)); J[a7].distance = a8; } function aP(a7) { if (J[a7]) { return J[a7].distance; } return undefined; } function X() { const a7 = {}; a7[o] = ar(o); a7[n] = ar(n); a7[d] = ar(d); a7[v] = ar(v); return a7; } function ar(a7) { return { direction: a7, distance: 0 }; } function aI() { return aY - Q; } function ap(ba, a9) { const a8 = Math.abs(ba.x - a9.x); const a7 = Math.abs(ba.y - a9.y); return Math.round(Math.sqrt(a8 * a8 + a7 * a7)); } function a3(a7, a8) { const a9 = (a8 / a7) * 1; return a9.toFixed(2); } function an() { if (1 > D) { return w; } return c; } function aO(a8, a7) { return Math.round(Math.sqrt(Math.pow(a7.x - a8.x, 2) + Math.pow(a7.y - a8.y, 2))); } function aA(ba, a8) { const a7 = ba.x - a8.x; const bc = a8.y - ba.y; const a9 = Math.atan2(bc, a7); let bb = Math.round(a9 * 180 / Math.PI); if (0 > bb) { bb = 360 - Math.abs(bb); } return bb; } function aH(a8, a7) { const a9 = aA(a8, a7); if ((45 >= a9) && (0 <= a9)) { return o; } if ((360 >= a9) && (315 <= a9)) { return o; } if ((135 <= a9) && (225 >= a9)) { return n; } if ((45 < a9) && (135 > a9)) { return v; } return d; } function ao() { const a7 = new Date(); return a7.getTime(); } function aU(a7) {
      a7 = e(a7); const a9 = a7.offset(); const a8 = {
        left: a9.left, right: a9.left + a7.outerWidth(), top: a9.top, bottom: a9.top + a7.outerHeight(),
      }; return a8;
    } function B(a7, a8) { return (a7.x > a8.left && a7.x < a8.right && a7.y > a8.top && a7.y < a8.bottom); }
  }
}));
