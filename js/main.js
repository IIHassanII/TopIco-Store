// ----Global ----
let itemsCartCount = document.querySelector(".items-cart span");
let cartHead = document.querySelector(".cart .cart-head p span");
let itemsInCart;
// ----Global ----

// ------- Cart Box -------
let clostBtn = document.getElementById("clostBtn");
let showCartIcon = document.getElementById("showCartIcon");
let cartBar = document.querySelector(".cart");
clostBtn.onclick = () => {
  cartBar.style.right = "-100vw";
};
if (showCartIcon) {
  showCartIcon.onclick = () => {
    cartBar.style.right = "0";
  };
}
// ------- Cart Box -------

// ------- Fetch & Display Sale Items -------
let itemsList = [];
let saleItem = document.getElementById("saleItem");
let allItem = document.getElementById("allItem");
let allItem2 = document.getElementById("allItem2");
let all_Items_Page = document.getElementById("all_Items_Page");

async function getItems() {
  let data = await fetch("js/items.json");
  let response = await data.json();
  itemsList = response;
  displayItems(itemsList);

  {
    let allProducts = document.querySelectorAll(
      ".product .itemIcons .fa-cart-plus"
    );
    if (sessionStorage.itemsInCart) {
      itemsInCart = JSON.parse(sessionStorage.itemsInCart);

      if (allProducts) {
        itemsInCart.forEach((item) => {
          allProducts.forEach((itemIcon) => {
            if (item.id == itemIcon.dataset.index) {
              itemIcon.classList.add("active");
            }
          });
        });
      }

      //---------------
      displayInCart();
      //---------------
      if (itemsCartCount) {
        itemsCartCount.innerHTML = itemsInCart.length;
      }
      if (cartHead) {
        cartHead.innerHTML = `( ${itemsInCart.length} Item In Cart )`;
      }

      // -------- calc Total ---------
      calcPrice(itemsInCart);
      // -------- calc Total ---------
    } else {
      itemsInCart = [];
    }
  }

  // test

  {
    let itemName = $(".product .item-desc h4 a");
    itemName.click(function () {
      let choosenItemIndex = Number(
        this.parentElement.parentElement.parentElement.querySelector(
          ".itemIcons .fa-cart-plus"
        ).dataset.index
      );
      let choosenItemInfo = itemsList[choosenItemIndex];

      sessionStorage.setItem(
        "choosenItemInfo",
        JSON.stringify(choosenItemInfo)
      );

      window.location.href = "..//itemPage.html";
    });
  }

  if (window.location.href.includes("itemPage.html")) {
    let choosenItemInfo = JSON.parse(sessionStorage.choosenItemInfo);
    let mainImg = document.querySelector(".item-page .big-img img");
    let smImg = document.querySelector(".item-page .sm-img img:first-child");
    let smImg2 = document.querySelector(".item-page .sm-img img:last-child");
    let itemName = document.querySelector(".item-page .item-info h1");
    let itemcurrentPrice = document.querySelector(
      ".item-page .item-info .currentPrice"
    );
    let itemoldPrice = document.querySelector(
      ".item-page .item-info .oldPrice"
    );
    let itemButton = document.querySelector(".item-page .item-info button");

    let itemAvaailability = document.querySelector(
      ".item-page .infoTxt p:first-child"
    );
    let itemSku = document.querySelector(".item-page .infoTxt p:nth-child(2)");
    let itemDesc = document.querySelector(".item-page .infoTxt p:nth-child(3)");
    let iteminStock = document.querySelector(".item-page .infoTxt h4 span");

    itemsInCart.forEach((item) => {
      if (item.id == itemButton.dataset.index) {
        itemButton.classList.add("active");
      }
    });

    mainImg.setAttribute("src", choosenItemInfo.img);
    smImg.setAttribute("src", choosenItemInfo.img);
    smImg2.setAttribute("src", choosenItemInfo.img_hover);

    itemName.innerHTML = choosenItemInfo.name;
    itemcurrentPrice.innerHTML = `$${choosenItemInfo.price}`;
    itemoldPrice.innerHTML = choosenItemInfo.old_price
      ? `$${choosenItemInfo.old_price}`
      : " ";
    itemAvaailability.innerHTML = `<span>Availability: </span> ${choosenItemInfo.Avaailability}`;
    itemSku.innerHTML = `<span>SKU: </span> ${choosenItemInfo.SKU}`;
    itemDesc.innerHTML = `${choosenItemInfo.description}`;
    iteminStock.innerHTML = `${choosenItemInfo.inStock}`;

    // test
  }
}

getItems();

function displayItems(items) {
  if (saleItem) {
    items.forEach((item) => {
      if (item.old_price) {
        let offerPercent = Math.floor(
          ((item.old_price - item.price) / item.old_price) * 100
        );
        let itemBox = `
      <div class="swiper-slide">
              <div class="product">
                <div class="itemIcons">
                  <i data-index='${item.id}' id='addedToCart' onclick='addToCart(${item.id},this)' class="fa-solid fa-cart-plus"></i>
                  <i class="fa-solid fa-heart"></i>
                  <i class="fa-solid fa-share"></i>
                </div>
                <span class="offer"> ${offerPercent}% </span>
                <div class="item-img">
                  <img src="${item.img}" alt="" />
                  <img
                    class="img-hover"
                    src="${item.img_hover}"
                    alt=""
                  />
                </div>
                <div class="item-desc">
                  <h4>
                    <a
                      >${item.name}</a
                    >
                  </h4>
                </div>

                <div class="StarsIcon">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </div>
                <div class="price">
                  <p>$${item.price}</p>
                  <p class="oldPrice">$${item.old_price}</p>
                </div>
              </div>
            </div>
`;
        saleItem.innerHTML += itemBox;
      }
    });
  }

  if (allItem) {
    items.forEach((item) => {
      let itemBox = `
      <div class="swiper-slide">
              <div class="product">
                <div class="itemIcons">
                  <i data-index='${item.id}' id='addedToCart' onclick='addToCart(${item.id},this)' class="fa-solid fa-cart-plus"></i>
                  <i class="fa-solid fa-heart"></i>
                  <i class="fa-solid fa-share"></i>
                </div>
              
                <div class="item-img">
                  <img src="${item.img}" alt="" />
                  <img
                    class="img-hover"
                    src="${item.img_hover}"
                    alt=""
                  />
                </div>
                <div class="item-desc">
                  <h4>
                    <a
                      >${item.name}</a
                    >
                  </h4>
                </div>

                <div class="StarsIcon">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </div>
                <div class="price">
                  <p>$${item.price}</p>
                </div>
              </div>
            </div>
`;
      allItem.innerHTML += itemBox;
    });
  }

  if (allItem2) {
    items.forEach((item) => {
      let itemBox = `
      <div class="swiper-slide">
              <div class="product">
                <div class="itemIcons">
                  <i data-index='${item.id}' id='addedToCart' onclick='addToCart(${item.id},this)' class="fa-solid fa-cart-plus"></i>
                  <i class="fa-solid fa-heart"></i>
                  <i class="fa-solid fa-share"></i>
                </div>
              
                <div class="item-img">
                  <img src="${item.img}" alt="" />
                  <img
                    class="img-hover"
                    src="${item.img_hover}"
                    alt=""
                  />
                </div>
                <div class="item-desc">
                  <h4>
                    <a
                      >${item.name}</a
                    >
                  </h4>
                </div>

                <div class="StarsIcon">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </div>
                <div class="price">
                  <p>$${item.price}</p>
                </div>
              </div>
            </div>
`;
      allItem2.innerHTML += itemBox;
    });
  }

  if (all_Items_Page) {
    items.forEach((item) => {
      let offerPercent = Math.floor(
        ((item.old_price - item.price) / item.old_price) * 100
      );
      let percentElement = item.old_price
        ? `<span class="offer"> ${offerPercent}% </span>`
        : "";

      let mainPrice = item.old_price
        ? `<p class="oldPrice">$${item.old_price}</p>`
        : "";
      let itemBox = `
  
              <div class="product">
                <div class="itemIcons">
                  <i data-index='${item.id}' id='addedToCart' onclick='addToCart(${item.id},this)' class="fa-solid fa-cart-plus"></i>
                  <i class="fa-solid fa-heart"></i>
                  <i class="fa-solid fa-share"></i>
                </div>
                ${percentElement}
                <div class="item-img">
                  <img src="${item.img}" alt="" />
                  <img
                    class="img-hover"
                    src="${item.img_hover}"
                    alt=""
                  />
                </div>
                <div class="item-desc">
                  <h4>
                    <a
                      >${item.name}</a
                    >
                  </h4>
                </div>

                <div class="StarsIcon">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </div>
                <div class="price">
                  <p>$${item.price}</p>
                  ${mainPrice}
                </div>
              </div>
           
`;
      all_Items_Page.innerHTML += itemBox;
    });
  }
}

// ------- Fetch & Display Sale Items -------

// -------  Add Item To Cart -------

function addToCart(index, btn) {
  let selectedItem = itemsList[index];
  let checkCart = itemsInCart.some((item) => item.id === selectedItem.id);
  let allItemsInPage = document.querySelectorAll(
    ".product .itemIcons .fa-cart-plus"
  );

  if (!checkCart) {
    {
      itemsInCart.push(selectedItem);
      sessionStorage.setItem("itemsInCart", JSON.stringify(itemsInCart));
      btn.classList.add("active");
      allItemsInPage.forEach((item) => {
        if (item.dataset.index == btn.dataset.index) {
          item.classList.add("active");
        }
      });

      itemsCartCount.innerHTML = itemsInCart.length;
      cartHead.innerHTML = `( ${itemsInCart.length} Item In Cart )`;
      //---------------
      displayInCart();

      //---------------

      // -------- calc Total ---------
      calcPrice(itemsInCart);
      // -------- calc Total ---------
    }
  }
}

function displayInCart() {
  let addedItem = ``;
  itemsInCart.forEach((item, currentIndx) => {
    addedItem += `
   <div data-selectedItemIndex='${item.id}' class="item">
           <img src="${item.img}" alt="" />
           <div class="item-info"><p class="item-desc">
               ${item.name}
             </p>
             <span class="price">$${item.price}</span>
           </div>
           <i onclick='removeItem(${currentIndx},this)' id='deleteItem' class="fa-solid fa-trash-can"></i>
         </div>
 `;
  });
  let cartBody = document.querySelector(".cart-body");
  cartBody.innerHTML = addedItem;
}
// -------  Add Item To Cart -------

// -------  Remove Item From Cart -------
function removeItem(indx, btn) {
  let selectedItemIndex = Number(btn.parentElement.dataset.selecteditemindex);
  let saleItemsDivs = document.querySelectorAll(
    ".product .itemIcons .fa-cart-plus"
  );

  saleItemsDivs.forEach((item) => {
    if (item.dataset.index == selectedItemIndex) {
      item.classList.remove("active");
    }
  });

  itemsInCart.splice(indx, 1);
  sessionStorage.setItem("itemsInCart", JSON.stringify(itemsInCart));
  itemsCartCount.innerHTML = itemsInCart.length;
  cartHead.innerHTML = `( ${itemsInCart.length} Item In Cart )`;
  displayInCart();
  // -------- calc Total ---------
  calcPrice(itemsInCart);
  // -------- calc Total ---------
}

// -------  Remove Item From Cart -------

// -------- calc Total ---------
function calcPrice(listOfItem) {
  let itemPrice = document.querySelector(
    ".head .cart-head .total-price .items-price"
  );
  let cartPrice = document.querySelector(".cart .cart-footer span");
  let total = 0;
  listOfItem.forEach((item) => {
    total += item.price;
  });
  if (itemPrice) {
    itemPrice.innerHTML = `$${total}`;
  }
  if (cartPrice) {
    cartPrice.innerHTML = `$${total}`;
  }
}
// -------- calc Total ---------

// ----- scroll to up -----
let goUpBtn = document.getElementById("goUP");
goUpBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
// ----- scroll to up -----

// (Show & Hide) Links Bar
let showMenu = document.getElementById("showMenu");
let closeMenu = document.getElementById("closeMenu");
let linksBar = document.getElementById("ulLinks");
let overlayForMenu = document.getElementById("overlayForMenu");

showMenu.onclick = () => {
  linksBar.classList.add("active");
  overlayForMenu.classList.add("active");
};
closeMenu.onclick = () => {
  linksBar.classList.remove("active");
  overlayForMenu.classList.remove("active");
};
overlayForMenu.onclick = () => {
  linksBar.classList.remove("active");
  overlayForMenu.classList.remove("active");
};

//------ item page ------
let itemImage = document.querySelector(".item-page .big-img img");
function changeItemImage(imgSrc) {
  itemImage.src = imgSrc;
}
//------ item page ------

// --------- all products ---------

if (window.location.href.includes("all-products.html")) {
  let filterBtn = document.getElementById("filterBtn");
  let filterBar = document.getElementById("filterBar");

  filterBtn.onclick = () => {
    filterBar.classList.toggle("active");
  };
}

// --------- all products ---------

// loading page (jquery)
$(document).ready(function () {
  $(".loader .spinner").animate({ opacity: "0" }, function () {
    $(".loader").animate({ opacity: "0" }, 500, function () {
      $(".loader").hide(10, function () {
        $("body").css("overflow", "auto");
      });
    });
  });
});
// loading page
