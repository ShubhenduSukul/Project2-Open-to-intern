const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");


const isValid = function (value) {
  if (typeof value == undefined || value == null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const createIntern = async function (req, res) {
  try {
    const data = req.body;
    const { name, email, mobile } = data;

    if (Object.keys(data) == 0) 
    return res.status(400).send({ status: false, msg: " data is  missing" });
    
    const req0 = isValid(name);
    if (!req0)
     return res.status(400).send({ status: false, msg: " name is required" });
    
    const req1 = isValid(email);
    if (!req1) 
    return res.status(400).send({ status: false, msg: " email is required" });
    
    const req2 = isValid(mobile);
    if (!req2) 
    return res.status(400).send({ status: false, msg: " mobile number is required" });
    
    const isEmailAlreadyUsed = await internModel.findOne({ email });
       if (isEmailAlreadyUsed)
       return res.status(400).send({ status: false, msg: `${email} email is already used` });
        
       if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))
       return res.status(400).send({ status: false, msg: " email is invalid" });


    const isMobileAlreadyUsed = await internModel.findOne({ mobile });
      if (isMobileAlreadyUsed) 
      return res.status(400).send({ status: false, msg: `${mobile} mobile is already used` });
    
      if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile))
      return res.status(400).send({ status: false, msg: " mobile is invalid" });

    const saveData = await internModel.create(data);
    res.status(201).send({ status: "successful-response-structure", msg: saveData });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
const getCollegeDetails = async (req, res) => {
  try {
    const queryParams = req.query;
    const { name1 } = req.query;
    
    const input = isValid(queryParams);
      if (!input) 
      return res.status(400).send({ status: false, msg: " Invalid Input" });
    
       if (Object.keys(queryParams).length > 1) 
      return res.status(400).send({ status: false, message: "Invalid Input" });
    
      if (!name1) 
      return res.status(400).send({ status: false, message: "name Is Required" });
    
      if (name1.split(" ").length > 1) {
      return res.status(400).send({status: false, message: "please provide The Valid Abbreviation",
        });
    }

    const collegeNames = await collegeModel.findOne({ name: name1 });
    if (!collegeNames) {
      return res.status(404).send({ status: false, message: "College Not Found, Please Check College Name",
        });
    }

    const collegeId = collegeNames._id;
    const InternsInCollege = await internModel.find({ collegeId: collegeId }).select({ _id: 1, email: 1, name: 1, mobile: 1 });
    const { name, fullName, logoLink } = collegeNames;


    const finalData = {name: name,fullName: fullName,logoLink: logoLink,
      interns: InternsInCollege.length? InternsInCollege:{ message: "No one applied for internship in this college" },
    };

    return res .status(200).send({ status: true, message: "College Details", Data: finalData });
  } catch (err) {
    console.log("This is the error :", err.message);
    res.status(500).send({ msg: "Error", error: err.message });
  }
};

module.exports.createIntern = createIntern;
module.exports.getCollegeDetails = getCollegeDetails;