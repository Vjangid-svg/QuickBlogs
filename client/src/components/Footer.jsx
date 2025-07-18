import React from "react";
import { assets } from "../assets/assets";
import { footer_data } from "../assets/assets";
const Footer = () => {
  return (
    <div className="sm:px-34 px-10 back bg-[#5044e508] ">
      <div className=" flex flex-col sm:flex-row justify-between py-10  border-b border-b-gray-300">
        <div className="max-w-[400px]">
          <img
            src={assets.logo}
            alt="_logo "
            className="w-32 sm:w-44 cursor-pointer"
          />
          <p className="my-6 sm:my-8 max-w-2xl  max-sm:text-xs text-gray-500">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum unde
            quaerat eveniet cumque accusamus atque qui error quo enim fugiat?
          </p>
        </div>
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:underline  text-gray-500 transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
      <div className="text-center">
        <p className="md:text-lg text-gray-500/70 py-4 pb-8">
          Copyright 2025 © QuickBlog GreatStack - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
