// Import the DLL and DLLNode from the files you already created
import { DLL } from './DLL'; // Import DLL class
import { DLLNode } from './DLLNode'; // Import DLLNode class

class FIFO_Cache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
    this.dll = new DLL();  // Use the DLL class to manage the doubly linked list
  }

  // Method to put a key-value pair into the cache
  put(key, value) {
    if (this.cache.has(key)) {
      // If the key already exists, we don't do anything
      return;
    }

    if (this.cache.size === this.capacity) {
      // Cache is full, remove the least recently added item (head of DLL)
      this.removeHead();
    }

    const newNode = new DLLNode(key, value); // Create a new DLLNode
    this.dll.addNodeToTail(newNode); // Add the node to the tail (end) of the list
    this.cache.set(key, newNode); // Store it in the map
  }

  // Method to remove the head node from the doubly linked list
  removeHead() {
    if (!this.dll.head) return; // If the list is empty, do nothing

    const nodeToRemove = this.dll.head;
    this.cache.delete(nodeToRemove.key); // Remove the node from the map
    this.dll.removeHead(); // Remove it from the doubly linked list
  }

  // Method to display the current state of the cache
  display() {
    let current = this.dll.head;
    let result = [];
    while (current) {
      result.push({ key: current.key, value: current.value });
      current = current.next;
    }
    return result;
  }
}

// Export FIFO_Cache class
export default FIFO_Cache;
