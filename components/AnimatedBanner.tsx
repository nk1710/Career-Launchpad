// components/AnimatedBanner.tsx
import { motion } from 'framer-motion';

const courses = [
  'Full Stack Development',
  'Web Development (MERN)',
  'APP Development',
  'Data Structure and Algorithms',
  'MERN + DSA',
  'APP + DSA',
  'MERN + App',
  'MERN + App + DSA',
  'Digital Marketing Basic',
  'Digital Marketing Advanced',
];

const AnimatedBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gray-200 py-2">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['100%', '-100%'] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {courses.map((course, index) => (
          <div key={index} className="mx-4 text-xl font-semibold text-gray-700">
            {course}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AnimatedBanner;
