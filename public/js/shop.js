function addItemToCart(itemId) {
    console.log("itemId",itemId)
    $.ajax({
      url: "/cart/add",
      type: "POST",
      data: { shoesId: itemId },
      success: function (data) {
        console.log("DID I WORK?")
        if (typeof data == "string") {
          window.location.href = "/";
        }
      },
      error: function (error) {},
    });
  }