// Returns first element that matches CSS selector {expr}.
// Querying can optionally be restricted to {container}’s descendants
export function $(expr, container) {
	return typeof expr === 'string' ? (container || document).querySelector(expr) : expr || null;
}

// Returns all elements that match CSS selector {expr} as an array.
// Querying can optionally be restricted to {container}’s descendants
export function $$(expr, container) {
	return [].slice.call((container || document).querySelectorAll(expr));
}