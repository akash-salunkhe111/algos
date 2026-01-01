function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;         // moves 1 step
    fast = fast.next.next;    // moves 2 steps

    if (slow === fast) {
      return true;            // cycle found
    }
  }

  return false;               // reached end = no cycle
}
