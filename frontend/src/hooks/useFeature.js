import { featuresApi } from "../api/featureApi";
export const useFeatures = () => {
  const features = () => {
    return JSON.parse(sessionStorage.getItem("features"));
  };
  const getFeatures = async () => {
    if (sessionStorage.getItem("features") !== null) return;
    await featuresApi
      .get()
      .then(({ data }) => {
        sessionStorage.setItem("features", JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return {
    getFeatures,
    features,
  };
};
