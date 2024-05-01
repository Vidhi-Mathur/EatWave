import React from "react";
import backgroundImage from '../../assets/EatWaveLogo1.png'
import Layout from "../UI/Layout";

const TermsAndConditions = () => {
  return (
    <Layout customisedImageUrl={backgroundImage}>
  <div className="container mx-auto px-4 py-8 max-h-[calc(100vh-98px)] overflow-y-auto">
     <p className="mb-4">
        Last updated on March 31, 2023
      </p>
      <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">I. Acceptance of terms</h3>
        <p className="mb-4">
          Thank you for using EatWave. These Terms of Service (the "Terms") are intended to make you aware of your legal rights and responsibilities with respect to your access to and use of the EatWave website at www.EatWave.com (the "Site") and any related mobile or software applications ("EatWave Platform") including but not limited to delivery of information via the website whether existing now or in the future that link to the Terms (collectively, the "Services").
        </p>
        <p className="mb-4">
          These Terms are effective for all existing and future EatWave customers, including but without limitation to users having access to 'restaurant business page' to manage their claimed business listings.
        </p>
        <p className="mb-4">
          Please read these Terms carefully. By accessing or using the EatWave Platform, you are agreeing to these Terms and concluding a legally binding contract with EatWave Limited (formerly known as EatWave Private Limited and EatWave Media Private Limited) and/or its affiliates (excluding EatWave Foods Private Limited) (hereinafter collectively referred to as "EatWave"). You may not use the Services if you do not accept the Terms or are unable to be bound by the Terms. Your use of the EatWave Platform is at your own risk, including the risk that you might be exposed to content that is objectionable, or otherwise inappropriate.
        </p>
        <p className="mb-4">
          In order to use the Services, you must first agree to the Terms. You can accept the Terms by:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Clicking to accept or agree to the Terms, where it is made available to you by EatWave in the user interface for any particular Service; or</li>
          <li>Actually using the Services. In this case, you understand and agree that EatWave will treat your use of the Services as acceptance of the Terms from that point onwards.</li>
        </ul>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
      <p className="mb-4">
        EatWave Limited (Formerly known as EatWave Private Limited and EatWave Media Private Limited) and/or its affiliates ("EatWave," the "Company," "we," "us," and "our,") respect your privacy and is committed to protecting it through its compliance with its privacy policies. This policy describes:
      </p>
      <ol className="list-decimal list-inside mb-8">
        <li>
          the types of information that EatWave may collect from you when you access or use its websites, applications and other online services (collectively, referred as "Services"); and
        </li>
        <li>
          its practices for collecting, using, maintaining, protecting and disclosing that information.
        </li>
      </ol>
      <p className="mb-4">
        This policy applies only to the information EatWave collects through its Services, in email, text and other electronic communications sent through or in connection with its Services.
      </p>
      <p className="mb-4">
        This policy DOES NOT apply to information that you provide to, or that is collected by, any third-party, such as restaurants at which you make reservations and/or pay through EatWave's Services and social networks that you use in connection with its Services. EatWave encourages you to consult directly with such third-parties about their privacy practices.
      </p>
      <p className="mb-4">
        Please read this policy carefully to understand EatWave's policies and practices regarding your information and how EatWave will treat it. By accessing or using its Services and/or registering for an account with EatWave, you agree to this privacy policy and you are consenting to EatWave's collection, use, disclosure, retention, and protection of your personal information as described here. If you do not provide the information EatWave requires, EatWave may not be able to provide all of its Services to you.
      </p>
      <p className="mb-4">
        If you reside in a country within the European Union/European Economic Area (EAA), EatWave Media Portugal, Unipessoal LDA , located at Avenida 24 de Julho, N 102-E, 1200-870, Lisboa, Portugal, will be the controller of your personal data provided to, or collected by or for, or processed in connection with our Services;
      </p>
      <p className="mb-4">
        If you reside in United States of America, EatWave USA LLC, located at 7427 Matthews Mint Hill Rd., STE 105, #324, Mint Hill, NC 28227 will be the controller of your personal data provided to, or collected by or for, or processed in connection with our Services;
      </p>
      <p className="mb-4">
        If you reside in any other part of the world, EatWave Limited, located at Pioneer Square, Tower 1- Ground to 6th Floor and Tower 2- 1st and 2nd Floors, Near Golf Course Extension, Sector-62, Gurugram, Haryana - 122098, India will be the controller of your personal data provided to, or collected by or for, or processed in connection with our Services.
      </p>
      <p className="mb-4">
        Your data controller is responsible for the collection, use, disclosure, retention, and protection of your personal information in accordance with its privacy standards as well as any applicable national laws. Your data controller may transfer data to other members of EatWave as described in this Privacy Policy. EatWave may process and retain your personal information on its servers in India where its data centers are located, and/or on the servers of its third parties (in or outside India), having contractual relationships with EatWave.
      </p>
      <p className="mb-4">
        This policy may change from time to time, your continued use of EatWave's Services after it makes any change is deemed to be acceptance of those changes, so please check the policy periodically for updates.
      </p>
    </div>
    </Layout>
  );
};

export default TermsAndConditions;
