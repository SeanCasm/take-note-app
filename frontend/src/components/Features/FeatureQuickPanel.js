import React, { useEffect } from "react";
import { useFeatures } from "../../hooks/useFeature";
import { Feature } from "./Feature";

export const FeatureQuickPanel = () => {
  const { getFeatures, features } = useFeatures();
  useEffect(() => {
    getFeatures();
  }, []);
  return (
    <section className="feature-card-container">
      <div className="container">
        <ul className="row justify-content-center align-items-center">
          {features.map((item) => {
            return (
              <>
                <Feature
                  key={item.title}
                  feature={item}
                  displayOverview={true}
                />
              </>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
