import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
          Terms of Service
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          for the website of the Why of You
        </p>

        <div className="prose prose-lg max-w-none space-y-8 text-foreground/90">
          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-3">1. Scope</h2>
            <ol className="list-decimal list-inside space-y-2 text-foreground/80">
              <li>These Terms of Service (TOS) apply to all contracts, services, and use of the website of the Why of You, and to all free and paid digital content and services provided via this website.</li>
              <li>Any conflicting or supplementary terms of the user do not apply unless the Why of You has expressly agreed to them in writing.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-3">2. Services of the Why of You</h2>
            <ol className="list-decimal list-inside space-y-2 text-foreground/80">
              <li>the Why of You provides in particular:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>Astrological content (such as articles, videos, and information),</li>
                  <li>Free chart calculations and horoscopes based on user-provided data,</li>
                  <li>Sale and provision of paid digital products (e.g., PDFs, courses, recordings) and services (e.g., personalized astrological analysis, consultations/readings via email, video call, etc.).</li>
                </ul>
              </li>
              <li>There is no entitlement to continuous availability of the website or of individual services. the Why of You reserves the right to modify, extend, or discontinue content and functions, provided that existing, already purchased services are not impaired except for legal reasons.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-3">3. Eligibility and Age Requirement</h2>
            <ol className="list-decimal list-inside space-y-2 text-foreground/80">
              <li>Use of the website is generally possible without registration. Certain features (e.g., newsletter, paid services) may require registration or the provision of additional information.</li>
              <li>By using paid services, you confirm that you are at least 18 years old and legally capable of entering contracts. Minors need the consent of a legal guardian.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-3">4. Data Collection (Email, Birth Details)</h2>
            <ol className="list-decimal list-inside space-y-2 text-foreground/80">
              <li>For certain offerings, the following data is required:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>Email address: for sending newsletters, product information, order processing, and communication for contract fulfillment.</li>
                  <li>Birth details (date, time, place of birth) and, if applicable, (nick)name: for generating personalized astrological analysis and horoscopes.</li>
                </ul>
              </li>
              <li>All personal data is processed in accordance with our separate Privacy Policy, which forms an integral part of your contract and is accessible at any time on our website.</li>
              <li>Newsletter registration generally follows a double opt-in process. You can unsubscribe from the newsletter at any time via a link included in every email or by contacting the Why of You.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-3">5. Conclusion of Contract for Paid Services</h2>
            <ol className="list-decimal list-inside space-y-2 text-foreground/80">
              <li>The presentation of products and services on the website does not represent a legally binding offer but an invitation to submit an offer by the user.</li>
              <li>By submitting an order (e.g., clicking a "Buy" or "Order with obligation to pay" button), you submit a binding offer to conclude a contract for the selected services.</li>
              <li>The contract is concluded when the Why of You accepts the order by confirmation email or begins to provide the service.</li>
              <li>You can correct input errors using the standard browser functions and the correction options provided during the order process prior to submitting your order.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-3">6. Prices, Payment, and Digital Delivery</h2>
            <ol className="list-decimal list-inside space-y-2 text-foreground/80">
              <li>The prices at the time of the order as displayed on the website apply. All prices are in euros and include VAT if applicable.</li>
              <li>Payment is made through the payment methods offered in the ordering process (e.g., credit card, PayPal, SEPA direct debit, payment providers such as Stripe).</li>
              <li>Digital products (e.g., download files, access to online courses) are generally delivered after successful payment by email link, customer account, or separate access.</li>
              <li>Individual services (e.g., personal reports or consultations) will be rendered within the timeframe stated in the offer or order confirmation.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-3">7. Right of Withdrawal for Consumers</h2>
            <p className="text-foreground/80 mb-2">If you are a consumer (not acting for business purposes), you have a legal right of withdrawal. Details, deadlines, and terms are detailed in the cancellation policy provided during the checkout process and available on our website.</p>
            <p className="text-foreground/80 mb-2">For digital content or services, the right of withdrawal may expire early if:</p>
            <ul className="list-disc list-inside ml-6 space-y-1 text-foreground/80">
              <li>the performance has begun after you have expressly consented to this and</li>
              <li>you have simultaneously acknowledged that your right of withdrawal expires upon complete fulfillment of the contract by the Why of You.</li>
            </ul>
            <p className="text-foreground/80 mt-2">Personalized content (e.g., personally prepared horoscopes, individual analysis as PDF or audio/video) is generally excluded from return as permitted by law.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-3">8. Disclaimer (Not Professional Advice)</h2>
            <p className="text-foreground/80 mb-2">All content, analysis, horoscopes, and consultations provided by the Why of You are for information, personal insight, and entertainment purposes only.</p>
            <p className="text-foreground/80 mb-2">The services offered by the Why of You are not a substitute for professional advice in medical, psychological, legal, financial, or any other matters and should not be used in lieu of consulting qualified professionals.</p>
            <p className="text-foreground/80">Users are solely responsible for any decisions or actions taken based on the content provided.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-3">9. Liability</h2>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li>the Why of You is liable without limitation for damages resulting from injury to life, limb, or health due to an intentional or negligent breach of duty, as well as for damages caused by gross negligence or intent.</li>
              <li>For slight negligence, the Why of You is only liable for violation of essential contractual obligations (cardinal duties). In such cases, liability is limited to foreseeable, contract-typical damages.</li>
              <li>Any further liability is excluded to the maximum extent allowed by law. Liability under the German Product Liability Act remains unaffected.</li>
              <li>No liability is assumed for availability of the internet or third-party services (e.g., email providers, payment processors).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-3">10. Copyright and Usage Rights</h2>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li>All content (texts, graphics, audio, videos, PDFs, courses, etc.) provided on the website and as part of the services is subject to copyright held by the Why of You or has been licensed for use accordingly.</li>
              <li>Unless otherwise agreed, users are granted a simple, non-transferable right to use such content for personal, private purposes only.</li>
              <li>Any reproduction, distribution, public availability, modification, or commercial use of the content without prior written consent from the Why of You is strictly prohibited.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-3">11. Newsletter and Electronic Communication</h2>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li>By subscribing to the newsletter, you consent to receive regular information about offers, content, and news from the Why of You via email.</li>
              <li>You can withdraw your consent at any time with effect for the future, e.g., via the unsubscribe link in any newsletter email or by contacting the Why of You.</li>
              <li>As part of contract fulfillment (e.g., order confirmation, digital product delivery, appointment arrangements), the Why of You may also contact you by email even without separate newsletter consent.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-3">12. Data Protection</h2>
            <ol className="list-decimal list-inside space-y-2 text-foreground/80">
              <li>Protecting your personal data is a top priority for the Why of You.</li>
              <li>Personal data is collected, processed, and used strictly in accordance with our Privacy Policy and applicable data protection laws, particularly the GDPR and the German Federal Data Protection Act (BDSG).</li>
              <li>The current Privacy Policy is always available on the website.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-3">13. Changes to the Terms</h2>
            <ol className="list-decimal list-inside space-y-2 text-foreground/80">
              <li>the Why of You reserves the right to update these Terms of Service in the future for valid reasons (e.g., legal changes, expansion of the service offer, closing regulatory gaps), provided the changes are reasonable for users.</li>
              <li>Users will be informed about material changes in an appropriate way. If users do not object within a reasonable period or continue to use the services, the amended terms are deemed accepted (provided this was clearly indicated in the notification).</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-3">14. Applicable Law and Dispute Resolution</h2>
            <ol className="list-decimal list-inside space-y-2 text-foreground/80">
              <li>German law applies, excluding the UN Sales Convention (CISG).</li>
              <li>For consumers, this choice of law only applies if it does not deprive the user of the protection of mandatory provisions of the law of the country in which they have their habitual residence.</li>
              <li>The European Commission provides a platform for Online Dispute Resolution (ODR). the Why of You is not obliged and generally not willing to participate in dispute resolution procedures before a consumer arbitration body.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-3">15. Final Provisions</h2>
            <ol className="list-decimal list-inside space-y-2 text-foreground/80">
              <li>Should any provision of these terms be or become invalid in whole or in part, the validity of the remaining provisions shall not be affected.</li>
              <li>Statutory provisions shall apply in place of any invalid provision.</li>
            </ol>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
