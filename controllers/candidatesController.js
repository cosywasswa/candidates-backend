const Candidate = require("../models/candidate");

exports.fetchCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });
    if (!candidates.length) {
      return res.status(400).json({ message: "No candidates registered" });
    }
    return res.status(200).json({ success: true, data: candidates });
  } catch (error) {
    return res.status(500).json({ error: error?.message });
  }
};

exports.registerCandidate = async (req, res) => {
  const { name, email, contact, skills } = req.body;
  let candidateTier;
  let score = 0;
  try {
    if (!name || !email || !contact) {
      return res.status(401).json({ message: "Pliz provide all information" });
    }

    if (
      skills.includes("Knows HTML, CSS, and basic JavaScript") &&
      skills.includes("Has basic knowledge of Next.js or React")
    ) {
      score += 2;
    }
    if (
      skills.includes(
        "Can build a CRUD app with Next.js using server actions or API routes"
      ) &&
      skills.includes("Can work with databases")
    ) {
      score += 3;
    }
    if (
      skills.includes("Can build an authenticated CRUD app with Next.js") &&
      skills.includes("Can deploy applications") &&
      skills.includes(
        "Knows basics of Express/Hono OR has no knowledge of backend frameworks to build authenticated CRUD APIs"
      )
    ) {
      score += 5;
    }
    if (
      skills.includes(
        "Can build authenticated CRUD APIs with Express/Hono (with documentation)"
      ) ||
      skills.includes("OR can build authenticated CRUD apps with Laravel")
    ) {
      score += 7;
    }
    if (
      skills.includes("Proficient in Next.js, Express,Larvel and Hono") &&
      skills.includes("Knows Golang and can build simple APIs with Go")
    ) {
      score += 12;
    }
   if (score <= 2) candidateTier = 0;
    else if (score <= 5) candidateTier = 1;
    else if (score <= 10) candidateTier = 2;
    else if (score <= 17) candidateTier = 3;
    else if (score > 17) candidateTier = 4;

    const candidate = new Candidate({
      name,
      email,
      contact,
      skills,
      tier: candidateTier,
    });

    const newCandidate = await candidate.save();
    return res.status(201).json({ success: true, data: newCandidate });
  } catch (error) {
    return res.status(500).json({ error: error?.message });
  }
};

exports.getCandidate = async(req, res)=>{
    const _id = req.params._id
    try{
        const candidate = await Candidate.findById(_id)
        if(!candidate){
            return res.status(404).json({message: `Candidate with id ${_id} does not exist`})
        }
        return res.status(200).json({success: true, data: candidate})

    }catch(error){
        return res.status(500).json({message: error?.message})
    }
}
