import { getIndustryInsights } from "@/actions/dashboard";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";
import DashboardView from "./_components/dashboard-view";
import { auth } from "@clerk/nextjs/server";
import { DashboardSkeleton } from "./_components/dashboard-skeleton";

const IndustryInsightspage = async () => {
  const user = await auth();
  const { success } = await getUserOnboardingStatus();
  if (!user) {
    redirect("/sign-in");
  }
  if (!success) {
    redirect("/onboarding");
  }

  const insights = await getIndustryInsights();
  if (!insights) {
    return <DashboardSkeleton />
  }
  return (
    <div className="container mx-auto">
      <DashboardView
        recommendedSkills={insights.recommendedSkills}
        topSkills={insights.topSkills}
        keyTrends={insights.keyTrends}
        growthRate={insights.growthRate}
        marketOutlook={insights.marketOutlook}
        nextUpdate={insights.nextUpdate}
        lastUpdated={insights.lastUpdated}
        demandLevel={insights.demandLevel}
        salaryRanges={JSON.parse(JSON.stringify(insights.salaryRanges))}
      />
    </div>
  );
};

export default IndustryInsightspage;
