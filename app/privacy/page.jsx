// app/privacy/page.jsx

export const metadata = {
    title: "Privacy Policy",
    description: "Privacy policy for Naeem Portfolio Guestbook LinkedIn integration",
    robots: {
      index: false, // Don't index privacy pages
      follow: false,
    }
  };
  
  export default function PrivacyPolicy() {
    return (
      <div className="min-h-screen py-12 xl:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center mb-12">
              <h1 className="text-4xl xl:text-5xl font-bold text-white mb-4">
                Privacy Policy
              </h1>
              <p className="text-white/60">
                How we handle your information in our LinkedIn-powered guestbook
              </p>
            </div>
  
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 xl:p-12 space-y-8">
              
              <div className="text-sm text-white/60 mb-8">
                <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
  
              <section>
                <h2 className="text-2xl font-bold text-accent mb-4">Information We Collect</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  When you sign in with LinkedIn to our guestbook, we collect:
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                  <li>Your public LinkedIn profile information (name, profile picture, headline)</li>
                  <li>Your email address</li>
                  <li>Your professional information (company, industry, location)</li>
                </ul>
              </section>
  
              <section>
                <h2 className="text-2xl font-bold text-accent mb-4">How We Use Your Information</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  We use your information to:
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                  <li>Display your professional profile on our guestbook wall</li>
                  <li>Enable you to leave messages and interact with other professionals</li>
                  <li>Maintain the integrity and security of our platform</li>
                </ul>
              </section>
  
              <section>
                <h2 className="text-2xl font-bold text-accent mb-4">Information Sharing</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  We do not:
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                  <li>Sell your personal information</li>
                  <li>Share your information with third parties for marketing purposes</li>
                  <li>Store your LinkedIn login credentials</li>
                </ul>
              </section>
  
              <section>
                <h2 className="text-2xl font-bold text-accent mb-4">Data Security</h2>
                <p className="text-white/80 leading-relaxed">
                  Your information is stored securely and we implement appropriate technical measures to protect your data.
                </p>
              </section>
  
              <section>
                <h2 className="text-2xl font-bold text-accent mb-4">Your Rights</h2>
                <p className="text-white/80 leading-relaxed mb-4">
                  You can:
                </p>
                <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                  <li>Delete your messages at any time</li>
                  <li>Revoke access to your LinkedIn profile</li>
                  <li>Request removal of your data</li>
                </ul>
              </section>
  
              <section>
                <h2 className="text-2xl font-bold text-accent mb-4">Contact</h2>
                <p className="text-white/80 leading-relaxed">
                  For privacy questions, contact: <a href="mailto:naeemahmed7860@gmail.com" className="text-accent hover:text-accent/80 underline">naeemahmed7860@gmail.com</a>
                </p>
              </section>
  
              <section>
                <h2 className="text-2xl font-bold text-accent mb-4">Changes</h2>
                <p className="text-white/80 leading-relaxed">
                  We may update this policy and will notify users of significant changes.
                </p>
              </section>
  
              <div className="border-t border-white/10 pt-8 mt-8">
                <p className="text-white/60 text-center italic">
                  This is a portfolio project demonstrating professional networking capabilities.
                </p>
              </div>
  
            </div>
          </div>
        </div>
      </div>
    );
  }