document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 600,
    once: true,
  });
});

// Funkce pro získání šířky scrollbar
const getScrollbarWidth = () => {
  const div = document.createElement("div");
  div.style.overflowY = "scroll";
  div.style.width = "50px";
  div.style.height = "50px";
  div.style.visibility = "hidden";
  div.style.position = "absolute"; // Aby div neovlivňoval layout
  document.body.appendChild(div);
  const scrollbarWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);
  return scrollbarWidth;
};

const setScrollbarWidth = () => {
  const scrollbarWidth = getScrollbarWidth();
  document.documentElement.style.setProperty(
    "--scrollbar-width",
    `${scrollbarWidth}px`,
  );
};

// Zavolejte funkci při načtení stránky
document.addEventListener("DOMContentLoaded", setScrollbarWidth);

// Zavolejte funkci při změně velikosti okna
window.addEventListener("resize", setScrollbarWidth);
//Headertop height
function setHeaderTopHeight() {
  const headerTop = document.querySelector("#header");
  if (headerTop) {
    document.documentElement.style.setProperty(
      "--header-top-height",
      `${headerTop.clientHeight}px`,
    );
  }
}

// Zavolejte funkci při načtení stránky
document.addEventListener("DOMContentLoaded", setHeaderTopHeight);
window.addEventListener("resize", setHeaderTopHeight);

const fixedHeader = () => {
  const header = document.querySelector(".header");
  if (header) header.classList.toggle("sticky", window.pageYOffset > 0);
};

document.addEventListener("DOMContentLoaded", fixedHeader);
window.addEventListener("scroll", fixedHeader);

// Funkce pro přidání event listeneru
const on = (eventType, selector, callback) => {
  document.addEventListener(eventType, (e) => {
    let targetElement = e.target;
    while (targetElement && targetElement !== document) {
      if (targetElement instanceof Element && targetElement.matches(selector)) {
        e.preventDefault();
        callback.call(targetElement, e);
        break;
      }
      targetElement = targetElement.parentElement;
    }
  });
};

let lastScrollTop = 0;
const delta = 0;

window.addEventListener("scroll", () => {
  const st = window.pageYOffset || document.documentElement.scrollTop;

  if (Math.abs(lastScrollTop - st) <= delta) return;

  const header = document.querySelector(".header");
  const scrollAd = document.querySelector(".scroll-holder");
  if (header) {
    if (st > lastScrollTop) {
      header.classList.add("hide");
      if (scrollAd) {
        scrollAd.classList.add("hide");
      }
    } else {
      header.classList.remove("hide");
      if (scrollAd) {
        scrollAd.classList.remove("hide");
      }
    }
  }

  lastScrollTop = st;
});

// Funkce pro hladký scroll na cílový element
const smoothScrollTo = (target, offset = 0, duration = 700) => {
  const targetElement = document.querySelector(target);
  if (targetElement) {
    const targetPosition =
      targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const swiper2 = new Swiper(".swiper-reviews", {
    grabCursor: true,
    pauseOnMouseEnter: true,
    watchSlidesProgress: true,
    speed: 800,
    loop: true,
    slidesPerView: 1,
    spaceBetween: 16,
    breakpointsBase: "container",
    pagination: { el: ".swiper-pagination", clickable: true },
    breakpoints: {
      480: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
      1124: {
        slidesPerView: 5,
        spaceBetween: 24,
      },
    },
    autoplay: {
      delay: 8000,
      disableOnInteraction: false,
    },
  });

  document.addEventListener("mousemove", (e) => {
    const holder = document.querySelector(".flex-holder");
    const hover = document.querySelector(".hover-element");

    if (!holder || !hover) return;

    // Získáme pozici .flex-holderu vůči oknu
    const rect = holder.getBoundingClientRect();

    // Vypočítáme pozici myši relativně k holderu
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Aktualizace pozice
    hover.style.setProperty("--mouse-x", x + "px");
    hover.style.setProperty("--mouse-y", y + "px");

    // Zobrazení při pohybu
    hover.style.opacity = "1";
  });

  if (window.innerWidth <= 1023) {
    const html = document.documentElement;
    const header = document.querySelector("header");
    const closeBg = header.querySelector(".close-bg");
    const nav = header.querySelector("nav");

    // kliknutí na hamburger
    document.addEventListener("click", (e) => {
      const target = e.target.closest(".hamburger");
      if (target) {
        e.preventDefault();
        if (closeBg) closeBg.classList.add("active");
        if (nav) nav.classList.add("active");
        html.classList.add("remove");
      }
    });

    // kliknutí na .close
    document.addEventListener("click", (e) => {
      const target = e.target.closest(".close");
      if (target) {
        e.preventDefault();
        if (closeBg) closeBg.classList.remove("active");
        if (nav) nav.classList.remove("active");
        html.classList.remove("remove");
        nav
          .querySelectorAll("li")
          .forEach((li) => li.classList.remove("active"));
      }
    });

    // kliknutí na .close-bg
    if (closeBg) {
      closeBg.addEventListener("click", (e) => {
        e.preventDefault();
        closeBg.classList.remove("active");
        if (nav) nav.classList.remove("active");
        html.classList.remove("remove");
        nav
          .querySelectorAll("li")
          .forEach((li) => li.classList.remove("active"));
      });
    }

    // klávesa Escape
    document.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        if (closeBg) closeBg.classList.remove("active");
        if (nav) nav.classList.remove("active");
        html.classList.remove("remove");
        nav
          .querySelectorAll("li")
          .forEach((li) => li.classList.remove("active"));
      }
    });
  }
});
