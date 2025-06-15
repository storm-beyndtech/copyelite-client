import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  FileText,
  AlertTriangle,
  Shield,
  Settings,
  Scale,
  Phone,
  Building,
  Gavel,
  Lock,
  DollarSign,
  Clock,
  Globe,
  Search,
} from 'lucide-react';
import NavBar from '@/components/Navbar';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection: React.FC<SectionProps> = ({
  title,
  children,
  icon,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-slate-700 rounded-lg bg-slate-900/50 backdrop-blur-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-800/50 transition-colors rounded-t-lg"
      >
        <div className="flex items-center gap-3">
          {icon}
          <h2 className="text-xl font-semibold text-slate-100">{title}</h2>
        </div>
        {isOpen ? (
          <ChevronDown className="w-5 h-5 text-slate-400" />
        ) : (
          <ChevronRight className="w-5 h-5 text-slate-400" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-slate-300 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
};

const SubSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="mt-6">
    <h3 className="text-lg font-semibold text-slate-200 mb-3">{title}</h3>
    {children}
  </div>
);

const TermsAndConditions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-30">
      <NavBar />
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center gap-4 mb-4">
            <FileText className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-slate-100">
              Client Agreement - Terms and Conditions
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-3xl">
            Copyelite Ltd. Client Agreement - Please read these terms carefully
            before using our services. By using our platform, you agree to be
            bound by these terms and conditions.
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
            <span>Version: December 2023</span>
            <span>•</span>
            <span>Registration Number: 4342-345462</span>
          </div>

          {/* Search */}
          <div className="mt-6 relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>
      </div>

      {/* Risk Warning Banner */}
      <div className="bg-red-950/30 border-l-4 border-red-500 mx-6 mt-8 p-6 rounded-r-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-red-300 mb-2">
              RISK WARNING
            </h3>
            <p className="text-red-200 leading-relaxed">
              Trading leveraged derivative products such as Foreign Exchange
              (Forex), Contracts for Difference (CFDs), or other financial
              derivative products carry a high level of risk to your capital.
              All these products, which are leveraged derivative products, may
              not be appropriate for all investors without an expert. The effect
              of leverage is that both gains and losses are magnified. The
              prices of leveraged derivative products may change to your
              disadvantage very quickly, you can lose more than your invested
              capital, and you may be required to make further payments. Before
              deciding to invest in any financial product, you should carefully
              consider your investment objectives, trading knowledge and
              experience, and affordability. You should only trade in Forex and
              CFDs if you have sufficient knowledge and experience of the risky
              nature of the products, the risks involved in trading such
              products, and if you are dealing with money that you can afford to
              lose. You should seek independent professional financial advice if
              you are in any doubt.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="space-y-6">
          <CollapsibleSection
            title="1. THIS AGREEMENT"
            icon={<FileText className="w-5 h-5 text-blue-400" />}
            defaultOpen={true}
          >
            <SubSection title="1.1. INTRODUCTION">
              <div className="space-y-3 text-sm">
                <p>
                  a) These Terms together with your completed and submitted
                  Application Form comprise the Client Agreement between
                  Copyelite Ltd. ("we", "us" or "Copyelite"), an international
                  business company regulated by U.S Securities And Exchange
                  under registration number: 4342-345462.
                </p>
                <p>
                  b) If the Client is comprised of two or more legal persons,
                  then a reference to a right or obligation of the Client under
                  this Agreement or a transaction contemplated by this Agreement
                  confers that right or imposes that obligation jointly and
                  severally on those persons.
                </p>
                <p>
                  c) This is a master agreement and sets out the terms and
                  conditions upon which dealings between you and us relating to
                  the provision of advice to the Client or the execution of
                  Orders.
                </p>
                <p>
                  d) The Client may forfeit part or all any Deposit in the event
                  of cancellation. Where Copyelite has suffered loss, it
                  reserves the right to set off against the Client's Deposit or
                  any other funds received from the Client, any charges, fees or
                  losses sustained by Copyelite in closing out the Order.
                </p>
              </div>
            </SubSection>

            <SubSection title="3.3. CURRENCY CONVERSIONS">
              <div className="text-sm space-y-3">
                <p>
                  a) Money can be paid under the Agreements in these currencies:
                  Australian Dollars (AUD), United States Dollars (USD), British
                  Pound Sterling (GBP), Euro (EUR), Canadian Dollars (CAD),
                  Japanese Yen (JPY), New Zealand Dollars (NZD), Singapore
                  Dollars (SGD) or Hong Kong Dollars (HKD).
                </p>
                <p>
                  b) Realized profits and losses will be converted into the
                  currency specified for the trade and will be converted into
                  the Base Currency of the Account at the current spot rate
                  immediately on closing-Out a Position.
                </p>
                <p>
                  c) If the Client makes a payment to Copyelite in a different
                  currency than the Base Currency of the Account, the payment
                  will be converted into the Base Currency of the Account at the
                  spot rate given by Copyelite' financial provider.
                </p>
              </div>
            </SubSection>

            <SubSection title="3.4. TRADING CONFIRMATIONS AND STATEMENTS">
              <div className="text-sm space-y-3">
                <p>
                  a) Each time the Client places an Order with Copyelite, a
                  confirmation of the executed trade will appear in the
                  Copyelite Trading Platform.
                </p>
                <p>
                  b) The Client consents to receive Trade Confirmations by
                  electronic means including, for example, through any Online
                  Service.
                </p>
                <p>
                  c) Copyelite will make available Daily and Monthly Statements
                  via Copyelite Trading Platform or online service.
                </p>
                <p>
                  d) Following the end of day settlement time, provided the
                  Client has transacted or has an open Position, Copyelite
                  Trading Platform will produce a Daily Statement which will be
                  emailed to the Client at their registered email address and
                  then made available on the Copyelite Trading Platform.
                </p>
                <p>
                  e) Following month-end, Copyelite will produce an electronic
                  version of the Client's trading statement which will be
                  emailed to the Client and be available on the Copyelite
                  Trading Platform.
                </p>
                <p>
                  f) The Client is responsible for promptly checking all
                  contents of Confirmations and the Daily and Monthly
                  Statements. The client must immediately notify Copyelite if
                  they become aware that there is an error in the Confirmation
                  or the Statements. Copyelite is entitled to assume that the
                  Confirmations and Statements are correct unless the Client
                  notifies Copyelite of any error within 48 hours following us
                  giving the Confirmation or the Statements becoming available
                  to the Client.
                </p>
              </div>
            </SubSection>

            <SubSection title="3.5. TELEPHONE AND EMAIL TRANSACTIONS">
              <div className="text-sm space-y-3">
                <p>
                  a) An Authorized User may request Copyelite to accept
                  Instructions and enter Orders by telephone. Copyelite has
                  sole discretion to accept Instructions and enter Orders by
                  telephone.
                </p>
                <p>
                  b) Copyelite may check the authority of the caller by
                  requesting the caller give his or her name and confirming that
                  such name has been notified to Copyelite by the Client as an
                  Authorized User.
                </p>
                <p>
                  c) The Client acknowledges and agrees that Copyelite may make
                  a recording of each telephone Instruction and any other
                  conversation received from a Client or an Authorized User. The
                  recording remains the property of Copyelite and can be used
                  to confirm terms and conditions of any transaction where there
                  is a dispute, and for training and monitoring purposes.
                </p>
                <p>
                  d) An Authorized User may request Copyelite to accept
                  Instructions and enter Orders by email. The Client
                  acknowledges and agrees that upon the acceptance by Copyelite
                  of the Client's Instructions, the Client shall be bound by
                  those Instructions.
                </p>
              </div>
            </SubSection>

            <SubSection title="3.6. ONLINE SERVICES">
              <div className="text-sm space-y-3">
                <p>
                  a) If the Client or the Client's Authorized User uses any of
                  the Online Services, the Client or Authorized User will be
                  able to:
                </p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>place your Orders or issue Instructions to Copyelite</li>
                  <li>
                    enquire as to the availability or pricing or value of one or
                    more Financial Products
                  </li>
                  <li>
                    receive market data and other information in relation to one
                    or more Financial Products
                  </li>
                  <li>monitor your obligations under this Agreement</li>
                  <li>
                    receive Confirmations, Account balances or other information
                    in connection with your Account
                  </li>
                  <li>
                    use such other facilities as Copyelite may from time to
                    time make available through the Online services
                  </li>
                </ul>
                <p>
                  b) The Client must provide Copyelite on request with a list
                  of Authorized User(s) and is responsible for informing
                  Copyelite with any changes to that list.
                </p>
                <p>
                  c) An Online Service may be a proprietary service provided by
                  Copyelite or a service provided to you by a third party
                  pursuant to an arrangement with Copyelite.
                </p>
                <p>
                  d) The Client is responsible for complying with the operations
                  aspects of Online Services provided by Copyelite or the
                  provider of the Online Services.
                </p>
                <p>
                  e) Copyelite may at any time without notice suspend, withdraw
                  or deny access to the Online Services to a Client or one or
                  more of the Client's Authorized Users for any reason including
                  security, quality of service, failure to pay amounts when due
                  or breach of any provision of this Agreement.
                </p>
                <p>
                  f) Clients can contact Copyelite in writing to terminate
                  their access to an Online Service.
                </p>
                <p>
                  g) Copyelite can delay, decline or reverse any Order if
                  Copyelite reasonably suspects that the transaction might be
                  unlawful, associated with financial crime, that the Client has
                  engaged in Suspicious Trading Activity, believes that carrying
                  out the transaction might breach compliance obligations, or
                  believes that the Client is in breach of this Agreement.
                </p>

                <p>k) The Client must not:</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>
                    permit any person (other than an Authorized User) to use the
                    Security Details or to access the Online Service
                  </li>
                  <li>
                    provide, disclose or make available the Security Details to
                    any person (other than an Authorized User)
                  </li>
                  <li>
                    misuse any of the Online Services by knowingly introducing
                    viruses, trojans, worms, logic bombs or other malicious
                    material
                  </li>
                  <li>
                    attempt to gain unauthorized access to any of the Online
                    Services or any connected server, computer or database
                  </li>
                  <li>
                    attack any of the Online Services via a denial-of-service
                    attack or a distributed denial-of-service attack
                  </li>
                </ul>

                <p>l) The Client acknowledges and agrees that:</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>
                    Access to Online Services can only be granted using the
                    Security Details
                  </li>
                  <li>
                    The Client is responsible for the consequences of any
                    unauthorized disclosure or use of the Security Details
                  </li>
                  <li>
                    Copyelite is entitled to rely on all Instructions given
                    using the Security Details
                  </li>
                  <li>
                    Copyelite is not liable for any loss caused by it acting on
                    Instructions using the Security Details
                  </li>
                  <li>
                    There may be delays in processing, execution, amendment or
                    cancellation of Orders
                  </li>
                  <li>Any Online Service is provided on an "as is" basis</li>
                  <li>
                    There are significant risks in trading through Online
                    Services due to computer and telecommunications systems
                  </li>
                  <li>
                    The Client will be liable for all Orders made when using
                    Online Services including instances of misuse, fraud or
                    abuse
                  </li>
                  <li>
                    Copyelite may change minimum specifications and make
                    operational changes at any time
                  </li>
                  <li>
                    The Client is responsible for ensuring alternative
                    arrangements if Online Services cease to be available
                  </li>
                </ul>

                <p>
                  m) Clients are responsible for obtaining, maintaining and
                  ensuring compatibility of their electronic software, devices
                  and equipment. Copyelite will not be responsible for any loss
                  of or damage to a client's data, software, computer, or
                  equipment unless directly and solely caused by our negligence.
                </p>
                <p>
                  n) Clients are responsible for ensuring that their electronic
                  devices are free from viruses and other malware. Copyelite
                  cannot guarantee that Online Services will be free from
                  infection.
                </p>
                <p>
                  o) By breaching this provision, a Client may also commit a
                  criminal offence. Copyelite may report any such breach to law
                  enforcement authorities and will co-operate by disclosing a
                  Client's identity to them.
                </p>
              </div>
            </SubSection>

            <SubSection title="3.7. HEDGED POSITIONS">
              <div className="text-sm space-y-3">
                <p>
                  a) Copyelite may allow you to execute Hedged Positions on
                  some Financial Products from time to time. A Hedged Position
                  is an Open Position that is opposite of another Open Position.
                  In other words, it is the same Financial Product, but the
                  opposite direction (i.e., you are the Long Party and the Short
                  Party). A Hedged Position may be a Fully Hedged Position or a
                  Partially Hedged Position.
                </p>
                <p>
                  b) Copyelite reserves the right to reduce the Deposit to zero
                  for Fully Hedged Positions. We also reserve the right to
                  reduce the Deposit for Partially Hedged Positions. If we
                  choose to reduce the Deposit, we do not waive the right to
                  require a deposit at any given time.
                </p>
                <p>
                  c) You acknowledge and agree that if the Deposit for a Hedged
                  Position has been reduced and you close any Open Position that
                  forms part of the Hedged Position, it will immediately trigger
                  the full Deposit for the Open Position. If you do not have
                  sufficient Deposit such Open Position will be closed in
                  accordance with clause 3.2 (c).
                </p>
                <p>
                  d) Copyelite may close all or part of any Hedged Position at
                  any time without notice at the Close-Out Value where we
                  reasonably believe that the Hedged Position is being abused by
                  a Client including where we reasonably believe that such
                  Hedged Positions are not in the ordinary course of trading, or
                  where it constitutes Suspicious Trading Activity. The Company
                  reserves the right to proceed with immediate account
                  termination, with or without prior notification to the client.
                  The Company is further entitled to reverse any profits accrued
                  from suspicious trading and/or terminate the trading account.
                </p>
              </div>
            </SubSection>

            <SubSection title="3.8. DELAYS AND QUOTING ERRORS">
              <div className="text-sm space-y-3">
                <p>
                  a) While Copyelite will make every reasonable effort to
                  process the Client's Order promptly, in the absence of gross
                  negligence or wilful misconduct, Copyelite cannot be held
                  liable for delays, damages, failures, or errors in the
                  completion of the Order, including instances of off quotes
                  situations.
                </p>
                <p>
                  b) In the event of a quoting or off quote error, Copyelite:
                  i. is not liable and responsible for any damages, claims,
                  losses, liabilities, or costs arising from the error; ii.
                  reserves the right to restrict or suspend the trading
                  activities of the involved Client until further notice; and
                  iii. reserves the right to make the required adjustments to
                  rectify the error.
                </p>
                <p>
                  c) Any dispute arising from a quoting or off quote error will
                  be resolved based on the fair market value, as determined by
                  Copyelite acting reasonably, of the relevant currency at the
                  time such quoting error occurred.
                </p>
                <p>
                  d) If Copyelite is unable to perform its obligations under
                  this Agreement or an Order because of factors beyond its
                  control or because of a Force Majeure Event, Copyelite will
                  notify the Client as soon as is reasonably practicable and
                  will use reasonable endeavors to secure the return of any
                  money paid by the Client.
                </p>
                <p>
                  e) Copyelite may give a Notice to the Client at any time if
                  it forms the view that market conditions in the relevant
                  financial market for the currency concerned are seriously
                  disturbed. When such Notice is given, Copyelite's obligations
                  will be suspended while it and the Client negotiate
                  alternative arrangements.
                </p>
              </div>
            </SubSection>

            <SubSection title="3.9. TRADING HOURS">
              <div className="text-sm space-y-3">
                <p>
                  a) Trading hours for Margin FX Contracts and CFDs vary and
                  will depend on the relevant Underlying Instrument's hours of
                  operation. The trading hours are published on our website.
                </p>
                <p>
                  b) We are under no obligation to quote prices or accept Orders
                  on a public holiday in any jurisdiction which, in our
                  reasonable opinion, affects the relevant value of the
                  underlying asset or assets to the OTC derivative contract
                  Copyelite offers. We give notice of such public holidays and
                  the underlying asset or assets affected on the Online Service.
                </p>
              </div>
            </SubSection>
          </CollapsibleSection>

          <CollapsibleSection
            title="4. MARGIN"
            icon={<Shield className="w-5 h-5 text-orange-400" />}
          >
            <SubSection title="4.1. INITIAL MARGIN">
              <p className="text-sm">
                Before placing a trade that creates an open Position the Client
                is required to pay into the Account the Initial Margin for that
                Position as calculated by Copyelite.
              </p>
            </SubSection>

            <SubSection title="4.2. MARGIN OBLIGATIONS">
              <div className="text-sm space-y-3">
                <p>
                  a) The Client must pay to Copyelite such amounts of Margin as
                  it may require under this Agreement.
                </p>
                <p>
                  b) A Margin Deposit is credited by Copyelite at the time
                  cleared funds have been received into the Client Account or
                  such earlier time as allowed by Copyelite, so a Margin
                  requirement for any anticipated or Open Positions by
                  Copyelite is not satisfied unless and until the Client's
                  payment is received in cleared funds into the Client Account.
                </p>
                <p>
                  c) Copyelite will not be liable for any losses including
                  losses arising from real or Open Positions if a Margin Deposit
                  or payment is not received in cleared funds into the Client
                  Account.
                </p>
                <p>
                  d) The Client must maintain at least the amount of Margin
                  required by Copyelite whether or not Copyelite gives any
                  notice to the Client to make those payments. The required
                  amount of Margin can change continuously, including over the
                  weekend or other non-trading days.
                </p>
                <p>
                  e) It is the Client's sole responsibility to always monitor
                  through the Copyelite Trading Platform any notifications that
                  Copyelite may provide, the Margin deposited or any Minimum
                  Margin requirement under this Agreement having regard to: your
                  open Positions; the volatility of any relevant Underlying
                  Instrument; the volatility of the Underlying Market and the
                  markets generally; any applicable Exchange Rate risk; and the
                  time it will take for you to remit sufficient cleared funds to
                  Copyelite.
                </p>
                <p>
                  f) The Client must ensure that for as long as they have an
                  Open Position, their account is sufficiently funded to cover
                  the required Margin. If not, the Client's Open Position may be
                  Closed Out by Copyelite without prior notice to the Client.
                </p>
                <p>
                  g) Copyelite may, in its absolute discretion, provide the
                  Client with further time to meet their Margin Requirements.
                  Such permission will only be effective once confirmed in
                  writing by Copyelite and only to the extent provided in the
                  notice.
                </p>
                <p>
                  h) If Copyelite asks the Client to transfer money to it to
                  meet its Margin requirement, the client must take this action
                  immediately. If they don't, Copyelite will consider it a
                  Default Event under these terms. Copyelite may also cancel
                  any Orders or Close-Out one or more of the Client's positions
                  at its sole discretion without being liable to the Client.
                </p>
              </div>
            </SubSection>

            <SubSection title="4.3. MARGIN CLOSE-OUT">
              <p className="text-sm">
                Copyelite Margin practice is an automated process where the
                Copyelite Electronic Trading Platform displays a visual warning
                on your Account online at different Margin levels. If the funds
                in your Account only cover 80% of the margin requirements, a
                Margin Call alert will be triggered, and you will receive a
                visual warning automatically on the Copyelite Trading Platform.
                If the funds available in your account only covers 50% of the
                margin requirements for your open Margin FX or CFD positions,
                your worst-performing Margin FX or CFD positions (i.e., the CFD
                with the largest margin requirement) will be automatically
                closed out.
              </p>
            </SubSection>

            <SubSection title="4.4. CHANGING MARGIN PERCENTAGE">
              <div className="text-sm space-y-3">
                <p>
                  a) Copyelite may vary the Margin Percentage in respect of any
                  Position at any time by giving notice in accordance with
                  clause 16.
                </p>
                <p>
                  b) Any variation of the Margin Percentage and/or increase in
                  Margin or Minimum Margin requirement will be due and payable
                  immediately on Copyelite demand.
                </p>
              </div>
            </SubSection>

            <SubSection title="4.5. MARK TO MARKET PAYMENTS">
              <div className="text-sm space-y-3">
                <p>
                  a) Copyelite calculates the Order Value as at each Valuation
                  Time.
                </p>
                <p>
                  b) If at a Valuation Time the Order Value is greater than the
                  Previous Order Value: the Short Party must pay the Long Party
                  the excess of the Order Value over the Previous Order Value;
                  or the seller must pay the buyer the excess of the Order Value
                  over the Previous Order Value.
                </p>
                <p>
                  c) If at a Valuation Time the Order Value is less than the
                  Previous Order Value: the Long Party must pay the Short Party
                  the excess of the Previous Order Value over the Order Value;
                  or the buyer must pay the seller the excess of the Previous
                  Order Value over the Order Value.
                </p>
                <p>
                  d) All Mark to Market Payments: i. Copyelite owes to the
                  Client are credited to your account; and ii. you owe to us are
                  debited from your account, on the Same Day as the relevant
                  Valuation Time or Close-out Date.
                </p>
              </div>
            </SubSection>

            <SubSection title="4.6. FORCED LIQUIDATION">
              <div className="text-sm space-y-3">
                <p>
                  a) The Client is required to maintain a sufficient level of
                  Margin. Copyelite reserves its rights to close out all Open
                  Positions: i. if at any time the Deposit held by Copyelite is
                  approaching or is no longer sufficient to cover the negative
                  mark to market value of any or all Open Positions that the
                  Client has open with Copyelite; or ii. at any time, and from
                  time to time, Copyelite determines that the value of all of
                  the Client's Open Positions represents a substantial net
                  unrealized loss to the Client such that, in Copyelite'
                  belief, the continued trading, or failure to Close Out, one or
                  more of the Client's Open Positions will or is likely to
                  materially prejudice the Client's Account Value.
                </p>
                <p>
                  b) Copyelite shall have the right, at our sole discretion, to
                  determine the Mark to Market value from time to time.
                </p>
                <p>
                  c) In addition to other remedies available to Copyelite, if
                  the Client fails to pay any amount when due under this
                  Agreement, or if a Default Event occurs, Copyelite has the
                  right to terminate (by either buying or selling) any or all of
                  the Client's Open Positions.
                </p>
              </div>
            </SubSection>
          </CollapsibleSection>

          <CollapsibleSection
            title="5. CHARGES AND CREDITS TO THE ACCOUNT"
            icon={<DollarSign className="w-5 h-5 text-yellow-400" />}
          >
            <SubSection title="5.1. INTEREST CHARGES ON OPEN MARGIN FX POSITIONS">
              <div className="text-sm space-y-3">
                <p>
                  a) Where an Order for a Margin FX contract is held overnight,
                  the Order is subject to a Swap Charge or Swap Credit
                  determined by Copyelite in accordance with this clause:
                </p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>
                    if the Client is the Long Party and the Bought Swap Rate is
                    higher than the Sell Swap Rate, Copyelite must pay you
                    interest on the Open Position of any Orders at the rate that
                    is the Bought Swap Rate minus the Sell Swap Rate;
                  </li>
                  <li>
                    if the Client is the Long Party and the Bought Swap Rate is
                    less than the Sell Swap Rate, the Client must pay Copyelite
                    interest on the Open Position of any Orders at the rate that
                    is the Bought Swap Rate minus the Sell Swap Rate;
                  </li>
                  <li>
                    if the Client is the Short Party and the Sell Swap Rate is
                    higher than the Bought Swap Rate, Copyelite must pay the
                    Client interest on the Open Position of any Orders at the
                    rate that is the Bought Swap Rate minus the Sell Swap Rate;
                    and
                  </li>
                  <li>
                    if the Client is the Short Party and the Sell Swap Rate is
                    lower than the Bought Swap Rate, the Client must pay
                    Copyelite interest on the Open Position of any Orders at
                    the rate that is the Bought Swap Rate minus the Sell Swap
                    Rate.
                  </li>
                </ul>
                <p>
                  b) Where an Order for a Margin FX contract is held at the
                  Close of Trade on a Wednesday, the Swap Charge or Swap Credit
                  is adjusted to reflect interest rate changes in the Currency
                  Pair until the following Monday.
                </p>
                <p>
                  c) Where an Order for a Margin FX contract is held overnight,
                  the Client agrees to pay Copyelite a transaction fee of up to
                  10% of the value of the Swap Charge or Swap Credit.
                </p>
                <p>
                  d) Swap Charges or Swap Credits and Copyelite' transaction
                  fee are calculated and applied to your account at the
                  beginning of the next Trading Day.
                </p>
                <p>
                  e) No Swap Charge, Swap Credit or transaction fee is payable
                  where an Order for a Margin FX contract is opened and closed
                  on the same Trading Day.
                </p>
              </div>
            </SubSection>

            <SubSection title="5.2. INTEREST CHARGES ON OPEN SPOT CFD POSITIONS">
              <div className="text-sm space-y-3">
                <p>
                  a) Where an Order for a Spot CFD is held overnight, the Order
                  is subject to a Swap Charge or Swap Credit determined by
                  Copyelite multiplying the value of the contract at the end of
                  the Trading Day by the Reference Interest Rate and adjusted
                  for any dividend in relation to the underlying asset or
                  instrument.
                </p>
                <p>
                  b) Copyelite may, on its website, designate a spot CFD as a
                  swap-free Spot CFD. Where an Order for a swap-free CFD
                  contract is held overnight, the Order will not be subject to a
                  Swap Charge or Swap Credit for the first seven days that the
                  Order is held overnight provided that the Client does not
                  engage in Suspicious Trading Activity with respect to the
                  Order. If the Order remains open for more than seven days, the
                  Order may be subject to a Swap Charge or Swap Credit from day
                  eight onwards. If Copyelite reasonably believes that a Client
                  has engaged in Suspicious Trading Activity with respect to a
                  swap-free Spot CFD, Copyelite reserves the right to apply
                  Swap Charges or Swap Credits retrospectively from the opening
                  of the Order.
                </p>
                <p>
                  c) Where an Order for a Spot CFD (except for Cryptocurrency
                  CFD) is held at the Close of Trade on a Friday, the Swap
                  Charge or Swap Credit is adjusted to reflect the cost of
                  holding the position until the following Monday.
                </p>
                <p>
                  d) Swap Charges or Swap Credits in relation to Spot CFDs are
                  calculated and applied to your account at the beginning of the
                  next Trading Day.
                </p>
                <p>
                  e) No Swap Charge or Swap Credit is payable where an Order for
                  a Spot CFD is opened and closed on the same Trading Day.
                </p>
              </div>
            </SubSection>

            <SubSection title="5.3. ROLLOVER CHARGES & CREDITS FOR OPEN FUTURES CFD POSITIONS">
              <div className="text-sm space-y-3">
                <p>
                  a) Where an Order for a Futures CFD is held overnight, the
                  Order is not subject to a Swap Charge or Swap Credit.
                </p>
                <p>
                  b) Where an Order for a Futures CFD is held at the Close of
                  Trade on the Close-Out Date, the Order is automatically rolled
                  over meaning that the contract is closed, and a new Order is
                  created for the Futures CFD on the next Trading Day at the new
                  contract price. Copyelite will not automatically roll over an
                  Open Position for a Futures CFD held at the Close of Trade on
                  the Close-Out Date unless Copyelite has provided reasonable
                  notice to the Client of the Close-Out Date and the position
                  remains open after this date.
                </p>
                <p>
                  c) Where an Order for a Futures CFD is held at the Close of
                  Trade on the Close-Out Date, an adjustment will be applied to
                  the Client's account to reflect the difference between the old
                  contract price and the new contract price for the Futures CFD
                  less an administration fee of 2.5 basis points payable to
                  Copyelite.
                </p>
                <p>
                  d) Cash adjustments will be applied to the Client's account on
                  the first Trading Day of the new contract.
                </p>
              </div>
            </SubSection>

            <SubSection title="5.4. COMMISSIONS FEES AND EXPENSES">
              <div className="text-sm space-y-3">
                <p>
                  a) In addition to any other fees or charges set out in these
                  Terms, the Client agrees to pay: i. an amount equal to any
                  other fee charged or levied on Copyelite, or other expense
                  incurred by Copyelite, arising from any action taken pursuant
                  to this Agreement; and ii. all relevant taxes and expenses
                  incurred by the Client in connection with this Agreement.
                </p>
                <p>
                  b) The Client confirms and acknowledges that Copyelite is,
                  without limiting its powers to recover amounts owing by the
                  Client to Copyelite in any other way, permitted to deduct,
                  without further reference to the Client, charges relating to
                  any services provided by Copyelite including administration
                  charges (including but not limited to fees associated with
                  returned cheques, payment processing, debt collection and
                  telephone transcript copies), charges relating to the use of
                  the Online Services and any transaction fees charged to
                  Copyelite by others with respect to the Client's transactions
                  including, but not limited to tracing fees.
                </p>
                <p>
                  c) Copyelite may in its absolute discretion waive or reduce
                  fees or transaction charges, for individual clients or for
                  classes of clients, for any length of time, with or without
                  conditions, without notice.
                </p>
                <p>
                  d) The Client acknowledges that should they affect an Order
                  with Copyelite, the Client must pay all transaction charges,
                  fees, settlements, interest and any other amounts due under
                  this Agreement on demand by Copyelite in cleared funds or
                  otherwise as required in accordance with the terms of this
                  Agreement.
                </p>
                <p>
                  e) The Client agrees that Copyelite may at any time share
                  transaction fees and charges with any other persons without
                  being required to disclose the sharing of such fees and
                  charges to the Client unless such disclosure is required by
                  Law.
                </p>
              </div>
            </SubSection>

            <SubSection title="5.5. SWAP FREE OR ISLAMIC ACCOUNT">
              <div className="text-sm space-y-3">
                <p>
                  a) Clients who hold a Swap Free Account will be charged an
                  administrative fee instead of being credited or debited with a
                  Swap Charge when holding a position overnight. Copyelite
                  reserves the right to change the administration charges from
                  time to time. Apart from this difference, Swap-Free Accounts
                  have the same trading conditions and terms as Copyelite'
                  regular Client accounts.
                </p>
                <p>
                  b) If a Client holds an existing regular account and wishes to
                  convert that account to a Swap Free Account, the client must
                  make a request in writing to our support team. The conversion
                  from a regular account to a Swap Free Account can only take
                  place if all positions on the regular accounts are closed and
                  the account is reconciled.
                </p>
                <p>
                  c) Swap Free Accounts are to be used in good faith and, the
                  Client may not use the Swap-Free Account to make profits from
                  swaps or, not paying swaps. The Client may not request the
                  payment of any Swap Credit amounts that have been lost as a
                  result of converting Client account(s) into one or more
                  Swap-Free Accounts for the period during which the Client's
                  account(s) have been converted into one or more Swap Free
                  Accounts.
                </p>
                <p>
                  d) Copyelite reserves the right to revoke or cancel a Swap
                  Free Account without having to provide any reason. If
                  Copyelite detects that a Swap Free Account is being abused by
                  taking advantage of not paying swaps, in the form of, but not
                  limited to; fraud, manipulation, cash-back arbitrage, carry
                  trades, or other forms of deceitful or fraudulent activity
                  with the usage of a Swap Free Account, then Copyelite
                  reserves the right to take immediate action with immediate
                  effect, revoking all live trading accounts that are under
                  suspicion of exploitation; correction and recovery of accrued
                  swaps and related accrued interest expenses and/or costs
                  pertaining to and all of the Client's Swap-Free Accounts for
                  the period which the accounts were converted into Swap-Free
                  Accounts; with immediate effect, termination of the Agreement;
                  and/or with immediate effect, nullifying all trades carried
                  out on client's trading accounts and cancelling any profits
                  earned or losses incurred on such client's trading accounts.
                </p>
              </div>
            </SubSection>
          </CollapsibleSection>

          <CollapsibleSection
            title="6. GUARANTEE"
            icon={<Building className="w-5 h-5 text-indigo-400" />}
          >
            <div className="text-sm space-y-3">
              <p>
                a) A Client's obligations under the Agreement must be
                guaranteed: i. where the Client (including a trustee) is a
                company, by each director of the Company; and ii. in any other
                circumstance, where Copyelite determines, in its absolute
                discretion, that such guarantee is required.
              </p>
              <p>
                b) The Guarantor acknowledges that Copyelite is acting in
                reliance on the Guarantor incurring obligations and giving
                rights under this guarantee and indemnity.
              </p>
              <p>
                c) The Guarantor unconditionally and irrevocably guarantees to
                Copyelite compliance with their obligations in connection with
                the Agreement, including each obligation to pay money.
              </p>
              <p>
                d) If the Client does not comply with those obligations on time
                and in accordance with the Agreement, then the Guarantor agrees
                to comply with those obligations on demand from Copyelite. A
                demand may be made whether Copyelite has made demand on the
                Client.
              </p>
              <p>
                e) The Guarantor indemnifies Copyelite against any liability or
                loss arising from, and any costs it incurs, if: i. the Client
                does not, or is unable to, comply with an obligation the Client
                has (including an obligation to pay money) in connection with
                the Agreement; or ii. an obligation the Client would otherwise
                have under the Agreement is found to be unenforceable; or iii.
                an obligation the Guarantor would otherwise have under clause 6
                is found to be unenforceable; or iv. a representation or
                warranty by the Client in the Agreement is found to have been
                incorrect or misleading when made.
              </p>
              <p>
                f) The Guarantor agrees to pay amounts due under clause 6 on
                demand from Copyelite.
              </p>
              <p>
                g) Copyelite needs not incur expense or make payment before
                enforcing this right of indemnity.
              </p>
              <p>
                h) The guarantee in clause 6 is a continuing obligation despite
                any intervening payment, settlement or other thing and extends
                to all of the Client's obligations in connection with the
                Agreement. The Guarantor waives any right it has of first
                requiring Copyelite to commence proceedings or enforce any
                other rights against the Client or any other person before
                claiming from the Guarantor under this guarantee and indemnity.
              </p>
              <p>
                i) The Guarantor acknowledges that, before entering into this
                guarantee and indemnity, it: i. was given a copy of the
                Agreement and had full opportunity to consider their provisions;
                and ii. is responsible for making itself aware of the Client's
                financial position and any other person who guarantees any of
                the Client's obligations in connection with the Agreement.
              </p>
              <p>
                j) The Guarantor agrees to make payments under this guarantee
                and indemnity: i. in full without set-off or counterclaim, and
                without any withholding or deduction unless prohibited by law;
                and ii. in the currency in which the payment is due, and
                otherwise in United States dollars, in immediately available
                funds.
              </p>
              <p>
                k) If the Guarantor makes a payment that is subject to any
                withholding or deduction, the Guarantor agrees to pay Copyelite
                such additional amount to ensure that the amount received by
                Copyelite equals the full amount Copyelite would have received
                had no withholding or deduction been made.
              </p>
              <p>
                l) The rights given to Copyelite under this guarantee and
                indemnity, and the Guarantor's liabilities under it, are not
                affected by any act or omission of us or any other person. For
                example, those rights and liabilities are not affected by any
                act or omission: i. varying or replacing the Agreement;
                releasing the Client or giving the Client a concession; ii.
                releasing any person who gives a guarantee or indemnity in
                connection with any of the Client's obligations; iii. by which a
                person becomes a Guarantor after the date of this guarantee and
                indemnity; iv. by which the obligations of any person who
                guarantees any of the Client's obligations may become
                unenforceable; v. by which any person who was intended to
                guarantee any of the obligations does not do so or does not do
                so effectively; vi. by which a person who is co-surety or
                co-indemnifier is discharged under a Client Agreement or by
                operation of law; vii. a person dealing in any way with the
                Agreement or this guarantee and indemnity; viii. the death,
                mental or physical disability, or liquidation, administration or
                insolvency of any person including the Client or the Guarantor;
                ix. changes in the membership, name or business of any person;
                x. acquiescence or delay by Copyelite or any other person.
              </p>
              <p>
                m) If any obligation is required, or may be required, to be
                complied with in connection with this guarantee and indemnity,
                the Guarantor may not, without our consent: i. reduce its
                liability under this guarantee and indemnity by claiming that
                the Client or any other person has a right of set-off or
                counterclaim against Copyelite; or ii. exercise any legal right
                to claim to be entitled to the benefit of another guarantee,
                indemnity, mortgage, charge or other encumbrance given in
                connection with the Agreement; or iii. claim an amount from the
                Client, or another guarantor under a right of indemnity; or iv.
                claim an amount in your liquidation, administration or
                insolvency or of another guarantor of any of your obligations.
              </p>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="7. CORPORATE ACTIONS"
            icon={<Building className="w-5 h-5 text-cyan-400" />}
          >
            <div className="text-sm space-y-3">
              <p>
                a) If a Corporate Action occurs, Copyelite will reasonably
                determine what adjustment, if any, should be made to an Order to
                account for the dilutive or concentrative effect of any such
                event to preserve the economic equivalent of such Orders prior
                to the relevant event or to reflect the effect of such event on
                such Orders. Any such adjustments will be effective as of a date
                reasonably determined by us.
              </p>
              <p>
                b) Copyelite will make dividend payments if: i. a Client is the
                Long Party for a Share CFD which goes ex-dividend, Copyelite
                will credit the Client's account with a cash adjustment to
                reflect the impact of the dividend on the Orders. The amount of
                the adjustment will depend on the amount of the gross dividend
                on the relevant number of Share CFDs on the ex-dividend date;
                ii. a Client is the Short Party for a Share CFD which goes
                ex-dividend, Copyelite will debit the declared cash dividend
                from the Client's account. The amount of the adjustment will
                depend on the amount equal to the gross dividend on the relevant
                number of Share CFDs on the ex-dividend date.
              </p>
              <p>
                c) If an underlying asset to which an Open Position relates is
                subject to a Merger Event, Copyelite reserves the right to
                close any or all affected Open Positions at any time during the
                Merger Event. Copyelite will not close any Open Position that
                is subject to a Merger Event unless it has provided reasonable
                notice to the Client of a deadline for the Client to close their
                Open Position and the position remains open after this deadline.
              </p>
              <p>
                d) Copyelite reserves the right to adjust the opening price of
                any Financial Product that is subject to a Merger Event to
                reflect any cash portion of the offeror to amend the size to
                reflect any corresponding adjustment to the underlying asset
                caused by the Merger Event and/or to close the affected Open
                Positions and reopen a new position reflecting the new
                underlying asset that has been created.
              </p>
              <p>
                e) Where there is no reasonable basis for determining an
                adjustment under clause 7(e) which would produce a commercially
                reasonable result, Copyelite may close your Open Position at
                the Close-Out Value on a date reasonably determined by us.
              </p>
              <p>
                f) Where the Client is the Long Party for a Share CFD in
                relation to a US stock or security, and the Share CFD goes
                ex-dividend, Copyelite is required by US tax legislation to
                withhold 30% of the cash adjustment to reflect the impact of the
                declared dividend. Copyelite will remit the amount withheld to
                its liquidity provider who will account the withheld amounts to
                the proper US authorities. Clients can view amounts withheld for
                US tax legislation purposes from their account.
              </p>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="8. TRADING SUSPENSION AND DISRUPTION"
            icon={<Clock className="w-5 h-5 text-red-400" />}
          >
            <div className="text-sm space-y-3">
              <p>
                a) If, at any time: i. trading in any Underlying Asset on any
                exchange is suspended or halted; or ii. trading is suspended or
                halted on any exchange which restricts trading with any relevant
                index so that Copyelite is unable to determine the price of the
                Underlying Asset, then Copyelite will take the price of the
                Underlying Asset as being the last traded price before the
                trading suspension or halt.
              </p>
              <p>
                b) If the suspension or halt continue for 5 Business Days,
                Copyelite at its discretion may Close-Out your part or all of
                your Positions. When this happens, Copyelite will decide the
                Close-Out date and the Close-Out value of your Contract in good
                faith (the Close-Out value will be the Underlying Asset price x
                the number of Contracts).
              </p>
              <p>
                c) Copyelite reserves the right at all times during any
                marketing limitations, suspension or disruption to adjust the
                price of any affected Underlying Asset.
              </p>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="9. AMENDMENT, ASSIGNMENT AND TERMINATION"
            icon={<Settings className="w-5 h-5 text-pink-400" />}
          >
            <SubSection title="9.1. AMENDMENT">
              <div className="text-sm space-y-3">
                <p>
                  a) The terms of this Agreement and any transactions under it
                  may be amended by Copyelite at any time. Copyelite will
                  provide Notice to the Client of any such amendment. The Client
                  agrees to be bound by the terms of such an amendment on the
                  earlier of: i. ten (10) Days after Copyelite has issued a
                  notification to the Client; or ii. on the date of the Client
                  entering any Order after the amendment.
                </p>
                <p>
                  b) Any other amendments must be agreed to in writing between
                  Copyelite and the Client.
                </p>
                <p>
                  c) At no time shall either party enter commitments for or in
                  the name of the other party or use their intellectual property
                  for any purpose whatsoever. Except as specifically provided
                  for in this Agreement, neither party will: i. use the other
                  party's name or intellectual property without the prior
                  written approval of the other party; or ii. represent itself
                  as being affiliated with, or authorized to act for, the other
                  party.
                </p>
              </div>
            </SubSection>

            <SubSection title="9.2. ASSIGNMENT">
              <p className="text-sm">
                Any rights or obligations that the Client may have pursuant to
                this Agreement shall not be assigned, transferred, sold, or
                otherwise conveyed, except with the prior written consent of
                Copyelite. Copyelite may, however, transfer any rights or
                obligations it may have pursuant to this Agreement to another
                party without the consent of the Client including, without
                limitation, in connection with a sale or transfer of all or part
                of Copyelite' business to another person or entity.
              </p>
            </SubSection>

            <SubSection title="9.3. TERMINATION">
              <div className="text-sm space-y-3">
                <p>
                  a) This Agreement may be terminated immediately by the Client
                  or Copyelite by Notice to the other in writing. However,
                  termination by either party shall not affect any Order or
                  other transaction previously entered and shall not relieve
                  either party of any outstanding obligations arising out of
                  this Agreement, nor shall it relieve the Client of any
                  obligations arising out of any Order entered into prior to
                  such termination.
                </p>
                <p>
                  b) If Copyelite is made aware of or has reason to believe any
                  of the following: i. that the Client has provided false or
                  misleading information; ii. that the Client has participated
                  or is participating or has assisted or is assisting in money
                  laundering or terrorist financing; iii. that the Client is
                  being officially investigated by law enforcement and/or
                  regulatory agencies; iv. that abnormal trading conditions
                  exist; v. that Copyelite is unable to make prices in the
                  relevant Order due to the unavailability of relevant market
                  information; vi. that the Client may be in possession of
                  "inside information"; vii. a Default Event has occurred; viii.
                  an Insolvency Event has occurred in respect of the Client,
                  then Copyelite at its sole discretion, may terminate this
                  Agreement immediately by Notice to the Client, and Copyelite
                  shall be relieved of any obligations set out in this Agreement
                  or arising out of the transactions contemplated by this
                  Agreement, including any obligations arising out of any Order
                  already placed with Copyelite.
                </p>
                <p>
                  c) Within two (2) days of termination of this Agreement, the
                  Client will return or destroy all materials received from
                  Copyelite as per Copyelite' written instructions. Each
                  party's duties of payment, delivery, and destruction of
                  materials shall survive termination of this Agreement.
                </p>
              </div>
            </SubSection>
          </CollapsibleSection>

          <CollapsibleSection
            title="10. SET-OFF AGAINST MONIES OWED"
            icon={<Scale className="w-5 h-5 text-orange-400" />}
          >
            <div className="text-sm space-y-3">
              <p>
                a) In addition to other rights available to Copyelite, the
                Client authorizes Copyelite to: i. appropriate, transfer,
                credit, apply or pay monies that may be received or held by
                Copyelite the Client's behalf in payment of any amounts which
                may be outstanding by the Client to Copyelite or to an agent of
                Copyelite in a transaction effected on the Client's behalf; and
                ii. set-off against any amounts due to it by the Client, any
                amounts received by Copyelite from or on behalf of the Client
                including but not limited to monies received as Deposits or
                Margin Calls. Copyelite may determine the application of any
                amounts which are to be set-off at its own discretion.
              </p>
              <p>
                b) Payments by the Client to Copyelite in accordance with this
                Agreement must be made without any set-off, counterclaim or
                condition and without any deduction or withholding for any tax
                or any other reason unless the deduction or withholding is
                required by applicable law.
              </p>
              <p>
                c) Should the Client be required to make any form of deduction
                in respect of tax from any payment to be made or if Copyelite
                is required to pay any tax in respect of any payment made in
                relation to this Agreement at the Client's request the Client
                agrees to keep Copyelite indemnified against that tax and
                agrees to pay to Copyelite any additional amounts required to
                ensure Copyelite receives the full net amount that is equal to
                the amount Copyelite would have received had a deduction,
                withholding or payment of tax not been made.
              </p>
              <p>
                d) Deposits or Margin Calls deposited by the Client will not
                fall due for repayment until the Client's obligations under this
                Agreement and under or in respect of any other account between
                Copyelite and the Client are satisfied in full. Until this
                time, Deposits or Margin Calls will not constitute a debt due
                from Copyelite to the Client nor will the Client have any right
                to receive payment of these funds.
              </p>
              <p>
                e) If the Agreement is terminated, the Client and Copyelite
                agree that the claims against each other are finally discharged
                by means of close-out netting. Copyelite will determine the
                Close-Out Values for each affected Order in its sole discretion.
                The final amount to be paid by one of the parties will be the
                difference between the payment obligations of the parties.
              </p>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="11. NEGATIVE BALANCE PROTECTION"
            icon={<Shield className="w-5 h-5 text-green-400" />}
          >
            <div className="text-sm space-y-3">
              <p>
                The trading systems of Copyelite are designed with safeguards
                to protect clients from encountering negative balances when
                trading under normal market conditions. All clients are provided
                with margin monitoring functionality. This functionality
                monitors the level of collateral should it drop below 100% of
                the required margin. If it drops below 100%, the margin call
                mode will be triggered and maintained until the level of 50%.
                Should the margin level equal to, or drop below 50%, Copyelite
                will initiate the closing of current open positions, starting
                from the most unprofitable considering trading hours of
                instruments traded by the client. Positions will be closed
                automatically at the current market price. The clients can set
                personal limits for risk management purposes.
              </p>
              <p>
                Should a client incur a negative balance due to a "market gap",
                the client should inform the Copyelite support team. Copyelite
                will evaluate the inquiry and at its discretion, may credit the
                client's account with the amount of the negative balance where
                the debit was during normal trading activity. This policy is
                available to Private Clients only. Clients are expected to
                always maintain the appropriate levels of margin in the trading
                account as the recommended method of risk management.
              </p>
              <p>
                <strong>NOTE:</strong> The provisions of this policy shall not
                apply to:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  Force Majeure Event understood as an act of God, war,
                  terrorism, malicious damage, civil commotion, industrial acts,
                  any exceptional market events, or acts and regulations of any
                  governmental or supranational bodies or authorities which in
                  the company's opinion prevent an orderly market in relation to
                  Client's orders;
                </li>
                <li>
                  in abnormal market conditions or exceptional market
                  movements/volatility;
                </li>
                <li>
                  where the company determines, in its sole and absolute
                  discretion, that the negative balance is unrelated to the
                  client's trading activity (for example, where the debit
                  relates to any fee or charges of the company);
                </li>
                <li>
                  where the negative balance is connected to or a result of,
                  either direct or indirect, breach of any provision by the
                  client of the Client Agreement or from the breach of the
                  market rules, including but not limited to the laws of the
                  client's country of origin, client's country of residence or
                  any country.
                </li>
              </ul>
              <p>
                Negative balance accounts – Copyelite is entitled to combine
                the balances of any other accounts you hold with us, including
                any Joint Accounts to affect any set-off of amounts owing
                between you and Copyelite, pursuant to our terms and conditions
                or otherwise, in each case in order to reduce or remove the
                relevant negative balance before effecting the negative balance
                protection provisions set out in this clause.
              </p>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="12. LIABILITY AND INDEMNITY"
            icon={<Scale className="w-5 h-5 text-indigo-400" />}
          >
            <div className="text-sm space-y-3">
              <p>
                a) The Client shall indemnify and hold Copyelite harmless from
                any and all liabilities, claims, costs, expenses and damages of
                any nature, including, but not limited to, reasonable legal fees
                and any fees and expenses incurred in connection with
                litigation, arising out of or relating to the Client's
                negligence or willful misconduct, the violation of any Law by
                the Client, or the breach by the Client of any provision of this
                Agreement or if a Default Event occurs.
              </p>
              <p>
                b) The Client also agrees to promptly pay Copyelite for all
                damages, costs and expenses, including reasonable legal fees and
                expenses, incurred by Copyelite in the enforcement of any of
                the provisions of this Agreement.
              </p>
              <p>
                c) Copyelite is not responsible for any delays, charges or loss
                incurred due to errors in the payment or as a result of a delay
                in funds reaching the Client's nominated account. The Client
                agrees to indemnify Copyelite and be liable for any losses or
                charges incurred by Copyelite arising from such error on the
                Client's behalf.
              </p>
              <p>
                d) Copyelite will not be liable under any circumstances for any
                direct, indirect or consequential loss (including any loss of
                profits) incurred by the Client as a result of any acts or
                omissions by a Third-Party.
              </p>
              <p>
                e) Nothing in this Agreement is intended to limit or exclude any
                liability Copyelite may owe the Client under any statutory
                rights the Client may have that cannot be excluded or limited by
                law.
              </p>
              <p>
                f) If a Default Event occurs, then Copyelite may, at its sole
                discretion: i. crystallise, unwind, reverse, void, repair or
                close any Open Positions by closing any open Contracts; and/or
                ii. nominate the date on which the open Order is valued; and/or
                iii. nominate the methodology used to calculate the open Orders'
                value; and/or iv. take any other action that Copyelite
                determines to be reasonably necessary to protect its legitimate
                interests.
              </p>
              <p>
                g) The Client's obligations under this clause 13 shall survive
                the termination of this Agreement.
              </p>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="13. INFORMATION AND CONFIDENTIALITY"
            icon={<Lock className="w-5 h-5 text-purple-400" />}
          >
            <div className="text-sm space-y-3">
              <p>
                a) The Client acknowledges and agrees that Copyelite is
                permitted to carry out an electronic database search and search
                credit reference agencies in order to verify the Client's
                identity and credit standing. If such searches are carried out,
                Copyelite may keep records of the contents and results of such
                searches in accordance with all applicable Laws.
              </p>
              <p>
                b) Copyelite reserves the right to collect such information as
                is necessary from the Client to meet its obligations under the
                Money Laundering Prevention Act and the applicable Anti-Money
                Laundering and Counter-Terrorism Financing Laws. Copyelite may
                pass on information collected from the Client and relating to
                transactions as required by applicable Anti-Money Laundering and
                Counter-Terrorism Financing Regulations and is under no
                obligation to inform the Client it has done so. Copyelite may
                undertake all such Anti-Money Laundering and Counter-Terrorism
                Financing checks in relation to the Client (including restricted
                lists, blocked persons and countries lists) as deemed necessary
                or appropriate by Copyelite.
              </p>
              <p>
                c) Personal information collected by Copyelite is treated as
                confidential and is protected by the Data Protection Law.
                Copyelite will only collect personal information which is
                necessary to perform the services contemplated by this
                Agreement.
              </p>
              <p>
                d) Copyelite will treat the Client's personal information in
                accordance with its privacy policy, which the Client may obtain
                on the Website.
              </p>
              <p>
                e) Copyelite will use reasonable precautions to maintain the
                confidentiality of information Copyelite receives from the
                Client and material and/or data the Client provides, creates,
                inputs or develops in connection with the Client's use of the
                Copyelite services. Nonetheless, because such information,
                material and/or data may be provided through the internet, the
                Client hereby acknowledges and agrees that Copyelite cannot
                assure that such information, material and/or data will continue
                to be confidential.
              </p>
              <p>
                f) The Client accepts the risk of a Third-Party receiving
                confidential information concerning the Client and specifically
                releases and indemnifies Copyelite from any claim arising out
                of a Third-Party intercepting, accessing, monitoring or
                receiving any communication from a Client intended to be
                provided to Copyelite or from Copyelite intended to be
                provided to the Client.
              </p>
              <p>
                g) The Client acknowledges and agrees that Copyelite may
                disclose the Client's name and other personal and financial
                information about the Client, and any relevant details of an
                Authorized User, to its employees, representatives, officers,
                agents, introducing brokers and affiliates, as well as to a
                governmental entity or self-regulatory authority, an internet
                service provider or any other Third-Party agent or service
                provider for any purpose related to offering, providing,
                administering or maintaining the Copyelite services, or to
                comply with applicable Laws.
              </p>
              <p>
                h) Due to the inherent risks in transferring currency between
                parties located in different countries, Copyelite takes
                measures to ensure that it is not participating or assisting in
                money laundering or terrorist financing. Law enforcement
                agencies and regulatory authorities may periodically inspect and
                require copies of Client information and business records held
                by Copyelite, to ensure compliance with all applicable
                anti-money laundering and counter-terrorism financing laws.
              </p>
              <p>
                i) The Client should be fully aware that in appropriate cases
                all communications and information concerning the Client held by
                Copyelite, may be disclosed to and reviewed by law enforcement
                agencies and regulatory authorities. In addition, the Client
                agrees to comply with all applicable anti-money laundering and
                counter-terrorism financing laws, including, but not limited to,
                the requirement to obtain satisfactory evidence of the identity
                of any principal whom the Client may represent in any
                transaction entered into with Copyelite.
              </p>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="14. ELECTRONIC VERIFICATION TERMS AND CONDITIONS"
            icon={<Settings className="w-5 h-5 text-cyan-400" />}
          >
            <div className="text-sm space-y-3">
              <p>
                a) Copyelite is required by the anti-money laundering and
                counter-terrorism financing regulations to verify a Client's
                identity before it can provide the Client with its services.
                Electronic verification allows Copyelite to verify a Client's
                identity by using electronic tools and external data sources.
              </p>
              <p>
                b) In order to verify a Client's identity electronically,
                Copyelite will request a Client's details (such as your name,
                address, date of birth) and details of their identification
                documents.
              </p>
              <p>
                c) By agreeing to these terms and conditions a Client agrees
                that:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  Copyelite may use and disclose personal information for the
                  purposes of electronic verification as described above.
                </li>
                <li>
                  It is an offence under anti-money laundering and
                  counter-terrorism financing laws for a Client to provide false
                  and misleading information about their identity.
                </li>
              </ul>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="15. DISPUTE RESOLUTION"
            icon={<Gavel className="w-5 h-5 text-red-400" />}
          >
            <div className="text-sm space-y-3">
              <p>
                Please refer to our website for further information on how we
                handle complaints under the Agreements. You acknowledge that our
                internal and external dispute resolution procedures don't
                prevent us from commencing proceedings in any other relevant
                jurisdiction for the enforcement of any complaint determination.
              </p>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="16. NOTICES AND COMMUNICATIONS"
            icon={<Phone className="w-5 h-5 text-green-400" />}
          >
            <div className="text-sm space-y-3">
              <p>
                a) Copyelite may, to the extent of your authorization, send a
                communication under the Agreements to you or your Authorized
                Person.
              </p>
              <p>
                b) Unless the Agreements expressly say otherwise, all notices,
                certificates, consents, approvals, waivers and other
                communications in connection with the Agreements:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  must be sent by email or other means that we specify from time
                  to time;
                </li>
                <li>
                  must be signed or issued by the sender (if an individual) or
                  an Authorized Officer of the sender; and
                </li>
                <li>
                  will be taken to be received upon sending, unless the sender
                  receives an automated message informing them that the email
                  has not been delivered.
                </li>
              </ul>
              <p>
                c) Communications take effect from the time they're received
                unless a later time is specified in them.
              </p>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="17. GOVERNING LAW"
            icon={<Globe className="w-5 h-5 text-blue-400" />}
          >
            <div className="text-sm">
              <p>
                This Agreement shall be governed by and construed in accordance
                with the International Business Companies Act, 1999 and the
                applicable Laws of Saint Lucia.
              </p>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="18. SEVERANCE"
            icon={<Settings className="w-5 h-5 text-yellow-400" />}
          >
            <div className="text-sm space-y-3">
              <p>
                a) A provision of the Agreement that is void, illegal or
                unenforceable is ineffective only to the extent of the
                provision's illegality or unenforceability, but the remaining
                provisions are not affected.
              </p>
              <p>
                b) Any present or future legislation which operates to vary the
                Client's obligations in connection with this Agreement with the
                result that Copyelite' rights, powers or remedies are adversely
                affected (including by way of delay or postponement) is excluded
                except to the extent that its exclusion is prohibited or
                rendered ineffective by law.
              </p>
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="19. FURTHER ACTS"
            icon={<FileText className="w-5 h-5 text-gray-400" />}
          >
            <div className="text-sm space-y-3">
              <p>
                a) This Agreement may consist of several copies each signed by
                one or more parties to this Agreement. If so, the signed copies
                are treated as making up the one document.
              </p>
              <p>
                b) The Client agrees to do anything Copyelite reasonably
                requests (such as obtaining consents, signing and producing
                documents and arranging documents to be completed and signed):
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  to bind the Client and any other person intended to be bound
                  under this Agreement;
                </li>
                <li>
                  to show whether the Client is complying with this Agreement.
                </li>
              </ul>
            </div>
          </CollapsibleSection>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-slate-700">
          <div className="bg-slate-900/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-4">
              Important Notice
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              By using Copyelite services, you acknowledge that you have read,
              understood, and agree to be bound by these Terms and Conditions.
              If you do not agree with any part of these terms, you should not
              use our services. These terms may be updated from time to time,
              and continued use of our services constitutes acceptance of any
              changes.
            </p>
            <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-slate-200 mb-2">
                Contact Information
              </h4>
              <div className="text-xs text-slate-400 space-y-1">
                <p>Copyelite Ltd.</p>
                <p>Registration Number: 4342-345462</p>
                <p>Regulated by U.S Securities And Exchange</p>
                <p>
                  For questions about these terms, please contact our support
                  team.
                </p>
              </div>
            </div>
            <div className="text-xs text-slate-500">
              <p>
                This document contains the complete terms and conditions for
                using Copyelite services. Please ensure you understand all
                sections before proceeding with any trading activities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
