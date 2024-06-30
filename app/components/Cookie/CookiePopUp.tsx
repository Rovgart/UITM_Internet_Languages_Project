"use client";
import { getCookie, setCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
type Props = {};

const CookiePopUp = (props: Props) => {
  const [showBanner, setShowBanner] = useState(false);
  // After refresh checks, whether the user has already have cookies or
  useEffect(() => {
    window.scrollTo(0, 0);
    displayCookieAlert();
  }, []);

  const displayCookieAlert = () => {
    const consent = getCookie("cookie_consent");
    if (!consent) {
      setShowBanner(true); //A
      document.body.style.overflow = "hidden";
    }
  };
  const preventScrolling = () => {};
  const handleAccept = () => {
    setCookie("cookie_consent", "accepted", {
      expires: new Date(Date.now() + 960000),
    });
    document.body.style.overflow = "auto";

    setShowBanner(false);
  };
  if (!showBanner) {
    return null;
  }
  return (
    <Modal width="100vw" height="100vh">
      <div
        id="cookieConsent"
        className="fixed bottom-0 w-full bg-robin_egg_blue-100 text-robin_egg_blue-900 p-4 shadow-lg z-50"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-semibold mb-2">We Value Your Privacy</h2>
          <p className="mb-4">
            Our website uses cookies to ensure you get the best experience. By
            continuing to browse, you consent to our use of cookies. For more
            information, please read our
            <a
              href="/privacy-policy"
              target="_blank"
              className="underline text-blue-400 hover:text-blue-300"
            >
              Privacy Policy
            </a>
            .
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleAccept}
              id="acceptCookies"
              className="bg-mint_cream-200 hover:bg-mint_cream-100 text-white font-semibold py-2 px-4 rounded"
            >
              Accept
            </button>
            <button
              id="declineCookies"
              className="bg-light_red hover:bg-light_red-400 text-white font-semibold py-2 px-4 rounded"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CookiePopUp;
