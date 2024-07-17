import { PropTypes } from 'prop-types';

const MessageBox = ({ variant, children }) => (
  <div className={`alert alert-${variant || 'info'}`}>
    {children}
  </div>
);

MessageBox.propTypes = {
  variant: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default MessageBox;
