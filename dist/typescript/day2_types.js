"use strict";
// 明示的に型宣言
const dogName = 'brew';
const age = 30;
const isActive = true;
const catName = ['ts', 'js', 'tsx', 'sh'];
const catAge = [5, 9, 10, 12];
const animal = {
    name: 'ts',
    age: 10,
};
// const missAnimal: { name: string; age: number; } = {
//     name: ts,
//     age: '10',
//}
// 基本的には　const を使う
// 再起処理させたい時などはletを使う
console.log({ dogName, age, isActive, catName, catAge, animal });
//# sourceMappingURL=day2_types.js.map