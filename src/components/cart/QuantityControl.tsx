'use client';

interface QuantityControlProps {
  quantity: number;
  max?: number;
  onChange: (quantity: number) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function QuantityControl({
  quantity,
  max = 999,
  onChange,
  disabled = false,
  size = 'md',
}: QuantityControlProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2',
    lg: 'px-4 py-3 text-lg',
  };

  return (
    <div className="flex items-center border border-gray-300 rounded w-fit">
      <button
        onClick={() => onChange(Math.max(1, quantity - 1))}
        disabled={disabled || quantity <= 1}
        className={`${sizeClasses[size]} text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        −
      </button>
      <input
        type="number"
        value={quantity}
        onChange={(e) => {
          const val = parseInt(e.target.value) || 1;
          onChange(Math.min(Math.max(val, 1), max));
        }}
        min="1"
        max={max}
        disabled={disabled}
        className={`${sizeClasses[size]} w-16 text-center border-0 focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed`}
      />
      <button
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={disabled || quantity >= max}
        className={`${sizeClasses[size]} text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        +
      </button>
    </div>
  );
}
