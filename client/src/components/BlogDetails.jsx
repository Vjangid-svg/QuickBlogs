import { useParams } from "react-router-dom";
import { blog_data, assets, comments_data } from "../assets/assets";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import Moment from "moment";
function BlogDetails() {
  const { id } = useParams();

  const blog = blog_data.find((item) => item._id === id);

  if (!blog) return <div>Blog not found.</div>;
  const [comments, setComments] = useState([]);
   const [name, setName] = useState("")
    const [content, setContent] = useState("")
  const fetchComments = async () => {
    setComments(comments_data);
  };
  const addComment = async (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <div className="relative">
      <Navbar />

      <div className="mt-[80px] text-center">
        <p className=" my-4  max-sm:text-xs text-primary">
          Published on May 28th 2025
        </p>
        <h1 className="text-[48px] font-medium leading-12">
          How to create an effective <br /> startup roadmap or ideas
        </h1>
        <p className=" my-4  max-sm:text-xs text-gray-500">
          Creating an effective strong startup roadmap
        </p>
        <button className="items-center  px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary">
          Michael Brown
        </button>
      </div>
      <div className="max-w-5xl mx-auto p-6">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-50vh object-cover rounded-4xl mb-6"
        />
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <div
          className="text-gray-700 space-y-4"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />
      </div>

      {/* comment */}
      <div className="mt-14 mb-10 max-w-3xl mx-auto">
        <p className="font-semibold mb-4">Comments ({comments.length})</p>
        <div className="flex flex-col gap-4">
          {comments.map((item, index) => (
            <div
              key={index}
              className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600"
            >
              <div className="flex items-center gap-2 mb-2">
                <img src={assets.user_icon} alt="" className="w-6" />
                <p className="font-medium">{item.name}</p>
              </div>
              <p className="text-sm max-w-md ml-8">{item.content}</p>
              <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                {Moment(item.createdAt).fromNow()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* add comment section */}
      <div className="max-w-3xl mx-auto">
        <p className="font-semibold mb-4">Add your comment</p>
        <form
          onSubmit={addComment}
          className="flex flex-col items-start gap-4 max-w-lg"
        >
          <input
          onChange={(e)=>setName(e.target.value)}
          value={name}
            type="text"
            placeholder="Name"
            required
            className="w-full p-2 border border-gray-300 rounded outline-none"
          />

          <textarea
           onChange={(e)=>setContent(e.target.value)}
          value={name}
            placeholder="Comment"
            className="w-full p-2 border border-gray-300 rounded outline-none h-48"
            required
          ></textarea>

          <button
            type="submit"
            className="bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Share Buttons */}
      <div className="my-24 max-w-3xl mx-auto">
        <p className="font-semibold my-4">Share this article on social media</p>
        <div className="flex">
          <img src={assets.facebook_icon} width={50} alt="" />
          <img src={assets.twitter_icon} width={50} alt="" />
          <img src={assets.googleplus_icon} width={50} alt="" />
        </div>
      </div>
      <Footer />

      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1 opacity-50"
      />
    </div>
  );
}

export default BlogDetails;
