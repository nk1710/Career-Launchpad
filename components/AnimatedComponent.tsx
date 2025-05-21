import React, { ReactNode } from 'react';
// import { useInView } from 'react-intersection-observer';

interface AnimatedComponentProps {
  children: ReactNode; // Define the type of children prop
}

const AnimatedComponent: React.FC<AnimatedComponentProps> = ({ children }) => {
  // const { ref, inView } = useInView({
  //   triggerOnce: true, // Trigger animation only once
  //   threshold: 0.1, // Trigger when 10% of the component is visible
  // });

  // const variants = {
  //   hidden: { opacity: 0, y: 100 }, // Start with opacity 0 and move it up from y: 100
  //   visible: { opacity: 1, y: 0 }, // End with opacity 1 and y: 0 (its original position)
  // };

  return (
    <>
    {/* // <motion.div */}
    {/* //   ref={ref}
    //   initial="hidden"
    //   animate={inView ? "visible" : "hidden"}
    //   variants={variants}
    //   transition={{ duration: 0.8, ease: "easeOut" }} // Adjust timing as needed
    // > */}
      {children}
      </>
    // </motion.div>
  );
};

export default AnimatedComponent;
