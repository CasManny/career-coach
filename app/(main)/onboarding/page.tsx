import { industries } from '@/data/constants'
import OnboardingForm from './_components/onboarding-form'
import { getUserOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation'

const OnboardingPage = async () => {
    const { success }= await getUserOnboardingStatus()
    if (success) {
       redirect('/dashboard') 
    }
  return (
    <OnboardingForm industries={industries} />
  )
}

export default OnboardingPage