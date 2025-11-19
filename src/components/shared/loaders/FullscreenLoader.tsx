import Loader from "./Loader";

const FullscreenLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
      <Loader size="lg" />
    </div>
  );
};

export default FullscreenLoader;
