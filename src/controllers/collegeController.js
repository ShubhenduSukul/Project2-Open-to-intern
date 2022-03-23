const collegeModel = require("../models/collegeModel");

const isValid = function (value) {
  if (typeof value == undefined || value == null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const createCollege = async (req, res) => {
  try {
    let data = req.body;
    const { name, fullName, logoLink } = data;
    
    if (Object.keys(data) == 0) {
      return res.status(400).send({ status: false, msg: " Data is  missing" });
    }

    const input1 = isValid(name);
    if (!input1) {
      return res.status(400).send({ status: false, msg: " Name is required" });
    }

   
    const collegeval = name.split(" ");
    const len = collegeval.length;
    if (len > 1)
     {
      return res.status(400)
        .send({ status: false, msg: "Abbreviated college name should be in a single word, Please remove spaces",});
    }

    const input2 = isValid(fullName);
    if (!input2) 
    {
      return res.status(400).send({ status: false, msg: " FullName is required" });
    }

    const input3 = isValid(logoLink);
    if (!input3)
     {
      return res.status(400).send({ status: false, msg: " Logolink is required" });
     }

    const isNameAlreadyUsed = await collegeModel.findOne({ name });
    if (isNameAlreadyUsed) 
    {
      return res.status(400).send({ status: false, msg: "Name  is already used" });
    }

    const isFulllreadyUsed = await collegeModel.findOne({ fullName });
    if (isFulllreadyUsed) 
    {
      return res.status(400).send({ status: false, msg: "Fullname is already used" });
    }

    const isLogolinkreadyUsed = await collegeModel.findOne({ logoLink });
    if (isLogolinkreadyUsed) 
    {
      return res.status(400).send({ status: false, msg: "Logolink is already used" });
     }
   
    let saveData = await collegeModel.create(data);
    res.status(201).send({ status: true, msg: saveData });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};
module.exports.createCollege = createCollege;