import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import {
  FaGithubAlt,
  FaLinkedinIn,
  FaAngellist,
  FaTwitter,
} from 'react-icons/fa';
import LoadingBox from './admin/LoadingBox';
import MessageBox from './admin/MessageBox';

const Contact = ({ anim }) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [resLoading, setResLoading] = useState(false);
  const [resStatus, setResStatus] = useState(null);
  const [resMessage, setResMessage] = useState(null);

  useEffect(() => {
    if (resStatus) {
      setTimeout(() => {
        setResStatus(null);
      }, 5000);
    }
  }, [resStatus]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setResLoading(true);

    await fetch('/api/mail/send', {
      method: 'POST',
      body: JSON.stringify({ fullname, email, message }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        if (response.status !== 200) throw Error(response.statusText);
        return response.text();
      })
      .then((data) => {
        setResLoading(false);
        setResStatus('success');
        setResMessage(data);
        setFullname('');
        setEmail('');
        setMessage('');
      })
      .catch((error) => {
        setResStatus('danger');
        setResMessage(error.message);
      });
  };

  return (
    <section className={`page__section contact__section ${anim}`} id="contact" data-index="4">
      <div className="section__container">
        <div className="contact__information">
          <h2 className="section__title">Get In Touch</h2>
          <div className="message">
            <p>If you have a project you need coded, do not hesitate to contact me.</p>
          </div>
          <ul className="list list-vertical list__data">
            <li>
              <div className="icon__box">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 61.7">
                  <g>
                    <polygon points="1.91 0 49.13 37.32 96.34 0 1.91 0" />
                    <polygon points="0 59.65 34.74 31.26 0 2.87 0 59.65" />
                    <polygon points="98 2.83 63.26 31.22 98 59.6 98 2.83" />
                    <path d="M4.06,80.85,38.31,53.32,50,62.81l11.87-9.29L96.21,80.85Z" transform="translate(-1 -19.15)" />
                  </g>
                </svg>
              </div>
              <span>gaby.es.sd@gmail.com</span>
            </li>
            <li>
              <div className="icon__box">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 57.82 98">
                  <path d="M71,99s8.92,0,8.92-8.92V9.92C79.91,1,71,1,71,1H31s-8.92,0-8.92,8.92V90.08C22.09,99,31,99,31,99ZM51,95.28a4.41,4.41,0,1,1,4.41-4.41A4.39,4.39,0,0,1,51,95.28ZM39.93,6.39a.92.92,0,0,1,1-1H61.19a.92.92,0,0,1,1,1v.29a.92.92,0,0,1-1,1H40.91a1,1,0,0,1-1-1ZM26.5,12.07h49V83.32h-49Z" transform="translate(-22.09 -1)" />
                </svg>
              </div>
              <span>+51 984185416</span>
            </li>
          </ul>
          <ul className="list list-horizontal list__media">
            <li><a className="icon__box" href="https://github.com/gabyse1" target="blank" aria-label="Github link"><FaGithubAlt /></a></li>
            <li><a className="icon__box" href="https://www.linkedin.com/in/gabriela-s%C3%A1nchez-espirilla-83011b225/" target="blank" aria-label="Linkedin link"><FaLinkedinIn /></a></li>
            <li><a className="icon__box" href="https://angel.co/u/gabyse" target="blank" aria-label="Angellist link"><FaAngellist /></a></li>
            <li><a className="icon__box" href="https://twitter.com/gse_sd" target="blank" aria-label="Twitter link"><FaTwitter /></a></li>
          </ul>
        </div>
        <div className="contact__form">
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="fullname">
                <input type="text" name="fullname" id="fullname" className="form-control" placeholder="Gabriela Sánchez" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
                <span className="label-text">Full name</span>
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="email">
                <input type="email" name="email" id="email" className="form-control" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <span className="label-text">Email</span>
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="message">
                <textarea rows="4" name="message" id="message" className="form-control" placeholder="message" value={message} onChange={(e) => setMessage(e.target.value)} required />
                <span className="label-text">Message</span>
              </label>
            </div>
            <div className="form-group">
              <button type="submit" className="btn">SEND</button>
            </div>
            {resLoading && <LoadingBox loadingMsg="Sending" />}
            {
              resStatus && (
                <MessageBox variant={resStatus}>
                  {resMessage && <p>{resMessage}</p>}
                </MessageBox>
              )
            }
          </form>
        </div>
      </div>
    </section>
  );
};

Contact.propTypes = {
  anim: PropTypes.string.isRequired,
};

export default Contact;
