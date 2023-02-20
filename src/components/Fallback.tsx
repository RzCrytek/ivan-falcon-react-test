import Loader from './loader/Loader';

const Fallback = () => {
  return (
    <section className="hero is-fullheight">
      <div className="hero-body has-text-centered">
        <div className="container">
          <Loader />
        </div>
      </div>
    </section>
  );
};
export default Fallback;
