import React from 'react';
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
    <div className={`container ${modifier ?? 'my-6 my-lg-15'}`}>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xxl-8">
          {logo && (
            <div className="text-center col-lg-4 mx-auto mb-4">
              {getImage(logo, 'img-fluid', 'I11SMALL')}
            </div>
          )}
          <blockquote className="text-center mb-4">
            <p className="fs-3 fw-normal mb-0">{quote}</p>
          </blockquote>
          <div className="text-center">
            <div className="d-inline-block">
              <div className="quote-image mb-2">
                {thumb && getImage(thumb, 'img-fluid rounded-circle', 'I11SMALL')}
              </div>
              {author && <div className="fw-bold">{author}</div>}
              {jobTitle && <p className="fs-6 text-muted mb-0">{jobTitle}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
