"use strict";
//fetchでAPIを取得
async function fetchData() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const data = await response.json();
    console.log(data);
}
//try catchでエラー処理
async function errorHandling() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        if (!response.ok) {
            throw new Error('Bad Request: ${response.status}');
        }
        const data = await response.json();
        console.log('SUCCESS:', data);
    }
    catch (error) {
        console.error('ERROR:', error);
    }
}
errorHandling();
//Promise.all で並列実行
async function promiseFetch() {
    try {
        const urls = [
            "https://jsonplaceholder.typicode.com/posts/1",
            "https://jsonplaceholder.typicode.com/posts/2",
            "https://jsonplaceholder.typicode.com/posts/3",
        ];
        const response = await Promise.all(urls.map((url) => fetch(url)));
        const data = await Promise.all(response.map((response) => response.json()));
        console.log("ALL SUCCESS:", data);
    }
    catch (error) {
        console.error("ERROR:", error);
    }
}
promiseFetch();
//# sourceMappingURL=day7_async.js.map