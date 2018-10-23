var cartData = {
    products: [
        {
            id: 1,
            title: 'Some product 1',
            href: 'https://google.com',
            img: 'https://picsum.photos/96/96/?random',
            count: 1,
            price: 500,
        },
        {
            id: 2,
            title: 'Some product 2',
            href: 'https://google.com',
            img: 'https://picsum.photos/96/96/?random',
            count: 2,
            price: 400,
        },
        {
            id: 3,
            title: 'Some product 3',
            href: 'https://google.com',
            img: 'https://picsum.photos/96/96/?random',
            count: 3,
            price: 300,
        },
        {
            id: 4,
            title: 'Some product 4',
            href: 'https://google.com',
            img: 'https://picsum.photos/96/96/?random',
            count: 4,
            price: 200,
        }, {
            id: 5,
            title: 'Some product 5',
            href: 'https://google.com',
            img: 'https://picsum.photos/96/96/?random',
            count: 5,
            price: 100,
        },
 
    ],
    texts: {
        checkoutTitle: 'Ваша корзина',
        totalSum: 'Сумма заказа',
        quantity: 'Количество',
        cartEmpty: 'Ваша корзина пуста',
        currency: 'грн',
    },
};

var CartModule = (function() {

    return {
        showCart: function(cart) {
            var out = '';
            var totalCount = 0;
            var totalSum = 0;

            checkCart();

            out += '<h2>' + cart.texts.checkoutTitle + '</h2>';

            for (var key in cart.products) {
                if (cart.products[key] != null) {
                    out += '<div class="product-item">';
                    out += '<div class="info">';
                    out += '<a href="' + cart.products[key]['href'] + '">' + cart.products[key]['title'] + '</a>';
                    out += '<p class="count"><button class="btn decrease" data-art="' + cart.products[key]['id'] + '">-</button><span class="item-count">' + cart.products[key]['count'] + '</span><button class="btn increase" data-art="' + cart.products[key]['id'] + '">+</button>';
                    out += '<span> x ' + cart.products[key]['price'] + ' грн</span></p>';
                    out += '<p class="price">' + cart.products[key]['count']*cart.products[key]['price'] + ' грн</p>';
                    out += '</div>'; // .info
                    out += '<div class="image">';
                    out += '<img src="' + cart.products[key]['img'] + '" alt="product">';
                    out += '<button class="remove" data-art="' + cart.products[key]['id'] + '">X</button>';
                    out += '</div>'; // .image
                    out += '</div>'; // .product-item

                    totalCount += cart.products[key]['count'];
                    totalSum += cart.products[key]['count']*cart.products[key]['price'];
                }
            }

            if (totalCount === 0) {
                out += '<div class="empty">' + cart.texts.cartEmpty + ' :(' + '</div>';
            }

            out += '<div class="total">';
            out += '<p class="total-count">' + cart.texts.quantity + ': ' + totalCount + '</p>';
            out += '<p class="total-sum">' + cart.texts.totalSum + ': ' + '<span>' + totalSum + '</span>' + ' ' + cartData.texts.currency + '</p>';
            out += '</div>';

            $('#cart').html(out);

            $('.decrease').on('click', decreaseItem);
            $('.increase').on('click', increaseItem);
            $('.remove').on('click', removeItem);
            
            function decreaseItem() {
                var articul = $(this).attr('data-art');
                articul--;
                if (cart.products[articul].count > 1) {
                    cart.products[articul]['count']--;
                }

                $(this).siblings('.item-count').animate({ opacity: 0.25, height: 'toggle' }, 1000);

                setTimeout(function() {
                    saveCartToLS(); // save to localStorage
                    CartModule.showCart(cart);
                }, 500);
            }

            function increaseItem() {
                var articul = $(this).attr('data-art');
                articul--;
                cart.products[articul]['count']++;   

                $(this).siblings('.item-count').animate({ opacity: 0.25, height: 'toggle' }, 1000);
                
                setTimeout(function() {
                    saveCartToLS(); // save to localStorage
                    CartModule.showCart(cart);
                }, 500);
            }

            function removeItem(){
                var articul = $(this).attr('data-art');
                articul--;
                delete cart.products[articul];

                $(this).parent().parent().animate({ opacity: 0.25, height: 'toggle' }, 1000);

                setTimeout(function() {
                    saveCartToLS(); // save to localStorage
                    CartModule.showCart(cart);
                }, 1000);
            }

            function checkCart() {
                if (localStorage.getItem('cart') != null) {
                    cart = JSON.parse(localStorage.getItem('cart'));
                } else {
                    localStorage.setItem("cart", JSON.stringify(cart));
                }
            }

            function saveCartToLS(){
                localStorage.setItem('cart', JSON.stringify(cart) );
            }
        }
    }
})();

CartModule.showCart(cartData);