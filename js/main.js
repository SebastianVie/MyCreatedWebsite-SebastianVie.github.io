$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {

        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if ($(window).scrollTop() > 68) {
            $('header .header-2').addClass('header-active');
        } else {
            $('header .header-2').removeClass('header-active');
        }

        $('section').each(function () {

            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top >= offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }

        });

    });

    $('.home-slider').owlCarousel({
        items: 1,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 8000,
        loop: true
    });

    $('.small-image img').click(function () {

        $(this).addClass('image-active').siblings().removeClass('image-active');
        let image = $(this).attr('src');
        $('.big-image img').attr('src', image);

    });

    $('.gallery .btn').click(function () {

        let filter = $(this).attr('data-filter');
        if (filter == 'all') {
            $('.gallery .box').show(400);
        } else {
            $('.gallery .box').not('.' + filter).hide(200);
            $('.gallery .box').filter('.' + filter).show(400);
        }

        $(this).addClass('button-active').siblings().removeClass('button-active');

    });

});


// Define an object that represents the shopping cart
var cart = {
    items: [],
    total: 0
};

// Add a click event listener to all "Add to Cart" buttons
$(document).on('click', '.add-cart', function () {
    // Get the item ID, name, and price from the corresponding HTML elements
    var itemId = $(this).closest('.box').attr('data-item');
    var name = $(this).closest('.box').find('.info h3').text();
    var price = parseFloat($(this).closest('.box').find('.actual-price').text());
    var img = $(this).closest('.box').find('img').attr('src');
    // Create an object to represent the item and add it to the cart
    var obj = {};
    obj.id = itemId;
    obj.name = name;
    obj.quantity = 1;
    obj.price = price;
    obj.img = img;
    cart.items.push(obj);

    // Recalculate the cart total
    cart.total = 0;
    for (var i = 0; i < cart.items.length; i++) {
        cart.total += cart.items[i].quantity * cart.items[i].price;
    }
    // Save the cart data to localStorage
    var cartJson = JSON.stringify(cart);
    localStorage.clear();
    localStorage.setItem("cartItems", cartJson);
});

// Define a counter variable to keep track of the number of items in the cart
let cartCount = 0;

// Add a click event listener to all "Add to Cart" buttons to update the counter and show a success alert
const addToCartButtons = document.querySelectorAll('.add-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Increment the cart count variable by 1
        cartCount++;

        // Update the text content of the cart icon with the current value of the counter variable
        const cartCountElement = document.getElementById('cart-count');
        cartCountElement.textContent = cartCount;

        // Show a success alert for 2 seconds
        const alertElement = document.getElementById('alert');
        alertElement.classList.remove('hidden');
        setTimeout(() => {
            alertElement.classList.add('hidden');
        }, 2000);
    });
});

