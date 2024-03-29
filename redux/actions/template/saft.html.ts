/* eslint-disable no-tabs */
const Saft = `<div class="contract" style="width: 100%; background-color:white; color: black;"><p class="western" align="center"><strong><div style="display: inline-block; background-color:#f79632"><span id="partyName" style="display: none">{{partyName}}</span></div></strong></p>
<p class="western" align="center">
<div style="text-align: center;">
<h1 id="title">SAFT</h1>	
</div>
</p>
<p class="western" align="center"><strong>(Simple Agreement for Future Tokens)</strong></p>
<p class="western">&nbsp;</p>
<p class="western" align="justify">THIS CERTIFIES THAT in exchange for the payment by the undersigned purchaser (the &ldquo;<em><strong>Purchaser</strong></em>&rdquo;) of <div style="display: inline-block; background-color:#f79632">{{purchaseAmount}}</div> U.S. Dollars (the &ldquo;<em><strong>Purchase Amount</strong></em>&rdquo;) on or about <div style="display: inline-block; background-color:#f79632"><span id="date">{{date}}</span></div>, <div style="display: inline-block; background-color:#f79632">{{counterPartyName}}</div>, a <div style="display: inline-block; background-color:#f79632"><span id="typeOfCompany">{{typeOfCompany}}</span></div> formed pursuant to the laws of <div style="display: inline-block; background-color:#f79632">{{jurisdiction}}</div> (the &ldquo;<em><strong>Company</strong></em>&rdquo;), hereby issues to the Purchaser the right (the &ldquo;<em><strong>Right</strong></em>&rdquo;) to certain units of <div style="display: inline-block; background-color:#f79632">{{tokenAmount}}</div> tokens (the &ldquo;<em><strong>Token</strong></em>&rdquo;), subject to the terms set forth below.</p>
<p class="western" align="justify"><strong>1. </strong><em><strong>Events</strong></em></p>
<p class="western" align="justify">&nbsp;</p>
<p class="western" align="justify">(a) <u><strong>Network Launch</strong></u>. If there is a Network Launch before the expiration or termination of this instrument, the Company will automatically issue to the Purchaser a number of units of the Token equal to the Purchase Amount divided by the Discount Price.</p>
<p class="western" align="justify">In connection with and prior to the issuance of Tokens by the Company to the Purchaser pursuant to this Section 1(a):</p>
<p class="western" align="justify">(i) The Purchaser will execute and deliver to the Company, or to a third-party service provider if requested by the Company, any and all other transaction documents related to this SAFT, including verification of non-U.S. person status under the applicable securities laws; and</p>
<p class="western" align="justify">(ii) The Purchaser will provide to the Company a network address for which to allocate Purchaser's Tokens upon the Network Launch.</p>
<p class="western" align="justify">(b) <u><strong>Dissolution Event</strong></u>. If there is a Dissolution Event before this instrument expires or terminates, the Company will pay an amount equal to the Purchase Amount multiplied by the difference of (i) 100% less (ii) the Discount Rate (the &ldquo;<em><strong>Discounted Purchase Amount</strong></em>&rdquo;), due and payable to the Purchaser immediately prior to, or concurrent with, the consummation of the Dissolution Event. If immediately prior to the consummation of the Dissolution Event, the assets of the Company that remain legally available for distribution to the Purchaser and all holders of all other SAFTs (the &ldquo;<em><strong>Dissolving Purchasers</strong></em>&rdquo;), as determined in good faith by the Company&rsquo;s board of directors, are insufficient to permit the payment to the Dissolving Purchasers of their respective Discounted Purchase Amounts, then the remaining assets of the Company legally available for distribution, following all distributions to the holders of the Company&rsquo;s preferred stock, will be distributed with equal priority and pro rata among the Dissolving Purchasers in proportion to the Discounted Purchase Amounts they would otherwise be entitled to receive pursuant to this Section 1(b). Any distributed amounts shall be in U.S. Dollars, Ethereum or Bitcoin.</p>
<p class="western">&nbsp;</p>
<p class="western" align="justify">(c) <u><strong>Termination</strong></u>. This instrument will expire and terminate upon the earlier of (i) the issuance of Tokens to the Purchaser pursuant to Section 1(a); and (ii) the payment, or setting aside for payment, of amounts due the Purchaser pursuant to Section 1(b).</p>
<p class="western" align="justify">2. <em><strong>Definitions</strong></em></p>
<p class="western" align="justify">&nbsp;</p>
<p class="western" align="justify">&ldquo;<em><strong>Discount Price</strong></em>&rdquo; means the product of (i) the Token Price multiplied by (ii) the difference between (a) 100% less (b) the Discount Rate.</p>
<p class="western" align="justify">&nbsp;</p>
<p class="western" align="justify">&ldquo;<em><strong>Discount Rate</strong></em>&rdquo; is <div style="display: inline-block; background-color:#f79632">{{discountRate}}</div>%.</p>
<p class="western" align="justify">&nbsp;</p>
<p class="western" align="justify">&ldquo;<em><strong>Dissolution Event</strong></em>&rdquo; means (i) a voluntary termination of operations of the Company, (ii) a general assignment for the benefit of the Company&rsquo;s creditors or (iii) any other liquidation, dissolution or winding up of the Company, whether voluntary or involuntary.</p>
<p class="western" align="justify">&nbsp;</p>
<p class="western" align="justify">&ldquo;<em><strong>Network Launch</strong></em><strong>&rdquo; </strong>means a <em>bona fide </em>transaction or series of transactions, pursuant to which the Company will sell the Tokens to the general public in a publicized product launch.</p>
<p class="western" align="justify">&nbsp;</p>
<p class="western" align="justify">&ldquo;<em><strong>SAFT</strong></em>&rdquo; means an agreement containing a future right to units of Tokens purchased by Purchasers, similar in form and content to this agreement, which a significant portion of the amount raised under the SAFTs will be used to fund the Company&rsquo;s development of a decentralized blockchain-based computer network (the &ldquo;<em><strong>Network</strong></em>&rdquo;).</p>
<p class="western" align="justify">&nbsp;</p>
<p class="western" align="justify">&ldquo;<em><strong>Token Price</strong></em>&rdquo; means the highest price per Token sold by the Company to the public during the Network Launch.</p>
<p class="western" align="justify">3. <em><strong>Company Representations</strong></em></p>
<p class="western" align="justify">(a) The Company is a <div style="display: inline-block; background-color:#f79632">{{typeOfCompany}}</div> duly organized, validly existing and in good standing under the laws of <div style="display: inline-block; background-color:#f79632">{{jurisdiction}}</div>, and has the power and authority to own, lease and operate its properties and carry on its business as now conducted.</p>
<p class="western" align="justify">(b) The execution, delivery and performance by the Company of this instrument is within the power of the Company and, other than with respect to the actions to be taken when Tokens are to be issued to the Purchaser, has been duly authorized by all necessary actions on the part of the Company. This instrument constitutes a legal, valid and binding obligation of the Company, enforceable against the Company in accordance with its terms, except as limited by bankruptcy, insolvency or other laws of general application relating to or affecting the enforcement of creditors&rsquo; rights generally and general principles of equity. To the knowledge of the Company, it is not in violation of (i) its current operating agreement, or (ii) any material indenture or contract to which the Company is a party or by which it is bound, where, in each case, such violation or default, individually, or together with all such violations or defaults, could reasonably be expected to have a material adverse effect on the Company.</p>
<p class="western" align="justify">(c) To the knowledge of the Company, the performance and consummation of the transactions contemplated by this instrument do not and will not: (i) violate any material judgment, statute, rule or regulation applicable to the Company; (ii) result in the acceleration of any material indenture or contract to which the Company is a party or by which it is bound; or (iii) result in the creation or imposition of any lien upon any property, asset or revenue of the Company or the suspension, forfeiture, or nonrenewal of any material permit, license or authorization applicable to the Company, its business or operations.</p>
<p class="western" align="justify">(d) No consents or approvals are required in connection with the performance of this instrument, other than: (i) the Company&rsquo;s corporate approvals; and (ii) any qualifications or filings under applicable securities laws.</p>
<p class="western" align="justify">(e) To its knowledge, the Company owns or possesses (or can obtain on commercially reasonable terms) sufficient legal rights to all patents, trademarks, service marks, trade names, copyrights, trade secrets, licenses, information, processes and other intellectual property rights necessary for its business as now conducted and as currently proposed to be conducted, without an infringement of the rights of others.</p>
<p class="western" align="justify">&nbsp;</p>
<p class="western" align="justify">4. <em><strong>Purchaser Representations</strong></em></p>
<p class="western" align="justify">(a) The Purchaser has full legal capacity, power and authority to execute and deliver this instrument and to perform its obligations hereunder. This instrument constitutes valid and binding obligation of the Purchaser, enforceable in accordance with its terms, except as limited by bankruptcy, insolvency or other laws of general application relating to or affecting the enforcement of creditors&rsquo; rights generally and general principles of equity.</p>
<p class="western" align="justify">(b) The Purchaser has been advised that this instrument is a security and that the offers and sales of this instrument have not been registered under any country&rsquo;s securities laws and, therefore, cannot be resold except in compliance with the applicable country&rsquo;s laws. The Purchaser is purchasing this instrument for its own account for investment, not as a nominee or agent, and not with a view to, or for resale in connection with, the distribution thereof, and the Purchaser has no present intention of selling, granting any participation in, or otherwise distributing the same. The Purchaser has such knowledge and experience in financial and business matters that the Purchaser is capable of evaluating the merits and risks of such investment, is able to incur a complete loss of such investment without impairing the Purchaser&rsquo;s financial condition and is able to bear the economic risk of such investment for an indefinite period of time.</p>
<p class="western" align="justify">(c) The Purchaser enters into this SAFT with the predominant expectation that he, she or it, as the case may be, will profit upon the successful development and Network Launch arising from the efforts of the Company and its employees to develop and market the Network and the Network Launch and related sale of the Tokens.</p>
<p class="western" align="justify">(d) The Purchaser is not in the United States and is not a &ldquo;U.S. Person&rdquo; as defined in Rule 902 of Regulation S under the Securities Act (a &ldquo;<em><strong>U.S. Person</strong></em>&rdquo;).</p>
<p class="western" align="justify">(e) This SAFT was not offered to the Purchaser in the United States.</p>
<p class="western" align="justify">(f) This SAFT was delivered to, completed, executed and delivered by the Purchaser (or its authorized signatory) outside the United States.</p>
<p class="western" align="justify">(g) The Purchaser is not a &ldquo;distributor&rdquo; of securities, as that term is defined in Regulation S under the Securities Act, nor a dealer in securities, and is not purchasing this SAFT for the account or benefit of, directly or indirectly, any U.S. Person.</p>
<p class="western" align="justify">(h) The current structure of this SAFT and all transactions and activities contemplated hereunder is not a scheme to evade the registration requirements of the Securities Act.</p>
<p class="western" align="justify">5. <em><strong>Procedures for Purchase of Rights and</strong></em> <em><strong>Valuation of Purchase Amount</strong></em><em>.</em></p>
<p class="western" align="justify">(a) The Company will accept payment for the Right purchased under this SAFT in U.S. Dollars, Bitcoin and Ethereum. Purchaser shall make the required payment to the Company in consideration for Purchaser&rsquo;s purchase of the Right pursuant to the SAFT through the procedures set forth on <em><u>Exhibit A</u></em> hereof.</p>
<p class="western" align="justify">(b) For purposes of this instrument, the value of the Purchase Amount shall be deemed in U.S. Dollars whether the Purchaser pays in U.S. Dollars, Bitcoin or Ethereum, valued at the Applicable Exchange Rate for U.S. Dollars. The term &ldquo;<em><strong>Applicable Exchange Rate</strong></em>&rdquo; shall mean the volume-weighted average daily price of Bitcoin or Ethereum, as applicable, as listed on <div style="display: inline-block; background-color:#f79632">{{website}}</div>, in the 24-hour period preceding the day and time that the Company has accepted Purchaser&rsquo;s offer to purchase the Right under this SAFT.</p>
<p class="western" align="justify">6. <em><strong>Miscellaneous</strong></em></p>
<p class="western" align="justify">(a) This instrument sets forth the entire agreement and understanding of the parties relating to the subject matter herein and supersedes all prior or contemporaneous disclosures, discussions, understandings and agreements, whether oral of written, between them. This instrument is one of a series of similar instruments entered into by the Company from time to time. Any provision of this instrument may be amended, waived or modified only upon the written consent of the Company and the holders of a majority, in the aggregate, of the Purchase Amounts paid to the Company with respect to all SAFTs outstanding at the time of such amendment, waiver or modification.</p>
<p class="western" align="justify">(b) Any notice required or permitted by this instrument will be deemed sufficient when sent by email to the relevant address listed on the signature page, as subsequently modified by written notice received by the appropriate party.</p>
<p class="western" align="justify">(c) The Purchaser is not entitled, as a holder of this instrument, to vote or receive dividends or be deemed the holder of capital stock of the Company for any purpose, nor will anything contained herein be construed to confer on the Purchaser, as such, any of the rights of a stockholder of the Company or any right to vote for the election of directors or upon any matter submitted to stockholders at any meeting thereof, or to give or withhold consent to any corporate action or to receive notice of meetings, or to receive subscription rights or otherwise. Furthermore, nothing contained herein shall be construed to confer on the Purchaser, as such, any right to purchase, convert into or otherwise obtain any other securities of the Company.</p>
<p class="western" align="justify">(d) Neither this instrument nor the rights contained herein may be assigned, by operation of law or otherwise, by either party without the prior written consent of the other; <em>provided, however</em>, that this instrument and/or the rights contained herein may be assigned without the Company&rsquo;s consent by the Purchaser to any other entity who directly or indirectly, controls, is controlled by or is under common control with the Purchaser, including, without limitation, any general partner, managing member, officer or director of the Purchaser, or any venture capital fund now or hereafter existing which is controlled by one or more general partners or managing members of, or shares the same management company with, the Purchaser; and <em>provided, further</em>, that the Company may assign this instrument in whole, without the consent of the Purchaser, in connection with a reincorporation to change the Company&rsquo;s domicile.</p>
<p class="western" align="justify">&nbsp;</p>
<p class="western" align="justify">(e) In the event any one or more of the provisions of this instrument is for any reason held to be invalid, illegal or unenforceable, in whole or in part or in any respect, or in the event that any one or more of the provisions of this instrument operate or would prospectively operate to invalidate this instrument, then and in any such event, such provision(s) only will be deemed null and void and will not affect any other provision of this instrument and the remaining provisions of this instrument will remain operative and in full force and effect and will not be affected, prejudiced, or disturbed thereby.</p>
<p class="western" align="justify">&nbsp;</p>
<p class="western" align="justify">(f) All rights and obligations hereunder will be governed by the laws of <div style="display: inline-block; background-color:#f79632">{{jurisdiction}}</div>, without regard to the conflicts of law provisions of such jurisdiction.</p>
<p class="western">&nbsp;</p>
<p class="western" align="center">(<em>Signature page follows</em>)</p>
<p class="western"><strong>IN WITNESS WHEREOF</strong>, the undersigned have caused this instrument to be duly executed and delivered.</p>
<p class="western">&nbsp;</p>
<p>(Signature)</p>
<p>________________________________________ </p>
<p>Name: <span id="partyName">{{partyName}}</span></p>
<p>Email: <span id="partyEmail">{{partyEmail}}</span></p>
<p>Address: <span id="partyAddress">{{partyAddress}}</span></p>
<p>Wallet: <span id="partyWallet">{{partyWallet}}</span></p>
<p class="western">&nbsp;</p>
<p class="western"><strong>PURCHASER:</strong></p>
<p>(Signature)</p>
<p>________________________________________</p>
<p>Name: <span id="counterPartyName">{{counterPartyName}}</span></p>
<p>Email: <span id="counterPartyEmail">{{counterPartyEmail}}</span></p>
<p>Address: <span id="counterPartyAddress">{{counterPartyAddress}}</span>
<p>Wallet: <span id="counterPartyWallet">{{counterPartyWallet}}</span>
<p class="western">&nbsp;</p>
<p class="western">&nbsp;</p>
<p class="western" align="center">&nbsp;</p>
<p class="western" align="center"><u><strong>EXHIBIT A</strong></u></p>
<p class="western" align="center">&nbsp;</p>
<p class="western" align="center"><span style="font-size: large;"><strong>Payment Instructions</strong></span></p>
<p class="western" align="center">&nbsp;</p>
<p class="western"><strong>For payments by U.S. Dollars, please remit payment using the following wire information: </strong></p>
<p class="western">&nbsp;</p>
<p class="western">Bank Name: <div style="display: inline-block; background-color:#f79632">{{bankName}}</div></p>
<p class="western">Address: <div style="display: inline-block; background-color:#f79632">{{address}}</div></p>
<p class="western">ABA#: <div style="display: inline-block; background-color:#f79632">{{aba}}</div></p>
<p class="western">Payee Account #: <div style="display: inline-block; background-color:#f79632">{{payeeAccount}}</div></p>
<p class="western">Payee Account Name: <div style="display: inline-block; background-color:#f79632">{{payeeAccountName}}</div></p>
<p class="western">&nbsp;</p>
<p class="western">&nbsp;</p>
<p class="western"><strong>For payments by Ethereum, please remit payment using the following address:</strong></p>
<p class="western"><span style="color: #000000;"><span style="font-family: Times, serif;"><div style="display: inline-block; background-color:#f79632">{{ethereum}}</div></span></span></p>
<p class="western">&nbsp;</p>
<p class="western">&nbsp;</p>
<p class="western"><strong>For payments by Bitcoin, please remit payment using the following address: </strong></p>
<p class="western"><span style="color: #000000;"><span style="font-family: Times, serif;"><div style="display: inline-block; background-color:#f79632">{{bitcoin}}</div></span></span></p>
<p class="western">&nbsp;</p></div>`;

export default Saft;
