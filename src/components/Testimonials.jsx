export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Developer",
      content: "EduHub transformed my career path. The courses are comprehensive and the learning experience is exceptional.",
      image: "/testimonial1.jpg"
    },
    {
      name: "Michael Chen",
      role: "Student",
      content: "The platform is intuitive and the content is engaging. I've learned more here than in traditional settings.",
      image: "/testimonial2.jpg"
    },
    {
      name: "Emily Davis",
      role: "Teacher",
      content: "As an educator, I'm impressed by the quality of content and the teaching methodology used on EduHub.",
      image: "/testimonial3.jpg"
    }
  ];

  return (
    <div className="bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-600 rounded-full mr-4"></div>
                <div>
                  <h3 className="text-white font-semibold">{testimonial.name}</h3>
                  <p className="text-purple-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}