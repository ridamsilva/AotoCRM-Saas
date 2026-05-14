// Dummy service for demonstration of payment integration
// In a real app, this would use Stripe or Mercado Pago SDKs

export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
}

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 490,
    features: ['Até 50 veículos', '3 usuários', 'WhatsApp Integrado']
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 990,
    features: ['Veículos ilimitados', '10 usuários', 'Inteligência Artificial', 'Relatórios Avançados']
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 2490,
    features: ['Customizável', 'Equipe ilimitada', 'Suporte VIP', 'API Própria']
  }
];

export async function createCheckoutSession(params: { planId: string, storeId: string, email: string }) {
  console.log('Redirecting to checkout for plan:', params.planId);
  // Returns a dummy URL
  return `https://checkout.stripe.com/pay/${Math.random().toString(36).substring(7)}`;
}

export async function getSubscriptionStatus(storeId: string) {
  return {
    status: 'active',
    expiresAt: '2026-12-31',
    planId: 'pro'
  };
}
