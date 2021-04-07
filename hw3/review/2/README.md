## TodoApp裡有三種state
- TodoList Array
- 現在顯示狀態："All", "Completed", "Active"三種
- Todo的id counter

Input也有自己的state，於是放到container內

## 新增功能：
1. 選到不同顯示狀態的時候("All", "Completed", "Active")，會改變樣式，比較好辨識當前顯示的狀態
2. 清空時TodoList Array時會讓mode回到"All"的顯示狀態
