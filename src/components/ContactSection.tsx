import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, Handshake, Star, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Import Input component
import { useForm } from '@formspree/react'; // ADDED: Import useForm from Formspree

// Interface for the new info cards
interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Reusable InfoCard component
const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description }) => (
  <motion.div
    className="glass p-6 rounded-2xl flex items-start space-x-4 h-full border border-primary/30"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    viewport={{ once: true }}
  >
    <div className="text-primary flex-shrink-0 mt-1">
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-foreground-muted text-sm">{description}</p>
    </div>
  </motion.div>
);

const ContactSection = () => {
  // UPDATED: Replaced placeholder with your Formspree ID
  const [state, handleSubmit] = useForm("myzppyar");
  const [localError, setLocalError] = useState(''); // For non-Formspree specific errors
  const [resetForm, setResetForm] = useState(false); // To trigger form reset after success

  // Effect to handle Formspree success/error and reset form
  React.useEffect(() => {
    if (state.succeeded) {
      setLocalError('');
      setResetForm(true); // Trigger form reset
      setTimeout(() => {
        setResetForm(false); // Reset trigger
      }, 100); // Short delay to allow reset
    }
    // Correctly check for Formspree errors
    // Formspree errors object might have a 'form' property for general errors
    // or properties for specific fields (e.g., state.errors.email.message)
    if (state.errors && state.errors.form) { // Check if a general form error exists
      setLocalError(state.errors.form.message || 'Failed to send message. Please try again.');
    } else if (state.errors) { // If there are other errors (e.g., field-specific)
      // You might iterate through state.errors if it's an array of field errors
      // For simplicity, we'll just show a generic error if no specific form error message
      setLocalError('Failed to send message due to validation errors. Please check your inputs.');
    } else {
      setLocalError(''); // Clear local error if no Formspree error
    }
  }, [state.succeeded, state.errors]);


  const infoCardsData = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Award-Winning Service",
      description: "Recognized globally for excellence in travel planning and customer satisfaction."
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: "Trusted Partnerships",
      description: "Collaborating with top-tier local guides and reputable vendors worldwide."
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Client Recognition",
      description: "Over 95% positive feedback from thousands of satisfied adventurers."
    }
  ];

  return (
    <section className="py-16 px-4 md:px-8 lg:px-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-background-lighter-still/80 -z-10"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center text-dark-text">
          Let's <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Connect</span>
        </h2>
        <p className="text-center text-dark-text/80 mb-10 max-w-3xl mx-auto">
          Have questions, ideas, or just want to say hello? Drop us a message or learn more about our commitment.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Left Side: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-12 text-foreground flex flex-col justify-between aspect-square md:aspect-auto lg:h-full
                       border-2 border-primary rounded-3xl glow-primary"
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-foreground">Send Us a Message</h3>
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col">
                <label htmlFor="name" className="text-sm text-foreground-muted mb-1">Your Name</label>
                <Input
                  type="text"
                  id="name"
                  name="name" // IMPORTANT: name attribute for Formspree
                  placeholder="Enter your name"
                  className="bg-background border border-input rounded-xl px-4 py-3 text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={resetForm ? '' : undefined} // Reset input value
                  onChange={resetForm ? () => {} : undefined} // Prevent change if resetting
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm text-foreground-muted mb-1">Email</label>
                <Input
                  type="email"
                  id="email"
                  name="email" // IMPORTANT: name attribute for Formspree
                  placeholder="Enter your email"
                  className="bg-background border border-input rounded-xl px-4 py-3 text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={resetForm ? '' : undefined} // Reset input value
                  onChange={resetForm ? () => {} : undefined} // Prevent change if resetting
                />
              </div>

              <div className="md:col-span-2 flex flex-col">
                <label htmlFor="message" className="text-sm text-foreground-muted mb-1">Message</label>
                <textarea
                  id="message"
                  name="message" // IMPORTANT: name attribute for Formspree
                  rows={5}
                  placeholder="Type your message..."
                  className="bg-background border border-input rounded-xl px-4 py-3 text-foreground placeholder-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  value={resetForm ? '' : undefined} // Reset textarea value
                  onChange={resetForm ? () => {} : undefined} // Prevent change if resetting
                />
              </div>

              <div className="md:col-span-2 flex justify-center mt-auto">
                <Button
                  type="submit"
                  size="lg"
                  variant="default"
                  className="w-full md:w-auto px-8 py-3 rounded-full transition-all duration-300"
                  disabled={state.submitting}
                >
                  {state.submitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>

            {/* Form Submission Status Message */}
            {state.succeeded && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-primary mt-4 font-semibold"
              >
                Message sent successfully!
              </motion.p>
            )}
            {/* UPDATED: Check for state.errors object directly and access its 'form.message' or provide generic */}
            {(state.errors && state.errors.form) || localError ? (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-destructive mt-4 font-semibold"
              >
                {localError || (state.errors && state.errors.form ? state.errors.form.message : 'An unknown error occurred.')}
              </motion.p>
            ) : null}
          </motion.div>

          {/* Right Side: Info Cards */}
          <div className="space-y-6 flex flex-col justify-center">
            {infoCardsData.map((card, index) => (
              <InfoCard key={index} {...card} />
            ))}
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default ContactSection;