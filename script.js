document.addEventListener("DOMContentLoaded", () => {
  // --- Smooth Scrolling for Navigation Links ---
  const navLinks = document.querySelectorAll(
    "header .nav-link, .hero .nav-link"
  );
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = document.querySelector("header").offsetHeight + 20; // Adjust offset if header is sticky
        const elementPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // --- Scroll-Triggered Animations ---
  const animatedElements = document.querySelectorAll(".scroll-animate");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay) || 0;
          setTimeout(() => {
            entry.target.classList.add("is-visible");
            // Optional: Unobserve after animation to prevent re-triggering
            // observer.unobserve(entry.target);
          }, delay);
        }
        // Optional: To re-animate when scrolling up
        // else {
        //     entry.target.classList.remove('is-visible');
        // }
      });
    },
    {
      rootMargin: "0px",
      threshold: 0.1, // 10% of the element is visible
    }
  );

  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // --- Subtle Hero Image Parallax on Scroll ---
  const heroMockupMain = document.getElementById("hero-mockup-main");
  const heroMockupSecondary = document.getElementById("hero-mockup-secondary");
  const heroSection = document.querySelector(".hero");

  // Initial transform values (matching CSS for consistency if JS is enhancing)
  // These values represent the starting state defined in CSS
  const initialMainX = 20; // px from translateX(20px)
  const initialMainY = -5; // px from translateY(-5px)
  const initialMainRot = 3; // deg from rotate(3deg)

  const initialSecondaryX = -40; // px from translateX(-40px)
  const initialSecondaryY = 20; // px from translateY(20px)
  const initialSecondaryRot = -4; // deg from rotate(-4deg)

  if (heroMockupMain && heroMockupSecondary && heroSection) {
    // Set initial positions explicitly via JS if you want JS to fully control them
    // or rely on CSS to set them initially. For this parallax, we adjust from initial.
    // heroMockupMain.style.transform = `translateX(${initialMainX}px) translateY(${initialMainY}px) rotate(${initialMainRot}deg)`;
    // heroMockupSecondary.style.transform = `translateX(${initialSecondaryX}px) translateY(${initialSecondaryY}px) rotate(${initialSecondaryRot}deg)`;

    window.addEventListener(
      "scroll",
      () => {
        const scrollPosition = window.pageYOffset;
        const heroRect = heroSection.getBoundingClientRect();

        if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
          // Parallax factors - smaller values for more subtle effect
          const mainMoveFactor = 0.015;
          const secondaryMoveFactor = 0.025;

          // Calculate Y movement based on scroll position
          // This creates an effect where images move slightly against the scroll direction
          const mainMoveY = scrollPosition * mainMoveFactor;
          const secondaryMoveY = scrollPosition * secondaryMoveFactor;

          // Apply transform relative to their initial positions
          // Only the Y translation is affected by parallax in this example
          heroMockupMain.style.transform = `translateX(${initialMainX}px) translateY(${
            initialMainY + mainMoveY
          }px) rotate(${initialMainRot}deg)`;
          heroMockupSecondary.style.transform = `translateX(${initialSecondaryX}px) translateY(${
            initialSecondaryY + secondaryMoveY
          }px) rotate(${initialSecondaryRot}deg)`;
        } else if (heroRect.top >= window.innerHeight || heroRect.bottom <= 0) {
          // Reset to initial CSS-defined positions if section is not in view
          // This ensures the images are correctly positioned when scrolling back into view.
          heroMockupMain.style.transform = `translateX(${initialMainX}px) translateY(${initialMainY}px) rotate(${initialMainRot}deg)`;
          heroMockupSecondary.style.transform = `translateX(${initialSecondaryX}px) translateY(${initialSecondaryY}px) rotate(${initialSecondaryRot}deg)`;
        }
      },
      { passive: true }
    ); // Use passive listener for better scroll performance
  }

  // --- Optional: Shrink header on scroll ---
  const header = document.querySelector("header");
  if (header) {
    const initialPaddingTop = parseFloat(
      window.getComputedStyle(header).paddingTop
    );
    const initialPaddingBottom = parseFloat(
      window.getComputedStyle(header).paddingBottom
    );
    const shrinkPaddingTop = 10; // Target padding in px
    const shrinkPaddingBottom = 10; // Target padding in px

    window.addEventListener(
      "scroll",
      () => {
        if (window.pageYOffset > 50) {
          header.style.paddingTop = `${shrinkPaddingTop}px`;
          header.style.paddingBottom = `${shrinkPaddingBottom}px`;
        } else {
          header.style.paddingTop = `${initialPaddingTop}px`;
          header.style.paddingBottom = `${initialPaddingBottom}px`;
        }
      },
      { passive: true }
    );
  }
});
