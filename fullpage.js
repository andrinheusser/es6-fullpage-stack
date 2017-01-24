"use strict";

var $ = require('jquery');

var delta,
    currentSlideIndex = 0,
    scrollThreshold = 2,
    dragThreshold = 0.15,
    dragStart = null,
    percentage = 0,
    target,
    previousTarget,
    activeClass = 'active',
    noAnimationClass = 'no-animation';

var slides;
var slideCount = 0;
var slideClass = '.slide';

function setupGlobals(){
    slides = $(slideClass);
    slideCount = slides.length-1;
}

function touchStart(e){
    if( dragStart !== null ){
        return;
    }

    if( e.originalEvent.touches ){
        e = e.originalEvent.touches[0];
    }

    dragStart = e.clientY;

    target = slides.eq(currentSlideIndex)[0];

    target.classList.add(noAnimationClass);

    previousTarget = slides.eq(currentSlideIndex-1)[0];
    previousTarget.classList.add(noAnimationClass);
}

function touchMove(e){
    if( dragStart !== null ){
        return;
    }

    if( e.originalEvent.touches ){
        e = e.originalEvent.touches[0];
    }

    delta = dragStart - e.clientY;

    percentage = delta / $(window).height();

    if( percentage > 0 ){
        target.style.height = (100-(percentage*100))+'%';
        if( previousTarget ){
            previousTarget.style.height = '';
        }
    }else if( previousTarget ){
        previousTarget.style.height = (-percentage*100)+'%';
        target.style.height = '';
    }

    return false;
}

function touchEnd(){
    dragStart = null;

    target.classList.remove(noAnimationClass);
    if( previousTarget ){
        previousTarget.classList.remove(noAnimationClass);
    }

    if( percentage >= dragThreshold ){
        nextSlide();
    }else if( Math.abs(percentage) >= dragThreshold ){
        prevSlide();
    }else{
        showSlide();
    }

    percentage = 0;
}

function elementScroll(e){
    if( e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0 ){

        delta--;

        if( Math.abs(delta) >= scrollThreshold ){
            prevSlide();
        }

    }else{

        delta++;

        if( delta >= scrollThreshold ){
            nextSlide();
        }

    }

    return false;
}

function showSlide(){
    if( ! slides ){
        setupGlobals();
    }

    delta = 0;

    slides.each(function(i, slide){
        $(slide).toggleClass(activeClass, ( i >= currentSlideIndex ));
    });
}

function prevSlide(){
    currentSlideIndex--;

    if( currentSlideIndex < 0 ){
        currentSlideIndex = 0;
    }

    showSlide();
}

function nextSlide(){
    currentSlideIndex++;

    if( currentSlideIndex > slideCount ){
        currentSlideIndex = slideCount;
    }

    showSlide();
}

function goToSlide(slideIndex){
    if( slideIndex > slideCount ){
        currentSlideIndex = slideCount;
    }else{
        currentSlideIndex = slideIndex;
    }

    showSlide();
}

module.exports = { 'elementScroll': elementScroll, 'showSlide': showSlide, 'touchStart': touchStart, 'touchEnd': touchEnd, 'touchMove': touchMove, 'goToSlide': goToSlide };
