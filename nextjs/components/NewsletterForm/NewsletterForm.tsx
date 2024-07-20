import React from 'react';

interface NewsletterFormProps {
  modifier?: string;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({ modifier = 'border p-4 rounded' }) => {
  return (
    <div className={`newsletter-form py-5 py-lg-12 ${modifier}`}>
      <div className="row">
        <div className="col-lg-6">
          <h3>Sign up for our newsletter</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="col-lg-6 mt-4">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Email Address" aria-label="Recipient's username with two button addons" />
            <button className="btn border btn-newsletter bg-dark text-light" type="button">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterForm;
