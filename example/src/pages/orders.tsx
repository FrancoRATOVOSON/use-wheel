import React from 'react'

import { OrderList } from '@/components/common'
import { fakeOrdersList } from '@/lib/faker'

export default function OrdersPage() {
  const [orders, setOrders] = React.useState(fakeOrdersList())

  const deleteOrders = React.useCallback(
    (ids: string[]) =>
      setOrders(list => list.filter(element => ids.includes(element.id))),
    []
  )

  return <OrderList deleteOrders={deleteOrders} list={orders} />
}
