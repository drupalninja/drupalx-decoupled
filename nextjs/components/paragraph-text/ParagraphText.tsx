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
  const { title, body, link, textLayout } = readFragment(ParagraphTextFragment, paragraph);
  const textSummaryFragment = readFragment(TextSummaryFragment, body)
  const linkFragment = readFragment(LinkFragment, link);

  return (
    <div className={modifier ?? 'container my-6 my-lg-15'}>
      <div className={`row ${modifier}`}>
        <div className={`col-lg-10 ${textLayout == 'centered' ? 'mx-auto text-center' : ''}`}>
          {title && (
            <h2 className={`mb-2`}>{title}</h2>
          )}
          {body && (
            <div dangerouslySetInnerHTML={{ __html: textSummaryFragment?.value ?? '' }}></div>
          )}
          {linkFragment?.url && (
            <div className="mt-3">
              <Button
                url={linkFragment?.url}
                text={linkFragment?.title ?? 'Read more'}
                modifier={`btn-primary ${textLayout == 'centered' ? 'mx-auto' : ''}`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
