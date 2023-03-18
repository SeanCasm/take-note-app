import { useState } from "react";
import { featuresApi } from "../api/featureApi";
export const useFeatures = () => {
  const [features, setFeatures] = useState([]);
  const getFeatures = async () => {
    await featuresApi
      .get()
      .then(({ data }) => {
        setFeatures(data);
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
