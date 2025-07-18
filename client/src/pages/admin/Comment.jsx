import React, { useEffect, useState } from "react";
import { comments_data } from "../../assets/assets";
import CommentTable from "../../components/admin/CommentTable";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Comment = () => {
  const baseButton =
    "shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs transition-colors duration-200";

  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");

  const { axios } = useAppContext();
  const fetchComments = async () => {
    try {
      const { data } = await axios.get("/api/admin/comments");
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="flex-1 pt-5 px-4 sm:px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <div className="flex  justify-between items-center max-w-3xl">
        <h1>Comments</h1>
        <div className=" flex sm:flex-row flex-col gap-4  ">
          <button
            onClick={() => setFilter("Approved")}
            className={`${baseButton} ${
              filter === "Approved"
                ? "text-primary bg-blue-100"
                : "text-gray-700"
            }`}
          >
            Approved
          </button>

          <button
            onClick={() => setFilter("Not Approved")}
            className={`${baseButton} ${
              filter === "Not Approved"
                ? "text-primary bg-blue-100"
                : "text-gray-700"
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>
      <div className="relative h-4/5 w-full  sm:max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 text-left uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Blog Title & Comment
              </th>
              <th scope="col" className="px-6 py-3 hidden sm:table-cell">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {comments
              .filter((comment) => {
                if (filter === "Approved") return comment.isApproved === true;
                return comment.isApproved === false;
              })
              .map((comment, index) => (
                <CommentTable
                  key={comment.__id}
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comment;
