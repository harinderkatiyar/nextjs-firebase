import { useEffect, useState } from 'react';
import fire from '../../config/fire-config';
import Link from 'next/link';

const Blog = (props) => {

    //const [blog, setBlog] = useState(null);
    // useEffect(() => {
    //   fire.firestore()
    //     .collection('blog')
    //     .doc(props.id)
    //     .get()
    //     .then(result => {
    //       setBlog(result.data())
    //     })
    // }, []);

    if(!props){
      return(
        <h2>Loading...</h2>
      )
    }
    return (
      <div className="div">
        <h2>View Blog Output</h2>
        <b>Title:</b>{props.title}
        <p>
        <b>Content:</b>{props.content}
        </p>
        <Link href="/">
          <button>Back</button>
        </Link>
      </div>
    )
  }
//   Blog.getInitialProps = ({ query }) => {
//     return {
//         id: query.id,
//     }
//   }
export const getServerSideProps = async ({ query }) => {
    const content = {}
    await fire.firestore()
      .collection('blog')
      .doc(query.id)
      .get()
      .then(result => {
        content['title'] = result.data().title;
        content['content'] = result.data().content;
      });
  return {
      props: {
        title: content.title,
        content: content.content,
      }
    }
  }
  export default Blog