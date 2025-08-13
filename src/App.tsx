import React, { useState } from 'react';
import { Zap, Battery, Footprints, BatteryCharging, Lightbulb, Wifi, ArrowUpRight, ArrowDownRight, Calculator, Lock, Mail, LogOut, Settings, User } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const energyData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  power: Math.random() * 3 + 1,
  footsteps: Math.floor(Math.random() * 100) + 50,
}));

const powerDistribution = [
  { name: 'LED Lighting', value: 30 },
  { name: 'IoT Devices', value: 25 },
  { name: 'Battery Storage', value: 45 },
];

const COLORS = ['#2563eb', '#7c3aed', '#8b5cf6'];

const VOLTAGE_PER_STEP = 5;
const CURRENT_PER_STEP = 0.001;
const TIME_PER_STEP = 0.2;
const ENERGY_PER_STEP = VOLTAGE_PER_STEP * CURRENT_PER_STEP * TIME_PER_STEP;

function formatEnergy(joules: number) {
  if (joules < 0.001) {
    return `${(joules * 1000000).toFixed(2)} µJ`;
  } else if (joules < 1) {
    return `${(joules * 1000).toFixed(2)} mJ`;
  } else if (joules < 1000) {
    return `${joules.toFixed(2)} J`;
  } else {
    return `${(joules / 1000).toFixed(2)} kJ`;
  }
}

function EnergyCard({ title, value, icon: Icon, trend, unit }: { 
  title: string;
  value: number;
  icon: React.ElementType;
  trend: 'up' | 'down';
  unit: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover-scale">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 gradient-bg rounded-xl shadow-md">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-gray-700 font-semibold">{title}</h3>
        </div>
        {trend === 'up' ? (
          <ArrowUpRight className="w-5 h-5 text-green-500" />
        ) : (
          <ArrowDownRight className="w-5 h-5 text-red-500" />
        )}
      </div>
      <p className="text-4xl font-bold gradient-text">
        {value}
        <span className="text-lg font-normal text-gray-500 ml-1">{unit}</span>
      </p>
    </div>
  );
}

function EnergyPredictionCard() {
  const [footsteps, setFootsteps] = useState<number>(1000);
  const totalEnergy = footsteps * ENERGY_PER_STEP;
  const energyInWattHours = (totalEnergy / 3600).toFixed(4);

  const handleFootstepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/^0+/, '') || '0';
    setFootsteps(parseInt(value));
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8 rounded-2xl shadow-lg border border-purple-100">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 gradient-bg rounded-xl shadow-md">
          <Calculator className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-xl font-bold gradient-text">
          Energy Generation Prediction
        </h3>
      </div>
      
      <div className="space-y-8">
        <div className="relative">
          <label htmlFor="footsteps" className="block text-sm font-semibold text-gray-700 mb-2">
            Number of Footsteps
          </label>
          <input
            type="text"
            id="footsteps"
            value={footsteps}
            onChange={handleFootstepsChange}
            className="block w-full px-4 py-3 border-2 border-purple-100 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition-all duration-200 text-lg font-medium"
            pattern="[0-9]*"
            inputMode="numeric"
          />
        </div>

        <div className="glass-effect p-6 rounded-xl border border-purple-100 space-y-6">
          <div>
            <h4 className="text-sm font-bold text-purple-900 uppercase tracking-wide mb-3">Parameters per Step</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/80 p-4 rounded-xl shadow-sm">
                <div className="text-sm text-purple-600 font-medium">Voltage</div>
                <div className="text-lg font-bold gradient-text">{VOLTAGE_PER_STEP}V</div>
              </div>
              <div className="bg-white/80 p-4 rounded-xl shadow-sm">
                <div className="text-sm text-purple-600 font-medium">Current</div>
                <div className="text-lg font-bold gradient-text">{CURRENT_PER_STEP * 1000}mA</div>
              </div>
              <div className="bg-white/80 p-4 rounded-xl shadow-sm">
                <div className="text-sm text-purple-600 font-medium">Duration</div>
                <div className="text-lg font-bold gradient-text">{TIME_PER_STEP}s</div>
              </div>
              <div className="bg-white/80 p-4 rounded-xl shadow-sm">
                <div className="text-sm text-purple-600 font-medium">Energy/Step</div>
                <div className="text-lg font-bold gradient-text">{formatEnergy(ENERGY_PER_STEP)}</div>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-purple-100 pt-6">
            <h4 className="text-sm font-bold text-purple-900 uppercase tracking-wide mb-4">Total Predicted Energy</h4>
            <div className="gradient-bg p-6 rounded-xl text-white shadow-lg">
              <div className="text-3xl font-bold mb-2">
                {formatEnergy(totalEnergy)}
              </div>
              <div className="text-lg opacity-90">
                {energyInWattHours} Wh
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm text-purple-600 bg-purple-50 p-4 rounded-lg">
          <p className="font-medium">* Based on piezoelectric energy harvesting parameters with real-time conversion</p>
        </div>
      </div>
    </div>
  );
}

function AnalyticsView() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg hover-scale">
          <h3 className="text-lg font-semibold mb-4 gradient-text">Power Generation (24h)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="hour" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ background: 'white', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="power" stroke="#2563eb" fill="#2563eb" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg hover-scale">
          <h3 className="text-lg font-semibold mb-4 gradient-text">Footstep Activity</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="hour" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ background: 'white', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="footsteps" fill="#7c3aed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <EnergyPredictionCard />

        <div className="bg-white p-6 rounded-2xl shadow-lg hover-scale">
          <h3 className="text-lg font-semibold mb-4 gradient-text">Power Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={powerDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {powerDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'white', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
            {powerDistribution.map((item, index) => (
              <div key={item.name} className="flex items-center p-2 rounded-lg hover:bg-gray-50">
                <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: COLORS[index] }}></div>
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
                <span className="ml-auto text-sm font-semibold gradient-text">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg hover-scale">
        <h3 className="text-lg font-semibold mb-6 gradient-text">Efficiency Metrics</h3>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Power Conversion</span>
              <span className="text-sm font-bold gradient-text">92%</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full gradient-bg rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Battery Health</span>
              <span className="text-sm font-bold gradient-text">88%</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full gradient-bg rounded-full" style={{ width: '88%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">System Uptime</span>
              <span className="text-sm font-bold gradient-text">99.9%</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full gradient-bg rounded-full" style={{ width: '99.9%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginPage({ onLogin }: { onLogin: (email: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onLogin(email);
    }
  };

  return (
    <div className="min-h-screen dark-gradient flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500 rounded-full blur-2xl opacity-20"></div>
              <div className="relative gradient-bg p-6 rounded-full shadow-lg logo-glow">
                <div className="relative">
                  <Zap className="w-16 h-16 text-white" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full blur-sm"></div>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-6xl font-bold text-white mb-4">
            Energi<span className="text-purple-400">X</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Powering the future, one step at a time
          </p>
        </div>

        <div className="card-glass rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 input-dark rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 input-dark rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full gradient-bg text-white py-3 px-4 rounded-xl font-medium hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            <a href="#" className="hover:text-purple-400 transition-colors duration-200">
              Forgot your password?
            </a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            © 2025 EnergiX. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Sustainable Energy Solutions
          </p>
        </div>
      </div>
    </div>
  );
}

function DashboardLayout({ children, userEmail, onLogout }: { 
  children: React.ReactNode; 
  userEmail: string;
  onLogout: () => void;
}) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="min-h-screen dark-gradient">
      <nav className="dark-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500 rounded-lg blur-md opacity-20"></div>
                <div className="relative gradient-bg p-2 rounded-lg shadow-md">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="ml-3 text-xl font-bold text-white">
                Energi<span className="text-purple-400">X</span>
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="relative">
                <button 
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  onClick={() => setShowProfile(!showProfile)}
                >
                  <User className="w-5 h-5" />
                </button>
                {showProfile && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg py-2 z-10">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm text-gray-500">Signed in as</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{userEmail}</p>
                    </div>
                    <div className="px-2 py-2">
                      <button
                        onClick={() => {
                          setShowProfile(false);
                          onLogout();
                        }}
                        className="w-full text-left px-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button 
                onClick={onLogout}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setActiveTab('overview');
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <DashboardLayout userEmail={userEmail} onLogout={handleLogout}>
      <div className="mb-8">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${
              activeTab === 'overview'
                ? 'gradient-bg text-white shadow-lg'
                : 'card-glass text-gray-300 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${
              activeTab === 'analytics'
                ? 'gradient-bg text-white shadow-lg'
                : 'card-glass text-gray-300 hover:text-white'
            }`}
          >
            Analytics
          </button>
        </div>
      </div>

      {activeTab === 'overview' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <EnergyCard
              title="Current Power"
              value={2.4}
              icon={Zap}
              trend="up"
              unit="kW"
            />
            <EnergyCard
              title="Battery Level"
              value={85}
              icon={Battery}
              trend="up"
              unit="%"
            />
            <EnergyCard
              title="Footstep Count"
              value={1243}
              icon={Footprints}
              trend="up"
              unit="steps"
            />
            <EnergyCard
              title="Charging Rate"
              value={0.8}
              icon={BatteryCharging}
              trend="down"
              unit="kW/h"
            />
            <EnergyCard
              title="LED Power Usage"
              value={0.3}
              icon={Lightbulb}
              trend="down"
              unit="kW"
            />
            <EnergyCard
              title="IoT Devices"
              value={12}
              icon={Wifi}
              trend="up"
              unit="active"
            />
          </div>

          <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg hover-scale">
            <h2 className="text-xl font-semibold gradient-text mb-6">System Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-700 font-medium">System Health</span>
                <span className="px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium">Optimal</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-700 font-medium">Last Maintenance</span>
                <span className="text-gray-900 font-semibold">2 days ago</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-700 font-medium">Next Calibration</span>
                <span className="text-gray-900 font-semibold">In 5 days</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-700 font-medium">Efficiency Rating</span>
                <span className="text-gray-900 font-semibold">94%</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <AnalyticsView />
      )}
    </DashboardLayout>
  );
}

export default App;