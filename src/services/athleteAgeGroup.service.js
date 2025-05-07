const AthleteAgeGroupModel = require("../models/athleteAgeGroup.model");

const AthleteAgeGroupService = {
  async getAthleteAgeGroups(athleteId) {
    return await AthleteAgeGroupModel.getByAthleteId(athleteId);
  },

  async addAgeGroupToAthlete(athleteId, ageGroupId) {
    // Check if athlete exists
    const athleteExists = await AthleteAgeGroupModel.checkAthleteExists(athleteId);
    if (!athleteExists) {
      throw new Error("Athlete not found");
    }

    // Check if age group exists
    const ageGroupExists = await AthleteAgeGroupModel.checkAgeGroupExists(ageGroupId);
    if (!ageGroupExists) {
      throw new Error("Age group not found");
    }

    return await AthleteAgeGroupModel.addAgeGroup(athleteId, ageGroupId);
  },

  async updateAthleteAgeGroups(athleteId, ageGroupIds) {
    // Check if athlete exists
    const athleteExists = await AthleteAgeGroupModel.checkAthleteExists(athleteId);
    if (!athleteExists) {
      throw new Error("Athlete not found");
    }

    // Check if all age groups exist
    for (const ageGroupId of ageGroupIds) {
      const ageGroupExists = await AthleteAgeGroupModel.checkAgeGroupExists(ageGroupId);
      if (!ageGroupExists) {
        throw new Error(`Age group with id ${ageGroupId} not found`);
      }
    }

    return await AthleteAgeGroupModel.updateAgeGroups(athleteId, ageGroupIds);
  },

  async removeAgeGroupFromAthlete(athleteId, ageGroupId) {
    // Check if athlete exists
    const athleteExists = await AthleteAgeGroupModel.checkAthleteExists(athleteId);
    if (!athleteExists) {
      throw new Error("Athlete not found");
    }

    // Check if age group exists
    const ageGroupExists = await AthleteAgeGroupModel.checkAgeGroupExists(ageGroupId);
    if (!ageGroupExists) {
      throw new Error("Age group not found");
    }

    return await AthleteAgeGroupModel.removeAgeGroup(athleteId, ageGroupId);
  },

  async addAgeGroupsToAthlete(athleteId, data) {
    // Check if athlete exists
    const athleteExists = await AthleteAgeGroupModel.checkAthleteExists(athleteId);
    if (!athleteExists) {
      throw new Error("Athlete not found");
    }

    // Check if all age groups exist
    for (const ageGroupId of data.age_group_ids) {
      const ageGroupExists = await AthleteAgeGroupModel.checkAgeGroupExists(ageGroupId);
      if (!ageGroupExists) {
        throw new Error(`Nhóm tuổi với id ${ageGroupId} không tồn tại`);
      }
    }

    return await AthleteAgeGroupModel.addAgeGroups(athleteId, data.age_group_ids);
  }
};

module.exports = AthleteAgeGroupService;