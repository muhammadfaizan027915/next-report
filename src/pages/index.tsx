import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);

  //Want to cache data for 2 minutes and after 2 minuites on reload 
  // fetch api should revalidate updated data from the server. 

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      cache: "force-cache",
      next: { revalidate: 120 },
    })
      .then((response) => response.json())
      .then((json) => setPosts(json));
  }, []);

  // maping the posts here
  // Fine data has been cached and comming from disk cache, but ...
  // after 2 minutes let's see it revalidates or not on reload.

  // After 2 minutes I have fetched the data but still form disk caches, no revalidation after 2 mins
  return (
    <>
      <h1>Posts</h1>
      {posts.map((post: any) => (
        <>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </>
      ))}
    </>
  );
}
