// components/SEO.jsx - Create this component
import Head from 'next/head';

const SEO = ({
  title = "Mohammed Naeem Ahmed - Portfolio",
  description = "First-class Computer & Data Science graduate specializing in AI/ML, full-stack development, and creating impactful digital solutions.",
  image = "/og-image.jpg", // You'll need to create this
  url = "https://naeemcodes.com",
  type = "website",
  keywords = "Mohammed Naeem Ahmed, Portfolio, Full Stack Developer, AI/ML Engineer, Computer Science, Birmingham City University, React, Next.js, Python, TensorFlow",
  author = "Mohammed Naeem Ahmed"
}) => {
  const fullTitle = title.includes("Mohammed Naeem Ahmed") ? title : `${title} | Mohammed Naeem Ahmed`;
  const fullUrl = url.startsWith('http') ? url : `https://naeemcodes.com${url}`;
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`https://naeemcodes.com${image}`} />
      <meta property="og:site_name" content="Mohammed Naeem Ahmed Portfolio" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`https://naeemcodes.com${image}`} />
      <meta property="twitter:creator" content="@your_twitter_handle" />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="theme-color" content="#00ff99" />
      <meta name="msapplication-TileColor" content="#1a202c" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      {/* Structured Data - JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Mohammed Naeem Ahmed",
            "alternateName": "Naeem Ahmed",
            "url": "https://naeemcodes.com",
            "image": "https://naeemcodes.com/IMG_4418 copy.PNG",
            "sameAs": [
              "https://github.com/naeem0512",
              "https://www.linkedin.com/in/mohammed-ahmed-0592731a9/",
              "mailto:naeemahmed7860@gmail.com"
            ],
            "jobTitle": "Computer & Data Science Graduate",
            "worksFor": {
              "@type": "Organization",
              "name": "Birmingham City University"
            },
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "Birmingham City University"
            },
            "knowsAbout": [
              "Full Stack Development",
              "Machine Learning",
              "Artificial Intelligence",
              "React",
              "Next.js",
              "Python",
              "TensorFlow"
            ],
            "description": description
          })
        }}
      />
    </Head>
  );
};

export default SEO;