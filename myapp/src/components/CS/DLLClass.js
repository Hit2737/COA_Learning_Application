export class DoublyLinkedListNode {
    constructor(addr, data) {
        this.data = data;
        this.prev = null;
        this.next = null;
        this.addr = addr;
        this.freq = 1;
    }
}

export const CacheMem = {};

export function ClearCache() {
    for (let key in CacheMem) {
        delete CacheMem[key];
    }
}


export class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
        this.maxSize = 5;
    }

    addNode(addr, data) {
        const newNode = new DoublyLinkedListNode(addr, data);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
        if (CacheMem[addr] === undefined) CacheMem[addr] = { data: data, freq: 1 };
    }

    insertBefore(addr, data, address, showAlert) {
        let current = this.head;
        while (current && current.addr !== address) {
            current = current.next;
        }
        if (!current) {
            showAlert(`Node with Address ${address} Not Found`, 'danger');
            return;
        }
        if (data === '') showAlert('Node Initialized with Empty Data', 'warning');
        const newNode = new DoublyLinkedListNode(addr, data);
        newNode.prev = current.prev;
        newNode.next = current;
        if (current.prev) current.prev.next = newNode;
        current.prev = newNode;
        if (current === this.head) this.head = newNode;
        this.size++;
    }

    deleteNode(addr, showAlert) {
        let current = this.head;
        while (current && current.addr !== addr) {
            current = current.next;
        }
        if (!current) {
            showAlert(`Node with Address ${addr} Not Found`, 'danger');
            return;
        }
        if (current.prev) current.prev.next = current.next;
        if (current.next) current.next.prev = current.prev;
        if (current === this.head) this.head = current.next;
        if (current === this.tail) this.tail = current.prev;
        this.size--;
        delete CacheMem[addr];
    }
    removeHead() {
        if (!this.head) {
            return;
        }
        delete CacheMem[this.head.addr];
        const nodeToRemove = this.head;
        this.head = this.head.next;
        if (this.head) this.head.prev = null;
        if (nodeToRemove === this.tail) this.tail = null;
        this.size--;
    }

    removeTail() {
        if (!this.tail) {
            return;
        }
        delete CacheMem[this.tail.addr];
        const nodeToRemove = this.tail;
        this.tail = this.tail.prev;
        if (this.tail) this.tail.next = null;
        if (nodeToRemove === this.head) this.head = null;
        this.size--;
    }

    tempRemoveNode(addr) {
        let nodeToRemove = this.head;
        while (nodeToRemove && nodeToRemove.addr !== addr) {
            nodeToRemove = nodeToRemove.next;
        }
        if (!nodeToRemove) return;
        if (nodeToRemove.prev) nodeToRemove.prev.next = nodeToRemove.next;
        if (nodeToRemove.next) nodeToRemove.next.prev = nodeToRemove.prev;
        if (nodeToRemove === this.head) this.head = nodeToRemove.next;
        if (nodeToRemove === this.tail) this.tail = nodeToRemove.prev;
        this.size--;
    }

    insertbasedonfreq(addr, data) {
        if (CacheMem[addr] === undefined) {
            CacheMem[addr] = { data: data, freq: 1 };
        } else {
            let x = CacheMem[addr].freq;
            CacheMem[addr] = { data: data, freq: x + 1 };
        }
        let current = this.head;
        while (current && CacheMem[current.addr]['freq'] <= CacheMem[addr]['freq']) {
            current = current.next;
        }
        if (!current) {
            this.addNode(addr, data);
            return;
        }
        let targetAddr = current.addr;
        this.insertBefore(addr, data, targetAddr);
    }

    toNodeArray() {
        const nodes = [];
        let current = this.head;
        while (current) {
            nodes.push(current);
            current = current.next;
        }
        return nodes;
    }
}