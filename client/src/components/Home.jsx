import { PropTypes } from 'prop-types';
import {
  FaGithubAlt,
  FaLinkedinIn,
  FaAngellist,
  FaTwitter,
} from 'react-icons/fa';
import AnimatedMouse from './icons/AnimatedMouse';

const Home = ({ anim }) => (
  <section className={`page__section home__section ${anim}`} id="home" data-index="1">
    <div className="section__container section__container-home">
      <div className="home__developer">
        <div className="text__top">
          <div>
            <h1 className="title__home">Gabriela Sánchez Espirilla</h1>
            <h2 className="subtitle__home">Software Developer</h2>
          </div>
        </div>
        <div className="text__bottom">
          <ul className="list list-horizontal">
            <li><a className="icon__box" href="https://github.com/gabyse1" target="blank" aria-label="Github link"><FaGithubAlt /></a></li>
            <li><a className="icon__box" href="https://www.linkedin.com/in/gabriela-s%C3%A1nchez-espirilla-83011b225/" target="blank" aria-label="Linkedin link"><FaLinkedinIn /></a></li>
            <li><a className="icon__box" href="https://angel.co/u/gabyse" target="blank" aria-label="Angellist link"><FaAngellist /></a></li>
            <li><a className="icon__box" href="https://twitter.com/gse_sd" target="blank" aria-label="Twitter link"><FaTwitter /></a></li>
          </ul>
        </div>
      </div>
      <div className="home__messages">
        <div className="slides__container">
          <div className="slide"><span>Excited to building creative solutions that makes people&apos;s lives easier.</span></div>
          <div className="slide"><span>Code review lover, excited to track down bugs to fix them.</span></div>
          <div className="slide"><span>Team player who enjoys gathering ideas to create new knowledge.</span></div>
        </div>
      </div>
      <div className="icon__mouse">
        <AnimatedMouse />
      </div>
    </div>
  </section>
);

Home.propTypes = {
  anim: PropTypes.string.isRequired,
};

export default Home;
