const { getAllPosts } = require('./src/mdx');

async function testBlogEngine() {
  try {
    console.log('Testing blog engine...');
    
    const posts = await getAllPosts({
      showOn: 'krunalsabnis',
      baseDir: process.cwd(),
      contentDirs: ['../sites/krunalsabnis/content/blog']
    });

    console.log(`Found ${posts.length} posts:`);
    posts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title} (${post.slug})`);
      console.log(`   - Image: ${post.image || 'none'}`);
      console.log(`   - Tags: ${post.tags ? post.tags.join(', ') : 'none'}`);
      console.log(`   - Date: ${post.date}`);
      console.log('');
    });

    // Test serialization
    const serialized = JSON.stringify(posts, null, 2);
    console.log('✅ Posts can be serialized successfully');
    
  } catch (error) {
    console.error('❌ Error testing blog engine:', error);
  }
}

testBlogEngine(); 