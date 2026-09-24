import existingPosts from './blog.json';
import addedPosts from './blog-additions.json';

const addedPostsWithOverrides = addedPosts.map((post) =>
	post.id === 'rozhovor-pavel-louda'
		? { ...post, imageUrl: '/gallery/blog/rozhovor-pavel-louda-02.webp' }
		: post
);

export default [...addedPostsWithOverrides, ...existingPosts];
