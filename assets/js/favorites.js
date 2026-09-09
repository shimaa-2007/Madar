document.addEventListener('DOMContentLoaded', function () {
  const grid = document.querySelector('.favorites-grid');
  const countElement = document.querySelector('.favorites-count span');
  const filters = document.querySelectorAll('.favorite-filter');

  if (!grid) return;

  let favorites = JSON.parse(localStorage.getItem('favoritePlanets')) || [];

  // =========================================
  // COSMIC ENTITIES DATA (PLANETS, STARS, GALAXIES)
  // =========================================
  const cosmicData = {
    // --- Planets ---
    mercury: {
      name: 'Mercury',
      type: 'Terrestrial Planet',
      description: 'The smallest planet and the closest world to the Sun.',
      image: 'assets/images/planets/Mercury.png',
      category: 'planets',
      link: '3-Planets_Details.html?planet=mercury',
    },
    venus: {
      name: 'Venus',
      type: 'Terrestrial Planet',
      description: 'A hot world covered by a thick atmosphere and clouds.',
      image: 'assets/images/planets/Venus.png',
      category: 'planets',
      link: '3-Planets_Details.html?planet=venus',
    },
    earth: {
      name: 'Earth',
      type: 'Terrestrial Planet',
      description: 'Our home planet and the only known world supporting life.',
      image: 'assets/images/planets/Earth.png',
      category: 'planets',
      link: '3-Planets_Details.html?planet=earth',
    },
    mars: {
      name: 'Mars',
      type: 'Terrestrial Planet',
      description: 'The red planet with a history of ancient water.',
      image: 'assets/images/planets/Mars.png',
      category: 'planets',
      link: '3-Planets_Details.html?planet=mars',
    },
    jupiter: {
      name: 'Jupiter',
      type: 'Gas Giant',
      description: 'The largest planet in our solar system.',
      image: 'assets/images/planets/Jupiter.png',
      category: 'planets',
      link: '3-Planets_Details.html?planet=jupiter',
    },
    saturn: {
      name: 'Saturn',
      type: 'Gas Giant',
      description: 'A giant planet famous for its spectacular rings.',
      image: 'assets/images/planets/Saturn.png',
      category: 'planets',
      link: '3-Planets_Details.html?planet=saturn',
    },
    uranus: {
      name: 'Uranus',
      type: 'Ice Giant',
      description: 'An icy world rotating on its side.',
      image: 'assets/images/planets/Uranus.png',
      category: 'planets',
      link: '3-Planets_Details.html?planet=uranus',
    },
    neptune: {
      name: 'Neptune',
      type: 'Ice Giant',
      description: 'A distant blue world with powerful winds.',
      image: 'assets/images/planets/Neptune.png',
      category: 'planets',
      link: '3-Planets_Details.html?planet=neptune',
    },

    // --- Stars & Galaxies ---
    betelgeuse: {
      name: 'Betelgeuse',
      type: 'Red Supergiant',
      description:
        'An evolved massive star that has exhausted its core hydrogen fuel.',
      image: 'assets/images/stars/red-giant-2.png',
      category: 'stars',
      link: '4-Stars_Galaxies.html',
    },
    rigel: {
      name: 'Rigel',
      type: 'Blue Supergiant',
      description:
        "A blazing blue supergiant shining with tens of thousands of times the Sun's luminosity.",
      image: 'assets/images/stars/rigel.png',
      category: 'stars',
      link: '4-Stars_Galaxies.html',
    },
    'the sun': {
      name: 'The Sun',
      type: 'Yellow Dwarf',
      description:
        'A dynamic G-type main-sequence star generating energy through core fusion.',
      image: 'assets/images/stars/sun.png',
      category: 'stars',
      link: '4-Stars_Galaxies.html',
    },
    'sirius b': {
      name: 'Sirius B',
      type: 'White Dwarf',
      description:
        'An ultra-dense stellar remnant packed with intense gravitational heat.',
      image: 'assets/images/stars/white-dwarf.png',
      category: 'stars',
      link: '4-Stars_Galaxies.html',
    },
    'proxima centauri': {
      name: 'Proxima Centauri',
      type: 'Red Dwarf',
      description:
        "A low-mass, cool stellar furnace and our solar system's nearest celestial neighbor.",
      image: 'assets/images/stars/red-dwarf.png',
      category: 'stars',
      link: '4-Stars_Galaxies.html',
    },
    'vela pulsar': {
      name: 'Vela Pulsar',
      type: 'Pulsar / Neutron',
      description: 'An ultra-dense stellar core spinning 11 times a second.',
      image: 'assets/images/stars/neuron.webp',
      category: 'stars',
      link: '4-Stars_Galaxies.html',
    },
    'milky way': {
      name: 'Milky Way',
      type: 'Barred Spiral Galaxy',
      description:
        'Our home harbor spanning 100,000 light-years across sweeping density waves.',
      image: 'assets/images/galaxies/spiral.webp',
      category: 'galaxies',
      link: '4-Stars_Galaxies.html',
    },
    'messier 87': {
      name: 'Messier 87',
      type: 'Elliptical Galaxy',
      description:
        'A supergiant ellipsoidal system dominated by ancient stars and a central supermassive black hole.',
      image: 'assets/images/galaxies/egg.png',
      category: 'galaxies',
      link: '4-Stars_Galaxies.html',
    },
    'large magellanic': {
      name: 'Large Magellanic',
      type: 'Irregular Galaxy',
      description:
        'A chaotic satellite companion rich in volatile interstellar gas.',
      image: 'assets/images/galaxies/Irregular.png',
      category: 'galaxies',
      link: '4-Stars_Galaxies.html',
    },
    'sombrero galaxy': {
      name: 'Sombrero Galaxy',
      type: 'Lenticular Galaxy',
      description:
        'Distinguished by a brilliant oversized central bulge and a razor-sharp dust lane.',
      image: 'assets/images/galaxies/last.png',
      category: 'galaxies',
      link: '4-Stars_Galaxies.html',
    },
  };

  function getItemKey(item) {
    if (typeof item === 'string') return item.toLowerCase().trim();
    if (item && item.name) return item.name.toLowerCase().trim();
    return '';
  }

  function saveFavorites() {
    localStorage.setItem('favoritePlanets', JSON.stringify(favorites));
  }

  function updateCount() {
    if (countElement) {
      countElement.textContent = favorites.length;
    }
  }

  function renderFavorites() {
    grid.innerHTML = '';
    updateCount();

    if (favorites.length === 0) {
      grid.innerHTML = `
                <div class="favorites-empty">
                    <div class="empty-icon"><i class="fa-regular fa-star"></i></div>
                    <h3>No Favorites Yet</h3>
                    <p>Start exploring and save your favorite planets, missions, and stars.</p>
                    <a href="4-Stars_Galaxies.html">Explore Stars & Galaxies <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            `;
      return;
    }

    let row = document.createElement('div');
    row.className = 'row g-4';
    grid.appendChild(row);

    favorites.forEach(function (item) {
      const key = getItemKey(item);
      if (!cosmicData[key]) return;

      const data = cosmicData[key];
      const cardColumn = document.createElement('div');
      cardColumn.className = 'col-lg-3 col-md-6 favorite-item';
      cardColumn.dataset.type = data.category;
      cardColumn.dataset.name = key;

      cardColumn.innerHTML = `
                <div class="planet-card">
                    <div class="planet-image">
                        <img src="${data.image}" alt="${data.name}">
                        <button class="favorite-btn active" data-name="${key}" type="button" aria-label="Remove from favorites">
                            <i class="fa-solid fa-heart"></i>
                        </button>
                    </div>
                    <div class="planet-content">
                        <div class="planet-type">${data.type}</div>
                        <h3>${data.name}</h3>
                        <p>${data.description}</p>
                        <div class="planet-actions">
                            <a href="${data.link}" class="planet-link">EXPLORE <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            `;
      row.appendChild(cardColumn);
    });
  }

  grid.addEventListener('click', function (event) {
    const favoriteButton = event.target.closest('.favorite-btn');
    if (!favoriteButton) return;

    event.preventDefault();
    event.stopPropagation();

    const name = favoriteButton.dataset.name;
    if (!name) return;

    favorites = favorites.filter(function (item) {
      return getItemKey(item) !== name;
    });

    saveFavorites();
    renderFavorites();
  });

  filters.forEach(function (filter) {
    filter.addEventListener('click', function (event) {
      event.preventDefault();
      filters.forEach((item) => item.classList.remove('active'));
      filter.classList.add('active');

      const selected = (filter.dataset.filter || filter.textContent)
        .trim()
        .toLowerCase();
      const items = document.querySelectorAll('.favorite-item');

      items.forEach(function (item) {
        const type = item.dataset.type;
        const isMatch =
          selected === 'all' ||
          selected === type ||
          (selected === 'planet' && type === 'planets') ||
          (selected === 'star' && type === 'stars') ||
          (selected === 'galaxy' && type === 'galaxies');

        if (isMatch) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  renderFavorites();
});
