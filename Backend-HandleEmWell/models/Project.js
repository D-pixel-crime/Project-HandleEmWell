import mongoose from "mongoose";

const ProjectSchema = mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Yet To Start", "On-Going", "Completed"],
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
});

export const ProjectSchemaModel = mongoose.model("Project", ProjectSchema);
