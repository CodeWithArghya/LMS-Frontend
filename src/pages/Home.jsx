import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs/AboutUs';
import OurMission from '../components/OurMission/OurMission';
import Testimonials from '../components/Testimonials/Testimonials';

export default function Home() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Hero />
      <div id="about" className="my-24">
        <AboutUs />
      </div>
      <div id="goals" className="my-24">
        <OurMission />
      </div>
      <div id="feedback" className="my-24">
        <Testimonials />
      </div>
    </div>
  );
}