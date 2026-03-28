import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Hero from '../components/home/Hero.jsx'
import Stats from '../components/home/Stats.jsx'
import WhyChooseUs from '../components/home/WhyChooseUs.jsx'
import HowItWorks from '../components/home/HowItWorks.jsx'
import Pricing from '../components/home/Pricing.jsx'
import Testimonials from '../components/home/Testimonials.jsx'
import Faqs from '../components/home/Faqs.jsx'
import Blogs from '../components/home/Blogs.jsx'
import FinalCta from '../components/home/FinalCta.jsx'
import Partners from '../components/home/Partners.jsx'
import ServiceCarousel from '../components/home/ServiceCarousel.jsx'

export default function Home() {
  return (
    <div className="space-y-20 bg-background theme-transition-surface">
      <Hero />
      <Stats />
      <ServiceCarousel />
      <WhyChooseUs />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <Faqs />
      <Blogs />
      <FinalCta />
      <Partners />
    </div>
  )
}


// import { motion } from 'framer-motion'
// import { Link } from 'react-router-dom'

// // Import all your existing sections
// import Hero from '../components/home/Hero.jsx'
// import Stats from '../components/home/Stats.jsx'
// import WhyChooseUs from '../components/home/WhyChooseUs.jsx'
// import HowItWorks from '../components/home/HowItWorks.jsx'
// import Pricing from '../components/home/Pricing.jsx'
// import Testimonials from '../components/home/Testimonials.jsx'
// import Faqs from '../components/home/Faqs.jsx'
// import Blogs from '../components/home/Blogs.jsx'
// import FinalCta from '../components/home/FinalCta.jsx'
// import Partners from '../components/home/Partners.jsx'

// // IMPORT YOUR NEW CAROUSEL HERE
// import ServiceCarousel from '../components/home/ServiceCarousel.jsx'

// export default function Home() {
//   return (
//     <div className="space-y-20 bg-background theme-transition-surface">
//       {/* 1. Hero & Stats stay at the top */}
//       <Hero />
//       <Stats />

//       {/* 2. This is the new Carousel replacing the old grid */}
//       <ServiceCarousel />

//       {/* 3. Everything else stays below */}
//       <WhyChooseUs />
//       <HowItWorks />
//       <Pricing />
//       <Testimonials />
//       <Faqs />
//       <Blogs />
//       <FinalCta />
//       <Partners />
//     </div>
//   )
// }