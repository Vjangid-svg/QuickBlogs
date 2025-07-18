import React, { useState } from "react";
// import { blog_data } from "../assets/assets";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
function BlogList() {
  const blogCategories = [
    "All",
    "Technology",
    "Startup",
    "Lifestyle",
    "Finance",
  ];
  // const data = blog_data;
  const [menu, setMenu] = useState("All");
  const { blogs=[], input } = useAppContext();

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(input.toLowerCase()) ||
      blog.category.toLowerCase().includes(input.toLowerCase());

    const matchesCategory =
      menu === "All" || blog.category?.toLowerCase() === menu.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // const [filterData, setFilterData] = useState(blogs);

  // const filterFood = (category) => {
  //   // console.log(data);
  //   if (category === "All") {
  //     setFilterData(blogs);
  //     //  setSelectedBtn("all");
  //     return;
  //   }
  //   const filter = blogs.filter(
  //     (item) => item.category?.toLowerCase() === category.toLowerCase()
  //   );
  //   setFilterData(filter);
  //   //  setSelectedBtn(type);
  // };

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 my-10 relative ">
        {blogCategories.map((item) => (
          <div key={item} className="text-gray-500 ">
            <button
              onClick={() => {
                setMenu(item);
                // filterFood(item);
              }}
              className={` cursor-pointer text-gray  px-4 py-1 ${
                menu === item &&
                "text-white transition-all duration-500 ease-in-out bg-primary rounded-full "
              }`}
            >
              {item}
            </button>
          </div>
        ))}
      </div>
      {/* Blog-card */}

      <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8 sm:mx-28 mx-10 mb-16 ">
        {filteredBlogs?.map((blog) => (
          <Link to={`/blog/${blog._id}`} key={blog._id}>
            <div
              key={blog._id}
              className="max-w-[300px] h-[400px]  rounded-lg overflow-hidden shadow-md bg-white hover:scale-102 transition-transform duration-300"
            >
              <img
                src={blog.image}
                alt="Blog"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className=" px-6 py-1.span border border-primary/40 bg-primary/10 rounded-full text-sm text-primary">
                  {blog.category}
                </span>
                <h3 className="text-xl font-semibold  my-2">{blog.title}</h3>
                <p className="text-sm text-gray-500">
                  {blog.description?.slice(0, 100)}...
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
