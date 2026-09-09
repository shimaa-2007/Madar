// ===============================
// PLANETS PAGE
// ===============================

document.addEventListener('DOMContentLoaded', () => {
  // ===============================
  // Elements
  // ===============================

  const searchInput = document.getElementById('planetSearch');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const planetItems = document.querySelectorAll('.planet-item');
  const noResults = document.getElementById('noResults');

  // Current active filter
  let currentFilter = 'all';

  // ===============================
  // Filter + Search Function
  // ===============================

  function filterPlanets() {
    const searchValue = searchInput.value.trim().toLowerCase();

    let visibleCount = 0;

    planetItems.forEach((planet) => {
      const planetName = planet.dataset.name.toLowerCase();

      const planetType = planet.dataset.type.toLowerCase();

      // Search condition
      const matchesSearch = planetName.includes(searchValue);

      // Filter condition
      const matchesFilter =
        currentFilter === 'all' || planetType === currentFilter;

      // Show / Hide
      if (matchesSearch && matchesFilter) {
        planet.style.display = '';

        visibleCount++;
      } else {
        planet.style.display = 'none';
      }
    });

    // ===============================
    // No Results
    // ===============================

    if (visibleCount === 0) {
      noResults.style.display = 'block';
    } else {
      noResults.style.display = 'none';
    }
  }

  // ===============================
  // Search
  // ===============================

  if (searchInput) {
    searchInput.addEventListener('input', filterPlanets);
  }

  // ===============================
  // Category Filters
  // ===============================

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Remove active from all buttons
      filterButtons.forEach((btn) => {
        btn.classList.remove('active');
      });

      // Add active to clicked button
      button.classList.add('active');

      // Get selected filter
      currentFilter = button.dataset.filter;

      // Apply filter
      filterPlanets();
    });
  });

  // ===============================
  // Explore Buttons
  // ===============================

  const exploreButtons = document.querySelectorAll('.planet-link');

  exploreButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      // Get the card
      const planetItem = button.closest('.planet-item');

      if (!planetItem) return;

      // Get planet name
      const planetName = planetItem.dataset.name;

      // Prevent old static link
      event.preventDefault();

      // Open details page with planet ID
      window.location.href = `3-Planets_Details.html?planet=${planetName}`;
    });
  });

  // ===============================
  // FAVORITE PLANETS
  // ===============================

  const favoriteButtons = document.querySelectorAll('.favorite-btn');

  let favoritePlanets =
    JSON.parse(localStorage.getItem('favoritePlanets')) || [];

  // ===============================
  // Update Favorite Button
  // ===============================

  function updateFavoriteButton(button, planetName) {
    const icon = button.querySelector('i');

    if (favoritePlanets.includes(planetName)) {
      button.classList.add('active');

      icon.classList.remove('fa-regular');
      icon.classList.add('fa-solid');
    } else {
      button.classList.remove('active');

      icon.classList.remove('fa-solid');
      icon.classList.add('fa-regular');
    }
  }

  // ===============================
  // Initial Favorite State
  // ===============================

  favoriteButtons.forEach((button) => {
    const itemCard = button.closest('.planet-item, .star-card');

    if (!itemCard) return;

    const planetName =
      itemCard.dataset.name ||
      itemCard.querySelector('.star-card__title')?.textContent.trim();

    if (!planetName) return;

    updateFavoriteButton(button, planetName);
  });

  // ===============================
  // Favorite Click
  // ===============================

  favoriteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const itemCard = button.closest('.planet-item, .star-card');

      if (!itemCard) return;

      const planetName =
        itemCard.dataset.name ||
        itemCard.querySelector('.star-card__title')?.textContent.trim();

      if (!planetName) return;

      // Add / Remove favorite

      if (favoritePlanets.includes(planetName)) {
        favoritePlanets = favoritePlanets.filter(
          (planet) => planet !== planetName,
        );
      } else {
        favoritePlanets.push(planetName);
      }

      // Save favorites

      localStorage.setItem('favoritePlanets', JSON.stringify(favoritePlanets));

      // Update button

      updateFavoriteButton(button, planetName);
    });
  });

  // ===============================
  // PLANET CARDS ANIMATION
  // ===============================

  const planetObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');

          planetObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  planetItems.forEach((planet, index) => {
    planet.style.transitionDelay = `${index * 0.08}s`;

    planetObserver.observe(planet);
  });

  // ===============================
  // PLANET MODAL
  // ===============================

  const modalTriggers = document.querySelectorAll('.planet-modal-trigger');

  const modalElement = document.getElementById('planetModal');

  const planetModal = modalElement ? new bootstrap.Modal(modalElement) : null;

  const modalTitle = document.getElementById('planetModalLabel');

  const modalImage = document.getElementById('modalPlanetImage');

  const modalType = document.getElementById('modalPlanetType');

  const modalDescription = document.getElementById('modalPlanetDescription');
  const modalTemperature = document.getElementById('modalPlanetTemperature');

  const modalGravity = document.getElementById('modalPlanetGravity');

  const modalMoons = document.getElementById('modalPlanetMoons');

  const modalExploreButton = document.getElementById('modalExploreBtn');

  // ===============================
  // Planet Data
  // ===============================

  const planetData = {
    mercury: {
      name: 'Mercury',
      type: 'TERRESTRIAL PLANET',
      image: 'assets/images/planets/Mercury.png',
      description: 'The smallest planet and the closest world to the Sun.',
      temperature: '167°C',
      gravity: '3.70 m/s²',
      moons: '0',
    },
    venus: {
      name: 'Venus',
      type: 'TERRESTRIAL PLANET',
      image: 'assets/images/planets/Venus.png',
      description: 'A hot world covered by a thick atmosphere and clouds.',
      temperature: '464°C',
      gravity: '8.87 m/s²',
      moons: '0',
    },

    earth: {
      name: 'Earth',
      type: 'TERRESTRIAL PLANET',
      image: 'assets/images/planets/Earth.png',
      description: 'Our home planet and the only known world to support life.',
      temperature: '15°C',
      gravity: '9.81 m/s²',
      moons: '1',
    },

    mars: {
      name: 'Mars',
      type: 'TERRESTRIAL PLANET',
      image: 'assets/images/planets/Mars.png',
      description:
        'The Red Planet, known for its rocky surface and dusty landscape.',
      temperature: '−65°C',
      gravity: '3.72 m/s²',
      moons: '2',
    },

    jupiter: {
      name: 'Jupiter',
      type: 'GAS GIANT',
      image: 'assets/images/planets/Jupiter.png',
      description: 'The largest planet in our solar system.',
      temperature: '−110°C',
      gravity: '24.79 m/s²',
      moons: '79',
    },

    saturn: {
      name: 'Saturn',
      type: 'GAS GIANT',
      image: 'assets/images/planets/Saturn.png',
      description: 'A giant planet famous for its spectacular ring system.',
      temperature: '−140°C',
      gravity: '10.44 m/s²',
      moons: '82',
    },

    uranus: {
      name: 'Uranus',
      type: 'ICE GIANT',
      image: 'assets/images/planets/Uranus.png',
      description: 'An ice giant with a distinctive blue-green appearance.',
      temperature: '−195°C',
      gravity: '8.69 m/s²',
      moons: '27',
    },

    neptune: {
      name: 'Neptune',
      type: 'ICE GIANT',
      image: 'assets/images/planets/Neptune.png',
      description:
        'A distant ice giant known for its deep blue color and powerful winds.',
      temperature: '−200°C',
      gravity: '11.15 m/s²',
      moons: '16',
    },
  };

  // ===============================
  // Open Modal
  // ===============================

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const planetName = trigger.dataset.planet;

      const planet = planetData[planetName];

      if (!planet) return;

      modalTitle.textContent = planet.name;

      modalImage.src = planet.image;

      modalImage.alt = planet.name;

      modalType.textContent = planet.type;

      modalDescription.textContent = planet.description;
      modalTemperature.textContent = planet.temperature;

      modalGravity.textContent = planet.gravity;

      modalMoons.textContent = planet.moons;
      modalExploreButton.href = `3-Planets_Details.html?planet=${planetName}`;

      planetModal.show();
    });
  });

  // ===============================
  // Initial State
  // ===============================

  filterPlanets();
  // =====================================================
  // COSMIC COMPARISON SLIDER
  // =====================================================

  const comparisonPlanets = [
    {
      key: 'mercury',
      name: 'MERCURY',
      type: 'TERRESTRIAL PLANET',
      image: 'assets/images/planets/Mercury.png',
      description: 'The smallest planet and the closest world to the Sun.',
      diameter: '4,879 km',
      gravity: '3.70 m/s²',
      temperature: '167°C',
      moons: '0',
      day: '1,408h',
    },

    {
      key: 'venus',
      name: 'VENUS',
      type: 'TERRESTRIAL PLANET',
      image: 'assets/images/planets/Venus.png',
      description:
        'A hot world covered by thick clouds and extreme conditions.',
      diameter: '12,104 km',
      gravity: '8.87 m/s²',
      temperature: '464°C',
      moons: '0',
      day: '5,832h',
    },

    {
      key: 'earth',
      name: 'EARTH',
      type: 'TERRESTRIAL PLANET',
      image: 'assets/images/planets/Earth.png',
      description: 'Our home planet and the only known world to support life.',
      diameter: '12,742 km',
      gravity: '9.81 m/s²',
      temperature: '15°C',
      moons: '1',
      day: '24h',
    },

    {
      key: 'mars',
      name: 'MARS',
      type: 'TERRESTRIAL PLANET',
      image: 'assets/images/planets/Mars.png',
      description:
        'The Red Planet, a world of mystery and future possibilities.',
      diameter: '6,779 km',
      gravity: '3.71 m/s²',
      temperature: '-63°C',
      moons: '2',
      day: '24.6h',
    },

    {
      key: 'jupiter',
      name: 'JUPITER',
      type: 'GAS GIANT',
      image: 'assets/images/planets/Jupiter.png',
      description:
        'The largest planet in the solar system with powerful storms.',
      diameter: '139,820 km',
      gravity: '24.79 m/s²',
      temperature: '-110°C',
      moons: '95',
      day: '9.9h',
    },

    {
      key: 'saturn',
      name: 'SATURN',
      type: 'GAS GIANT',
      image: 'assets/images/planets/Saturn.png',
      description: 'A magnificent gas giant famous for its spectacular rings.',
      diameter: '116,460 km',
      gravity: '10.44 m/s²',
      temperature: '-140°C',
      moons: '146',
      day: '10.7h',
    },

    {
      key: 'uranus',
      name: 'URANUS',
      type: 'ICE GIANT',
      image: 'assets/images/planets/Uranus.png',
      description: 'An icy blue world rotating on its side.',
      diameter: '50,724 km',
      gravity: '8.69 m/s²',
      temperature: '-195°C',
      moons: '28',
      day: '17.2h',
    },

    {
      key: 'neptune',
      name: 'NEPTUNE',
      type: 'ICE GIANT',
      image: 'assets/images/planets/Neptune.png',
      description:
        'A distant ice giant known for its deep blue color and powerful winds.',
      diameter: '49,244 km',
      gravity: '11.15 m/s²',
      temperature: '-200°C',
      moons: '16',
      day: '16.1h',
    },
  ];

  // =====================================================
  // CURRENT PLANETS
  // =====================================================

  let planetOneIndex = 2; // Earth
  let planetTwoIndex = 3; // Mars

  // =====================================================
  // HELPER
  // =====================================================

  function getNextIndex(index) {
    return (index + 1) % comparisonPlanets.length;
  }

  function getPreviousIndex(index) {
    return (index - 1 + comparisonPlanets.length) % comparisonPlanets.length;
  }

  // =====================================================
  // UPDATE COMPARISON PLANET
  // =====================================================

  function updateComparisonPlanet(side, index, direction = 1) {
    const planet = comparisonPlanets[index];

    if (!planet) return;

    // =================================================
    // ELEMENTS
    // =================================================

    const prefix = side === 'one' ? 'One' : 'Two';

    const image = document.getElementById(`planet${prefix}Image`);

    const name = document.getElementById(`planet${prefix}Name`);

    const type = document.getElementById(`planet${prefix}Type`);

    const description = document.getElementById(`planet${prefix}Description`);

    const counter = document.getElementById(`planet${prefix}Current`);

    const explore = document.getElementById(`planet${prefix}Explore`);

    // =================================================
    // COMPARISON STATISTICS
    // =================================================

    const diameter = document.getElementById(`comparison${prefix}Diameter`);

    const gravity = document.getElementById(`comparison${prefix}Gravity`);

    const temperature = document.getElementById(
      `comparison${prefix}Temperature`,
    );

    const moons = document.getElementById(`comparison${prefix}Moons`);

    const day = document.getElementById(`comparison${prefix}Day`);

    // =================================================
    // SAFETY CHECK
    // =================================================

    if (!image) return;

    // =================================================
    // SLIDE OUT
    // =================================================

    image.style.opacity = '0';

    image.style.transform =
      direction > 0
        ? 'translateX(40px) scale(.85) rotate(8deg)'
        : 'translateX(-40px) scale(.85) rotate(-8deg)';

    // =================================================
    // UPDATE AFTER ANIMATION
    // =================================================

    setTimeout(() => {
      // Image
      image.src = planet.image;
      image.alt = planet.name;

      // Main information
      if (name) {
        name.textContent = planet.name;
      }

      if (type) {
        type.textContent = planet.type;
      }

      if (description) {
        description.textContent = planet.description;
      }

      // Counter
      if (counter) {
        counter.textContent = String(index + 1).padStart(2, '0');
      }

      // Statistics
      if (diameter) {
        diameter.textContent = planet.diameter;
      }

      if (gravity) {
        gravity.textContent = planet.gravity;
      }

      if (temperature) {
        temperature.textContent = planet.temperature;
      }

      if (moons) {
        moons.textContent = planet.moons;
      }

      if (day) {
        day.textContent = planet.day;
      }

      // Explore button
      if (explore) {
        explore.href = `3-Planets_Details.html?planet=${planet.key}`;

        explore.innerHTML = `EXPLORE ${planet.name}
                 <i class="fas fa-arrow-right"></i>`;
      }

      // =================================================
      // SLIDE IN
      // =================================================

      requestAnimationFrame(() => {
        image.style.opacity = '1';

        image.style.transform = 'translateX(0) scale(1) rotate(0deg)';
      });
    }, 180);
  }

  // =====================================================
  // FIRST PLANET
  // =====================================================

  const planetOnePrev = document.getElementById('planetOnePrev');

  const planetOneNext = document.getElementById('planetOneNext');

  if (planetOnePrev) {
    planetOnePrev.addEventListener('click', () => {
      planetOneIndex = getPreviousIndex(planetOneIndex);

      updateComparisonPlanet('one', planetOneIndex, -1);

      updateActiveThumbnail(planetOneIndex);
    });
  }

  if (planetOneNext) {
    planetOneNext.addEventListener('click', () => {
      planetOneIndex = getNextIndex(planetOneIndex);

      updateComparisonPlanet('one', planetOneIndex, 1);

      updateActiveThumbnail(planetOneIndex);
    });
  }

  // =====================================================
  // SECOND PLANET
  // =====================================================

  const planetTwoPrev = document.getElementById('planetTwoPrev');

  const planetTwoNext = document.getElementById('planetTwoNext');

  if (planetTwoPrev) {
    planetTwoPrev.addEventListener('click', () => {
      planetTwoIndex = getPreviousIndex(planetTwoIndex);

      updateComparisonPlanet('two', planetTwoIndex, -1);
    });
  }

  if (planetTwoNext) {
    planetTwoNext.addEventListener('click', () => {
      planetTwoIndex = getNextIndex(planetTwoIndex);

      updateComparisonPlanet('two', planetTwoIndex, 1);
    });
  }

  // =====================================================
  // THUMBNAIL SLIDER ARROWS
  // =====================================================

  const selectorPrev = document.getElementById('comparisonSelectorPrev');

  const selectorNext = document.getElementById('comparisonSelectorNext');

  // =====================================================
  // INTERACTIVE PLANET SELECTOR
  // =====================================================

  let comparisonSelectSide = 'one';

  // =====================================================
  // SELECT MODE BUTTONS
  // =====================================================

  const selectLeftPlanet = document.getElementById('selectLeftPlanet');

  const selectRightPlanet = document.getElementById('selectRightPlanet');

  function setComparisonSelectSide(side) {
    comparisonSelectSide = side;

    if (selectLeftPlanet) {
      selectLeftPlanet.classList.toggle('active', side === 'one');
    }

    if (selectRightPlanet) {
      selectRightPlanet.classList.toggle('active', side === 'two');
    }

    updateActiveThumbnail();
  }

  if (selectLeftPlanet) {
    selectLeftPlanet.addEventListener('click', () => {
      setComparisonSelectSide('one');
    });
  }

  if (selectRightPlanet) {
    selectRightPlanet.addEventListener('click', () => {
      setComparisonSelectSide('two');
    });
  }

  // =====================================================
  // THUMBNAILS
  // =====================================================

  const thumbnails = document.querySelectorAll('.comparison-thumbnail');

  function updateActiveThumbnail() {
    const currentIndex =
      comparisonSelectSide === 'one' ? planetOneIndex : planetTwoIndex;

    thumbnails.forEach((thumbnail, index) => {
      thumbnail.classList.toggle('active', index === currentIndex);
    });
  }

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
      // =========================================
      // PREVENT SAME PLANET
      // =========================================

      if (comparisonSelectSide === 'one' && index === planetTwoIndex) {
        thumbnail.animate(
          [
            {
              transform: 'translateX(0)',
            },
            {
              transform: 'translateX(-5px)',
            },
            {
              transform: 'translateX(5px)',
            },
            {
              transform: 'translateX(0)',
            },
          ],
          {
            duration: 250,
          },
        );

        return;
      }

      if (comparisonSelectSide === 'two' && index === planetOneIndex) {
        thumbnail.animate(
          [
            {
              transform: 'translateX(0)',
            },
            {
              transform: 'translateX(-5px)',
            },
            {
              transform: 'translateX(5px)',
            },
            {
              transform: 'translateX(0)',
            },
          ],
          {
            duration: 250,
          },
        );

        return;
      }

      // =========================================
      // UPDATE LEFT
      // =========================================

      if (comparisonSelectSide === 'one') {
        const direction = index >= planetOneIndex ? 1 : -1;

        planetOneIndex = index;

        updateComparisonPlanet('one', planetOneIndex, direction);
      }

      // =========================================
      // UPDATE RIGHT
      // =========================================
      else {
        const direction = index >= planetTwoIndex ? 1 : -1;

        planetTwoIndex = index;

        updateComparisonPlanet('two', planetTwoIndex, direction);
      }

      updateActiveThumbnail();
    });
  });

  // =====================================================
  // THUMBNAIL SLIDER ARROWS
  // =====================================================

  if (selectorPrev) {
    selectorPrev.addEventListener('click', () => {
      if (comparisonSelectSide === 'one') {
        const nextIndex = getPreviousIndex(planetOneIndex);

        if (nextIndex === planetTwoIndex) {
          return;
        }

        planetOneIndex = nextIndex;

        updateComparisonPlanet('one', planetOneIndex, -1);
      } else {
        const nextIndex = getPreviousIndex(planetTwoIndex);

        if (nextIndex === planetOneIndex) {
          return;
        }

        planetTwoIndex = nextIndex;

        updateComparisonPlanet('two', planetTwoIndex, -1);
      }

      updateActiveThumbnail();
    });
  }

  if (selectorNext) {
    selectorNext.addEventListener('click', () => {
      if (comparisonSelectSide === 'one') {
        const nextIndex = getNextIndex(planetOneIndex);

        if (nextIndex === planetTwoIndex) {
          return;
        }

        planetOneIndex = nextIndex;

        updateComparisonPlanet('one', planetOneIndex, 1);
      } else {
        const nextIndex = getNextIndex(planetTwoIndex);

        if (nextIndex === planetOneIndex) {
          return;
        }

        planetTwoIndex = nextIndex;

        updateComparisonPlanet('two', planetTwoIndex, 1);
      }

      updateActiveThumbnail();
    });
  }

  // =====================================================
  // INITIAL SELECT MODE
  // =====================================================

  setComparisonSelectSide('one');

  // =====================================================
  // INITIAL STATE
  // =====================================================

  updateComparisonPlanet('one', planetOneIndex);

  updateComparisonPlanet('two', planetTwoIndex);

  // Initial active thumbnail
  updateActiveThumbnail(planetOneIndex);
});
