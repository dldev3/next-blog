import Head from 'next/head'
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Dev Blog</title>
      </Head>
      <div className="posts">
        {posts.map((post, index) => (
          <h3>{post.frontmatter.title}</h3>
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  // get files from the post directory
  const files = fs.readdirSync(path.join('posts'))


  //get slug and frontmatter from posts
  const posts = files.map((filename) => {
    //create slug
    const slug = filename.replace('.md', '')

    //get frontmatter
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')

    const { data: frontmatter } = matter(markdownWithMeta)

    return {
      slug,
      frontmatter
    }
  })

  console.log(posts);

  return {
    props: {
      posts
    }
  }
}