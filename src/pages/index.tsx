import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/react";
import { button as buttonStyles } from "@heroui/theme";
import DefaultLayout from "@/layouts/default";
import { title, subtitle } from "@/components/primitives";
import { Logo } from "@/components/syncet-logo";
import { FolderIcon, DevicesIcon, SuccessIcon } from "@/components/dashboard/icons";

export default function IndexPage() {
  return (
    <DefaultLayout>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center gap-6 py-16 md:py-24 my-20">
        <div className="inline-block text-center max-w-3xl">
          <div className="flex justify-center mb-6">
            <Logo size={80} />
          </div>
          <h1 className={title({ size: "lg" })}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
              Sync your files
            </span>
            <br /> in real time between all your devices
          </h1>
          <p className={subtitle({ class: "mt-6 text-center mx-auto" })}>
            Syncet provides seamless, real-time file synchronization across all your devices,
            keeping your important files up to date wherever you are.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            as={Link}
            href="/dashboard"
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
              size: "lg",
            })}
          >
            Go to Dashboard
          </Button>
          <Button
            as={Link}
            href="/docs"
            className={buttonStyles({
              variant: "bordered",
              radius: "full",
              size: "lg",
            })}
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <h2 className={title({ class: "text-center mb-16" })}>Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-10">
          <FeatureCard
            icon={<FolderIcon size={36} />}
            title="Real-time Syncing"
            description="Your files are synchronized in real-time across all your devices automatically."
            gradient="from-cyan-500/20 via-blue-500/20 to-indigo-500/20"
            iconColor="text-blue-500"
          />
          <FeatureCard
            icon={<DevicesIcon size={36} />}
            title="Cross-platform"
            description="Works seamlessly on Windows, macOS, Linux, iOS, and Android devices."
            gradient="from-purple-500/20 via-violet-500/20 to-indigo-500/20"
            iconColor="text-violet-500"
          />
          <FeatureCard
            icon={<SuccessIcon size={36} />}
            title="Secure & Reliable"
            description="End-to-end encryption ensures your files remain private and secure."
            gradient="from-green-500/20 via-emerald-500/20 to-teal-500/20"
            iconColor="text-emerald-500"
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-background-900 to-background rounded-3xl my-16 max-w-7xl mx-auto">
        <h2 className={title({ class: "text-center mb-12" })}>How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto mt-10">
          <div>
            <div className="p-6 rounded-3xl bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10 h-full">
              <div className="aspect-video rounded-lg bg-background-900/50 overflow-hidden flex items-center justify-center">
                <div className="w-3/4 h-3/4 relative">
                  {/* Stylized illustration of the syncing process */}
                  <div className="absolute top-1/4 left-0 w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 animate-pulse"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <Logo size={40} />
                  </div>
                  <div className="absolute bottom-1/4 right-0 w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500/30 to-orange-500/30 animate-pulse delay-300"></div>
                  
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <path d="M20 30 L50 50 L80 70" stroke="url(#purpleBlueGradient)" strokeWidth="1" fill="none" strokeDasharray="5,5" className="animate-dash"/>
                    <path d="M20 70 L50 50 L80 30" stroke="url(#pinkOrangeGradient)" strokeWidth="1" fill="none" strokeDasharray="5,5" className="animate-dash delay-300"/>
                    <defs>
                      <linearGradient id="purpleBlueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                      <linearGradient id="pinkOrangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#EC4899" />
                        <stop offset="100%" stopColor="#F97316" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-6">Simple & Automatic</h3>
            <ol className="space-y-6">
              <StepItem number={1} text="Install Syncet on your devices" />
              <StepItem number={2} text="Select folders to synchronize" />
              <StepItem number={3} text="Syncet automatically keeps everything up to date" />
            </ol>
            <p className="mt-8 text-default-500">
              When you make changes to your files, Syncet detects them instantly and syncs them across all your connected devices in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-fuchsia-500/20 border-none">
          <CardBody className="py-12 px-8">
            <h2 className={title({ size: "md", class: "mb-6" })}>Ready to start syncing?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust Syncet for seamless file synchronization.
            </p>
            <Button
              as={Link}
              href="/dashboard"
              className={buttonStyles({
                color: "primary",
                radius: "full",
                size: "lg",
              })}
            >
              Get Started Now
            </Button>
          </CardBody>
        </Card>
      </section>
    </DefaultLayout>
  );
}

// Helper Components
const FeatureCard = ({ icon, title, description, gradient, iconColor }: any) => (
  <Card className={`bg-gradient-to-br ${gradient} border-none h-full`}>
    <CardBody className="flex flex-col items-center text-center gap-4">
      <div className={`p-3 rounded-full bg-background/30 ${iconColor}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-default-500">{description}</p>
    </CardBody>
  </Card>
);

const StepItem = ({ number, text }: any) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
      {number}
    </div>
    <div>
      <p className="text-lg">{text}</p>
    </div>
  </div>
);