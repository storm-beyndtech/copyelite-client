import { AnimatedSection } from '@/components/ui/animated-section';
import {
  ArrowRight,
  Calendar,
  TrendingUp,
  Award,
  MessageSquare,
  Check,
  Currency,
} from 'lucide-react';
import { Button } from './ui/button';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`rounded-2xl shadow-lg border border-[#12182633] bg-gray-500/5 backdrop-blur-md transition hover:border-[#1E90FF66] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

const CardContent: React.FC<CardContentProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

interface ToolCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}

const ToolCard: React.FC<ToolCardProps> = ({
  icon: Icon,
  title,
  description,
  delay,
}) => {
  return (
    <AnimatedSection delay={delay}>
      <Card>
        <CardContent>
          <div className="mb-4 p-3 bg-[#1E90FF1A] inline-flex items-center justify-center rounded-xl w-12 h-12">
            <Icon size={24} className="text-[#1E90FF]" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-[#B0BAC9] text-sm mb-5 leading-relaxed">
            {description}
          </p>

          <Button
            variant="link"
            className="text-[#1E90FF] hover:underline text-sm font-medium"
          >
            <span className="flex items-center gap-2">
              Find out more <ArrowRight size={16} />
            </span>
          </Button>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
};

export const FeaturesSection: React.FC = () => {
  const tradingTools = [
    {
      icon: Calendar,
      title: 'Premium Economic Calendar',
      description:
        'Start trading news like the pros with our pro economic calendar',
    },
    {
      icon: Check,
      title: 'Technical Views',
      description:
        'Access live trading setups based on pattern recognition and expert analysis.',
    },
    {
      icon: TrendingUp,
      title: 'Alpha EA',
      description:
        'Unlock live trading ideas with three EAs for your MT4 and MT5 platform.',
    },
    {
      icon: MessageSquare,
      title: 'AI Market Buzz',
      description:
        'Gain live market-moving insights of over 35,000 tradable assets.',
    },
    {
      icon: Award,
      title: 'Trade Signals',
      description:
        'Access daily trading ideas and technical setups in real-time.',
    },
    {
      icon: Currency,
      title: 'Cashback Bonus',
      description:
        'Get a 50% Cashback Bonus that converts to cash when you trade.',
    },
  ];

  return (
    <section
      id="features"
      className="py-24 bg-gradient-to-b from-bodydark via-gray-950 to-bodydark text-white"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {tradingTools.map((tool, index) => (
            <ToolCard
              key={index}
              icon={tool.icon}
              title={tool.title}
              description={tool.description}
              delay={0.1 * index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
