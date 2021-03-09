let loader = document.querySelector(".loader__wrapper"); 
// let loader = document.querySelector('#loader') // display loader
let display = document.querySelector('#display'); // display element
let next = document.querySelector('#next'); // next button element
let prev = document.querySelector('#previous'); // previous button element
let src = document.querySelector('#source_link') // source link element

img_idx = 0;
img_src = [
    "https://images.squarespace-cdn.com/content/v1/53788c8ee4b003ad465782ab/1584974954863-D57Y5W82ZF6A1X3KBSNN/ke17ZwdGBToddI8pDm48kKEe70UF8oKIO3wRkcdq3tB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0lCvyAd1-5UQFnp8aARaJsU8w50hfP6ECqf2LiXqlTgywEBlp1ZSpm6UHJZ6Jnwuow/NG_WLS3_BertieGregory_StillsRound2-1144.jpg",
    "https://images.squarespace-cdn.com/content/v1/53788c8ee4b003ad465782ab/1584952333407-TVGX39Z88IJ6M1Q3A9QM/ke17ZwdGBToddI8pDm48kHxZxf_Xn4ruQGusEty1PBB7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0h8vX1l9k24HMAg-S2AFienJw4Ox-It5JpONqKFNPQ8gt0KFeURZ4ITN5A3bzzonnA/NG_WLS3_BertieGregory_StillsRound2-1143.jpg",
    "https://images.squarespace-cdn.com/content/v1/53788c8ee4b003ad465782ab/1584879091717-G350VDHPC185GT5UV4MT/ke17ZwdGBToddI8pDm48kL1JskOfCAWzsz2n9srxq9J7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0mhydAgiKdIfeAoxVgE7c7pKrBF4dUolu_9oetKtpKrom3wq0E29XB4uUNZUDJsvAg/NG_WLS3_BertieGregory_StillsRound2-1055.jpg",
    "https://images.squarespace-cdn.com/content/v1/53788c8ee4b003ad465782ab/1584951554776-JQB93OHL3V37BFHAKL26/ke17ZwdGBToddI8pDm48kHzBafJC0eFlWeoAm3TjRit7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UY-O8G3UX4yoJ4gO600v2ojZFdIQvCklnKvRSapqyuSBCYgpLHhxItrwGEJnuBxvXQ/06_west_coast.jpg"
];
prev.classList.add("disabled"); // from start
display.src = img_src[img_idx];
src.href = img_src[img_idx];
src.textContent = img_src[img_idx];
checkLoad()

function nextPic() {
    if (next.classList.contains("disabled")) return;
    if (prev.classList.contains("disabled"))
        prev.classList.remove("disabled");
    img_idx++;
    if (img_idx == (img_src.length - 1)) {
        next.classList.add("disabled");
    }
    display.src = img_src[img_idx];
    src.href = img_src[img_idx];
    src.textContent = img_src[img_idx];
    checkLoad()
}

function prevPic() {
    if (prev.classList.contains("disabled")) return;
    if (next.classList.contains("disabled"))
        next.classList.remove("disabled");
    img_idx--;    
    if (img_idx == 0)
        prev.classList.add("disabled");
    display.src = img_src[img_idx];
    src.href = img_src[img_idx];
    src.textContent = img_src[img_idx];
    checkLoad()
}

function checkLoad() {
    setTimeout(function() {
        // check if the image is completely loaded
        if (display.complete) {
          loader.style.display = 'none';
          display.style.display = 'flex';
          console.log("done");
        } else {
          loader.style.display = 'flex';
          display.style.display = 'none';
          console.log("loading");
          checkLoad();
        }
      }, 100);
}
