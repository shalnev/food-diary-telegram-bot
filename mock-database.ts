export class MockDatabase {
    source: any[] = [];

    add(message: string | number) {
        this.source.push(message);
    }

    clearAll() {
        this.source.length = 0;
    }
}