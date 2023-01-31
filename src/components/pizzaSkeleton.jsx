import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="134" cy="136" r="125" />
    <rect x="0" y="280" rx="16" ry="16" width="280" height="33" />
    <rect x="0" y="324" rx="19" ry="19" width="280" height="73" />
    <rect x="1" y="416" rx="13" ry="13" width="51" height="30" />
    <rect x="125" y="416" rx="18" ry="18" width="150" height="38" />
  </ContentLoader>
);

export default Skeleton;
