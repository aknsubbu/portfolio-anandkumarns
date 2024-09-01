"use client";

import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";

export default function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Get in Touch</h1>
        <h2 className="text-2xl md:text-4xl text-[#3D3D3D]">
          Let&apos;s <span className="text-[#FFFFFF]">Collaborate</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-lg md:text-xl mb-6 text-left">
            I&apos;m always open to new opportunities and collaborations.
            Whether you have a project in mind or just want to connect, feel
            free to reach out!
          </p>
          <div className="text-left mb-6">
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              Contact Information
            </h3>
            <p>Email: aknsubbu@gmail.com</p>
            <p>Phone: +91 9384870740</p>
          </div>
          <div className="text-left">
            <h3 className="font-bold text-xl md:text-2xl text-gray-500">
              Socials
            </h3>
            <ul className="space-y-2">
              {Object.entries(siteConfig.links).map(([key, value]) => (
                <li key={key}>
                  <Link className="text-[#EFA00B]" href={value}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            className="space-y-6"
          >
            <input
              name="access_key"
              type="hidden"
              value="bfc689bb-11be-43ff-9764-e8ecf0b6a523"
            />

            <div className="flex flex-wrap -mx-2">
              <div className="w-full sm:w-1/2 px-2 mb-4 sm:mb-0">
                <label
                  className="block mb-1.5 text-sm font-semibold"
                  htmlFor="full-name"
                >
                  <span>Name</span>
                  <span className="text-red-600">*</span>
                </label>
                <input
                  required
                  className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
                  id="full-name"
                  name="name"
                  placeholder="Enter Name here"
                  type="text"
                />
              </div>
              <div className="w-full sm:w-1/2 px-2">
                <label
                  className="block mb-1.5 text-sm font-semibold"
                  htmlFor="email"
                >
                  <span>Email</span>
                  <span className="text-red-600">*</span>
                </label>
                <input
                  required
                  className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
                  id="email"
                  name="email"
                  placeholder="Enter your E-mail here"
                  type="email"
                />
              </div>
            </div>
            <div>
              <label
                className="block mb-1.5 text-sm font-semibold"
                htmlFor="message"
              >
                <span>Message</span>
                <span className="text-red-600">*</span>
              </label>
              <textarea
                required
                className="w-full h-32 py-3 px-4 resize-none text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
                id="message"
                name="message"
                placeholder="What you want to say..."
              />
            </div>
            <div
              className="h-captcha flex items-center justify-center"
              data-captcha="true"
            />
            <div className="flex justify-center sm:justify-start">
              <button
                className="relative group inline-block flex-shrink-0 w-full sm:w-auto py-3 px-5 text-sm font-semibold text-white bg-[#EFA00B] border-2 border-[#EFA00B] rounded-md overflow-hidden transition duration-300 hover:bg-[#D98E0A]"
                type="submit"
              >
                <span className="relative z-10">Send</span>
              </button>
            </div>
          </form>
          <script async defer src="https://web3forms.com/client/script.js" />
        </div>
      </div>
    </div>
  );
}
