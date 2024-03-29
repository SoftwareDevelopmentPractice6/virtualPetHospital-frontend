// 病例详情的相关信息

import { defineStore } from "pinia";

export const caseStore = defineStore("case", {
  state: () => ({
    diseaseName: "",
    diseaseId: "",
    diseaseCategory: "",
    videos: [],
  }),
  actions: {
    setName(diseaseName) {
      this.diseaseName = diseaseName;
    },
    setId(diseaseId) {
      this.diseaseId = diseaseId;
    },
    setCategory(diseaseCategory) {
      this.diseaseCategory = diseaseCategory;
    },
    setVideos(videos) {
      this.videos = videos;
    },
  },
});
