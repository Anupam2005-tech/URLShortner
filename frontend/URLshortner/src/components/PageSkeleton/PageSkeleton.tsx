import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../../App.css"; // Ensure this path is correct for your global CSS

const PageSkeleton = () => {
  return (
    <div className="skeleton-page-wrapper">
      
      <Skeleton 
        height="100vh" // Make it take the full viewport height
        width="100vw"  // Make it take the full viewport width
        containerClassName="full-page-skeleton-container" // A custom class for targeting specific styles
        className="full-page-skeleton-element" // Apply styles directly to the Skeleton element
      />
    </div>
  );
};

export default PageSkeleton;
