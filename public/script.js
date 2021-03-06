$(function() {

  $(".foodItem").on("click", function(event) {
    var foodId = $(this).attr("data-food");
    $.ajax({
      method: "post",
      url: "/neworder/addtocart",
      data: {foodId: foodId }
    }).then((dat) => {
      $(".cart").empty();
       $.ajax({
      method: "get",
      url: "/viewcart",
    }).then((data) => {
      console.log(data);
       var sum = data.order_items.reduce((a,b) => a + b.price, 0);
        $(".cart").append(`<p class="cartList">Price: $${sum} </p>`);

        data.order_items.forEach((item) => {
          $(".cart").append(`<p class="cartList"> ${item.food} </p>`);
        });
    });
    });
  });

  $('.remodal-confirm').on('click', function(event) {
    var newMenuItem = {
      foodName: $("#foodName").val(),
      foodPrice: $("#foodPrice").val(),
      foodURL: $("#foodURL").val()
    };
    $.post('/menu/update', newMenuItem);
  });

  $("#order-button").on("click", function() {
    $(".cart").empty();
    $.ajax({
      method: "post",
      url: "/neworder"
    });
  });

  // $(".foodItem").on("click", function() {
  //   $(".cart").empty();
  //   $.ajax({
  //     method: "get",
  //     url: "/viewcart",
  //   }).then(function(data) {

  //       var sum = data.menu_items.reduce((a,b) => a + b.price, 0);
  //       $(".cart").append(`<p class="cartList">Price: $${sum} </p>`);

  //       data.menu_items.forEach((item) => {
  //         $(".cart").append(`<p class="cartList"> ${item.food} </p>`);
  //       });
  //     }).fail((err) => {
  //       alert(err);
  //   });
  // });

  $("#placeorder").on("click", function() {
    $.ajax({
      method: "post",
      url: "/neworder/placed"
    }).then((email) => {
      alert("Your order has been placed. Check your email for order details!");
      $.ajax({
        method: "get",
        url: "/emailnotify"
      });
    }).then(function() {
       $.ajax({
      method: "get",
      url:"/pullorders"
    });

    });
  });


 
   

});