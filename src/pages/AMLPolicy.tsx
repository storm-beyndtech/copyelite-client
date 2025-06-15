import NavBar from '@/components/Navbar';
import React from 'react';

const AMLPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 pt-30">
      <NavBar />
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Anti-Money Laundering Policy
          </h1>
          <div className="text-gray-400 space-y-1">
            <p>Copyelite Ltd.</p>
            <p>AML & Counter-Terrorism Financing Compliance</p>
          </div>
        </div>

        {/* Introduction */}
        <div className="mb-8 bg-slate-900 rounded-lg p-6">
          <p className="text-gray-300 leading-relaxed">
            Copyelite is committed to the highest standards of the Anti-Money
            Laundering (AML) compliance and Counter-Terrorism Financing (CTF).
            To help the government fight the funding of terrorism and money
            laundering activities, law requires all financial institutions to
            obtain, verify, and record information that identifies each person
            opening an account.
          </p>
        </div>

        {/* Money Laundering Definition */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            What is Money Laundering?
          </h2>
          <div className="bg-slate-900 rounded-lg p-6 mb-6">
            <p className="text-gray-300 leading-relaxed mb-4">
              Money laundering is the process of converting funds, received from
              illegal activities (such as fraud, corruption, terrorism, etc.),
              into other funds or investments that look legitimate to hide or
              distort the real source of funds.
            </p>
            <p className="text-gray-300 leading-relaxed">
              The process of money laundering can be divided into three
              sequential stages:
            </p>
          </div>

          <div className="space-y-6">
            {/* Placement */}
            <div className="bg-slate-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-400 mb-3">
                1. Placement
              </h3>
              <p className="text-gray-300 leading-relaxed">
                At this stage, funds are converted into financial instruments,
                such as checks, bank accounts, and money transfers, or can be
                used for purchasing high-value goods that can be resold. They
                can also be physically deposited into banks and non-bank
                institutions (e.g., currency exchangers). To avoid suspicion by
                the company, the launderer may as well make several deposits
                instead of depositing the whole sum at once, this form of
                placement is called smurfing.
              </p>
            </div>

            {/* Layering */}
            <div className="bg-slate-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-400 mb-3">
                2. Layering
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Funds are transferred or moved to other accounts and other
                financial instruments. It is performed to disguise the origin
                and disrupt the indication of the entity that made the multiple
                financial transactions. Moving funds around and changing in
                their form makes it complicated to trace the money being
                laundered.
              </p>
            </div>

            {/* Integration */}
            <div className="bg-slate-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-400 mb-3">
                3. Integration
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Funds get back into circulation as legitimate to purchase goods
                and services.
              </p>
            </div>
          </div>
        </section>

        {/* Our Commitment */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Our Commitment
          </h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              Copyelite adheres to the principles of Anti-Money Laundering and
              actively prevents any actions that aim or facilitate the process
              of legalizing of illegally gained funds. AML policy means
              preventing the use of the company's services by criminals, with
              the aim of money laundering, terrorist financing or other criminal
              activity.
            </p>
            <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
              <p className="text-red-300 font-medium">
                To prevent money laundering, Copyelite neither accepts nor pays
                cash under any circumstances.
              </p>
            </div>
            <p>
              The company reserves the right to suspend any client's operation,
              which can be regarded as illegal or, may be related to money
              laundering in the opinion of the staff.
            </p>
          </div>
        </section>

        {/* Company Procedures */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Company Procedures
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Copyelite will make sure that it is dealing with a real person or
            legal entity. Copyelite also performs all the required measures in
            accordance with applicable law and regulations, issued by regulatory
            authorities.
          </p>

          <div className="bg-slate-900 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              The AML policy is fulfilled through:
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Know Your Customer policy and due diligence</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Monitoring of client activity</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Record keeping</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Know Your Customer */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Know Your Customer and Due Diligence
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Because of the company's commitment to the AML and KYC policies,
            each client of the company has to finish a verification procedure.
            Before Copyelite starts any cooperation with the client, the
            company ensures that satisfactory evidence is produced or such other
            measures that will produce satisfactory evidence of the identity of
            any customer or counterparty are taken.
          </p>

          <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 mb-6">
            <p className="text-yellow-300">
              The company applies heightened scrutiny to clients who are
              residents of countries identified by credible sources as having
              inadequate AML standards or that may represent a high risk for
              crime and corruption.
            </p>
          </div>

          {/* Individual Clients */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-blue-400 mb-4">
              Individual Clients
            </h3>
            <div className="bg-slate-900 rounded-lg p-6 space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">
                  Required Personal Information:
                </h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Full name</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Date of birth</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Country of origin</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Complete residential address</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">
                  Required Documents:
                </h4>
                <p className="text-gray-400 text-sm mb-3">
                  (For documents in non-Latin characters, provide notarized
                  English translation)
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>
                      Current valid passport (showing photo and signature
                      clearly); or
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Driving licence with photograph; or</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>National identity card (front and back pages)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>
                      Proof of current address (utility bills, bank statements,
                      etc.) - not older than 3 months
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Corporate Clients */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-blue-400 mb-4">
              Corporate Clients
            </h3>
            <div className="bg-slate-900 rounded-lg p-6 space-y-4">
              <p className="text-gray-300">
                Listed companies on recognized stock exchanges or wholly owned
                subsidiaries may require minimal additional verification. For
                unquoted companies, the following documentation is required:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>
                    Certificate of Incorporation or national equivalent
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Memorandum and Articles of Association</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>
                    Certificate of good standing or proof of registered address
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>
                    Board resolution to open account and confer authority
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Copies of powers of attorney or other authorities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>
                    Proof of identity of directors and beneficial owners
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Monitoring */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Monitoring of Client Activity
          </h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              In addition to gathering information from clients, Copyelite
              continues to monitor the activity of every client to identify and
              prevent any suspicious transactions.
            </p>
            <div className="bg-slate-900 rounded-lg p-6">
              <h3 className="font-semibold text-white mb-2">
                Suspicious Transaction Definition:
              </h3>
              <p className="text-gray-300">
                A suspicious transaction is known as a transaction that is
                inconsistent with the client's legitimate business or the usual
                client's transaction history known from client activity
                monitoring.
              </p>
            </div>
            <p>
              Copyelite has implemented a system of monitoring transactions
              (both automatic and manual) to prevent the use of the company's
              services by criminals.
            </p>
          </div>
        </section>

        {/* Record Keeping */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Record Keeping
          </h2>
          <div className="bg-slate-900 rounded-lg p-6">
            <p className="text-gray-300 leading-relaxed">
              Records must be kept of all transaction data and data obtained for
              identification purposes, as well as all documents related to money
              laundering topics (e.g., suspicious activity reports, AML account
              monitoring documentation, etc.). These records are maintained for
              a minimum of 7 years after the account is closed.
            </p>
          </div>
        </section>

        {/* Deposit and Withdrawal Requirements */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Deposit and Withdrawal Requirements
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            All deposits and withdrawals on trading accounts held with
            Copyelite must meet the following strict requirements:
          </p>

          <div className="space-y-4">
            <div className="bg-slate-900 rounded-lg p-6">
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>
                    Due to AML/CTF laws, Copyelite cannot receive or deposit
                    funds to third parties
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>
                    Funds sent to Copyelite must be provided on Copyelite
                    platform only
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>
                    All funds withdrawn must go to a bank account, Credit/Debit
                    card, or Alternative Payment Method (Crypto) on Copyelite
                    platform
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>
                    All withdrawal requests are processed on a
                    First-in-First-Out (FIFO) basis according to funding source
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-300 mb-2">
                Important Note:
              </h3>
              <p className="text-yellow-200 text-sm">
                When withdrawing to the original deposit method, the amount may
                not exceed the original deposit. Any profits in excess will be
                transferred to a nominated bank account in the same name as your
                trading account.
              </p>
            </div>
          </div>
        </section>

        {/* Measures Taken */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Measures Taken
          </h2>
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-6">
            <p className="text-red-200 leading-relaxed mb-4">
              In cases of an attempt to execute transactions which Copyelite
              suspects are related to money laundering or other criminal
              activity, we will proceed in accordance with applicable law and
              report suspicious activity to the regulating authority.
            </p>
            <p className="text-red-200 leading-relaxed">
              Copyelite reserves the right to suspend any client's operation
              which can be regarded as illegal or may be related to money
              laundering. Copyelite has complete discretion to temporarily
              block suspicious client accounts or terminate existing client
              relationships.
            </p>
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-slate-800 pt-8 mt-12">
          <p className="text-center text-gray-400 text-sm">
            Anti-Money Laundering Policy | Copyelite Ltd.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AMLPolicy;
