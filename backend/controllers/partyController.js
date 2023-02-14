const PartyModel = require("../models/party");

const checkPartyBudget = (budget, services) => {
  const priceSum = services.reduce((sum, service) => sum + service.price, 0);

  if (priceSum > budget) {
    return false;
  }
  return true;
};

const partyController = {
  create: async (req, res) => {
    try {
      const party = {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        image: req.body.image,
        budget: req.body.budget,
        services: req.body.services,
      };
      if (party.services && !checkPartyBudget(party.budget, party.services)) {
        res.status(406).json({ msg: "Your budget is insufficient" });
        return;
      }
      const response = await PartyModel.create(party);

      res.status(201).json({ response, msg: "Successfully created party!!" });
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const parties = await PartyModel.find();
      res.json(parties);
    } catch (error) {
      console.log(error);
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;

      const party = await PartyModel.findById(id);

      if (!party) {
        res.status(404).json({ msg: "Party not found!" });
        return;
      }
      res.json(party);
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
    const party = await PartyModel.findById(id);
    if (!party) {
      res.status(404).json({ msg: "Party not found!" });
      return;
    }
    const deletedParty = await PartyModel.findByIdAndDelete(id);

    res.status(200).json({ deletedParty, msg: "Party deleted sucessfully!" });
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const party = {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        image: req.body.image,
        budget: req.body.budget,
        services: req.body.services,
      };
      if (party.services && !checkPartyBudget(party.budget, party.services)) {
        res.status(406).json({ msg: "Your budget is insufficient" });
        return;
      }
      const updatedParty = await PartyModel.findByIdAndUpdate(id, party);
      if (!updatedParty) {
        res.status(404).json({ msg: "Party not found!" });
        return;
      }

      res.status(200).json({ party, msg: "Party updated sucessfully!!" });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = partyController;
