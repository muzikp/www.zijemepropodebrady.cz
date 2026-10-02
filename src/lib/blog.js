export function getPostAuthorPaths(post) {
	if (Array.isArray(post.authors)) {
		return post.authors.filter(Boolean);
	}

	return post.author ? [post.author] : [];
}
