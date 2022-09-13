import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Works from './Works';
import About from './About';
import Contact from './Contact';
import { getToolList } from '../redux/tools/toolsReducer';
import { getProjectList } from '../redux/projects/projectsReducer';

const Portfolio = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading: loadingTools } = useSelector((state) => state.toolListReducer);
  const { loading: loadingProjects } = useSelector((state) => state.projectListReducer);

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [scrollProps, setScrollProps] = useState({
    active: false,
    lastScrollTop: 0,
    activeByLink: false,
  });
  const [minScrollTop, setMinScrollTop] = useState(0);
  const [maxScrollTop, setMaxScrollTop] = useState(0);
  const [scrollBoxHeight, setScrollBoxHeight] = useState(0);

  const [activeSection, setActiveSection] = useState({
    lastActiveSection: 0,
    currentActiveSection: 0,
    animation: '',
  });

  const scrollBoxRef = useRef();
  const scrollContRef = useRef();

  const scrollToHashSection = (hash) => {
    let sectionToScroll = document.getElementById(hash ? hash.replace('#', '') : 'home');
    if (!sectionToScroll) sectionToScroll = document.getElementById('home');

    setScrollProps({
      active: true,
      lastScrollTop: 0,
      activeByLink: true,
    });

    setActiveSection({
      ...activeSection,
      lastActiveSection: activeSection.currentActiveSection,
      currentActiveSection: +sectionToScroll.dataset.index,
      animation: `${sectionToScroll.getAttribute('id')}__animation`,
    });

    scrollBoxRef.current.scrollTo({
      top: sectionToScroll.offsetTop,
      behavior: 'smooth',
    });
    setTimeout(() => {
      setScrollProps({
        active: false,
        lastScrollTop: sectionToScroll.offsetTop,
        activeByLink: false,
      });
    }, 1000);
  };

  useEffect(() => {
    dispatch(getToolList());
    window.addEventListener('hashchange', () => { scrollToHashSection(window.location.hash); });
    return window.removeEventListener('hashchange', () => { scrollToHashSection(window.location.hash); });
  }, []);

  useEffect(() => {
    if (!loadingTools) dispatch(getProjectList());
  }, [loadingTools]);

  useEffect(() => {
    if (!loadingProjects) {
      const mainBoxHeight = scrollBoxRef.current.clientHeight;
      const mainContHeight = scrollContRef.current.clientHeight;
      const numPageSections = scrollContRef.current.childNodes.length;
      setScrollBoxHeight(mainBoxHeight);
      setMinScrollTop(0);
      setMaxScrollTop(mainContHeight - (mainContHeight / numPageSections));

      scrollToHashSection(window.location.hash);
    }
  }, [loadingProjects]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth !== dimensions.width) {
        window.location.reload();
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dimensions.width]);

  const handleScroll = () => {
    const currentScrollTop = scrollBoxRef.current.scrollTop;
    let newScrollTop = scrollProps.lastScrollTop;
    let newActiveSectionIndex = activeSection.currentActiveSection;

    if (!scrollProps.active
      && currentScrollTop < maxScrollTop
      && currentScrollTop > minScrollTop) {
      if (currentScrollTop > scrollProps.lastScrollTop) {
        newScrollTop += scrollBoxHeight;
        newActiveSectionIndex += 1;
      } else if (currentScrollTop < scrollProps.lastScrollTop) {
        newScrollTop -= scrollBoxHeight;
        newActiveSectionIndex -= 1;
      }

      const curActiveSection = scrollContRef.current.querySelector(`[data-index="${newActiveSectionIndex}"]`);
      const sectionName = curActiveSection.getAttribute('id');
      setActiveSection({
        lastActiveSection: activeSection.currentActiveSection,
        currentActiveSection: newActiveSectionIndex,
        animation: `${sectionName}__animation`,
      });

      scrollBoxRef.current.scrollTo({
        top: newScrollTop,
        behavior: 'smooth',
      });

      setTimeout(() => {
        setScrollProps({
          active: false,
          lastScrollTop: newScrollTop,
          activeByLink: false,
        });
        const newSectionName = scrollContRef.current.querySelector(`[data-index="${newActiveSectionIndex}"]`).getAttribute('id');
        navigate(`#${newSectionName}`);
      }, 1000);
      setScrollProps({
        active: true,
        lastScrollTop: scrollProps.lastScrollTop,
        activeByLink: false,
      });
    }
  };

  return (
    <>
      {
        !loadingTools && !loadingProjects && (
          <>
            <Header activeItem={activeSection.currentActiveSection} dimensions={dimensions} />
            <div className="main" onScroll={handleScroll} ref={scrollBoxRef}>
              <div
                className="main__container"
                id="main__container"
                ref={scrollContRef}
              >
                <Home anim={activeSection.currentActiveSection === 1 ? activeSection.animation : ''} />
                <Works anim={activeSection.currentActiveSection === 2 ? activeSection.animation : ''} />
                <About anim={activeSection.currentActiveSection === 3 ? activeSection.animation : ''} />
                <Contact anim={activeSection.currentActiveSection === 4 ? activeSection.animation : ''} />
              </div>
            </div>
          </>
        )
      }
    </>
  );
};

export default Portfolio;
