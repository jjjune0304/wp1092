// declare array for image
let img_array = new Array();
let current_img_number = 0;

// insert the various images into the array
img_array[0] = "https://i.imgur.com/BTNIDBR.gif";
img_array[1] = "https://i.imgur.com/lWKVVgh.gif";
img_array[2] = "https://i.imgur.com/Eg1eFN9.gif";


// get the image by the id 
let image = document.getElementById("display");
image.src = img_array[current_img_number];

// update link to the document
let source_span = document.getElementById("source-span");
let source = "Source: <a href=\"" + img_array[current_img_number] + "\">" + img_array[current_img_number] + "</a>";
source_span.innerHTML = source;


function change_img(change_by) {
    /**
     * change_by (int) :the amount of change through the array
     */

    // check if the change is within the array
    if (typeof img_array[current_img_number + change_by] !== 'undefined') {
        // change the disabled option to not disabled
        let button = '';

        if (change_by > 0) {
            button = document.getElementById("previous");
        } else if (change_by < 0) {
            button = document.getElementById("next");
        }
        button.classList.remove("disabled");
    } else {
        return ; // early exit
    }

    // update link and image
    current_img_number = current_img_number + change_by;
    update_link(current_img_number);
    update_img(current_img_number);

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

function loading_image_gif() {
    // load the loading image gif
    let image = document.getElementById("display");
    image.src = "images/loading.gif";
}

function update_link(img_number) {
    // update link to the document
    let source_span = document.getElementById("source-span");
    let source = "Source: <a href=\"" + img_array[img_number] + "\">" + img_array[img_number] + "</a>";
    source_span.innerHTML = source;
}

function update_img(img_number) {
    // update image
    image = document.getElementById("display");
    image.src = img_array[img_number];
}

function disable_the_button(button) {
    button.classList.add("disabled");
}