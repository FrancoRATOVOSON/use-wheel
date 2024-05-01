import { faker } from '@faker-js/faker'

import { Order } from '../types'

function fakeUserList() {
  const list: string[] = []
  for (let index = 0; index < 10; index++) {
    list.push(faker.internet.email())
  }
  return list
}

export function fakeOrdersList() {
  const userList = fakeUserList()
  const list: Order[] = []
  const dataSize = faker.number.int({ max: 100, min: 50 })
  for (let index = 0; index < dataSize; index++) {
    list.push({
      amount: faker.number.int({ max: 500, min: 150 }),
      date: faker.date.recent({ days: 100 }),
      id: faker.string.uuid(),
      isDelivered: faker.number.int({ max: 10, min: 0 }) % 2 === 0,
      user: userList[faker.number.int({ max: userList.length - 1, min: 0 })]
    })
  }

  return list
}
