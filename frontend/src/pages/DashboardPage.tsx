import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, AlertCircle, FileCheck, LogOut, Menu, X } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import logo from '../assets/verifiedcc-logo.png';

export default function DashboardPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const stats = [
    { label: 'Total Verifications', value: '1,234', icon: FileCheck, color: 'blue' },
    { label: 'Pending', value: '12', icon: Clock, color: 'amber' },
    { label: 'Completed', value: '1,200', icon: CheckCircle, color: 'green' },
    { label: 'Failed', value: '22', icon: AlertCircle, color: 'red' },
  ];

  const recentVerifications = [
    { id: 1, name: 'John Doe', status: 'completed', date: '2025-10-05', type: 'Identity' },
    { id: 2, name: 'Jane Smith', status: 'pending', date: '2025-10-05', type: 'Education' },
    { id: 3, name: 'Bob Johnson', status: 'completed', date: '2025-10-04', type: 'Employment' },
    { id: 4, name: 'Alice Brown', status: 'completed', date: '2025-10-04', type: 'Identity' },
    { id: 5, name: 'Charlie Wilson', status: 'failed', date: '2025-10-03', type: 'Education' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="VerifiedCC Logo" className="h-12 w-12" />
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                VerifiedCC
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Dashboard</a>
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Verifications</a>
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Reports</a>
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Settings</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-semibold">
                  JD
                </div>
              </div>
              <Link to="/">
                <Button variant="outline" size="sm">
                  <div className="flex items-center space-x-2">
                    <LogOut size={16} />
                    <span>Logout</span>
                  </div>
                </Button>
              </Link>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded">Dashboard</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded">Verifications</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded">Reports</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded">Settings</a>
              <Link to="/" className="block px-4 py-2">
                <Button variant="outline" size="sm" className="w-full">Logout</Button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your verifications.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                  <stat.icon className={`text-${stat.color}-600`} size={24} />
                </div>
                <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Verifications</h2>
            <Button size="sm">New Verification</Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentVerifications.map((verification) => (
                  <tr key={verification.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 font-medium text-gray-900">{verification.name}</td>
                    <td className="py-4 px-4 text-gray-600">{verification.type}</td>
                    <td className="py-4 px-4 text-gray-600">{verification.date}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        verification.status === 'completed' ? 'bg-green-100 text-green-700' :
                        verification.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {verification.status.charAt(0).toUpperCase() + verification.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-green-600 hover:text-green-700 font-medium">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card
            icon={<CheckCircle size={32} />}
            title="Quick Verify"
            description="Start a new verification process in seconds"
          />
          <Card
            icon={<FileCheck size={32} />}
            title="Bulk Upload"
            description="Upload and verify multiple credentials at once"
          />
          <Card
            icon={<AlertCircle size={32} />}
            title="Get Support"
            description="Our team is here to help you 24/7"
          />
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <img src={logo} alt="VerifiedCC Logo" className="h-8 w-8" />
              <span className="text-lg font-bold text-gray-800">VerifiedCC</span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-600">
              <a href="#" className="hover:text-green-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-green-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-green-600 transition-colors">Contact Support</a>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500 mt-4">
            &copy; 2025 VerifiedCC. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
