import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { useList } from 'use-list'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Order } from '@/lib/types'
import { cn } from '@/lib/utils'

interface OrderListProps {
  deleteOrders: (ids: string[]) => void
  list: Array<Order>
}

export default function OderList({ deleteOrders, list: data }: OrderListProps) {
  const {
    currentPage,
    firstPage,
    lastPage,
    list,
    nextPage,
    pageCount,
    pageSize,
    previousPage,
    selection,
    setPageSize,
    toogleSelection
  } = useList(data, {
    defaultPageSize: 5,
    filterFn: () => true,
    getId: elt => elt.id,
    sortFn: () => 0
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-2 items-center">
        <div className="flex justify-start items-center gap-2">
          {selection.size > 0 && (
            <Button
              variant="destructive"
              onClick={() => deleteOrders(Array.from(selection))}
            >
              Delete selected users
            </Button>
          )}
        </div>
        <div className="flex justify-end gap-2 items-center">
          <div className="text-muted-foreground text-nowrap">Rows per page</div>
          <Select
            value={`${pageSize}`}
            onValueChange={value => setPageSize(Number(value))}
          >
            <SelectTrigger className="w-16">
              <SelectValue placeholder={`${pageSize}`} />
            </SelectTrigger>
            <SelectContent side="bottom">
              {[5, 10, 15, 20, 30, 50].map(size => (
                <SelectItem key={`pageSize-${size}`} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-4">
        {list.map(order => {
          const { amount, date, id, isDelivered, user } = order
          return (
            <Card
              className={cn('p-4', 'flex items-center justify-between')}
              key={id}
            >
              <div className="flex item-center gap-2">
                <div className="size-9 grid content-center ml-2">
                  <Checkbox
                    checked={selection.has(id)}
                    id={user}
                    onCheckedChange={state =>
                      toogleSelection(
                        order,
                        typeof state === 'string' ? false : state
                      )
                    }
                  />
                </div>
                <label
                  className={cn(
                    'flex flex-col gap-1',
                    'font-medium leading-none',
                    'cursor-pointer'
                  )}
                  htmlFor={user}
                >
                  <span className="font-semibold">{user}</span>
                  <span className="text-sm text-muted-foreground">
                    {format(date, 'PPP')}
                  </span>
                </label>
                <div>{isDelivered && <Badge>delivered</Badge>}</div>
              </div>
              <div>{`${amount} $`}</div>
            </Card>
          )
        })}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-4">
          <div className="flex gap-2 justify-start items-center">
            <Checkbox
              checked={selection.size > 0}
              id="all-users-selection"
              // onCheckedChange={() => toggleSelectAll()}
            />
            <label
              className="text-muted-foreground cursor-pointer"
              htmlFor="all-users-selection"
            >
              {selection.size > 0 ? `Unselect all` : `Select all`}
            </label>
          </div>
          {data && (
            <p>{`${selection.size} of ${data.length} user(s) selected.`}</p>
          )}
        </div>
        <div className={cn('flex justify-start items-center gap-2')}>
          <Button
            disabled={currentPage === 0}
            size="icon"
            variant="outline"
            onClick={firstPage}
          >
            <DoubleArrowLeftIcon className="size-4" />
          </Button>
          <Button
            disabled={currentPage === 0}
            size="icon"
            variant="outline"
            onClick={previousPage}
          >
            <ChevronLeftIcon className="size-4" />
          </Button>
          <div className="text-muted-foreground">
            {`Page ${currentPage} of ${pageCount}`}
          </div>
          <Button
            disabled={currentPage >= pageCount}
            size="icon"
            variant="outline"
            onClick={nextPage}
          >
            <ChevronRightIcon className="size-4" />
          </Button>
          <Button
            disabled={currentPage >= pageCount}
            size="icon"
            variant="outline"
            onClick={lastPage}
          >
            <DoubleArrowRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
