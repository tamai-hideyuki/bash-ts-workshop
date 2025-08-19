function add(a: number, b: number): number {
    return a + b;
}

console.log(add(2, 3));

// 型定義
type User = {
    id: number;
    name: string;
};


function greet(user: User): string {
    return `Hello!, ${user.name}`;
}

const alice: User= { id: 1, name: "Alice" };
console.log(greet(alice));



// インターフェースを使ってみるともっと簡単に
interface User2 {
    id: number;
    name: string;
}

function greet2(user: User2): string {
    return `Hello!, ${user.name}`;
}
