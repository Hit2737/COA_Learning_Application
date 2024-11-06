// Import the DLL and DLLNode from the files you already created
// import { DLL } from './DLL'; // Import DLL class
// import DLLNode from "./DLLNode.js";

// class FIFO_Cache {
//   constructor(capacity) {
//     dll.capacity = capacity;
//     dll.cache = new Map();
//     dll.dll = new DLL();  // Use the DLL class to manage the doubly linked list
//   }

//   // Method to put a key-value pair into the cache
//   put(key, value) {
//     if (dll.cache.has(key)) {
//       // If the key already exists, we don't do anything
//       return;
//     }

//     if (dll.cache.size === dll.capacity) {
//       // Cache is full, remove the least recently added item (head of DLL)
//       dll.removeHead();
//     }

//     const newNode = new DLLNode(key, value); // Create a new DLLNode
//     dll.dll.addNodeToTail(newNode); // Add the node to the tail (end) of the list
//     dll.cache.set(key, newNode); // Store it in the map
//   }

//   // Method to remove the head node from the doubly linked list
//   removeHead() {
//     if (!dll.dll.head) return; // If the list is empty, do nothing

//     const nodeToRemove = dll.dll.head;
//     dll.cache.delete(nodeToRemove.key); // Remove the node from the map
//     dll.dll.removeHead(); // Remove it from the doubly linked list
//   }

//   // Method to display the current state of the cache
//   display() {
//     let current = dll.dll.head;
//     let result = [];
//     while (current) {
//       result.push({ key: current.key, value: current.value });
//       current = current.next;
//     }
//     return result;
//   }
// }

// // Export FIFO_Cache class
// export default FIFO_Cache;

export function FIFO({dll, key, value, capacity}) {
  console.log(dll);
  function removeHead() {
    if (!dll.head) return;
    const nodeToRemove = dll.head;
    dll.head = dll.head.next;
    if (dll.head) dll.head.prev = null;
    if (nodeToRemove === dll.tail) dll.tail = null;
    dll.size--;
  }
  const put = () => {
        if (dll.size === capacity) {
            removeHead();
        }
        dll.addNode(key, value);
    };
    put();
    return dll;
}
