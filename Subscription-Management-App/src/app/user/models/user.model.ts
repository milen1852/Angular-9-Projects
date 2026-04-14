export enum PlanType {
    MONTHLY = 'MONTHLY',
    YEARLY = 'YEARLY'
}

export enum SubscriptionStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

export interface SubscriptionPlan {
    planId: number,
    planType: PlanType,
    price: number,
    durationDays: number
}


export interface Users {
  userId: number;  
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  planType: PlanType;
  planId: number;
  price: number;
  subscriptionStatus: SubscriptionStatus;
  subscriptionStartDate: string;
  subscriptionEndDate: string;
}