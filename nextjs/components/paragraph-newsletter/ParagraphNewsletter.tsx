import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphNewsletterFragment } from '@/graphql/fragments/paragraph';
import { TextFragment } from '@/graphql/fragments/misc';
import './ParagraphNewsletter.scss';

interface ParagraphNewsletterProps {
  paragraph: FragmentOf<typeof ParagraphNewsletterFragment>,
  modifier?: string,
}

export default function ParagraphNewsletter({ paragraph, modifier }: ParagraphNewsletterProps) {
  const { newsletterTitle, summary } = readFragment(ParagraphNewsletterFragment, paragraph);
  const summaryFragment = readFragment(TextFragment, summary);

  return (
    <div className="bg-light text-dark">
      <div className={`newsletter-form py-5 py-lg-12 ${modifier ?? 'container'}`}>
        <div className="row">
          <div className="col-lg-6">
            <h3>{newsletterTitle}</h3>
            <div dangerouslySetInnerHTML={{ __html: summaryFragment?.value ?? '' }} className='newsletter-summary' />
          </div>
          <div className="col-lg-6 mt-4">
            <div className="input-group">
              <input type="email" className="form-control" placeholder="Email Address" aria-label="Recipient's username with two button addons" />
              <button className="btn border btn-newsletter bg-dark text-light" type="button">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
