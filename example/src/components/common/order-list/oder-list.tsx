import React from 'react'

import { Order } from '@/lib/types'

interface OrderListProps {
  deleteOrders: (ids: string[]) => void
  list: Array<Order>
}

export default function OderList({}: OrderListProps) {
  return <div>OderList</div>
}
