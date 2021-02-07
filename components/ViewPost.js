import fire from '../config/fire-config';
import { useState, useEffect } from 'react';
import Link from 'next/link';
const ViewPost = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
      fire.firestore()
        .collection('blog')
        .onSnapshot(snap => {
          const blogs = snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setBlogs(blogs);
        });
    }, []);
    console.log(blogs)
    return (
      <div >
        <h2>Blog Output</h2>
        <ul>
        {blogs.map(blog =>
          <li key={blog.id}>
              <Link href='/blog/[id]' as={'/blog/'+blog.id}>
              <a>  <b>Title</b>:{blog.title},<b>Content</b>:{blog.content}</a>
           </Link>
          </li>
         )}
        </ul>
      </div>
    )
  }
  export default ViewPost;