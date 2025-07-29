import React from "react";
import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-24 bg-transparent backdrop-blur-sm relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-3xl p-8 md:p-12 text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Let's Connect
          </h2>
          <p className="text-center text-gray-200 mb-10">
            Have a question, idea, or just want to say hello? Drop me a message.
          </p>

          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Form submitted!");
            }}
          >
            <div className="flex flex-col">
              <label className="text-sm text-gray-300 mb-1">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-300 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>

            <div className="md:col-span-2 flex flex-col">
              <label className="text-sm text-gray-300 mb-1">Message</label>
              <textarea
                rows={5}
                placeholder="Type your message..."
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
              />
            </div>

            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white font-semibold shadow-md backdrop-blur-md transition-all duration-300 border border-white/30"
              >
                Send Message
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
