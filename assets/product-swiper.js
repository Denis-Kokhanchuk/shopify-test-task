document.addEventListener('DOMContentLoaded', function () {
  // Swiper ініціалізація
  const swiperContainer = document.querySelector('.product-swiper');
  if (!swiperContainer) return;

  const swiper = new Swiper('.product-swiper', {
    spaceBetween: parseInt(swiperContainer.dataset.space) || 10,
    pagination: swiperContainer.querySelector('.swiper-pagination') ? {
      el: '.swiper-pagination',
      clickable: true,
    } : false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1024: {
        slidesPerView: parseInt(swiperContainer.dataset.slidesDesktop) || 4,
      },
      768: {
        slidesPerView: parseInt(swiperContainer.dataset.slidesTablet) || 3,
      },
      0: {
        slidesPerView: parseInt(swiperContainer.dataset.slidesMobile) || 1,
      }
    }
  });

  // Фільтрація слайдів за кольором
  const select = document.querySelector('select[name="id"]');
  if (select) {
    select.addEventListener('change', function () {
      const selectedText = this.options[this.selectedIndex].textContent.toLowerCase();
      const color = selectedText.split(' ')[0]; // адаптуй при потребі

      document.querySelectorAll('.swiper-slide').forEach(slide => {
        slide.style.display = slide.dataset.color === color ? 'block' : 'none';
      });

      swiper.update();
    });
  }

  // Аккордеон
  document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
      const parent = button.closest('.product-accordion');
      const content = button.nextElementSibling;
      const multiOpen = parent.dataset.multiOpen === 'true';

      if (!multiOpen) {
        parent.querySelectorAll('.accordion-content').forEach(el => {
          el.style.display = 'none';
        });
      }

      content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
  });
});
