
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CtaSection = () => {
  return (
    <section className="py-20 gradient-bg">
      <div className="container px-4 md:px-8">
        <AnimatedSection delay={0.1}>
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-trading-blue/30 to-trading-purple/30 z-0"></div>
            <div className="absolute inset-0 backdrop-blur-sm bg-trading-dark-blue/50 z-10"></div>
            
            <div className="relative z-20 p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to transform your <span className="text-gradient">trading</span>?
              </h2>
              <p className="text-trading-gray-light max-w-xl mx-auto mb-8">
                Join thousands of traders who are already leveraging our AI-powered platform
                to make smarter trading decisions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-trading-blue to-trading-cyan hover:opacity-90 text-white">
                  Get Started Free <ArrowRight size={16} className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-trading-gray hover:bg-trading-gray-dark/20">
                  Book a Demo
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
