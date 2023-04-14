import React, { useEffect } from "react";
import { useFeatures } from "../../hooks/useFeature";
import { Feature } from "./Feature";

export const FeatureScreen = () => {
  const { getFeatures, features } = useFeatures();
  useEffect(() => {
    getFeatures();
  }, []);
  return (
    <>
      <main className="container">
        <section>
          <div>
            <h1>
              <strong>Know TakeNote</strong>
            </h1>
          </div>
          <div className="mt-4">
            <h4>The next features are currently available:</h4>
          </div>
        </section>
        <section>
          <ul className="d-flex flex-column feature-screen-container container  ">
            {features.map((item, idx) => {
              return (
                <>
                  <Feature
                    order={(idx + 1) % 2 === 0 ? "order-last" : "order-first"}
                    key={idx}
                    feature={item}
                    iconSize={"icon-xxl"}
                  />
                </>
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
};
