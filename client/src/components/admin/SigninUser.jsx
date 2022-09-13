import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import {
  signinUser,
  confSignupUser,
  cleanConfSignupUser,
  signoutUser,
} from '../../redux/users/usersReducer';

const SigninUser = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const confNewUser = useSelector((state) => state.userConfSignupReducer);
  const { loading: confLoading, success: confSuccess, error: confError } = confNewUser;

  const signedUser = useSelector((state) => state.userSigninReducer);
  const { userInfo, loading, error } = signedUser;

  useEffect(() => {
    if (params.confCode) dispatch(confSignupUser(params.confCode));
  }, []);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) navigate('/portfolio-admin');
  }, [userInfo, loading, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(cleanConfSignupUser());
    dispatch(signinUser({ email, password }));
  };

  const signoutHandler = () => {
    setEmail('');
    setPassword('');
    dispatch(signoutUser());
  };

  return (
    <section className="page__section">
      <div className="section__container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h2 className="form-title">SIGN IN</h2>
          </div>
          {loading && <LoadingBox />}
          {!confLoading && confSuccess && (
            <MessageBox variant="success">
              <span>{confSuccess}</span>
            </MessageBox>
          )}
          {!confLoading && confError && (
            <MessageBox variant="danger">
              { confError.map((err) => <span key={uuidv4()}>{err}</span>) }
            </MessageBox>
          )}
          {!loading && error && (
            <MessageBox variant="danger">
              { error.map((err) => <span key={uuidv4()}>{err}</span>) }
            </MessageBox>
          )}
          {userInfo && !userInfo.isAdmin && (
            <MessageBox variant="info">
              <span>
                Successfully Login!.
                <br />
                <br />
                Unfortunately , you can&quot;t see the portfolio admin page because your user
                account doesn&quot;t have admin permissions.
                <br />
                Please, contact to the website master to ask for admin permissions.
                <br />
                <br />
                Don&quot;t forget to logout from this session.
              </span>
            </MessageBox>
          )}
          <div className="form-group">
            <label htmlFor="email">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <span className="label-text">Email</span>
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <span className="label-text">Password</span>
            </label>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </div>
          <div className="form-group">
            <div className="form-extrainfo">
              New user?
              {' '}
              <Link to="/portfolio-admin/signup" className="link">Sign-Up</Link>
            </div>
          </div>
          <div className="form-group">
            <div className="form-extrainfo">
              <Link to="/portfolio-admin/signin" className="link" onClick={signoutHandler}>Sign-Out</Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SigninUser;
