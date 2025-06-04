import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../../App.css"; 

const PageSkeleton = () => {
  return (
    <div className="skeleton-page-wrapper">
      <div className="skeleton-header">
        <Skeleton height={60} width="100%" />
      </div>
      <div className="skeleton-body">
        <Skeleton height={300} width="100%" />
        <div style={{ marginTop: "1rem" }}>
          <Skeleton count={5} height={20} width="100%" />
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;
