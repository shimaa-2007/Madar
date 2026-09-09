document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------
  // 1. Cosmic Facts
  // -------------------------------------------------------------
  const factTextEl = document.getElementById('factText');
  const nextFactBtn = document.getElementById('nextFactBtn');

  if (factTextEl && nextFactBtn) {
    const cosmicFacts = [
      "There are more stars in the universe than grains of sand on all of Earth's beaches combined.",
      'A day on Venus is longer than a full Venusian year—it takes 243 Earth days to rotate once.',
      "One teaspoon of a neutron star's material would weigh approximately 6 billion tons on Earth.",
      'Betelgeuse is so gigantic that if placed at the center of our solar system, its surface would extend past Mars and Jupiter.',
      'The light we see from the Andromeda Galaxy left its stars 2.5 million years ago, long before modern humans existed.',
      'Space is completely silent—sound waves require a physical medium to travel, leaving the cosmic vacuum dead quiet.',
      'Neutron stars like the Vela Pulsar can spin hundreds of times every single second.',
      'Our solar system travels through space at an astonishing speed of 828,000 km/h orbiting the galactic core.',
    ];

    let currentFactIndex = -1;

    function displayRandomFact() {
      factTextEl.classList.add('fade-out');

      setTimeout(() => {
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * cosmicFacts.length);
        } while (nextIndex === currentFactIndex && cosmicFacts.length > 1);

        currentFactIndex = nextIndex;
        factTextEl.textContent = cosmicFacts[currentFactIndex];
        factTextEl.classList.remove('fade-out');
      }, 250);
    }

    displayRandomFact();
    nextFactBtn.addEventListener('click', displayRandomFact);
  }

  // -------------------------------------------------------------
  // 2. Tune Signal Buttons
  // -------------------------------------------------------------
  const tuneButtons = document.querySelectorAll('.tune-btn');
  if (tuneButtons.length > 0) {
    tuneButtons.forEach((btn) => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-signal-target');
        const targetPane = document.querySelector(targetId);

        if (targetPane) {
          document
            .querySelectorAll('#signalTabContent .signal-card')
            .forEach((pane) => {
              pane.classList.remove('show', 'active');
            });

          targetPane.classList.add('active');
          setTimeout(() => {
            targetPane.classList.add('show');
          }, 20);

          targetPane.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      });
    });
  }

  // -------------------------------------------------------------
  // 3. Missions Filter
  // -------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-pills .pill-btn');
  const timelineItems = document.querySelectorAll('.mission-item');
  const recordsNum = document.getElementById('records-num');

  if (filterButtons.length > 0) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        // نقل كلاس active
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');
        let visibleIndex = 0;

        timelineItems.forEach((item) => {
          const category = item.getAttribute('data-category');
          const isMatch = filterValue === 'all' || category === filterValue;

          if (isMatch) {
            item.style.setProperty('--delay', `${visibleIndex * 70}ms`);
            item.classList.remove('is-hidden');
            visibleIndex++;
          } else {
            item.style.setProperty('--delay', '0ms');
            item.classList.add('is-hidden');
          }
        });

        if (recordsNum) {
          recordsNum.textContent = visibleIndex;
        }
      });
    });
  }
  // -------------------------------------------------------------
  // 4. Scroll Reveal + Real-Time Search
  // -------------------------------------------------------------
  const searchInput = document.querySelector('.filter-bar__search .search');
  const tabButtons = document.querySelectorAll(
    '#cosmic-tabs [data-bs-toggle="pill"]',
  );

  const cardObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.05,
      rootMargin: '0px 0px -20px 0px',
    },
  );

  function observeActiveCards() {
    const activeTabPane = document.querySelector('.tab-pane.active');
    if (!activeTabPane) return;

    const cards = activeTabPane.querySelectorAll(
      '.star-card:not(.search-hidden)',
    );
    cards.forEach((card, index) => {
      card.style.setProperty('--delay', `${(index % 2) * 60}ms`);
      if (!card.classList.contains('is-visible')) {
        cardObserver.observe(card);
      }
    });
  }

  observeActiveCards();

  tabButtons.forEach((tabBtn) => {
    tabBtn.addEventListener('shown.bs.tab', () => {
      if (searchInput) searchInput.value = '';
      document.querySelectorAll('.star-card').forEach((card) => {
        card.classList.remove('search-hidden', 'is-visible');
      });
      observeActiveCards();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.trim().toLowerCase();
      const activeTabPane = document.querySelector('.tab-pane.active');
      if (!activeTabPane) return;

      const cards = activeTabPane.querySelectorAll('.star-card');

      cards.forEach((card) => {
        if (term === '') {
          card.classList.remove('search-hidden');
          card.classList.add('is-visible');
          return;
        }

        const titles = Array.from(
          card.querySelectorAll('.star-card__title'),
        ).map((t) => t.textContent.trim().toLowerCase());

        const isMatch = titles.some((title) => {
          const words = title.split(/\s+/);
          return words.some((word) => word.startsWith(term));
        });

        if (isMatch) {
          card.classList.remove('search-hidden');
          card.classList.add('is-visible');
        } else {
          card.classList.add('search-hidden');
        }
      });
    });
  }
});
