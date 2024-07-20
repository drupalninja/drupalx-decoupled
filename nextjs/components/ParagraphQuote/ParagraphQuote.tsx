import { FragmentOf, readFragment } from "gql.tada";
import { ParagraphQuoteFragment } from "@/graphql/fragments/paragraph";
import { getImage } from "../helpers/Utilities";
import './ParagraphQuote.scss';

interface ParagraphQuoteProps {
  paragraph: FragmentOf<typeof ParagraphQuoteFragment>
  modifier?: string
}

export default function ParagraphQuote({ paragraph, modifier }: ParagraphQuoteProps) {
  const { author, jobTitle, logo, quote, thumb } = readFragment(ParagraphQuoteFragment, paragraph);
  
  return (
    <div className={`text-center d-flex justify-content-center ${modifier}`}>
      <div className="col-lg-10 col-xxxl-6">
        <div className="row">
          {logo && (
            <div className="quote-logo col-lg-3 mx-auto mb-2">
              {getImage(logo)}
            </div>
          )}
          <blockquote className="blockquote fs-4 mb-3">
            <p className="p-3 fw-semibold d-flex align-items-center">
              {quote}
              <span className="material-symbols-outlined mb-3">format_quote</span>
            </p>
          </blockquote>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          {thumb && (
            <div className="quote-image me-3">
              {getImage(thumb)}
            </div>
          )}
          <div className="quote-text">
            {author && <div className="fw-semibold">{author}</div>}
            {jobTitle && <p className="fs-6">{jobTitle}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
