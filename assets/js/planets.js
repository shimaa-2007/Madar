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
    if (!searchInput) return;

    const searchValue = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    planetItems.forEach((planet) => {
      const planetName = (planet.dataset.name || '').toLowerCase();
      const planetType = (planet.dataset.type || '').toLowerCase();

      const matchesSearch = planetName.includes(searchValue);
      const matchesFilter =
        currentFilter === 'all' || planetType === currentFilter;

      if (matchesSearch && matchesFilter) {
        planet.style.display = '';
        visibleCount++;
      } else {
        planet.style.display = 'none';
      }
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterPlanets);
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      currentFilter = button.dataset.filter;
      filterPlanets();
    });
  });

  const exploreButtons = document.querySelectorAll('.planet-link');
  exploreButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const planetItem = button.closest('.planet-item');
      if (!planetItem) return;
      const planetName = planetItem.dataset.name;
      event.preventDefault();
      window.location.href = `3-Planets_Details.html?planet=${planetName}`;
    });
  });

  // ===============================
  // FAVORITE SYSTEM (PLANETS & STARS)
  // ===============================

  const favoriteButtons = document.querySelectorAll('.favorite-btn');
  let favoritePlanets =
    JSON.parse(localStorage.getItem('favoritePlanets')) || [];

  function updateFavoriteButton(button, itemName) {
    const icon = button.querySelector('i');
    if (!icon) return;

    if (favoritePlanets.includes(itemName)) {
      button.classList.add('active');
      icon.classList.remove('fa-regular');
      icon.classList.add('fa-solid');
    } else {
      button.classList.remove('active');
      icon.classList.remove('fa-solid');
      icon.classList.add('fa-regular');
    }
  }

  // Initial State
  favoriteButtons.forEach((button) => {
    const itemCard = button.closest('.planet-item, .star-card');
    if (!itemCard) return;

    const itemName =
      button.dataset.name ||
      itemCard.dataset.name ||
      itemCard
        .querySelector('.star-card__title')
        ?.textContent.trim()
        .toLowerCase();

    if (!itemName) return;
    updateFavoriteButton(button, itemName);
  });

  // Click Event
  favoriteButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const itemCard = button.closest('.planet-item, .star-card');
      if (!itemCard) return;

      const itemName =
        button.dataset.name ||
        itemCard.dataset.name ||
        itemCard
          .querySelector('.star-card__title')
          ?.textContent.trim()
          .toLowerCase();

      if (!itemName) return;

      if (favoritePlanets.includes(itemName)) {
        favoritePlanets = favoritePlanets.filter((name) => name !== itemName);
      } else {
        favoritePlanets.push(itemName);
      }

      localStorage.setItem('favoritePlanets', JSON.stringify(favoritePlanets));
      updateFavoriteButton(button, itemName);
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
    { threshold: 0.15 },
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

  if (planetModal) {
    modalTriggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const planetName = trigger.dataset.planet;
        const planet = planetData[planetName];
        if (!planet) return;

        if (modalTitle) modalTitle.textContent = planet.name;
        if (modalImage) {
          modalImage.src = planet.image;
          modalImage.alt = planet.name;
        }
        if (modalType) modalType.textContent = planet.type;
        if (modalDescription) modalDescription.textContent = planet.description;
        if (modalTemperature) modalTemperature.textContent = planet.temperature;
        if (modalGravity) modalGravity.textContent = planet.gravity;
        if (modalMoons) modalMoons.textContent = planet.moons;
        if (modalExploreButton) {
          modalExploreButton.href = `3-Planets_Details.html?planet=${planetName}`;
        }

        planetModal.show();
      });
    });
  }

  if (searchInput) {
    filterPlanets();
  }

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

  let planetOneIndex = 2; // Earth
  let planetTwoIndex = 3; // Mars

  function getNextIndex(index) {
    return (index + 1) % comparisonPlanets.length;
  }

  function getPreviousIndex(index) {
    return (index - 1 + comparisonPlanets.length) % comparisonPlanets.length;
  }

  function updateComparisonPlanet(side, index, direction = 1) {
    const planet = comparisonPlanets[index];
    if (!planet) return;

    const prefix = side === 'one' ? 'One' : 'Two';
    const image = document.getElementById(`planet${prefix}Image`);
    const name = document.getElementById(`planet${prefix}Name`);
    const type = document.getElementById(`planet${prefix}Type`);
    const description = document.getElementById(`planet${prefix}Description`);
    const counter = document.getElementById(`planet${prefix}Current`);
    const explore = document.getElementById(`planet${prefix}Explore`);

    const diameter = document.getElementById(`comparison${prefix}Diameter`);
    const gravity = document.getElementById(`comparison${prefix}Gravity`);
    const temperature = document.getElementById(
      `comparison${prefix}Temperature`,
    );
    const moons = document.getElementById(`comparison${prefix}Moons`);
    const day = document.getElementById(`comparison${prefix}Day`);

    if (!image) return;

    image.style.opacity = '0';
    image.style.transform =
      direction > 0
        ? 'translateX(40px) scale(.85) rotate(8deg)'
        : 'translateX(-40px) scale(.85) rotate(-8deg)';

    setTimeout(() => {
      image.src = planet.image;
      image.alt = planet.name;

      if (name) name.textContent = planet.name;
      if (type) type.textContent = planet.type;
      if (description) description.textContent = planet.description;
      if (counter) counter.textContent = String(index + 1).padStart(2, '0');
      if (diameter) diameter.textContent = planet.diameter;
      if (gravity) gravity.textContent = planet.gravity;
      if (temperature) temperature.textContent = planet.temperature;
      if (moons) moons.textContent = planet.moons;
      if (day) day.textContent = planet.day;

      if (explore) {
        explore.href = `3-Planets_Details.html?planet=${planet.key}`;
        explore.innerHTML = `EXPLORE ${planet.name} <i class="fas fa-arrow-right"></i>`;
      }

      requestAnimationFrame(() => {
        image.style.opacity = '1';
        image.style.transform = 'translateX(0) scale(1) rotate(0deg)';
      });
    }, 180);
  }

  const planetOnePrev = document.getElementById('planetOnePrev');
  const planetOneNext = document.getElementById('planetOneNext');
  if (planetOnePrev) {
    planetOnePrev.addEventListener('click', () => {
      planetOneIndex = getPreviousIndex(planetOneIndex);
      updateComparisonPlanet('one', planetOneIndex, -1);
      updateActiveThumbnail();
    });
  }
  if (planetOneNext) {
    planetOneNext.addEventListener('click', () => {
      planetOneIndex = getNextIndex(planetOneIndex);
      updateComparisonPlanet('one', planetOneIndex, 1);
      updateActiveThumbnail();
    });
  }

  const planetTwoPrev = document.getElementById('planetTwoPrev');
  const planetTwoNext = document.getElementById('planetTwoNext');
  if (planetTwoPrev) {
    planetTwoPrev.addEventListener('click', () => {
      planetTwoIndex = getPreviousIndex(planetTwoIndex);
      updateComparisonPlanet('two', planetTwoIndex, -1);
      updateActiveThumbnail();
    });
  }
  if (planetTwoNext) {
    planetTwoNext.addEventListener('click', () => {
      planetTwoIndex = getNextIndex(planetTwoIndex);
      updateComparisonPlanet('two', planetTwoIndex, 1);
      updateActiveThumbnail();
    });
  }

  const selectorPrev = document.getElementById('comparisonSelectorPrev');
  const selectorNext = document.getElementById('comparisonSelectorNext');
  let comparisonSelectSide = 'one';

  const selectLeftPlanet = document.getElementById('selectLeftPlanet');
  const selectRightPlanet = document.getElementById('selectRightPlanet');

  function setComparisonSelectSide(side) {
    comparisonSelectSide = side;
    if (selectLeftPlanet)
      selectLeftPlanet.classList.toggle('active', side === 'one');
    if (selectRightPlanet)
      selectRightPlanet.classList.toggle('active', side === 'two');
    updateActiveThumbnail();
  }

  if (selectLeftPlanet) {
    selectLeftPlanet.addEventListener('click', () =>
      setComparisonSelectSide('one'),
    );
  }
  if (selectRightPlanet) {
    selectRightPlanet.addEventListener('click', () =>
      setComparisonSelectSide('two'),
    );
  }

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
      if (comparisonSelectSide === 'one' && index === planetTwoIndex) return;
      if (comparisonSelectSide === 'two' && index === planetOneIndex) return;

      if (comparisonSelectSide === 'one') {
        const direction = index >= planetOneIndex ? 1 : -1;
        planetOneIndex = index;
        updateComparisonPlanet('one', planetOneIndex, direction);
      } else {
        const direction = index >= planetTwoIndex ? 1 : -1;
        planetTwoIndex = index;
        updateComparisonPlanet('two', planetTwoIndex, direction);
      }
      updateActiveThumbnail();
    });
  });

  // =====================================================
  // THUMBNAIL SLIDER ARROWS (مع التخطي التلقائي للكوكب المقابل)
  // =====================================================

  if (selectorPrev) {
    selectorPrev.addEventListener('click', () => {
      if (comparisonSelectSide === 'one') {
        let nextIndex = getPreviousIndex(planetOneIndex);
        if (nextIndex === planetTwoIndex) {
          nextIndex = getPreviousIndex(nextIndex);
        }
        planetOneIndex = nextIndex;
        updateComparisonPlanet('one', planetOneIndex, -1);
      } else {
        let nextIndex = getPreviousIndex(planetTwoIndex);
        if (nextIndex === planetOneIndex) {
          nextIndex = getPreviousIndex(nextIndex);
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
        let nextIndex = getNextIndex(planetOneIndex);
        if (nextIndex === planetTwoIndex) {
          nextIndex = getNextIndex(nextIndex);
        }
        planetOneIndex = nextIndex;
        updateComparisonPlanet('one', planetOneIndex, 1);
      } else {
        let nextIndex = getNextIndex(planetTwoIndex);
        if (nextIndex === planetOneIndex) {
          nextIndex = getNextIndex(nextIndex);
        }
        planetTwoIndex = nextIndex;
        updateComparisonPlanet('two', planetTwoIndex, 1);
      }
      updateActiveThumbnail();
    });
  }

  if (document.getElementById('planetOneImage')) {
    setComparisonSelectSide('one');
    updateComparisonPlanet('one', planetOneIndex);
    updateComparisonPlanet('two', planetTwoIndex);
    updateActiveThumbnail();
  }
});
