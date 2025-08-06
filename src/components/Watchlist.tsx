'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

export function Watchlist() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 10,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCoins(response.data);
      } catch (error) {
        console.error('Error fetching coin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Watchlist</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Coin</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>24h Change</TableHead>
              <TableHead className="text-right">Market Cap</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>Loading...</TableCell>
                  <TableCell>...</TableCell>
                  <TableCell>...</TableCell>
                  <TableCell className="text-right">...</TableCell>
                </TableRow>
              ))
            ) : (
              coins.map((coin) => (
                <TableRow key={coin.id}>
                  <TableCell className="flex items-center gap-2">
                    <Image
                      src={coin.image}
                      alt={coin.name}
                      width={24}
                      height={24}
                    />
                    <span>
                      {coin.name} <Badge variant="secondary">{coin.symbol.toUpperCase()}</Badge>
                    </span>
                  </TableCell>
                  <TableCell>${coin.current_price.toLocaleString()}</TableCell>
                  <TableCell
                    className={
                      coin.price_change_percentage_24h > 0
                        ? 'text-green-500'
                        : 'text-red-500'
                    }
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-right">
                    ${coin.market_cap.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
