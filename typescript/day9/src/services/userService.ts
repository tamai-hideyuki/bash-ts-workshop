import type {User, UserId} from "../types";
import { toIso } from "../utils";

export function createUser(id: UserId, name: string): User {
	return { id, name, email: undefined };
}

export function formatUser(u: User) {
	return '[${toIso(new Date())} ${u.name}';
}

