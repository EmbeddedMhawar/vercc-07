import { useState, useEffect } from 'react';
import { Leaf, Zap, Battery, Thermometer, Sun, Activity, FlaskConical, Send, Play, StopCircle, Info, FileText, X, Wifi } from 'lucide-react';

export default function DashboardPage() {
  const [totalCredits, setTotalCredits] = useState(0.000);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');
  const [isConnected, setIsConnected] = useState(false);
  const [streamStatus, setStreamStatus] = useState('Stopped');
  const [isStreamActive, setIsStreamActive] = useState(false);
  const [realDevicesCount, setRealDevicesCount] = useState(0);
  const [lastDataTime, setLastDataTime] = useState('Never');
  const [lastUpdate, setLastUpdate] = useState('Never');
  const [devices, setDevices] = useState({});
  
  // New state for the workflow
  const [formFilled, setFormFilled] = useState(false);
  const [sensorConnected, setSensorConnected] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showSensorModal, setShowSensorModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [documentData, setDocumentData] = useState<any>(null);
  const [formData, setFormData] = useState({
    deviceId: '',
    location: '',
    energySource: 'Solar Panel',
    capacity: '',
    installationDate: '',
    certification: ''
  });

  useEffect(() => {
    // Initialize WebSocket connection (mock for now)
    setConnectionStatus('Connected');
    setIsConnected(true);
    
    // Check mock status on load
    checkMockStatus();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showSettingsDropdown) {
        const target = event.target as Element;
        if (!target.closest('.settings-dropdown')) {
          setShowSettingsDropdown(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSettingsDropdown]);

  const sendMockData = async () => {
    try {
      // Mock API call
      console.log('Sending mock data...');
      showNotification('Test data sent successfully! Check your dashboard for updates.', 'success');
    } catch (error) {
      showNotification('Connection error: ' + (error instanceof Error ? error.message : 'Unknown error'), 'error');
    }
  };

  const startMockStream = async () => {
    try {
      console.log('Starting mock stream...');
      setIsStreamActive(true);
      setStreamStatus('Active');
      showNotification('Live data stream started! Generating realistic solar data every 1 second.', 'success');
    } catch (error) {
      showNotification('Connection error: ' + (error instanceof Error ? error.message : 'Unknown error'), 'error');
    }
  };

  const stopMockStream = async () => {
    try {
      console.log('Stopping mock stream...');
      setIsStreamActive(false);
      setStreamStatus('Stopped');
      showNotification('Data stream stopped successfully.', 'info');
    } catch (error) {
      showNotification('Connection error: ' + (error instanceof Error ? error.message : 'Unknown error'), 'error');
    }
  };

  const checkMockStatus = () => {
    // Mock status check
    console.log('Checking mock status...');
  };

  const showNotification = (message: string, type: string = 'info') => {
    // Simple alert for now - can be enhanced with a proper notification system
    console.log(`${type}: ${message}`);
    alert(message);
  };

  const handleDocumentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDocumentData(formData);
    setFormFilled(true);
    setShowDocumentModal(false);
    showNotification('Document submitted successfully!', 'success');
  };

  const handleSensorConnect = () => {
    setSensorConnected(true);
    setIsConnected(true);
    setIsStreamActive(true);
    // Simulate some initial credits
    setTotalCredits(0.001234);
    setShowSensorModal(false);
    showNotification('Sensor connected successfully! Data streaming started.', 'success');
  };

  const handleIssueCredit = () => {
    if (totalCredits > 0) {
      showNotification(`Issued ${totalCredits.toFixed(6)} carbon credits successfully!`, 'success');
      setTotalCredits(0);
      // Reset workflow
      setFormFilled(false);
      setSensorConnected(false);
      setIsConnected(false);
      setIsStreamActive(false);
      setDocumentData(null);
      setFormData({
        deviceId: '',
        location: '',
        energySource: 'Solar Panel',
        capacity: '',
        installationDate: '',
        certification: ''
      });
    }
  };

  const handleDemoFillDocument = () => {
    setFormData({
      deviceId: 'ESP32-SOLAR-001',
      location: 'Morocco, Casablanca',
      energySource: 'Solar Panel',
      capacity: '1.5',
      installationDate: '2024-01-15',
      certification: 'IEC 61215, IEC 61730'
    });
  };

  const handleDemoConnectSensor = () => {
    handleSensorConnect();
  };

  const handleLogout = () => {
    try {
      // Show notification first
      showNotification('Logging out...', 'info');
      
      // Clear all state
      setFormFilled(false);
      setSensorConnected(false);
      setIsConnected(false);
      setIsStreamActive(false);
      setTotalCredits(0);
      setDocumentData(null);
      setFormData({
        deviceId: '',
        location: '',
        energySource: 'Solar Panel',
        capacity: '',
        installationDate: '',
        certification: ''
      });
      
      // Close settings dropdown
      setShowSettingsDropdown(false);
      
      // Clear any stored auth data (if any)
      localStorage.clear();
      sessionStorage.clear();
      
      // Navigate back to signin page - try multiple methods
      setTimeout(() => {
        try {
          // Try React Router navigation first (if available)
          if (window.history && window.history.pushState) {
            window.history.pushState(null, '', '/signin');
            window.location.reload();
          } else {
            // Fallback to direct navigation
            window.location.href = '/signin';
          }
        } catch (error) {
          // Final fallback - go to root and let routing handle it
          console.log('Navigation error, redirecting to root:', error);
          window.location.href = '/';
        }
      }, 500);
      
    } catch (error) {
      console.error('Logout error:', error);
      showNotification('Logout failed, please try again', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-deep-ocean font-['Inter',sans-serif]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src="/verifiedcc-logo.png" alt="VerifiedCC Logo" className="h-12 w-auto" />
              <div>
                <h1 className="text-2xl font-bold text-deep-ocean">VerifiedCC Dashboard</h1>
                <p className="text-sm text-gray-600">ESP32 Real-time Monitoring Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                isConnected 
                  ? 'bg-green-100 text-oasis-green' 
                  : 'bg-red-100 text-red-600'
              }`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  isConnected ? 'bg-oasis-green animate-pulse' : 'bg-red-500'
                }`}></div>
                <span>{connectionStatus}</span>
              </div>
              
              {/* Settings Dropdown */}
              <div className="relative settings-dropdown">
                {/* Settings Button */}
                <button 
                  onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
                  className="group relative p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:shadow-md border border-gray-200 bg-white/50 backdrop-blur-sm"
                  title="Settings"
                >
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>

                {/* Settings Dropdown Menu */}
                {showSettingsDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                      <h3 className="font-semibold text-deep-ocean">Settings & Privacy</h3>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {/* Notifications */}
                      <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 15h8v-2H4v2zM4 11h10V9H4v2z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">Notifications</div>
                            <div className="text-sm text-gray-500">Manage your notification preferences</div>
                          </div>
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                      {/* Data Settings */}
                      <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">Data Settings</div>
                            <div className="text-sm text-gray-500">Configure data collection and retention</div>
                          </div>
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                      {/* Appearance */}
                      <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">Display & Accessibility</div>
                            <div className="text-sm text-gray-500">Dark mode, text size, and more</div>
                          </div>
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-gray-100 my-2"></div>

                      {/* Account Info */}
                      <div className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-oasis-green rounded-full flex items-center justify-center mr-3">
                            <span className="text-white text-sm font-bold">U</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">Demo User</div>
                            <div className="text-sm text-gray-500">demo@verifiedcc.com</div>
                          </div>
                        </div>
                      </div>

                      {/* Logout */}
                      <div 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log('Logout clicked');
                          handleLogout();
                        }}
                        className="px-4 py-3 hover:bg-red-50 cursor-pointer transition-colors border-t border-gray-100"
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-red-600">Log Out</div>
                            <div className="text-sm text-red-500">Sign out of your account</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="bg-gray-50">
        <div className="container mx-auto px-6 py-8">
          {/* Carbon Credits Hero Section */}
          <div className={`relative rounded-2xl p-8 md:p-12 text-white text-center shadow-2xl mb-8 ${
            isConnected && isStreamActive 
              ? 'bg-gradient-to-br from-oasis-green via-oasis-green/80 to-desert-sand'
              : 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600'
          }`}>
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                <Leaf className={`w-12 h-12 mr-4 ${
                  isStreamActive ? 'animate-bounce' : ''
                }`} />
                <h2 className="text-4xl md:text-6xl font-extrabold">{totalCredits.toFixed(6)} ≈ {(totalCredits * 1500).toFixed(0)} $</h2>
              </div>
              <p className="text-xl md:text-2xl font-medium opacity-90">Total Carbon Credits Generated (tCO2)</p>
              <p className="text-sm opacity-75 mt-2">
                {totalCredits > 0 ? `${totalCredits.toFixed(6)} carbon credits available for issuance` : 'No carbon credits available yet'}
              </p>
              
              {/* Carbon Credit Calculation Display */}
              <div className="mt-6 bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-lg font-semibold">0.0001 tCO2 ≈ 150$</p>
                <p className="text-sm opacity-90">Real-time conversion rate</p>
              </div>
            </div>
          </div>

          {/* Action Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Card 1 - Fill Document */}
            <div className="action-card">
              <div className="flex items-center mb-4">
                <div className={`text-white rounded-lg h-12 w-12 flex items-center justify-center mr-4 shadow-lg`} 
                     style={{
                       backgroundColor: !formFilled ? '#003F5C' : 
                                      formFilled ? 'rgba(0, 63, 92, 0.8)' : '#9ca3af'
                     }}>
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-deep-ocean">Fill Document</h3>
                  <p className="text-gray-600 text-sm">Complete device registration</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">Fill in the Guardian VC document with your device information and specifications.</p>
              <button
                onClick={() => setShowDocumentModal(true)}
                className={`action-card-button ${
                  !formFilled ? 'active document-button' : 
                  formFilled ? 'done document-button' : 'inactive document-button'
                }`}
                disabled={formFilled}
              >
                {formFilled ? 'Document Completed ✓' : 'Fill Document'}
              </button>
            </div>

            {/* Card 2 - Connect Sensor */}
            <div className="action-card">
              <div className="flex items-center mb-4">
                <div className={`text-white rounded-lg h-12 w-12 flex items-center justify-center mr-4 shadow-lg`} 
                     style={{
                       backgroundColor: !formFilled ? '#9ca3af' :
                                      formFilled && !sensorConnected ? '#FDB813' :
                                      sensorConnected ? 'rgba(253, 184, 19, 0.8)' : '#9ca3af'
                     }}>
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-deep-ocean">Connect Sensor</h3>
                  <p className="text-gray-600 text-sm">Link your SCADA system</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">Connect your sensor or SCADA system to start collecting real-time data.</p>
              <button
                onClick={() => setShowSensorModal(true)}
                className={`action-card-button ${
                  !formFilled ? 'inactive sensor-button' :
                  formFilled && !sensorConnected ? 'active sensor-button' :
                  sensorConnected ? 'done sensor-button' : 'inactive sensor-button'
                }`}
                disabled={!formFilled || sensorConnected}
              >
                {sensorConnected ? 'Sensor Connected ✓' : 'Connect Sensor'}
              </button>
            </div>

            {/* Card 3 - Issue Carbon Credit */}
            <div className="action-card">
              <div className="flex items-center mb-4">
                <div className={`text-white rounded-lg h-12 w-12 flex items-center justify-center mr-4 shadow-lg`}
                     style={{
                       backgroundColor: !sensorConnected ? '#9ca3af' :
                                      sensorConnected && totalCredits > 0 ? '#2E8540' :
                                      sensorConnected && totalCredits === 0 ? 'rgba(46, 133, 64, 0.8)' : '#9ca3af'
                     }}>
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-deep-ocean">Issue Carbon Credit</h3>
                  <p className="text-gray-600 text-sm">Generate verified credits</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">Issue carbon credits based on your verified renewable energy generation.</p>
              <button
                onClick={handleIssueCredit}
                className={`action-card-button ${
                  !sensorConnected ? 'inactive credit-button' :
                  sensorConnected && totalCredits > 0 ? 'active credit-button' :
                  sensorConnected && totalCredits === 0 ? 'done credit-button' : 'inactive credit-button'
                }`}
                disabled={!sensorConnected || totalCredits === 0}
              >
                Issue Carbon Credit
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-gray-500 text-sm">
            <p>Last updated: <span className="font-medium">{lastUpdate}</span></p>
            <p className="mt-2">Powered by VerifiedCC - Automating Carbon Credits with AI and Hedera</p>
          </div>
        </div>
      </main>

      {/* Professional Modals */}
      {showDocumentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowDocumentModal(false)}>
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-deep-ocean text-white rounded-lg h-12 w-12 flex items-center justify-center mr-4 shadow-lg">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-deep-ocean">Guardian VC Document</h2>
                  <p className="text-gray-600">Fill in Verifiable Credentials Document</p>
                </div>
              </div>
              <button
                onClick={() => setShowDocumentModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Demo Fill Button */}
            <div className="mb-6">
              <button
                type="button"
                onClick={handleDemoFillDocument}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
              >
                <Zap className="w-4 h-4 mr-2" />
                Demo Auto-Fill
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleDocumentSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-deep-ocean mb-2">Device ID *</label>
                  <input
                    type="text"
                    required
                    value={formData.deviceId}
                    onChange={(e) => setFormData({ ...formData, deviceId: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors bg-white/50"
                    placeholder="ESP32-SOLAR-001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-deep-ocean mb-2">Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors bg-white/50"
                    placeholder="Morocco, Casablanca"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-deep-ocean mb-2">Energy Source *</label>
                  <select
                    required
                    value={formData.energySource}
                    onChange={(e) => setFormData({ ...formData, energySource: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors bg-white/50"
                  >
                    <option value="Solar Panel">Solar Panel</option>
                    <option value="Wind Turbine">Wind Turbine</option>
                    <option value="Hydro">Hydro</option>
                    <option value="Biomass">Biomass</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-deep-ocean mb-2">Capacity (kW) *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors bg-white/50"
                    placeholder="1.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-deep-ocean mb-2">Installation Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.installationDate}
                    onChange={(e) => setFormData({ ...formData, installationDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors bg-white/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-deep-ocean mb-2">Certification</label>
                  <input
                    type="text"
                    value={formData.certification}
                    onChange={(e) => setFormData({ ...formData, certification: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oasis-green focus:border-transparent transition-colors bg-white/50"
                    placeholder="IEC 61215, IEC 61730"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowDocumentModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-desert-sand hover:bg-yellow-500 text-white font-bold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Submit Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showSensorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowSensorModal(false)}>
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-oasis-green text-white rounded-lg h-12 w-12 flex items-center justify-center mr-4 shadow-lg">
                  <Wifi className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-deep-ocean">Connect Sensor</h2>
                  <p className="text-gray-600">Link your SCADA system to our platform</p>
                </div>
              </div>
              <button
                onClick={() => setShowSensorModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Connection Instructions */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-deep-ocean mb-4">Connection Instructions</h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                  <li>Configure your ESP32 or SCADA system with our API endpoint</li>
                  <li>Use the provided device ID from your document</li>
                  <li>Set up data transmission interval (recommended: 1 minute)</li>
                  <li>Test the connection using the demo button below</li>
                </ol>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">API Configuration</h4>
                <div className="text-sm text-blue-800 font-mono bg-blue-100 p-3 rounded border">
                  <div className="mb-1"><span className="font-semibold">Endpoint:</span> https://api.verifiedcc.com/data</div>
                  <div className="mb-1"><span className="font-semibold">Device ID:</span> {documentData?.deviceId || 'Fill document first'}</div>
                  <div><span className="font-semibold">Method:</span> POST</div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">Sample Payload</h4>
                <pre className="text-xs text-green-800 bg-green-100 p-3 rounded border overflow-x-auto">
{`{
  "deviceId": "${documentData?.deviceId || 'ESP32-SOLAR-001'}",
  "timestamp": "2024-01-15T10:30:00Z",
  "power": 1250.5,
  "energy": 8.75,
  "temperature": 25.3,
  "irradiance": 850
}`}
                </pre>
              </div>
            </div>

            {/* Demo Connect Button */}
            <div className="mb-6">
              <button
                type="button"
                onClick={handleDemoConnectSensor}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
              >
                <Activity className="w-4 h-4 mr-2" />
                Demo Connect Sensor
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => setShowSensorModal(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSensorConnect}
                className="bg-desert-sand hover:bg-yellow-500 text-white font-bold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Connect Real Sensor
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}