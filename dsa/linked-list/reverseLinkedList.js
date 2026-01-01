// https://leetcode.com/problems/reverse-linked-list/


//   1 -> 2 -> 3
//   1 <- 2 <- 3
// p c    n


var reverseLinkedList = function(head) {
    let prev = null;
    let current = head;
    
    while(current !== null) {
        let next = current.next;  // store next
        current.next = prev;      // reverse link
        prev = current;           // move prev
        current = next;  
    }
    // return prev as prev will be head
    return prev;
};

// copy