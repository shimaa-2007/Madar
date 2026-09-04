// ===============================
// PLANETS PAGE
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // Elements
    // ===============================

    const searchInput = document.getElementById("planetSearch");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const planetItems = document.querySelectorAll(".planet-item");
    const noResults = document.getElementById("noResults");

    // Current active filter
    let currentFilter = "all";


    // ===============================
    // Filter + Search Function
    // ===============================

    function filterPlanets() {

        const searchValue = searchInput.value
            .trim()
            .toLowerCase();

        let visibleCount = 0;

        planetItems.forEach((planet) => {

            const planetName =
                planet.dataset.name.toLowerCase();

            const planetType =
                planet.dataset.type.toLowerCase();


            // Search condition
            const matchesSearch =
                planetName.includes(searchValue);


            // Filter condition
            const matchesFilter =
                currentFilter === "all" ||
                planetType === currentFilter;


            // Show / Hide
            if (matchesSearch && matchesFilter) {

                planet.style.display = "";

                visibleCount++;

            } else {

                planet.style.display = "none";

            }

        });


        // ===============================
        // No Results
        // ===============================

        if (visibleCount === 0) {

            noResults.style.display = "block";

        } else {

            noResults.style.display = "none";

        }
    }


    // ===============================
    // Search
    // ===============================

    if (searchInput) {

        searchInput.addEventListener("input", filterPlanets);

    }


    // ===============================
    // Category Filters
    // ===============================

    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            // Remove active from all buttons
            filterButtons.forEach((btn) => {
                btn.classList.remove("active");
            });


            // Add active to clicked button
            button.classList.add("active");


            // Get selected filter
            currentFilter =
                button.dataset.filter;


            // Apply filter
            filterPlanets();

        });

    });


    // ===============================
    // Explore Buttons
    // ===============================

    const exploreButtons =
        document.querySelectorAll(".planet-link");


    exploreButtons.forEach((button) => {

        button.addEventListener("click", (event) => {

            // Get the card
            const planetItem =
                button.closest(".planet-item");


            if (!planetItem) return;


            // Get planet name
            const planetName =
                planetItem.dataset.name;


            // Prevent old static link
            event.preventDefault();


            // Open details page with planet ID
            window.location.href =
                `3-Planets_Details.html?planet=${planetName}`;

        });

    });


    // ===============================
    // Initial State
    // ===============================

    filterPlanets();

});