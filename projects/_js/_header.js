window.addEventListener("DOMContentLoaded", (event) => {
    const header = document.querySelector(".header");
    const navMobile = document.querySelector(".nav.is-mobile");

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
});
