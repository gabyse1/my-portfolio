import { PropTypes } from 'prop-types';

const LoadingBox = ({ loadingMsg }) => (
  <div className="loading">
    <i className="fa fa-spinner fa-spin" />
    {' '}
    { loadingMsg }...
  </div>
);

LoadingBox.defaultProps = {
  loadingMsg: 'Loading'
};

LoadingBox.propTypes = {
  loadingMsg: PropTypes.string,
};

export default LoadingBox;
