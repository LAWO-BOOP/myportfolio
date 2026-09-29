// ==========================================
// OIA PORTFOLIO — INTERACTION ENGINE
// Original portfolio structure + richer motion
// Smooth responsive text + percentage animations
// ==========================================

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

const finePointerQuery = window.matchMedia(
  "(hover: hover) and (pointer: fine)"
);

function hasFinePointer() {
  return finePointerQuery.matches;
}

function isTouchDevice() {
  return !hasFinePointer();
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


// ==========================================
// MOBILE NAVIGATION
// ==========================================

const menuButton = document.getElementById(
  "mobile-menu-button"
);

const mobileMenu = document.getElementById(
  "mobile-menu"
);

const openIcon = document.getElementById(
  "menu-open-icon"
);

const closeIcon = document.getElementById(
  "menu-close-icon"
);

const mobileLinks = document.querySelectorAll(
  ".mobile-nav-link"
);


function openMobileMenu() {

  if (!menuButton || !mobileMenu) {
    return;
  }


  mobileMenu.classList.remove("hidden");


  requestAnimationFrame(() => {

    mobileMenu.classList.remove(
      "opacity-0",
      "-translate-y-3",
      "pointer-events-none"
    );

    mobileMenu.classList.add(
      "opacity-100",
      "translate-y-0",
      "pointer-events-auto",
      "transition-all",
      "duration-300",
      "ease-out"
    );

  });


  mobileLinks.forEach((link, index) => {

    link.style.transitionDelay =
      `${80 + index * 45}ms`;

    link.classList.remove(
      "opacity-0",
      "translate-y-2"
    );

    link.classList.add(
      "opacity-100",
      "translate-y-0",
      "transition-all",
      "duration-300"
    );

  });


  openIcon?.classList.add("hidden");

  closeIcon?.classList.remove("hidden");


  menuButton.setAttribute(
    "aria-expanded",
    "true"
  );

  menuButton.setAttribute(
    "aria-label",
    "Close navigation menu"
  );

}


function closeMobileMenu() {

  if (!menuButton || !mobileMenu) {
    return;
  }


  mobileLinks.forEach((link) => {

    link.style.transitionDelay = "0ms";

    link.classList.remove(
      "opacity-100",
      "translate-y-0"
    );

    link.classList.add(
      "opacity-0",
      "translate-y-2"
    );

  });


  mobileMenu.classList.remove(
    "opacity-100",
    "translate-y-0",
    "pointer-events-auto"
  );

  mobileMenu.classList.add(
    "opacity-0",
    "-translate-y-3",
    "pointer-events-none"
  );


  openIcon?.classList.remove("hidden");

  closeIcon?.classList.add("hidden");


  menuButton.setAttribute(
    "aria-expanded",
    "false"
  );

  menuButton.setAttribute(
    "aria-label",
    "Open navigation menu"
  );


  window.setTimeout(() => {

    if (
      menuButton.getAttribute(
        "aria-expanded"
      ) === "false"
    ) {

      mobileMenu.classList.add(
        "hidden"
      );

    }

  }, 320);

}


if (menuButton) {

  menuButton.addEventListener(
    "click",
    () => {

      const isOpen =
        menuButton.getAttribute(
          "aria-expanded"
        ) === "true";


      isOpen
        ? closeMobileMenu()
        : openMobileMenu();

    }
  );

}


mobileLinks.forEach((link) => {

  link.addEventListener(
    "click",
    () => {

      if (
        isTouchDevice() &&
        !prefersReducedMotion.matches
      ) {

        link.classList.add(
          "bg-[#0D1320]",
          "text-white",
          "scale-[0.98]"
        );


        window.setTimeout(() => {

          link.classList.remove(
            "bg-[#0D1320]",
            "text-white",
            "scale-[0.98]"
          );

        }, 280);

      }


      closeMobileMenu();

    }
  );

});


document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      menuButton?.getAttribute(
        "aria-expanded"
      ) === "true"
    ) {

      closeMobileMenu();

      menuButton.focus();

    }

  }
);


prefersReducedMotion.addEventListener?.(
  "change",
  () => {

    if (
      prefersReducedMotion.matches
    ) {

      closeMobileMenu();

    }

  }
);


// ==========================================
// HERO TYPEWRITER
// Smooth desktop + responsive animation
// ==========================================

const heroTitle =
  document.getElementById(
    "hero-title"
  );


const heroDescription =
  document.getElementById(
    "hero-description"
  );


const heroDescriptionText =
  "I'm Oluwaseun Isinkalu-Ajayi, a developer learning modern web development and turning ideas into useful digital products.";


function isMobileScreen() {

  return window.innerWidth < 768;

}


function getTypingSpeed(
  character,
  type
) {

  const mobile =
    isMobileScreen();


  // ------------------------------------------
  // HERO TITLE
  // ------------------------------------------

  if (type === "title") {

    if (character === " ") {

      return mobile
        ? 18
        : 25;

    }


    if (character === ".") {

      return mobile
        ? 90
        : 220;

    }


    return mobile
      ? 38
      : 55;

  }


  // ------------------------------------------
  // HERO DESCRIPTION
  // ------------------------------------------

  if (character === ",") {

    return mobile
      ? 55
      : 90;

  }


  if (character === ".") {

    return mobile
      ? 80
      : 130;

  }


  return mobile
    ? 12
    : 22;

}


async function typeHeroTitle() {

  if (!heroTitle) {
    return;
  }


  if (
    prefersReducedMotion.matches
  ) {

    heroTitle.innerHTML = `
      Building
      <span class="inline-block bg-gradient-to-r from-[#7C5CFC] via-[#9B82FF] to-[#42D9C8] bg-clip-text pb-2 text-transparent">
        ideas
      </span>
      into reality.
    `;

    return;

  }


  heroTitle.textContent = "";


  const normalPartOne =
    document.createTextNode("");


  const gradientPart =
    document.createElement("span");


  const normalPartTwo =
    document.createTextNode("");


  gradientPart.className =
    "inline-block bg-gradient-to-r from-[#7C5CFC] via-[#9B82FF] to-[#42D9C8] bg-clip-text pb-2 text-transparent";


  heroTitle.append(
    normalPartOne,
    gradientPart,
    normalPartTwo
  );


  // ------------------------------------------
  // BUILDING
  // ------------------------------------------

  for (
    const character of
    "Building "
  ) {

    normalPartOne.textContent +=
      character;


    await wait(
      getTypingSpeed(
        character,
        "title"
      )
    );

  }


  // ------------------------------------------
  // IDEAS
  // ------------------------------------------

  for (
    const character of
    "ideas"
  ) {

    gradientPart.textContent +=
      character;


    await wait(
      isMobileScreen()
        ? 42
        : 60
    );

  }


  // ------------------------------------------
  // INTO REALITY
  // ------------------------------------------

  for (
    const character of
    " into reality."
  ) {

    normalPartTwo.textContent +=
      character;


    await wait(
      getTypingSpeed(
        character,
        "title"
      )
    );

  }

}


async function typeHeroDescription() {

  if (!heroDescription) {
    return;
  }


  if (
    prefersReducedMotion.matches
  ) {

    heroDescription.textContent =
      heroDescriptionText;

    return;

  }


  heroDescription.textContent = "";


  for (
    const character
    of heroDescriptionText
  ) {

    heroDescription.textContent +=
      character;


    await wait(
      getTypingSpeed(
        character,
        "description"
      )
    );

  }

}


async function startHeroTyping() {

  await wait(
    isMobileScreen()
      ? 250
      : 450
  );


  await typeHeroTitle();


  await wait(
    isMobileScreen()
      ? 120
      : 250
  );


  await typeHeroDescription();


  startHeroShimmer();

}


startHeroTyping();


// ==========================================
// HERO GRADIENT SHIMMER
// ==========================================

function startHeroShimmer() {

  if (
    !heroTitle ||
    prefersReducedMotion.matches
  ) {

    return;

  }


  const gradientText =
    heroTitle.querySelector(
      "span"
    );


  if (!gradientText) {
    return;
  }


  gradientText.classList.add(
    "[background-size:200%_100%]"
  );


  let position = 0;

  let direction = 1;

  let lastFrame = 0;


  function animate(time) {

    if (
      prefersReducedMotion.matches
    ) {

      return;

    }


    if (
      time - lastFrame < 32
    ) {

      requestAnimationFrame(
        animate
      );

      return;

    }


    lastFrame =
      time;


    position +=
      direction *
      0.22;


    if (
      position >= 100
    ) {

      position = 100;

      direction = -1;

    }


    if (
      position <= 0
    ) {

      position = 0;

      direction = 1;

    }


    gradientText.style.backgroundPosition =
      `${position}% 50%`;


    requestAnimationFrame(
      animate
    );

  }


  requestAnimationFrame(
    animate
  );

}


// ==========================================
// SCROLL REVEAL
// ==========================================

const revealElements =
  document.querySelectorAll(
    "[data-reveal]"
  );


const revealObserver =
  new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(
        (entry) => {

          if (
            !entry.isIntersecting
          ) {

            return;

          }


          const element =
            entry.target;


          const parent =
            element.parentElement;


          const siblings =
            parent
              ? [
                  ...parent.querySelectorAll(
                    ":scope > [data-reveal]"
                  )
                ]
              : [];


          const index =
            Math.max(
              siblings.indexOf(
                element
              ),
              0
            );


          const delay =
            prefersReducedMotion.matches
              ? 0
              : Math.min(
                  index * 70,
                  280
                );


          element.style.transitionDelay =
            `${delay}ms`;


          element.classList.remove(
            "opacity-0",
            "translate-y-10",
            "translate-y-8",
            "translate-y-6",
            "translate-x-8",
            "-translate-x-8"
          );


          element.classList.add(
            "opacity-100",
            "translate-y-0",
            "translate-x-0"
          );


          animateRevealDetails(
            element
          );


          window.setTimeout(
            () => {

              element.style.transitionDelay =
                "";

            },
            delay + 1100
          );


          observer.unobserve(
            element
          );

        }
      );

    },
    {
      threshold: 0.12,

      rootMargin:
        "0px 0px -50px 0px"
    }
  );


revealElements.forEach(
  (element) => {

    revealObserver.observe(
      element
    );

  }
);


function animateRevealDetails(
  element
) {

  if (
    prefersReducedMotion.matches
  ) {

    return;

  }


  element
    .querySelectorAll("img:not(#profile-photo)")
    .forEach(
      (image) => {

        image.classList.add(
          "scale-[1.01]"
        );


        window.setTimeout(
          () => {

            image.classList.remove(
              "scale-[1.01]"
            );

          },
          700
        );

      }
    );

}

// ==========================================
// PROGRESS BARS + SMOOTH COUNT ANIMATION
// ==========================================

const progressBars =
  document.querySelectorAll(
    "[data-progress]"
  );


const progressObserver =
  new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(
        (entry) => {

          if (
            !entry.isIntersecting
          ) {

            return;

          }


          const bar =
            entry.target;


          const width =
            Number(
              bar.dataset.width ||
              0
            );


          if (width) {

            requestAnimationFrame(
              () => {

                bar.style.width =
                  `${width}%`;

              }
            );

          }


          animateProgressLabel(
            bar,
            width
          );


          observer.unobserve(
            bar
          );

        }
      );

    },
    {
      threshold: 0.35
    }
  );


progressBars.forEach(
  (bar) => {

    progressObserver.observe(
      bar
    );

  }
);


function animateProgressLabel(
  bar,
  target
) {

  if (!target) {
    return;
  }


  const card =
    bar.closest(
      "[data-tilt]"
    ) ||
    bar.parentElement?.parentElement;


  let label =
    card?.querySelector(
      `[data-progress-label="${target}"]`
    );


  if (!label) {

    label =
      card?.querySelector(
        "p.mt-2.text-xs.text-gray-600"
      );

  }


  if (
    !label ||
    prefersReducedMotion.matches
  ) {

    return;

  }


  label.textContent =
    "0%";


  const start =
    performance.now();


  const duration =
    1400;


  function easeOutCubic(t) {

    return 1 -
      Math.pow(
        1 - t,
        3
      );

  }


  function tick(now) {

    const elapsed =
      now - start;


    const progress =
      Math.min(
        elapsed / duration,
        1
      );


    const easedProgress =
      easeOutCubic(
        progress
      );


    const value =
      Math.round(
        target *
        easedProgress
      );


    label.textContent =
      `${value}%`;


    if (
      progress < 1
    ) {

      requestAnimationFrame(
        tick
      );

    } else {

      label.textContent =
        `${target}%`;

    }

  }


  requestAnimationFrame(
    tick
  );

}


// ==========================================
// NAVBAR
// ==========================================

const navbar =
  document.querySelector(
    "header"
  );


const navInner =
  navbar?.querySelector(
    "nav"
  );


const desktopNav =
  document.getElementById(
    "desktop-nav"
  );


const navContainer =
  desktopNav?.querySelector(
    ".relative"
  );


const navIndicator =
  document.getElementById(
    "nav-indicator"
  );


const navLinks =
  document.querySelectorAll(
    "[data-nav-link]"
  );


const sectionIds = [
  "about",
  "projects",
  "skills",
  "journey",
  "contact"
];


const sections =
  sectionIds
    .map(
      (id) =>
        document.getElementById(
          id
        )
    )
    .filter(Boolean);


let currentActiveSection =
  "";


function moveNavIndicator(
  link
) {

  if (
    !navContainer ||
    !navIndicator ||
    !link
  ) {

    return;

  }


  const containerRect =
    navContainer.getBoundingClientRect();


  const linkRect =
    link.getBoundingClientRect();


  const left =
    linkRect.left -
    containerRect.left;


  navIndicator.style.width =
    `${linkRect.width}px`;


  navIndicator.style.transform =
    `translate3d(${left}px,0,0)`;


  navIndicator.classList.remove(
    "opacity-0"
  );


  navIndicator.classList.add(
    "opacity-100"
  );

}


function setActiveNav(
  sectionId
) {

  if (
    currentActiveSection ===
    sectionId
  ) {

    return;

  }


  currentActiveSection =
    sectionId;


  navLinks.forEach(
    (link) => {

      const isActive =
        link.dataset.navLink ===
        sectionId;


      link.classList.toggle(
        "text-white",
        isActive
      );


      link.classList.toggle(
        "font-semibold",
        isActive
      );


      link.classList.toggle(
        "text-gray-400",
        !isActive
      );


      link.setAttribute(
        "aria-current",
        isActive
          ? "page"
          : "false"
      );

    }
  );


  moveNavIndicator(
    document.querySelector(
      `[data-nav-link="${sectionId}"]`
    )
  );

}


function clearActiveNav() {

  currentActiveSection =
    "";


  navLinks.forEach(
    (link) => {

      link.classList.remove(
        "text-white",
        "font-semibold"
      );


      link.classList.add(
        "text-gray-400"
      );


      link.setAttribute(
        "aria-current",
        "false"
      );

    }
  );


  navIndicator?.classList.remove(
    "opacity-100"
  );


  navIndicator?.classList.add(
    "opacity-0"
  );

}


function updateActiveSection() {

  if (
    !sections.length
  ) {

    return;

  }


  const navbarHeight =
    navbar?.getBoundingClientRect()
      .height ||
    0;


  const activationY =
    navbarHeight +
    80;


  let activeSection =
    null;


  for (
    const section of
    sections
  ) {

    const rect =
      section.getBoundingClientRect();


    if (
      rect.top <=
        activationY &&
      rect.bottom >
        activationY
    ) {

      activeSection =
        section;


      break;

    }

  }


  if (
    window.scrollY < 100 &&
    !activeSection
  ) {

    clearActiveNav();

    return;

  }


  if (
    activeSection
  ) {

    setActiveNav(
      activeSection.id
    );

  }

}


function updateNavbar() {

  if (!navbar) {
    return;
  }


  const scrolled =
    window.scrollY >
    50;


  navbar.classList.toggle(
    "bg-[#080B14]/95",
    scrolled
  );


  navbar.classList.toggle(
    "bg-[#080B14]/85",
    !scrolled
  );


  navbar.classList.toggle(
    "shadow-[0_10px_40px_rgba(0,0,0,0.25)]",
    scrolled
  );


  if (
    navInner
  ) {

    navInner.classList.toggle(
      "py-3",
      scrolled
    );


    navInner.classList.toggle(
      "py-4",
      !scrolled
    );

  }

}


navLinks.forEach(
  (link) => {

    link.addEventListener(
      "mouseenter",
      () => {

        if (
          hasFinePointer()
        ) {

          moveNavIndicator(
            link
          );

        }

      }
    );


    link.addEventListener(
      "mouseleave",
      () => {

        if (
          !hasFinePointer()
        ) {

          return;

        }


        const activeLink =
          document.querySelector(
            `[data-nav-link="${currentActiveSection}"]`
          );


        if (
          activeLink
        ) {

          moveNavIndicator(
            activeLink
          );

        }

      }
    );


    link.addEventListener(
      "click",
      (event) => {

        const targetId =
          link.dataset.navLink;


        const target =
          document.getElementById(
            targetId
          );


        if (!target) {
          return;
        }


        event.preventDefault();


        const navbarHeight =
          navbar?.getBoundingClientRect()
            .height ||
          0;


        const targetTop =
          target.getBoundingClientRect()
            .top +
          window.scrollY -
          navbarHeight -
          20;


        setActiveNav(
          targetId
        );


        window.scrollTo({

          top:
            Math.max(
              targetTop,
              0
            ),

          behavior:
            prefersReducedMotion.matches
              ? "auto"
              : "smooth"

        });

      }
    );

  }
);


// ==========================================
// GLOBAL SCROLL PROGRESS
// Directly underneath the OIA navbar
// ==========================================

const scrollProgress =
  document.createElement(
    "div"
  );


scrollProgress.className =
  "pointer-events-none fixed left-0 right-0 z-[9998] h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#7C5CFC] via-[#9B82FF] to-[#42D9C8]";


scrollProgress.setAttribute(
  "aria-hidden",
  "true"
);


if (navbar) {

  navbar.appendChild(
    scrollProgress
  );

} else {

  document.body.appendChild(
    scrollProgress
  );

}


function updateScrollProgressPosition() {

  if (
    !navbar ||
    !navInner
  ) {

    return;

  }


  const navHeight =
    navInner.getBoundingClientRect()
      .height;


  scrollProgress.style.top =
    `${navHeight}px`;

}


function updateScrollProgress() {

  const pageHeight =
    document.documentElement
      .scrollHeight -
    window.innerHeight;


  updateScrollProgressPosition();


  if (
    pageHeight <= 0
  ) {

    return;

  }


  const progress =
    Math.min(
      Math.max(
        window.scrollY /
          pageHeight,
        0
      ),
      1
    );


  scrollProgress.style.transform =
    `scaleX(${progress})`;

}


// ==========================================
// DESKTOP CURSOR GLOW + CURSOR DOT
// ==========================================

const mouseGlow =
  document.createElement(
    "div"
  );


mouseGlow.className =
  "pointer-events-none fixed left-0 top-0 z-[9999] hidden h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C5CFC]/10 blur-3xl lg:block";


mouseGlow.setAttribute(
  "aria-hidden",
  "true"
);


mouseGlow.style.opacity =
  "0";


document.body.appendChild(
  mouseGlow
);


const mouseDot =
  document.createElement(
    "div"
  );


mouseDot.className =
  "pointer-events-none fixed left-0 top-0 z-[10000] hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#42D9C8]/80 bg-[#080B14]/40 shadow-[0_0_16px_rgba(66,217,200,0.65)] lg:block";


mouseDot.setAttribute(
  "aria-hidden",
  "true"
);


mouseDot.style.opacity =
  "0";


document.body.appendChild(
  mouseDot
);


let mouseX =
  window.innerWidth /
  2;


let mouseY =
  window.innerHeight /
  2;


let glowX =
  mouseX;


let glowY =
  mouseY;


let dotX =
  mouseX;


let dotY =
  mouseY;


let glowAnimationFrame =
  0;


function animateCursor() {

  glowAnimationFrame =
    0;


  if (
    prefersReducedMotion.matches ||
    !hasFinePointer()
  ) {

    mouseGlow.style.opacity =
      "0";


    mouseDot.style.opacity =
      "0";


    return;

  }


  glowX +=
    (
      mouseX -
      glowX
    ) *
    0.08;


  glowY +=
    (
      mouseY -
      glowY
    ) *
    0.08;


  dotX +=
    (
      mouseX -
      dotX
    ) *
    0.22;


  dotY +=
    (
      mouseY -
      dotY
    ) *
    0.22;


  mouseGlow.style.opacity =
    "1";


  mouseDot.style.opacity =
    "1";


  mouseGlow.style.transform =
    `translate3d(${glowX}px,${glowY}px,0) translate(-50%,-50%)`;


  mouseDot.style.transform =
    `translate3d(${dotX}px,${dotY}px,0) translate(-50%,-50%)`;


  glowAnimationFrame =
    requestAnimationFrame(
      animateCursor
    );

}


document.addEventListener(
  "mousemove",
  (event) => {

    if (
      prefersReducedMotion.matches ||
      !hasFinePointer()
    ) {

      return;

    }


    mouseX =
      event.clientX;


    mouseY =
      event.clientY;


    if (
      !glowAnimationFrame
    ) {

      glowAnimationFrame =
        requestAnimationFrame(
          animateCursor
        );

    }

  }
);


// ==========================================
// BACKGROUND PARALLAX
// ==========================================

const backgroundGlows =
  document.querySelectorAll(
    "[data-parallax-glow]"
  );


let parallaxFrame =
  0;


let parallaxX =
  0;


let parallaxY =
  0;


function updateBackgroundParallax() {

  parallaxFrame =
    0;


  if (
    prefersReducedMotion.matches ||
    !hasFinePointer()
  ) {

    return;

  }


  backgroundGlows.forEach(
    (glow, index) => {

      const strength =
        Number(
          glow.dataset.parallaxGlow
        ) ||
        20;


      const direction =
        index % 2 === 0
          ? 1
          : -1;


      glow.style.transform =
        `translate3d(${parallaxX * strength * direction}px,${parallaxY * strength}px,0)`;

    }
  );

}


document.addEventListener(
  "mousemove",
  (event) => {

    if (
      prefersReducedMotion.matches ||
      !hasFinePointer()
    ) {

      return;

    }


    parallaxX =
      (
        event.clientX /
        window.innerWidth -
        0.5
      ) *
      2;


    parallaxY =
      (
        event.clientY /
        window.innerHeight -
        0.5
      ) *
      2;


    if (
      !parallaxFrame
    ) {

      parallaxFrame =
        requestAnimationFrame(
          updateBackgroundParallax
        );

    }

  }
);


// ==========================================
// MAGNETIC BUTTONS
// ==========================================

const magneticElements =
  document.querySelectorAll(
    "[data-magnetic]"
  );


const magneticState =
  new WeakMap();


magneticElements.forEach(
  (element) => {

    magneticState.set(
      element,
      {
        frame: 0,
        x: 0,
        y: 0
      }
    );


    element.addEventListener(
      "pointermove",
      (event) => {

        if (
          prefersReducedMotion.matches ||
          !hasFinePointer()
        ) {

          return;

        }


        const rect =
          element.getBoundingClientRect();


        const state =
          magneticState.get(
            element
          );


        state.x =
          (
            event.clientX -
            rect.left -
            rect.width /
              2
          ) *
          0.12;


        state.y =
          (
            event.clientY -
            rect.top -
            rect.height /
              2
          ) *
          0.12;


        if (
          state.frame
        ) {

          return;

        }


        state.frame =
          requestAnimationFrame(
            () => {

              state.frame =
                0;


              element.style.transform =
                `translate3d(${state.x}px,${state.y}px,0) scale(1.04)`;


              element.style.boxShadow =
                "0 12px 35px rgba(124,92,252,0.18)";

            }
          );

      }
    );


    element.addEventListener(
      "pointerleave",
      () => {

        const state =
          magneticState.get(
            element
          );


        if (
          state?.frame
        ) {

          cancelAnimationFrame(
            state.frame
          );


          state.frame =
            0;

        }


        element.style.transform =
          "";


        element.style.boxShadow =
          "";

      }
    );


    element.addEventListener(
      "pointerdown",
      () => {

        if (
          isTouchDevice() &&
          !prefersReducedMotion.matches
        ) {

          element.classList.add(
            "scale-[0.97]"
          );

        }

      }
    );


    [
      "pointerup",
      "pointercancel",
      "pointerleave"
    ].forEach(
      (eventName) => {

        element.addEventListener(
          eventName,
          () => {

            element.classList.remove(
              "scale-[0.97]"
            );

          }
        );

      }
    );

  }
);


// ==========================================
// 3D TILT + SHINE
// ==========================================

const tiltCards =
  document.querySelectorAll(
    "[data-tilt]"
  );


const tiltEnabledCards =
  [...tiltCards].filter(
    (card) =>
      !card.querySelector(
        ".overflow-y-auto"
      )
  );


const tiltState =
  new WeakMap();


function applyCardShine(
  card,
  x,
  y
) {

  card.style.backgroundImage =
    `radial-gradient(circle at ${x}% ${y}%, rgba(124,92,252,0.10), transparent 35%)`;

}


tiltEnabledCards.forEach(
  (card) => {

    tiltState.set(
      card,
      {
        frame: 0,
        rotateX: 0,
        rotateY: 0,
        x: 50,
        y: 50
      }
    );


    card.style.willChange =
      "transform";


    card.addEventListener(
      "pointermove",
      (event) => {

        if (
          prefersReducedMotion.matches ||
          !hasFinePointer()
        ) {

          return;

        }


        const rect =
          card.getBoundingClientRect();


        const state =
          tiltState.get(
            card
          );


        const x =
          event.clientX -
          rect.left;


        const y =
          event.clientY -
          rect.top;


        const centerX =
          rect.width /
          2;


        const centerY =
          rect.height /
          2;


        state.rotateY =
          (
            (
              x -
              centerX
            ) /
            centerX
          ) *
          4;


        state.rotateX =
          (
            (
              centerY -
              y
            ) /
            centerY
          ) *
          4;


        state.x =
          (
            x /
            rect.width
          ) *
          100;


        state.y =
          (
            y /
            rect.height
          ) *
          100;


        applyCardShine(
          card,
          state.x,
          state.y
        );


        if (
          state.frame
        ) {

          return;

        }


        state.frame =
          requestAnimationFrame(
            () => {

              state.frame =
                0;


              card.classList.add(
                "transition-none"
              );


              card.style.transform =
                `perspective(1100px) rotateX(${state.rotateX}deg) rotateY(${state.rotateY}deg) translate3d(0,-6px,0) scale(1.008)`;


              card.style.boxShadow =
                "0 25px 70px rgba(0,0,0,0.28)";

            }
          );

      }
    );


    card.addEventListener(
      "pointerleave",
      () => {

        const state =
          tiltState.get(
            card
          );


        if (
          state?.frame
        ) {

          cancelAnimationFrame(
            state.frame
          );


          state.frame =
            0;

        }


        card.classList.remove(
          "transition-none"
        );


        card.style.transform =
          "";


        card.style.boxShadow =
          "";


        card.style.backgroundImage =
          "";

      }
    );


    card.addEventListener(
      "pointerdown",
      () => {

        if (
          isTouchDevice() &&
          !prefersReducedMotion.matches
        ) {

          card.classList.add(
            "scale-[0.985]",
            "border-[#7C5CFC]/40"
          );

        }

      }
    );


    [
      "pointerup",
      "pointercancel",
      "pointerleave"
    ].forEach(
      (eventName) => {

        card.addEventListener(
          eventName,
          () => {

            card.classList.remove(
              "scale-[0.985]",
              "border-[#7C5CFC]/40"
            );

          }
        );

      }
    );

  }
);


// ==========================================
// PROJECT IMAGE PARALLAX
// ==========================================

const projectImages =
  document.querySelectorAll(
    "#projects article img"
  );


projectImages.forEach(
  (image) => {

    image.style.willChange =
      "transform";


    image.addEventListener(
      "pointermove",
      (event) => {

        if (
          prefersReducedMotion.matches ||
          !hasFinePointer()
        ) {

          return;

        }


        const rect =
          image.getBoundingClientRect();


        const x =
          (
            event.clientX -
            rect.left
          ) /
            rect.width -
          0.5;


        const y =
          (
            event.clientY -
            rect.top
          ) /
            rect.height -
          0.5;


        image.style.transform =
          `scale(1.06) translate3d(${x * -8}px,${y * -8}px,0)`;

      }
    );


    image.addEventListener(
      "pointerleave",
      () => {

        image.style.transform =
          "";

      }
    );

  }
);


// ==========================================
// CURSOR CARD GLOW
// ==========================================

const interactiveCards =
  document.querySelectorAll(
    "[data-cursor-glow]"
  );


interactiveCards.forEach(
  (card) => {

    card.style.backgroundImage =
      "radial-gradient(circle at 50% 50%, rgba(124,92,252,0.04), transparent 42%)";


    card.addEventListener(
      "pointermove",
      (event) => {

        if (
          prefersReducedMotion.matches ||
          !hasFinePointer()
        ) {

          return;

        }


        const rect =
          card.getBoundingClientRect();


        const x =
          (
            (
              event.clientX -
              rect.left
            ) /
            rect.width
          ) *
          100;


        const y =
          (
            (
              event.clientY -
              rect.top
            ) /
            rect.height
          ) *
          100;


        card.style.backgroundImage =
          `radial-gradient(circle at ${x}% ${y}%, rgba(124,92,252,0.12), transparent 40%)`;

      }
    );


    card.addEventListener(
      "pointerleave",
      () => {

        card.style.backgroundImage =
          "";

      }
    );

  }
);


// ==========================================
// MOBILE SCROLL INTERACTION
// ==========================================

const mobileRevealCards =
  document.querySelectorAll(
    "[data-reveal]"
  );


const mobileCardObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach(
        (entry) => {

          if (
            !entry.isIntersecting ||
            !isTouchDevice() ||
            prefersReducedMotion.matches
          ) {

            return;

          }


          const element =
            entry.target;


          element.classList.add(
            "scale-[1.01]",
            "border-[#7C5CFC]/25"
          );


          window.setTimeout(
            () => {

              element.classList.remove(
                "scale-[1.01]"
              );

            },
            450
          );

        }
      );

    },
    {
      threshold: 0.60
    }
  );


mobileRevealCards.forEach(
  (element) => {

    mobileCardObserver.observe(
      element
    );

  }
);


// ==========================================
// MOBILE SCROLL PARALLAX
// ==========================================

function updateMobileParallax() {

  if (
    !isTouchDevice() ||
    prefersReducedMotion.matches
  ) {

    return;

  }


  const viewportCenter =
    window.innerHeight /
    2;


  backgroundGlows.forEach(
    (glow, index) => {

      const rect =
        glow.getBoundingClientRect();


      const distance =
        rect.top +
        rect.height /
          2 -
        viewportCenter;


      const offset =
        Math.max(
          -28,
          Math.min(
            28,
            distance *
              -0.035
          )
        );


      const direction =
        index % 2 === 0
          ? 1
          : -1;


      glow.style.transform =
        `translate3d(${offset * direction}px,${offset}px,0)`;

    }
  );

}


// ==========================================
// TOUCH START
// ==========================================

document.addEventListener(
  "touchstart",
  () => {

    if (
      !isTouchDevice() ||
      prefersReducedMotion.matches
    ) {

      return;

    }


    document.body.classList.add(
      "select-none"
    );

  },
  {
    passive: true
  }
);


document.addEventListener(
  "touchend",
  () => {

    document.body.classList.remove(
      "select-none"
    );

  },
  {
    passive: true
  }
);


// ==========================================
// SCROLL PERFORMANCE
// ==========================================

let scrollTicking =
  false;


window.addEventListener(
  "scroll",
  () => {

    if (
      scrollTicking
    ) {

      return;

    }


    scrollTicking =
      true;


    requestAnimationFrame(
      () => {

        updateActiveSection();

        updateNavbar();

        updateScrollProgress();


        if (
          isTouchDevice()
        ) {

          updateMobileParallax();

        }


        scrollTicking =
          false;

      }
    );

  },
  {
    passive: true
  }
);


// ==========================================
// RESPONSIVE CLEANUP
// ==========================================

function cleanResponsiveState() {

  if (
    hasFinePointer()
  ) {

    return;

  }


  mouseGlow.style.opacity =
    "0";


  mouseDot.style.opacity =
    "0";


  backgroundGlows.forEach(
    (glow) => {

      glow.style.transform =
        "";

    }
  );


  magneticElements.forEach(
    (element) => {

      const state =
        magneticState.get(
          element
        );


      if (
        state?.frame
      ) {

        cancelAnimationFrame(
          state.frame
        );


        state.frame =
          0;

      }


      element.style.transform =
        "";


      element.style.boxShadow =
        "";

    }
  );


  tiltEnabledCards.forEach(
    (card) => {

      const state =
        tiltState.get(
          card
        );


      if (
        state?.frame
      ) {

        cancelAnimationFrame(
          state.frame
        );


        state.frame =
          0;

      }


      card.classList.remove(
        "transition-none"
      );


      card.style.transform =
        "";


      card.style.boxShadow =
        "";


      card.style.backgroundImage =
        "";

    }
  );


  projectImages.forEach(
    (image) => {

      image.style.transform =
        "";

    }
  );


  interactiveCards.forEach(
    (card) => {

      card.style.backgroundImage =
        "";

    }
  );

}


// ==========================================
// REDUCED MOTION FALLBACK
// ==========================================

function applyReducedMotion() {

  if (
    !prefersReducedMotion.matches
  ) {

    return;

  }


  revealElements.forEach(
    (element) => {

      element.classList.remove(
        "opacity-0",
        "translate-y-10",
        "translate-y-8",
        "translate-y-6",
        "translate-x-8",
        "-translate-x-8"
      );


      element.classList.add(
        "opacity-100",
        "translate-y-0",
        "translate-x-0"
      );

    }
  );


  progressBars.forEach(
    (bar) => {

      const width =
        bar.dataset.width;


      if (
        width
      ) {

        bar.style.width =
          `${width}%`;

      }

    }
  );


  scrollProgress.style.transform =
    "scaleX(0)";

}


applyReducedMotion();


prefersReducedMotion.addEventListener?.(
  "change",
  () => {

    applyReducedMotion();


    if (
      prefersReducedMotion.matches
    ) {

      closeMobileMenu();

    }

  }
);


// ==========================================
// RESIZE
// ==========================================

window.addEventListener(
  "resize",
  () => {

    if (
      window.innerWidth >=
      768
    ) {

      closeMobileMenu();

    }


    cleanResponsiveState();


    updateNavbar();


    updateActiveSection();


    updateScrollProgressPosition();

    updateScrollProgress();


    if (
      hasFinePointer()
    ) {

      const activeLink =
        document.querySelector(
          `[data-nav-link="${currentActiveSection}"]`
        );


      if (
        activeLink
      ) {

        moveNavIndicator(
          activeLink
        );

      }

    }

  },
  {
    passive: true
  }
);


// ==========================================
// ORIENTATION CHANGE
// ==========================================

window.addEventListener(
  "orientationchange",
  () => {

    cleanResponsiveState();


    window.setTimeout(
      () => {

        updateMobileParallax();

        updateActiveSection();

        updateScrollProgressPosition();

        updateScrollProgress();

        updateResponsiveSocialColors();

      },
      120
    );

  },
  {
    passive: true
  }
);


// ==========================================
// INITIAL STATE
// ==========================================

updateNavbar();

updateScrollProgressPosition();

updateScrollProgress();


requestAnimationFrame(
  () => {

    updateActiveSection();

    updateScrollProgressPosition();

    updateScrollProgress();


    if (
      isTouchDevice()
    ) {

      updateMobileParallax();

    }

  }
);


// ==========================================
// INTERACTION UPGRADE
// Existing elements only
// ==========================================


// ------------------------------------------
// CURSOR HOVER RESPONSE
// ------------------------------------------

if (
  mouseDot &&
  mouseGlow
) {

  const cursorTargets =
    document.querySelectorAll(
      "a, button, [data-tilt]"
    );


  const cursorCore =
    document.createElement(
      "span"
    );


  cursorCore.setAttribute(
    "aria-hidden",
    "true"
  );


  cursorCore.style.position =
    "absolute";


  cursorCore.style.left =
    "50%";


  cursorCore.style.top =
    "50%";


  cursorCore.style.width =
    "4px";


  cursorCore.style.height =
    "4px";


  cursorCore.style.borderRadius =
    "9999px";


  cursorCore.style.background =
    "#42D9C8";


  cursorCore.style.transform =
    "translate(-50%, -50%) scale(1)";


  cursorCore.style.transition =
    "transform 220ms ease, opacity 220ms ease";


  cursorCore.style.pointerEvents =
    "none";


  mouseDot.style.position =
    "fixed";


  mouseDot.appendChild(
    cursorCore
  );


  cursorTargets.forEach(
    (element) => {

      element.addEventListener(
        "pointerenter",
        () => {

          if (
            prefersReducedMotion.matches ||
            !hasFinePointer()
          ) {

            return;

          }


          cursorCore.style.transform =
            "translate(-50%, -50%) scale(3.2)";


          cursorCore.style.opacity =
            "0.95";


          mouseGlow.style.opacity =
            "1.15";

        }
      );


      element.addEventListener(
        "pointerleave",
        () => {

          cursorCore.style.transform =
            "translate(-50%, -50%) scale(1)";


          cursorCore.style.opacity =
            "1";


          mouseGlow.style.opacity =
            "1";

        }
      );

    }
  );

}


// ------------------------------------------
// SMART CLICK FEEDBACK
// ------------------------------------------

const clickableElements =
  document.querySelectorAll(
    "a, button"
  );


clickableElements.forEach(
  (element) => {

    element.addEventListener(
      "pointerdown",
      () => {

        if (
          prefersReducedMotion.matches
        ) {

          return;

        }


        element.style.filter =
          "brightness(1.12)";


        window.setTimeout(
          () => {

            element.style.filter =
              "";

          },
          160
        );

      }
    );

  }
);


// ------------------------------------------
// PROJECT CARD HOVER DEPTH
// ------------------------------------------

const projectCards =
  document.querySelectorAll(
    "#projects article"
  );


projectCards.forEach(
  (card) => {

    card.addEventListener(
      "pointerenter",
      () => {

        if (
          prefersReducedMotion.matches ||
          !hasFinePointer()
        ) {

          return;

        }


        card.style.zIndex =
          "2";

      }
    );


    card.addEventListener(
      "pointerleave",
      () => {

        card.style.zIndex =
          "";

      }
    );

  }
);


// ------------------------------------------
// IMAGE HOVER DEPTH
// ------------------------------------------

projectImages.forEach(
  (image) => {

    const wrapper =
      image.closest(
        ".overflow-hidden"
      );


    if (!wrapper) {
      return;
    }


    image.addEventListener(
      "pointerenter",
      () => {

        if (
          prefersReducedMotion.matches ||
          !hasFinePointer()
        ) {

          return;

        }


        wrapper.style.boxShadow =
          "0 0 0 1px rgba(124,92,252,0.10), 0 20px 50px rgba(0,0,0,0.20)";

      }
    );


    image.addEventListener(
      "pointerleave",
      () => {

        wrapper.style.boxShadow =
          "";

      }
    );

  }
);


// ------------------------------------------
// SKILL CARD HOVER RESPONSE
// ------------------------------------------

const skillCards =
  document.querySelectorAll(
    "#skills [data-tilt]"
  );


skillCards.forEach(
  (card) => {

    card.addEventListener(
      "pointerenter",
      () => {

        if (
          prefersReducedMotion.matches ||
          !hasFinePointer()
        ) {

          return;

        }


        const progressBar =
          card.querySelector(
            "[data-progress]"
          );


        if (
          progressBar
        ) {

          progressBar.style.filter =
            "brightness(1.25)";

        }

      }
    );


    card.addEventListener(
      "pointerleave",
      () => {

        const progressBar =
          card.querySelector(
            "[data-progress]"
          );


        if (
          progressBar
        ) {

          progressBar.style.filter =
            "";

        }

      }
    );

  }
);


// ------------------------------------------
// NAVIGATION MICRO-INTERACTION
// ------------------------------------------

navLinks.forEach(
  (link) => {

    link.addEventListener(
      "pointerdown",
      () => {

        if (
          prefersReducedMotion.matches
        ) {

          return;

        }


        link.style.transform =
          "scale(0.96)";

      }
    );


    link.addEventListener(
      "pointerup",
      () => {

        link.style.transform =
          "";

      }
    );


    link.addEventListener(
      "pointercancel",
      () => {

        link.style.transform =
          "";

      }
    );

  }
);


// ------------------------------------------
// SCROLL VELOCITY FEEDBACK
// ------------------------------------------

let previousScrollY =
  window.scrollY;


let scrollVelocity =
  0;


let velocityFrame =
  0;


function updateScrollVelocity() {

  velocityFrame =
    0;


  if (
    prefersReducedMotion.matches
  ) {

    return;

  }


  const currentY =
    window.scrollY;


  scrollVelocity =
    currentY -
    previousScrollY;


  previousScrollY =
    currentY;


  const velocity =
    Math.max(
      -1,
      Math.min(
        1,
        scrollVelocity /
          30
      )
    );


  revealElements.forEach(
    (element) => {

      if (
        !element.classList.contains(
          "opacity-100"
        )
      ) {

        return;

      }


      element.style.setProperty(
        "--scroll-depth",
        `${velocity * 0.35}deg`
      );

    }
  );

}


window.addEventListener(
  "scroll",
  () => {

    if (
      velocityFrame
    ) {

      return;

    }


    velocityFrame =
      requestAnimationFrame(
        updateScrollVelocity
      );

  },
  {
    passive: true
  }
);


// ------------------------------------------
// CLEANUP SCROLL DEPTH
// ------------------------------------------

window.addEventListener(
  "scrollend",
  () => {

    revealElements.forEach(
      (element) => {

        element.style.removeProperty(
          "--scroll-depth"
        );

      }
    );

  },
  {
    passive: true
  }
);


// ------------------------------------------
// EXTRA TOUCH FEEDBACK
// ------------------------------------------

const touchInteractiveElements =
  document.querySelectorAll(
    "#projects article, #skills [data-tilt], #journey [data-tilt]"
  );


touchInteractiveElements.forEach(
  (element) => {

    element.addEventListener(
      "touchstart",
      () => {

        if (
          !isTouchDevice() ||
          prefersReducedMotion.matches
        ) {

          return;

        }


        element.style.transition =
          "transform 180ms ease";


        element.style.transform =
          "scale(0.992)";

      },
      {
        passive: true
      }
    );


    element.addEventListener(
      "touchend",
      () => {

        element.style.transform =
          "";

      },
      {
        passive: true
      }
    );

  }
);


// ==========================================
// RESPONSIVE EXPERIENCE UPGRADE
// Only activated on touch/no-hover devices
// ==========================================

const responsiveMotionStyles =
  document.createElement(
    "style"
  );


responsiveMotionStyles.textContent = `
  @media (hover: none), (pointer: coarse), (max-width: 767px) {

    * {
      -webkit-tap-highlight-color: transparent;
    }

    a,
    button {
      touch-action: manipulation;
    }

    .oia-touch-card {
      transform:
        translate3d(0,-3px,0)
        scale(1.008) !important;

      box-shadow:
        0 18px 48px rgba(0,0,0,0.20) !important;
    }

    .oia-touch-button {
      transform:
        scale(0.965) !important;
    }

    .oia-touch-image {
      transform:
        scale(1.035) !important;
    }

    .oia-touch-icon {
      transform:
        scale(1.10) !important;
    }

    .oia-touch-social {
      transform:
        translate3d(0,-3px,0)
        scale(1.008) !important;

      border-color:
        var(--oia-social-border) !important;

      box-shadow:
        0 14px 38px rgba(0,0,0,0.20) !important;
    }

    .oia-touch-social svg {
      color:
        var(--oia-social-color) !important;
    }

    .oia-touch-social .oia-touch-arrow {
      transform:
        translateX(4px);

      color:
        #ffffff !important;
    }

    .oia-touch-nav {
      transform:
        translateX(4px)
        scale(0.985) !important;
    }

    .oia-touch-ripple {
      position: absolute;
      width: 15px;
      height: 15px;
      border-radius: 9999px;
      pointer-events: none;

      background:
        radial-gradient(
          circle,
          rgba(255,255,255,0.24) 0%,
          rgba(255,255,255,0.08) 38%,
          rgba(255,255,255,0) 74%
        );

      transform:
        translate(-50%,-50%)
        scale(0);

      animation:
        oiaTouchRipple
        650ms
        cubic-bezier(0.22,1,0.36,1)
        forwards;

      z-index: 30;
    }

    @keyframes oiaTouchRipple {

      0% {
        opacity: 0.78;

        transform:
          translate(-50%,-50%)
          scale(0);
      }

      100% {
        opacity: 0;

        transform:
          translate(-50%,-50%)
          scale(15);
      }

    }

    .oia-responsive-attention {
      animation:
        oiaResponsiveAttention
        850ms
        cubic-bezier(0.22,1,0.36,1);
    }

    @keyframes oiaResponsiveAttention {

      0% {
        transform:
          translateY(0)
          scale(1);
      }

      35% {
        transform:
          translateY(-3px)
          scale(1.018);

        box-shadow:
          0 15px 40px rgba(124,92,252,0.18);
      }

      65% {
        transform:
          translateY(-1px)
          scale(1.008);

        box-shadow:
          0 10px 28px rgba(124,92,252,0.10);
      }

      100% {
        transform:
          translateY(0)
          scale(1);

        box-shadow:
          0 0 0 rgba(124,92,252,0);
      }

    }

    .oia-touch-transition {
      transition:
        transform 420ms cubic-bezier(0.22,1,0.36,1),
        box-shadow 420ms ease,
        border-color 320ms ease,
        background-color 320ms ease,
        filter 300ms ease,
        color 300ms ease;
    }

  }
`;


document.head.appendChild(
  responsiveMotionStyles
);


// ==========================================
// RESPONSIVE RIPPLE HELPER
// ==========================================

function createResponsiveRipple(
  element,
  event
) {

  if (
    !isTouchDevice() ||
    prefersReducedMotion.matches ||
    !element
  ) {

    return;

  }


  const rect =
    element.getBoundingClientRect();


  if (
    getComputedStyle(
      element
    ).position ===
    "static"
  ) {

    element.style.position =
      "relative";

  }


  const ripple =
    document.createElement(
      "span"
    );


  ripple.className =
    "oia-touch-ripple";


  ripple.style.left =
    `${event.clientX - rect.left}px`;


  ripple.style.top =
    `${event.clientY - rect.top}px`;


  element.appendChild(
    ripple
  );


  window.setTimeout(
    () => {

      ripple.remove();

    },
    700
  );

}


// ==========================================
// RESPONSIVE CARDS
// ==========================================

const responsiveCards =
  document.querySelectorAll(
    "[data-tilt]"
  );


responsiveCards.forEach(
  (card) => {

    card.classList.add(
      "oia-touch-transition"
    );


    card.addEventListener(
      "pointerdown",
      (event) => {

        if (
          !isTouchDevice() ||
          prefersReducedMotion.matches
        ) {

          return;

        }


        card.classList.add(
          "oia-touch-card"
        );


        createResponsiveRipple(
          card,
          event
        );

      }
    );


    const releaseCard =
      () => {

        if (
          !isTouchDevice()
        ) {

          return;

        }


        window.setTimeout(
          () => {

            card.classList.remove(
              "oia-touch-card"
            );

          },
          220
        );

      };


    card.addEventListener(
      "pointerup",
      releaseCard
    );


    card.addEventListener(
      "pointercancel",
      releaseCard
    );

  }
);


// ==========================================
// RESPONSIVE BUTTONS
// ==========================================

const responsiveButtons =
  document.querySelectorAll(
    "[data-magnetic], .mobile-nav-link"
  );


responsiveButtons.forEach(
  (button) => {

    button.classList.add(
      "oia-touch-transition"
    );


    button.addEventListener(
      "pointerdown",
      (event) => {

        if (
          !isTouchDevice() ||
          prefersReducedMotion.matches
        ) {

          return;

        }


        button.classList.add(
          "oia-touch-button"
        );


        createResponsiveRipple(
          button,
          event
        );

      }
    );


    const releaseButton =
      () => {

        if (
          !isTouchDevice()
        ) {

          return;

        }


        window.setTimeout(
          () => {

            button.classList.remove(
              "oia-touch-button"
            );

          },
          140
        );

      };


    button.addEventListener(
      "pointerup",
      releaseButton
    );


    button.addEventListener(
      "pointercancel",
      releaseButton
    );

  }
);


// ==========================================
// RESPONSIVE PROJECT IMAGE
// ==========================================

projectImages.forEach(
  (image) => {

    image.classList.add(
      "oia-touch-transition"
    );


    image.addEventListener(
      "pointerdown",
      () => {

        if (
          !isTouchDevice() ||
          prefersReducedMotion.matches
        ) {

          return;

        }


        image.classList.add(
          "oia-touch-image"
        );

      }
    );


    const releaseImage =
      () => {

        if (
          !isTouchDevice()
        ) {

          return;

        }


        window.setTimeout(
          () => {

            image.classList.remove(
              "oia-touch-image"
            );

          },
          220
        );

      };


    image.addEventListener(
      "pointerup",
      releaseImage
    );


    image.addEventListener(
      "pointercancel",
      releaseImage
    );

  }
);


// ==========================================
// RESPONSIVE SKILL ICONS
// ==========================================

skillCards.forEach(
  (card) => {

    const icon =
      card.querySelector(
        "svg, img"
      );


    if (!icon) {
      return;
    }


    icon.classList.add(
      "oia-touch-transition"
    );


    card.addEventListener(
      "pointerdown",
      () => {

        if (
          !isTouchDevice() ||
          prefersReducedMotion.matches
        ) {

          return;

        }


        icon.classList.add(
          "oia-touch-icon"
        );


        window.setTimeout(
          () => {

            icon.classList.remove(
              "oia-touch-icon"
            );

          },
          700
        );

      }
    );

  }
);


// ==========================================
// CONTACT + FOOTER SVG COLORS
//
// Desktop/laptop:
// original HTML controls normal/hover.
//
// Phone/tablet:
// true brand/accent color by default.
// ==========================================

const socialColors = {

  "https://github.com/LAWO-BOOP":
    "#F0F6FC",

  "https://www.linkedin.com/in/oluwaseun-isinkalu-ajayi-1a1379427/":
    "#0a66c2",

  "https://www.tiktok.com/@lawo_mania":
    "#FFFFFF",

  "mailto:davidisinkalu@gmail.com":
    "#9B82FF",

  "tel:+2347049262560":
    "#42D9C8"

};


const socialLinks =
  document.querySelectorAll(
    'a[href="https://github.com/LAWO-BOOP"],' +
    'a[href="https://www.linkedin.com/in/oluwaseun-isinkalu-ajayi-1a1379427/"],' +
    'a[href="https://www.tiktok.com/@lawo_mania"],' +
    'a[href="mailto:davidisinkalu@gmail.com"],' +
    'a[href="tel:+2347049262560"]'
  );


function updateResponsiveSocialColors() {

  const touchMode =
    window.matchMedia(
      "(hover: none)"
    ).matches ||
    window.matchMedia(
      "(pointer: coarse)"
    ).matches;


  socialLinks.forEach(
    (link) => {

      const href =
        link.getAttribute(
          "href"
        );


      const color =
        socialColors[href];


      const icon =
        link.querySelector(
          "svg"
        );


      if (
        !icon ||
        !color
      ) {

        return;

      }


      /*
       * LinkedIn only:
       * remove the hard-coded fill
       * so currentColor can control it.
       */

      if (
        href ===
        "https://www.linkedin.com/in/oluwaseun-isinkalu-ajayi-1a1379427/"
      ) {

        icon.setAttribute(
          "fill",
          "currentColor"
        );


        icon
          .querySelectorAll(
            "[fill]"
          )
          .forEach(
            (part) => {

              part.setAttribute(
                "fill",
                "currentColor"
              );

            }
          );

      }


      /*
       * Mail and phone are intentionally
       * NOT changed here.
       *
       * They keep:
       *
       * fill="none"
       * stroke="currentColor"
       *
       * exactly as intended.
       */


      if (
        touchMode
      ) {

        /*
         * Phone/tablet:
         * no hover exists, so show
         * the true color by default.
         */

        icon.style.color =
          color;

      } else {

        /*
         * Laptop/desktop:
         * let the original HTML/Tailwind
         * hover classes control the icon.
         */

        icon.style.color =
          "";

      }

    }
  );

}


updateResponsiveSocialColors();


// ==========================================
// RESPONSIVE SOCIAL INTERACTIONS
// ==========================================

socialLinks.forEach(
  (link) => {

    const href =
      link.getAttribute(
        "href"
      );


    const color =
      socialColors[href];


    const icon =
      link.querySelector(
        "svg"
      );


    if (
      !icon ||
      !color
    ) {

      return;

    }


    link.classList.add(
      "oia-touch-transition"
    );


    const iconWrapper =
      icon.parentElement;


    const arrow =
      [
        ...link.querySelectorAll(
          "span"
        )
      ].find(
        (span) =>
          span.textContent.trim() ===
          "→"
      );


    arrow?.classList.add(
      "oia-touch-arrow"
    );


    link.style.setProperty(
      "--oia-social-color",
      color
    );


    link.style.setProperty(
      "--oia-social-border",
      color
    );


    link.addEventListener(
      "pointerdown",
      (event) => {

        if (
          !isTouchDevice()
        ) {

          return;

        }


        /*
         * True color remains visible.
         */

        icon.style.color =
          color;


        link.classList.add(
          "oia-touch-social"
        );


        iconWrapper?.classList.add(
          "oia-touch-icon"
        );


        createResponsiveRipple(
          link,
          event
        );

      }
    );


    link.addEventListener(
      "pointerup",
      () => {

        if (
          !isTouchDevice()
        ) {

          return;

        }


        window.setTimeout(
          () => {

            link.classList.remove(
              "oia-touch-social"
            );


            iconWrapper?.classList.remove(
              "oia-touch-icon"
            );


            /*
             * Keep true color on
             * phones/tablets.
             */

            icon.style.color =
              color;

          },
          450
        );

      }
    );


    link.addEventListener(
      "pointercancel",
      () => {

        link.classList.remove(
          "oia-touch-social"
        );


        iconWrapper?.classList.remove(
          "oia-touch-icon"
        );


        if (
          isTouchDevice()
        ) {

          icon.style.color =
            color;

        }

      }
    );

  }
);


// ==========================================
// RESPONSIVE COLOR REFRESH
// ==========================================

window.addEventListener(
  "resize",
  () => {

    updateResponsiveSocialColors();

  },
  {
    passive: true
  }
);


// ==========================================
// MOBILE NAV MICRO-INTERACTION
// ==========================================

mobileLinks.forEach(
  (link) => {

    link.classList.add(
      "oia-touch-transition"
    );


    link.addEventListener(
      "pointerdown",
      () => {

        if (
          !isTouchDevice() ||
          prefersReducedMotion.matches
        ) {

          return;

        }


        link.classList.add(
          "oia-touch-nav"
        );

      }
    );


    link.addEventListener(
      "pointerup",
      () => {

        if (
          !isTouchDevice()
        ) {

          return;

        }


        window.setTimeout(
          () => {

            link.classList.remove(
              "oia-touch-nav"
            );

          },
          250
        );

      }
    );


    link.addEventListener(
      "pointercancel",
      () => {

        link.classList.remove(
          "oia-touch-nav"
        );

      }
    );

  }
);


// ==========================================
// HERO CTA RESPONSIVE ATTENTION
// Very subtle one-time emphasis
// ==========================================

if (
  isTouchDevice() &&
  !prefersReducedMotion.matches
) {

  const primaryHeroCTA =
    document.querySelector(
      'main section:first-of-type a[href="#projects"]'
    );


  if (
    primaryHeroCTA
  ) {

    window.setTimeout(
      () => {

        primaryHeroCTA.classList.add(
          "oia-responsive-attention"
        );


        window.setTimeout(
          () => {

            primaryHeroCTA.classList.remove(
              "oia-responsive-attention"
            );

          },
          900
        );

      },
      1900
    );

  }

}


// ==========================================
// RESPONSIVE SECTION HEADING POLISH
// ==========================================

if (
  !prefersReducedMotion.matches
) {

  const sectionHeadings =
    document.querySelectorAll(
      "main section h2"
    );


  const headingObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              !entry.isIntersecting ||
              !isTouchDevice()
            ) {

              return;

            }


            const heading =
              entry.target;


            if (
              heading.dataset
                .responsiveAnimated
            ) {

              return;

            }


            heading.dataset
              .responsiveAnimated =
              "true";


            heading.animate(
              [
                {
                  opacity: 0.88,

                  transform:
                    "translateY(5px)"
                },

                {
                  opacity: 1,

                  transform:
                    "translateY(0)"
                }
              ],
              {
                duration: 650,

                easing:
                  "cubic-bezier(0.22,1,0.36,1)"
              }
            );

          }
        );

      },
      {
        threshold: 0.6
      }
    );


  sectionHeadings.forEach(
    (heading) => {

      headingObserver.observe(
        heading
      );

    }
  );

}


// ==========================================
// RESPONSIVE CONTACT ENTRANCE
// ==========================================

if (
  !prefersReducedMotion.matches
) {

  const contactSection =
    document.getElementById(
      "contact"
    );


  if (
    contactSection
  ) {

    const contactObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                !entry.isIntersecting ||
                !isTouchDevice()
              ) {

                return;

              }


              const contactLinks =
                contactSection.querySelectorAll(
                  'a[href^="mailto:"], a[href^="tel:"], a[href^="https://"]'
                );


              contactLinks.forEach(
                (link, index) => {

                  window.setTimeout(
                    () => {

                      link.animate(
                        [
                          {
                            transform:
                              "translateY(2px)",

                            opacity:
                              0.9
                          },

                          {
                            transform:
                              "translateY(-2px)",

                            opacity:
                              1
                          },

                          {
                            transform:
                              "translateY(0)",

                            opacity:
                              1
                          }
                        ],
                        {
                          duration: 650,

                          delay:
                            index * 70,

                          easing:
                            "cubic-bezier(0.22,1,0.36,1)"
                        }
                      );

                    },
                    index * 70
                  );

                }
              );


              contactObserver.unobserve(
                entry.target
              );

            }
          );

        },
        {
          threshold: 0.45
        }
      );


    contactObserver.observe(
      contactSection
    );

  }

}


// ==========================================
// FINAL RESPONSIVE REFRESH
// ==========================================

window.addEventListener(
  "orientationchange",
  () => {

    window.setTimeout(
      () => {

        updateResponsiveSocialColors();

        updateScrollProgressPosition();

        updateScrollProgress();

        if (
          isTouchDevice()
        ) {

          updateMobileParallax();

        }

      },
      180
    );

  },
  {
    passive: true
  }
);

const profilePhoto = document.getElementById("profile-photo");

if (profilePhoto) {
  const fixProfilePhoto = () => {
    profilePhoto.style.filter = "none";
    profilePhoto.style.transform = "translateZ(0)";
    profilePhoto.style.backfaceVisibility = "hidden";
    profilePhoto.style.webkitBackfaceVisibility = "hidden";
    profilePhoto.style.imageRendering = "auto";

    void profilePhoto.offsetWidth;
  };

  if (profilePhoto.complete) {
    fixProfilePhoto();
  } else {
    profilePhoto.addEventListener("load", fixProfilePhoto, { once: true });
  }

  window.addEventListener("resize", fixProfilePhoto);
}