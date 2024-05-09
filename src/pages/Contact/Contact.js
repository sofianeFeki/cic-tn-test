import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);

  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState("");

  // ========== Error Messages Start here ============
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errMessages, setErrMessages] = useState("");
  // ========== Error Messages End here ==============
  const [successMsg, setSuccessMsg] = useState("");

  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handleMessages = (e) => {
    setMessages(e.target.value);
    setErrMessages("");
  };

  // ================= Email Validation start here =============
  const emailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };
  // ================= Email Validation End here ===============

  const handlePost = async (e) => {
    e.preventDefault();

    if (!clientName) {
      setErrClientName("Enter your Name");
    }
    if (!email) {
      setErrEmail("Enter your Email");
    } else {
      if (!emailValidation(email)) {
        setErrEmail("Enter a Valid Email");
      }
    }
    if (!messages) {
      setErrMessages("Enter your Messages");
    }

    if (clientName && email && emailValidation(email) && messages) {
      try {
        // Send email using email.js
        const emailResult = await emailjs.send(
          "service_8nstdw5",
          "template_ndsalxz",
          {
            to_name: "Recipient Name", // Update with recipient name
            from_name: clientName,
            form_email: email,
            message: messages,
          },
          "z5ibi5U1e-uDMgyLP"
        );

        // Check the result of the email sending operation
        console.log(emailResult.text);

        // Update state to show success message
        setSuccessMsg(
          `Thank you dear ${clientName}, Your message has been received successfully. Further details will be sent to you by email at ${email}.`
        );
      } catch (error) {
        console.error("Error sending email:", error);
        // Handle error and update state accordingly
      }
    }
  };

  return (
    <div className='max-w-container mx-auto px-4 grid md:grid-cols-2 gap-8'>
      <div>
        <Breadcrumbs title='Contact' prevLocation={prevLocation} />
        {successMsg ? (
          <p className='pb-20 w-96 font-medium text-green-500'>{successMsg}</p>
        ) : (
          <form className='pb-20' onSubmit={handlePost}>
            <h1 className='font-titleFont font-semibold text-3xl'>
              Fill up a Form
            </h1>
            <div className='w-[500px] h-auto py-6 flex flex-col gap-6'>
              <div>
                <p className='text-base font-titleFont font-semibold px-2'>
                  Name
                </p>
                <input
                  onChange={handleName}
                  value={clientName}
                  className='w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor'
                  type='text'
                  placeholder='Enter your name here'
                  name='from_name'
                />
                {errClientName && (
                  <p className='text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1'>
                    <span className='text-sm italic font-bold'>!</span>
                    {errClientName}
                  </p>
                )}
              </div>
              <div>
                <p className='text-base font-titleFont font-semibold px-2'>
                  Email
                </p>
                <input
                  onChange={handleEmail}
                  value={email}
                  className='w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor'
                  type='email'
                  placeholder='Enter your email here'
                  name='form_email'
                />
                {errEmail && (
                  <p className='text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1'>
                    <span className='text-sm italic font-bold'>!</span>
                    {errEmail}
                  </p>
                )}
              </div>
              <div>
                <p className='text-base font-titleFont font-semibold px-2'>
                  Messages
                </p>
                <textarea
                  onChange={handleMessages}
                  value={messages}
                  cols='30'
                  rows='3'
                  className='w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor resize-none'
                  placeholder='Enter your messages here'
                  name='message'
                ></textarea>
                {errMessages && (
                  <p className='text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1'>
                    <span className='text-sm italic font-bold'>!</span>
                    {errMessages}
                  </p>
                )}
              </div>
              <button
                type='submit'
                className='w-44 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200'
              >
                Post
              </button>
            </div>
          </form>
        )}
      </div>
      <div className='max-w-container mx-auto py-10'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3194.2152892865925!2d10.177664976296905!3d36.81336066695691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd347cc0418a3d%3A0x63959be0b3637142!2sChemical%20Ink%20Company%20Tunis!5e0!3m2!1sen!2stn!4v1715217456962!5m2!1sen!2stn'
          width='800'
          height='550'
          allowFullScreen=''
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
