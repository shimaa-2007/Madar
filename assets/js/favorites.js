document.addEventListener("DOMContentLoaded", function () {

    const grid = document.querySelector(".favorites-grid");
    const countElement = document.querySelector(".favorites-count span");
    const filters = document.querySelectorAll(".favorite-filter");

    if (!grid) return;

    // =========================================
    // FAVORITES
    // =========================================

    let favorites = JSON.parse(localStorage.getItem("favoritePlanets")) || [];

    // =========================================
    // PLANET IMAGES
    // =========================================

    const planetImages = {
        mercury: "assets/images/planets/mercury.png",
        venus: "assets/images/planets/venus.png",
        earth: "assets/images/planets/earth.png",
        mars: "assets/images/planets/mars.png",
        jupiter: "assets/images/planets/jupiter.png",
        saturn: "assets/images/planets/saturn.png",
        uranus: "assets/images/planets/uranus.png",
        neptune: "assets/images/planets/neptune.png"
    };

    // =========================================
    // PLANET DATA
    // =========================================

    const planets = {

        mercury: {
            name: "Mercury",
            type: "Terrestrial Planet",
            description: "The smallest planet and the closest world to the Sun.",
            link: "3-Planets_Details.html?planet=mercury"
        },

        venus: {
            name: "Venus",
            type: "Terrestrial Planet",
            description: "A hot world covered by a thick atmosphere and clouds.",
            link: "3-Planets_Details.html?planet=venus"
        },

        earth: {
            name: "Earth",
            type: "Terrestrial Planet",
            description: "Our home planet and the only known world supporting life.",
            link: "3-Planets_Details.html?planet=earth"
        },

        mars: {
            name: "Mars",
            type: "Terrestrial Planet",
            description: "The red planet with a history of ancient water.",
            link: "3-Planets_Details.html?planet=mars"
        },

        jupiter: {
            name: "Jupiter",
            type: "Gas Giant",
            description: "The largest planet in our solar system.",
            link: "3-Planets_Details.html?planet=jupiter"
        },

        saturn: {
            name: "Saturn",
            type: "Gas Giant",
            description: "A giant planet famous for its spectacular rings.",
            link: "3-Planets_Details.html?planet=saturn"
        },

        uranus: {
            name: "Uranus",
            type: "Ice Giant",
            description: "An icy world rotating on its side.",
            link: "3-Planets_Details.html?planet=uranus"
        },

        neptune: {
            name: "Neptune",
            type: "Ice Giant",
            description: "A distant blue world with powerful winds.",
            link: "3-Planets_Details.html?planet=neptune"
        }

    };

    // =========================================
    // GET PLANET NAME
    // =========================================

    function getPlanetName(item) {

        if (typeof item === "string") {
            return item.toLowerCase().trim();
        }

        if (item && item.name) {
            return item.name.toLowerCase().trim();
        }

        return "";
    }

    // =========================================
    // SAVE FAVORITES
    // =========================================

    function saveFavorites() {
        localStorage.setItem(
            "favoritePlanets",
            JSON.stringify(favorites)
        );
    }

    // =========================================
    // UPDATE COUNT
    // =========================================

    function updateCount() {

        if (countElement) {
            countElement.textContent = favorites.length;
        }

    }

    // =========================================
    // RENDER FAVORITES
    // =========================================

    function renderFavorites() {

        grid.innerHTML = "";

        updateCount();

        // =====================================
        // EMPTY
        // =====================================

        if (favorites.length === 0) {

            grid.innerHTML = `
                <div class="favorites-empty">

                    <div class="empty-icon">
                        <i class="fa-regular fa-star"></i>
                    </div>

                    <h3>No Favorites Yet</h3>

                    <p>
                        Start exploring and save your favorite planets,
                        missions, and stars.
                    </p>

                    <a href="2-Planets.html">
                        Explore Planets
                        <i class="fa-solid fa-arrow-right"></i>
                    </a>

                </div>
            `;

            return;
        }

        // =====================================
        // CREATE CARDS
        // =====================================

        favorites.forEach(function (item) {

            const planetName = getPlanetName(item);

            if (!planets[planetName]) {
                return;
            }

            const planet = planets[planetName];

            const image =
                planetImages[planetName] ||
                "assets/images/planets/" + planetName + ".jpg";

           let row = grid.querySelector(".row");

if (!row) {
    row = document.createElement("div");
    row.className = "row g-4";
    grid.appendChild(row);
}
const cardColumn = document.createElement("div");
            cardColumn.className =
                "col-lg-3 col-md-6 favorite-item";

            cardColumn.dataset.type = "planets";

            cardColumn.dataset.name = planetName;

            cardColumn.innerHTML = `

                <div class="planet-card">

                    <div class="planet-image">

                        <img
                            src="${image}"
                            alt="${planet.name}"
                            onerror="
                                this.onerror=null;
                                this.src='assets/images/planets/${planetName}.png';
                            "
                        >

                        <button
                            class="favorite-btn active"
                            data-name="${planetName}"
                            type="button"
                            aria-label="Remove ${planet.name} from favorites"
                        >

                            <i class="fa-solid fa-star"></i>

                        </button>

                    </div>


                    <div class="planet-content">

                        <div class="planet-type">
                            ${planet.type}
                        </div>

                        <h3>
                            ${planet.name}
                        </h3>

                        <p>
                            ${planet.description}
                        </p>

                        <div class="planet-actions">

                            <a
                                href="${planet.link}"
                                class="planet-link"
                            >
                                EXPLORE
                                <i class="fa-solid fa-arrow-right"></i>
                            </a>

                        </div>

                    </div>

                </div>
            `;

           row.appendChild(cardColumn);

        });

    }

    // =========================================
    // STAR BUTTON
    // EVENT DELEGATION
    // =========================================

    grid.addEventListener("click", function (event) {

        const favoriteButton =
            event.target.closest(".favorite-btn");

        if (!favoriteButton) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        const name =
            favoriteButton.dataset.name;

        if (!name) {
            return;
        }

        // Remove from favorites

        favorites = favorites.filter(function (item) {

            return getPlanetName(item) !== name;

        });

        saveFavorites();

        renderFavorites();

    });

    // =========================================
    // FILTER BUTTONS
    // =========================================

    filters.forEach(function (filter) {

        filter.addEventListener("click", function (event) {

            event.preventDefault();

            // Remove active from all

            filters.forEach(function (item) {

                item.classList.remove("active");

            });

            // Add active to clicked button

            filter.classList.add("active");

            const selected =
                filter.textContent
                    .trim()
                    .toLowerCase();

            const items =
                document.querySelectorAll(".favorite-item");

            items.forEach(function (item) {

                const type =
                    item.dataset.type;

                if (
                    selected === "all" ||
                    (selected === "planets" &&
                        type === "planets")
                ) {

                    item.classList.remove("hidden");

                } else {

                    item.classList.add("hidden");

                }

            });

        });

    });

    // =========================================
    // START
    // =========================================

    renderFavorites();

});

// document.addEventListener("DOMContentLoaded", function () {

//     const grid = document.querySelector(".favorites-grid");
//     const countElement = document.querySelector(".favorites-count span");
//     const filters = document.querySelectorAll(".favorite-filter");

//     if (!grid) return;
//     let favorites = JSON.parse(localStorage.getItem("favoritePlanets")) || [];

//             const planets = {

//         mercury: {
//             name: "Mercury",
//             type: "Terrestrial Planet",
//             description: "The smallest planet and the closest world to the Sun.",
//             image: "assets/images/planets/mercury.png"
//         },

//         venus: {
//             name: "Venus",
//             type: "Terrestrial Planet",
//             description: "A hot world covered by a thick atmosphere and clouds.",
//             image: "assets/images/planets/venus.png"
//         },

//         earth: {
//             name: "Earth",
//             type: "Terrestrial Planet",
//             description: "Our home planet and the only known world supporting life.",
//             image: "assets/images/planets/earth.png"
//         },

//         mars: {
//             name: "Mars",
//             type: "Terrestrial Planet",
//             description: "The red planet with a history of ancient water.",
//             image: "assets/images/planets/mars.png"
//         },

//         jupiter: {
//             name: "Jupiter",
//             type: "Gas Giant",
//             description: "The largest planet in our solar system.",
//             image: "assets/images/planets/jupiter.png"
//         },

//         saturn: {
//             name: "Saturn",
//             type: "Gas Giant",
//             description: "A giant planet famous for its spectacular rings.",
//             image: "assets/images/planets/saturn.png"
//         },

//         uranus: {
//             name: "Uranus",
//             type: "Ice Giant",
//             description: "An icy world rotating on its side.",
//             image: "assets/images/planets/uranus.png"
//         },

//         neptune: {
//             name: "Neptune",
//             type: "Ice Giant",
//             description: "A distant blue world with powerful winds.",
//             image: "assets/images/planets/neptune.png"
//         }

//     };


//         function getPlanetName(item) {

//         if (typeof item === "string") {
//             return item.toLowerCase().trim();
//         }

//         if (item && item.name) {
//             return item.name.toLowerCase().trim();
//         }

//         return "";
//     }


//         function saveFavorites() {

//         localStorage.setItem(
//             "favorites",
//             JSON.stringify(favorites)
//         );

//     }

//         function updateCount() {

//         if (countElement) {
//             countElement.textContent = favorites.length;
//         }

//     }


//         function renderFavorites() {

//         grid.innerHTML = "";

//         updateCount();

//         if (favorites.length === 0) {
//             grid.innerHTML = `
//                 <div class="favorites-empty">
//                     <div class="empty-icon">
//                         <i class="fa-regular fa-star"></i>
//                     </div>

//                     <h3>No Favorites Yet</h3>

//                     <p>
//                         Start exploring and save your favorite planets,
//                         missions, and stars.
//                     </p>

//                     <a href="2-Planets.html">
//                         Explore Planets
//                         <i class="fa-solid fa-arrow-right"></i>
//                     </a>
//                 </div>
//             `;

//             return;
//         }

//         favorites.forEach(function (item) {

//             const planetName = getPlanetName(item);

//             if (!planets[planetName]) {
//                 return;
//             }

//             const planet = planets[planetName];

//             const cardColumn = document.createElement("div");

//             cardColumn.className =
//                 "col-lg-4 col-md-6 favorite-item";

//             cardColumn.dataset.type = "planets";

//             cardColumn.dataset.name = planetName;

//             cardColumn.innerHTML = `
//                 <div class="planet-card">

//                     <div class="planet-image">

//                         <img
//                             src="${planet.image}"
//                             alt="${planet.name}"
//                         >

//                         <button
//                             class="favorite-btn active"
//                             data-name="${planetName}"
//                             type="button"
//                         >
//                             <i class="fa-solid fa-star"></i>
//                         </button>

//                     </div>

//                     <div class="planet-content">

//                         <div class="planet-type">
//                             ${planet.type}
//                         </div>

//                         <h3>
//                             ${planet.name}
//                         </h3>

//                         <p>
//                             ${planet.description}
//                         </p>

//                         <div class="planet-actions">

//                             <a
//                                 href="3-Planets_Details.html"
//                                 class="planet-link"
//                             >
//                                 EXPLORE
//                                 <i class="fa-solid fa-arrow-right"></i>
//                             </a>

//                         </div>

//                     </div>

//                 </div>
//             `;

//             grid.appendChild(cardColumn);

//         });

//     }


//         grid.addEventListener("click", function (event) {

//         const favoriteButton =
//             event.target.closest(".favorite-btn");

//         if (!favoriteButton) {
//             return;
//         }

//         event.preventDefault();
//         event.stopPropagation();

//         const name =
//             favoriteButton.dataset.name;

//         if (!name) {
//             return;
//         }

//         favorites = favorites.filter(function (item) {

//             return getPlanetName(item) !== name;

//         });

//         saveFavorites();

//         renderFavorites();

//     });

// });