# HW2

- the image is stored in this array

```js
let img_array = new Array();

...

// insert the various images into the array
img_array[0] = "https://i.imgur.com/BTNIDBR.gif";
img_array[1] = "https://i.imgur.com/lWKVVgh.gif";
img_array[2] = "https://i.imgur.com/Eg1eFN9.gif";
```

- the switching picture functionality is done through `change_img(change_by)`, with `change_by` (int) being the amount of change, within the button `onclick`, I define as adding or subtracting 1

```html
<img src="images/next.png" id="next" onclick="change_img(1);">
```

- the disabled functionality is done through adding a class to the image

```js
function disable_the_button(button) {
    button.classList.add("disabled");
}
```

- removing the disabled class is done within the `change_img()` function, there's probably a more elegant way to do this but I'm lazy to think too hard about it

```js
function change_img(change_by) {
    ...

    // update button disabled status
    if (typeof img_array[current_img_number + 1] === 'undefined') {
        let next_button = document.getElementById("next");
        disable_the_button(next_button);
    } 
    if (typeof img_array[current_img_number - 1] === 'undefined') {
        let previous_button = document.getElementById("previous");
        disable_the_button(previous_button);
    }
}
```

- I did not implement the loading gif functionality because somehow `setTimeout()` does not work for me -> thus the image loading too fast and the loading gif does not show up