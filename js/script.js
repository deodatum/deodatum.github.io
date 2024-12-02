// КАРУСЕЛЬ
$(document).ready(function(){
  $('.carousel__inner').slick({
    speed: 1200,
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/section_4/left_arrow.png" alt="arrow"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/section_4/right_arrow.png" alt="arrow"></button>',
    responsive: [
        {
      breakpoint: 992,
      settings: {
        dots: false,
        arrows: false
      }
      },
    ]
  });


// ТАБЫ НАВИГАЦИЯ ФИЛЬТР БОКСОВ
   $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });


// ОПИСАНИЕ В БОКСЕ
  function toggleSlide(item) {
    $(item).each(function(i) {
    $(this).on('click', function(e) {
      e.preventDefault();
      $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
      $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    })
  })
  }

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__list_back');

  // МОДАЛЬНЫЕ ОКНА КНОПКИ "ЗАКАЗАТЬ ЗВОНОК"
  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
  });
  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });
  
// МОДАЛЬНЫЕ ОКНА ДЛЯ БОКСОВ В КАТАЛОГЕ
  $('.button_mini').each(function(i) {
    $(this).on('click', function() {
      $('#order .modal__desc').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    })
  });

  // ВАЛИДАЦИЯ ФОРМ
  function validateForms(form){
    $(form).validate({
    rules: {
      name: {
        required: true,
        minlength: 2
      },
      phone: 'required',
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name: {
        required: 'Пожалуйста, введите своё имя',
        minlength: jQuery.validator.format('Пожалуйста, введите минимум {0} символов')
      },
      phone: 'Пожалуйста, введите свой номер телефона',
      email: {
        required: 'Пожалуйста, введите свою почту',
        email: 'Неправильно введён адрес почты'
      }
    }
  });
  };
  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#order form');

  // МАСКА ВВОДА НОМЕРА
  $('input[name=phone]').mask('+7 (999) 999-99-99');

  // ОТПРАВКА ПИСЕМ С САЙТА
  $('form').submit(function(e) {
    e.preventDefault();

    if (!$(this).valid()) {
      return;
    }

    $.ajax({
      type: 'POST',
      url: 'mailer/smart.php',
      data: $(this).serialize()
    }).done(function() {
      $(this).find('input').val('');
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset');
    });
    return false;
  });

  // СТРЕЛКА ПЕРЕНОС В НАЧАЛО
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });

  // ПЛАВНОСТЬ ДЛЯ ПЕРЕНОСА СТРАНИЦЫ
  $("a[href^='#up']").click(function(){
    const _href = $(this).attr('href');
    $('html, body').animate({scrollTop: $(_href).offset().top+'px'});
    return false;
  });

  // АНИМАЦИЯ WOW
  new WOW().init();
});