const { NotImplementedError } = require('../lib/errors');
const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  constructor() {
    this.topPos = null;
    this.bottomPos = null;
  }

  enqueue(value) {
    const node = new ListNode(value);

    if (!this.bottomPos) {
      this.topPos = node;
      this.bottomPos = node;
    } else {
      this.bottomPos.next = node;
      this.bottomPos = node;
    }
  }

  dequeue() {
    if (!this.topPos) return undefined;

    const value = this.topPos.value;
    this.topPos = this.topPos.next;

    if (!this.topPos) this.bottomPos = null;

    return value;
  }

  _toPlain(node) {
    if (!node) return null;
    return {
      value: node.value,
      next: this._toPlain(node.next),
    };
  }

  getUnderlyingList() {
    return this._toPlain(this.topPos);
  }
}

module.exports = {
  Queue
};
