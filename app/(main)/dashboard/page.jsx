import { getUserOnboardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {

  const { isOnboarded } = await getUserOnboardingStatus();

  if (!isOnboarded) {
    redirect('/onboarding')
  }

  return (
    <div>page</div>
  )
}

export default page