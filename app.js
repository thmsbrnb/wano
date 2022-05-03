document.addEventListener("DOMContentLoaded", function (event) {
    const list = document.querySelector(".carousel_list");
    const item = Array.from(list.children);
    const prevBtn = document.querySelector(".carousel_btn.is-left");
    const nextBtn = document.querySelector(".carousel_btn.is-right");
    const tracker = document.querySelector(".carousel_tracker");
    const trackerBtn = Array.from(tracker.children);
    const header = document.querySelector(".header");
    const navMobile = document.querySelector(".nav.is-mobile");
    const modal = document.querySelector(".modal");
    const cards = document.querySelectorAll(".card .btn");
    const triggers = document.querySelectorAll(".modal_trigger");
    const tabs = document.querySelectorAll(".tab_trigger");

    // Get width(px) of an item :
    const itemWidth = item[0].getBoundingClientRect().width;

    // Get item position from its width :
    const setItemPosition = (slide, index) => {
        slide.style.left = itemWidth * index + "px";
    };

    item.forEach(setItemPosition);

    // Slide items + update 'current' class name :
    const slideItem = (list, currentItem, targetSlide) => {
        list.style.transform = "translateX(-" + targetSlide.style.left + ")";
        currentItem.classList.remove("is-current");
        targetSlide.classList.add("is-current");
    };

    // Update tracker buttons appearance, depends on current item :
    const handleTrackerBtn = (activeTrackerBtn, targetDot) => {
        activeTrackerBtn.classList.remove("is-active");
        targetDot.classList.add("is-active");
    };

    // Handle arrow buttons display/ visibility :
    const handleCarouselBtn = (item, prevBtn, nextBtn, targetIndex) => {
        if (targetIndex === 0) {
            prevBtn.classList.add("is-hidden");
            nextBtn.classList.remove("is-hidden");
        } else if (targetIndex === item.length - 1) {
            prevBtn.classList.remove("is-hidden");
            nextBtn.classList.add("is-hidden");
        } else {
            prevBtn.classList.remove("is-hidden");
            nextBtn.classList.remove("is-hidden");
        }
    };

    // Handle previous button :
    prevBtn.addEventListener("click", (e) => {
        const currentItem = list.querySelector(".is-current");
        const prevItem = currentItem.previousElementSibling;
        const activeTrackerBtn = tracker.querySelector(".is-active");
        const prevTrackerBtn = activeTrackerBtn.previousElementSibling;
        const prevIndex = item.findIndex((slide) => slide === prevItem);

        slideItem(list, currentItem, prevItem);
        handleTrackerBtn(activeTrackerBtn, prevTrackerBtn);
        handleCarouselBtn(item, prevBtn, nextBtn, prevIndex);
    });

    // Handle next button :
    nextBtn.addEventListener("click", (e) => {
        const currentItem = list.querySelector(".is-current");
        const nextItem = currentItem.nextElementSibling;
        const activeTrackerBtn = tracker.querySelector(".is-active");
        const nextTrackerBtn = activeTrackerBtn.nextElementSibling;
        const nextIndex = item.findIndex((slide) => slide === nextItem);

        slideItem(list, currentItem, nextItem);
        handleTrackerBtn(activeTrackerBtn, nextTrackerBtn);
        handleCarouselBtn(item, prevBtn, nextBtn, nextIndex);
    });

    // Animate dots :
    tracker.addEventListener("click", (e) => {
        const targetTrackerBtn = e.target.closest("button");

        // If user click outside a tracker button :
        if (!targetTrackerBtn) return;

        const currentItem = list.querySelector(".is-current");
        const activeTrackerBtn = tracker.querySelector(".is-active");
        const targetIndex = trackerBtn.findIndex(
            (dot) => dot === targetTrackerBtn
        );
        const targetSlide = item[targetIndex];

        slideItem(list, currentItem, targetSlide);
        handleTrackerBtn(activeTrackerBtn, targetTrackerBtn);
        handleCarouselBtn(item, prevBtn, nextBtn, targetIndex);
    });

    function animateHeader() {
        if (
            document.body.scrollTop > 50 ||
            document.documentElement.scrollTop > 50
        ) {
            header.classList.add("is-small");
            navMobile.classList.add("is-active");
        } else {
            header.classList.remove("is-small");
            navMobile.classList.remove("is-active");
        }
    }

    window.onscroll = function () {
        animateHeader();
    };

    for (card of cards) {
        card.onclick = function () {
            modal.classList.toggle("is-active");
            document.body.classList.toggle("no-scroll");
        };
    }

    for (trigger of triggers) {
        trigger.onclick = function () {
            modal.classList.remove("is-active");
            document.body.classList.remove("no-scroll");
        };
    }

    for (tab of tabs) {
        tab.onclick = function () {
            this.classList.toggle("is-active");
        };
    }
});
