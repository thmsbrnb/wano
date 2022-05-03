window.addEventListener("DOMContentLoaded", (event) => {
    const tabs = document.querySelectorAll(".tab_trigger");

    for (tab of tabs) {
        tab.onclick = function () {
            this.classList.toggle("is-active");
        };
    }
});
