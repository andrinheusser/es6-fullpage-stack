# es6-fullpage-stack
Based on http://www.hugeinc.com/ideas/perspective/scroll-jacking-on-hugeinc


## Sample SCSS Setup

Basics: Position slides absolute within container and stack them by z-index

```
.contanier{
    height: 100vw;
    width: 100vh;
    & > .slide{
        height: 0;
        
        position: absolute;
        top: 0; right: 0; bottom: 0; left: 0;
        width: 100%;
        overflow: hidden;
        margin: 0; padding: 0; // avoid margin/paddings on slides
        
        transition: height 0.9s ease-in-out;
        &.active{ 
            height: 100%;
        }
        // adjust as needed
        @for $i from 1 through 9{
            &:nth-child(#{$i}){
                z-index: 10 - $i;
            }
        }
    }
}
```

## Sample js Init

```
showSlide();
$(window).on('DOMMouseScroll mousewheel', elementScroll);
$('body').on({
    'touchstart': touchStart,
    'touchmove': touchMove,
    'touchend': touchEnd
});
```
