import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AdminMenu from './AdminMenu';
import ProjectsList from './ProjectsList';
import ToolsList from './ToolsList';
import ProfileUser from './ProfileUser';
import ModalLayout from './ModalLayout';

const AdminPanel = ({ itemType }) => {
  const [modalMenuOpen, setModalMenuOpen] = useState(false);
  const [modalMenuButton, setModalMenuButton] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [itemId, setItemId] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const signedUser = useSelector((state) => state.userSigninReducer);
  const { userInfo } = signedUser;

  useEffect(() => {
    const handleResize = () => {
      window.location.reload();
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dimensions]);

  const menuToggle = () => {
    if (dimensions.width < 1024) {
      if (!modalMenuOpen) setModalMenuButton('menu__button-modal');
      else setModalMenuButton('');
      setModalMenuOpen(!modalMenuOpen);
    }
  };

  const modalShowHandler = (modalType, iId = null) => {
    setModalType(modalType);
    if (iId) setItemId(iId);
    setIsModalOpen(true);
  };

  const modalCloseHandler = () => setIsModalOpen(false);

  return (
    <>
      { (!userInfo) && <Navigate to="/portfolio-admin/signin" /> }
      { (userInfo && userInfo.isAdmin) && (
        <>
          <header className="app-header admin__header">
            <div className="header__top">
              <div className="brand">{userInfo.name}</div>
              <button type="button" aria-label="Menu button" className={'menu__button '.concat(modalMenuButton)} onClick={menuToggle}>
                <span className="menu__button-bar" />
              </button>
            </div>
            <AdminMenu
              isModalMenuOpen={modalMenuOpen}
              menuToggle={menuToggle}
            />
          </header>
          <section className="page__section admin__section">
            <div className="section__container">
              { (itemType === 'project') && <ProjectsList modalShowHandler={modalShowHandler} /> }
              { (itemType === 'tool') && <ToolsList modalShowHandler={modalShowHandler} /> }
              { (itemType === 'profile') && <ProfileUser /> }
            </div>
          </section>
          <ModalLayout
            isOpen={isModalOpen}
            handleClose={modalCloseHandler}
            modalType={modalType}
            itemId={itemId}
          />
        </>
      ) }
    </>
  );
};

AdminPanel.defaultProps = {
  itemType: 'project',
};

AdminPanel.propTypes = {
  itemType: PropTypes.string,
};

export default AdminPanel;
