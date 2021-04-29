import { Consumer, KafkaClient, Message } from 'kafka-node'
import { TOPIC_NAME } from './constants'
import { waitKafkaClientForConnection } from './utils'

async function main() {
  const client = new KafkaClient()
  const consumer = new Consumer(client, [{ topic: TOPIC_NAME }], {})

  console.log('Awaiting connection to kafka...')
  await waitKafkaClientForConnection(client)
  console.log('Connection with kafka established')
  console.log(`Awaiting messages from "${TOPIC_NAME}" topic...`)

  consumer.on('message', (message: Message) => {
    console.log('Retrieved message:', message)
  })
}

main()
