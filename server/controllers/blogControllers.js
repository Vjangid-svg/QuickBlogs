import imagekit from "../configs/imageKit.js";
import Blog from "../models/blog.js";
import fs from "fs";
import Comment from "../models/comment.js";
import main from "../configs/gemini.js";
export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );
    const imageFile = req.file;

    // to check if all the fields are present
    if (!title || !subTitle || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Missing Required Fields" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload image to image kit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      // folder:"/sonu "
    });

    // Optimisation throu imagekit url transformation
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        {
          quality: "auto",
        },
        {
          format: "webp",
        },
        {
          width: "1280",
        },
      ],
    });

    const image = optimizedImageUrl;
    await Blog.create ({title,subTitle,description,category,image,isPublished})
    res.json({success:true,message:"Blog added Successfully!!"})
  } catch (error) {
    res.json({success:false,message:error.message})
  }

};
export const getAllBlogs = async (req,res)=>{
    try {
        const blogs = await Blog.find({isPublished:true})
        res.json({success:true,blogs})
    } catch (error) {
         res.json({success:false,message:error.message})
    }
}


export const getBlogById = async (req,res)=>{
    try {
        const {blogId}=req.params;
        const blog = await Blog.findById(blogId);
        if(!blog){
           return  res.json({success:false,message:"Blog  not found"})
        }
          res.json({success:true,blog})
    } catch (error) {
          res.json({success:false,message:error.message})
    }
}


export const deleteBlogById = async (req,res)=>{
    try {
        const {id}=req.body;
       await Blog.findByIdAndDelete(id);
// Delete all  comment assoscite with the blog
await Comment.deleteMany({blog:id});



          res.json({success:true,message:"Blog deleted successfully"})
    } catch (error) {
          res.json({success:false,message:error.message})
    }
}


export const togglePublish  = async (req,res)=>{
    try {
        const {id}=req.body;
        console.log("Toggle Blog ID:", id, "Type:", typeof id);
        const blog = await Blog.findById(id);
        if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
        blog.isPublished =!blog.isPublished;
        await blog.save();
          res.json({success:true,message:"Blog status Updated"})
    } catch (error) {
          res.json({success:false,message:error.message})
    }
}

export const addComment =async(req,res)=>{
    try {
        const{blog,name,content}=req.body;
        await Comment.create({blog,name,content})
        res.json({success:true,message:"Comment added for review"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
} 

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    if (!blogId) {
      return res.json({ success: false, message: "Missing blog ID" });
    }

    const comments = await Comment.find({
      blog: blogId,
      isApproved: true
    })
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const generateContent = async(req,res)=>{
try {
  const {prompt} = req.body;
const content =   await main(prompt + "Generate a blog content for this topic in simple text format")
  res.json({success:true,content})
} catch (error) {
   res.json({ success: false, message: error.message });
}
}