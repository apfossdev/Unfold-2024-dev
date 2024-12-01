"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Twitter,
  Github,
  CreditCard,
  TrendingUp,
  Users,
  MessageSquare,
  Heart,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const githubData = [
  { date: "2023-01", commits: 30, issues: 5, pulls: 8 },
  { date: "2023-02", commits: 45, issues: 8, pulls: 12 },
  { date: "2023-03", commits: 25, issues: 12, pulls: 10 },
  { date: "2023-04", commits: 50, issues: 10, pulls: 15 },
  { date: "2023-05", commits: 35, issues: 7, pulls: 9 },
  { date: "2023-06", commits: 40, issues: 9, pulls: 11 },
];

const twitterData = [
  { date: "2023-01", tweets: 45, likes: 120, replies: 30 },
  { date: "2023-02", tweets: 52, likes: 150, replies: 35 },
  { date: "2023-03", tweets: 38, likes: 100, replies: 25 },
  { date: "2023-04", tweets: 60, likes: 200, replies: 40 },
  { date: "2023-05", tweets: 55, likes: 180, replies: 38 },
  { date: "2023-06", tweets: 48, likes: 160, replies: 32 },
];

interface StatusCardProps {
  title: string;
  icon: React.ReactNode;
  value: string | number;
  trend?: number;
}

function StatusCard({ title, icon, value, trend }: StatusCardProps) {
  return (
    <Card className="bg-white border-blue-50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p
            className={`text-xs ${
              trend > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function ChartCard({
  title,
  data,
  dataKeys,
}: {
  title: string;
  data: any[];
  dataKeys: string[];
}) {
  return (
    <Card className="bg-white border-blue-50 w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="h-[300px]"
          config={Object.fromEntries(
            dataKeys.map((key, index) => [
              key,
              {
                label: key.charAt(0).toUpperCase() + key.slice(1),
                color: `hsl(var(--chart-${index + 1}))`,
              },
            ])
          )}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {dataKeys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={`var(--color-${key})`}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function ReportCard({ title, data }: { title: string; data: any }) {
  return (
    <Card className="bg-white border-blue-50">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-4 w-full">
          {Object.entries(data).map(([key, value]) => (
            <div key={key}>
              <dt className="text-sm font-medium text-gray-500">{key}</dt>
              <dd className="text-lg font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("github");
  const [githubReport, setGithubReport] = useState({
    totalCommits: 0,
    openIssues: 0,
    pullRequests: 0,
    contributors: 0,
  });
  const [twitterReport, setTwitterReport] = useState({
    totalTweets: 0,
    followers: 0,
    likes: 0,
    retweets: 0,
  });

  useEffect(() => {
    // Simulating API calls
    setTimeout(() => {
      setGithubReport({
        totalCommits: 225,
        openIssues: 15,
        pullRequests: 8,
        contributors: 12,
      });
    }, 1000);

    setTimeout(() => {
      setTwitterReport({
        totalTweets: 298,
        followers: 1520,
        likes: 910,
        retweets: 145,
      });
    }, 1500);
  }, []);

  return (
    <div className="min-h-screen bg-blue-50/30">
      <main className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatusCard
            title="Total Commits"
            icon={<Github className="h-8 w-8 text-blue-500" />}
            value={githubReport.totalCommits}
            trend={5}
          />
          <StatusCard
            title="Open Issues"
            icon={<MessageSquare className="h-8 w-8 text-yellow-500" />}
            value={githubReport.openIssues}
            trend={-2}
          />
          <StatusCard
            title="Twitter Followers"
            icon={<Users className="h-8 w-8 text-blue-400" />}
            value={twitterReport.followers}
            trend={3}
          />
          <StatusCard
            title="Tweet Likes"
            icon={<Heart className="h-8 w-8 text-red-500" />}
            value={twitterReport.likes}
            trend={7}
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="github">GitHub</TabsTrigger>
            <TabsTrigger value="twitter">Twitter</TabsTrigger>
          </TabsList>
          <TabsContent value="github" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <ChartCard
                  title="GitHub Activity"
                  data={githubData}
                  dataKeys={["commits", "issues", "pulls"]}
                />
              </div>
              <ReportCard title="GitHub Summary" data={githubReport} />
            </div>
          </TabsContent>
          <TabsContent value="twitter" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <ChartCard
                  title="Twitter Activity"
                  data={twitterData}
                  dataKeys={["tweets", "likes", "replies"]}
                />
              </div>
              <ReportCard title="Twitter Summary" data={twitterReport} />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
