import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-navy-900">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-navy-900/95 backdrop-blur-lg shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-cream-100 hover:text-gold-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy-800/50 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-gold-400/20">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-cream-50 mb-2">
              Terms of Service
            </h1>
            <p className="text-cream-100/60 mb-8">
              Last updated: June 2026
            </p>

            <div className="space-y-8 text-cream-100/80 leading-relaxed">
              {/* 1. Acceptance of Terms */}
              <section>
                <h2 className="font-serif text-2xl font-semibold text-cream-50 mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using the Accra Christ The King Cooperative Credit Union website and services, 
                  you accept and agree to be bound by the terms and provision of this agreement. If you do not agree 
                  to abide by the above, please do not use this service.
                </p>
              </section>

              {/* 2. License to Use Website */}
              <section>
                <h2 className="font-serif text-2xl font-semibold text-cream-50 mb-4">2. License to Use Website</h2>
                <p className="mb-4">
                  Accra Christ The King Credit Union grants you a limited license to access and use this website 
                  for personal, informational purposes. You may not:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Reproduce, distribute, or transmit any content without permission</li>
                  <li>Use the website for any commercial purpose without prior written consent</li>
                  <li>Modify, adapt, translate, or reverse engineer any content</li>
                  <li>Attempt to gain unauthorized access to any portion or feature of the website</li>
                  <li>Use any automated tools or scripts to access the website</li>
                </ul>
              </section>

              {/* 3. Membership Terms */}
              <section>
                <h2 className="font-serif text-2xl font-semibold text-cream-50 mb-4">3. Membership Terms</h2>
                <p className="mb-4">
                  To become a member of Accra Christ The King Credit Union, you must:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Be at least 18 years of age</li>
                  <li>Reside or work in the Greater Accra Region or be affiliated with our church community</li>
                  <li>Provide accurate and complete information during the membership application process</li>
                  <li>Comply with all credit union policies and procedures</li>
                  <li>Maintain a minimum share balance as required by the credit union</li>
                </ul>
                <p className="mt-4">
                  Membership is subject to approval by the Credit Union's Board of Directors. We reserve the right 
                  to deny membership or terminate membership for any reason permitted by law or credit union policies.
                </p>
              </section>

              {/* 4. Account Terms */}
              <section>
                <h2 className="font-serif text-2xl font-semibold text-cream-50 mb-4">4. Account Terms</h2>
                <p className="mb-4">
                  Members agree to the following regarding their accounts:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You are responsible for maintaining the confidentiality of your account information</li>
                  <li>You agree not to share your PIN, passwords, or security codes with anyone</li>
                  <li>You are liable for all transactions made using your account credentials</li>
                  <li>You must report any unauthorized access or fraudulent activity immediately</li>
                  <li>Account statements and records are available upon request</li>
                  <li>The credit union may freeze or suspend accounts as required by law or policy</li>
                </ul>
              </section>

              {/* 5. Loan and Credit Terms */}
              <section>
                <h2 className="font-serif text-2xl font-semibold text-cream-50 mb-4">5. Loan and Credit Terms</h2>
                <p className="mb-4">
                  All loans and credit products offered by Accra Christ The King Credit Union are subject to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Credit approval and member eligibility verification</li>
                  <li>Current loan policies and rate schedules</li>
                  <li>Applicable federal and state lending regulations</li>
                  <li>A properly executed loan agreement specifying terms and conditions</li>
                  <li>Payment of all applicable fees and charges</li>
                </ul>
                <p className="mt-4">
                  Members are responsible for making payments on time according to the agreed schedule. 
                  Late payments may result in additional charges and negatively impact credit history.
                </p>
              </section>

              {/* 6. Deposits and Withdrawals */}
              <section>
                <h2 className="font-serif text-2xl font-semibold text-cream-50 mb-4">6. Deposits and Withdrawals</h2>
                <p className="mb-4">
                  Members agree to the following deposit and withdrawal policies:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Deposits are subject to verification and clearance procedures</li>
                  <li>Withdrawal requests are subject to availability of funds</li>
                  <li>Large withdrawals may require advance notice</li>
                  <li>The credit union reserves the right to place holds on deposits as permitted by law</li>
                  <li>Interest earned on deposits will be calculated and paid according to current rates</li>
                </ul>
              </section>

              {/* 7. Fees and Charges */}
              <section>
                <h2 className="font-serif text-2xl font-semibold text-cream-50 mb-4">7. Fees and Charges</h2>
                <p>
                  The credit union charges fees for various services as outlined in our current fee schedule. 
                  Members will be notified of any fee changes in accordance with applicable regulations. 
                  A current fee schedule is available at our offices or upon request.
                </p>
              </section>

              {/* 8. Limitation of Liability */}
              <section>
                <h2 className="font-serif text-2xl font-semibold text-cream-50 mb-4">8. Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by law, Accra Christ The King Credit Union shall not be liable 
                  for any indirect, incidental, special, or consequential damages arising from your use of our services, 
                  including but not limited to loss of profits, data, or business interruption, even if we have been 
                  advised of the possibility of such damages.
                </p>
              </section>

              {/* 9. Privacy and Data Protection */}
              <section>
                <h2 className="font-serif text-2xl font-semibold text-cream-50 mb-4">9. Privacy and Data Protection</h2>
                <p className="mb-4">
                  We are committed to protecting your personal information. Your use of our services is also governed by our Privacy Policy. 
                  We collect, use, and disclose member information only as permitted by applicable law and in accordance with our Privacy Policy.
                </p>
                <p>
                  Information collected is used to provide services, comply with legal obligations, and improve our operations. 
                  We do not sell member information to third parties without consent, except as required or permitted by law.
                </p>
              </section>

              {/* 10. Dispute Resolution */}
              <section>
                <h2 className="font-serif text-2xl font-semibold text-cream-50 mb-4">10. Dispute Resolution</h2>
                <p className="mb-4">
                  Any disputes arising from these terms or your membership shall be resolved through:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Initial discussion with credit union management</li>
                  <li>Complaint procedures as established by the credit union</li>
                  <li>Escalation to the Board of Directors if necessary</li>
                  <li>Applicable legal remedies under Ghanaian law</li>
                </ul>
              </section>

              {/* 11. Modification of Terms */}
              <section>
                <h2 className="font-serif text-2xl font-semibold text-cream-50 mb-4">11. Modification of Terms</h2>
                <p>
                  Accra Christ The King Credit Union reserves the right to modify these terms at any time. 
                  We will notify members of significant changes through our website, email, or written notice. 
                  Your continued use of our services following notification of changes constitutes your acceptance of the modified terms.
                </p>
              </section>

              {/* 12. Governing Law */}
              <section>
                <h2 className="font-serif text-2xl font-semibold text-cream-50 mb-4">12. Governing Law</h2>
                <p>
                  These terms and conditions are governed by and construed in accordance with the laws of the 
                  Republic of Ghana and the Credit Union Regulations in effect. Both parties agree to submit to 
                  the exclusive jurisdiction of the courts of Ghana.
                </p>
              </section>

              {/* 13. Contact Information */}
              <section>
                <h2 className="font-serif text-2xl font-semibold text-cream-50 mb-4">13. Contact Information</h2>
                <p className="mb-4">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-navy-900/50 p-6 rounded-xl border border-gold-400/10">
                  <p className="font-semibold text-cream-50">Accra Christ The King Cooperative Credit Union</p>
                  <p className="text-cream-100/70">14 Jawaharial Nehru Rd, Accra - Ghana</p>
                  <p className="text-cream-100/70">Phone: (233) 302-776-578</p>
                  <p className="text-cream-100/70">Email: accrachristtk.cu@gmail.com</p>
                </div>
              </section>

              {/* Footer Note */}
              <div className="pt-8 border-t border-gold-400/10 mt-12">
                <p className="text-sm text-cream-100/50">
                  © 2026 Accra Christ The King Cooperative Credit Union. All rights reserved. 
                  These Terms of Service constitute the entire agreement between you and the credit union 
                  regarding the use of our services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
