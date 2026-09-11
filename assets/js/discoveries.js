
// ================= SEARCH =================

const searchInput = document.querySelector(".search input");
const cards = document.querySelectorAll(".card");

searchInput.addEventListener("input", function () {

    const searchText = searchInput.value.toLowerCase();

    cards.forEach(function (card) {

        const cardText = card.innerText.toLowerCase();

        if (cardText.includes(searchText)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }

    });

});


// ================= SAVE DISPATCH =================

function saveDispatch(button) {

    if (button.innerText.includes("Saved")) {

        button.innerHTML = "♧ Save dispatch";

        showMessage("Dispatch removed from saved!");

    } else {

        button.innerHTML = "✓ Saved";

        showMessage("Dispatch saved successfully!");

    }

}


// ================= MESSAGE =================

function showMessage(text) {

    const oldMessage = document.querySelector(".save-message");

    if (oldMessage) {
        oldMessage.remove();
    }

    const message = document.createElement("div");

    message.className = "save-message";

    message.innerText = text;

    document.body.appendChild(message);

    setTimeout(function () {
        message.remove();
    }, 2000);

}

