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
    // const planetItem = button.closest(".planet-item");

    // if (!planetItem) return;

    // const planetName = planetItem.dataset.name;
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
      // const planetItem =
      //     button.closest(".planet-item");

      // if (!planetItem) return;

      // const planetName =
      //     planetItem.dataset.name;
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

  // const modalElement =
  //     document.getElementById("planetModal");

  // const planetModal =
  //     new bootstrap.Modal(modalElement);
  const modalElement = document.getElementById('planetModal');
  const planetModal = modalElement ? new bootstrap.Modal(modalElement) : null;

  const modalTitle = document.getElementById('planetModalLabel');

  const modalImage = document.getElementById('modalPlanetImage');

  const modalType = document.getElementById('modalPlanetType');

  const modalDescription = document.getElementById('modalPlanetDescription');

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
    },

    venus: {
      name: 'Venus',
      type: 'TERRESTRIAL PLANET',
      image: 'assets/images/planets/Venus.png',
      description: 'A hot world covered by a thick atmosphere and clouds.',
    },

    earth: {
      name: 'Earth',
      type: 'TERRESTRIAL PLANET',
      image: 'assets/images/planets/Earth.png',
      description: 'Our home planet and the only known world to support life.',
    },

    mars: {
      name: 'Mars',
      type: 'TERRESTRIAL PLANET',
      image: 'assets/images/planets/Mars.png',
      description:
        'The Red Planet, known for its rocky surface and dusty landscape.',
    },

    jupiter: {
      name: 'Jupiter',
      type: 'GAS GIANT',
      image: 'assets/images/planets/Jupiter.png',
      description: 'The largest planet in our solar system.',
    },

    saturn: {
      name: 'Saturn',
      type: 'GAS GIANT',
      image: 'assets/images/planets/Saturn.png',
      description: 'A giant planet famous for its spectacular ring system.',
    },

    uranus: {
      name: 'Uranus',
      type: 'ICE GIANT',
      image: 'assets/images/planets/Uranus.png',
      description: 'An ice giant with a distinctive blue-green appearance.',
    },

    neptune: {
      name: 'Neptune',
      type: 'ICE GIANT',
      image: 'assets/images/planets/Neptune.png',
      description:
        'A distant ice giant known for its deep blue color and powerful winds.',
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

      modalExploreButton.href = `3-Planets_Details.html?planet=${planetName}`;

      planetModal.show();
    });
  });

  // ===============================
  // Initial State
  // ===============================

  filterPlanets();
});
