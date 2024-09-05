import { FragmentOf, readFragment } from "gql.tada";
import { TextSummaryFragment, LinkFragment } from "@/graphql/fragments/misc";
import { ParagraphTextFragment } from "@/graphql/fragments/paragraph";
import Button from "../button/Button";
import './ParagraphText.scss';

interface ParagraphTextProps {
  paragraph: FragmentOf<typeof ParagraphTextFragment>
  modifier?: string;
}

export default function ParagraphText({ paragraph, modifier }: ParagraphTextProps) {
  const { title, body, link, link2, eyebrow, textLayout } = readFragment(ParagraphTextFragment, paragraph);
  const textSummaryFragment = readFragment(TextSummaryFragment, body)
  const linkFragment = readFragment(LinkFragment, link);
  const linkFragment2 = readFragment(LinkFragment, link2);

  return (
    <div className={modifier ?? 'container my-6 my-lg-15'}>
      <div className={`row ${modifier}`}>
        <div className={`col-lg-10 ${textLayout == 'centered' ? 'mx-auto text-center' : ''}`}>
          {eyebrow && (
            <h6>{eyebrow}</h6>
          )}
          {title && (
            <h2 className={`mb-2`}>{title}</h2>
          )}
          {body && (
            <div dangerouslySetInnerHTML={{ __html: textSummaryFragment?.value ?? '' }}></div>
          )}
          <div className={`mt-3 d-flex ${textLayout == 'centered' ? 'justify-content-center' : ''}`}>
            {linkFragment?.url && (
              <Button
                url={linkFragment?.url}
                text={linkFragment?.title ?? 'Read more'}
                modifier={`btn-primary me-2`}
              />
            )}

            {linkFragment2?.url && (
              <Button
                url={linkFragment2?.url}
                text={linkFragment2?.title ?? 'Read more'}
                modifier={`btn-secondary`}
              />
            )}
          </div>
        </div>
      </div >
    </div >
  );
}
