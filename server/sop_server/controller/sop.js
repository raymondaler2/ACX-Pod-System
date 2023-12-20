const Sop = require("./../model/sop");
const ServiceTag = require("./../model/sopServiceTag");
const asyncHandler = require("express-async-handler");

const addSop = asyncHandler(async (req, res) => {
  try {
    const { service_tag, ...sopData } = req.body;

    let existingServiceTag = await ServiceTag.findOne({ service_tag });

    if (!existingServiceTag) {
      existingServiceTag = await ServiceTag.create({ service_tag });
    }

    const sop = await Sop.create({
      ...sopData,
      service_tag: existingServiceTag._id,
    });

    res.status(200).json(sop);
  } catch (error) {
    res.status(500).json(`Add Sop ERROR: ${error}`);
    console.error(`Add Sop ERROR: ${error}`);
  }
});

const getAllSop = asyncHandler(async (req, res) => {
  try {
    const sops = await Sop.find().populate("service_tag", "service_tag");

    const formattedSops = sops.map((sop) => ({
      ...sop.toObject(),
      service_tag: sop.service_tag.service_tag,
    }));

    res.status(200).json(formattedSops);
  } catch (error) {
    res.status(500).json(`Get All Sop ERROR: ${error}`);
    console.error(`Get All Sop ERROR: ${error}`);
  }
});

const deleteSop = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const sop = await Sop.findByIdAndDelete(id, req);
    if (!sop) {
      res.status(404).json(`Delete SOP ERORR: SOP with ID ${id} not found`);
      console.error(`Delete SOP ERORR: SOP with ID ${id} not found`);
    }
    res.status(200).json(sop);
  } catch (error) {
    res.status(500).json(`Delete SOP ERORR: ${error}`);
    console.error(`Delete SOP ERORR: ${error}`);
  }
});

const getAllSopIDs = asyncHandler(async (req, res) => {
  try {
    const sops = await Sop.find({}, { _id: 1 });
    res.status(200).json(sops);
  } catch (error) {
    res.status(500).json(`Get All SOP IDs ERROR:  ${error}`);
    console.error(`Get All SOP IDs ERROR:  ${error}`);
  }
});

const getSopById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const sop = await Sop.findById(id).populate("service_tag", "service_tag");

    if (!sop) {
      res.status(404).json(`Get SOP by Id ERROR: SOP with ID ${id} not found`);
      console.error(`Get SOP by Id ERROR: SOP with ID ${id} not found`);
      return;
    }

    const formattedSop = {
      ...sop.toObject(),
      service_tag: sop.service_tag.service_tag,
    };

    res.status(200).json(formattedSop);
  } catch (error) {
    res.status(500).json(`Get SOP by Id ERROR: ${error}`);
    console.error(`Get SOP by Id ERROR: ${error}`);
  }
});

const updateSop = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const sop = await Sop.findById(id);
    if (!sop) {
      res.status(404).json(`Update SOP ERROR: SOP with ID ${id} not found`);
      console.error(`Update SOP ERROR: SOP with ID ${id} not found`);
    }

    if (req.body.service_tag) {
      let existingServiceTag = await ServiceTag.findOne({
        service_tag: req.body.service_tag,
      });

      if (!existingServiceTag) {
        existingServiceTag = await ServiceTag.create({
          service_tag: req.body.service_tag,
        });
      }

      req.body.service_tag = existingServiceTag._id;
    }

    const updatedSop = await Sop.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("service_tag", "service_tag");

    const formattedSop = {
      ...updatedSop.toObject(),
      service_tag: updatedSop.service_tag.service_tag,
    };

    res.status(200).json(formattedSop);
  } catch (error) {
    res.status(500).json(`Update SOP ERROR: ${error}`);
    console.error(`Update SOP ERROR: ${error}`);
  }
});

module.exports = {
  updateSop,
  getSopById,
  getAllSopIDs,
  addSop,
  getAllSop,
  deleteSop,
};
