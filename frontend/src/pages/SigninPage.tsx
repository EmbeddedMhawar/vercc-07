import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, PlayCircle, UserPlus } from 'lucide-react';
import Button from '../components/Button';
import InteractiveGradientBackground from '../components/InteractiveGradientBackground';

export default function SigninPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [projectType, setProjectType] = useState('');
  const [expectedEmissions, setExpectedEmissions] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const handleDemoLogin = () => {
    setEmail('demo@verifiedcc.com');
    setPassword('verifiedcc');
    navigate('/dashboard');
  };

  return (
    <>
      <InteractiveGradientBackground />
      <main className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md mx-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 shadow-2xl">
            <div className="text-center mb-6">
              <img src="/verifiedcc-logo.png" alt="VerifiedCC Logo" className="h-16 w-auto mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-deep-ocean">
                {isSignUp ? 'Become Our Partner' : 'Become Our Partner'}
              </h3>
              <p className="text-gray-600 mt-2">
                {isSignUp ? 'Partner Registration' : 'Access Guardian Verifiable Credentials Portal'}
              </p>
            </div>

            {!isSignUp ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-deep-ocean mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors bg-white/50"
                    placeholder="partner@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-deep-ocean mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors bg-white/50"
                    placeholder="••••••••"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Demo password: <code className="bg-gray-100 px-1 rounded">verifiedcc</code>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-oasis-green to-desert-sand text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <LogIn className="w-5 h-5 inline mr-2" />
                  Access Dashboard
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company_name" className="block text-sm font-medium text-deep-ocean mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="company_name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors text-sm bg-white/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact_person" className="block text-sm font-medium text-deep-ocean mb-1">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      id="contact_person"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors text-sm bg-white/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="signup_email" className="block text-sm font-medium text-deep-ocean mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="signup_email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors text-sm bg-white/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-deep-ocean mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors text-sm bg-white/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-deep-ocean mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors text-sm bg-white/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="project_type" className="block text-sm font-medium text-deep-ocean mb-1">
                      Project Type
                    </label>
                    <select
                      id="project_type"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors text-sm bg-white/50"
                    >
                      <option value="">Select type</option>
                      <option value="Solar">Solar</option>
                      <option value="Wind">Wind</option>
                      <option value="Hydro">Hydro</option>
                      <option value="Biomass">Biomass</option>
                      <option value="Geothermal">Geothermal</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="expected_emission_reductions" className="block text-sm font-medium text-deep-ocean mb-1">
                    Expected Emission Reductions (tCO2/year)
                  </label>
                  <input
                    type="number"
                    id="expected_emission_reductions"
                    value={expectedEmissions}
                    onChange={(e) => setExpectedEmissions(e.target.value)}
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors text-sm bg-white/50"
                  />
                </div>

                <div>
                  <label htmlFor="project_description" className="block text-sm font-medium text-deep-ocean mb-1">
                    Project Description
                  </label>
                  <textarea
                    id="project_description"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors text-sm bg-white/50"
                    placeholder="Brief description of your renewable energy project..."
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-oasis-green hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-sm"
                  >
                    <UserPlus className="w-4 h-4 inline mr-2" />
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {!isSignUp && (
              <div className="mt-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white/80 text-gray-500">Or</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full mt-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <PlayCircle className="w-5 h-5 inline mr-2" />
                  Try Demo Account
                </button>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isSignUp ? 'Already have an account?' : 'New partner?'}{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-oasis-green hover:text-green-700 font-medium underline"
                >
                  {isSignUp ? 'Sign in here' : 'Sign up for partnership'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
