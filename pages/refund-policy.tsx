import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../components/Layout'), { ssr: false });

const RefundPolicy: React.FC = () => {
  return (
    <Layout>
      <NextSeo
        title="Career Launchpad - Refund Policy"
        description="Learn about Career Launchpad refund policy for our online skill development programs."
        openGraph={{
          title: 'Career Launchpad - Refund Policy',
          description: 'Learn about Career Launchpad refund policy for our online skill development programs.',
          images: [
            {
              url: 'https://placementinstitute.com/bg3.png', // Ensure this image is optimized
              width: 800,
              height: 600,
              alt: 'Career Launchpad Refund Policy',
            },
          ],
        }}
      />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white p-8 md:p-12 lg:p-16 max-w-4xl w-full rounded-lg shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">
            Refund Policy
          </h1>
          <div className="text-gray-700 leading-relaxed space-y-6">
            <p>
              <span className="font-bold">Welcome to Career Launchpad:</span> At Career Launchpad, we’re committed to offering our students unparalleled guidance and support. We recognize that situations can change, leading you to reconsider your enrollment in one of our programs. This policy outlines the terms and conditions for refunds. To fully understand your rights and obligations, we encourage you to read this policy carefully.
            </p>
            <h2 className="text-2xl font-semibold mt-6">General Guidelines for Refund Eligibility</h2>
            <p>
              <span className="font-bold">Eligibility for Refunds:</span> Students may request refunds within the specified time frames. However, those who have not paid the required deposit or the full program price as outlined in the course agreement will not be eligible for a refund.
            </p>
            <p>
              <span className="font-bold">Non-Refundable Charges:</span> Certain program-related costs—such as registration, administration, or material fees—may be non-refundable. These costs are detailed in the program agreement.
            </p>
            <p>
              <span className="font-bold">Method for Refund Requests:</span> Refund requests must be submitted in writing to <a href="mailto:info@placementinstitute.com" className="text-blue-600">info&#64;placementinstitute&#46;com</a>. Please include your full name, the program you are enrolled in, your payment details, and a brief explanation for your refund request. We do not accept refunds requested orally or through other means.
            </p>

            <h2 className="text-2xl font-semibold mt-6">Policy on Refunds for Online Programs</h2>
            <p>
              <span className="font-bold">Online Course Refund Policy:</span> Refund requests will be considered if submitted within the stipulated time frame, provided all other criteria are met.
            </p>
            <p>
              <span className="font-bold">Refunds and Program Access:</span> Upon approval of your refund request, access to program materials will be immediately terminated. If the program includes downloadable materials, you agree not to use or share these materials once the refund has been processed.
            </p>
            <p>
              <span className="font-bold">Returns for Exclusive Offers or Discounts:</span> Refund policies for programs purchased during special promotions or at discounted rates may differ. Refunds will be based on the discounted price paid.
            </p>
            <p>
              <span className="font-bold">Processing Time for Refunds:</span> Approved refunds will be issued to the original payment method. If this is not possible, alternative arrangements will be made.
            </p>
            <p>
              <span className="font-bold">Refunds Declined:</span> Refunds may be denied if it is found that academic fraud occurred, Career Launchpad terms of service were violated, or incorrect information was provided during enrollment. In such cases, you will receive written notification detailing the reason for the denial.
            </p>
            <p>
              <span className="font-bold">Partial Refunds:</span> In some situations, partial refunds may be granted. For instance, if a significant portion of the program has been completed, the refund will be calculated based on the percentage of the program finished.
            </p>

            <h2 className="text-2xl font-semibold mt-6">A Final Word: Changes to the Refund Procedure</h2>
            <p>
              This refund policy is subject to change at any time. All admissions made after the effective date of any changes will adhere to the updated policy, which will be announced on our website. We advise students to review the refund policy regularly to stay informed about any updates.
            </p>

            <h2 className="text-2xl font-semibold mt-6">Contact Details</h2>
            <p>
              For any questions regarding this refund policy, please call our customer care line at <a href="tel:+919599652382" className="text-blue-600">+91-9599652382</a> or email us at <a href="mailto:info@placementinstitute.com" className="text-blue-600">info&#64;placementinstitute&#46;com</a>.
            </p>

            <p>
              <span className="font-bold">In Summary:</span> At Career Launchpad, we deeply value our students and strive to create the best possible learning environment. We understand that circumstances can evolve, and our refund policy aims to be both transparent and fair.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RefundPolicy;
