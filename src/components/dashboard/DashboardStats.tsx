'use client';

interface DashboardStatsProps {
  stats: {
    totalProducts: number;
    activeProducts: number;
    totalOrders: number;
    totalEarnings?: number;
    averageRating?: number;
  };
}

const StatCard = ({ label, value, icon, color = 'primary' }: any) => {
  const colorClasses = {
    primary: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    orange: 'bg-orange-50 border-orange-200',
    purple: 'bg-purple-50 border-purple-200',
  };

  return (
    <div className={`rounded-lg border-l-4 border-${color} ${colorClasses[color as keyof typeof colorClasses]} p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-semibold">{label}</p>
          <p className="text-3xl font-bold text-primary mt-2">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
};

export default function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard label="Total Products" value={stats.totalProducts} icon="📦" color="primary" />
      <StatCard label="Active Products" value={stats.activeProducts} icon="✅" color="green" />
      <StatCard label="Total Orders" value={stats.totalOrders} icon="📊" color="orange" />
      <StatCard
        label="Average Rating"
        value={stats.averageRating ? stats.averageRating.toFixed(1) : 'N/A'}
        icon="⭐"
        color="purple"
      />
    </div>
  );
}
