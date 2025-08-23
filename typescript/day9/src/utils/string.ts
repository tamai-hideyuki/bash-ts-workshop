export const trimMultiline = (s: string) =>
	s.split("\n").map((l) => l.trim()).join("\n");
 
