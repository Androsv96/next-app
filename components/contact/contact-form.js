import { useEffect, useState } from 'react';
import Notification from '../ui/notification';
import classes from './contact-form.module.css';

const sendContactData = async (contactDetails) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.data) {
    throw new Error(data.error || 'Something went wrong');
  }
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    message: '',
  });
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();

  const clearForm = () => setFormData({ email: '', name: '', message: '' });

  const sendMessageHandler = async (event) => {
    event.preventDefault();
    setRequestStatus('pending');
    try {
      await sendContactData(formData);
      setRequestStatus('success');
      clearForm();
    } catch (err) {
      setRequestError(err.message);
      setRequestStatus('error');
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  let notification;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on its way',
    };
  } else if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message sent successfully',
    };
  } else if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error',
      message: requestError,
    };
  }

  useEffect(() => {
    if (requestStatus === 'pending' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  });

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your name</label>
            <input
              id="name"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your message</label>
          <textarea
            id="message"
            rows="5"
            value={formData.message}
            required
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
};

export default ContactForm;
