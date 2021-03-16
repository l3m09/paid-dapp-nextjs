/* eslint-disable no-tabs */
import { NextRouter } from 'next/router';
import AgreementActionTypes from '../actionTypes/agreement';
import ProfileActionTypes from '../actionTypes/profile';
import WalletActionTypes from '../actionTypes/wallet';
import {
  agreementStatus,
} from '../../utils/agreement';

const retrieveScenarios = (scenarioCode) => {
  const createdAt = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  }).format(new Date());
  const scenarios = new Map([
    [
      'partyANotLogged',
      {
        profile: {
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          phone: '',
        },
        agreements: [],
        router: '/profile',
      },
    ],
    [
      'partyALogged',
      {
        profile: {
          firstName: 'Dan',
          lastName: 'Smith',
          email: 'dan.smith@paidnetwork.com',
          address: 'Suite 5A-1204\n799 E Dragram\nTucson AZ 85705\nUSA',
          phone: '+1 500 7080 7788',
        },
        agreements: [],
      },
    ],
    [
      'partyBNotLogged',
      {
        profile: {
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          phone: '',
        },
        agreements: [],
      },
    ],
    [
      'partyBLogged',
      {
        profile: {
          firstName: 'Dan B',
          lastName: 'Smith B',
          email: 'danb.smithb@paidnetwork.com',
          address: 'Suite 5A-1224\n788 E Dragram\nTucson AZ 85705\nUSA',
          phone: '+1 700 7080 8877',
        },
        agreements: [{
          transactionHash:
            '0x2446f1fd773fbb9f080e674b60c6a033c7ed7427b8b9413cf28a2a4a6da9b56c',
          event: {
            id: 1,
            from: 1,
            to: 2,
            agreementFormTemplateId: 1,
            cid: 1,
            status: agreementStatus.PENDING,
            createdAt,
            updatedAt: createdAt,
          },
          data: {
            documentName: 'Mutual NDA',
            counterpartyName: 'Party A',
            agreementForm: null,
            agreementFormTemplateId: 'nda',
            escrowed: null,
            validUntil: '12/21/2023',
            toSigner: 'b',
            fromSigner: null,
            fileString: `<div style="width:100%" data-reactroot=""><div><div style="width: 100%; background-color:white; color: black;" class="contract">
            <div style="text-align: center;">
            <h3><span id="createDate"><div style="display: inline-block; background-color:#f79632">2021/03/16</div></span></h3>
            </div>
            <div style="text-align: center;">
            <h1>MUTUAL NONDISCLOSURE AGREEMENT</h1>	
            </div>
            <div>
            <p>This Mutual Nondisclosure Agreement (this "Agreement") is made by and between </p><div style="display: inline-block; background-color:#f79632"><span id="partyName">Dan Smith</span></div> (the "Company"), and <span id="counterPartyName"><div style="display: inline-block; background-color:#f79632">Party b</div></span>  ("Counterparty").  Each party has disclosed and/or may further disclose its Confidential Information (as defined below) to the other in connection with the Relationship (as defined below) pursuant to the terms and conditions of this Agreement.  As used herein, the term "Discloser" shall refer to the Company whenever the context refers to the Company's Confidential Information being disclosed to Counterparty, which is referred to as "Recipient" in that context.  Conversely, the term "Discloser" shall refer to Counterparty whenever the context refers to Counterparty's Confidential Information being disclosed to the Company, which is referred to as "Recipient" in that context.<p></p>
            </div>
            
            <div style="text-align: center;">
            <h2>RECITALS</h2>
            </div>
            <div>
            <p>The parties wish to explore a possible business opportunity of mutual interest (the "Relationship") in connection with which Discloser has disclosed and/or may further disclose its Confidential Information (as defined below) to Recipient.  This Agreement is intended to allow the parties to continue to discuss and evaluate the Relationship while protecting Discloser's Confidential Information (including Confidential Information previously disclosed to Recipient) against unauthorized use or disclosure.</p>
            </div>
            
            <div style="text-align: center;">
            <h2>AGREEMENT</h2>
            </div>
            <div>
            <p>In consideration of the premises and mutual covenants herein, the parties hereby agree as follows:</p>
            <p>&nbsp;</p>
            <p>1. <b>Definition of Confidential Information.  </b>"Confidential Information" means information and physical material not generally known or available outside Discloser and information and physical material entrusted to Discloser in confidence by third parties.  Confidential Information includes, without limitation:  technical data, trade secrets, know-how, research, product or service ideas or plans, software codes and designs, algorithms, developments, inventions, patent applications, laboratory notebooks, processes, formulas, techniques, mask works, engineering designs and drawings, hardware configuration information, agreements with third parties, lists of, or information relating to, employees and consultants of the Discloser (including, but not limited to, the names, contact information, jobs, compensation, and expertise of such employees and consultants), lists of, or information relating to, suppliers and customers, price lists, pricing methodologies, cost data, market share data, marketing plans, licenses, contract information, business plans, financial forecasts, historical financial data, budgets or other business information disclosed by Discloser (whether by oral, written, graphic or machine-readable format), which Confidential Information is designated in writing to be confidential or proprietary, or if given orally, is confirmed in writing as having been disclosed as confidential or proprietary within a reasonable time (not to exceed thirty (30) days) after the oral 
            disclosure, or which information would, under the circumstances, appear to a reasonable person to be confidential or proprietary.</p>
            <p>2. <b>Nondisclosure of Confidential Information.  </b>Recipient shall not use any Confidential Information disclosed to it by Discloser for its own use or for any purpose other than to carry out discussions concerning, and the undertaking of, the Relationship.  Recipient shall not disclose or permit disclosure of any Confidential Information of Discloser to third parties or to employees of Recipient, other than directors, officers, employees, consultants and agents of Recipient who are required to have the information in order to carry out the discussionsregarding the Relationship.  Recipient shall take reasonable measures to protect the secrecy of and avoid disclosure or use of Confidential Information of Discloser in order to prevent it from falling into the public domain or the possession of persons other than those persons authorized under this Agreement to have any such information.  Such measures shall include the degree of care that Recipient utilizes to protect its own Confidential Information of a similar nature.  Recipient shall notify Discloser of any misuse, misappropriation or unauthorized disclosure of Confidential Information of Discloser which may come to Recipient's attention.</p>
            <p>3. <b>Exceptions.  </b>
            </p><p>Notwithstanding the above, information disclosed hereunder shall not be considered "Confidential Information" as defined herein where Recipient can prove that such information:</p>
            <p>(a)was in the public domain at the time it was disclosed or has entered the public domain through no fault of Recipient;</p>
            <p>(b)was known to Recipient, without restriction, at the time of disclosure, as demonstrated by files in existence at the time of disclosure;</p>
            <p>(c)was independently developed by Recipient without any use of the Confidential Information, as demonstrated by files created at the time of such independent development; </p>
            <p>(d)is disclosed generally to third parties by Discloser without restrictions similar to those contained in this Agreement; </p>
            <p>(e)becomes known to Recipient, without restriction, from a source other than Discloser without breach of this Agreement by Recipient and otherwise not in violation of Discloser's rights;</p>
            <p>(f)is disclosed with the prior written approval of Discloser; or</p>
            <p>(g)is disclosed pursuant to the order or requirement of a court, administrative agency, or other governmental body; provided, however, that Recipient shall provide prompt notice of such court order or requirement to Discloser to enable Discloser to seek a protective order or otherwise prevent or restrict such disclosure.</p>		
            <p>4. <b>Return of Materials. </b>
            </p><p>Recipient shall, except as otherwise expressly authorized by Discloser, not make any copies or duplicates of any Confidential Information.  Any materials or documents that have been furnished by Discloser to Recipient in connection with the Relationship shall be promptly returned by Recipient, accompanied by all copies of such documentation, within ten (10) days after (a)the Relationship has been rejected or concluded or (b)the written request of Discloser.</p>
            <p>5. <b>No Rights Granted.  </b>
            </p><p>Nothing in this Agreement shall be construed as granting any rights under any patent, copyright or other intellectual property right of Discloser, nor shall this Agreement grant Recipient any rights in or to Discloser's Confidential Information other than the limited right to review such Confidential Information solely for the purpose of determining whether to enter into the Relationship.  Nothing in this Agreement requires the disclosure of any Confidential Information, which shall be disclosed, if at all, solely at Discloser's option.  Nothing in this Agreement requires the Discloser to proceed with the Relationship or any transaction in connection with which the Confidential Information may be disclosed.</p>
            <p>6. <b>No Representations Made. </b>
            </p><p>Recipient acknowledges that neither Discloser, nor any of its representatives, in the course of providing the Confidential Information as contemplated hereunder, is making any representation or warranty (express or implied) as to the accuracy or completeness of any such information, and Recipient assumes full responsibility for all conclusions derived from such information.  Recipient shall be entitled to, and shall, rely solely on representations and warranties made in a definitive agreement, if any, relating to the Relationship.</p>
            <p>7. <b>No Reverse Engineering. </b></p>
            <p>Recipient shall not modify, reverse engineer, decompile, create other works from or disassemble any software programs contained in the Confidential Information of Discloser unless permitted in writing by Discloser. </p>
            <p>8. <b>No Publicity.  </b></p>
            <p>Neither party shall, without the prior consent of the other party, disclose to any other person the fact that Confidential Information of Discloser has been and/or may be disclosed under this Agreement, that discussions or negotiations are taking place betweenthe parties, or any of the terms, conditions, status or other facts with respect thereto, except as required by law and then only with prior notice as soon as possible to the other party. </p>
            <p>9. <b>Notice of Compelled Disclosure.  </b></p>
            <p>In the event that Recipient or any person to whom they or their representatives transmit or have transmitted Confidential Information become legally compelled (by oral questions, interrogatories, requests for information or documents, subpoenas, civil investigative demands or otherwise) to disclose any such Confidential Information, the Recipient shall provide the Discloser with prompt written notice sothat the Discloser may seek a protective order or other appropriate remedy, or both, or waive compliance with the provisions of this Agreement.  In the event that the Discloser is unable to obtain a protective order or other appropriate remedy, or if it so directs the Recipient, the Recipient shall furnish only that portion of the Confidential Information that the Recipient is advised by written opinion of its counsel is legally required to be furnished by it and shall exercise its reasonable best efforts to obtain reliable assurance that confidential treatment shall be accorded such Confidential Information.</p>
            <p>10. <b>Common Interest Agreement.  </b></p>
            <p>To the extent that any Confidential Information provided or made available hereunder may include material subject to the attorney-client  privilege, work product doctrine or any other applicable privilege concerning pending or threatened legal proceedings or governmental investigations, Recipient and Discloser understandand agree that they have a commonality of interest with respect to such matters and it is their desire, intention and mutual understanding that the sharing of such material is not intended to, and shall not, waive or diminish in any way the confidentiality of such material or its continued protection under the attorney-client privilege, work product doctrine or other applicable privilege.  All Confidential Information provided or made available by Discloser that is entitled to protection under the attorney-client privilege, work product doctrine or other applicable privilege shall remain entitled to such protection under these privileges, this Agreement, and under the joint defense doctrine.  Nothing in this Agreement obligates Discloser to reveal material subject to the attorney-client privilege, work product doctrine or any other applicable privilege.</p>
            <p>11. <b>Term.  </b></p>
            <p>The foregoing commitments of each party shall survive any termination ofthe Relationship between the parties, and shall continue for a period terminating five(5) years from the date on which Confidential Information is last disclosed under this Agreement. </p>
            <p>12. <b>Independent Contractors.  </b></p>
            <p>The parties are independent contractors, and nothing contained in this Agreement shall be construed to constitute the parties as partners, joint venturers, co-owners or otherwise as participants in a joint or common undertaking.</p>
            <p>13. <b>Remedies. </b></p>
            <p>Each party's obligations set forth in this Agreement are necessary andreasonable in order to protect Discloser and its business.  Due to the unique nature of Discloser's Confidential Information, monetary damages may be inadequate to compensate Discloser for anybreach by Recipient of its covenants and agreements set forth in this Agreement.  Accordingly, the parties each agree and acknowledge that any such violation or threatened violation may causeirreparable injury to Discloser and, in addition to any other remedies that may be available, in law, in equity or otherwise, Discloser shall be entitled to obtain injunctive relief against the threatened breach of this Agreement or the continuation of any such breach by Recipient. </p>
            <p>14. <b>Miscellaneous. </b></p>
            <p>(a)Governing Law; Jurisdiction.  The validity, interpretation, constructionand performance of this Agreement, and all acts and transactions pursuant hereto and the rights and obligations of the parties hereto shall be governed, construed and interpreted in accordance with the laws of the state of [California], without giving effect to principles of conflicts of law.  Each of the parties hereto consents to the exclusive jurisdiction and venue of the courts of [Los Angeles County, California]. </p>
            <p>(b)Entire Agreement.  This Agreement sets forth the entire agreement and understanding of the parties relating to the subject matter herein and supersedes all prior or contemporaneous discussions, understandings and agreements, whether oral or written, between them relating to the subject matter hereof. </p>
            <p>(c)Amendments and Waivers.  No modification of or amendment to this Agreement, nor any waiver of any rights under this Agreement, shall be effective unless in writing signed by the parties to this Agreement.  No delay or failure to require performance of any provision of this Agreement shall constitute a waiver of that provision as to that or any other instance. </p>
            <p>(d)Successors and Assigns.  Except as otherwise provided in this Agreement, this Agreement, and the rights and obligations of the parties hereunder, will be binding upon and inure to the benefit of their respective successors, assigns, heirs, executors, administrators and legal representatives.  The Company may assign any of its rights and obligations under this Agreement.  No other party to this Agreement may assign, whether voluntarily or by operation of law, any of its rights and obligations under this Agreement, except with the prior written consent of the Company.  Notwithstanding the foregoing, Confidential Information of Discloser may not be assigned without the prior written consent of Discloser,unless the assignee shall be the successor entity to the assignor upon the dissolution of the assignor in its present form.</p>
            <p>(e)Notices.  Any notice, demand or request required or permitted to be given under this Agreement shall be in writing and shall be deemed sufficient when delivered personally or by overnight courier or sent by email, or 48 hours after being deposited in the U.S. mail as certified or registered mail with postage prepaid, addressed to the party to be notified at such party's address as set forth on the signature page, as subsequently modified by written notice, or if no address is specified on the signature page, at the most recent address set forth in the Company's books and records. </p>
            <p>(f)Severability.  If one or more provisions of this Agreement are held to beunenforceable under applicable law, the parties agree to renegotiate such provision in good faith. In the event that the parties cannot reach a mutually agreeable and enforceable replacement for such provision, then (i)such provision shall be excluded from this Agreement, (ii)the balance of the Agreement shall be interpreted as if such provision were so excluded and (iii)the balance of the Agreement shall be enforceable in accordance with its terms. </p>
            <p>(g)Construction.  This Agreement is the result of negotiations between and has been reviewed by each of the parties hereto and their respective counsel, if any; accordingly, this Agreement shall be deemed to be the product of all of the parties hereto, and no ambiguity shall be construed in favor of or against any one of the parties hereto. </p>
            <p>(h)Counterparts.  This Agreement may be executed in any number of counterparts, each of which when so executed and delivered shall be deemed an original, and all of which together shall constitute one and the same agreement.  Execution of a facsimile copy will have the same force and effect as execution of an original, and a facsimile signature will be deemed an original and valid signature.</p>
            <p>&nbsp;</p>
            <p>The parties have executed this Mutual Nondisclosure Agreement as of the date first above written.</p>
            <p>&nbsp;</p>
            <p><b>THE COMPANY:</b></p>
            <p>&nbsp;</p>
            <p>_______________________________________</p>
            <p>Name: </p><div style="display: inline-block; background-color:#f79632">Dan Smith</div><p></p>
            <p>Email: <span id="partyEmail"></span></p><div style="display: inline-block; background-color:#f79632">dan.smith@paidnetwork.com</div><p></p>
            <p>Address: <span id="partyAddress"></span></p><div style="display: inline-block; background-color:#f79632">Suite 5A-1204
            799 E Dragram
            Tucson AZ 85705
            USA</div><p></p>
            <p>Wallet: <span id="partyWallet"></span></p><div style="display: inline-block; background-color:#f79632">0x3442C44B4Bbf87144Ad0e4a2C60e4bE801d30FA8</div><p></p>
            <p>&nbsp;</p>
            <p><b>COUNTERPARTY:</b></p>
            <p>&nbsp;</p>
            <p>_______________________________________</p>
            <p>Name: </p><div style="display: inline-block; background-color:#f79632">Party b</div><p></p>
            <p>Email: <span id="counterPartyEmail"></span></p><div style="display: inline-block; background-color:#f79632">test@test.com</div><p></p>
            <p>Address: <span id="counterPartyAddress"></span></p><div style="display: inline-block; background-color:#f79632">adfasfas</div><p></p>
            <p>Wallet: <span id="counterPartyWallet"></span></p><div style="display: inline-block; background-color:#f79632">fasdfasfdasfdasf</div><p></p>
            </div>
            </div></div></div>`,
          },
        }, {
          transactionHash:
            '0x2446f1fd773fbb9f080e674b60c6a033c7ed7427b8b9413cf28a2a4a6da7A88t',
          event: {
            id: 1,
            from: 1,
            to: 2,
            agreementFormTemplateId: 1,
            cid: 2,
            status: agreementStatus.PENDING,
            createdAt,
            updatedAt: createdAt,
          },
          data: {
            documentName: 'CIIA',
            counterpartyName: 'Party A',
            agreementForm: null,
            agreementFormTemplateId: 'advisor',
            escrowed: null,
            validUntil: '12/21/2023',
            toSigner: 'b',
            fromSigner: null,
            fileString: `<div style="width:100%" data-reactroot=""><div><div style="width: 100%; padding:10px; background-color:white; color: black;" class="contract"><h1 style="text-align: center;">ADVISOR AGREEMENT</h1><h1 style="text-align: center;" class="western"><span style="font-size: medium;"><span lang="en-US"><strong>&nbsp;<div style="display: inline-block; background-color:#f79632"><span style="display: none" id="partyName">Dan Smith</span></div></strong></span></span>
            </h1>
            <p align="center"><u><strong>Advisor Agreement</strong></u></p>
            <p>This Advisor Agreement (this “<u>Agreement</u>”) is entered into as of </p><div style="display: inline-block; background-color:#f79632"><span id="createDate"></span></div>, by and between <div style="display: inline-block; background-color:#f79632">Dan Smith</div> (the “<u>Company</u>”), and <div style="display: inline-block; background-color:#f79632"><span id="counterPartyName">Party b</span></div> (“<u>Advisor</u>”).<p></p>
            <p align="justify">The parties agree as follows:</p>
            <ol>
                <li>
                    <p><u><strong>Services</strong></u>. Advisor agrees to act as an advisor to the Company and to provide advice and assistance to the Company as is mutually agreed by the parties (collectively, the “<u>Services</u>”).</p>
                </li>
                <li>
                    <p><u><strong>Compensation</strong></u>. Advisor shall not be entitled to receive any cash compensation for the Services provided hereunder. However, subject to the approval of the Company’s Board of Directors, Advisor will be granted </p><div style="display: inline-block; background-color:#f79632">A Right</div> to purchase <div style="display: inline-block; background-color:#f79632">8</div> shares of the Company’s common stock. The <div style="display: inline-block; background-color:#f79632">A Right</div> will be subject to the terms and conditions applicable to <div style="display: inline-block; background-color:#f79632">Restricted stock purchase awards</div> granted under the Company’s <div style="display: inline-block; background-color:#f79632">adfasfdasfdasdf</div> (the “<u>Plan</u>”), as described in that plan and the applicable <div style="display: inline-block; background-color:#f79632">Restricted stock purchase</div> agreement,
                        which Advisor will be required to sign (the “<u>Stock Agreement</u>”).<p></p>
                </li>
            </ol>
            <p>So long as Advisor’s Continuous Service Status (as defined in the Plan) does not terminate, Advisor will vest in </p><div style="display: inline-block; background-color:#f79632">21</div>% of the shares on the <div style="display: inline-block; background-color:#f79632">1</div>-month anniversary of Advisor’s vesting commencement date and [1/48<sup>th</sup>] of the total
                shares will vest in monthly installments thereafter during continuous service, as described in the Stock Agreement. <div style="display: inline-block; background-color:#f79632">Single Trigger Acceleration...</div> The <div style="display: inline-block; background-color:#f79632">Exersice</div> price per share
                will be equal to the fair market value per share on the date the <div style="display: inline-block; background-color:#f79632">Restricted stock purchase awards</div> is granted, as determined by the Company’s Board of Directors in good faith [compliance with applicable guidance
                in order to avoid having the option be treated as deferred compensation under Section 409A of the Internal Revenue Code of 1986, as amended]. There is no guarantee that the Internal Revenue Service will agree with this value. Advisor should consult
                with Advisor’s own tax advisor concerning the tax risks associated with accepting <div style="display: inline-block; background-color:#f79632">An Option</div> to purchase the Company’s common stock. Advisor shall have no right to any compensation except as set forth in
                this Section 2.<p></p>
            <ol start="3">
                <li>
                    <p><u><strong>Expenses</strong></u>. The Company shall reimburse Advisor for reasonable expenses incurred in the course of performing services hereunder, provided, however, that all expenses shall be approved in advance by the Company. As a condition
                        to receipt of reimbursement, Advisor shall be required to submit to the Company reasonable evidence that the amount involved was both reasonable and necessary to the Services provided under this Agreement.</p>
                </li>
                <li>
                    <p><u><strong>Term and Termination</strong></u>. The term of this Agreement shall be for a period of </p><div style="display: inline-block; background-color:#f79632">12</div> years from the date hereof and may be renewed by mutual agreement of the parties; <u>provided</u>, <u>however</u>, that this Agreement may be
                        terminated by either party for any reason upon five (5) business days prior written notice without further obligation or liability.<p></p>
                </li>
                <li>
                    <p><u><strong>Independent Contractor</strong></u>. Advisor’s relationship with the Company will be that of an independent contractor and not that of an employee. Advisor will not be eligible for any employee benefits, nor will the Company make
                        deductions from payments made to Advisor for employment or income taxes, all of which will be Advisor’s responsibility. Advisor agrees to indemnify and hold the Company harmless from any liability for, or assessment of, any such taxes
                        imposed on the Company by relevant taxing authorities. Advisor will have no authority to enter into contracts that bind the Company or create obligations on the part of the Company without the prior written authorization of the Company.</p>
                </li>
                <li>
                    <p align="justify"><u><strong>Nondisclosure of Confidential Information</strong></u>.</p>
                    <ol type="a">
                        <li>
                            <p><u><strong>Agreement Not to Disclose</strong></u><strong>.</strong> Advisor agrees not to use any Confidential Information (as defined below) disclosed to Advisor by the Company for Advisor’s own use or for any purpose other than
                                to carry out discussions concerning, and the undertaking of, the Services. Advisor shall not disclose or permit disclosure of any Confidential Information of the Company to third parties. Advisor agrees to take all reasonable measures
                                to protect the secrecy of and avoid disclosure or use of Confidential Information of the Company in order to prevent it from falling into the public domain or the possession of persons other than those persons authorized under this
                                Agreement to have any such information. Advisor further agrees to notify the Company in writing of any actual or suspected misuse, misappropriation or unauthorized disclosure of the Company’s Confidential Information which may
                                come to Advisor’s attention.</p>
                        </li>
                        <li>
                            <p><u><strong>Definition of Confidential Information</strong></u><strong>.</strong> “<u>Confidential Information</u>” means any information, technical data or know-how (whether disclosed before or after the date of this Agreement),
                                including, but not limited to, information relating to business and product or service plans, financial projections, customer lists, business forecasts, sales and merchandising, human resources, patents, patent applications, computer
                                object or source code, research, inventions, processes, designs, drawings, engineering, marketing or finance to be confidential or proprietary or which information would, under the circumstances, appear to a reasonable person to be
                                confidential or proprietary. Confidential Information does not include information, technical data or know-how which: (i)&nbsp;is in the possession of Advisor at the time of disclosure, as shown by Advisor’s files and records
                                immediately prior to the time of disclosure; or (ii)&nbsp;becomes part of the public knowledge or literature, not as a direct or indirect result of any improper inaction or action of Advisor.</p>
                        </li>
                        <li>
                            <p><u><strong>Exceptions</strong></u><strong>.</strong> Notwithstanding the above, Advisor shall not have liability to the Company or any of its subsidiaries with regard to any Confidential Information of the Company which Advisor can prove:</p>
                            <ol type="i">
                                <li>
                                    <p>is disclosed with the prior written approval of the Company; or</p>
                                </li>
                                <li>
                                    <p>is disclosed pursuant to the order or requirement of a court, administrative agency, or other governmental body; provided, however, that Advisor shall provide prompt notice of such court order or requirement to the Company to enable
                                        the Company or its appropriate subsidiary to seek a protective order or otherwise prevent or restrict such disclosure.</p>
                                </li>
                            </ol>
                        </li>
                    </ol>
                </li>
                <li>
                    <p><u><strong>No Duplication; Return of Materials</strong></u>. Advisor agrees, except as otherwise expressly authorized by the Company, not to make any copies or duplicates of any of the Company’s Confidential Information. Any materials or
                        documents that have been furnished by the Company to Advisor in connection with the Services shall be promptly returned by Advisor to the Company, accompanied by <u>all</u> copies of such documentation, within ten days after the earlier of
                        (a)&nbsp;the date on which the Services have been concluded or (b)&nbsp;the date of written request of the Company.</p>
                </li>
                <li>
                    <p><u><strong>No Rights Granted</strong></u>. Nothing in this Agreement shall be construed as granting any rights under any patent, copyright or other intellectual property right of the Company, nor shall this Agreement grant Advisor any rights in
                        or to the Company’s Confidential Information, except the limited right to use the Confidential Information in connection with the Services.</p>
                </li>
                <li>
                    <p><u><strong>Assignment of Inventions</strong></u>. To the extent that, in connection with performing the Services, Advisor jointly or solely conceives, develops, or reduces to practice any inventions, original works of authorship, developments,
                        concepts, know-how, improvements or trade secrets, whether or not patentable or registrable under copyright or similar laws, Advisor hereby assigns all rights, titles and interest to such inventions to the Company.</p>
                </li>
                <li>
                    <p><u><strong>Duty to Assist</strong></u>. As requested by the Company, Advisor shall take all steps reasonably necessary to assist the Company in obtaining and enforcing in its own name any patent, copyright or other protection which the Company
                        elects to obtain or enforce for its inventions, original works of authorship, developments, concepts, know-how, improvements and trade secrets. Advisor’s obligation to assist the Company in obtaining and enforcing patents, copyrights
                        and other protections shall continue beyond the termination of Advisor’s relationship with the Company, but the Company shall compensate Advisor at a reasonable rate after the termination of such relationship for time actually spent
                        at the Company’s request providing such assistance.</p>
                </li>
                <li>
                    <p><u><strong>No Conflicts</strong></u>. Advisor represents that Advisor’s compliance with the terms of this Agreement and provision of Services hereunder will not violate any duty which Advisor may have to any other person or entity (such
                        as a present or former employer), including obligations concerning providing services to others, confidentiality of proprietary information and assignment of inventions, ideas, patents or copyrights, and Advisor agrees that Advisor will not
                        do anything in the performance of Services hereunder that would violate any such duty. In addition, Advisor agrees that, during the term of this Agreement, prior to performing any services for or otherwise participating in a company developing
                        or commercializing new software, services, methods, devices, or other technology that may be competitive with the Company, Advisor shall first notify the Company in writing. It is understood that in such event, the Company will review whether
                        Advisor’s activities are consistent with Advisor continuing to provide Services to the Company.</p>
                </li>
                <li>
                    <p><u><strong>Miscellaneous</strong></u>. Any term of this Agreement may be amended or waived only with the written consent of the parties. This Agreement, including any exhibits hereto, constitutes the sole agreement of the parties and supersedes
                        all oral negotiations and prior writings with respect to the subject matter hereof. Any notice required or permitted by this Agreement shall be in writing and shall be deemed sufficient upon delivery, when delivered personally or by overnight
                        courier or sent by e-mail or fax (with customary confirmation of receipt), or 48 hours after being deposited in the U.S. mail as certified or registered mail (airmail if sent internationally) with postage prepaid, addressed to the party to
                        be notified at such party’s address or fax number as set forth on the signature page herein, or as subsequently modified by written notice. The validity, interpretation, construction and performance of this Agreement shall be governed
                        by the laws of the state of </p><div style="display: inline-block; background-color:#f79632">adfasfdasfd</div>, without giving effect to the principles of conflict of laws. This Agreement may be executed in counterparts, each of which shall be deemed an original, but all of which together will constitute one and
                        the same instrument.<p></p>
                </li>
            </ol>
            <p align="center"><em>[Signature Page Follows]</em></p>
            <p>The parties have executed this Agreement as of the date first written above.</p>
            <p><strong>THE COMPANY:</strong></p>
            <p>(Signature)</p>
            <p>________________________________________ </p>
            <p>Name: <span id="partyName"></span></p><div style="display: inline-block; background-color:#f79632">Dan Smith</div><p></p>
            <p>Email: <span id="partyEmail"></span></p><div style="display: inline-block; background-color:#f79632">dan.smith@paidnetwork.com</div><p></p>
            <p>Address: </p><div style="display: inline-block; background-color:#f79632"><span id="partyAddress">Suite 5A-1204
            799 E Dragram
            Tucson AZ 85705
            USA</span></div><p></p>
            <p>Wallet: </p><div style="display: inline-block; background-color:#f79632"><span id="partyWallet">0x3442C44B4Bbf87144Ad0e4a2C60e4bE801d30FA8</span></div><p></p>
            <br> <br> 
            <p><strong>ADVISOR:</strong></p>
            <p>(Signature)</p>
            <br> ________________________________________ 
            <p>Name: </p><div style="display: inline-block; background-color:#f79632"><span id="counterPartyName">Party b</span></div><p></p>
            <p>Email: </p><div style="display: inline-block; background-color:#f79632"><span id="counterPartyEmail">test@test.com</span></div><p></p>
            <p>Address: </p><div style="display: inline-block; background-color:#f79632"><span id="counterPartyAddress">tadfasdfasd</span></div>
            <p>Wallet: </p><div style="display: inline-block; background-color:#f79632"><span id="counterPartyWallet">fasdfasdf</span></div>
            <p align="center"><br> </p>
            </div></div></div>`,
          },
        }],
      },
    ],
  ]);

  return scenarios.get(scenarioCode ?? 'partyANotLogged');
};

const doConnectToWallet = (
  { router, scenarioCode }: { router: NextRouter; scenarioCode: string; },
) => (dispatch: any) => {
  dispatch({ type: WalletActionTypes.CONNECTING_WALLET });
  const currentWallet = '0x3442C44B4Bbf87144Ad0e4a2C60e4bE801d30FA8';
  const currentScenario = retrieveScenarios(scenarioCode);
  const { profile, agreements } = currentScenario;
  const {
    firstName,
    lastName,
    email,
  } = profile;

  if (!(firstName && lastName && email)) {
    dispatch({ type: WalletActionTypes.SET_CURRENT_WALLET, payload: currentWallet });
    router.push('/profile');
  } else {
    dispatch({ type: ProfileActionTypes.SET_PROFILE_DATA, payload: profile });
    dispatch({ type: WalletActionTypes.SET_CURRENT_WALLET, payload: currentWallet });
    if (agreements.length) {
      agreements.forEach((agreement) => {
        dispatch({
          type: AgreementActionTypes.CREATE_AGREEMENT,
          payload: { newAgreement: agreement },
        });
      });
    }
    router.push('/agreements');
  }
};

export default doConnectToWallet;
