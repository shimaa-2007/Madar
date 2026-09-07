document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------
  // 1. Cosmic Facts (لصفحة الهوم بس لو العناصر موجودة)
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
  // 2. Tune Signal Buttons (لو موجودة)
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
  // 3. Missions Filter (المهم هنا)
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
});
