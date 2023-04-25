// 角色功能的相关信息

import { defineStore } from "pinia";

export const featureStore = defineStore("feature", {
  state: () => ({
    featureList: [],
    curFeature: {},
    tableData: [],
  }),
  actions: {
    setFeatureList(featureList) {
      this.featureList = featureList;
    },
    setCurFeature(curFeature) {
      this.curFeature = curFeature;
    },
    setTableData(tableData) {
      this.tableData = tableData;
    },
  },
});
