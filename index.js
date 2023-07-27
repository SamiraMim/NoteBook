// ----------------- Navbar Functions -----------------
$(document).ready(function() {
    $(window).on('scroll', function() {
        if ($(this).scrollTop() >= 200) {
            $('.navbar').addClass('fixed-top');
        } else if ($(this).scrollTop() == 0) {
            $('.navbar').removeClass('fixed-top');
        }
    });

    function adjustNav() {
        var winWidth = $(window).width(),
            dropdown = $('.dropdown'),
            dropdownMenu = $('.dropdown-menu');
        
        if (winWidth >= 0) {
            dropdown.on('mouseenter', function() {
                $(this).addClass('show').children(dropdownMenu).addClass('show');
            });
            
            dropdown.on('mouseleave', function() {
                $(this).removeClass('show').children(dropdownMenu).removeClass('show');
            });
        } else {
            dropdown.off('mouseenter mouseleave');
        }
    }
    
    $(window).on('resize', adjustNav);
    
    adjustNav();
  
});

// -------------------------------------
var navToggle = document.querySelector("#nav-toggle");
var activeElements = document.querySelectorAll(".active-element");

var toggledNav = navToggle.addEventListener("click", function() {
     for(var i = 0; i < activeElements.length; i++) {
          activeElements[i].classList.toggle("active");
     }
});

// ----------------- Banner Functions -----------------

function bannerSlider () {
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/quotes?limit=5',
        headers: { 'X-Api-Key': 'FWSFLa5UvWi5nZ+kZ392xQ==9gqRR2jGEetCdGKp'},
        contentType: 'application/json',
        success: function(data) {
            if (data != null) 
            {
                var buttons = btn = img = author = quote = '';
                let itemBuffer = [];
                for (let i = 0; i < data.length; i++) {
                    if (i == 0) {
                        btn = '<button type="button" data-bs-target="#bannerSlide" data-bs-slide-to="'+ i +'" class="active"></button> ';  
                        itemBuffer.push('<div class="carousel-item active" data-bs-interval="10000">');
                    } else {
                        btn = '<button type="button" data-bs-target="#bannerSlide" data-bs-slide-to="'+ i +'"></button> ';
                        itemBuffer.push('<div class="carousel-item" data-bs-interval="10000">');
                    }

                    buttons += btn;
                    img = '<img src="./allMaterials/images/nature/nature'+ i +'.jpg" class="d-block w-100"><div class="overlay"></div>';
                    itemBuffer.push(img);
                    itemBuffer.push('<div class="carousel-caption d-none d-md-block">');
                    author = '<h5>' + data[i].author + '</h5>';
                    quote = '<p>' + data[i].quote + '</p>';
                    itemBuffer.push(quote);
                    itemBuffer.push(author);
                    itemBuffer.push('</div></div>'); 
                }
                qouteList = itemBuffer.join(' ');
                let indicators = document.querySelector('.carousel-indicators');
                let innerContent = document.querySelector('.carousel-inner');
                indicators.innerHTML = buttons;
                innerContent.innerHTML = qouteList;              

            } else {
                result = 'no result available!'; 
                let banner = document.querySelector('.banner');
                img = '<img src="./allMaterials/images/nature/nature9.jpg" class="d-block w-100"><div class="overlay"></div>';
                banner.innerHTML = img;

            }
        },
        error: function ajaxError(jqXHR) {
            result = 'no result available!'; 
            let banner = document.querySelector('.banner');
            img = '<img src="./allMaterials/images/nature/nature0.jpg" class="d-block w-100"><div class="overlay"></div>';
            banner.innerHTML = img;
            console.error('Error: ', jqXHR.responseText);
        }
    });

    
}

bannerSlider();
