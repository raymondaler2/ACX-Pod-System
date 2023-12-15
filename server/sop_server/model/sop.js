const mongoose = require("mongoose");
const ServiceTag = require("./sopServiceTag");

const sopSchema = mongoose.Schema(
  {
    featured: {
      type: Boolean,
      default: false,
    },
    sop_title: {
      type: String,
      required: [true, "Please enter an SOP Title"],
    },
    service_tag: {
      type: String,
      required: [true, "Please enter a Service Tag"],
      ref: ServiceTag,
    },
    sop_description: {
      type: String,
      required: [true, "Please enter an SOP Description"],
    },
    user_id: {
      type: String,
      required: [true, "Please enter user_id"],
    },
    milestones: {
      type: [
        {
          milestone_title: {
            type: String,
            required: [true, "Please enter a Milestone Title"],
          },
          milestone_description: {
            type: String,
            required: [true, "Please enter a Milestone Description"],
          },
          checklist: {
            type: [
              {
                checklist_title: {
                  type: String,
                  required: [true, "Please enter a Checklist Title"],
                },
                checklist_status: {
                  required: [true, "Please enter a Checklist Status"],
                  type: Boolean,
                  default: false,
                },
              },
            ],
            required: [true, "Please enter atleast one Checklist"],
          },
        },
      ],
      required: [true, "Please enter atleast one Milestone"],
    },
    comments: {
      type: [
        {
          content: {
            type: String,
          },
          user_id: {
            type: String,
          },
          time: {
            type: Date,
            default: Date.now,
          },
          likes: {
            type: [String],
            default: [],
          },
          replies: {
            type: [
              {
                content: {
                  type: String,
                },
                user_id: {
                  type: String,
                },
                likes: {
                  type: [String],
                  default: [],
                },
                time: {
                  type: Date,
                  default: Date.now,
                },
              },
            ],
            default: [],
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Sop = mongoose.model("Sop", sopSchema);
module.exports = Sop;
