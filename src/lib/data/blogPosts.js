import existingPosts from './blog.json';
import addedPosts from './blog-additions.json';
import latestPosts from './blog-latest.json';
import priorityPosts from './blog-priority.json';

const priorityPostsWithLists = priorityPosts.map((post) =>
	post.id === 'zizkov-cast-podebrad-ktera-potrebuje-vetsi-pozornost'
		? {
				...post,
				textHtml: post.textHtml.replace(
					/((?:<li>[\s\S]*?<\/li>)+)/,
					'<ul>$1</ul>'
				)
			}
		: post
);

const addedPostsWithOverrides = addedPosts.map((post) =>
	post.id === 'rozhovor-pavel-louda'
		? { ...post, imageUrl: '/gallery/blog/rozhovor-pavel-louda-02.webp' }
		: post
);

function normalizeStandaloneStrongParagraphs(post) {
	return {
		...post,
		textHtml: post.textHtml.replace(
			/<p>\s*<strong>([^<]*)<\/strong>\s*<\/p>/g,
			'<h2><strong>$1</strong></h2>'
		)
	};
}

export default [...priorityPostsWithLists, ...latestPosts, ...addedPostsWithOverrides, ...existingPosts].map(
	normalizeStandaloneStrongParagraphs
);
