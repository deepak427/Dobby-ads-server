import folder from "../models/folder.js";

export const addFolder = async (req, res) => {
  const { _id, name } = req.body;

  try {
    const existingFolder = await folder.findOne({ _id });
    if (!existingFolder) {
      return res
        .status(404)
        .json({ error: true, message: "Folder don't exist" });
    }

    const newFolder = await folder.create({ name });

    await folder.findOneAndUpdate(
      { _id },
      { $push: { child: newFolder._id, childName: name } },
      { new: true }
    );

    res.status(200).json({ error: false, result: newFolder });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

export const addImage = async (req, res) => {
  const { _id, name, imageUrl } = req.body;

  try {
    const existingFolder = await folder.findOne({ _id });
    if (!existingFolder) {
      return res
        .status(404)
        .json({ error: true, message: "Folder don't exist" });
    }

    const newFolder = await folder.findOneAndUpdate(
      { _id },
      { $push: { images: imageUrl, imagesName: name } },
      { new: true }
    );

    res.status(200).json({ error: false, result: newFolder });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

export const getFolder = async (req, res) => {
  const { _id } = req.body;

  try {
    const existingFolder = await folder.findOne({ _id });
    if (!existingFolder) {
      return res
        .status(404)
        .json({ error: true, message: "Folder don't exist" });
    }

    res.status(200).json({ error: false, result: existingFolder });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
