import styles from "./FaqPage.module.css";
import Header from "../../home/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function FaqPage() {
  const faqs = [
    {
      question: "What your commission fee do we charge for selling a car?",
      answer: `We charge a standard 5% of sale value.`,
    },
    {
      question: "Who receives the funds once the car is sold?",
      answer: `We as the authorized dealer will receive funds first, deduct our 5% commission from the
transaction, afterwhich remit your funds directly to you.`,
    },
    {
      question: "Can I Trade In My Car?",
      answer: `Yes we can do a trade in, we would kindly ask you to share images via WhatsApp first, if we
have a market for your car then we will ask you to bring your car of to us for a full
assessment & in person discussion for trade in consideration.`,
    },
    {
      question: "Do I have to leave my car in the showroom?",
      answer: `Yes we sell all our cars from showroom, that way when clients like yourself come to view
our cars they see a wide range of cars all at once.`,
    },
    {
      question: "How long does it take to sell?",
      answer: `If your car is well priced it can sell anywhere between 24hrs to (3) three weeks, market
volatility will also determine how it performs.`,
    },
    {
      question: "What if I get a buyer myself or Change my Mind on Selling?",
      answer: `In the event it does, you will not owe us any commission, you will only pay us and exit
advertising fee of 3,000/= (Three Thousand Shillings Only).`,
    },
    {
      question:
        "What if my car has a Loan or Microfinance Facility Can you sell?",
      answer: `Yes we can still sell, however you will need to provide all updated financier records including
clearance method, amount taken, balance left & due dates. This way we will then be able to
disclose to buyers for a seamless transaction.`,
    },
  ];

  const [activeFaq, setActiveFaq] = useState(0);


  return (
    <>
      <Header />

      <div className={styles.body}>
        <div className={styles.sellingContainer}>
          <h1>How to Sell With Us</h1>

          <div className={styles.steps}>
            <div className={styles.step}>
              <p className={styles.title}>Step 1</p>
              <p className={styles.content}>
                Send photos & details of the car or bike{" "}
                <a
                  href={`https://wa.me/254748883598/?text=${encodeURIComponent(
                    `Hey Classic Car Listings. I was interested in selling my car/bike. Lemme send you the details of the car/bike as well as some pictures too`
                  )}`}
                >
                  via Whatsapp
                </a>
              </p>
            </div>
            <div className={styles.step}>
              <p className={styles.title}>Step 2</p>
              <p className={styles.content}>
                We will assess the car and see if we have market for it
              </p>
            </div>
            <div className={styles.step}>
              <p className={styles.title}>Step 3</p>
              <p className={styles.content}>
                Bring the car/bike to our showroom in Karen, Nairobi
              </p>
            </div>
            <div className={styles.step}>
              <p className={styles.title}>Step 4</p>
              <p className={styles.content}>
                Sign Sale Consent and agree on the price and commission
              </p>
            </div>
          </div>
        </div>

        <div className={styles.faqContainer}>
          <h1>FAQ</h1>

          <div className={styles.faqContent}>
            {faqs.map((faq, faqIndex) => {
              return (
                <div
                  key={faq.question}
                  className={`${styles.faq}  ${
                    activeFaq === faqIndex ? styles.active : ""
                  }`}
                  onClick={(e) => {
                    setActiveFaq(faqIndex);
                    setTimeout(() => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const fullyVisible =
                        rect.top >= 0 &&
                        rect.bottom <=
                          (window.innerHeight ||
                            document.documentElement.clientHeight);

                      if (!fullyVisible) {
                        e.currentTarget.scrollIntoView({
                          behavior: "smooth",
                          block: "nearest",
                          inline: "nearest",
                        });
                      }
                    }, 150); // Slight delay to wait for the keyboard to appear (especially on mobile);
                    console.log(
                      `faqIndex is ${faqIndex} and activeFaq is ${activeFaq}`
                    );
                  }}
                >
                  <div className={styles.question}>
                    <p>{faq.question}</p>
                    <FontAwesomeIcon
                      icon={
                        activeFaq === faqIndex ? faChevronUp : faChevronDown
                      }
                      style={{
                        fontSize: "1.15rem",
                        marginRight: "6px",
                        color:
                          activeFaq === faqIndex
                            ? "rgb(34, 154, 104)"
                            : "black",
                      }}
                    />
                  </div>

                  <p className={`${styles.answer}`}>{faq.answer}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
