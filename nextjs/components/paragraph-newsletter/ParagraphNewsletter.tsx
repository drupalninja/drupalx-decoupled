import { FragmentOf, readFragment } from 'gql.tada';
import { ParagraphNewsletterFragment } from '@/graphql/fragments/paragraph';
import { TextFragment } from '@/graphql/fragments/misc';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ParagraphNewsletterProps {
  paragraph: FragmentOf<typeof ParagraphNewsletterFragment>,
  modifier?: string,
}

export default function ParagraphNewsletter({ paragraph, modifier }: ParagraphNewsletterProps) {
  const { newsletterTitle, summary } = readFragment(ParagraphNewsletterFragment, paragraph);
  const summaryFragment = readFragment(TextFragment, summary);

  return (
    <div className="bg-gray-100 text-gray-900">
      <div className={`py-8 lg:py-24 ${modifier ?? 'container mx-auto px-8'}`}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
          <div className="lg:w-1/2 flex flex-col justify-center">
            <h3 className="text-3xl font-semibold mb-4">{newsletterTitle}</h3>
            <div
              dangerouslySetInnerHTML={{ __html: summaryFragment?.value ?? '' }}
              className='newsletter-summary'
            />
          </div>
          <div className="lg:w-1/2 mt-6 lg:mt-0 flex items-center">
            <div className="w-full">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="flex-grow bg-white text-xl"
                  aria-label='Email Address'
                />
                <Button
                  type="submit"
                  className="bg-gray-900 text-white hover:bg-gray-700 text-xl"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
