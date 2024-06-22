//
const searchIcon = document.querySelector(".search-icon");
const searchForm = document.querySelector(".search-form");
const menuIcon = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");

searchIcon.addEventListener("click", () => {
  searchForm.classList.add("active");
  cartItemContainer.classList.remove("active");
  navbar.classList.remove("active");
});

menuIcon.addEventListener("click", () => {
  navbar.classList.add("active");
  searchForm.classList.remove("active");
  cartItemContainer.classList.remove("active");
});

const cartIcon = document.querySelector(".cart-icon");
const cartItemContainer = document.querySelector(".cart-shopping");
cartIcon.addEventListener("click", () => {
  cartItemContainer.classList.add("active");
  searchForm.classList.remove("active");
  navbar.classList.remove("active");
});

// Nhấp vào mục trong menu sẽ tự ẩn
window.onscroll = () => {
  cartItemContainer.classList.add("active");
  searchForm.classList.remove("active");
  navbar.classList.remove("active");
};
//
document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".home", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  var dots = document.getElementsByClassName("dot");
  for (var i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", function () {
      var slideIndex = Array.from(dots).indexOf(this) + 1;
      swiper.slideTo(slideIndex - 1);
    });
  }
});

// xử lý giỏ hàng

const buttons = document.querySelectorAll(".cake-card button");

buttons.forEach(function (button, index) {
  button.addEventListener("click", function (event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
    var btnItem = event.currentTarget; // Sử dụng currentTarget để đảm bảo đúng phần tử button
    var product = btnItem.closest(".cake-card"); // Lấy phần tử cha gần nhất có lớp 'cake-card'
    var productImg = product.querySelector("img").src;
    var productName = product.querySelector("h3").innerText;
    var productPrice = product.querySelector(".price").innerText;
    // console.log(productPrice, productName, productImg);
    addcart(productPrice, productName, productImg);
  });
});
function addcart(productPrice, productName, productImg) {
  var addtr = document.createElement("tr");
  var cartItem = document.querySelectorAll("tbody tr");
  for (var i = 0; i < cartItem.length; i++) {
    var productT = document.querySelectorAll(".title-cart");
    if (productT[i].innerHTML == productName) {
      alert("San pham cua ban da co trong gio hang");
      return;
    }
  }
  var trcontent = `
      <tr>
        <td style="display: flex; align-items: center;">
          <img style="width: 70px;" src="${productImg}" alt="${productName}" /><span class=title-cart>${productName}</span>
        </td>
        <td>
          <p><span class="price">${productPrice}</span><sup></sup></p>
        </td>
        <td>
          <input style="width: 30px; outline: none;" type="number" value="1" min="1"/>
        </td>
        <td style="cursor: pointer;"><span class="cart-delete">Xóa</span></td>
      </tr>
    `;
  addtr.innerHTML = trcontent;
  var cartTable = document.querySelector("tbody");
  cartTable.appendChild(addtr);
  cartTotal();
}
// cart-total
function cartTotal() {
  var cartItems = document.querySelectorAll("tbody tr");
  var totalSum = 0;

  cartItems.forEach(function (cartItem) {
    var inputValue = parseInt(cartItem.querySelector("input").value);
    var productPrice = parseFloat(
      cartItem
        .querySelector(".price")
        .innerText.replace(".", "")
        .replace(",", ".")
    );
    totalSum += inputValue * productPrice;
  });

  var cartTotal = document.querySelector(".price-total span");
  cartTotal.innerHTML = totalSum.toLocaleString("de-DE");
  deleteCart();
  inputChange();
}
// delete
function deleteCart() {
  var cartDeleteButtons = document.querySelectorAll(".cart-delete");

  cartDeleteButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      var cartItemRow = event.target.parentElement.parentElement;
      cartItemRow.remove();
      cartTotal();
    });
  });
}

function inputChange() {
  var inputFields = document.querySelectorAll("tbody tr input");

  inputFields.forEach(function (input) {
    input.addEventListener("change", function () {
      cartTotal();
    });
  });
}

const cartbtn = document.querySelector(".fa-x");
const cartshow = document.querySelector(".fa-cart-plus");
cartshow.addEventListener("click", function () {
  document.querySelector(".cart-shopping").style.right = "0";
});
cartbtn.addEventListener("click", function () {
  document.querySelector(".cart-shopping").style.right = "-200%";
});
// new cakes

const buttonsNewCake = document.querySelectorAll(
  ".new-card .icons button.fa-shopping-cart"
);
// console.log(buttonsNewCake);
buttonsNewCake.forEach(function (button, index) {
  button.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default behavior of the button click
    var btnItemnew = event.currentTarget; // Use currentTarget to ensure we get the correct button
    var productnew = btnItemnew.closest(".new-card"); // Use btnItemnew instead of btnItem
    var productImgnew = productnew.querySelector("img").src;
    var productNamenew = productnew.querySelector("h3").innerText;
    var productPricenew = productnew.querySelector(".price").innerText;
    // console.log(productNamenew, productImgnew, productPricenew);
    addcart(productPricenew, productNamenew, productImgnew);
  });
});

//===============List-image anniversary section=============
const listImage = document.querySelector(".slide-show .list-images");
const imgs = document.querySelectorAll(".slide-show .list-images img");
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const length = imgs.length;
let current = 0;
const slideWidth = imgs[0].offsetWidth; // Lưu trữ chiều rộng của mỗi slide
// Function to handle slide change
const handleChangeSlide = () => {
  current++; // Tăng chỉ số của slide hiện tại

  if (current === length) {
    // Nếu đã hiển thị slide cuối cùng
    listImage.style.transition = "none"; // Tắt hiệu ứng chuyển động để chuyển đến slide đầu tiên mà không có hiệu ứng trượt
    listImage.style.transform = `translateX(0)`; // Chuyển đến slide đầu tiên
    current = 1; // Đặt lại chỉ số của slide hiện tại về 1 để bắt đầu từ slide thứ hai
  } else {
    listImage.style.transition = "transform 0.5s ease-in-out"; // Bật lại hiệu ứng chuyển động
    listImage.style.transform = `translateX(${-current * slideWidth}px)`; // Di chuyển đến slide tiếp theo
  }
};

// Bắt đầu chạy slideshow và lưu lại tham chiếu để có thể dừng lại sau này
//let handleEventChangeSlide = setInterval(handleChangeSlide, 4000);

// Xử lý khi nhấn nút phải (Next)
btnRight.addEventListener("click", () => {
  //clearInterval(handleEventChangeSlide); // Dừng chuyển động tự động
  handleChangeSlide(); // Chuyển đến slide tiếp theo
  //handleEventChangeSlide = setInterval(handleChangeSlide, 4000); // Bắt đầu lại chuyển động tự động
});

// Xử lý khi nhấn nút trái (Previous)
btnLeft.addEventListener("click", () => {
  clearInterval(handleEventChangeSlide); // Dừng chuyển động tự động
  current--; // Giảm chỉ số của slide hiện tại

  if (current < 0) {
    // Nếu đã hiển thị slide đầu tiên
    current = length - 1; // Đặt chỉ số hiện tại đến slide cuối cùng
    listImage.style.transition = "none"; // Tắt hiệu ứng chuyển động để chuyển đến slide cuối cùng mà không có hiệu ứng trượt
    listImage.style.transform = `translateX(${-current * slideWidth}px)`; // Chuyển đến slide cuối cùng
  } else {
    listImage.style.transition = "transform 0.5s ease-in-out"; // Bật lại hiệu ứng chuyển động
    listImage.style.transform = `translateX(${-current * slideWidth}px)`; // Di chuyển đến slide trước đó
  }

  //handleEventChangeSlide = setInterval(handleChangeSlide, 4000); // Bắt đầu lại chuyển động tự động
});
document.addEventListener("DOMContentLoaded", function () {
  const cakeCards = document.querySelectorAll(".cake-card");

  cakeCards.forEach((cakeCard) => {
    const slideShow = cakeCard.querySelector(".slide-show");
    const listImages = slideShow.querySelector(".list-images");
    const btnLeft = slideShow.querySelector(".btn-left");
    const btnRight = slideShow.querySelector(".btn-right");
    let currentIndex = 0;

    btnLeft.addEventListener("click", () => {
      currentIndex = currentIndex > 0 ? currentIndex - 1 : 2;
      listImages.style.transform = `translateX(-${(currentIndex * 100) / 3}%)`;
    });

    btnRight.addEventListener("click", () => {
      currentIndex = currentIndex < 2 ? currentIndex + 1 : 0;
      listImages.style.transform = `translateX(-${(currentIndex * 100) / 3}%)`;
    });
  });
});

// Kiểm tra
function validateForm() {
  var name = document.getElementById("name").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var location = document.getElementById("location").value.trim();
  var phoneRegex = /^[0-9]{10,11}$/; // Regex để kiểm tra số điện thoại

  var valid = true; // Biến để kiểm tra tính hợp lệ của biểu mẫu

  // Kiểm tra xem các trường có được điền đầy đủ không
  if (name == "") {
    document.getElementById("nameError").innerText = "Vui lòng nhập họ và tên.";
    valid = false;
  } else {
    document.getElementById("nameError").innerText = "";
  }

  if (phone == "") {
    document.getElementById("phoneError").innerText =
      "Vui lòng nhập số điện thoại.";
    valid = false;
  } else if (!phone.match(phoneRegex)) {
    document.getElementById("phoneError").innerText =
      "Số điện thoại không hợp lệ.";
    valid = false;
  } else {
    document.getElementById("phoneError").innerText = "";
  }

  if (location == "") {
    document.getElementById("locationError").innerText =
      "Vui lòng nhập địa chỉ.";
    valid = false;
  } else {
    document.getElementById("locationError").innerText = "";
  }

  // Nếu tất cả các trường hợp đều hợp lệ, tiến hành gửi biểu mẫu
  if (valid) {
    alert("Bạn đã gửi thành công !");
    document.getElementById("cakeForm").submit();
  }
}
