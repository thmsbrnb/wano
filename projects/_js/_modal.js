window.addEventListener("DOMContentLoaded", (event) => {
    const modal = document.querySelector(".modal");
    const cards = document.querySelectorAll(".card .btn");
    const triggers = document.querySelectorAll(".modal_trigger");

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
});
