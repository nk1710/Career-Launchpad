
import Image from '../../components/Image';

const FeaturesSection = () => {
  const features = [
    {
      title: 'Entire Curriculum Designed to Meet Industry Requirements',
      description:
        'Our our programs are created in partnership with industry professionals to guarantee that students acquire real-world information and abilities that they can use right away in the cutthroat digital environment of today.',
      imageSrc: '/virtual-classroom-icon.svg', // Replace with actual image path
      color: 'orange-200'
    },
    {
      title: 'Interactive Education via Real-world Projects',
      description:
        'At Career Launchpad, we think that learning comes from doing. Several real-world projects are included in our digital marketing our programs, which help students apply their theoretical knowledge to real-world situations.',
      imageSrc: '/support2.svg', // Replace with actual image path
      color: 'pink-200'
    },
    {
      title: 'Skilled educators possessing industry knowledge',
      description:
        'Our educators are seasoned experts with years of experience working in the field of digital marketing. They provide students with a comprehensive learning experience by bringing their practical expertise and industry insights into the classroom. Students benefit from their mentoring by being kept up to speed on the newest trends and best practices in digital marketing.',
      imageSrc: '/briefcase.svg', // Replace with actual image path
      color: 'gray-400',
    },
    {
      title: 'Adaptable Education Choices to Fit Your Schedule',
      description:
        'Recognizing that every student has different needs, Career Launchpad provides a range of flexible learning alternatives. We provide a plan that works with your schedule, whether you prefer self-paced study, weekend batching, or online instruction. This flexibility makes it possible for you to continue your study without sacrificing your other obligations.',
      imageSrc: '/projects-icon.svg', // Replace with actual image path
      color: 'blue-300',
    },
    {
      title: 'Committed Placement Support for Professional Achievement',
      description:
        'The mission of Career Launchpad is to assist students in beginning prosperous careers in digital marketing. Our committed placement team links students with leading businesses in the field and offers individualized assistance with everything from interview prep to resume writing. Students who get our placement aid are more likely to graduate and land attractive jobs.',
      imageSrc: '/job-assistance-icon.svg', // Replace with actual image path
      color: 'red-200',
    },
    {
      title: 'Reasonably priced and offering a good return on investment',
      description:
        `We think that everyone should have access to high-quality education. To make sure you get the most out of your money, Career Launchpad provides digital marketing our programs at affordable costs. Gaining these credentials and abilities will put you in the running for well-paying jobs, so it's well worth the investment in your future`,
      imageSrc: '/certification-icon.svg', // Replace with actual image path
      color: 'green-200',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-center text-black mb-8">
        Why is Career Launchpad the Best Institute for Digital Marketing?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-transform duration-300 transform hover:scale-105 hover:bg-${feature.color}`}
          >
            <div className="w-16 h-16 mb-4">
              <Image
                src={feature.imageSrc}
                alt={feature.title}
                width={64}
                height={64}
                className='mx-auto'
              />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;