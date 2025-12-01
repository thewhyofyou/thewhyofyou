import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
          Privacy Policy
        </h1>
        <div className="text-sm text-muted-foreground mb-2">
          <p>Effective Date: 20.11.2025</p>
          <p>Website: thewhyof.you</p>
          <p>Contact: info@thewhyof.you</p>
        </div>

        <div className="prose prose-lg max-w-none space-y-8 text-foreground/90 mt-8">
          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-3">1. Introduction</h2>
            <p className="text-foreground/80">We at the Why of You take your privacy and the protection of your personal data very seriously. This Privacy Policy explains how we collect, use, disclose, and protect your personal data in accordance with the EU General Data Protection Regulation (GDPR) and applicable German law.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-3">2. Data Controller</h2>
            <p className="text-foreground/80">The data controller responsible for your personal data is: the Why of You</p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-3">3. Data We Collect</h2>
            <p className="text-foreground/80 mb-2">We may collect and process the following categories of personal data:</p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li><strong>Contact information:</strong> e.g., your name and email address (for newsletters, orders, customer service).</li>
              <li><strong>Birth data:</strong> your birth date, time, and place (for personalized astrology charts and services).</li>
              <li><strong>Order and payment data:</strong> necessary details for processing paid products/services (payment provider, transaction information; payment data is processed securely by third-party payment processors).</li>
              <li><strong>Communication data:</strong> messages, inquiries, feedback.</li>
              <li><strong>Usage data:</strong> information on how you use our website (pages visited, interactions, cookies, analytics data).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-3">4. Purposes and Legal Bases for Processing</h2>
            <p className="text-foreground/80 mb-2">We process your personal data for these purposes:</p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li><strong>Contractual performance</strong> - to provide services/products you order or request (Art. 6(1)(b) GDPR).</li>
              <li><strong>Newsletter and marketing</strong> - to send updates and offers with your consent (Art. 6(1)(a) GDPR; you may opt out anytime).</li>
              <li><strong>Customer support and communication</strong> (Art. 6(1)(b) and (f) GDPR).</li>
              <li><strong>Compliance with legal obligations</strong> (Art. 6(1)(c) GDPR).</li>
              <li><strong>Website analytics</strong> - to improve our service, only with your consent if required (Art. 6(1)(a) GDPR).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-3">5. Newsletter and Consent</h2>
            <p className="text-foreground/80 mb-2">If you subscribe to our newsletter:</p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li>We use double opt-in to confirm your subscription.</li>
              <li>You may unsubscribe anytime via the link in each newsletter or by contacting us.</li>
              <li>We do not send unsolicited marketing.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-3">6. Disclosure of Personal Data</h2>
            <p className="text-foreground/80 mb-2">We may share your data only when necessary, for the following reasons:</p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li><strong>Service providers:</strong> e.g., IT or hosting providers, payment processors, newsletter/email service providers.</li>
              <li><strong>Legal requirements:</strong> where necessary to comply with legal processes or requests.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-3">7. Transfers to Third Countries</h2>
            <p className="text-foreground/80">Your data may be transferred to service providers outside of the EU/EEA (e.g., email or payment platforms). We only use providers with appropriate safeguards in place (such as the EU Standard Contractual Clauses).</p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-3">8. How Long We Store Your Data</h2>
            <p className="text-foreground/80 mb-2">We only retain your personal data as long as needed to fulfill the stated purposes, comply with legal requirements, or until you withdraw consent (where applicable).</p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li><strong>Data for paid contracts:</strong> retained as required by tax/accounting laws.</li>
              <li><strong>Newsletter data:</strong> deleted upon unsubscription.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-3">9. Your Rights</h2>
            <p className="text-foreground/80 mb-2">You have the following rights under GDPR:</p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li><strong>Access:</strong> to know what personal data we hold about you.</li>
              <li><strong>Rectification:</strong> to correct any inaccurate data.</li>
              <li><strong>Erasure ("right to be forgotten"):</strong> to request deletion of your data, as long as no legal obligations require retention.</li>
              <li><strong>Restriction of processing:</strong> limited use of your data where requested.</li>
              <li><strong>Data portability:</strong> to receive your data in a common format.</li>
              <li><strong>Objection:</strong> to processing of your data, especially for direct marketing.</li>
              <li><strong>Withdrawal of consent:</strong> at any time, where our processing is based on consent.</li>
              <li><strong>Lodge a complaint:</strong> with a supervisory authority, especially in the EU country of your residence.</li>
            </ul>
            <p className="text-foreground/80 mt-4">To exercise your rights, contact: info@thewhyof.you</p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-3">10. Automated Decision-Making / Profiling</h2>
            <p className="text-foreground/80">We may use your birth data to generate automated astrology reports and charts. This is done only for informational, entertainment, and service-provision purposes—not for legal or significant personal decisions.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-3">11. Data Security</h2>
            <p className="text-foreground/80">We employ appropriate technical and organizational measures to protect your data against unauthorized access, loss, or misuse.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-3">12. Cookies and Website Analytics</h2>
            <p className="text-foreground/80">Our website may use cookies and analytics tools (e.g., for improving our services). Where required by law, we request your consent for non-essential cookies. For details, see our Cookie Policy.</p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-foreground mb-3">13. Updates to this Privacy Policy</h2>
            <p className="text-foreground/80">We may update this Privacy Policy occasionally to reflect changes in law or our services. Revised versions will be posted with an updated effective date.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
