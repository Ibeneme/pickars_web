import React from "react";
import "./PrivacyPolicyPage.css"; // Assuming the same CSS file is used for styling

const TermsAndConditionsPage: React.FC = () => {
  return (
    <div className="privacy-container">
      <h1 className="privacy-title">TERMS AND CONDITIONS</h1>
      <p className="privacy-paragraph">
        Welcome to **Pickars Courier Limited**! These Terms and Conditions
        ("Terms") govern your use of the Pickars Courier Limited platform,
        website, and mobile application ("Platform") and the services we provide
        ("Services"). By accessing or using our Platform, you agree to be bound
        by these Terms. If you do not agree with any part of these Terms, you
        must not use our Services.
      </p>
      <p className="privacy-paragraph">
        The Services offered by Pickars Courier Limited are intended to connect
        users ("Customers") with independent delivery riders ("Riders") to
        facilitate the dispatch and delivery of items. Pickars Courier Limited
        acts as an intermediary platform and is not a courier service itself.
      </p>

      {/* --- Section 1: User Account --- */}
      {/* <hr className="privacy-separator" /> */}
      <h2 className="privacy-section-heading">1. User Account</h2>
      <p className="privacy-paragraph">
        **1.1. Account Creation:** To use our Services, you must create an
        account. You agree to provide accurate, complete, and current
        information during the registration process. You are responsible for
        maintaining the confidentiality of your account password and are liable
        for all activities that occur under your account.
      </p>
      <p className="privacy-paragraph">
        **1.2. Eligibility:** You must be at least 18 years old to create an
        account and use our Services. By using the Platform, you represent and
        warrant that you meet this age requirement.
      </p>
      <p className="privacy-paragraph">
        **1.3. Prohibited Use:** You may not create an account for anyone other
        than yourself without authorization. Your account is non-transferable
        and may not be sold, traded, or otherwise transferred to any other
        person or entity.
      </p>

      {/* --- Section 2: Services and Responsibilities --- */}
      {/* <hr className="privacy-separator" /> */}
      <h2 className="privacy-section-heading">
        2. Services and Your Responsibilities
      </h2>
      <p className="privacy-paragraph">
        **2.1. Dispatch and Delivery:** Our Platform allows you to request a
        Rider to pick up and deliver an item. You are responsible for accurately
        describing the item, providing correct pickup and delivery addresses,
        and ensuring the item is ready for pickup.
      </p>
      <p className="privacy-paragraph">
        **2.2. Item Restrictions:** You agree not to request the dispatch of any
        illegal, hazardous, or prohibited items, including but not limited to
        weapons, illegal substances, stolen goods, or any items that require a
        special license or permit for transport. Pickars Courier Limited
        reserves the right to refuse a delivery request at its discretion if it
        suspects a violation of this clause.
      </p>
      <p className="privacy-paragraph">
        **2.3. Communication:** You agree to maintain professional and
        respectful communication with Riders. Any form of harassment, abuse, or
        inappropriate behavior towards a Rider will result in immediate account
        suspension.
      </p>

      {/* --- Section 3: Payments and Fees --- */}
      {/* <hr className="privacy-separator" /> */}
      <h2 className="privacy-section-heading">3. Payments and Fees</h2>
      <p className="privacy-paragraph">
        **3.1. Pricing:** The fees for our Services are displayed on the
        Platform. By placing a delivery request, you agree to pay the quoted
        price for the service. Pricing may be subject to change based on factors
        such as distance, time, and demand.
      </p>
      <p className="privacy-paragraph">
        **3.2. Payment Processing:** All payments are processed securely through
        our third-party payment partners. You agree to provide valid and current
        payment information. You authorize us to charge your selected payment
        method for all fees and applicable taxes.
      </p>
      <p className="privacy-paragraph">
        **3.3. Cancellation Policy:** You may cancel a delivery request, but a
        cancellation fee may apply if a Rider has already been dispatched. The
        specific cancellation fee structure will be outlined on the Platform.
      </p>

      {/* --- Section 4: Limitation of Liability and Disclaimer --- */}
      {/* <hr className="privacy-separator" /> */}
      <h2 className="privacy-section-heading">
        4. Limitation of Liability and Disclaimer
      </h2>
      <p className="privacy-paragraph">
        **4.1. Platform Only:** Pickars Courier Limited is a technology platform
        that facilitates a connection between you and a Rider. We are not
        responsible for the actions, omissions, or conduct of any Rider. You
        acknowledge that any delivery service is performed by the Rider and that
        Pickars Courier Limited disclaims all liability for any loss, damage, or
        theft of your item during transit.
      </p>
      <p className="privacy-paragraph">
        **4.2. "As Is" Service:** The Platform and Services are provided on an
        "as is" and "as available" basis. Pickars Courier Limited makes no
        warranties, express or implied, regarding the reliability, timeliness,
        or quality of the Services. We do not guarantee that the Platform will
        be uninterrupted or error-free.
      </p>
      <p className="privacy-paragraph">
        **4.3. Indemnification:** You agree to indemnify and hold harmless
        Pickars Courier Limited, its affiliates, and their respective officers,
        directors, and employees from any claims, damages, losses, or costs
        arising from your use of the Services or your breach of these Terms.
      </p>

      {/* --- Section 5: Intellectual Property --- */}
      {/* <hr className="privacy-separator" /> */}
      <h2 className="privacy-section-heading">5. Intellectual Property</h2>
      <p className="privacy-paragraph">
        All content on the Platform, including text, graphics, logos, and
        software, is the property of Pickars Courier Limited or its licensors
        and is protected by intellectual property laws. You may not use any of
        our trademarks or other intellectual property without our prior written
        consent.
      </p>

      {/* --- Section 6: Termination --- */}
      {/* <hr className="privacy-separator" /> */}
      <h2 className="privacy-section-heading">6. Termination</h2>
      <p className="privacy-paragraph">
        We reserve the right to suspend or terminate your access to the Platform
        and Services at any time, with or without cause, and without prior
        notice. We may do this if you violate these Terms, engage in fraudulent
        or illegal activity, or for any other reason deemed appropriate by us.
      </p>

      {/* --- Section 7: Governing Law and Jurisdiction --- */}
      {/* <hr className="privacy-separator" /> */}
      <h2 className="privacy-section-heading">
        7. Governing Law and Jurisdiction
      </h2>
      <p className="privacy-paragraph">
        These Terms are governed by the laws of [Your Jurisdiction], without
        regard to its conflict of law principles. Any disputes arising from
        these Terms or your use of the Services shall be resolved in the courts
        located in [Your Jurisdiction].
      </p>

      {/* --- Section 8: Changes to these Terms --- */}
      {/* <hr className="privacy-separator" /> */}
      <h2 className="privacy-section-heading">8. Changes to these Terms</h2>
      <p className="privacy-paragraph">
        We may update these Terms from time to time. We will notify you of any
        significant changes by posting the new Terms on the Platform and, where
        appropriate, by sending you an email notification. Your continued use of
        the Services after any such changes constitutes your acceptance of the
        new Terms.
      </p>

      {/* --- Section 9: Contact Us --- */}
      {/* <hr className="privacy-separator" /> */}
      <h2 className="privacy-section-heading">9. Contact Us</h2>
      <p className="privacy-paragraph">
        If you have any questions about these Terms, please contact us at{" "}
        <a href="mailto:support@pickars.com" className="privacy-link">
          support@pickars.com
        </a>
        .
      </p>

      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default TermsAndConditionsPage;
