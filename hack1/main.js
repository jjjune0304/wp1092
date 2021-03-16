// TODO:
let comment = document.querySelector('#comment-button');
let commentinput = document.querySelector('#comment-input');
let commentbox = document.querySelector('#comment-input-box');
let commentgroup = document.querySelector('#comment-group');
let commentnum = document.querySelector('#comment-num');
let count = 1;

function clickCommentBox() {
    // Youtube的留言區一開始是不會顯示「取消」和「留言」按鈕的，
    // 是按了輸入欄之後按鈕才會出現(在打字前就會出現)
    cancel.style.visibility = 'visible';
    comment.style.visibility = 'visible';
};

function detect() {
    // 在輸入欄打字，「留言」按鈕的背景色會變成#065fd4(藍色)。刪除輸入內容後，背景顏色變回#cccccc
    var c = commentinput.value;
    c = c.trim();
    if (c != "") {
        comment.style.backgroundColor = '#065fd4';
        comment.disabled = 'False';
    }
    else {
        console.log("empty");
        comment.style.backgroundColor = '#cccccc';
        comment.disabled = 'True';
    }
};

function clickComment(){
    // 請清空輸入欄的內容，並讓「留言」按鈕背景顏色變回#cccccc
    var c = commentinput.value;
    c = c.trim();
    if (c == "") {
        console.log("empty");
        return
    }
    commentinput.value = "";
    comment.style.backgroundColor = '#cccccc';
    // class="comment"的物件寫法複製一個一樣的物件，並把該物件中\<p\>內的文字改成輸入欄裡面的內容後，將該物件新增到id="comment-group"的\<div\>裡面。請注意以下幾點：
    // - 輸入欄內「沒有內容」或「只有空白」時，「留言」按鈕顏色仍是#cccccc，不會變成#065fd4。
    // - 輸入欄內「沒有內容」或「只有空白」時，「留言」按鈕的disabled屬性必須是true，也無法新增留言。
    // - 在輸入欄內輸入的字串，被顯示在留言區時會自動把字串頭尾的所有空白刪除，但如果是在非空白字元中間的空白則不予刪除。
    // - 新增留言後，「留言」和「取消」按鈕不會被隱藏
    var iDiv = document.createElement('div');
    iDiv.className = 'comment';
    iDiv.innerHTML = `
        <img class="comment-img" src="images/user-icon.jpg"/>
        <div class="comment-right">
            <div>
                <span class="comment-name">Toby Chen</span>
                <span class="comment-time">現在</span>
            </div>
            <p class="comment-text">${c}</p>
        </div>`;
    commentgroup.appendChild(iDiv);
    cancel.style.visibility = 'visible';
    comment.style.visibility = 'visible';
    count += 1;
    var s = count.toString();
    s += '則留言';
    commentnum.innerHTML= s;
}

let cancel = document.querySelector('#cancel-button');
function clickCancel() {
    // 按下「取消」按鈕後，清除輸入欄的內容並隱藏(不要移除)「取消」和「留言」按鈕
    commentinput.value = "";
    if (count == 1){
        cancel.style.visibility = 'hidden';
        comment.style.visibility = 'hidden';
        cancel.style.display = 'none';
        comment.style.display = 'none';
    }
}
