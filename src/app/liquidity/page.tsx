import { AddLiquidity } from '@/components/Liquidity/AddLiquidity';
import { RemoveLiquidity } from '@/components/Liquidity/RemoveLiquidity';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LiquidityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Manage Liquidity</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Add Liquidity</CardTitle>
          </CardHeader>
          <CardContent>
            <AddLiquidity />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Remove Liquidity</CardTitle>
          </CardHeader>
          <CardContent>
            <RemoveLiquidity />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}