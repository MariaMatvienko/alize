$(document).ready(function() {

    let cart_elem = $('.cart_elem');
    if ($('.cart_modal_container').length == 2) $('.bag_counter').html(cart_elem.length / 2);
    else
        $('.bag_counter').html(cart_elem.length);
    $('.PaymentMethod:first').attr('checked', true);
    $('.ShippingType:first').attr('checked', true);

});

var $page = $('html, body');
$('a[href*="#"]').click(function() {
    $page.animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 400);
    return false;
});

$('.mini_img').click(function(event) {
    $(".central_img").css("background-image", $(event.target).css("background-image"));
});
$('.border_img_color').click(function(event) {
    if ($(event.target).attr("class") != "border_img_color") {
        $(".border_img_color").css("background", "none");
        $(".border_img_color").removeClass("active");
        $(event.target).parent().css("background", "linear-gradient(280.02deg, #FF7AF2 -22.61%, #56D6FF 111.26%)");
        $(event.target).parent().addClass(" active");
    }
});
// $('.border_img_type').click(function(event) {

//     if ($(event.target).attr("class") != "border_img_type") {
//         $(".border_img_type").css("background", "none");
//         $(event.target).parent().css("background", "linear-gradient(280.02deg, #FF7AF2 -22.61%, #56D6FF 111.26%)");

//     }
// });

$("#navToggle").click(function() {
    console.log("asdsad");
    $(this).toggleClass("active");
    $(".overlay").toggleClass("open");
    // this line ▼ prevents content scroll-behind
    $("body").toggleClass("locked");

});
$('.overlay').click(function(event) {

    if ($(event.target).attr("class") != "search li_search") {
        $(this).removeClass('open');
        $('.navBurger').removeClass('active');
    }


});

$('.create_acc').click(function(event) {
    console.log("asdsad");
    $(".col-md-6.register").css("display", "block");
    $(".col-md-6.login").css("display", "none");

});



$('.buy').click(function(event) {

    let id_offer = $('.buy').data('id');

    let cart_elem = $('.cart_elem');
    let cart_color = $('.cart_title');
    let color = $('.active').data('id');
    let cart_has_elem = false;
    let quantity;
    for (let i = 0; i < cart_elem.length; i++) {
        let cart_elem_id = $(cart_elem[i]).data('id');
        let cart_elem_color = $(cart_color[i]).data('id');
        if (id_offer.id == cart_elem_id && cart_elem_color == color) {
            cart_has_elem = true;
            let q_din = $('.cart_counter_number');
            quantity = $(q_din[i]).data('id');

        }

    }
    if (cart_has_elem == false) {
        console.log("11111" + cart_has_elem);
        let data = {
            'cart': [
                { 'offer_id': id_offer.id, 'quantity': 1, 'property': { 'color': color } }

            ]
        };
        //Send ajax request and update cart items
        $.request('Cart::onAdd', {
            'data': data,
            update: { 'cart': '.cart_modal' }
        });
        $('.bag_counter').html(cart_elem.length + 1);

    } else {
        console.log("11111" + cart_has_elem);
        let data = {
            'cart': [
                { 'offer_id': id_offer.id, 'quantity': quantity + 1, 'property': { 'color': color } }

            ]
        };

        //Send ajax request and update cart items
        $.request('Cart::onUpdate', {
            'data': data,
            update: { 'cart': '.cart_modal' }
        });
        $('.bag_counter').html(cart_elem.length);
    }


});

$('.cart_delete').click(function(event) {
    let id_elem = $(event.target).data('id');
    console.log(id_elem + "ffff");
    //Prepare array with offers ID
    let data = {
        'cart': [id_elem],
        'type': 'position'
    };

    //Send ajax request and update cart items
    $.request('Cart::onRemove', {
        'data': data,
        update: {
            'cart': '.cart_update',
            'result_container': '.result_container',
        }
    });


});

$('.tab_user').click(function(event) {
    event.currentTarget.className += " active";
    $('.tab_guest').removeClass("active");
});
$('.tab_guest').click(function(event) {
    event.currentTarget.className += " active";
    $('.tab_user').removeClass("active");
});

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateMobile(mobile) {
    const re = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    return re.test(mobile);
}
$('.order_next').click(function(event) {
    let flag = true;

    if ($('input[name=name]').val() == 0) flag = false;
    if (!validateEmail($('input[name=email]').val())) flag = false;
    if (!validateMobile($('input[name=mobile]').val())) flag = false;
    if ($(event.target).hasClass('order_next_dis')) flag = false;
    if (flag) {
        $('.order_next').addClass(" do_order");
        $(".back_button").css("display", "block");
        $('.data_user_title').addClass(" data_user_title_dis");
        $('.order_delivery').addClass(" weight_title");
        $(".order_next").html("Заказать");
        $(".order_slider").css("transform", "rotate(180deg)");
        $(".previous_data_user").css("display", "none");
        $(".next_data_user").css("display", "block");
    }

});

$('.back_button').click(function(event) {
    $(".order_next").html("Далее");
    $('.order_next').removeClass("do_order");
    $('.data_user_title').removeClass("data_user_title_dis");
    $('.order_delivery').removeClass("weight_title");
    $(".back_button").css("display", "none");
    $(".order_slider").css("transform", "rotate(0deg)");
    $(".previous_data_user").css("display", "block");
    $(".next_data_user").css("display", "none");

});

function order_price() {
    if ($("input[name='order_shipping_type_id'][value='2']").prop("checked")) {
        if ($("input[name='order_payment_method_id'][value='1']").prop("checked"))
            $('.result_delivery').html("30 грн.");
        else $('.result_delivery').html("40 грн.");
    } else {
        if ($("input[name='order_payment_method_id'][value='1']").prop("checked"))
            $('.result_delivery').html("40 грн.");
        else $('.result_delivery').html("60 грн.");
    }
    $('.total_price').html(parseInt($('.result_delivery').html(), 10) + $('.result_right_side').data('id') + " грн.");
}
$("input[name='order_shipping_type_id']").change(function() {
    order_price();
});
$("input[name='order_payment_method_id']").change(function() {
    order_price();
});
$("input[name='recipient']").change(function() {
    if ($("input[name='recipient'][value='guest']").prop("checked")) {
        $('input[name=email]').val("");
        $('input[name=name]').val("");
        $('input[name=mobile]').val("");
        $('input[name=street_addr]').val("");
    }
});
$(".next_data_user").on("click", ".do_order", function(event) {
    let flag = true;

    if ($('input[name=street_addr]').val() == 0) flag = false;
    if (flag) {
        console.log("sdadas");
        var data = {
            'order': {
                'payment_method_id': $("input[type=radio][name=order_payment_method_id]:checked").val(),
                'shipping_type_id': $("input[type=radio][name=order_shipping_type_id]:checked").val(),
                'shipping_price': parseInt($('.result_delivery').html(), 10)
            },
            'user': {
                'email': $('input[name=email]').val(),
                'name': $('input[name=name]').val(),
                'phone': $('input[name=mobile]').val()
            },
            'shipping_address': {
                'address1': $('input[name=street_addr]').val(),
            }
        };

        $.request('MakeOrder::onCreate', {
            'data': data
        });
    }
});