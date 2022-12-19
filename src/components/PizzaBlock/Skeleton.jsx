import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={550}
    viewBox="0 0 280 550"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="-3" y="280" rx="10" ry="10" width="280" height="28" />
    <circle cx="140" cy="130" r="125" />
    <rect x="-1" y="340" rx="10" ry="10" width="280" height="80" />
    <rect x="4" y="450" rx="10" ry="10" width="120" height="38" />
    <rect x="160" y="445" rx="20" ry="20" width="120" height="50" />
  </ContentLoader>
);

export default Skeleton;
