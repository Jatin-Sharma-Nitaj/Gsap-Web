document.addEventListener("DOMContentLoaded", function () {
    const scroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // 856986
    // Check if boundingelem exists
    console.log(document.querySelectorAll(".boundingelem"));
    var timeout;
    function cursoncircleskew() {
        //defining default sacle value
        var xscale = 1;
        var yscale = 1;

        var xprev = 0;
        var yprev = 0;

        window.addEventListener("mousemove", function (dets) {
            clearTimeout(timeout);

            var xdif = dets.clientX - xprev;
            var ydif = dets.clientY - yprev;

            xprev = dets.clientX;
            yprev = dets.clientY;

            xscale = gsap.utils.clamp(.8, 1.2, xdif)
            yscale = gsap.utils.clamp(.8, 1.2, ydif)

            // console.log(xdif, ydif);
            circlefollowfoolower(xscale, yscale);

            timeout = setTimeout(function () {
                document.querySelector("#mini-circle").style.transform =
                    `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
            }, 100)
        });
    }

    function firstpageanimation() {
        var tl = gsap.timeline();

        // Animate navigation
        tl.from("#nav", {
            y: "-10",
            opacity: 0,
            duration: 1.5,
            ease: "expo.easeinOut"
        });

        // Animate bounding elements
        tl.from(".boundingelem", {
            y: 0, // Starting position
            opacity: 0,
            ease: "expo.easeinOut",
            duration: 2,
            stagger: 0.2
        });
        //animating herafoter
        tl.from("#herofooter", {
            y: 0, // Starting position
            opacity: 0,
            ease: "expo.easeinOut",
            duration: 1.5,
            delay: -1,
            stagger: 0.2
        })
    }
    // Circle follow
    function circlefollowfoolower(xscale, yscale) {
        let timeout;
        window.addEventListener("mousemove", function (dets) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                document.querySelector("#mini-circle").style.transform =
                    `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`;
            }, 10);
        });
    }
    //3 elem ko select kr mousemove lgao or mouse ki x and y posstion pta kr,a dn vo image vha show kr 

    document.querySelectorAll(".elem").forEach(function (elem) {
        var rotate = 0;
        var diff = 0;
        elem.addEventListener("mousemove", function (dets) {
            var diff = dets.clientY - elem.getBoundingClientRect().top;
            diff = dets.clientX - rotate;
            rotate = dets.clientX;

            console.log("Mouse moved over:", elem);
            gsap.to(elem.querySelector("img"), {
                opacity: 1,
                ease: Power2.easeInOut,
                top: diff,
                left: dets.clientX,
                rotate: gsap.utils.clamp(-20, 20, diff * 0.5)
                // top : dets.clientY,
                // left : dets.clientY
                , // Corrected the easing function
            });
            console.log("Mouse is moving over:", elem);
            // Removed the undefined variable
        });
        elem.addEventListener("mouseleave", function (dets) {

            gsap.to(elem.querySelector("img"), {
                opacity: 0,
                duration: 0.5,
                ease: Power2
            });
            console.log("Mouse is moving over:", elem);
            // Removed the undefined variable
        });
    });
    circlefollowfoolower();
    firstpageanimation();
    cursoncircleskew();
});
