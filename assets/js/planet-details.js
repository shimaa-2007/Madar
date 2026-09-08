// ========================================
// MADAR - PLANET DETAILS
// ========================================

document.addEventListener("DOMContentLoaded", () => {


    // ========================================
    // PLANET DATA
    // ========================================

    const planets = {

        mercury: {

            name: "Mercury",

            type: "Terrestrial Planet",

            image: "assets/images/planets/Mercury.png",

            description:
                "The smallest planet in our solar system and the closest to the Sun.",

            distance:
                "57.9 million km",

            diameter:
                "4,879 km",

            day:
                "58.6 Earth days",

            year:
                "88 Earth days",

            composition:
                "Mercury is a rocky planet with a large iron core surrounded by a rocky mantle and crust.",

            atmosphere:
                "Mercury has an extremely thin exosphere made mostly of oxygen, sodium, hydrogen, helium, and potassium.",

            fact:
                "A day on Mercury lasts longer than its year."
        },


        venus: {

            name: "Venus",

            type: "Terrestrial Planet",

            image: "assets/images/planets/Venus.png",

            description:
                "A hot, cloudy world with a thick atmosphere and temperatures hotter than any other planet.",

            distance:
                "108.2 million km",

            diameter:
                "12,104 km",

            day:
                "243 Earth days",

            year:
                "225 Earth days",

            composition:
                "Venus is a rocky planet with a metallic core, rocky mantle, and solid crust.",

            atmosphere:
                "Its thick atmosphere is mostly carbon dioxide with clouds of sulfuric acid.",

            fact:
                "Venus rotates in the opposite direction to most planets."
        },


        earth: {

            name: "Earth",

            type: "Terrestrial Planet",

            image: "assets/images/planets/Earth.png",

            description:
                "Our home planet, rich with liquid water and the only known world supporting life.",

            distance:
                "149.6 million km",

            diameter:
                "12,742 km",

            day:
                "24 hours",

            year:
                "365.25 days",

            composition:
                "Earth has a solid inner core, liquid outer core, rocky mantle, and a thin crust.",

            atmosphere:
                "Earth's atmosphere is mostly nitrogen and oxygen, with smaller amounts of other gases.",

            fact:
                "Earth is the only known planet to support life."
        },


        mars: {

            name: "Mars",

            type: "Terrestrial Planet",

            image: "assets/images/planets/Mars.png",

            description:
                "The Red Planet, a cold desert world with ancient valleys, volcanoes, and impact craters.",

            distance:
                "227.9 million km",

            diameter:
                "6,779 km",

            day:
                "24.6 hours",

            year:
                "687 Earth days",

            composition:
                "Mars is a rocky planet with an iron-rich core, rocky mantle, and dusty surface.",

            atmosphere:
                "Mars has a very thin atmosphere composed mostly of carbon dioxide.",

            fact:
                "Mars is home to Olympus Mons, the largest volcano in the solar system."
        },


        jupiter: {

            name: "Jupiter",

            type: "Gas Giant",

            image: "assets/images/planets/Jupiter.png",

            description:
                "The largest planet in our solar system, famous for its massive storms and powerful magnetic field.",

            distance:
                "778.5 million km",

            diameter:
                "139,820 km",

            day:
                "9.9 hours",

            year:
                "11.86 Earth years",

            composition:
                "Jupiter is primarily composed of hydrogen and helium with no solid surface.",

            atmosphere:
                "Its atmosphere is mostly hydrogen and helium with clouds of ammonia and other compounds.",

            fact:
                "Jupiter is so massive that it contains more than twice the mass of all the other planets combined."
        },


        saturn: {

            name: "Saturn",

            type: "Gas Giant",

            image: "assets/images/planets/Saturn.png",

            description:
                "A magnificent gas giant famous for its spectacular system of icy rings.",

            distance:
                "1.43 billion km",

            diameter:
                "116,460 km",

            day:
                "10.7 hours",

            year:
                "29.45 Earth years",

            composition:
                "Saturn is primarily made of hydrogen and helium and does not have a solid surface.",

            atmosphere:
                "Its atmosphere is mostly hydrogen and helium with traces of methane and ammonia.",

            fact:
                "Saturn's average density is lower than water."
        },


        uranus: {

            name: "Uranus",

            type: "Ice Giant",

            image: "assets/images/planets/Uranus.png",

            description:
                "An icy blue world rotating on its side with a unique and extreme axial tilt.",

            distance:
                "2.87 billion km",

            diameter:
                "50,724 km",

            day:
                "17.2 hours",

            year:
                "84 Earth years",

            composition:
                "Uranus contains a rocky core surrounded by an icy mantle and a hydrogen-helium atmosphere.",

            atmosphere:
                "Its atmosphere consists mainly of hydrogen and helium with methane giving it its blue color.",

            fact:
                "Uranus rotates almost completely on its side."
        },


        neptune: {

            name: "Neptune",

            type: "Ice Giant",

            image: "assets/images/planets/Neptune.png",

            description:
                "The distant blue giant with incredibly powerful winds and dynamic weather systems.",

            distance:
                "4.5 billion km",

            diameter:
                "49,244 km",

            day:
                "16.1 hours",

            year:
                "164.8 Earth years",

            composition:
                "Neptune has a rocky core surrounded by an icy mantle and a thick atmosphere.",

            atmosphere:
                "Its atmosphere is mostly hydrogen and helium with methane, which gives Neptune its blue appearance.",

            fact:
                "Neptune has some of the fastest winds in the solar system."
        }

    };



    // ========================================
    // GET PLANET FROM URL
    // ========================================

    const params = new URLSearchParams(window.location.search);

    let planetKey = params.get("planet");


    // Support #planet=mars as well
    if (!planetKey && window.location.hash) {

        const hashParams =
            new URLSearchParams(
                window.location.hash.substring(1)
            );

        planetKey = hashParams.get("planet");

    }


    // Default planet
    if (!planetKey) {

        planetKey = "earth";

    }


    planetKey =
        planetKey.toLowerCase();


    const planet =
        planets[planetKey];


    // ========================================
    // CHECK PLANET
    // ========================================

    if (!planet) {

        console.error("Planet not found:", planetKey);

        return;

    }



    // ========================================
    // GET HTML ELEMENTS
    // ========================================

    const planetImage =
        document.getElementById("planetImage");

    const planetName =
        document.getElementById("planetName");

    const planetType =
        document.getElementById("planetType");

    const planetDescription =
        document.getElementById("planetDescription");

    const planetDistance =
        document.getElementById("planetDistance");

    const planetDiameter =
        document.getElementById("planetDiameter");

    const planetDay =
        document.getElementById("planetDay");

    const planetYear =
        document.getElementById("planetYear");

    const planetComposition =
        document.getElementById("planetComposition");

    const planetAtmosphere =
        document.getElementById("planetAtmosphere");

    const planetFact =
        document.getElementById("planetFact");



    // ========================================
    // DISPLAY PLANET DATA
    // ========================================

    planetImage.src =
        planet.image;

    planetImage.alt =
        planet.name;


    planetName.textContent =
        planet.name;


    planetType.textContent =
        planet.type;


    planetDescription.textContent =
        planet.description;


    planetDistance.textContent =
        planet.distance;


    planetDiameter.textContent =
        planet.diameter;


    planetDay.textContent =
        planet.day;


    planetYear.textContent =
        planet.year;


    planetComposition.textContent =
        planet.composition;


    planetAtmosphere.textContent =
        planet.atmosphere;


    planetFact.textContent =
        planet.fact;



    // ========================================
    // PAGE TITLE
    // ========================================

    document.title =
        `${planet.name} - Madar`;



    // ========================================
    // FAVORITES
    // ========================================

    const favoriteBtn =
        document.getElementById("favoriteBtn");


    const favorites =
        JSON.parse(
            localStorage.getItem("madarFavorites")
        ) || [];


    updateFavoriteButton();


    favoriteBtn.addEventListener(
        "click",
        () => {

            const index =
                favorites.indexOf(planetKey);


            if (index === -1) {

                favorites.push(planetKey);

            } else {

                favorites.splice(index, 1);

            }


            localStorage.setItem(
                "madarFavorites",
                JSON.stringify(favorites)
            );


            updateFavoriteButton();

        }
    );


    function updateFavoriteButton() {

        const icon =
            favoriteBtn.querySelector("i");

        const text =
            favoriteBtn.querySelector("span");


        const isFavorite =
            favorites.includes(planetKey);


        if (isFavorite) {

            icon.className =
                "fa-solid fa-star";

            text.textContent =
                "Remove from Favorites";

            favoriteBtn.classList.add(
                "active"
            );

        } else {

            icon.className =
                "fa-regular fa-star";

            text.textContent =
                "Add to Favorites";

            favoriteBtn.classList.remove(
                "active"
            );

        }

    }

});