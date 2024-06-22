import Hero from './components/Hero';
import classes from './style.module.scss';

const Home = () => {
  return (
    <div className={classes.home}>
      <Hero />
    </div>
  );
};

export default Home;
