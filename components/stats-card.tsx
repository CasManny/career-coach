import React from "react";

interface StatsCardProps {
  label: string;
  desc: string;
}

export const StatsCard = ({ label, desc }: StatsCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <h3 className="text-4xl font-bold">{label}</h3>
      <p className="text-muted-foreground">{desc}</p>
    </div>
  );
};
