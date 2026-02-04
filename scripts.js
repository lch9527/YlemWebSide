const sections = document.querySelectorAll('section[id]');
const navDots = document.querySelectorAll('.right-nav .dot');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.75
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navDots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('href').substring(1) === entry.target.id) {
          dot.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => {
  observer.observe(section);
});

document.getElementById('year').textContent = new Date().getFullYear();

const imageMapping = {
  brandLogo: 'assets/YLEM_LOGO/YLEM_Logo.png',
  heroBackground: 'assets/PH_background.jpg',
  trailerPoster: 'assets/hustle-01.png',
  universeImage: 'assets/hustle-02.png',
  studioImage: 'assets/hustle-03.png',
  galleryItem1: 'assets/hustle-01.png',
  galleryItem2: 'assets/hustle-02.png',
  galleryItem3: 'assets/hustle-03.png',
  galleryItem4: 'assets/hustle-04.png',
  LiftImage: 'assets/lift1.png',
  orbImage: '' // Add the path to your orb image here
};

const linkMapping = {
  universeLink: '#',
  studioLink: '#'
};

document.addEventListener('DOMContentLoaded', () => {
  // Set images from mapping
  const imgElements = document.querySelectorAll('[data-img-key]');
  imgElements.forEach(element => {
    const key = element.getAttribute('data-img-key');
    if (imageMapping[key]) {
      if (element.tagName === 'VIDEO') {
        element.poster = imageMapping[key];
      } else {
        element.src = imageMapping[key];
      }
    }
  });

  // Set links from mapping
  const linkElements = document.querySelectorAll('[data-link-key]');
  linkElements.forEach(element => {
    const key = element.getAttribute('data-link-key');
    if (linkMapping[key]) {
      element.href = linkMapping[key];
    }
  });

  // Set hero background
  const heroSection = document.querySelector('.meta-hero');
  if (heroSection && imageMapping.heroBackground) {
    heroSection.style.backgroundImage = `url('${imageMapping.heroBackground}')`;
  }

  // Handle orb image fallback
  const orbImage = document.querySelector('.orb-image');
  const orbDiv = document.querySelector('.orb');
  if (orbImage && imageMapping.orbImage) {
    const img = new Image();
    img.src = imageMapping.orbImage;
    img.onload = () => {
      orbImage.src = img.src;
      orbImage.style.display = 'block';
      orbDiv.style.display = 'none';
    };
  }
});
