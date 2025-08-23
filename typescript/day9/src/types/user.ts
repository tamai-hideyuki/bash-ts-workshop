// 型だけ
export type UserId = `${string}-${string}-${string}-${string}-${string}`;

export interface User {
	id: UserId;
	name: string;
	email?: string;
}

