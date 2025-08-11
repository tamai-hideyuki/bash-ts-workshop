// 明示的に型宣言
const dogName: string = 'brew';
const age: number = 30;
const isActive: boolean = true;

const catName: string[] = ['ts', 'js', 'tsx', 'sh'];
const catAge: number[] = [5, 9, 10, 12];

const animal: { name: string; age: number; } = {
    name: 'ts',
    age: 10,
}

// const missAnimal: { name: string; age: number; } = {
//     name: ts,
//     age: '10',
//}

// 基本的には　const を使う
// 再起処理させたい時などはletを使う

console.log({ dogName, age, isActive, catName, catAge, animal });

//npx tsc でコンパイル （TS→JS） して、node dist/typescript/day2_types.js で実行
