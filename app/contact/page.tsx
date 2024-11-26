"use client";

import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";
import clsx from "clsx";
import { fontMono } from "@/config/fonts";

export default function Contact() {
  return (
    <div className={clsx("max-w-6xl mx-auto px-4 py-12", fontMono.variable)}>
      {/* Header Section */}
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 font-mono">
          Get in Touch
        </h1>
        <h2 className="text-2xl md:text-4xl font-mono">
          Let&apos;s <span className="text-white">Collaborate</span>
        </h2>
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Column - Info */}
        <div className="space-y-8">
          <p className="text-lg md:text-xl font-mono">
            I&apos;m always open to new opportunities and collaborations.
            Whether you have a project in mind or just want to connect, feel
            free to reach out!
          </p>

          <div>
            <h3 className="text-xl md:text-2xl text-gray-300 font-mono font-bold underline mb-4">
              Socials
            </h3>
            <ul className="space-y-3">
              {Object.entries(siteConfig.links).map(([key, value]) => (
                <li key={key}>
                  <Link
                    className="text-[#EFA00B] font-mono hover:text-[#D98E0A] transition-colors"
                    href={value}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div>
          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            className="space-y-6"
          >
            <input
              type="hidden"
              name="access_key"
              value="bfc689bb-11be-43ff-9764-e8ecf0b6a523"
            />

            <div className="flex flex-wrap -mx-2">
              <div className="w-full sm:w-1/2 px-2 mb-4 sm:mb-0">
                <label
                  className="block mb-2 text-sm font-semibold font-mono"
                  htmlFor="full-name"
                >
                  Name<span className="text-red-600 ml-1">*</span>
                </label>
                <input
                  required
                  type="text"
                  id="full-name"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full py-3 px-4 text-sm text-gray-100 placeholder-gray-400 
                           border border-gray-200 rounded-lg font-mono
                           focus:border-[#EFA00B] focus:outline-none 
                           transition-colors duration-200"
                />
              </div>
              <div className="w-full sm:w-1/2 px-2">
                <label
                  className="block mb-2 text-sm font-semibold font-mono"
                  htmlFor="email"
                >
                  Email<span className="text-red-600 ml-1">*</span>
                </label>
                <input
                  required
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full py-3 px-4 text-sm text-gray-100 placeholder-gray-400 
                           border border-gray-200 rounded-lg font-mono
                           focus:border-[#EFA00B] focus:outline-none 
                           transition-colors duration-200"
                />
              </div>
            </div>

            <div>
              <label
                className="block mb-2 text-sm font-semibold font-mono"
                htmlFor="message"
              >
                Message<span className="text-red-600 ml-1">*</span>
              </label>
              <textarea
                required
                id="message"
                name="message"
                placeholder="Write your message here..."
                className="w-full h-32 py-3 px-4 text-sm text-gray-100 placeholder-gray-400 
                         border border-gray-200 rounded-lg font-mono resize-none
                         focus:border-[#EFA00B] focus:outline-none 
                         transition-colors duration-200"
              />
            </div>

            <div className="h-captcha" data-captcha="true" />

            <div className="flex justify-center sm:justify-start">
              <button
                type="submit"
                className="w-full sm:w-auto py-3 px-8 text-sm font-semibold font-mono
                         text-white bg-[#EFA00B] rounded-lg
                         hover:bg-[#D98E0A] transition-colors duration-200
                         border-2 border-[#EFA00B] hover:border-[#D98E0A]"
              >
                Send Message
              </button>
            </div>
          </form>

          <script async defer src="https://web3forms.com/client/script.js" />
        </div>
      </div>
    </div>
  );
}
