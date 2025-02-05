import { getUserOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation'
import React from 'react'

const IndustryInsightspage = async () => {
  const { success } = await getUserOnboardingStatus()
    if (!success) {
        redirect('/onboarding')
    }
  return (
    <div>IndustryInsightspage</div>
  )
}

export default IndustryInsightspage