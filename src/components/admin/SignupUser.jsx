import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { signupUser } from '../../redux/users/usersReducer';

const SignupUser = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [matchPassword, setMatchPassword] = useState(true);

  const registeredUser = useSelector((state) => state.userSignupReducer);
  const { success, loading, error } = registeredUser;

  useEffect(() => {
    if (success) {
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  }, [success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) setMatchPassword(false);
    else dispatch(signupUser({ name, email, password }));
  };

  return (
    <section className="page__section">
      <div className="section__container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h2 className="form-title">SIGN UP</h2>
          </div>
          {loading && <LoadingBox />}
          {!loading && error && (
            <MessageBox variant="danger">
              {
                error.map((err) => <span key={uuidv4()}>{err}</span>)
              }
            </MessageBox>
          )}
          {!matchPassword && (
            <MessageBox variant="danger">
              Passwords are not match
            </MessageBox>
          )}
          {!loading && success && (
            <MessageBox variant="success">
              <span>{success}</span>
            </MessageBox>
          )}
          <div className="form-group">
            <label htmlFor="name">
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                name="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
              <span className="label-text">Name</span>
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="email">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
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
                required
              />
              <span className="label-text">Password</span>
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">
              <input
                type="password"
                placeholder="Confirm Password"
                className="form-control"
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
              <span className="label-text">Password confirmation</span>
            </label>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <div className="form-group">
            <div className="form-extrainfo">
              Already have an account?
              {' '}
              <Link to="/portfolio-admin/signin" className="link">Sign-In</Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignupUser;
