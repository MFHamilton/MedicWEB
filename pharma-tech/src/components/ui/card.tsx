import * as React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl shadow-md bg-white border border-gray-200 p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="font-semibold text-lg mb-2">{children}</div>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-gray-600">{children}</div>;
}
