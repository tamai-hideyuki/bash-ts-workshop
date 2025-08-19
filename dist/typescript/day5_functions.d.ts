declare function add(a: number, b: number): number;
type User = {
    id: number;
    name: string;
};
declare function greet(user: User): string;
declare const alice: User;
interface User2 {
    id: number;
    name: string;
}
declare function greet2(user: User2): string;
