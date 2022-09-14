import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { detailsUser, updateUser } from '../../redux/users/usersReducer';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

/* eslint no-underscore-dangle: 0 */

const ProfileUser = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [matchPassword, setMatchPassword] = useState(true);

  const signedUser = useSelector((state) => state.userSigninReducer);
  const { userInfo } = signedUser;
  const userDetails = useSelector((state) => state.userDetailsReducer);
  const { loading, error, user } = userDetails;
  const updatedUser = useSelector((state) => state.userUpdateReducer);
  const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = updatedUser;

  useEffect(() => {
    if (!user) {
      dispatch({ type: 'USER_UPDATE_RESET' });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) setMatchPassword(false);
    else {
      dispatch(updateUser({
        userId: user._id, name, email, password,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <h2 className="form-title">USER PROFILE</h2>
      </div>
      {loading && <LoadingBox />}
      {error && (
        <MessageBox variant="danger">
          {
            error.map((err) => <span key={uuidv4()}>{err}</span>)
          }
        </MessageBox>
      )}
      {loadingUpdate && <LoadingBox />}
      {errorUpdate && (
        <MessageBox variant="danger">
          {
            errorUpdate.map((err) => <span key={uuidv4()}>{err}</span>)
          }
        </MessageBox>
      )}
      {successUpdate && (
        <MessageBox variant="success">
          Profile Updated Successfully
        </MessageBox>
      )}
      {!matchPassword && (
        <MessageBox variant="danger">
          Passwords are not match
        </MessageBox>
      )}
      <div className="form-group">
        <input
          type="text"
          placeholder="Name"
          className="form-control"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          placeholder="Email"
          className="form-control"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          className="form-control"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Confirm Password"
          className="form-control"
          name="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary">
          UPDATE
        </button>
      </div>
    </form>
  );
};

export default ProfileUser;
