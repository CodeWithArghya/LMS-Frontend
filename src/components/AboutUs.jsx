export default function AboutUs() {
  return (
    <div className="bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">About Us</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
              alt="Learning Environment" 
              className="rounded-lg shadow-xl"
            />
          </div>
          <div className="text-gray-300">
            <p className="mb-6">
              EduHub is a cutting-edge learning management system designed to make education 
              accessible, engaging, and effective for everyone. We believe in the power of 
              technology to transform education and create meaningful learning experiences.
            </p>
            <p>
              Our platform combines innovative teaching methods with advanced technology 
              to deliver an unmatched learning experience. Whether you're a student, 
              professional, or lifelong learner, EduHub is your partner in growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}