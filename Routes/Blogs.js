const express = require("express");
const blogModel = require("../Models/Blogs");
const router = express.Router();

// POST : Add a Blog (/v1/blogs/addblog)
router.post('/addblog', async (req, res) => {
    
    try {
        const { blogTitle, blogDescription, blogImage } = req.body;
        if (!blogTitle || !blogDescription) {
          return res.status(409).json({
            success: false,
            message: "Empty Title or Description.",
          });
        }

        let addingBlog = await blogModel.create({ blogTitle, blogDescription, blogImage,});

        if (!addingBlog) {
          return res.status(409).json({
            success: false,
            message: "Error adding blog.",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Blog added successfully!"
        });

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Internal Error."
        })
    }

});

// GET : Fetch all Blogs (/v1/blogs/getblogs)
router.get('/getblogs', async (req, res) => {

    try {
        
        const allBlogs = await blogModel.find({});

        return res.status(200).json({
            success : true,
            message : "Fetched all blogs successfully!",
            total : allBlogs.length,
            blogs : allBlogs
        });

    } catch (error) {
        return res.status(500).json({
          success: false,
          message: `Internal Error.`,
        });
    }

});

// GET : Fetch single Blog (/v1/blogs/getblog/:id)
router.get('/getblog/:id', async (req, res) => {
    try {

        let { id } = req.params;
        const aBlog = await blogModel.find({ _id: id });
        
        if (aBlog.length === 0) {
          return res.status(404).json({
            success: false,
            message: "Blog not found.",
          });
        }

        return res.status(200).json({
            success : true,
            blog : aBlog
        })

    } catch (error) {
        return res.status(500).json({
          success: false,
          message: `Internal Error.`,
          error
        });
    }
})

// DELETE : Delete a Blog (/v1/blogs/deleteblog/:id)
router.delete('/deleteblog/:id', async (req, res) => {

    try {
        let {id} = req.params;
        const isBlogExists = await blogModel.find({_id : id});

        if (isBlogExists.length === 0) {
            return res.status(404).json({
                success : false,
                message : "Blog not found."
            });
        }

        await blogModel.findByIdAndDelete(id, {new : true});

        return res.status(200).json({
            success : true,
            message : `Blog deleted successfully!`
        })

    } catch (error) {
        return res.status(500).json({
          success: false,
          message: `Internal Error. ${error}`,
        });
    }

});

// PATCH : Edit a Blog (/v1/blogs/editblog/:id)
router.patch('/editblog/:id', async (req, res) => {

    try {
        const {id} = req.params;
        const {updateTitle, updateDesc, updateImage} = req.body;
        
        const isBlogExists = await blogModel.find({_id : id});

        if (isBlogExists.length === 0) {
            return res.status(404).json({
                success : false,
                message : "Blog not found."
            });
        }

        let updateBlogDetails = {};

        if (updateTitle) {updateBlogDetails.blogTitle = updateTitle};
        if (updateDesc) {updateBlogDetails.blogDescription = updateDesc};
        if (updateImage) {updateBlogDetails.blogImage = updateImage};

        await blogModel.findByIdAndUpdate(id, {$set : updateBlogDetails}, {new : true});

        return res.status(200).json({
            success : true,
            message : 'Blog edited successfully!'
        })
        
    } catch (error) {
        return res.status(500).json({
          success: false,
          message: `Internal Error. ${error}`,
        });
    }

});

module.exports = router;