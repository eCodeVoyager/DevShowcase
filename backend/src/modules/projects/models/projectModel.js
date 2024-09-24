const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    developer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    features: {
      type: [
        {
          title: String,
          description: String,
        },
      ],
    },
    tech_stack: {
      type: [String],
    },
    repo_url: {
      type: String,
    },
    live_url: {
      type: String,
    },
    images: {
      type: [String],
    },
    video: {
      type: String,
    },
    category: {
      type: String,
    },
    tags: {
      type: [String],
    },
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model("Project", ProjectSchema);
