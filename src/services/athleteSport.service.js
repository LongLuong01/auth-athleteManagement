const AthleteSpotModel = require("../models/athleteSport.model");

const AthleteSpotService = {
  async getAthleteSports(athleteId) {
    return await AthleteSpotModel.getByAthleteId(athleteId);
  },

  async getAthletesBySport(sportId) {
    return await AthleteSpotModel.getBySportId(sportId);
  },

  async addSportToAthlete(athleteId, sportId) {
    // Check if athlete exists
    const athleteExists = await AthleteSpotModel.checkAthleteExists(athleteId);
    if (!athleteExists) {
      throw new Error("Athlete not found");
    }

    // Check if sport exists
    const sportExists = await AthleteSpotModel.checkSportExists(sportId);
    if (!sportExists) {
      throw new Error("Sport not found");
    }

    return await AthleteSpotModel.addSport(athleteId, sportId);
  },

  async updateAthleteSports(athleteId, sportIds) {
    // Check if athlete exists
    const athleteExists = await AthleteSpotModel.checkAthleteExists(athleteId);
    if (!athleteExists) {
      throw new Error("Athlete not found");
    }

    // Check if all sports exist
    for (const sportId of sportIds) {
      const sportExists = await AthleteSpotModel.checkSportExists(sportId);
      if (!sportExists) {
        throw new Error(`Sport with id ${sportId} not found`);
      }
    }

    return await AthleteSpotModel.updateSports(athleteId, sportIds);
  },

  async removeSportFromAthlete(athleteId, sportId) {
    // Check if athlete exists
    const athleteExists = await AthleteSpotModel.checkAthleteExists(athleteId);
    if (!athleteExists) {
      throw new Error("Athlete not found");
    }

    // Check if sport exists
    const sportExists = await AthleteSpotModel.checkSportExists(sportId);
    if (!sportExists) {
      throw new Error("Sport not found");
    }

    return await AthleteSpotModel.removeSport(athleteId, sportId);
  }
};

module.exports = AthleteSpotService;