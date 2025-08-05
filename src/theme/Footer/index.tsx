import React from "react";
// import a from "@docusaurus/a";
import { useColorMode } from "@docusaurus/theme-common";



const Footer = () => {
  const { colorMode } = useColorMode();

  return (
    <footer
      className="relative z-10 overflow-hidden py-5 sm:pt-16 lg:pt-10 "
      style={{
        backgroundColor: "#F9FAFB"
      }}
    >
      <section className="py-10 bg-gray-50 sm:pt-16 lg:pt-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-5 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-8">
            {/* Logo and description with socials */}
            <div className="col-span-2 space-y-3.5 md:col-span-3 lg:col-span-2 lg:pr-8">
              <img
                className="w-auto h-9"
                src="/img/logo.png"
                alt="Logo"
              />
              <p className="leading-relaxed text-gray-600 mt-7">
               RECODEHIVE helps you to learn and master the skills on data, and encourage you to code on open source.
              </p>

              <ul className="flex items-center space-x-12 mt-9">
                {/*Twitter */}
                <li>
                  <a
                    href="https://x.com/sanjay_kv_"
                    target="_blank"
                    title="Twitter"
                    className="flex items-center justify-center transition-all duration-200 bg-green-200 rounded-full w-7 h-7 hover:bg-blue-200 focus:bg-blue-200"
                    aria-label="Twitter"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
</svg>
                  </a>
                </li>

                {/* LinkedIn */}
                <li>
                  <a
                    href="https://www.linkedin.com/in/sanjay-k-v/"
                     target="_blank"
                    title="LinkedIn"
                    className="flex items-center justify-center text-white transition-all duration-200 bg-green-200 rounded-full w-7 h-7 hover:bg-blue-200 focus:bg-blue-200"
                    aria-label="LinkedIn"
                  >
                   <svg
  className="w-4 h-4"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor"
>
  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.761 0 5-2.24 5-5v-14c0-2.76-2.239-5-5-5zm-11.75 20h-3v-11h3v11zm-1.5-12.27c-.966 0-1.75-.79-1.75-1.76s.784-1.76 1.75-1.76 1.75.79 1.75 1.76-.784 1.76-1.75 1.76zm13.25 12.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-11h2.89v1.5h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6v6.46z"/>
</svg>

                  </a>
                </li>

                {/* Instagram */}
                <li>
                  <a
                    href="https://www.instagram.com/nomad_brains/"
                     target="_blank"
                    title="Instagram"
                    className="flex items-center justify-center text-white transition-all duration-200 bg-green-200 rounded-full w-7 h-7 hover:bg-blue-200 focus:bg-blue-200"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5"
                         xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24"
                         fill="currentColor"
                    >
                      <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
                      <circle cx="16.806" cy="7.207" r="1.078"></circle>
                      <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path>
                    </svg>
                  </a>
                </li>

                {/* Github */}
                <li>
                  <a
                    href="https://github.com/recodehive"
                     target="_blank"
                    
                    title="GitHub"
                    className="flex items-center justify-center text-white transition-all duration-200 bg-green-200 rounded-full w-7 h-7 hover:bg-blue-200 focus:bg-blue-200"
                    aria-label="GitHub"
                    
                  >
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                      ></path>
                    </svg>
                  </a>
                </li>
              </ul>

                          {/* Newsletter */}
            <div className="flex flex-col border-t-2">
              <p className="text-sm pt-5  font-semibold tracking-widest text-gray-400 uppercase">
                Subscribe to newsletter
              </p>
              <form action="#" method="POST" className="">
                <div className="">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    className="block w-full p-2 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                  />
                </div>
                <button
                  type="submit"
                  onClick={(e)=>{
                    e.preventDefault()
                    alert("Subscribed! (Integrate with Substack API)")
                  }}
                  className="inline-flex items-center justify-center px-6 py-2 mt-3 font-semibold bg-green-300 rounded-full  hover:bg-blue-200 focus:bg-blue-200"
                >
                  Subscribe
                </button>
              </form>
            </div>
          
            </div>


            {/* company links */}
            <div>
              <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
                 Company
              </p>
             
                <div className="flex flex-col">
                  <a
                    href="/community"
                    className=" text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                   About Us
                  </a>
                
                  <a
                   href="/contact-us"
                    className="mt-1 text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                   Contact Us
                  </a>
                
                  <a
                    href="/careers"
                    className="mt-1 text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    Careers
                  </a>
                
                  <a
                   href="/our-sponsors/"
                    className="mt-1 text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                   Sponsor US
                  </a>
                  </div>
               
            </div>

            {/*  Resources links */}
            <div>
              <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
                 Resources
              </p>
             
                <div className="flex flex-col">
                  <a
                    href="/courses/"
                    className=" text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                   Tutorials
                  </a>
                
                  <a
                    href="/badges/github-badges/"
                    className="mt-1 text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    Learn GitHub
                  </a>
                
                  <a
                    href="/showcase"
                    className="mt-1 text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    Explore Projects
                  </a>
                
               
                  <a
                    href="/blogs"
                    className="mt-1 text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                   All Blogs
                  </a>
                  </div>
               
            </div>

            {/* support - links */}
            <div>
              <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
                 Support
              </p>
             
                <div className="flex flex-col">
                  <a
                    href="/community"
                    className=" text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                  Help Center
                  </a>
                
                  <a
                   href="https://github.com/recodehive/recode-website/issues"
                    className="mt-1 text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                   Report a Bug
                  </a>
                
                  <a
                    href="#"
                    className="mt-1 text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                     Feature Request
                  </a>
                
                  <a
                   href="#"
                    className="mt-1 text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    Accessibility Support
                  </a>
                  </div>
               
            </div>

            {/* latest blog */}
            <div>
              <p className="text-sm font-semibold  text-gray-400 uppercase">
                 Latest blog
              </p>
             
                <div className="flex flex-col">
                  <a
                    href="/blog/google-deepmind"
                    className=" text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                   Explore Google DeepMind's AI
                  </a>
                
                  <a
                    href="/blog/google-backlinks"
                    className="mt-1 text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                   Google Backlinks: A Comprehensive Guide
                  </a>
                
                  </div>
               
            </div>
</div>

          {/* Footer bottom */}
          <hr className="mt-16 mb-10 border-gray-200" />
          <div className="flex flex-row justify-between">

            <div className="flex flex-row space-x-4">
              <a href="/privacy-policy/" >
              Privacy policy
              </a>

              <a href="/code-of-conduct/" >
              Code of conduct
              </a>

              <a href="/terms-service/" >
               Terms of service
              </a>

              <a href="/License/" >
              License
              </a>
            </div>
            <p className="text-black ">Developed by &nbsp; <a
                    target="_blank"
                    href="https://github.com/sanjay-kv"
                    className="font-semibold"
                  >
                    Sanjay Viswanathan
                  </a></p>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;