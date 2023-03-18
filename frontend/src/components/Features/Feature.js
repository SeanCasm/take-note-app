import React from "react";
import PropTypes from "prop-types";
import {
  AiOutlineBook,
  AiOutlineDownload,
  AiOutlineFileDone,
  AiOutlineClockCircle,
} from "react-icons/ai";

export const Feature = ({
  feature,
  iconSize = "icon-md",
  displayOverview = false,
  order = "first",
}) => {
  const { icon, title, content, overview } = feature;
  const components = [
    <AiOutlineBook name="AiOutlineBook" className={iconSize} />,
    <AiOutlineDownload name="AiOutlineDownload" className={iconSize} />,
    <AiOutlineFileDone name="AiOutlineFileDone" className={iconSize} />,
    <AiOutlineClockCircle name="AiOutlineClockCircle" className={iconSize} />,
  ];
  return (
    <li className="col">
      <div className="d-flex flex-sm-row flex-column">
        <div className={`align-self-center m-3 icon-bg ${order}`}>
          {components.find((item) => item.props.name === icon)}
        </div>
        <section>
          <div className="feature-card-title">
            <p>
              <strong>{title}</strong>
            </p>
          </div>
          <hr />
          <div>
            <p>{displayOverview ? overview : content}</p>
          </div>
        </section>
      </div>
    </li>
  );
};
Feature.propTypes = {
  feature: PropTypes.shape({
    content: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.string,
  }),
  iconSize: PropTypes.string,
  order: PropTypes.string,
};
