'use client'

import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphAccordionFragment } from '@/graphql/fragments/paragraph';
import { Accordion } from 'react-bootstrap';
import Button from '@/components/Button/Button';
import Heading from '../Heading/Heading';
import './ParagraphAccordion.scss';

interface ParagraphAccordionProps {
  paragraph: FragmentOf<typeof ParagraphAccordionFragment>
  modifier?: string;
  containerModifier?: string;
}

export default function ParagraphAccordion({ paragraph, modifier, containerModifier }: ParagraphAccordionProps) {
  const { title, accordionItem } = readFragment(ParagraphAccordionFragment, paragraph);

  return (
    <div className={containerModifier ?? 'bg-light py-6 py-lg-15'}>
      {title && <Heading title={title} modifier='text-dark mb-4 container'/>}
      <div className={`mb-4 ${modifier ?? 'container' }`}>
        <Accordion>
          {(accordionItem as any).map((item: any, index: number) => (
            <Accordion.Item eventKey={`accordion-${index}`} key={index}>
              <h2 className="accordion-header">
                <Accordion.Button className="text-dark rounded p-3 pt-4 pb-4 fs-5 fw-semibold">
                  {item?.title}
                </Accordion.Button>
              </h2>
              <Accordion.Collapse eventKey={`accordion-${index}`}>
                <div className="accordion-body">
                  <div dangerouslySetInnerHTML={{ __html: item?.body.value }} />
                  {item.link && (
                    <Button
                      url={item.link?.url}
                      text={item.link?.title}
                      modifier="btn-primary"
                    />
                  )}
                </div>
              </Accordion.Collapse>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
