import React from 'react';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  project: string;
  content: string;
  tags: string[];
  images?: string[];
}

const Blog: React.FC = () => {
  // Sample blog posts - you can add more manually here
  const blogPosts: BlogPost[] = [
    {
      id: '3',
      title: 'Motor Prototype Assembly',
      date: '2025-08-05',
      project: 'Motor Research',
      content: 'So I printed a few prototypes of the cad and settled on one. Then I coiled 24 AWG enamled copper wire around every third stator tooth. I then soldered the copper to jumper cables so I can connect it to a DIY ESC made with arduino. I also glued the magnoets in alternating polarity onto the rotor and got hella glue all over my fingers. This motor better work.',
      tags: [],
      images: [
        require('../assets/stator.jpg'),
        require('../assets/wired stator.jpg'),
        require('../assets/magnets.jpg')
      ]
    },
    {
      id: '2',
      title: 'Stator Body Redesign',
      date: '2025-07-18',
      project: 'Motor Research',
      content: 'Embarrassed to say that this was my work 💀. BUT it\'s okay because I fixed it and it actually fits the size of the neodymium magnets I got since I finally bought a caliper. I also updated the size of the other parts so they fit my metal shaft and bearings since before I got the caliper I was measuring diameter with an old ruler with faded lines. All the parts have arrived EXCEPT for the enameled copper wire which is the most important. I also just realized that I am going to need an ESC or I\'m gonna have to make my own using an Arduino which might get confusing.',
      tags: [],
      images: [
        require('../assets/old stator body.png'),
        require('../assets/old stator body 2.png'),
        require('../assets/new stator body.png')
      ]
    },
    {
      id: '1',
      title: 'Brushless DC Motor??',
      date: '2025-07-15',
      project: 'Motor Research',
      content: 'I want to learn how Brushless DC Motors work and build one myself. I recently bought a 3D printer and thought this would be the perfect first project. I designed and printed a prototype and have ordered neodymium magnets and copper wire for coil.',
      tags: [],
      images: [
        require('../assets/Brushless Motor.png'),
        require('../assets/Brushless Motor Exploded Veiw.png')
      ]
    }
  ];

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Project Blog</h1>
        
        <div className="space-y-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-dark-card border border-dark-border p-6 hover:border-accent/50 transition-colors duration-200 cursor-target">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{post.title}</h2>
                </div>
                <span className="text-gray-500 text-sm bg-dark-bg px-3 py-1">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-4">
                {post.content}
              </p>
              
              {post.images && post.images.length > 0 && (
                <div className="mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {post.images.map((image, index) => {
                      const imageName = image.toString().toLowerCase();
                      let label = '';
                      if (imageName.includes('old stator body')) {
                        label = 'OLD';
                      } else if (imageName.includes('new stator body')) {
                        label = 'NEW';
                      }
                      
                      return (
                        <div key={index} className="bg-dark-bg overflow-hidden relative">
                          <img
                            src={image}
                            alt={`${post.title} - Image ${index + 1}`}
                            className="w-full h-auto object-cover"
                          />
                          {label && (
                            <div className="absolute top-2 left-2 bg-accent text-white px-2 py-1 text-sm font-bold">
                              {label}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-accent/20 text-accent px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
        

      </div>
    </div>
  );
};

export default Blog; 