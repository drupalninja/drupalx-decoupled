import classNames from 'classnames';
import { FragmentOf, readFragment } from 'gql.tada';
import { TextFragment, LinkFragment } from "@/graphql/fragments/misc";
import { ParagraphSidebysideFragment } from "@/graphql/fragments/paragraph";
import { getImage } from '../helpers/Utilities';
import Badge from '../badge/Badge';
import Button from '../button/Button';
import './ParagraphSidebyside.scss';

interface ParagraphSidebysideProps {
  paragraph: FragmentOf<typeof ParagraphSidebysideFragment>,
  modifier?: string,
}

export default function ParagraphSidebyside({ paragraph, modifier }: ParagraphSidebysideProps) {
  const { eyebrow, sidebysideLayout: layout, sidebysideSummary, sidebysideTitle, link, media } = readFragment(ParagraphSidebysideFragment, paragraph);
  const linkFragment = readFragment(LinkFragment, link);
  const textFragment = readFragment(TextFragment, sidebysideSummary);

  return (
    <div className={classNames('side-by-side', layout, modifier ?? 'container my-6 my-lg-15')}>
      <div className={classNames('row', 'flex-column', 'gy-3', { 'flex-lg-row-reverse': layout === 'right', 'flex-lg-row': layout === 'left' }, 'justify-content-between', 'align-items-center')}>
        <div className="col-lg-6">
          <div className="shadow rounded">
            {getImage(media, 'img-fluid', ['I43SMALL', 'I43LARGE2X'])}
          </div>
        </div>
        <div className="col-lg-6 col-xxl-5 d-flex flex-column gap-3">
          {eyebrow && <Badge tag={eyebrow} modifier="text-bg-secondary text-uppercase" />}
          <h2 className="mb-2">{sidebysideTitle}</h2>
          {textFragment && (
            <div dangerouslySetInnerHTML={{ __html: textFragment?.value ?? '' }}></div>
          )}
          {linkFragment?.url && (
            <Button
              url={linkFragment?.url}
              text={linkFragment?.title ?? 'Read more'}
              modifier="btn-primary"
            />
          )}
        </div>
      </div>
    </div>
  );
}
