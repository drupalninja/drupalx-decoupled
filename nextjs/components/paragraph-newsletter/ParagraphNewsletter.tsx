import { FragmentOf } from 'gql.tada';
import { ParagraphNewsletterFragment } from '@/graphql/fragments/paragraph';
import './ParagraphNewsletter.scss';

interface ParagraphNewsletterProps {
  paragraph: FragmentOf<typeof ParagraphNewsletterFragment>,
  modifier?: string,
}

export default function ParagraphNewsletter({ paragraph, modifier }: ParagraphNewsletterProps) {
  return (
    <div className="bg-light">
      <div className={`newsletter-form py-5 py-lg-12 ${modifier ?? 'container'}`}>
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
    </div>
  );
}
