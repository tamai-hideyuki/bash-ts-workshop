import { createUser, formatUser} from "./services/userService"
import type { User } from "./types"

const u:User = createUser(
	"550e8400-e29b-41d4-a716-446655440000",
	"Taro"
);
console.log(formatUser(u));)

