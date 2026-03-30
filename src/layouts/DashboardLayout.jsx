import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Ruler,
  LogOut,
  Menu,
  X,
  Home,
  Settings,
  ChevronRight,
  Bell,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import FloatingDots from '../components/common/FloatingDots';
import FloatingShapes from '../components/common/FloatingShapes';

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-moss relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-grid-large opacity-10" />
      <div className="absolute inset-0 bg-radial-glow" />
      <FloatingDots />
      <FloatingShapes />

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex flex-col w-64 glass-strong border-r border-white/[0.06]">
          <div className="p-6">
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate('/dashboard')}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-olive via-teal-600 to-teal-400 flex items-center justify-center shadow-olive-soft">
                <Ruler className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">MeasureApp</span>
                <div className="h-0.5 w-8 bg-gradient-to-r from-teal-400 to-olive-400 rounded-full mt-0.5" />
              </div>
            </motion.div>
          </div>

          <nav className="flex-1 px-3 space-y-1 mt-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.button
                  key={item.path}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-teal-500/10 text-teal-400 border border-teal-500/15'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  <item.icon className={`w-[18px] h-[18px] transition-colors ${isActive ? 'text-teal-400' : 'text-gray-500 group-hover:text-gray-300'}`} />
                  {item.label}
                  {isActive && (
                    <motion.div layoutId="nav-indicator" className="ml-auto">
                      <ChevronRight className="w-4 h-4 text-teal-400/60" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/[0.06]">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl glass-subtle mb-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-600/40 to-olive-600/40 flex items-center justify-center ring-1 ring-white/10">
                <span className="text-sm font-semibold text-white">
                  {(user?.fullName || user?.email || 'U')[0].toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.fullName || user?.email || 'User'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-500 hover:text-red-400 hover:bg-red-500/[0.06] transition-all duration-200 border border-transparent hover:border-red-500/10"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </motion.button>
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.aside
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 w-64 glass-strong border-r border-white/[0.06] z-50 lg:hidden flex flex-col"
              >
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-olive via-teal-600 to-teal-400 flex items-center justify-center">
                      <Ruler className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-bold text-white">MeasureApp</span>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex-1 px-3 space-y-1">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <button
                        key={item.path}
                        onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-teal-500/10 text-teal-400 border border-teal-500/15'
                            : 'text-gray-400 hover:text-white hover:bg-white/[0.04] border border-transparent'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </button>
                    );
                  })}
                </nav>

                <div className="p-4 border-t border-white/[0.06]">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top navbar */}
          <header className="sticky top-0 z-30 glass border-b border-white/[0.06] px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </motion.button>
                <div className="lg:hidden flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-olive via-teal-600 to-teal-400 flex items-center justify-center">
                    <Ruler className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Bell className="w-[18px] h-[18px]" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-400 rounded-full" />
                </motion.button>

                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-600/40 to-olive-600/40 flex items-center justify-center ring-1 ring-white/10 ml-1">
                  <span className="text-xs font-semibold text-white">
                    {(user?.fullName || user?.email || 'U')[0].toUpperCase()}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/[0.06] transition-all duration-200 ml-1"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </motion.button>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto scrollbar-thin">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
