import React from 'react'

import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons'
import { format } from 'date-fns'
import {
  ArrowDownNarrowWide,
  ArrowUpDown,
  ArrowUpNarrowWide,
  Search
} from 'lucide-react'
import { useRichList } from 'use-list'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
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
  const [search, setSearch] = React.useState<string>('')
  const [sort, setSort] = React.useState<'asc' | 'desc' | null>(null)
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
    toogleSelection,
    toogleSelectionAll
  } = useRichList<string>()(data, {
    defaultPageSize: 5,
    filterFn: order => {
      if (search) return order.user.toLowerCase().includes(search.toLowerCase())
      return true
    },
    getId: elt => elt.id,
    sortFn: (a, b) => {
      if (!sort) return 0
      if (sort === 'asc') return a.amount - b.amount
      return b.amount - a.amount
    }
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-2 items-center">
        <div className="flex justify-start items-center gap-2">
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              className="w-full rounded-lg bg-background pl-9 md:w-[200px] lg:w-[336px]"
              placeholder="Search..."
              type="search"
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {sort === 'asc' ? (
                    <>
                      <ArrowUpNarrowWide className="size-4 mr-4" />
                      Asc
                    </>
                  ) : sort === 'desc' ? (
                    <>
                      <ArrowDownNarrowWide className="size-4 mr-4" />
                      Desc
                    </>
                  ) : (
                    <>
                      <ArrowUpDown className="size-4 mr-4" />
                      Sort
                    </>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-28 h-fit p-2 bg-background border rounded-md mt-2">
                <DropdownMenuRadioGroup
                  value={sort || undefined}
                  onValueChange={value => setSort(value as 'asc' | 'desc')}
                >
                  <DropdownMenuRadioItem className="cursor-pointer" value="asc">
                    Asc
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    className="cursor-pointer"
                    value="desc"
                  >
                    Desc
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {search && (
            <div>{`${data.filter(order => order.user.toLowerCase().includes(search.toLowerCase())).length} results`}</div>
          )}
        </div>
        {pageSize && setPageSize && (
          <div className="flex justify-end gap-2 items-center">
            <div className="text-muted-foreground text-nowrap">
              Rows per page
            </div>
            <Select
              value={`${pageSize}`}
              onValueChange={value => setPageSize?.(Number(value))}
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
        )}
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
                {selection && toogleSelection && (
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
                )}
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
        {selection && (
          <div className="flex justify-start items-center gap-4">
            <div className="flex flex-col gap-0">
              <div className="flex gap-2 justify-start items-center">
                {toogleSelectionAll && (
                  <Checkbox
                    checked={selection.size > 0}
                    id="all-users-selection"
                    onCheckedChange={state =>
                      toogleSelectionAll(
                        typeof state === 'string' ? false : state
                      )
                    }
                  />
                )}
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
            {selection.size > 0 && (
              <Button
                variant="destructive"
                onClick={() => deleteOrders(Array.from(selection))}
              >
                Delete selected users
              </Button>
            )}
          </div>
        )}
        {currentPage && pageCount && (
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
        )}
      </div>
    </div>
  )
}
