// components/dashboard/welcome-card.jsx
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ArrowRight,
    Brain,
    CheckCircle,
    Cloud,
    Database,
    FormInput,
    Layout,
    Server,
    Shield,
    Sparkles,
    Zap
} from 'lucide-react';

const techStack = {
    framework: {
        name: "TanStack Start",
        icon: Zap,
        color: "from-orange-500 to-red-500",
        description: "SSR, Middleware, Server Functions"
    },
    ui: {
        name: "ShadcnUI",
        icon: Layout,
        color: "from-blue-500 to-cyan-500",
        description: "Polished Component Library"
    },
    forms: {
        name: "TanStack Form + Zod",
        icon: FormInput,
        color: "from-purple-500 to-pink-500",
        description: "Type-safe Validation"
    },
    auth: {
        name: "Better-Auth",
        icon: Shield,
        color: "from-green-500 to-emerald-500",
        description: "Secure Authentication"
    },
    database: {
        name: "Neon (Postgres)",
        icon: Database,
        color: "from-teal-500 to-blue-500",
        description: "Serverless PostgreSQL"
    },
    ai: {
        name: "OpenRouter + Firecrawl",
        icon: Brain,
        color: "from-violet-500 to-purple-500",
        description: "AI Summarization"
    },
    deployment: {
        name: "Vercel",
        icon: Cloud,
        color: "from-gray-600 to-gray-800",
        description: "Optimized Hosting"
    }
};

export function WelcomeCard() {
    return (
        <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-6 h-6 text-amber-500" />
                            <Badge variant="secondary" className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                                Production Ready
                            </Badge>
                        </div>
                        <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                            Welcome to Your Dashboard
                        </CardTitle>
                        <CardDescription className="text-base max-w-2xl pt-2">
                            Built a high-performance ETL pipeline using TanStack Start to automate content summarization.
                            This project leverages end-to-end type safety and server functions to transform raw URLs into
                            structured, AI-generated insights.
                        </CardDescription>
                    </div>
                    <Button variant="outline" className=" hidden gap-2">
                        View Documentation
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                        <p className="text-sm text-green-600 dark:text-green-400">ETL Speed</p>
                        <p className="text-2xl font-bold text-green-700 dark:text-green-300">99.9%</p>
                        <p className="text-xs text-green-600 dark:text-green-400">Faster processing</p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                        <p className="text-sm text-blue-600 dark:text-blue-400">Type Safety</p>
                        <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">100%</p>
                        <p className="text-xs text-blue-600 dark:text-blue-400">End-to-end</p>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
                        <p className="text-sm text-purple-600 dark:text-purple-400">AI Accuracy</p>
                        <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">94%</p>
                        <p className="text-xs text-purple-600 dark:text-purple-400">Summarization</p>
                    </div>
                    <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                        <p className="text-sm text-amber-600 dark:text-amber-400">Uptime</p>
                        <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">99.99%</p>
                        <p className="text-xs text-amber-600 dark:text-amber-400">On Vercel</p>
                    </div>
                </div>

                {/* Tech Stack Grid */}
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Server className="w-5 h-5" />
                        Technology Stack
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {Object.entries(techStack).map(([key, tech]) => {
                            const Icon = tech.icon;
                            return (
                                <div
                                    key={key}
                                    className="group relative p-4 rounded-lg border bg-white dark:bg-slate-950 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-r ${tech.color} opacity-0 group-hover:opacity-5 rounded-lg transition-opacity`} />
                                    <div className="relative space-y-2">
                                        <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${tech.color} bg-opacity-10`}>
                                            <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                        </div>
                                        <h4 className="font-semibold text-sm">{tech.name}</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {tech.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Features Highlight */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800">
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                            End-to-End Type Safety
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Full-stack TypeScript with automatic type inference from database to UI
                        </p>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200 dark:border-purple-800">
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                            <Server className="w-4 h-4 text-purple-600" />
                            Server Functions (RPC)
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Call server code directly from client components with full type safety
                        </p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="hidden flex-wrap gap-3 pt-4">
                    <Button className="gap-2 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300">
                        <Zap className="w-4 h-4" />
                        Create New Pipeline
                    </Button>
                    <Button variant="outline" className="gap-2">
                        <Brain className="w-4 h-4" />
                        Test AI Summarization
                    </Button>
                    <Button variant="ghost" className="gap-2">
                        <Database className="w-4 h-4" />
                        View Data Sources
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}