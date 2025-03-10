export class FIFOQueue {
    private maxSize: number;
    private queue: string[];

    constructor(maxSize: number = 10) {
        this.maxSize = maxSize;
        this.queue = [];
    }

    enqueue(message: string) {
        if (this.queue.length >= this.maxSize) {
            this.queue.shift();
        }
        this.queue.push(message);
    }

    dequeueOld(): string[] {
        return this.queue.splice(0, Math.floor(this.queue.length / 2)); // Remove half
    }

    getAllMessages(): string[] {
        return this.queue;
    }

    isFull(): boolean {
        return this.queue.length >= this.maxSize;
    }
}
