import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProbabilityAnalysisCard() {
  return (
    <Card className="w-full bg-white/95 backdrop-blur-sm shadow-lg border-[#A3A68A]/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-semibold text-[#A3A68A]">
          Probability Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Rain</span>
            <span className="text-lg font-bold text-[#A3A68A]">75%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "75%" }}></div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Sunny</span>
            <span className="text-lg font-bold text-[#A3A68A]">15%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: "15%" }}></div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Cloudy</span>
            <span className="text-lg font-bold text-[#A3A68A]">60%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-gray-400 h-2.5 rounded-full" style={{ width: "60%" }}></div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Stormy</span>
            <span className="text-lg font-bold text-[#A3A68A]">30%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "30%" }}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}