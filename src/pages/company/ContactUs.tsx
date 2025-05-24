import ContactForm from '@/components/ContactUs';
import Footer from '@/components/Footer';
import Hero2 from '@/components/Hero2';
import NavBar from '@/components/Navbar';

export default function ContactUs() {
  return (
    <main className="min-h-screen bg-[#070c1b]">
      <NavBar />
      <Hero2
        title="Contact Support"
        subtitle="Send a message and get a response Asap"
      />
      <ContactForm />
      <Footer />
    </main>
  );
}
